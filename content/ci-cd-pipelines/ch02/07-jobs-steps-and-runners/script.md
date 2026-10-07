## Segment 1 (title)

So far storefront's workflow has had exactly one job. As Northbridge Retail's pipeline grows, it needs more — one job to lint, one to test, one to build the Docker image. This lesson covers how multiple jobs relate to each other, what runs inside one, and the machine it all actually happens on.

## Segment 2 (code: needs)

By default, GitHub runs every job in a workflow in parallel, each on its own separate runner. Adding needs: lint to the test job changes that — test now waits for lint to finish successfully first, and gets skipped entirely if lint fails. Northbridge Retail uses this to fail fast, so a ten-minute integration suite never wastes runner minutes on code that doesn't even pass a linter.

## Segment 3 (code: runner types)

Runs-on picks the machine a job executes on. Ubuntu-latest, windows-latest, and macos-latest are all GitHub-hosted — fresh virtual machines, billed by the minute, with nothing for a team to maintain. Self-hosted is different: a machine Northbridge Retail registers and keeps running itself, useful once a job needs something a hosted runner simply can't offer, like direct access to an internal staging database.

## Segment 4 (screenshot: run summary)

Click into any finished run and the summary page shows every job it contained, its status, and exactly how long it took — a green check for success, a red X the moment something fails partway through.

## Segment 5 (screenshot: step logs)

Click into a specific job and you get a step-by-step log, each step with its own checkmark and duration. This is where debugging actually happens in practice — reading one step's exact output, rather than guessing at the job as a whole.

## Segment 6 (outro)

Next lesson: giving a job what it actually needs to talk to a database or a container registry, without ever exposing that in the workflow file itself.
