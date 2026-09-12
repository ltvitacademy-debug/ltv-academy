# Script — GitHub Actions Basics

## Segment 1 (title)

Every GitHub Actions workflow is a YAML file inside .github/workflows/ at the root of a repository. GitHub scans that exact folder automatically — committing a file there is the entire setup, no separate registration step.

## Segment 2 (screenshot: Actions tab)

Once that file is committed and pushed, GitHub runs it automatically on the next matching event. Every run, past and present, shows up on the repository's Actions tab.

## Segment 3 (screenshot: run summary)

Clicking into a run shows the summary GitHub generates — what triggered it, how long it took, and whether each job succeeded, all at a glance.

## Segment 4 (screenshot: step logs)

Clicking into the job itself expands every step in the order it actually ran, each with its own timing and output. This is where you debug a failing pipeline — the specific step that failed, not just the job's overall red X.

## Segment 5 (outro)

Next lesson: running tests automatically on every commit — turning this same mechanism into a real quality gate.
