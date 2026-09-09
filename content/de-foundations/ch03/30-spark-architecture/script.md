# Lesson 30 — Spark Architecture · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson covered the general ideas. Now the real, specific
architecture — straight from Apache Spark's own official
documentation, not a simplified version.

## S2 · SCREENSHOT (cluster diagram)

Driver program on the left, cluster manager in the middle, worker
nodes on the right, each running an executor. This is the actual
diagram Spark's own docs use to explain itself.

## S3 · STEPS CARD (four components)

Four components. The driver program is where your actual code runs —
it plans the job, but doesn't do the heavy lifting itself. The
cluster manager allocates machines and resources. A worker node is a
real machine, running one or more executors. And an executor is the
process that actually runs tasks, and can cache data in memory for
reuse.

## S4 · CODE CARD (mapping back)

And every one of these exists to implement last lesson's two ideas.
Data locality: the cluster manager tries to place executors where
the data already lives. Fault tolerance: if a worker node fails
mid-job, the driver notices and reschedules its unfinished tasks
somewhere else.

## S5 · OUTRO CARD

Four real components, two real jobs to do. Next lesson zooms into
the driver and executor relationship specifically — what actually
gets sent back and forth between them. See you there.
