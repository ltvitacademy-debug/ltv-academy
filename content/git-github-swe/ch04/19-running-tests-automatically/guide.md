# Lesson 19 — Running Tests Automatically

**Chapter 4 · CI/CD Basics · Lesson 19 of 22**

## What you'll learn

- Turning the mechanism from Lesson 18 into a real quality gate
- A workflow that actually runs a test suite on every push and PR
- Reading per-commit and per-PR status checks
- The difference between a status check existing and a status check that blocks a merge

## From "a workflow runs" to "tests actually run"

Lesson 18's example workflow just echoed some strings — useful for
seeing the mechanism, useless as a quality gate. A real testing
workflow installs dependencies and runs the actual test command:

```yaml
name: Run Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm test
```

Triggering on both `push` to `main` and every `pull_request` targeting
`main` means tests run twice in the lifecycle of a typical change:
once while the PR is open (so reviewers see pass/fail before
approving), and once more after it actually merges.

## Status checks: visible on every commit

Once this workflow exists, every commit gets a status icon showing
whether it passed:

![A commit list showing several commits, most with no status icon, but two marked with red X icons (failed checks) and one with a green checkmark (passed).](/courses/git-github-swe/ch04/19-running-tests-automatically/commit-list-statuses.png)
*A red X means a specific commit's tests failed — not a vague, general sense that something's wrong.*
Source: [GitHub Docs — About status checks](https://docs.github.com/en/pull-requests/reference/status-checks)

## Status checks: rolled up on a pull request

A pull request's **Checks** tab rolls up every workflow run triggered
by that PR's commits into one place, with the ability to inspect any
individual commit's results:

![A pull request's Checks tab, showing 20 checks, with a commit-selector dropdown open listing several commits — one marked with a green checkmark, selected in blue.](/courses/git-github-swe/ch04/19-running-tests-automatically/checks-summary-for-various-commits.png)
*Every check that ran against this PR, across every commit pushed to it, in one place.*
Source: [GitHub Docs — About status checks](https://docs.github.com/en/pull-requests/reference/status-checks)

## A check existing vs. a check that blocks

Here's the gap that trips people up: by default, a failing status
check is **only a visual indicator** — a red X next to the PR. Nothing
actually stops anyone from merging anyway unless the repository has a
**branch protection rule** marking that specific check as **required**.
Without that rule, "someone will notice the red X and not merge" is a
policy, enforced by nobody in particular — exactly the kind of gap
automation exists to close. With a required status check configured,
GitHub disables the merge button entirely until the check passes; the
difference between a check merely existing and a check that actually
blocks is a setting, not a given.

## Key terms

| Term | Meaning |
|---|---|
| Status check | A pass/fail indicator attached to a specific commit, produced by a workflow run |
| Checks tab | A pull request's rolled-up view of every status check across all its commits |
| Required status check | A branch protection rule that blocks merging until a specific check passes |
| `npm ci` | Installs dependencies exactly as locked, the standard choice for CI (faster and more reproducible than `npm install`) |

## Lab

1. Add a real test-running workflow to a practice repository,
   triggered on both push to `main` and pull requests targeting
   `main`.
2. Open a pull request with a deliberately failing test and confirm
   the red X appears on both the commit and the PR's Checks tab.
3. Without branch protection, confirm you can still merge despite the
   failure — this is the gap the next lesson's "required status
   check" setting closes.

## Check yourself

You're ready for Lesson 20 when you can explain why a failing status
check doesn't block a merge by default, and you've watched your own
test workflow run and report pass/fail on a real pull request.
