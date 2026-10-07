# Script — Why Long Training Runs Need Fault Tolerance

## Segment 1 (title)

Chapter three covered how Solara-70B's training job gets scheduled onto all five hundred twelve GPUs at once. This chapter asks the next question: what happens when, days into that run, one of those GPUs simply fails? At this scale, "if" is the wrong word.

## Segment 2 (steps)

A single GPU failing during one week of training is rare. But solara-train is running five hundred twelve of them at once, for weeks at a time, and the chance that at least one of them fails compounds across every GPU in the fleet. Even a conservative two percent annual failure rate per GPU works out to roughly ten failures a year across the fleet — and that's before counting node-level faults that take all eight GPUs on a node offline together.

## Segment 3 (steps)

Recall that NCCL's collective operations are synchronous across every rank. If one GPU disappears mid-AllReduce, that call just hangs — it doesn't continue with the GPUs that are left. Without any fault-tolerance strategy, the only recovery is restarting from scratch, and for a job two weeks in, a single bad GPU on day thirteen wipes out two weeks of five-hundred-twelve-GPU time.

## Segment 4 (steps)

Fault tolerance doesn't prevent hardware from failing — it will, at roughly the rate those numbers suggest. What it buys is making one failure cheap instead of catastrophic. The rest of this chapter covers three pieces of that: checkpointing, so a restart loses minutes instead of weeks; elastic training, so a job can sometimes keep running with fewer nodes; and node-failure design, so the platform detects and routes around a bad node automatically.

## Segment 5 (outro)

At this scale, hardware failure during a run isn't a tail risk, it's an expected event — and without fault tolerance it costs the entire run. Next up, lesson nineteen: checkpoint storage strategies.
