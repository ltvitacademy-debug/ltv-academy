# Lesson 56 — SLAs and SLOs for Data Pipelines · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

SLAs and SLOs — three related terms, and how they actually fit
together.

## S2 · CODE CARD (three terms, three jobs)

An SLI is the actual measured number. An SLO is the internal
target a team holds itself to. An SLA is the external promise,
like lesson 50's data contract. Same underlying thing, different
audiences.

## S3 · CODE CARD (the error budget)

An error budget turns an SLO into something spendable — the small
allowed slack you can use on deploys or experiments, rather than
an abstract number nobody acts on.

## S4 · STEPS CARD (why SLO should be stricter)

Setting the SLO equal to the SLA leaves no room for anything to go
even slightly wrong. Setting it stricter builds in a buffer —
normal noise eats into that margin first.

## S5 · OUTRO CARD

A disciplined way of using metrics and alerts already built. Next
up: incident response — what actually happens when the SLO gets
breached.
