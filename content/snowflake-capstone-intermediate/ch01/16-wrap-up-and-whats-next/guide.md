# Lesson 16 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 16 of 16**

## What you'll learn

- A full recap of the real pipeline this chapter built, end to end
- Why this project's two hardest lessons weren't about syntax at all
- How this project's scope compares honestly to the existing 15-lesson Advanced capstone
- Where to go next, with this project as real, demonstrable groundwork

## What you actually built

Sixteen lessons ago, Support had one working report and Finance had a question the data couldn't
answer. By the end of this chapter, you built a real, incrementally-updated Snowflake pipeline
from scratch:

- **Semi-structured ingestion** — the ticketing API's JSON, landed untouched in a `VARIANT`
  column, then parsed with real `:field::type` syntax (Lessons 3-4).
- **Change tracking with Streams** — `tickets_stream`, tracking exactly what changed with no
  hand-managed watermark column (Lesson 5).
- **Scheduled automation with Tasks** — two Tasks, each gated on `SYSTEM$STREAM_HAS_DATA`, each
  doing a genuinely different job against two intentionally different kinds of table: an
  idempotent upsert for Support's current-state data, and an append-only log for Finance's events
  (Lessons 6-7).
- **Two real views on one shared foundation** — shaped for two different audiences, from the exact
  same underlying pipeline (Lessons 8-9).
- **Two real Power BI pages** — connected with the right least-privilege role, built with the
  right visuals for each audience's actual job (Lessons 10-12).

## The part that mattered most wasn't syntax

Lessons 13-15 weren't really about `MERGE` statements or `TASK_HISTORY` function signatures,
even though both were central to the work. They were about a specific, transferable diagnostic
habit: reproduce the symptom exactly, isolate what pattern it follows, confirm a hypothesis with a
real tool before changing anything, and fix the root cause instead of just patching the visible
damage. The duplicate Task that caused this chapter's bug wasn't a contrived gotcha — it's the
exact kind of thing that happens the first time someone touches a working pipeline during a real
change, and the diagnostic process here is the same one that finds it in production, not just in
a training exercise.

## How this compares to the Advanced capstone

The existing 15-lesson Advanced capstone (`snowflake-data-engineering-capstone`) builds Driftwood
Media's full production pipeline end to end — dbt transformations, Airflow orchestration,
Terraform-managed infrastructure, CI/CD, and the RBAC and masking policies this chapter's own
`DRIFTWOOD_ANALYST` role connection relied on. This chapter deliberately stayed narrower: one
Snowflake-native pipeline, two consumers, one real bug, no external orchestrator. That's not a
lesser project — it's Streams and Tasks in enough depth to actually use them correctly, without
the Advanced capstone's broader tooling surface competing for attention.

## Where to go next

If you haven't built the Advanced capstone yet, it's the natural next step — it picks up the same
company, the same RBAC conventions, and takes the production tooling (dbt, Airflow, Terraform,
CI/CD) this chapter intentionally left out. If you have, revisit its own Streams/Tasks-adjacent
lessons (Chapter 8, and the final capstone lesson combining dimensional modeling with Streams,
Tasks, and RBAC together) with this chapter's bug fresh in mind — the overlapping-execution risk
this chapter diagnosed applies anywhere a Stream has more than one potential consumer, not just
here.

## Key terms

| Term | Meaning |
|---|---|
| Transferable diagnostic habit | A troubleshooting process (reproduce, isolate, confirm, fix) that applies beyond any one specific bug |
| Narrower scope, real depth | Covering fewer tools thoroughly, rather than more tools shallowly |

## Check yourself

Before moving on, write out — without looking back at any previous lesson — the full pipeline this
chapter built, start to finish, in one paragraph. If you can explain why `ticket_facts_sync_task`
being idempotent mattered and `finance_refund_task` not being idempotent mattered, in your own
words, you're genuinely ready for whatever Snowflake pipeline comes next.
