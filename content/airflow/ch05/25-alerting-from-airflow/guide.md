# Lesson 25 — Alerting From Airflow

**Chapter 5 · Practical Data Pipelines With Airflow · Lesson 25 of 30**

## What you'll learn

- `email_on_failure` — the built-in, zero-code failure email
- `on_failure_callback` — a real Python function that runs when a
  task fails, for anything email can't do
- A real Slack webhook alert from `on_failure_callback`
- Why alerting matters more than it seems once a pipeline is actually
  in production

## The simplest option: email_on_failure

For the most basic case — "email someone when this fails" — Airflow
has a built-in flag, no custom code required:

```python
default_args = {
    "email": ["data-team@example.com"],
    "email_on_failure": True,
    "email_on_retry": False,
}

dag = DAG(
    dag_id="daily_customer_export",
    default_args=default_args,
    ...
)
```

`email_on_failure` sends automatically whenever a task in this DAG
fails, using whichever SMTP connection Airflow is configured with.
It's genuinely enough for a lot of real pipelines — simple, reliable,
no code to maintain.

## Beyond email: on_failure_callback

Email doesn't fit every workflow — a team living in Slack wants a
Slack message, not an inbox notification competing with everything
else. `on_failure_callback` runs any Python function you write when a
task fails, with full access to the failure's context:

```python
from airflow.providers.slack.notifications.slack import send_slack_notification

def alert_on_failure(context):
    task_id = context["task_instance"].task_id
    dag_id = context["dag"].dag_id
    log_url = context["task_instance"].log_url
    send_slack_notification(
        slack_conn_id="slack_alerts",
        text=f":red_circle: {dag_id}.{task_id} failed — {log_url}",
    )(context)

extract = PythonOperator(
    task_id="extract_daily_export",
    python_callable=extract_daily_export,
    on_failure_callback=alert_on_failure,
)
```

The `context` dict handed to a failure callback has everything you'd
want in an alert — which task, which DAG, which run, and a direct
link to the exact log Lesson 24 covered reading. This is genuinely
better than a generic "something failed" email: it's specific and
actionable, with one click to the actual failure.

## Set it once, apply it everywhere

Repeating `on_failure_callback=alert_on_failure` on every single task
gets old fast. `default_args` (already shown above for
`email_on_failure`) applies to every task in the DAG at once:

```python
default_args = {
    "on_failure_callback": alert_on_failure,
    "retries": 2,
    "retry_delay": timedelta(minutes=5),
}

dag = DAG(dag_id="daily_customer_export", default_args=default_args, ...)
```

Now every task in this DAG alerts to Slack on failure, and retries
twice with a 5-minute delay (Lesson 24) — configured once, at the DAG
level, not repeated per task.

## Why this matters more than it seems

A pipeline with no alerting "works" right up until the moment it
silently stops working, and nobody notices until a stakeholder asks
why yesterday's numbers look wrong. The entire value of Chapters 1-4's
visibility (Task Instances, the Grid view, real logs) is undermined if
a human still has to remember to go check it manually every morning.
Alerting is what closes that loop — the pipeline tells you when
something's wrong, instead of you having to go looking.

## Key terms

| Term | Meaning |
|---|---|
| `email_on_failure` | Built-in flag sending an automatic email on task failure, no custom code needed |
| `on_failure_callback` | A Python function Airflow calls with full failure context when a task fails |
| `context` | The dict passed to a callback — task, DAG, run, and log URL, among other details |
| `default_args` | DAG-level settings (retries, callbacks, etc.) applied to every task automatically |

## Lab

1. Configure `email_on_failure` on a test DAG (or read through the
   configuration if you don't have SMTP set up) and confirm you
   understand exactly what triggers it.
2. Write an `on_failure_callback` function that prints a formatted
   alert message using the real `context` dict fields shown above.
3. Move that callback into `default_args` so it applies to every task
   in the DAG, and remove any per-task duplicates.

## Check yourself

This chapter is complete when you can explain, in one sentence, why a
pipeline without alerting is riskier than one with visibility alone
(Task Instances, logs) but no alerting.
