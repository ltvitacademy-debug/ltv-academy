# Lesson 13 — Batch Inference vs. Real-Time Inference Infrastructure

**Chapter 4 · Model Serving and Inference Infrastructure · Lesson 1 of 4**

## What you'll learn

- Why "running inference" isn't one workload — batch and real-time
  inference optimize for opposite things and need different
  infrastructure as a result
- What batch inference actually looks like on Kubernetes, and why
  Spot GPUs and loose scheduling are usually fine for it
- What real-time inference demands that batch never has to worry
  about: an always-warm process, a p99 latency budget, and a
  request path that can't just retry later
- Where "dynamic batching" fits in — real-time serving still batches
  requests, just at a scale of milliseconds instead of hours

## Two different jobs wearing the same name

"Inference" just means running a trained model forward to get a
prediction. But *how* that prediction gets consumed splits into two
genuinely different infrastructure problems:

- **Batch inference** — you have a pile of inputs sitting somewhere
  (a table, a queue, a bucket of files) and you need predictions for
  all of them, on some schedule. Nobody is sitting there waiting on
  any single one. The metric that matters is **throughput**: how
  many records per hour can you score.
- **Real-time (online) inference** — a caller sends one request and
  is blocked waiting for a response right now, inside a user-facing
  flow. The metric that matters is **p99 latency**: how slow is the
  slowest 1% of requests, because that's the experience your angriest
  users actually have.

Optimizing for one usually makes the other worse. Maximizing
throughput means running the biggest batch size the GPU's memory can
hold, which raises the latency of any single item in that batch.
Minimizing p99 latency means keeping batches small and workers
constantly warm, which leaves GPU compute underused between requests.
You don't pick one infrastructure pattern and reuse it for both.

## Batch inference infrastructure

A nightly job that re-scores 10 million transactions for fraud risk,
or re-embeds a document corpus after a model update, doesn't need
anything running 24/7. It needs to start, chew through a known amount
of work as fast as possible, and stop. That maps directly onto a
Kubernetes **Job** (or a **CronJob** for the recurring case) rather
than a long-running Deployment:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: nightly-fraud-scoring
spec:
  backoffLimit: 2
  template:
    spec:
      restartPolicy: OnFailure
      nodeSelector:
        cloud.google.com/gke-accelerator: nvidia-tesla-a100
      tolerations:
        - key: "nvidia.com/gpu"
          operator: "Exists"
          effect: "NoSchedule"
      containers:
        - name: batch-scorer
          image: registry.internal/fraud-scorer:2.3.0
          args: ["--input", "s3://txns/2026-10-29/", "--batch-size", "512"]
          resources:
            limits:
              nvidia.com/gpu: 1
```

Because the job just reruns from a checkpoint if it fails, this is
exactly the workload where **Spot/preemptible GPU instances** make
sense — the cost savings are large and an interruption costs you a
retry, not an outage. You can also push batch size much higher than
any real-time path would tolerate, because nothing is waiting
synchronously on an individual record's result.

## Real-time inference infrastructure

A live chat application calling the model on every user turn is the
opposite shape: a caller is blocked on the response, so the serving
process has to already be warm, loaded into GPU memory, and listening
behind a `Service`/`Ingress` the moment the request arrives:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: realtime-inference
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: model-server
          image: registry.internal/model-server:2.3.0
          readinessProbe:
            httpGet: { path: /v2/health/ready, port: 8000 }
            initialDelaySeconds: 30
          resources:
            limits:
              nvidia.com/gpu: 1
```

A cold GPU process can take minutes to come up — loading weights into
VRAM, warming CUDA kernels — so you can't scale real-time capacity
the way you scale batch: you keep a baseline of warm replicas instead
of starting from zero per request. Spot instances become riskier here
too, since an interruption mid-request is a failed user-facing call,
not a retried background job.

## Dynamic batching: real-time still batches, just in milliseconds

Real-time inference doesn't mean "one request, one GPU call." A
single GPU can usually process a batch of 8 or 16 requests almost as
fast as it processes one — the bottleneck is kernel launch overhead,
not raw compute. Serving frameworks exploit this with **dynamic (or
request) batching**: hold incoming requests for a few milliseconds,
group whatever arrived into one GPU call, and return each caller its
own slice of the result. It's the same throughput idea batch
inference uses, compressed down to a window small enough that nobody
waiting synchronously notices the delay. Lesson 14 covers the serving
frameworks — Triton, TorchServe, KServe — that implement this for you
instead of you hand-rolling it.

## Key terms

| Term | Meaning |
|---|---|
| Batch inference | Scoring a known set of inputs on a schedule, optimized for throughput; typically a Kubernetes Job/CronJob |
| Real-time (online) inference | Synchronous, request/response inference behind a live service, optimized for p99 latency |
| p99 latency | The latency of the slowest 1% of requests — the metric real-time SLOs are usually written against |
| Dynamic (request) batching | Grouping multiple near-simultaneous real-time requests into one GPU call for a few milliseconds to raise throughput without breaking the latency budget |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
is a nightly batch-scoring job a good fit for Spot GPUs while a
live inference Deployment usually isn't, and what problem does
dynamic batching solve that neither pure batch nor pure one-at-a-time
real-time inference solves on its own?
