# Lesson 19 — Running Tests Automatically on Every Commit

**Chapter 4 · CI/CD Concepts · Lesson 19 of 25**

## What you'll learn

- Turning a workflow into an automated test gate, not just a script
  that runs
- Status checks — how GitHub attaches pass/fail results to a specific
  commit
- Required status checks — making a failing test actually block a
  merge
- Why "someone will remember to run the tests" always eventually fails

## From "a workflow runs" to "a test gate"

Lesson 18 covered workflows that print messages and check out code.
The exact same mechanism, pointed at a real test command, becomes a
quality gate:

```yaml
name: dbt CI
on:
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install dbt-snowflake
      - run: dbt build
      - run: dbt test
```

Nothing about this workflow is different in kind from the "echo"
example — it's the exact same `on:` / `jobs:` / `steps:` shape. The
only change is that a real step now runs `dbt test`, and its exit code
(pass or fail) becomes the workflow's exit code.

## Status checks: results attached to a commit

Every workflow run's pass/fail result attaches directly to the commit
that triggered it, visible right in a commit or PR's history:

![A list of commits, most unmarked, two marked with a red X (failed check) and one with a green checkmark (passed check).](/courses/git-cicd/ch04/19-running-tests-automatically/commit-list-statuses.png)
*A red X here means a specific commit's tests failed — not a vague "something's wrong somewhere."*
Source: [GitHub Docs — About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)

A pull request's **Checks** tab rolls every check across every commit
on that PR into one place:

![A pull request's Checks tab, showing 20 checks and a commit selector for viewing results at a specific commit.](/courses/git-cicd/ch04/19-running-tests-automatically/checks-summary-for-various-commits.png)
*Every workflow attached to this repository that ran against this PR shows up here — dbt tests, linters, anything else wired in.*
Source: [GitHub Docs — About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)

## Required status checks: making failure actually block

A status check existing is not the same as it *mattering*. Without
one more setting, a red X is just a visual — the merge button stays
green and clickable regardless. **Required status checks**, configured
on a branch protection rule for `main`, is what actually blocks the
merge button until the check passes:

- Repository **Settings → Branches → Branch protection rules**
- Add a rule for `main`
- Enable **Require status checks to pass before merging**
- Select the specific check (e.g., the `test` job from your workflow)

## Why this beats "someone will remember"

A team relying on a person remembering to run `dbt test` before
merging will, eventually, have someone forget — usually right before
a deadline, right when it matters most. A required status check
doesn't get tired, doesn't have a deadline of its own, and doesn't
make exceptions. It's the difference between a policy and a
mechanism.

## Key terms

| Term | Meaning |
|---|---|
| Status check | A pass/fail result from a workflow, attached to a specific commit |
| Checks tab | Where a pull request rolls up every check across its commits |
| Required status check | A branch protection setting that blocks merging until a check passes |
| Branch protection rule | Repository settings controlling what's required before a branch can be merged into |

## Lab

1. Add a real test or lint step to a workflow file (`dbt test`, a
   Python linter, anything with a real pass/fail exit code).
2. Open a pull request that deliberately fails it once, and find the
   result on both the commit list and the PR's Checks tab.
3. If you have admin access to the repository, configure a required
   status check on `main` and confirm the merge button actually
   becomes blocked.

## Check yourself

You're ready for the rest of this course's capstone when you can
explain the difference between a status check existing and a required
status check actually blocking a merge.
