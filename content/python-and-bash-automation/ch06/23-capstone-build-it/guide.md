# Capstone: Build It

Lesson 22 laid out the plan: `launch_store.py`, one CLI tool that renders a store's config, sets up its admin user, pulls an inventory baseline, and logs every step. This lesson writes it — the first four items on the done checklist, wired together into one script that actually runs.

## What you'll learn

- How to build the CLI entry point with `argparse`
- How to render a per-store YAML config from a Jinja2 template, the way lesson 13 generated per-environment configs
- How to reuse lesson 18's idempotent user-setup script from inside Python
- How to pull data from an authenticated REST API and save it, with every step logged and wrapped in `try`/`except`

## The CLI entry point

Three required arguments identify the store being launched:

```python
import argparse

def parse_args():
    parser = argparse.ArgumentParser(description="Automate Northbridge new-store setup")
    parser.add_argument("--store-id", required=True)
    parser.add_argument("--store-name", required=True)
    parser.add_argument("--region", required=True)
    return parser.parse_args()
```

`required=True` means `argparse` itself rejects a call missing any of the three, with a usage message, before a single line of the actual workflow runs.

## Rendering the store's config

A Jinja2 template, `store-config.yaml.j2`, holds the shape of every store's config file:

```yaml
store_id: {{ store_id }}
store_name: {{ store_name }}
region: {{ region }}
inventory_baseline_file: /opt/northbridge/stores/{{ store_id }}/inventory-baseline.json
```

Rendering it per-store and writing the result to disk is the same `Environment`/`FileSystemLoader` pattern from lesson 13:

```python
import os
from jinja2 import Environment, FileSystemLoader

def render_config(args):
    env = Environment(loader=FileSystemLoader("templates"))
    template = env.get_template("store-config.yaml.j2")
    rendered = template.render(
        store_id=args.store_id, store_name=args.store_name, region=args.region
    )

    config_path = f"/opt/northbridge/stores/{args.store_id}/store-config.yaml"
    os.makedirs(os.path.dirname(config_path), exist_ok=True)
    with open(config_path, "w") as f:
        f.write(rendered)

    logger.info(f"Wrote config for {args.store_id} to {config_path}")
    return config_path
```

## Setting up the store's admin user

Rather than reimplementing lesson 18's idempotent bash script, this step just calls it — the capstone reuses working code instead of duplicating it:

```python
import subprocess

def setup_store_admin(store_id):
    username = f"store-admin-{store_id}"
    result = subprocess.run(
        ["sudo", "/opt/northbridge/scripts/setup-user.sh",
         username, "/opt/northbridge/keys/store-admin.pub"],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(f"User setup failed for {username}: {result.stderr.strip()}")
    logger.info(f"Admin user {username} ready")
```

Raising `RuntimeError` on a non-zero `returncode`, instead of just logging and continuing, matters here — the next step depends on this one having actually worked, so the whole run needs to stop rather than press on with no admin account in place.

## Pulling the inventory baseline

The token comes from an environment variable, never hardcoded, following lesson 12's rule, and `response.raise_for_status()` turns an HTTP error into a Python exception instead of silently saving a bad response:

```python
import json
import yaml
import requests

def fetch_inventory_baseline(store_id, config_path):
    token = os.environ["WAREHOUSE_API_TOKEN"]
    response = requests.get(
        f"https://warehouse.northbridge.internal/api/stores/{store_id}/inventory",
        headers={"Authorization": f"Bearer {token}"},
        timeout=10,
    )
    response.raise_for_status()

    config = yaml.safe_load(open(config_path))
    baseline_path = config["inventory_baseline_file"]
    os.makedirs(os.path.dirname(baseline_path), exist_ok=True)
    with open(baseline_path, "w") as f:
        json.dump(response.json(), f, indent=2)

    logger.info(f"Inventory baseline saved to {baseline_path}")
```

## Tying it together

`main()` runs the three steps in order, inside one `try`/`except`, so any failure — a bad template, a down API, an unreachable server — gets logged clearly and stops the run instead of leaving a half-finished store setup behind:

```python
import logging
import sys

logger = logging.getLogger("northbridge.launch_store")

def main():
    logging.basicConfig(
        filename="/var/log/northbridge/launch-store.log",
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
    )
    args = parse_args()

    try:
        config_path = render_config(args)
        setup_store_admin(args.store_id)
        fetch_inventory_baseline(args.store_id, config_path)
        logger.info(f"Store {args.store_id} launch completed successfully")
    except Exception as exc:
        logger.error(f"Store {args.store_id} launch failed: {exc}")
        sys.exit(1)

if __name__ == "__main__":
    main()
```

Run it with `python launch_store.py --store-id nbr-0042 --store-name "Northbridge - Riverside" --region us-east`, and the three steps from the kickoff checklist run in order, every one of them logged.

## Key terms

| Term | Meaning |
|---|---|
| `required=True` | An `argparse` option that rejects a call missing that argument, before any workflow code runs |
| `response.raise_for_status()` | Turns an HTTP error status into a Python exception instead of a silently bad response |
| Reusing a script from Python | Calling an existing, working bash script with `subprocess` rather than rewriting its logic |

## Recap

`launch_store.py` now parses its CLI arguments, renders a per-store config with Jinja2, sets up the admin account by reusing lesson 18's idempotent script, and pulls an inventory baseline from an authenticated API — with every step logged and the whole run wrapped in one `try`/`except`. Lesson 24 adds the Slack alert, handles the failure paths on purpose, and turns this into something you can present.
