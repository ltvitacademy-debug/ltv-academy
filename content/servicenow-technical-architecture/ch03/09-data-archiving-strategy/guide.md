# Lesson 9 — Data Archiving Strategy

**Chapter 3 · Data Architecture · Lesson 9 of 32**

## What you'll learn

- What ServiceNow's real archiving and rotation capability actually does
- How moving old records out of the active table connects directly to course 12's indexing and query-performance content
- The real tradeoff an architect has to balance: query performance versus accessibility of historical data
- Why "archive everything old" and "archive nothing" are both wrong answers
- How to design a retention policy that's a genuine business judgment call, not a purely technical one

## What archiving actually does

ServiceNow provides a real data archiving and rotation capability: a scheduled job that moves records matching defined criteria — typically "closed more than N years ago" — out of the live, active table and into a separate archive table (or, where policy allows, deletes them outright per a defined retention rule). The record isn't gone from the organization's history; it's moved out of the table that every live query, every list view, and every report on that table has to search through.

That distinction matters. A 15-year-old closed incident is still real data the business might need someday. Archiving isn't about discarding history — it's about not making every single live query pay the cost of scanning through it.

## Why this connects directly to course 12

Course 12 covered indexing and query performance: how the database uses indexes to avoid scanning every row, and how query plans degrade as a table grows. Archiving is the other half of that story. An index helps a query find the right rows faster within a table of a given size — but a smaller active table is faster to query and faster to index *regardless* of how good the indexing is. Fewer rows means a smaller index to traverse, a smaller table to vacuum and maintain, and a tighter working set that's more likely to stay cached.

In other words: good indexing (course 12) and a disciplined archiving policy (this lesson) aren't competing strategies — they're the same goal, query performance, attacked from two different angles. An architect who only thinks about indexes and never about archiving is leaving half the available performance gain on the table, literally, as years of records continue accumulating.

## The real tradeoff: performance versus accessibility

Here's the part that isn't purely technical. Once a record is archived, it becomes less immediately accessible — it may not show up in a standard list view, a default report, or a quick lookup the way an active record does. Pulling it back usually requires someone to know it's archived and go looking in the right place. That's a genuine cost, and it falls on end users and the business, not on the database.

So an architect designing a retention policy has to weigh two real, often competing needs:

- **Query performance on the active table** — every record left in the live table is a record every future query has to account for, for as long as it stays there.
- **Business and compliance need for ready access** — some historical data genuinely needs to stay easy to find: active legal holds, records under an ongoing audit, or data a business team routinely reports against even when it's old.

There's no formula that resolves this automatically. A 3-year retention window might be exactly right for one table and badly wrong for another, depending on what that specific business actually does with its old data. This is a judgment call an architect makes *with* the business — asking who actually needs this data, how often, and how quickly — not a default setting applied uniformly across every table on the platform.

## Designing a real policy, not a blanket rule

A sound archiving policy is specific, not generic:

- Define the criteria precisely (e.g., "Incident records with `state = Closed` and `closed_at` more than 3 years ago") rather than a vague "old records."
- Confirm the criteria against any actual compliance or legal retention requirement first — a policy that archives data before a required retention period has elapsed is a compliance problem, not a performance win.
- Decide, deliberately, whether archived data moves to an archive table (still queryable, just not in the live table) or is deleted outright — those are very different outcomes, and conflating them is a real risk.
- Revisit the policy periodically. A retention rule set five years ago under one set of compliance requirements may no longer fit today's requirements, or today's actual query-performance pressure.

## Key terms

| Term | Meaning |
|---|---|
| Data archiving | Moving records matching defined criteria out of the live, active table into a separate archive table |
| Rotation | ServiceNow's scheduled-job mechanism for running archiving and deletion rules automatically |
| Retention policy | The specific, documented rule for how long data stays in the active table before archiving or deletion |
| Active table performance | Query and index speed on the live table, which improves as record count in that table shrinks |

## Check yourself

A business stakeholder asks why old, closed incidents can't just be deleted outright instead of archived. What two considerations from this lesson would you raise before agreeing to that?
