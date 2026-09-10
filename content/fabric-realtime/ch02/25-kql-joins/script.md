# Lesson 25 — KQL: Joins · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's combine tables the KQL way — joins.

## S2 · CODE CARD (join kind)

Join kind equals left outer is exactly Databricks Lesson 55's
left join — every left row kept, matched or not, unmatched
columns coming back null. Same core kinds, KQL's own syntax.

## S3 · CODE CARD ($left/$right)

And dollar sign left and dollar sign right resolve a column that
exists on both sides — the exact same problem trips dot vendor
I-D versus zones dot vendor I-D solved before, just written
differently.

## S4 · CODE CARD (the caveat)

But here's the real caveat — joining a stream against a small,
static lookup table is cheap. Joining two large, fast-moving
streams together is genuinely harder — you have to decide how
long to wait for a late match before giving up.

## S5 · OUTRO CARD

Same join concepts, a real new complication once both sides are
moving. Next lesson: KQL's time series functions, bin and its
real relatives.
