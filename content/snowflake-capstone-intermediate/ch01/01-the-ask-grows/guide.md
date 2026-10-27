# Lesson 1 — The Ask Grows: Two Teams, One Ticket Model

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 1 of 16**

## What you'll learn

- How the Beginner project's one-clean-report scope grows into a real two-team pipeline
- Why Finance's new ask can't be bolted onto the existing ticket report as another query
- The real gap in the Beginner project's data: no refund amounts, no update history
- The roadmap for this chapter's 16 lessons, including the real bug you'll fix in Lessons 13-15

## A quick recap, if you built the Beginner project

In the Beginner capstone, Driftwood Media's Support team asked for one thing — a clean summary of
open support tickets — and you answered it with a simple `raw.tickets` table loaded from a CSV
export, a basic RBAC setup, a view, and a one-page Power BI report. It worked. Support got their
report, and it's still running today. If you haven't built that project, nothing here depends on
it line by line — just know that Driftwood Media is the same fictional streaming subscription
company, and the goal here is the same real discipline: no invented tables, no fake UI, the actual
Snowflake product.

## The ask grows

Word got around that Support finally has a working ticket report, and now a second team wants in —
except what they want is different enough that it changes the whole architecture, not just the
page count:

- **Support** still wants what they already have: ticket volume, category, and priority trends,
  kept current.
- **Finance** wants something the Beginner project's data literally cannot answer: **how much
  money is going out the door in refunds, tied to those same support tickets, and updated as new
  refunds happen** — not a one-time pull, a living number.

That second ask exposes a real gap. The Beginner project's `raw.tickets` table came from a daily
CSV export with four columns: `ticket_id`, `subscriber_id`, `opened_at`, `category`. There's no
refund amount in there at all, and no way to tell when a ticket's status changed after it was
opened. Finance's question can't be answered with a bigger `SELECT` against the same table — the
data it needs doesn't exist yet in a usable form.

## Why this isn't just "add a column"

The ticketing system Support and Finance both pull from actually has richer data than that CSV
export ever carried — status, priority, and refund amount — but it lives behind the ticketing
API as JSON, not as a tidy CSV. Pulling it in means:

- **Ingesting semi-structured JSON** into Snowflake for the first time in this capstone, instead of
  a flat CSV (Lessons 3-4).
- **Keeping it current without a person re-running anything** — Finance's refund total is only
  useful if it reflects today's tickets, not last week's export. That means moving from "run a
  query when someone asks" to a real **incrementally-updated model**, using Snowflake's own change
  tracking (Lessons 5-7).
- **Serving two different audiences from one shared, trustworthy foundation** — Support's trends
  and Finance's refund totals both have to come from the same underlying facts, or the two teams
  will eventually compare numbers and find they don't agree. (They will. That's Lesson 13.)

## The real Snowflake features this chapter uses

Two features new to this capstone, both real production Snowflake tools, not improvised:

| Feature | What it does here |
|---|---|
| **VARIANT + JSON parsing** | Holds the ticketing API's raw JSON payload, then extracts real fields like `refund_amount` with `:field::type` syntax |
| **Streams** | Tracks exactly which rows changed in the raw ticket data since it was last read — no watermark column to manage by hand |
| **Tasks** | Runs a scheduled `MERGE` automatically whenever the Stream has new data, with no person or external scheduler involved |

## The honest part of this project: a real bug

Running two Tasks that both quietly consume the same Stream is an easy mistake to make — it
happens the first time someone touches a working pipeline and leaves an old piece of it running
by accident. This project includes that exact mistake on purpose. After the pipeline and both
Power BI pages are built (Lessons 3-12), Lessons 13-15 walk through Finance's refund total not
matching what Support sees, tracing it to its real cause using Snowflake's own task history, and
fixing it — because diagnosing a pipeline that's quietly double-processing data is as real a
Snowflake skill as building the pipeline in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Semi-structured data | Data like JSON that doesn't fit a fixed table shape until it's parsed |
| Incrementally-updated model | A table kept current automatically as source data changes, not re-pulled by hand |
| Shared foundation | One underlying set of facts that multiple teams' views are built on top of |

## Lab

Before touching SQL, sketch the gap in plain English: list the fields Finance's refund view needs
that aren't in the Beginner project's `raw.tickets` table today. Then list, separately, what
Support already has that still has to keep working while you build the new pipeline alongside it.
Keep both lists short — Lesson 2 turns them into an actual design.

## Check yourself

You're ready for Lesson 2 when you can answer, without looking: why can't Finance's refund
question be answered by just adding a `refund_amount` column to the existing `raw.tickets` table
and re-running the same CSV load?
