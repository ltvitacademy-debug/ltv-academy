# Error Handling & Retry Pattern Reference

From Lesson 41.

## Catch specific exceptions, never a bare `except:`

```python
# Don't
try:
    response = requests.get(url, timeout=10)
except:
    pass

# Do
try:
    response = requests.get(url, timeout=10)
    response.raise_for_status()
except requests.exceptions.Timeout:
    logger.error("API timed out")
    raise
except requests.exceptions.HTTPError as e:
    logger.error("API returned an error: %s", e)
    raise
```

A bare `except:` catches everything, including bugs you'd actually
want to see (a `NameError` from a typo). Catching specific exceptions
means only anticipated failures get handled; everything else still
surfaces.

## Exponential backoff for a flaky call

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

## Fail loud, never silently swallow

```python
# Don't -- "works" but loads zero rows with no warning
try:
    df = pd.read_csv("orders.csv")
except Exception:
    df = pd.DataFrame()

# Do -- fails immediately, visibly, with a clear cause
try:
    df = pd.read_csv("orders.csv")
except FileNotFoundError:
    logger.critical("orders.csv not found -- cannot continue")
    raise
```

## Wrapping a pipeline so failures are detectable

```python
def run_pipeline():
    try:
        extract()
        transform()
        load()
    except Exception:
        logger.exception("Pipeline failed")
        raise   # re-raise so the script exits non-zero
    else:
        logger.info("Pipeline completed successfully")
```

Re-raising after logging is what lets a scheduler (cron, Task
Scheduler, a CI job) detect the run failed via its exit code — a
script that "handles" every error without re-raising looks identical
to a successful run from the outside.

## Checklist

- [ ] No bare `except:` anywhere in the pipeline.
- [ ] Any retried call uses backoff, not a fixed, tight interval.
- [ ] A missing required input fails loud and stops the pipeline —
      never silently substitutes empty/default data.
- [ ] The top-level pipeline function re-raises after logging, so the
      process exits non-zero on failure.
