# Script — Job Queues & Priorities

## Segment 1 (title)

solara-train has five hundred twelve GPUs, and the language-modeling team's run routinely wants all of them, while the multimodal team needs GPU time too. Someone has to decide whose job runs now and whose waits. This lesson covers how both Kubernetes and Slurm make that decision.

## Segment 2 (code)

A naive first-in-first-out queue breaks down fast once jobs have wildly different sizes and urgency. Volcano, the batch scheduler running alongside the Training Operator, adds a queue object instead. Weight sets relative share when two queues both want the cluster — language modeling gets roughly twice multimodal's share here — and capability caps the absolute GPUs a queue can ever use, so a high weight can't let one team starve the other outright.

## Segment 3 (code)

Slurm expresses the same idea differently. Every job accumulates a priority score, partly from a quality-of-service tag set right in the sbatch script. The scheduler's backfill logic picks the highest-priority job that actually fits the free nodes right now, not strictly submission order.

## Segment 4 (steps)

Priority alone only affects which waiting job starts next. Preemption goes further — it can stop a job that's already running to reclaim its resources for something higher priority. Both systems support it, but for training that's a real decision, because killing a run mid-step loses whatever wasn't checkpointed. Solara's policy: debug jobs can be preempted, production training runs never are.

## Segment 5 (outro)

Both platforms go well past plain first-in-first-out, with real priority and real preemption rules behind them. Next up, lesson fifteen: gang scheduling — what actually makes it safe to start a sixty-four node job in the first place.
