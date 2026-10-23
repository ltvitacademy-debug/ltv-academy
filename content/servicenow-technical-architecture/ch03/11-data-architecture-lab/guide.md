# Lesson 11 — Data Architecture Lab

**Chapter 3 · Data Architecture · Lesson 11 of 32**

## What you'll learn

- How to apply lessons 8, 9, and 10 together against one real, aging enterprise scenario
- How to evaluate a table-width reduction without disrupting what already depends on the table
- How to design a specific, defensible archiving policy instead of a vague "clean up old data" instruction
- How to trace the CMDB/CSDM governance consequences of an archiving decision before approving it
- What a finished written data-architecture recommendation actually looks like

## The scenario

A company has run ServiceNow in production for **eight years**. Its
core Incident table has grown to **15 million records**, and both
list-view load times and scheduled reports against that table have
been quietly getting slower for the last two years — exactly the
kind of degradation Lesson 18's performance-architecture content and
course 12's indexing content both warned about, now showing up for
real.

Over those eight years, 23 different fields were added to the
Incident table by different project teams, several of them for
one-off integrations or short-lived initiatives that have since been
retired. Nobody has ever archived a record. Every incident ever
logged, closed or not, is still sitting in the live, active table.
Separately, every incident carries a relationship to the CMDB CI it
affected — which means archiving decisions here aren't purely about
the Incident table in isolation.

You're the technical architect asked to propose a fix. Walk through
the three real steps below the way you'd actually do the work.

## Step 1 — Evaluate a table-width reduction

Per Lesson 8, the first question isn't "add an index and move on" —
it's whether the table itself has gotten wider than it needs to be.
Auditing the 23 added fields turns up a clear pattern: 14 of them are
touched by fewer than 2% of all incidents, mostly leftover fields
from integrations that were retired years ago, while the other 9 are
genuinely used across the majority of incidents today.

The recommendation: the 9 actively-used fields stay on the base
Incident table. The 14 rarely-used fields move to a related
**extension table** — a one-to-one child table joined back to the
Incident record — rather than being deleted outright, since a handful
of old reports still reference them. This keeps the base table's
width down for the 15 million rows that get scanned on every list
view and report, while the rarely-used data stays available to the
reports that genuinely still need it, just no longer paid for by
every query that doesn't.

## Step 2 — Design a real archiving policy

Per Lesson 9, "archive everything old" isn't a policy — it has to be
specific and checked against real requirements first. This
organization's compliance obligation, confirmed with the compliance
team rather than assumed, requires incident records to remain
available for **3 years** after closure. Nothing requires them to
remain in the *live* table beyond that.

The resulting policy: **Incidents closed more than 3 years ago move
from the active table into an archive table** on a recurring
scheduled job, not deleted outright, since a small number of
reporting and audit use cases still need to look them up
occasionally — just not on every list view's query plan. Incidents
closed within the last 3 years, and all open incidents regardless of
age, stay in the active table. Given 8 years of history, this
archiving pass is expected to move a substantial share of the 15
million records out of the live table in its first run — the
specific number depends on closure-date distribution, and the first
run gets measured, not assumed, before it's treated as routine.

## Step 3 — Trace the CSDM/CMDB governance consequences

This is the step Lesson 10 makes necessary and that's easy to miss:
every archived incident carries a relationship to a CMDB CI. Moving
an incident out of the active table doesn't delete that CI
relationship, but it does change what's visible when someone looks
at a CI's related-incident history from the CMDB side — a CI's
"recent incidents" list, if it only queries the active table, will
quietly stop showing anything older than 3 years, which could look
like "this CI has had no problems" rather than "this CI's older
incidents were archived."

The governance fix isn't to block archiving — it's to make the
behavior explicit and owned: the CMDB-facing views and reports that
show incident history per CI get updated to clearly label what
they're actually showing ("incidents in the last 3 years" rather than
an unqualified "incident history"), and this becomes a documented
rule any future CMDB reporting work has to account for, per Lesson
10's point that CSDM governance is an ongoing process, not a one-time
model.

## The finished recommendation, in brief

1. **Table width**: move 14 rarely-used fields to an extension table;
   keep the 9 actively-used fields on the base Incident table.
2. **Archiving**: incidents closed more than 3 years ago move to an
   archive table on a recurring job, matching the confirmed 3-year
   compliance requirement; nothing gets deleted.
3. **CSDM governance**: CMDB-facing incident-history views get
   relabeled to state their actual time window, and this rule gets
   documented so future CMDB reporting work doesn't reintroduce the
   same silent gap.

This is what turning lessons 8, 9, and 10 into one real architectural
decision looks like — not three separate technical fixes, but one
documented, defensible plan that accounts for how they affect each
other.

## Key terms

| Term | Meaning |
|---|---|
| Extension table (width reduction) | A related child table holding rarely-used fields, keeping the base table narrower for every query |
| Confirmed retention requirement | The actual, verified compliance obligation an archiving policy is checked against, not an assumed one |
| Archive vs. delete | Moving records out of the active table while keeping them queryable, versus removing them entirely |
| CSDM visibility gap | When an archiving decision silently changes what a CMDB-facing view shows, without anyone deciding that on purpose |

## Check yourself

Why does this lesson insist the 14 rarely-used fields move to an extension table instead of simply being deleted — and separately, why does archiving incidents past the 3-year mark require a change to CMDB-facing reports, not just a change to the Incident table itself?
