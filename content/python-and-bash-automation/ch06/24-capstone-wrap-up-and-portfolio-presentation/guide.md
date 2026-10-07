# Capstone: Wrap-Up & Portfolio Presentation

`launch_store.py` renders a config, sets up an admin account, and pulls an inventory baseline — but it still runs silently from someone's terminal, and it still treats every failure the same way. This final lesson adds the Slack alert from the done checklist, handles the failure paths deliberately instead of as an afterthought, and packages the finished project so you can actually show it to someone.

## What you'll learn

- How to add a Slack alert that reports success or exactly what failed
- How to distinguish failure types instead of catching one generic `Exception`
- How to schedule the finished tool and keep its output somewhere useful, tying back to lesson 4
- How to package the project and present it in a portfolio or an interview

## Adding the Slack alert

Reusing the webhook pattern from lesson 21, `main()` now reports its outcome instead of only logging it:

```python
import requests

SLACK_WEBHOOK_URL = os.environ["SLACK_WEBHOOK_URL"]

def send_alert(message):
    requests.post(SLACK_WEBHOOK_URL, json={"text": message})

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
        send_alert(f":white_check_mark: Store {args.store_id} ({args.store_name}) launched successfully")
    except Exception as exc:
        logger.error(f"Store {args.store_id} launch failed: {exc}")
        send_alert(f":rotating_light: Store {args.store_id} launch FAILED: {exc}")
        sys.exit(1)
```

One alert either way — never zero, and never more than one — so whoever's on call knows the outcome without reading the log file.

## Distinguishing failure types on purpose

Lesson 9 taught catching a specific exception before a generic `Exception` fallback, and the capstone is exactly where that habit earns its keep. A failed API call and a failed user-setup step call for different responses, so the `except` block can tell them apart:

```python
try:
    config_path = render_config(args)
    setup_store_admin(args.store_id)
    fetch_inventory_baseline(args.store_id, config_path)
except RuntimeError as exc:
    logger.error(f"Store setup step failed for {args.store_id}: {exc}")
    send_alert(f":rotating_light: {args.store_id} setup failed -- check the server directly: {exc}")
    sys.exit(1)
except requests.exceptions.RequestException as exc:
    logger.error(f"Inventory API call failed for {args.store_id}: {exc}")
    send_alert(f":rotating_light: {args.store_id} inventory pull failed -- retry once the API is back: {exc}")
    sys.exit(1)
```

Whoever reads the Slack alert now knows *where* to look first — the store's server, or the warehouse API — instead of starting from the log file every time.

## Scheduling it and keeping the output

`launch_store.py` isn't a cron job the way the nightly backup is — it runs once, on demand, whenever a new store opens — but it still benefits from lesson 4's habit of never letting output disappear:

```bash
python3 /opt/northbridge/scripts/launch_store.py \
    --store-id nbr-0042 --store-name "Northbridge - Riverside" --region us-east \
    >> /var/log/northbridge/launch-store-runs.log 2>&1
```

Redirecting both stdout and stderr means a run kicked off by whoever's on duty that day leaves the same trail an automated one would, and the dedicated `logging` output inside the script itself gives a second, more structured record alongside it.

## Packaging it for a portfolio

An employer reading this project cares as much about the thinking behind it as the code itself. Structure the repository so that's visible at a glance:

```text
README.md
  1. The problem: what manual step this replaces, and why it matters
  2. Usage: the exact command to run it
  3. Design: why each piece looks the way it does (idempotent setup,
     env-var secrets, specific exception handling, one alert per run)
  4. What I'd add next: retries, a dry-run flag, tests
launch_store.py
templates/store-config.yaml.j2
requirements.txt
```

Be specific about design choices in the README, not just what the code does — "the admin-setup step reuses an idempotent bash script via `subprocess` so it's safe to rerun" says more about your judgment than a line-by-line code walkthrough ever will.

## Course complete

Across six chapters, you've gone from `set -euo pipefail` and your first bash function to a script that templates a config, sets up a server, calls an authenticated API, and alerts a team — real automation, not toy examples. You can now read and write both Bash and Python fluently enough to automate the kind of repetitive admin work every infrastructure team deals with. The next course in the path, Docker & Containers, picks up right where this one leaves off: once your automation scripts are reliable, packaging the things they manage into containers is the next skill on the way to being production-ready.
