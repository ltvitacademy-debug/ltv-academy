# Script — Code Coverage & Quality Gates

## Segment 1 (title)

A green test suite answers whether the tests that exist passed — it says nothing about how much of the code they actually touch. Coverage measures that second question, and a quality gate turns the number into a real pass-or-fail decision.

## Segment 2 (steps)

Coverage is the percentage of code that ran at least once during testing. What it doesn't measure is whether those tests verified anything — a test that calls a function and asserts nothing still counts as covering it. Treat coverage as a map of blind spots, not a certificate of correctness, and you'll read the number correctly every time.

## Segment 3 (code)

Here's the real step Northbridge Retail runs right after its tests: pytest with coverage enabled, an XML report for other tools to read, and cov-fail-under=80 — the gate itself, built right into the test command. Drop below eighty percent and the step fails exactly like a broken test.

## Segment 4 (screenshot)

Pairing that report with a service like Codecov posts a real comment straight on the pull request, separating overall project coverage from diff coverage — just the lines this specific change touched. Diff coverage is almost always the more useful number day to day.

## Segment 5 (steps)

Coverage is the most common quality gate, but not the only one. A measurement, a threshold, and a pipeline step that fails the build the moment the threshold is crossed — that same shape covers new static analysis findings, test pass rates, or a flat rule like zero new high-severity alerts.

## Segment 6 (outro)

Tested, linted, and measured code is still just source code sitting in a repository, not something anyone can actually run yet. Next, Northbridge Retail turns it into something that can actually run: a container image, built in CI.
