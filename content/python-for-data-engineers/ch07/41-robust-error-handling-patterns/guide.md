# Lesson 41 — Robust Error Handling Patterns

**Chapter 7 · Logging, Testing, Error Handling and Automation · Lesson 41 of 48**

## What you'll learn

- Why a scheduled script needs a different error-handling style than a notebook
- Catching specific exceptions instead of a bare `except:`
- Retrying a flaky network call with backoff
- Failing loudly instead of silently swallowing an error

## Specific exceptions, not a bare except

```python
import requests

def fetch_exchange_rates(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.Timeout:
        logger.error("Exchange rate API timed out")
        raise
    except requests.exceptions.HTTPError as e:
        logger.error("Exchange rate API returned an error: %s", e)
        raise
```

A bare `except:` catches *everything*, including a `KeyboardInterrupt`
or a typo that raises `NameError` — errors you actually want to see,
not silently hide. Catching `requests.exceptions.Timeout` and
`HTTPError` specifically means you only handle the failures you
actually anticipated, and anything truly unexpected still surfaces.

## Retrying a flaky call with backoff

```python
import time

def fetch_with_retry(url, max_attempts=3):
    for attempt in range(1, max_attempts + 1):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.warning("Attempt %d/%d failed: %s", attempt, max_attempts, e)
            if attempt == max_attempts:
                logger.error("All %d attempts failed", max_attempts)
                raise
            time.sleep(2 ** attempt)  # 2s, 4s, 8s
```

A single failed API call shouldn't necessarily kill the whole
pipeline — a lot of real-world failures (a dropped connection, a
server hiccup) resolve themselves if you just wait and try again.
`2 ** attempt` is exponential backoff: waiting longer after each
failure instead of hammering a struggling server at a fixed interval.

## Failing loudly instead of silently swallowing

```python
# Don't do this:
try:
    df = pd.read_csv("orders.csv")
except Exception:
    df = pd.DataFrame()  # silently continue with no data

# Do this instead:
try:
    df = pd.read_csv("orders.csv")
except FileNotFoundError:
    logger.critical("orders.csv not found — cannot continue")
    raise
```

The first version "works" in the sense that the script doesn't
crash — but it also quietly loads zero rows and nobody finds out
until a report downstream looks wrong, days later. The second version
fails fast and loud, exactly when the problem happens, which is
almost always what a data pipeline should do with a missing required
input.

## Wrapping a pipeline step with context

```python
def run_pipeline():
    try:
        extract()
        transform()
        load()
    except Exception:
        logger.exception("Pipeline failed")
        raise
    else:
        logger.info("Pipeline completed successfully")
```

This connects back to Lesson 37's idempotency discussion: if
`run_pipeline()` re-raises after logging, a scheduler like cron or
Task Scheduler sees the script exit with a non-zero status, which is
what lets it (or a monitoring tool watching for that exit code) flag
the run as failed instead of assuming silent success.

## Key terms

| Term | Meaning |
|---|---|
| Bare `except:` | Catches every exception, including ones you didn't anticipate — avoid it |
| Exponential backoff | Waiting progressively longer between retries of a flaky operation |
| Fail loud | Raising/logging an error clearly instead of silently continuing with bad or missing data |
| Non-zero exit status | How a script signals failure to whatever scheduled or triggered it |

## Lab

Add a retry with backoff to a mock unreliable call:

```python
import random
import time

def unreliable_call():
    if random.random() < 0.7:
        raise ConnectionError("simulated network blip")
    return "success"

def call_with_retry(max_attempts=4):
    for attempt in range(1, max_attempts + 1):
        try:
            return unreliable_call()
        except ConnectionError as e:
            print(f"Attempt {attempt} failed: {e}")
            if attempt == max_attempts:
                raise
            time.sleep(2 ** attempt)

print(call_with_retry())
```

Run it a few times and confirm it either eventually succeeds, or
raises clearly after exhausting all attempts.

## Check yourself

You're ready for Lesson 42 when you can explain, without looking: why
is catching `requests.exceptions.Timeout` specifically better than a
bare `except:`, and why should a pipeline fail loudly rather than
silently continue with missing data?
