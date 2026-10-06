# Script — Running Tests Automatically

## Segment 1 (title)

Last lesson's example just echoed strings. A real testing workflow installs dependencies and actually runs the test command, on every push and every pull request.

## Segment 2 (code: the workflow)

Triggering on both push to main and pull requests targeting main means tests run twice: once while the PR is open, so reviewers see pass or fail before approving, and once more after it actually merges.

## Segment 3 (screenshot: commit statuses)

Once this workflow exists, every commit gets a status icon. A red X means that specific commit's tests failed — not a vague, general sense that something's wrong.

## Segment 4 (screenshot: checks tab)

A pull request's Checks tab rolls up every workflow run triggered by that PR's commits into one place, letting you inspect any individual commit's results.

## Segment 5 (steps: a check that blocks)

Here's the gap that trips people up: a failing status check is only a visual indicator by default. Nothing stops anyone from merging anyway unless a branch protection rule marks that check as required. Without that rule, it's a policy enforced by nobody in particular.

## Segment 6 (outro)

Next lesson: deploying on merge — what actually triggers a real deployment, and why a PR and a merge need different jobs.
