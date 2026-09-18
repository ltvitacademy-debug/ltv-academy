# Lesson 30 — Compliance Patterns

**Chapter 6 · Advanced Security & Governance · Lesson 30 of 34**

## What you'll learn

- The real, answerable compliance question: who accessed what, when, was it authorized
- Combining audit logs, lineage, and access control — none of them answer it alone
- A worked example: "did anyone outside the approved group ever see an unmasked SSN"
- Chapter 6 close: everything from Chapter 1's Unity Catalog work and this chapter, aimed at one answer

## The question that actually matters

"Governance" and "compliance" get used as buzzwords, but a real
compliance requirement is almost always one specific, answerable
question: **who accessed this data, when, and were they authorized
to at that time.** Not a policy document — an actual query someone
can run and get a real answer to.

## Three signals, combined — none works alone

```text
Audit logs (system.access.audit):
  every query, WHO ran it, WHEN, against WHAT table
  -- answers "who touched this," not "should they have"

Lineage (Chapter 1, Lesson 5):
  traces a sensitive source table forward to every downstream
  table/dashboard it feeds -- answers "what else is exposed
  if THIS table is exposed," not "who actually saw it"

Access control state (Lesson 27, GRANT/masks/row filters):
  what a given user was ENTITLED to see -- answers "was this
  masked for them," not "did they actually run a query"
```

Each signal alone answers a different, narrower question. Audit
logs alone tell you activity without authorization context. Lineage
alone tells you exposure without who actually queried anything.
Access control state alone tells you policy without proof anyone
ever ran a query at all. The real compliance question needs all
three, cross-referenced against each other.

## A worked example

```text
Auditor's question:
  "Did anyone outside the pii-readers group ever see an
   unmasked SSN in Q3?"

To answer it for real:
  1. Query system.access.audit for every SELECT against the
     table carrying the ssn-tagged column, in Q3
  2. For each query, check what group(s) that user belonged
     to AT THAT TIMESTAMP (not today's group membership)
  3. Cross-reference against what masking policy was actually
     active on that column at that timestamp (Lesson 27's
     tag-based policy could have changed mid-quarter)
```

The honest answer to that question is never "here's a screenshot of
the current masking policy" — a policy screenshot proves what's
true *right now*, not what was true for every query that already
ran. Answering it for real means combining audit-log activity with
the access-control state that was actually in effect at each
historical moment, which is exactly why lineage and audit logs
have to be treated as first-class compliance tools (per Lesson 5),
not a graph you glance at once.

## Frameworks don't invent new mechanics

```text
GDPR / HIPAA / SOC 2, etc.:
  each specifies retention periods, response obligations,
  and WHO must be able to answer which question, by when

None of them invent a new technical mechanism -- they all rest
on the SAME backbone: can you actually answer "who accessed
what, when, was it authorized" for real, on demand
```

Whatever specific framework applies, the technical foundation
underneath it is the same three-signal combination this lesson
just walked through — a compliance framework is a set of
obligations layered on top of that answerable question, not a
separate technology to bolt on.

## Chapter 6 complete

Chapter 6, Advanced Security & Governance, is done: row/column
security at scale with tag-based ABAC (27), Delta Sharing's open
protocol (28), keeping credentials out of code with secret scopes
(29), and now tying audit logs, lineage, and access control into a
real compliance answer (30). That closes the security half of this
course. Next, Chapter 7, **DP-750 Prep & Capstone** — the course's
final chapter — turns everything from Chapters 1-6 into exam
readiness and one complete, portfolio-worthy lakehouse pipeline.

## Key terms

| Term | Meaning |
|---|---|
| Audit log | Record of every query, who ran it, and when — activity without authorization context alone |
| Lineage (compliance use) | Tracing exposure of a sensitive source forward to everything it feeds |
| Compliance question | "Who accessed what, when, was it authorized" — the real, answerable question underneath any framework |

## Check yourself

You're ready for Chapter 7 when you can explain, without looking: why
does answering "was this access authorized" require checking the
access-control state that was active *at the time of the query*,
not the policy that's active today?
