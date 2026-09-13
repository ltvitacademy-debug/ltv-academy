# Script — Error Handling & Retries

## Segment 1 (title)

Before configuring anything, here's what a real failure actually looks like in Airflow — because retry settings exist entirely to respond to this. Retries, retry delay, and on_failure_callback are this lesson's real task-level configuration.

## Segment 2 (screenshot: failed task log)

This is a genuine raised exception and full traceback, not a mockup — a red Failed banner, and log lines ending in the actual Python error. Every failed task in Airflow produces a log exactly like this. Retries don't change what gets logged here — they control what Airflow does next.

## Segment 3 (code: retries and retry_delay)

retries equals three means: if this task fails, try it up to three more times before marking it permanently failed. retry_delay is the wait between attempts. A lot of real failures — a network blip, a warehouse briefly out of capacity — resolve themselves within minutes, so a retry is often the entire fix.

## Segment 4 (code: exponential backoff)

Retrying the same way, a fixed number of minutes apart, isn't always right — if a downstream system is struggling, hammering it can make things worse. retry_exponential_backoff makes each retry wait longer than the last, capped by max_retry_delay so it never waits forever.

## Segment 5 (code: on_failure_callback)

on_failure_callback runs a function of your own the instant a task is finally marked failed, after all retries are exhausted — not after each attempt. Airflow hands it a context dictionary with exactly which task, which DAG, and which run failed. This lesson just prints it; next lesson turns it into a real alert.

## Segment 6 (outro)

Next lesson: alerting from Airflow — turning that on_failure_callback into an actual email or Slack notification.
