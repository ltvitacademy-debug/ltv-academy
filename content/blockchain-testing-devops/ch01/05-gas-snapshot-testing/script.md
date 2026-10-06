# Script — Gas Snapshot Testing

## Segment 1 (title)

A refactor that's functionally identical can still quietly add gas cost — an extra storage read, a redundant call. None of your correctness tests catch that, because the contract still behaves correctly. It's just more expensive.

## Segment 2 (code: creating a snapshot)

forge snapshot runs your suite and records every test's gas usage into a committed .gas-snapshot file. For a fuzz test, it records the mean and median gas across all runs, since cost can vary by input.

## Segment 3 (code: CI gate flags)

Two flags turn that file into an enforceable check. Diff compares current usage against the baseline. Check exits with an error the moment any test costs more gas than recorded — that's the one that belongs in CI.

## Segment 4 (code: intentional updates)

Not every increase is a regression — sometimes you're trading gas for a real feature. When that's the case, you regenerate the snapshot deliberately and commit it, making the cost change visible in the PR diff instead of a silent creep.

## Segment 5 (outro)

Gas snapshots catch cost regressions on tested paths. Lesson 6 looks at what "tested paths" actually means — and the real limits of coverage as a metric.
