# Lesson 9 — Presenting the Report

**Chapter 1 · Beginner Capstone: The First Support Ticket Report · Lesson 9 of 10**

## What you'll learn

- How to build a report page in Power BI that's actually matched to the original ask — not more,
  not less
- How to walk a stakeholder through a report so they can answer their own question with it next
  time, without needing you in the room
- What "done" looks like for a project this size, and how to recognize it

## The visuals this report actually needs

Driftwood's VP of Support asked for one thing: ticket counts by day, by priority, for this
month. Two visuals answer that completely:

- **A line chart**, `TICKET_DATE` on the x-axis, `TICKET_COUNT` on the y-axis, one line per
  `PRIORITY` — shows the shape of the month at a glance, and whether any priority is trending up.
- **A matrix table**, rows as `TICKET_DATE`, columns as `PRIORITY`, values as `TICKET_COUNT` —
  the exact numbers behind the chart, for whenever the VP wants to check a specific day.

That's it. No KPI cards nobody asked for, no extra breakdowns by channel or status — those would
be scope creep, the same trap Lesson 1 warned about, just arriving at the end of the project
instead of the start.

## Walking the VP through it

A good presentation of a report this size takes two minutes, not twenty:

1. State the question it answers, in the VP's own words: "how many tickets came in each day this
   month, by priority."
2. Point at the line chart first — the shape of the month, and anything that jumps out (a spike
   in Urgent tickets on a particular day, for instance).
3. Show the matrix table as the backup — "if you ever want the exact number behind a day, it's
   here."
4. Say plainly what happens next: this refreshes whenever you open it and hit Refresh, pulling
   whatever's currently loaded in Snowflake.

## What "done" looks like

This project is done when the VP can open the report themselves, find the number they need
without asking you to re-explain it, and trust that the number is right because they understand
roughly how it's built — not because they're taking it on faith. That's a higher bar than "the
dashboard looks nice," and it's the actual test of whether Lesson 1's scoping work paid off.

## A quick retro question worth asking

Did the VP's actual follow-up questions match what Lesson 1 predicted they'd care about (volume
vs. order count, in the sales-report example from other courses; here, day-over-day priority
shifts)? If yes, the clarifying questions in Lesson 1 did their job. If a question comes up that
the report can't answer, that's real information for scoping the next project — not a failure of
this one.

## Key terms

| Term | Meaning |
|---|---|
| Scope creep | Adding visuals or breakdowns nobody asked for, past what the original requirement covered |
| Matrix visual | A Power BI table-style visual with rows, columns, and values, good for showing exact numbers |

## Lab

Build the line chart and matrix visuals described above on top of
`VW_DAILY_TICKET_SUMMARY`. Then write the two-minute walkthrough script you'd actually say out
loud to the VP.

## Check yourself

Why does this lesson call extra, unrequested visuals "scope creep" even if they'd be easy to
add — and what would you actually say if the VP asked for one of them after seeing the report?
