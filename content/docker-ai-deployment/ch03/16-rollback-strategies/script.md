# Script — Rollback Strategies

## Segment 1 (title)

Chapter 3 covered two release patterns, and rollback works differently in each one.

## Segment 2 (code: rollback per pattern)

A blue-green rollback just flips routing back to blue, which never stopped running — as fast as the original cutover was. A rolling-update rollback runs the same process in reverse, instance by instance — just as gradual as the forward rollout was.

## Segment 3 (code: what has to be true beforehand)

A fast rollback isn't automatic. It depends on the previous image tag still sitting in the registry, the previous config being recorded somewhere, and any new schema changes staying backward-compatible with the old code — or the rollback breaks data instead of fixing anything.

## Segment 4 (steps: model vs. code)

An AI app has two separate things that can each go wrong on their own: the application code, and the model or weights actually doing inference. A bad release can mean rolling back the code only, the model only, or both — tracked and rolled back independently.

## Segment 5 (code: detection matters more)

A thirty-second rollback is useless if the problem takes an hour to notice. The real first step of any rollback strategy is automated detection — error rate, latency, and output quality signals wired to actually trigger the rollback, not a human spotting a spike by chance.

## Segment 6 (outro)

That closes out deployment patterns. Chapter 4 picks up right where this leaves off: scaling and reliability, starting with autoscaling AI workloads.
