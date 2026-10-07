# Script — Retraining Pipelines

## Segment 1 (title)

This lesson closes chapter four by assembling everything it covered — pipeline frameworks, reproducibility, scheduling, failure handling — into one automated loop: a retraining pipeline that decides on its own whether a new model deserves to replace the one currently serving traffic.

## Segment 2 (steps)

A retraining run needs a reason to start, and there are three legitimate ones. Schedule-based, the simplest — retrain on a fixed cadence. Performance-based — a monitored production metric degrades past a threshold, reacting to a problem that's already real. And drift-based — a statistical shift in input distributions, caught before it necessarily shows up in a lagging performance number.

## Segment 3 (code)

A common drift check compares a reference window against the current one using something like the population stability index, per feature. A score above roughly zero point two is a commonly used threshold for a shift worth investigating — the exact number matters less than having a fixed, documented threshold instead of a fresh judgment call every single time.

## Segment 4 (code)

Every earlier piece in this chapter comes together here — reproducible training, comparison against the current champion, retries and alerting — but the single most important line is the quality gate. A pipeline that promotes every new model unconditionally isn't automation, it's an unsupervised way to degrade production the moment one bad run happens to finish without error.

## Segment 5 (steps)

Before this chapter, retraining meant a person noticing something looked off, pulling data by hand, eyeballing a metric, and copying a file somewhere manually. Every step in that sentence is now a task in a DAG, with a retry policy, a tracked run, a registry comparison, and a one-line alias. The ML itself didn't change — the process around it stopped depending on someone remembering to do it right.

## Segment 6 (outro)

That closes chapter four. You've now covered the full lifecycle, from a tracked experiment all the way to a model that can retrain and redeploy itself safely, with a human only in the loop when the gate actually says something needs attention.
