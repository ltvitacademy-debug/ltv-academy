# Lesson 19 — CAP Theorem for Data Engineers · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Trade-off analysis: the CAP theorem, for data engineers — and why
it's really only ever a choice between two of its three letters.

## S2 · CODE CARD (the theorem)

Consistency, availability, and partition tolerance. The theorem only
really says something about what happens during a network partition
— outside of one, a well-built system can approach all three.

## S3 · CODE CARD (P isn't optional)

Any real distributed system will eventually hit a partition — that's
a fact, not a choice. So the real question is what a node does when
it happens: refuse to answer and stay consistent, or answer anyway
and stay available but risk a stale answer.

## S4 · CODE CARD (CP and AP already in this stack)

A single-writer transactional source leans CP — it'd rather error
than show an inconsistent balance. A serving-layer cache leans AP —
it'd rather serve slightly stale data than return an error.

## S5 · OUTRO CARD

Real systems rarely sit at a pure extreme — Delta Lake and Cosmos DB
offer tunable consistency per operation. The real question is what
happens during a partition, for this specific read path. Next up:
the first case study, a ride-sharing analytics platform.
