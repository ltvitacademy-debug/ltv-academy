# Spot & Preemptible Instances

On-demand H100 capacity is expensive and sometimes scarce; spot instances (AWS's term) and preemptible VMs (GCP's term) offer the same hardware at a steep discount, with one catch — the cloud provider can take them back with only a short warning whenever it needs the capacity elsewhere. For a training run that depends on all 512 GPUs staying up together, that trade-off needs careful handling, not blind adoption. This lesson covers what that warning actually looks like, how to react to it in time, and why Solara AI only runs *some* of solara-train's capacity on spot.

## What you'll learn

- How much a spot/preemptible discount typically saves versus on-demand pricing, and why
- What the interruption notice actually is on AWS and GCP, and how little time it gives you
- Why the Master (rank 0) is the one node that can't safely live on spot without extra handling
- How Solara AI structures which part of a training job runs on spot versus on-demand

## The discount and the catch

Spot and preemptible instances typically cost 60-90% less than the same instance type on-demand, because the cloud provider is selling capacity it would otherwise leave idle, on the condition that it can reclaim it on short notice if a higher-paying (on-demand or reserved) customer needs it. For a 64-node, 8-GPU-per-node fleet running for weeks, that discount is the difference between a training run being affordable and not — which is exactly why it's tempting to put everything on spot, and exactly why doing that naively is a mistake.

## The interruption notice: AWS and GCP

AWS publishes a **2-minute spot interruption notice**: before reclaiming a spot instance, AWS sends a notification (pollable from the instance's metadata endpoint, or delivered via EventBridge) roughly 2 minutes ahead of actual termination.

```bash
# Poll the instance metadata endpoint for an interruption notice
curl -s http://169.254.169.254/latest/meta-data/spot/instance-action
# Returns 404 normally; on interruption, returns JSON with an "action"
# (terminate/stop/hibernate) and a "time" a couple minutes in the future.
```

GCP's preemptible and Spot VMs give roughly **30 seconds** of advance notice via a shutdown script hook and a metadata signal, noticeably tighter than AWS's window. Either way, the number is small enough that nothing requiring human reaction time is viable — whatever happens next has to be automated.

## Handling the notice in a training job

A process on the node polls for the interruption signal in a background thread, and on seeing one, triggers an out-of-cycle checkpoint save immediately rather than waiting for the normal ~500-step interval:

```python
import threading, time, requests

def watch_for_interruption(trigger_checkpoint):
    while True:
        r = requests.get(
            "http://169.254.169.254/latest/meta-data/spot/instance-action",
            timeout=1,
        )
        if r.status_code == 200:
            trigger_checkpoint()   # save now, don't wait for the normal interval
            break
        time.sleep(5)

threading.Thread(target=watch_for_interruption, args=(save_checkpoint_now,), daemon=True).start()
```

Two minutes is enough time for `dcp.save`'s parallel, sharded write (Lesson 19) to finish for most checkpoint sizes, but it's tight — this is one more reason the checkpoint interval from Lesson 19 can't be pushed too far out, since an unplanned emergency save still has to complete inside whatever window the cloud provider gives.

## Why the Master can't just live on spot

Recall from Lesson 12: the Master (rank 0) is the one pod with a distinguished role — it anchors the rendezvous address and, in Solara's setup, drives checkpoint writes. If the Master's node is a spot instance and gets reclaimed, the entire job loses its coordination point, not just one worker's worth of GPUs. Solara AI's policy keeps the Master replica on an on-demand node specifically to avoid that single point of fragility, while Worker replicas — individually replaceable, and covered by elastic training in the next lesson — run on spot capacity where the discount actually pays off.

## Key terms

| Term | Meaning |
|---|---|
| Spot instance (AWS) / Preemptible VM (GCP) | Discounted compute reclaimable by the provider on short notice |
| Interruption notice | The provider's advance warning before reclaiming spot capacity — ~2 min (AWS), ~30 sec (GCP) |
| Emergency checkpoint | An out-of-cycle save triggered immediately by an interruption notice, not the normal interval |
| Master-on-demand policy | Keeping rank 0 off spot since its loss costs the whole job's coordination point |

## Recap

Spot and preemptible capacity cuts training cost dramatically but demands an automated, fast reaction to a short interruption window, and Solara AI's Master-on-demand, Workers-on-spot split keeps the savings without betting the whole job's coordination on reclaimable hardware. Next lesson: Elastic Training, which covers what happens to the rest of the job while those spot Workers come and go.
