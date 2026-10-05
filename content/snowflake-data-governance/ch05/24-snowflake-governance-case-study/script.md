# Lesson 24 — Snowflake Governance Case Study · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Cascade Health Analytics is a fictional company — not a real organization, and nothing in this lesson describes an actual breach. But the scenario is a realistic composite of exactly the kind of gap this course exists to prevent.

## S2 · STEPS CARD (the scenario)

During acquisition due diligence, an audit asks who can query the PATIENT_VISITS table. The answer: a contractor's role, six months after their engagement ended, could still select unmasked patient names and diagnosis codes. Nothing malicious happened, as far as anyone could tell — but nobody could prove that, because nobody had been watching.

## S3 · STEPS CARD (chapters 1-3)

Chapter one: the role was never time-bound or reviewed on offboarding. Chapter two: no masking policy sat on the sensitive columns, so the stale grant meant real data, not masked data. Chapter three: neither column carried a PHI tag, so the gap wasn't findable by search — only by someone remembering.

## S4 · STEPS CARD (chapters 4-5)

Chapter four: nobody was running the grants audit or had a scheduled task watching for stale access — the data was sitting right there in ACCOUNT_USAGE the whole time. Chapter five: the analytics partner's share bypassed a secure view entirely, a second exposure found in the same audit.

## S5 · CODE CARD (the query that should have caught it)

Here's the one query that would have surfaced this in minutes, on day one of offboarding — the same GRANTS_TO_USERS query from Lesson 17. The tooling was never the gap. The habit of running it was.

## S6 · OUTRO CARD

A governance gap is rarely one dramatic failure — it's RBAC without a review cadence, protections without tags to find what needs them, and monitoring views nobody scheduled a query against. Next lesson: the Snowflake Governance Practice Lab — this course's closing, hands-on synthesis.
