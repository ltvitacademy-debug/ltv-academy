# Script — Testing Strategies for Research Code

## Segment 1 (title)

Research code can carry debt production code can't, but that doesn't mean zero tests. It means the kind of testing that pays off is different. The goal isn't proving the model is accurate — it's catching the bug that silently wastes a day of compute before anyone notices the run was broken from the start.

## Segment 2 (steps)

Four tests catch most of those bugs. A data shape and dtype check catches a silent reshape or an off-by-one label. A forward-pass smoke test just confirms the model builds and runs with no NaNs. An overfit-a-batch test trains on one fixed batch and checks the loss actually drops. And a determinism test confirms the same seed gives the same output every time.

## Segment 3 (code)

The overfit-a-batch test is the single highest-value one. Fix a seed, grab one batch the model is allowed to memorize, and run fifty optimizer steps. If the final loss isn't a small fraction of the first, something fundamental is broken — gradients aren't flowing, or the loss is wired to the wrong tensor. That's a bug that would otherwise only show up as unexplained slow convergence, days into a real run.

## Segment 4 (code)

What's not worth testing is the model's actual accuracy number — asserting accuracy above ninety percent is an experiment result, not a code bug, and it's flaky across hardware and data splits. Track that with experiment-tracking tools instead. Keep the real test suite fast with tiny fake batches, and run just the quick subset while iterating, the full suite before a push.

## Segment 5 (outro)

Four cheap tests, run constantly, catch almost every expensive silent bug. Up next, lesson fifteen: code review norms for research teams, and what reviewers should actually be checking for.
