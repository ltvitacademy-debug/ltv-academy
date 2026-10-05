# Lesson 19 — Monitoring Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 18 ended with one idea: schedule the audit query instead of re-typing it. This lesson takes that seriously — not as one scheduled query, but as a small program of them.

## S2 · STEPS CARD (audit vs monitoring)

An audit is one question, answered once, to investigate something that already happened. Monitoring is many questions, answered on a recurring schedule, to catch a gap before it becomes an incident.

## S3 · CODE CARD (CREATE TASK)

Here's the real mechanism: a Snowflake Task. This one runs the grants-audit query every morning at 7am and writes anything it finds into an alerts table — the same query from Lesson 20's dashboard, just running itself now instead of waiting for someone to remember.

## S4 · STEPS CARD (four things to watch)

A monitoring program doesn't need to check everything. Four things worth a recurring check: new privileged grants, spikes in failed logins, sensitive columns with no masking policy actually applied, and warehouse spend anomalies caught by resource monitors.

## S5 · OUTRO CARD

Next lesson: Governance Dashboards in Snowflake — turning these scheduled checks into something a reviewer can actually look at.
