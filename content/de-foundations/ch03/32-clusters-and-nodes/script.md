# Lesson 32 — Clusters and Nodes · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Two words that get used loosely all the time — cluster and node.
Let's define them precisely, because the difference actually
matters.

## S2 · CODE CARD (cluster vs node)

A cluster is the entire group of machines working together. A node
is just one single machine in that group — physical or virtual,
Spark genuinely doesn't care. It just sees some CPU cores and some
memory.

## S3 · CODE CARD (multiple executors)

Last lesson's diagram showed one executor per worker node, for
simplicity. In reality, one node with enough cores and memory can
run several executors at once — each one its own independent
process, with its own slice of that node's resources.

## S4 · STEPS CARD (up vs out)

Which brings up a real tradeoff. Scaling up means fewer, bigger
nodes — less network chatter between them. Scaling out means more,
smaller nodes — and that's genuinely more fault tolerant, because
losing one node only costs you a smaller slice of the total.

## S5 · OUTRO CARD

Cluster is the whole group. Node is one machine. And how you grow —
up or out — is a real decision with real tradeoffs. Next lesson:
Spark partitions — the actual unit of parallelism inside all of this.
See you there.
