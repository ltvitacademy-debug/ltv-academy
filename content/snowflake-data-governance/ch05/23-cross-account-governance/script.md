# Lesson 23 — Cross-Account Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Everything in this course so far has governed a single account. In practice, most real organizations running Snowflake have more than one.

## S2 · STEPS CARD (one company, many accounts)

A dev account, a test account, a production account, sometimes a separate account per region. The real risk: a masking policy gets carefully built in one account, and nobody remembers to replicate that discipline when a new account gets spun up six months later.

## S3 · CODE CARD (SHOW ACCOUNTS)

An organization administrator can list every account that exists with SHOW ACCOUNTS. This is the starting point for any cross-account review — you can't apply a consistent policy across accounts you don't have a complete list of.

## S4 · CODE CARD (replication)

Database replication keeps a secondary account's copy current with a primary. The governance-relevant detail: masking policies, row access policies, and tags replicate right along with the data — the secondary arrives already protected, not as an unsecured copy someone has to remember to lock down.

## S5 · STEPS CARD (what travels with the org)

Three things a single-account mindset tends to forget: one RBAC model, not a fresh ad-hoc structure per account. One tag taxonomy, meaning the same thing everywhere. One audit cadence, run against every account, not just the one most people log into.

## S6 · OUTRO CARD

Next lesson: Snowflake Governance Case Study — one fictional company, every chapter of this course applied in sequence.
