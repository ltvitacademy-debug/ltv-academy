# Script — Handling Failed Snowpipe Loads

## Segment 1 (title)

When a pipe seems to have stopped working, there are two different questions to ask, and two different places to look for the answer.

## Segment 2 (code: COPY_HISTORY)

The same COPY_HISTORY from Chapter 3 reports Snowpipe's automatic loads too, since they go through the same underlying load path. A PARTIALLY_LOADED or LOAD_FAILED status here means the problem is in the file or the pipe's ON_ERROR setting.

## Segment 3 (code: PIPE_USAGE_HISTORY)

But a file that never triggered the pipe at all won't show up in COPY_HISTORY — there's nothing to report on a load that never started. PIPE_USAGE_HISTORY reports on the pipe itself: files seen, bytes, credits used, over a time window.

## Segment 4 (steps: common causes)

Roughly in order of likelihood: a notification ARN mismatch, permission gaps after a grant was revoked, a file format that quietly changed shape, or simply a paused pipe someone forgot to resume.

## Segment 5 (code: resuming safely)

Unpausing a pipe doesn't retroactively pick up files that arrived during the outage — ALTER PIPE REFRESH re-scans the stage explicitly for anything missed, since the original trigger event already fired and passed.

## Segment 6 (outro)

That closes Chapter 4. Chapter 5 moves from getting data in to shaping it once it's there — the ELT pattern, and transforming raw loaded data into something query-ready.
