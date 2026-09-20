# Capstone: Document Your Findings

A fix nobody wrote down is a fix nobody can learn from — including future-you, six months
from now, staring at `IX_Orders_CustomerID_OrderDate` wondering why it exists. T-SQL for
Database Administrators built a habit of documenting what you find; this lesson applies
that habit to a real tuning write-up, for a real audience.

## What you'll learn

- A write-up structure that works for both a manager and the next DBA who touches this
- How to translate the TrailWorks Co-op fix into language each audience actually needs
- Why "what changed" is only half the document — "why" is the half that ages well

## A structure that serves two audiences at once

A manager skimming a status channel and a DBA debugging this table in a year want
different depths of the same information. Five short sections cover both:

1. **Summary** — one or two sentences, no jargon: *"Order History lookups for high-volume
   wholesale accounts were timing out during peak hours; root cause was a missing
   covering index; fixed and verified on [date]."*
2. **Symptom** — what was actually reported: MeridianConnect Order History panel timing
   out after 30 seconds for certain accounts, worst 10 AM–2 PM, starting ~6 weeks prior.
3. **Root cause** — the specific, technical finding: `dbo.usp_CustomerOrderHistory`'s
   only supporting index, `IX_Orders_CustomerID`, didn't cover the query, causing a Key
   Lookup per row — 18,400 of them for a wholesale account like TrailWorks Co-op — which
   in turn drove dominant `PAGEIOLATCH_SH` waits at peak concurrency.
4. **Change made** — the exact `CREATE INDEX` and `DROP INDEX` statements from Lesson 49,
   verbatim, not paraphrased. Anyone auditing this change later needs the real T-SQL, not
   a summary of it.
5. **Result** — the verified numbers from Lesson 50: duration ~28,000 ms → ~85 ms, logical
   reads ~118,000 → ~350, `PAGEIOLATCH_SH` waits for this query effectively eliminated, no
   measurable write-side regression confirmed via index usage stats.

## Writing for a manager vs. writing for a DBA

The manager-facing version leans on the **summary** and **result** — plain language, a
before/after number, a date, and a sentence on customer impact ("wholesale accounts, the
ones most likely to escalate, are now unaffected"). The DBA-facing version leans on
**root cause** and **change made** — the actual execution-plan detail, the actual index
DDL, and anything ambiguous that a future investigation should know, such as "this
covering index solves `usp_CustomerOrderHistory` specifically; if a *different* report
against `dbo.Orders` starts showing similar symptoms, check whether it needs its own
covering index rather than assuming this one already covers it too." Same underlying
facts, two depths — never two different stories.

## Why "why" outlasts "what"

Six months from now, "we added an index" tells nobody anything useful. "We added a
covering index because `usp_CustomerOrderHistory`'s existing index didn't include the
columns the query selected, and Key Lookups scale with a customer's order count — so
this specific pattern (a filter + several output columns + an ORDER BY) is worth checking
for on any procedure whose cost grows with account size" is a finding the next DBA can
actually reuse on a different procedure. Documentation that only records *what* was
changed expires the moment someone forgets why. Documentation that records the reasoning
keeps paying off.

## Key terms

| Term | Meaning |
|---|---|
| Write-up | A structured record of a tuning change: summary, symptom, root cause, change, result |
| Audience-tailored documentation | The same underlying facts presented at different depths for different readers, without contradicting each other |
| Verbatim change record | Recording the exact T-SQL applied, not a paraphrase, so it can be audited or reversed later |
| Reusable finding | A root-cause explanation general enough to help diagnose a *different* future problem, not just this one |

## Check yourself

The write-up's "root cause" section says the fix "solves `usp_CustomerOrderHistory`
specifically" and warns that a different report might need its own covering index. Why
include that caveat instead of just declaring the general problem "fixed"?
