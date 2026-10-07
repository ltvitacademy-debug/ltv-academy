# Script — Capstone Kickoff: Automate a Repetitive Admin Workflow

## Segment 1 (title)

Every time Northbridge opens a new store, the same checklist gets run by hand, taking someone the better part of an hour. This capstone scripts it end to end, over the next two lessons, bringing together almost everything the course has covered.

## Segment 2 (steps)

The tool, launch_store.py, does four things for a new store: renders a store-specific config from a template, sets up an admin user on the store's server using the idempotent routine from lesson 18, pulls a starting inventory baseline from the warehouse API, and alerts the ops team when it's done.

## Segment 3 (code)

The entry point is a small argparse setup taking three required arguments -- store ID, store name, and region. Everything after this parses those arguments and runs the actual workflow, which lesson 23 builds piece by piece.

## Segment 4 (steps)

Done means more than the five steps running once. Every step gets logged and wrapped in try/except instead of being left to crash silently, the API token comes from an environment variable rather than being hardcoded, and the run ends with exactly one Slack alert reporting either success or precisely what failed.

## Segment 5 (outro)

This capstone isn't new material -- it's argparse, YAML, Jinja2, env vars, REST calls, idempotent setup, logging, and alerts, the pieces you've already built, assembled in the order a real workflow actually needs them. Lesson 23 writes launch_store.py.
