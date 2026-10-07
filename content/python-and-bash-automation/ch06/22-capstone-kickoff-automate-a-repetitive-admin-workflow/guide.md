# Capstone Kickoff: Automate a Repetitive Admin Workflow

Every time Northbridge Retail opens a new store, the same checklist gets run by hand: create a local admin account on the store's server, write a config file with that store's details, pull a starting inventory baseline from the warehouse API, and let the ops team know it's done. It takes someone the better part of an hour, and it's exactly the kind of multi-step, error-prone, "we do this every single time" task this entire course has been preparing you to script. This capstone builds that one script, start to finish, over the next two lessons.

## What you'll learn

- The capstone project you'll build across lessons 23 and 24
- Exactly what "done" looks like, as a concrete checklist
- Why this project is scoped around one real workflow, not five unrelated ones
- How almost every earlier lesson in this course maps onto one specific part of the build

## The project: `launch_store.py`

Across the next two lessons, you'll build a single command-line tool, `launch_store.py`, that automates Northbridge's new-store setup end to end. Given a store ID, a name, and a region, it will:

1. Render a store-specific config file from a Jinja2 template and write it to disk
2. Create a local admin user on the store's server with an idempotent setup routine
3. Call Northbridge's internal inventory API to pull a starting stock baseline and save it as JSON
4. Log every step to a file, so there's a record of exactly what happened
5. Post a summary to Slack when the run finishes — success or failure

It is deliberately *one* workflow, done completely, rather than three or four half-finished ones. A script that reliably does these five things end to end demonstrates everything that matters more convincingly than a sprawling tool that does twice as much but falls over halfway through.

## What "done" looks like

```
[ ] A CLI entry point built with argparse: --store-id, --store-name, --region
[ ] A YAML config template rendered per-store with Jinja2
[ ] An idempotent user-setup step, reusing lesson 18's pattern
[ ] An authenticated call to the inventory API, with the token from an env var
[ ] Every step wrapped in try/except and recorded with the logging module
[ ] A Slack alert at the end reporting success, or exactly what failed
```

Lesson 23 builds items one through four — the config, the user setup, and the API call, all wired together and logged. Lesson 24 adds the Slack alert, handles the failure paths deliberately instead of as an afterthought, and turns the finished project into something you can show in a portfolio or an interview.

## Mapping the course onto the build

Almost nothing in this capstone is a new concept — it's the course's earlier lessons applied together instead of in isolation:

```
Lesson 8  (argparse)              -> the launch_store.py CLI entry point
Lesson 11 (YAML & config files)   -> the store config template
Lesson 13 (Jinja2 templating)     -> rendering that template per-store
Lesson 12 (env vars & secrets)    -> the inventory API token, never hardcoded
Lesson 14 (REST APIs)             -> the call to the inventory API
Lesson 18 (user & server setup)   -> the idempotent admin-account step
Lesson 9  (logging & errors)      -> every step logged, every failure caught
Lesson 21 (health checks & alerts)-> the Slack notification pattern, reused for a one-off report instead of a recurring check
```

The work ahead isn't learning anything new — it's assembling pieces you've already built, in the order a real workflow actually needs them.

## Key terms

| Term | Meaning |
|---|---|
| Capstone scope | The single, deliberately complete workflow (`launch_store.py`) that applies most of this course's skills together |
| Done checklist | The concrete list of working features that defines capstone completion, not a vague goal |
| End-to-end | Covering every step of the real workflow, from CLI input to the final Slack notification |

## Check yourself

Before starting lesson 23, look back at the "done" checklist and, for each item, name which earlier lesson in this course it comes from. If you can't place one, that's worth a quick review before you start building.
