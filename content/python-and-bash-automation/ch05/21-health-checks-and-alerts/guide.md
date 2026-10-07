# Health Checks & Alerts

A backup that fails silently and a server that goes down silently share the same problem: nobody finds out until a customer does. This lesson closes that gap by building a health-check script that tests Northbridge's services the way the `*/15 * * * *` cron line from lesson 4 schedules it to, and — when something's actually wrong — tells a human immediately instead of just writing another line to a log nobody's watching in real time.

## What you'll learn

- How to check an HTTP endpoint's health with `requests` and a timeout
- How to check local resources — disk space — without an HTTP call at all
- How to send an alert to Slack via a webhook, reusing the `requests.post` pattern from earlier chapters
- How to avoid alert fatigue by only alerting on a state *change*, not every single check

## Checking an HTTP endpoint

Northbridge's checkout service exposes a `/health` endpoint that returns `200` when it's working. Checking it is one `requests` call — with a timeout, since a hung server that never responds is exactly the kind of problem a health check needs to catch:

```python
import requests

def check_endpoint(url, timeout=5):
    try:
        response = requests.get(url, timeout=timeout)
        return response.status_code == 200
    except requests.exceptions.RequestException:
        return False

healthy = check_endpoint("https://checkout.northbridge.internal/health")
print("Checkout service:", "OK" if healthy else "DOWN")
```

The `timeout` matters as much as the status code check — without it, `requests.get()` can hang indefinitely waiting for a server that's stopped responding, which turns a health check into the very thing it was supposed to catch.

## Checking local resources

Not every health check is a network call. Disk space is checked locally with `shutil.disk_usage`:

```python
import shutil

def check_disk_space(path="/", threshold_percent=90):
    usage = shutil.disk_usage(path)
    percent_used = (usage.used / usage.total) * 100
    return percent_used < threshold_percent, percent_used

ok, percent = check_disk_space("/var")
print(f"/var disk usage: {percent:.1f}%", "OK" if ok else "WARNING")
```

`disk_usage` returns a named tuple of `total`, `used`, and `free` bytes; comparing `used / total` against a threshold turns that into a simple pass/fail a script can act on.

## Sending an alert to Slack

A failed check that nobody sees is almost as bad as no check at all. The same `requests.post` pattern used for calling REST APIs earlier in this course sends a message to a Slack incoming webhook:

```python
import os
import requests

SLACK_WEBHOOK_URL = os.environ["SLACK_WEBHOOK_URL"]

def send_alert(message):
    requests.post(SLACK_WEBHOOK_URL, json={"text": f":rotating_light: {message}"})

send_alert("checkout.northbridge.internal health check failed (no response)")
```

Keeping the webhook URL in an environment variable, rather than hardcoded in the script, follows the same secrets-handling rule from lesson 12 — a Slack webhook URL is a credential, since anyone who has it can post messages as Northbridge's monitoring.

## Avoiding alert fatigue: alert on change, not on every check

A health check that runs every 15 minutes and alerts every time it fails will send the same alert ninety-six times a day if the problem isn't fixed quickly — and after the first few, people stop reading them. Tracking the *previous* state and alerting only on a transition fixes that:

```python
import json
from pathlib import Path

STATE_FILE = Path("/var/lib/northbridge/health-state.json")

def check_and_alert(name, is_healthy):
    state = json.loads(STATE_FILE.read_text()) if STATE_FILE.exists() else {}
    was_healthy = state.get(name, True)

    if is_healthy != was_healthy:
        status = "RECOVERED" if is_healthy else "DOWN"
        send_alert(f"{name} is now {status}")

    state[name] = is_healthy
    STATE_FILE.write_text(json.dumps(state))
```

One alert when something breaks, one alert when it recovers, and silence in between — that's a monitoring script people keep paying attention to.

## Key terms

| Term | Meaning |
|---|---|
| `timeout` | A limit on how long `requests` waits for a response before giving up |
| `shutil.disk_usage` | Returns total/used/free bytes for a given path, without any network call |
| Incoming webhook | A Slack-provided URL that posts a message into a channel when sent a JSON payload |
| Alert on change | Sending a notification only when status flips, not on every single check |

## Recap

A health check combines a network test (`requests`, with a timeout) and a local resource test (`shutil.disk_usage`), and when either one fails, posts to a Slack webhook using the same `requests.post` pattern from earlier in the course. Tracking previous state and alerting only on a transition keeps those alerts something people actually read. That wraps up Chapter 5's real automation tasks — the capstone in Chapter 6 puts nearly everything from this course together into one project.
