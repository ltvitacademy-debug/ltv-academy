# Fault Tolerance for Long Training Runs

Lesson 35 covered how to save state so a run can resume. This lesson covers the other half: how a job actually detects a failure, reacts to it, and gets back to training with minimal lost time, without a human needing to notice and restart it manually. At the GPU counts these runs use, failures aren't an edge case — they're routine, and the training stack has to be built around that fact from the start.

## What you'll learn

- Why failure is the expected case, not the exception, at large GPU counts
- The difference between a crash and a silent hang, and why hangs are the harder problem
- Elastic training and automatic restart with `torchrun`
- Health checks and the role of NCCL timeouts in detecting a stuck collective
- How checkpoint cadence from Lesson 35 and fault tolerance work together

## Failure is routine at scale

If a single GPU has some probability of a hardware fault, network error, or driver crash in a given day, then a job running on a thousand GPUs for two weeks has a correspondingly higher chance that *some* GPU in the fleet fails before the run completes — not because any individual component is unreliable, but because the number of components multiplies the exposure. Large training runs at major labs routinely experience multiple hardware failures per day across their fleet. Designing for this means the training loop has to assume interruption is coming, rather than treating it as an exceptional case to handle later.

## Crashes vs. silent hangs

A crash is the easy case: a process dies, the job scheduler notices immediately, and recovery can start right away. The harder case is a silent hang — a GPU or network link degrades without actually crashing, and a collective communication operation (an all-reduce during gradient synchronization, for example) blocks forever waiting on a rank that will never respond. Without a timeout, the entire job appears to freeze with no error message, and wall-clock time burns while nothing happens. This is why setting an explicit timeout on process-group communication matters: `torch.distributed.init_process_group(..., timeout=datetime.timedelta(minutes=10))` ensures a stuck collective raises an error instead of hanging indefinitely, so the failure becomes detectable and actionable.

## Elastic training and automatic restart

PyTorch's elastic launcher, invoked through `torchrun`, supports jobs that can tolerate worker failures and restart automatically without the whole job being resubmitted from scratch by a human:

```bash
torchrun \
  --nnodes=1:8 \
  --nproc-per-node=8 \
  --max-restarts=3 \
  --rdzv-id=job123 \
  --rdzv-backend=c10d \
  --rdzv-endpoint=rendezvous-host:29400 \
  train.py
```

The `--nnodes=1:8` range lets the job continue with fewer nodes if some become unavailable, `--max-restarts` bounds how many times the elastic agent will automatically restart failed workers before giving up, and the rendezvous backend coordinates the surviving workers finding each other again after a restart. On restart, training resumes from the last checkpoint written under the policy from Lesson 35 — which is why checkpoint cadence and fault tolerance are really one system, not two independent concerns: a restart is only as cheap as the most recent checkpoint it can resume from.

## Health checks and monitoring for early detection

Beyond timeouts on the collective itself, production training stacks run periodic health checks — lightweight probes of GPU memory, NCCL connectivity, and disk availability — so a degrading node can be flagged and drained before it causes a hang that stalls the whole job. Catching a failing node proactively, rather than waiting for it to block an all-reduce, is usually cheaper than recovering from the resulting stall.

## Key terms

- **Elastic training** — a training job that can continue, restart, or shrink/grow its worker count without being fully resubmitted
- **Rendezvous** — the mechanism by which distributed workers discover and reconnect to each other, especially after a restart
- **Silent hang** — a failure where a collective operation blocks indefinitely without an error, as opposed to a process crash
- **NCCL timeout** — an explicit time limit on collective communication, after which a stuck operation raises an error instead of hanging forever
- **`max-restarts`** — the bound on how many times an elastic job will automatically retry failed workers before stopping
