# Lesson 12 — Databricks CLI and REST API Basics · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes (chapter finale).

---

## S1 · TITLE CARD

Everything in this chapter is also reachable without the UI at
all — the CLI and REST API.

## S2 · CODE CARD (authenticating)

Databricks configure dash dash token sets up a personal access
token — a long-lived credential that identifies you to the API in
place of a password. Treat it like any other credential, and never
commit one to source control.

## S3 · CODE CARD (real commands)

From there: list clusters, list DBFS files, or trigger a job right
now. Notice databricks f-s mirrors Lesson 8's percent f-s almost
exactly — same file operations, just from a terminal instead of a
notebook cell.

## S4 · CODE CARD (why it matters)

This matters beyond convenience — a person clicking through a UI
doesn't scale to real automation. And this same REST API is exactly
what Chapter 5's Lakeflow tooling, and any external orchestrator,
ultimately calls to control Databricks at all.

## S5 · OUTRO CARD (chapter recap)

Workspaces, clusters, notebooks, DBFS, widgets, runtimes, jobs, and
the API underneath all of it — that's the whole platform. Chapter
2: Delta Lake, making everything you just learned to run, actually
reliable.
