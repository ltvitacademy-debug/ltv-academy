# Capstone Kickoff

Eight chapters in, you have every skill this capstone needs: SOQL and SOSL to pull data out
(Chapters 1-4), Data Loader and Workbench to move it (Chapters 5-6), a real process for
finding and fixing bad data (Chapter 7), and a real process for sequencing a safe reload
(Chapter 8). This chapter is one continuous scenario across four lessons — you'll extract a
genuinely messy dataset, clean it, reload it safely, and wrap it up as a portfolio piece. No
new syntax gets introduced from here on. This is where you prove you can use what you already
have.

## What you'll learn

- The Cascade Ridge Outfitters scenario you'll work across all four capstone lessons
- The three specific data problems you're being asked to fix, with real record counts
- The plan: extract & profile, clean, reload safely, validate and present

## The org: Cascade Ridge Outfitters

You've been brought on as a contract Salesforce Data Analyst for **Cascade Ridge
Outfitters (CRO)**, a wholesale outdoor-gear distributor that sells camping and hiking
equipment to independent retailers. CRO's sales team has run the same playbook for six years:
attend roughly fifteen regional trade shows a year, scan attendee badges with a show-floor
app, and dump the scanned contacts into Salesforce as Leads. Nobody ever cleaned that pipe.
You're working in the **CRO Data Cleanup Sandbox**, a full copy of production, so nothing you
do this chapter touches real data until a final, reviewed load.

A quick profiling query on the Lead object tells you the shape of the problem before you dig
further:

```sql
SELECT LeadSource, COUNT(Id)
FROM Lead
GROUP BY LeadSource
ORDER BY COUNT(Id) DESC
```

That's Chapter 2's `GROUP BY` and aggregate `COUNT(Id)` — nothing new — pointed at a real
question: how many different ways has this org typed "trade show" into a picklist over six
years?

## What's actually wrong with the data

The Lead object holds **14,820 records**. A first pass turns up three specific, fixable
problems:

- **Duplicate Leads.** The same badge scan, at the same person, gets re-imported every time
  they visit a new show. Matching on Email + Company identifies **3,412 duplicate Lead
  records** — nearly a quarter of the object.
- **Inconsistent `LeadSource` values.** The profiling query above returns five different
  spellings that all mean the same channel: `Trade Show`, `TradeShow`, `trade show`,
  `Conference`, and `Expo`. Any report grouped by Lead Source is currently wrong.
- **Orphaned Contacts.** A Lead-conversion process that ran for about a year had a bug that
  never set the resulting Contact's `AccountId`. **1,150 Contact records** exist today with no
  parent Account at all — invisible on any Account-related report or list view.

Along the way you'll also find **40 companies** that only ever exist as Leads and Contacts —
they were scanned at a show, converted, and never got a real Account record created for them.

## The plan for the next three lessons

- **Lesson 38 — Extract & Clean.** Use SOQL to find and quantify the duplicates and the
  `LeadSource` variants (Chapters 1-4), then apply Chapter 7's deduplication and
  standardization approach to decide, record by record, what "clean" means for this dataset.
- **Lesson 39 — Load It Back Safely.** Use Data Loader and Workbench (Chapters 5-6) to reload
  the cleaned data, sequenced parents-before-children (Chapter 8), using an upsert-with-
  external-ID pattern so the load is safe to re-run if something goes wrong.
- **Lesson 40 — Wrap-Up.** Validate the result with SOQL, and package the whole thing as a
  portfolio piece.

## Key terms

| Term | Meaning |
|---|---|
| CRO Data Cleanup Sandbox | The full sandbox copy of CRO's production org this capstone works in |
| Duplicate Lead | Two or more Lead records representing the same real person, caused here by repeat trade-show scans |
| Orphaned Contact | A Contact record with a blank `AccountId` — no parent Account |
| Picklist variant | Multiple different stored values that are meant to represent one real-world option (e.g. `TradeShow` vs. `Trade Show`) |
| Profiling query | A SOQL query run first, purely to measure how bad a data problem actually is, before deciding how to fix it |

## Check yourself

CRO's Lead object has 14,820 records. Name the three specific data problems this capstone
will fix, and the one SOQL clause (from Chapter 2) that lets you measure how many different
`LeadSource` spellings actually exist before you write a single line of cleanup logic.
