# Lesson 18 — ACID Transactions in Delta Lake · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's name the actual guarantee behind everything so far — ACID
transactions.

## S2 · STEPS CARD (the four letters)

Atomicity, consistency, isolation, durability — the classic
database guarantees, now applied to files sitting in ordinary cloud
storage. Every one of these traces back to the exact same
mechanism: numbered, append-only commits, read in strict order.

## S3 · CODE CARD (optimistic concurrency)

Here's how a real conflict actually resolves. Two writers both
read version five and start writing version six at the same time.
Whoever commits first wins that version number. The second writer's
commit gets re-checked — if it doesn't actually conflict, it just
becomes the next version automatically. If it does, that write
fails, with a clear error to retry.

## S4 · CODE CARD (no locking)

No locking, no one writer waiting on another — both proceed
optimistically, and conflicts only get caught at commit time. That
resolves cleanly far more often than you'd expect.

## S5 · OUTRO CARD

Delta Lake adds ACID transactions to files in cloud storage — that
one sentence is why everything else in this chapter is even
possible. Next lesson: schema enforcement, consistency made
concrete for real data.
