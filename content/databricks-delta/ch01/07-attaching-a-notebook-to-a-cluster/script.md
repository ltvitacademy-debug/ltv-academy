# Lesson 7 — Attaching a Notebook to a Cluster · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

You've got a notebook and a cluster — now let's connect them.

## S2 · CODE CARD (just text until attached)

A notebook, on its own, is just a saved sequence of cells — no more
runnable than an unopened Python file sitting on disk. Attaching is
choosing which cluster it actually sends its code to.

## S3 · CODE CARD (what attaching does)

Clicking a cluster's name starts a session — a live connection to
that cluster's driver node. From there, running a cell sends the
code to the driver, runs it on the cluster, and streams the output
back. If the cluster isn't running yet, attaching starts it.

## S4 · CODE CARD (detaching)

Detaching does more than close a connection — it clears every
variable, DataFrame, and temp view that existed only in that
session's memory. Reattaching, even to the same cluster, starts
completely fresh. Nothing carries over automatically.

## S5 · OUTRO CARD

And multiple notebooks can share one cluster's compute, while
keeping their own state completely separate. Next lesson: DBFS,
where files actually live on a cluster.
