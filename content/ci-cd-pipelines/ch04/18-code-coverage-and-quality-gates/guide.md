# Code Coverage & Quality Gates

A green test suite answers "did the tests we wrote pass" — it says nothing about how much of the code those tests actually touch. Code coverage measures that second question, and a quality gate is what turns the resulting number into an actual pass/fail decision in the Northbridge Retail pipeline, instead of a statistic nobody acts on.

## What you'll learn

- What code coverage actually measures, and the one thing a high coverage number does *not* guarantee
- How to generate a coverage report in CI and read the percentage it produces
- What a quality gate is, and how Northbridge Retail turns "coverage must not drop" into an enforced pipeline rule
- How a coverage tool's pull request comment turns a single number into a reviewable diff

## What code coverage measures — and what it doesn't

Code coverage is the percentage of lines (or branches) of source code that were executed at least once while the test suite ran. 85% coverage means 15% of the codebase never ran during testing at all — a strong signal about where bugs can hide undetected.

What coverage does *not* measure is whether the tests that did run are any good. A test that calls a function and asserts nothing still counts as "covering" that function. Coverage tells you what was exercised, never whether it was verified correctly — treat it as a map of blind spots, not a certificate of correctness.

## Generating the report

Here's the step Northbridge Retail added right after the test step from Lesson 16:

```yaml
      - name: Run tests with coverage
        run: pytest --cov=src --cov-report=xml --cov-fail-under=80
```

`--cov=src` tells `pytest-cov` which directory to measure. `--cov-report=xml` writes a machine-readable report that an external tool (next section) can read. `--cov-fail-under=80` is the quality gate itself, built directly into the test command — if total coverage drops below 80%, this step exits non-zero and the job fails, exactly like a broken test would.

## Reading a real coverage report on a pull request

Many teams pair that XML report with a service like Codecov, which posts a comment directly on the pull request showing exactly how the *change* — not just the whole codebase — affected coverage:

![A real Codecov pull request comment showing overall coverage percentage, the diff coverage for the specific change, and a table of files impacted with their individual coverage changes.](/courses/ci-cd-pipelines/ch04/18-code-coverage-and-quality-gates/codecov-pr-comment.png)
*The PR comment separates "coverage of the whole project" from "coverage of just this diff" — the second number is almost always the more useful one.*
Source: [Codecov Docs — Pull Request Comments](https://docs.codecov.com/docs/pull-request-comments)

That second number — diff coverage, sometimes called patch coverage — matters more day to day than the overall percentage. A 500,000-line legacy codebase might sit at 60% overall coverage forever, but a quality gate requiring *new* code to hit 90% patch coverage stops the problem from getting worse, one pull request at a time, without demanding anyone go back and retroactively test a decade of old code.

## Quality gates beyond coverage

Coverage is the most common quality gate, but it's one of several a pipeline can enforce the same way: a maximum number of new static-analysis findings (Lesson 17), a minimum passing percentage of a specific test suite, or a hard rule like "zero new high-severity CodeQL alerts." Every one of them follows the same shape — a measurement, a threshold, and a pipeline step that fails the build the moment the measurement crosses that threshold.

## Key terms

| Term | Meaning |
|---|---|
| Code coverage | The percentage of code executed at least once during a test run |
| Quality gate | A pipeline rule that fails the build when a specific metric crosses a defined threshold |
| Diff coverage (patch coverage) | The coverage percentage of only the lines changed in a specific pull request |
| `--cov-fail-under` | A pytest-cov flag that fails the test command if total coverage drops below a given percentage |
