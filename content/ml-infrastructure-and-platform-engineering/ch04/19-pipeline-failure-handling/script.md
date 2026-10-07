# Script — Pipeline Failure Handling

## Segment 1 (title)

A pipeline that has never failed hasn't run long enough. Networks drop, APIs rate-limit, disks fill up, training jobs get preempted. This lesson treats failure as the normal case to design for, not an edge case to apologize for afterward.

## Segment 2 (code)

Most failures are transient — a network blip, a momentary lock. Airflow handles this per task, with retries and a delay between attempts. Turning on exponential backoff spaces those attempts out — a couple minutes, then roughly double that — instead of hammering a struggling upstream service three times in six minutes. A timeout on the attempt itself catches a task that just hangs.

## Segment 3 (code)

Retries only cover failures that fix themselves. For the ones that don't, a callback fires once a task has truly exhausted its retries, with the full context of which DAG and which task failed — wiring that into Slack or PagerDuty is what turns monitoring from a habit of checking a UI into something that actually pages a person.

## Segment 4 (steps)

None of this is safe without two design properties. Idempotency means running a task once or three times — because of two retries — leaves the system in exactly the same final state, usually by overwriting a fixed path instead of appending blindly. And checkpointing means a long training job saves its state every epoch, so a crash at epoch forty-seven resumes near epoch forty-seven instead of starting over from zero.

## Segment 5 (steps)

Not every failure deserves the same response. A transient failure — a timeout, a rate limit — genuinely benefits from a retry. A deterministic failure, like a real bug or a missing column, will fail exactly the same way every time, and retrying it three times just delays the alert for no benefit at all.

## Segment 6 (outro)

Design for failure as the default case, and a pipeline degrades gracefully instead of silently. Next, lesson twenty ties all of this — scheduling, failure handling, and quality gates — into a fully automated retraining pipeline.
