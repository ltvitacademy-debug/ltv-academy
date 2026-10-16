# Lesson 43 — Environment Variables & Secrets Management

**Chapter 7 · Logging, Testing, Error Handling and Automation · Lesson 43 of 48**

## What you'll learn

- Why a database password or API key should never be hardcoded in a script
- Reading secrets from environment variables with `os.environ`
- `python-dotenv` — keeping secrets in a local `.env` file, out of source control
- A safe pattern for required vs. optional configuration

## Why not just hardcode it

```python
# Never do this:
conn = pyodbc.connect(
    "SERVER=prod-db.company.com;DATABASE=Orders;UID=etl_user;PWD=Sup3rSecret!"
)
```

If this script ever gets committed to a shared repository, backed up
somewhere, or even just read by someone over your shoulder, the
production password is exposed. Chapter 6's config-driven script
already separated *settings* from code — secrets need the same
treatment, and more carefully, since leaking one is a real security
incident, not just an inconvenience.

## Reading from environment variables

```python
import os

server = os.environ["DB_SERVER"]
password = os.environ["DB_PASSWORD"]
```

```bash
# set once in your shell, or in the scheduler's environment config
export DB_SERVER=prod-db.company.com
export DB_PASSWORD=Sup3rSecret!
```

`os.environ["DB_PASSWORD"]` reads a value the operating system holds
in memory for the running process — it's never written anywhere in
the script itself, and `os.environ[...]` (versus `.get()`) raises a
clear `KeyError` immediately if the variable isn't set, rather than
silently proceeding with no password at all.

## python-dotenv for local development

```bash
pip install python-dotenv
```

```
# file: .env  (add this filename to .gitignore!)
DB_SERVER=localhost
DB_PASSWORD=dev_password_only
```

```python
from dotenv import load_dotenv
import os

load_dotenv()  # reads .env and loads it into os.environ

server = os.environ["DB_SERVER"]
password = os.environ["DB_PASSWORD"]
```

`load_dotenv()` reads the `.env` file and populates `os.environ` with
its contents, so the rest of the script's code is identical whether
the values came from a real `.env` file on your laptop or from
variables the production scheduler set directly — only the source
changes, never the code that reads them.

## Required vs. optional configuration

```python
import os

def get_config():
    try:
        db_password = os.environ["DB_PASSWORD"]  # required -- fail if missing
    except KeyError:
        raise RuntimeError("DB_PASSWORD environment variable is not set")

    retry_limit = int(os.environ.get("RETRY_LIMIT", "3"))  # optional, with a default

    return {"db_password": db_password, "retry_limit": retry_limit}
```

Not every setting is equally critical — a missing password should
stop the script immediately with a clear message (this is Lesson
41's "fail loud" principle applied to configuration), while a missing
`RETRY_LIMIT` can reasonably fall back to a sensible default with
`.get("RETRY_LIMIT", "3")` instead of crashing.

## Key terms

| Term | Meaning |
|---|---|
| `os.environ["KEY"]` | Reads a required environment variable; raises `KeyError` if missing |
| `os.environ.get("KEY", default)` | Reads an optional variable, falling back to `default` if missing |
| `python-dotenv` | Loads a local `.env` file's contents into `os.environ` for development |
| `.gitignore` | Where `.env` belongs, so secrets never get committed to source control |

## Lab

```python
# file: .env
API_KEY=dev-key-12345
TIMEOUT_SECONDS=10
```

```python
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.environ["API_KEY"]
timeout = int(os.environ.get("TIMEOUT_SECONDS", "30"))
max_retries = int(os.environ.get("MAX_RETRIES", "5"))  # not in .env -- uses the default

print(f"Using API key starting with: {api_key[:3]}...")
print(f"Timeout: {timeout}s, Max retries: {max_retries}")
```

Confirm `timeout` comes from the `.env` file while `max_retries`
falls back to its default, and that removing `API_KEY` from `.env`
makes the script raise a `KeyError` instead of continuing silently.

## Check yourself

You're ready for Lesson 44 when you can explain, without looking: why
should `.env` never be committed to source control, and when should a
missing configuration value raise an error instead of falling back to
a default?
