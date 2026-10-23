# Lesson 11 — Database Performance Lab

**Chapter 3 · Database & Query Performance · Lesson 11 of 25**

## What you'll learn

- How to recognize a full-table-scan pattern from a real, vague complaint
- How to check whether an existing index actually covers a slow query's real condition
- How to reason about adding a composite index across two fields, not just one
- How to weigh the expected speed gain against the real write cost of one more index
- How to summarize a database-performance finding the way a decision-maker can act on

## The scenario

A report builder on the Service Desk team files a complaint: "the
Incidents by Assignment Group report takes forever to load." The
report groups and filters Incidents by `assignment_group`, restricted
to `opened_at` within a rolling 90-day window, against a table that
has grown past 400,000 records over several years. It used to run in
under two seconds; now it regularly takes fifteen to twenty. You're
asked to find out why, and recommend a fix — in terms someone outside
the database layer can actually evaluate.

## Step 1 — Translate the complaint into a real query shape

Before touching anything, restate the vague complaint as the concrete
thing the database actually has to do, the same discipline Lesson 1's
Slow Request Log taught for forms. This report's real condition is
two fields combined: `assignment_group` equals a specific group, AND
`opened_at` falls within the last 90 days. That's the query shape —
and it's also exactly the kind of condition Lesson 9 described:
fields genuinely used in a real, frequent filter. The complaint "it's
slow" becomes a specific, checkable question: is this two-field
condition backed by an index, or is the database falling back to
checking all 400,000 rows every time this report runs?

## Step 2 — Recognize the full-table-scan pattern

The symptoms line up with Lesson 10's core pattern: a query against a
large, growing table, that used to be fast and has gotten
progressively slower as the table grew — not a sudden one-time spike,
but a steady decline that tracks row count. That trajectory is the
signature of a full table scan: the database has no shortcut for this
condition, so the cost of running it scales directly with how many
rows exist. Two years ago, scanning 150,000 rows was tolerable. Today,
scanning 400,000-plus rows for the same query is not. Nothing about
the report changed — the table simply grew past the point where a
full scan stays invisible.

## Step 3 — Check whether an index actually covers this condition

The next concrete step is checking the table's Dictionary Entries for
`incident` to see whether `assignment_group` and `opened_at` are
indexed — and, just as importantly, whether they're indexed
*together* in a way that covers this specific combined condition.
Having an index on `assignment_group` alone helps a query that only
filters on group, but this report filters on group *and* a date
range at the same time; a composite index built across both fields is
what actually lets the database jump straight to "this group, within
this date window" in one step, rather than finding all rows for the
group and then still checking each one's date individually. This
distinction — a single-field index versus a composite index that
matches the query's real combined condition — is exactly the kind of
detail that separates "we have an index" from "we have the index this
query needs."

## Step 4 — Weigh the fix against its real cost

Suppose the check in Step 3 finds no index covering this combination.
Adding a composite index on `assignment_group` and `opened_at` is the
direct fix, and the expected result, per Lesson 10, is real: the
report's plan shifts from a full scan of 400,000-plus rows to an
indexed lookup that goes straight to the matching rows, which should
bring that fifteen-to-twenty-second load back down dramatically. But
Lesson 9's honest trade-off still applies here: `incident` is one of
the most frequently written tables in the entire instance — created,
updated, and reassigned constantly. One more index on a table that
busy means every one of those writes now also updates this new index.
The recommendation isn't "add every index that would help every
report" — it's weighing this specific report's real, recurring pain
(a stakeholder-visible, worsening report) against the real, ongoing
write cost on a table this active, and concluding that this
particular combination earns its place because it's used constantly
and the table's growth trend means the problem will only keep
worsening without it.

## Step 5 — Report the finding in terms a decision-maker can act on

The summary that goes back to the Service Desk team and to whoever
owns the `incident` table isn't a database lecture. It's: "the report
slowed down because the table grew past the point where this specific
two-field filter can run without scanning every row; adding one
composite index restores the original speed, at the cost of a small
amount of extra overhead on every future Incident write — which is
the same trade-off this course has used from Lesson 9 onward, applied
to a real, specific, worsening complaint instead of a hypothetical
one."

## Key terms

| Term | Meaning |
|---|---|
| Query shape | The real combined filter condition a query evaluates — here, assignment_group plus a date range |
| Composite index | A single index built across more than one field, covering a combined condition no single-field index can |
| Scan-with-growth signature | A query that was fast and has steadily slowed as the table's row count grew — the tell-tale sign of a full scan |
| Cost-justified index | An index added because its read benefit (a specific, recurring, worsening problem) outweighs its write cost on that table |

## Check yourself

A colleague asks: "Why not just index every field on the Incident
table so this never happens again?" Using this lab's reasoning,
explain why that answer is wrong, and what you'd check before adding
any new index to a table this heavily written.
