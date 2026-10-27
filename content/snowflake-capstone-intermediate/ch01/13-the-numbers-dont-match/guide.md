# Lesson 13 — The Numbers Don't Match — Now What?

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 13 of 16**

## What you'll learn

- Reproducing a reported discrepancy instead of guessing at it
- Why a structurally impossible number is a stronger lead than "the totals feel off"
- Isolating the variable by checking the pattern across multiple weeks
- What NOT to touch yet, before Lesson 14 confirms the actual cause

## The report comes in

A few weeks after both pages go live, Finance emails: "Our weekly refund total jumped this week,
and it doesn't line up with what Support's dashboard shows for refunded tickets. Did something
change?"

That's a real BI support ticket, and "it jumped" isn't enough to act on yet. The first job isn't
fixing anything — it's reproducing the problem reliably, on your own screen, before touching a
single Task or Stream.

## Step 1: reproduce it exactly as reported

Open Finance's page. Note the current week's `total_refund_amount` and, sitting right beside it,
`refund_event_count` — the sanity-check card built deliberately in Lesson 12. Then open the
`vw_finance_refunds` table visual, filtered to the same week, and look closely at individual
subscribers.

Here's what you'll find for at least one subscriber: **two rows with the exact same `ticket_id`
and the exact same `updated_at` timestamp**, each contributing to the same week's total. That's
not two different refund events — a genuine second refund would carry a different `updated_at`.
It's the same event, counted twice.

## Step 2: isolate the variable — does the pattern hold across weeks?

Check `refund_event_count` against a rough expectation: count how many *distinct* `ticket_id`
values show up with a non-null refund in `vw_finance_refunds` for that week, and compare it to the
card's `refund_event_count`. Repeat for two or three earlier weeks.

The pattern that emerges: in most weeks, the two numbers match. In a handful of specific weeks,
`refund_event_count` is consistently a few rows higher than the distinct-ticket count — never
dramatically off, never in Support's numbers at all, only in Finance's.

## That pattern is the real tell

A random, one-off discrepancy might suggest a data-quality problem in the source JSON itself. A
small, structurally consistent gap — `refund_event_count` running slightly ahead of distinct
refunded tickets, specifically on `refund_events`, specifically in certain weeks — points somewhere
much more specific: **something is writing to `refund_events` more than once for the same
underlying change.** Recall from Lesson 6: `finance_refund_task`'s `MERGE` is append-only and
explicitly *not* idempotent, unlike `ticket_facts_sync_task`'s. That's not an accusation yet. It's
a strong, specific lead, and Support's numbers being unaffected is itself a clue about where to
look next.

## What NOT to do yet

Don't delete the duplicate rows, don't rewrite the `MERGE`, and don't suspend any Task yet. You
have a reproducible symptom, a structurally sound explanation for why it would only show up in
Finance's data and not Support's, and a strong lead. Lesson 14 confirms the actual cause using
Snowflake's own task history before anything gets changed.

## Key terms

| Term | Meaning |
|---|---|
| Reproduce | Confirm a reported problem by triggering it yourself, under known conditions |
| Structurally consistent gap | A discrepancy that follows a specific pattern, not random noise |
| Distinct-ticket check | Comparing a row count against a count of distinct keys, to reveal duplicate rows |

## Lab

On your own model, pick a week where `refund_event_count` is non-zero. In `vw_finance_refunds`,
look for any `ticket_id` + `updated_at` pair appearing on more than one row. Record how many
duplicate pairs you find, and confirm Support's `vw_support_ticket_trends` for the same tickets
shows no equivalent inflation.

## Check yourself

You're ready for Lesson 14 when you can answer, without looking: what specific pattern in
`refund_events` — not just "the total feels high" — tells you this is duplicate rows, not a
genuine second refund on the same ticket?
