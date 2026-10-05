# Lesson 25 — Snowflake Governance Practice Lab · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Twenty-four lessons have each taught one piece. This one is the synthesis — a single checklist you can run end-to-end against a real Snowflake trial account.

## S2 · STEPS CARD (everything you've built)

Chapter one gave you roles and RBAC — who can do what. Chapters two and three gave you masking and tags — protecting and classifying the data itself. Chapters four and five gave you auditing and sharing — proving it works, and extending it safely to others.

## S3 · STEPS CARD (steps 1-3)

Six real steps, build it rather than just read it. One: create a role and grant it least-privilege access. Two: create a masking policy on one sensitive column. Three: tag that column so the protection is findable later, not just remembered.

## S4 · STEPS CARD (steps 4-6)

Four: query ACCOUNT_USAGE to prove the masking policy actually fired — real proof, not an assumption. Five: share the table, scoped to a secure view, never the raw table. Six: drop something on purpose, then UNDROP it back, so the first time you ever run that command isn't during a real incident.

## S5 · CODE CARD (step 4 in SQL)

Here's step four in full. Run this right after applying your masking policy — a non-null result is your proof it actually evaluated against a real query.

## S6 · OUTRO CARD

Congratulations — you've built a complete governance program in Snowflake: access control, protection, classification, auditing, and governed sharing. The Data Governance path continues next with Power BI Governance — the same discipline, applied to the BI layer most business users actually touch.
