# Script — Scheduled Processes and Job Monitoring

## Segment 1 (title)

Not everything in Oracle Fusion happens instantly on screen. A large report, a bulk import, a month-end allocation — these take real time, and they're better handled as a background job than by making someone stare at a spinner.

## Segment 2 (code: why background jobs exist)

Some operations are too heavy to run instantly: generating a large report, importing thousands of invoices, recalculating depreciation across every asset. Oracle Fusion handles this through scheduled processes — jobs that run in the background, freeing the user to keep working while the heavy lifting happens separately.

## Segment 3 (steps: the scheduled processes work area)

The Scheduled Processes work area is where a user submits a job, schedules it to run repeatedly instead of resubmitting by hand, monitors its status, and views the output or error log once it finishes.

## Segment 4 (steps: job statuses)

A job moves through predictable statuses: Pending, queued and not yet started. Running, actively executing. Succeeded, no errors. Warning, completed but worth a second look. And Error, failed to complete.

## Segment 5 (outro)

When someone says their report never showed up, the first step is almost always checking that job's status and log — not assuming the application itself is broken. Next up, Lesson 16: environments — dev, test, and prod.
