# Lesson 12 — Databricks CLI and REST API Basics

**Chapter 1 · Databricks Fundamentals · Lesson 12 of 57**

## What you'll learn

- Everything in this chapter is also reachable without the UI at all
- The Databricks CLI — a thin wrapper over the same REST API
- Authenticating with a personal access token
- Why this matters: automation, and Lakeflow's own foundation (Chapter 5)

## Nothing in this chapter is UI-only

Every action covered so far — creating a cluster, running a job,
listing DBFS files — has a corresponding REST API call underneath
it. The **Databricks CLI** is a command-line tool that wraps that
same API, so you can script anything the UI does, instead of
clicking through it by hand.

## Authenticating

```bash
databricks configure --token
# Prompts for: Databricks Host, and a Personal Access Token
```

A **personal access token** is a long-lived credential, generated
from your user settings inside the workspace, that identifies you
to the API in place of typing a password. Treat it like any other
credential — never commit one to source control.

## A few real commands

```bash
databricks clusters list
databricks fs ls dbfs:/FileStore/
databricks jobs run-now --job-id 12345
```

Notice `databricks fs` mirrors Lesson 8's `%fs`/`dbutils.fs` almost
exactly — same idea, same file operations, just invoked from a
terminal instead of a notebook cell. `databricks jobs run-now`
triggers Lesson 11's scheduled job on demand, outside its normal
schedule — useful for testing a job without waiting for 2 AM.

## Why this matters beyond convenience

A person clicking through the UI doesn't scale to real automation —
a CI/CD pipeline deploying a new notebook version, or a script that
provisions ten workspaces identically, needs something callable, not
clickable. This same REST API is also what Chapter 5's Lakeflow
tooling and any external orchestrator (like Data Factory, from this
track's first course) ultimately calls to actually control
Databricks — the CLI is just the most direct, human-friendly way to
reach that same layer yourself.

## Key terms

| Term | Meaning |
|---|---|
| Databricks CLI | A command-line tool wrapping the Databricks REST API |
| Personal access token | A long-lived credential authenticating API/CLI calls, in place of a password |
| REST API | The underlying interface every Databricks action — UI included — ultimately calls |

## Chapter 1 recap

Workspaces, clusters, notebooks, DBFS, widgets, runtimes, jobs, and
now the API underneath all of it — that's the whole Databricks
platform, end to end. Chapter 2 moves to Delta Lake: the table
format that makes everything you just learned to run actually
reliable.

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why
does real automation need the CLI or REST API, rather than the UI
alone?
