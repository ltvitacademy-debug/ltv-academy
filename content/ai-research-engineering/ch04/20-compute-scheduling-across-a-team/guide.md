# Compute Scheduling Across a Team

A research team never has unlimited GPUs. The moment more than one person wants to run experiments on a shared cluster, someone has to decide whose job runs now, whose waits, and whose gets preempted — and that decision is either made deliberately by a scheduler and a policy, or made accidentally by whoever happens to submit first.

## What you'll learn

- Why shared compute needs an explicit scheduling policy, not just a job queue
- Priority, fair-share, and preemption as the three main scheduling levers
- How queueing and quota systems work in practice (Slurm, Kubernetes)
- Practical norms that keep a shared cluster usable even when the scheduler is working correctly

## Why "first come, first served" breaks down

A plain FIFO queue treats a single researcher's 200-trial sweep and a teammate's one urgent debugging run identically — whoever submitted first blocks everyone else until their jobs finish, regardless of how important or how long-running they are. On a cluster shared by more than a couple of people, this produces the classic failure mode where one large sweep locks out the rest of the team for a day. A scheduling policy exists specifically to prevent this.

## Priority, fair-share, and preemption

Most cluster schedulers (Slurm's `fairshare` plugin, Kubernetes' priority classes) combine three mechanisms:

- **Priority** — jobs are tagged with a priority level (e.g. `--qos=high` in Slurm), and higher-priority jobs jump the queue ahead of lower-priority ones.
- **Fair-share** — the scheduler tracks each user's recent resource usage and lowers their effective priority the more they've already consumed, so one person's sweep doesn't perpetually dominate the queue.
- **Preemption** — a lower-priority running job can be suspended or killed to free resources for a higher-priority one, then automatically requeued.

```bash
# Slurm: submit with an explicit QoS and let fair-share factor in usage history
sbatch --qos=high --partition=gpu --gres=gpu:1 train.sh

# Check your current fair-share factor
sshare -u $USER -a
```

```yaml
# Kubernetes: PriorityClass lets higher-priority pods preempt lower-priority ones
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority-research
value: 1000
preemptionPolicy: PreemptLowerPriority
```

## Quotas keep the policy enforceable

Priority alone doesn't stop one person from submitting far more jobs than their fair share — quotas (a per-user or per-team cap on concurrent GPUs, enforced by Slurm associations or Kubernetes `ResourceQuota`) put a hard ceiling under the soft guidance of fair-share scoring. Teams typically combine both: fair-share nudges the scheduler toward balance, quotas guarantee no single user can exceed a hard limit even during a priority dispute.

## Practical norms beyond the scheduler

Scheduling policy handles resource contention mechanically, but a few team norms matter just as much in practice: label jobs so others can tell what they are (`--job-name=sweep-214-trial-07`, not `job123`); kill jobs promptly once a sweep's early-termination policy (Lesson 17) has already flagged them as dead ends, rather than letting zombie jobs hold GPUs; and communicate large, long-running jobs in advance on a shared channel so a 48-hour training run doesn't surprise someone who needed that capacity for an urgent debug session.

## Key terms

- **Fair-share scheduling** — a policy that lowers a user's effective priority based on their recent resource consumption, preventing one user from dominating the queue
- **Preemption** — suspending or killing a lower-priority running job to free resources for a higher-priority one
- **Quota** — a hard per-user or per-team cap on concurrent resource usage, enforced independently of priority scoring
- **QoS (Quality of Service)** — a Slurm job attribute that sets its priority tier and associated resource limits
