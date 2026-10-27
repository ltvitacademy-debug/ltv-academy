# Lesson 2 — Planning the Streams-and-Tasks Design

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 2 of 16**

## What you'll learn

- The full shape of the pipeline you're about to build, before writing any SQL
- Why one shared table, not two separate copies, is the right foundation for Support and Finance
- How a Stream and a Task divide the work: one watches, one acts
- The object names this chapter uses consistently, so later lessons aren't a surprise

## Plan in plain English before SQL

Every lesson from here through Lesson 9 builds one piece of a pipeline. It's worth drawing the
whole thing out in plain English first, the same discovery discipline from Lesson 1 — because the
mistake that causes this chapter's real bug (Lesson 13) is exactly the kind of thing that's obvious
on a whiteboard and easy to miss once you're deep in SQL syntax.

## The pipeline, end to end

1. **The ticketing API exports JSON**, landing in a Snowflake stage as files — the same kind of
   drop Support's CSV already used, just a different format (Lesson 3).
2. **A raw table holds that JSON** in a `VARIANT` column, untouched (Lesson 3).
3. **A Stream sits on that raw table**, watching for new rows since it was last read — Snowflake
   tracks this automatically, no watermark column (Lesson 5).
4. **A Task wakes up on a schedule**, checks whether the Stream actually has new data, and if so,
   runs a `MERGE` that parses the JSON and writes structured rows into a shared table (Lessons 6-7).
5. **Two views sit on top of that one shared table** — one for Finance, one for Support — each
   shaping the same underlying facts for its own audience (Lessons 8-9).
6. **Power BI connects to both views** and builds a page for each team (Lessons 10-12).

## Why one shared table, not two separate pipelines

It would be simpler, short-term, to build Finance their own table and leave Support's alone. Don't.
Two independently-loaded copies of the same ticket data are exactly how two teams end up looking at
numbers that silently drift apart — each pipeline can develop its own small inconsistency with no
way to tell they've diverged until someone compares totals by hand. One shared table that both
views read from means there's only one place the data can be wrong, and only one place to check
when something doesn't add up.

## Two tables, not one — because refunds and ticket state aren't the same kind of fact

The shared foundation here is actually two related tables, each built for what it honestly is:

- **`ticket_facts`** — one row per ticket, reflecting its *current* state (status, priority,
  category). This is Support's territory: trends are about where tickets stand right now.
- **`refund_events`** — one row per refund *event*. A ticket isn't a single refund — a subscriber
  could get a partial refund now and another later — so refunds are logged as they happen, not
  overwritten in place. This is Finance's territory: a refund total is a sum of events, not a
  snapshot of current state.

Keeping these conceptually separate now — "current state" versus "a log of things that happened" —
matters later. In Lesson 13, that distinction is exactly where this chapter's bug lives: one of
these tables tolerates being written to twice with no visible harm, and one does not.

## How the Stream and Task divide the work

A Stream never changes any data — it only tracks change. A Task is the only thing that actually
runs a `MERGE`. Keeping that boundary clear matters for troubleshooting: if a number is wrong,
the Stream is never where the bug lives (it can't write anything), but the Task — or worse, two
Tasks both trying to do the Stream's one job — always is.

## Naming, decided now so nothing later is a surprise

| Object | Name | Purpose |
|---|---|---|
| Raw JSON table | `raw.tickets_api_raw` | Holds the untouched ticketing API payload |
| Stream | `raw.tickets_stream` | Tracks new rows landing in `tickets_api_raw` |
| Current-state table | `marts.ticket_facts` | One row per ticket, current status/priority/category — Support's source |
| Append-only table | `marts.refund_events` | One row per refund event — Finance's source |
| Sync task | `ticket_facts_sync_task` | Keeps `ticket_facts` current from the Stream |
| Refund task | `finance_refund_task` | Appends new refund events from the Stream |

## Key terms

| Term | Meaning |
|---|---|
| Current-state table | Reflects a record's latest known values — old values are overwritten |
| Append-only / event table | Each row is a thing that happened — old rows are never overwritten, only added to |
| Shared foundation | One trustworthy set of facts multiple downstream views are built from |

## Lab

Write out the object-name table above from memory, in your own words, without looking. For each of
the two shared tables, write one sentence explaining why it's current-state or append-only — not
just which one it is.

## Check yourself

You're ready for Lesson 3 when you can answer, without looking: why does this design use an
append-only `refund_events` table for Finance instead of just adding a `refund_amount` column to
the same current-state `ticket_facts` table Support uses?
