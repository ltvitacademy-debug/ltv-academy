# Script — Deployment Approval Gates

## Segment 1 (title)

Not every deployment decision should be automated, and not every one should require a human either. An approval gate is where a pipeline deliberately stops and waits for an explicit yes before continuing — the formal place where a judgment call actually lives.

## Segment 2 (steps)

A validation gate is automated, a yes or no check against a number that runs the same way every time. An approval gate is different on purpose. It exists for decisions that don't reduce cleanly to a threshold, like whether this is an acceptable business tradeoff. Automating a decision that genuinely needs judgment just hides the judgment call, it doesn't remove it.

## Segment 3 (code)

In GitHub Actions, the environment block on a job can be configured with required reviewers. When the workflow reaches this job, it pauses, it doesn't run kubectl apply, until one of the listed reviewers approves it from the Actions UI. Nothing in the YAML itself enforces that pause, the environment's protection rules do.

## Segment 4 (code)

GitLab does the same thing with when: manual. The job shows up in the pipeline but sits idle until someone with the right permissions clicks run, and combined with a protected environment, you can restrict exactly who's allowed to click it.

## Segment 5 (steps)

But a bare approve button forces the reviewer to go dig for context themselves. A well-designed gate surfaces the validation metrics for this specific candidate, the canary or shadow results if it's already seen partial traffic, and exactly what changed and why, right next to the button.

## Segment 6 (outro)

Reserve approval gates for the boundary into production, or into an expanded canary for a high-stakes model, not every low-risk step along the way. Next, lesson twenty-six: blue-green deployment, which sidesteps gradual traffic shifting entirely by cutting over atomically between two full environments.
