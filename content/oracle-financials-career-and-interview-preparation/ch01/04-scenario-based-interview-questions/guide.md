# Scenario-Based Interview Questions

**Chapter 1 · Interview Preparation · Lesson 4 of 15**

Scenario questions don't ask you to define a term — they hand you a messy, half-described business situation and watch how you think. There usually isn't one "correct" answer; the interviewer is listening for whether you ask the right clarifying questions, reason through trade-offs out loud, and land on a defensible recommendation.

## What you'll learn

- How to structure an answer to an open-ended scenario question under time pressure
- Five realistic scenarios pulled from situations across this entire path, with a worked approach for each
- Why asking a clarifying question is often a stronger move than guessing

## A structure that works under pressure

1. **Restate the scenario in your own words** — confirms you understood it and buys you a second to think.
2. **Ask one clarifying question if something genuinely changes your answer** — don't ask for the sake of asking.
3. **State your recommendation and the reasoning**, not just the recommendation alone.
4. **Name the trade-off or risk** you're accepting by going that direction.

## Scenario 1 — "A client has one legal entity today but says they'll acquire a second company within the year. How do you design the chart of accounts?"
Design for the balancing segment discipline now, even with one entity, rather than retrofitting it later — adding a true balancing segment after go-live is far more disruptive than building it in from day one. Clarifying question worth asking: will the acquired entity need its own ledger, or will it map into the existing one? That changes whether you also need a secondary ledger or consolidation hierarchy.

## Scenario 2 — "Finance wants to close in three business days, but AP currently takes five days just to get invoices approved. What do you tell them?"
Separate the symptom from the real constraint: a three-day close target is a statement about accrual process and approval workflow speed, not just a reporting deadline. Recommend either shortening the real approval cycle (escalation rules, delegation, tighter SLAs with vendors on invoice timing) or formally building a standard accrual process for invoices still in flight at close — don't just promise three days without changing the underlying process.

## Scenario 3 — "A long-tenured user wants direct access to override any journal without approval, because 'that's how it worked in the old system.'"
This is a security and controls question wearing a scenario costume. Acknowledge the user's frustration, then explain why segregation of duties exists — the old system's informality is exactly the kind of gap an auditor flags and exactly the kind of control an Oracle implementation is supposed to improve, not preserve.

## Scenario 4 — "Depreciation for one asset category looks off by roughly double this month. Walk me through how you'd find out why, live, if asked right now."
Narrate the actual investigation path: pull the specific asset, confirm its category and useful life against what was intended, check whether it was recently reclassified or added mid-period, and calculate what depreciation *should* be for comparison. This is a smaller version of the capstone's lathe mis-categorization — say so if it's a natural fit.

## Scenario 5 — "Two reports that are supposed to show the same total dollar figure don't agree, and the client wants to know which one is 'right' in the next ten minutes."
Resist the pressure to guess. State plainly that you need ten minutes to trace both reports to source, not to debate which "feels" right. Then actually describe the trace: check the as-of date, the filtering criteria, and whether one report includes a transaction type the other excludes — mismatched totals are very often a scope difference, not an error in either report.

## Key terms

| Term | Meaning |
|---|---|
| Segregation of duties | A control that prevents one person from having end-to-end, unchecked authority over a transaction |
| Scope difference | Two reports disagreeing not because either is wrong, but because they include different date ranges, statuses, or transaction types |

## Lab

Pick scenario 2 or 3 and write your own two-paragraph answer using the four-step structure above, before reading the model answer again.

## Check yourself

- Why ask a clarifying question only when it would actually change your answer?
- What's the real difference between a reporting deadline and an approval-cycle problem in scenario 2?
- Why is "which report is right" often the wrong question to answer first in scenario 5?
