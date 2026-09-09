# Lesson 7 — Attaching a Notebook to a Cluster

**Chapter 1 · Databricks Fundamentals · Lesson 7 of 57**

## What you'll learn

- Why a notebook by itself can't run anything at all
- Attaching, and what actually happens when you do
- Detaching, and why it matters more than it seems to
- One cluster, many notebooks — what that shares, and what it doesn't

## A notebook is just text until it's attached

A notebook file, on its own, is nothing more than a saved sequence
of cells — no more capable of executing code than a `.py` file
sitting unopened on disk. Running any cell requires a live Spark
cluster to actually execute it against. **Attaching** is choosing
which cluster (Lesson 4) that notebook sends its code to.

## What attaching actually does

Clicking a cluster's name in the notebook's toolbar starts (or
resumes) a **session** — a live connection between the notebook and
that cluster's driver node (Lesson 4's driver/worker split). From
that point on, running a cell sends its code to the driver, which
runs it against the cluster, and streams the output back to the
notebook. If the cluster isn't running yet, attaching starts it —
which can take a couple of minutes the first time.

## Detaching — clearing the state, not just the connection

Detaching drops the session **and every variable, DataFrame, and
temp view** that existed only in that session's memory — this is
the same "state disappears" idea Foundations covered for a
SparkSession generally, just visible here as an explicit UI action.
Reattaching (to the same or a different cluster) starts completely
fresh; nothing carries over automatically.

## One cluster, many notebooks

Multiple notebooks can attach to the same running cluster
simultaneously — they share the cluster's compute resources, but
each notebook keeps its own separate variables and temp views.
Notebook A creating `trips` doesn't make `trips` visible in Notebook
B, even though both are running on the exact same cluster at the
same time. Shared compute, isolated state.

## Key terms

| Term | Meaning |
|---|---|
| Attach | Connect a notebook to a specific cluster so its cells can actually run |
| Session | The live connection created by attaching — holds all in-memory state |
| Detach | Ends the session, clearing all of that notebook's in-memory state |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: if
two notebooks are attached to the same cluster, why doesn't a
DataFrame created in one show up in the other?
