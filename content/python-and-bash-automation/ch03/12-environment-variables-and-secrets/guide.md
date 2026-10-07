# Environment Variables & Secrets

A Northbridge Retail engineer once pushed a quick fix to the shipping-rate script with the carrier's API key hardcoded right in the Python file. The repo was private — until a contractor's access was reviewed months later and the key turned up in the commit history, still live. Nothing was stolen, but the key had to be rotated immediately and the whole team got a reminder: secrets never belong in source code, ever, not even "just for now." This lesson covers the right way to handle them.

## What you'll learn

- How to read configuration from environment variables with `os.environ`
- Using `.env` files and `python-dotenv` for local development
- Why secrets must never be hardcoded or committed to source control
- Where real secrets belong in production: a secrets manager or vault, not a `.env` file

## Reading environment variables

Environment variables are key-value pairs that live in the process's environment, outside your code. Python reads them through `os.environ`:

```python
import os

api_key = os.environ["CARRIER_API_KEY"]        # raises KeyError if unset
api_key = os.environ.get("CARRIER_API_KEY")     # returns None if unset
api_key = os.environ.get("CARRIER_API_KEY", "")  # returns "" if unset
```

Just like dict lookups, `os.environ[...]` raises if the variable isn't set, while `.get()` lets you supply a fallback. For something a script genuinely can't run without — like an API key — failing loudly with `os.environ[...]` is often the right call; you want the missing secret caught immediately, not silently defaulted to an empty string.

## `.env` files for local development

Setting real environment variables by hand every time you open a terminal gets old fast. The common pattern is a `.env` file in the project root, loaded automatically with the `python-dotenv` package (`pip install python-dotenv`):

```
# .env  (never committed to git)
CARRIER_API_KEY=sk_test_51Hs9k2...
WAREHOUSE_DB_PASSWORD=NbRetail!2026secure
```

```python
from dotenv import load_dotenv
import os

load_dotenv()  # reads .env and sets the variables for this process
api_key = os.environ["CARRIER_API_KEY"]
```

`load_dotenv()` reads the `.env` file and injects its contents into `os.environ`, so the rest of your code just calls `os.environ` normally and never knows or cares whether the value came from a real environment variable or a local `.env` file.

## Secrets never belong in source control

This is the rule Northbridge's engineer broke, and it's non-negotiable:

- Never hardcode an API key, password, or token directly in a `.py` file.
- Never commit a `.env` file to git — add it to `.gitignore` the moment you create it.
- A secret that's been committed is compromised the moment it's pushed, even to a private repo, even if you delete it in a later commit — it's still sitting in the git history.
- If a secret does leak, the fix is to rotate it (generate a new one and revoke the old one), not just to remove it from the file.

A `.gitignore` entry is cheap insurance:

```
# .gitignore
.env
*.env.local
```

## `.env` files vs. real secrets managers

A `.env` file is for **local development only**. It's convenient, but it's still a plaintext file sitting on a laptop. Production systems should pull secrets from a dedicated secrets manager or vault instead — services like AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault — which add encryption at rest, access auditing, and automatic rotation that a `.env` file simply can't provide. Northbridge's production deployment scripts now fetch the carrier API key from a vault at runtime; the `.env` file only ever appears on a developer's laptop while testing locally.

## Key terms

- **`os.environ`** — a dict-like mapping of the current process's environment variables
- **`.env` file** — a local, git-ignored file of key=value pairs loaded for development convenience
- **`python-dotenv`** — the package providing `load_dotenv()` to read a `.env` file into `os.environ`
- **Secrets manager / vault** — a production-grade service (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault) for storing and rotating real secrets

## Recap

`os.environ` is how Python code reads configuration and secrets that live outside the source file, and `.env` plus `python-dotenv` make that convenient for local development — as long as the `.env` file is git-ignored and never committed. Beyond your own laptop, real secrets belong in a dedicated secrets manager or vault, not in a plaintext file. Next up: Jinja2 templating, for generating config files instead of hand-writing every environment's version.
