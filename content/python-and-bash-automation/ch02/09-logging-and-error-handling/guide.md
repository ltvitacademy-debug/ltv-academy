# Logging & Error Handling

A script that fails silently is worse than one that crashes loudly — at Northbridge Retail, more than one automation job has quietly stopped running and nobody noticed for days, because nothing it wrote down said so. This lesson covers Python's `logging` module and `try`/`except` error handling, so your automation scripts always leave a trail and always fail in a way someone can act on.

## What you'll learn

- How to use the `logging` module instead of scattering `print()` calls everywhere
- Log levels, handlers, and formatting — and logging to a file as well as the console
- How `try`/`except` catches and handles errors without crashing the whole script
- How to write a custom exception and build simple retry logic

## Why logging instead of print

`print()` always prints, always to the console, with no severity and no timestamp. `logging` fixes all three.

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("northbridge.backup")

logger.debug("This won't show — default level is INFO")
logger.info("Backup job started for nbr-db-01")
logger.warning("Backup is taking longer than usual")
logger.error("Backup failed: connection to nbr-db-01 timed out")
```

Levels run `DEBUG` < `INFO` < `WARNING` < `ERROR` < `CRITICAL`. Setting `level=logging.INFO` means `DEBUG` messages are suppressed, but everything `INFO` and above still shows.

## Handlers and formatting: file and console

A **handler** decides where a log message goes. You can attach more than one — Northbridge sends everything to a file for the record, and warnings-or-worse to the console so an operator notices immediately.

```python
logger = logging.getLogger("northbridge.backup")
logger.setLevel(logging.DEBUG)

file_handler = logging.FileHandler("/var/log/northbridge/backup.log")
file_handler.setLevel(logging.DEBUG)

console_handler = logging.StreamHandler()
console_handler.setLevel(logging.WARNING)

formatter = logging.Formatter("%(asctime)s %(levelname)s %(name)s: %(message)s")
file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)

logger.addHandler(file_handler)
logger.addHandler(console_handler)

logger.info("This goes to the file only")
logger.error("This goes to both the file and the console")
```

## try/except patterns

Wrap anything that might fail — a file read, a network call, a database connection — in `try`/`except` so one bad server doesn't crash the entire run.

```python
servers = ["nbr-web-01", "nbr-web-02", "nbr-offline-03"]

for server in servers:
    try:
        connect_and_check(server)
        logger.info(f"{server}: health check passed")
    except ConnectionError as exc:
        logger.error(f"{server}: could not connect ({exc})")
    except Exception as exc:
        logger.error(f"{server}: unexpected error ({exc})")
```

Catch the specific exception you expect (`ConnectionError`) before a broad `Exception` fallback, so you can react differently to different failures instead of treating everything the same way.

## Custom exceptions and retry logic

A custom exception makes your own failure conditions explicit instead of overloading a generic `Exception`.

```python
class HealthCheckError(Exception):
    """Raised when a Northbridge server fails its health check."""

def check_server(server, max_attempts=3):
    for attempt in range(1, max_attempts + 1):
        try:
            connect_and_check(server)
            return True
        except ConnectionError as exc:
            logger.warning(f"{server}: attempt {attempt} failed ({exc})")
    raise HealthCheckError(f"{server} failed {max_attempts} health check attempts")
```

This retries up to `max_attempts` times before giving up, logging each failed attempt along the way, and finally raises a clear, specific `HealthCheckError` instead of letting the last `ConnectionError` speak for the whole situation.

## Key terms

- **Logger** — the object you call `.info()`, `.warning()`, `.error()` on to record a message
- **Log level** — severity ranking: DEBUG, INFO, WARNING, ERROR, CRITICAL
- **Handler** — decides where a log message is sent (file, console, etc.)
- **try/except** — catches an exception so it can be handled instead of crashing the script
- **Custom exception** — a class inheriting from `Exception` that names a specific failure condition

## Recap

Replace scattered `print()` calls with a proper `logging` setup — levels, a file handler, a console handler, and clear formatting — so every run leaves a real trail. Wrap risky calls in `try`/`except`, catch specific exceptions before generic ones, and use custom exceptions and simple retry loops so failures are visible and actionable instead of silent. That closes out Chapter 2 — next, Chapter 3 moves into data formats and configuration, starting with JSON.
