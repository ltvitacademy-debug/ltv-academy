# Script — Alerting From Airflow

## Segment 1 (title)

For the most basic case — email someone when this fails — Airflow has a built-in flag, no custom code required. email_on_failure sends automatically whenever a task in the DAG fails, using whichever SMTP connection Airflow is configured with.

## Segment 2 (code: on_failure_callback)

Email doesn't fit every workflow. on_failure_callback runs any Python function you write when a task fails, with full access to the failure's context — which task, which DAG, which run, and a direct link to the exact log.

## Segment 3 (steps: why this is better)

This is genuinely better than a generic something-failed email — it's specific and actionable, with one click to the actual failure, whether that's a Slack message or anything else you wire up.

## Segment 4 (code: default_args)

Repeating on_failure_callback on every single task gets old fast. default_args applies it to every task in the DAG at once — configured once, at the DAG level, alongside retries and retry_delay from last lesson.

## Segment 5 (steps: why this matters)

A pipeline with no alerting works right up until the moment it silently stops working. Alerting is what closes the loop — the pipeline tells you when something's wrong, instead of you having to go looking.

## Segment 6 (outro)

This chapter is complete. Next chapter: deploying and monitoring Airflow in a real production environment.
