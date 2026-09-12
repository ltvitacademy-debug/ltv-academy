# Script — Running Tests Automatically on Every Commit

## Segment 1 (title)

The exact same workflow mechanism from Lesson 18, pointed at a real test command, becomes a quality gate. Nothing changes in kind — the only difference is that a real step now runs dbt test, and its exit code becomes the workflow's exit code.

## Segment 2 (screenshot: commit list statuses)

Every workflow run's pass or fail result attaches directly to the commit that triggered it — a red X means a specific commit's tests failed, not a vague sense that something's wrong somewhere.

## Segment 3 (screenshot: checks summary)

A pull request's Checks tab rolls every check across every commit on that PR into one place — every workflow attached to the repository that ran against this PR, dbt tests, linters, anything wired in.

## Segment 4 (steps: required status checks)

A status check existing isn't the same as it mattering. Without a required status check configured on a branch protection rule, a red X is just a visual — the merge button stays clickable regardless. Required status checks are what actually block the merge until it passes.

## Segment 5 (steps: why this beats remembering)

A team relying on someone remembering to run tests before merging will eventually have someone forget, usually right before a deadline. A required status check doesn't get tired and doesn't make exceptions — it's the difference between a policy and a mechanism.

## Segment 6 (outro)

Next lesson: a real GitHub Actions workflow, start to finish — building Chapter 5's full pipeline for an actual data project.
