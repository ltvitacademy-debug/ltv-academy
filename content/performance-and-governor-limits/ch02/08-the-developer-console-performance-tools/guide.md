# Lesson 8 — The Developer Console Performance Tools

**Chapter 2 · Measuring and Diagnosing · Lesson 8 of 16**

## What you'll learn

- The three Developer Console tools most relevant to diagnosing performance problems
- How to enable and read the Query Plan tool's cost output, in more depth than Lesson 4
- How the Execute Anonymous window lets you test governor limit behavior in isolation
- How the Logs tab's inline limit indicators let you scan multiple transactions quickly

## Query Plan: confirming selectivity, not guessing at it

Lesson 4 introduced the Query Plan tool conceptually; here's how it fits into an actual diagnostic workflow. From the Developer Console, open **Help > Preferences**, enable **"Enable Query Plan"**, and a **Query Plan** button appears next to **Execute** in the Query Editor tab. Paste in the exact SOQL a slow trigger or class is running, click **Query Plan**, and the tool returns one or more candidate execution plans, each with a **cost** value and a **leading operation type** such as `Index` or `TableScan`. The specific thing to look for: if the plan with the lowest cost is a `TableScan` rather than an `Index`-driven plan, that query is not benefiting from selectivity the way you might assume from the WHERE clause alone — exactly the situation Lesson 4 described with non-selective filters.

## Execute Anonymous: isolating a hypothesis

The **Execute Anonymous Window** (Debug menu) runs a block of Apex immediately, without deploying anything, which makes it the fastest way to test a specific governor-limit hypothesis in isolation:

```apex
// Testing whether this specific query, run standalone, is as expensive as suspected
Long startCpu = Limits.getCpuTime();
List<Account> accs = [
    SELECT Id, Name FROM Account
    WHERE BillingState = 'CA'
];
System.debug('Rows returned: ' + accs.size());
System.debug('CPU time for this query alone: ' + (Limits.getCpuTime() - startCpu) + ' ms');
System.debug('Queries used so far: ' + Limits.getQueries() + ' / ' + Limits.getLimitQueries());
```

Running this in isolation tells you what that one query costs on its own, separate from whatever else might be running in the real production transaction — a useful way to confirm (or rule out) a specific line as the actual bottleneck before touching production code.

## The Logs tab: scanning multiple transactions at once

The Developer Console's **Logs** tab lists every captured debug log for the current trace flag session, and critically, it shows summary columns (including elapsed time) for each log without requiring you to open every single one. Opening a specific log splits the view into an **Execution Overview** (a visual timeline of where time went across categories like Workflow, Apex, and Database) alongside the raw log text. The Execution Overview is often the fastest way to see, at a glance, whether a slow transaction's time went mostly to Apex execution, to Workflow/Flow, or to database operations — which directly answers the "where did the time actually go" question from Lesson 1, using real data instead of a guess.

## Putting the three tools together

A realistic diagnostic sequence combines all three: capture a debug log for the slow transaction (trace flag set, reproduce the issue), open it in the Logs tab and check the Execution Overview to see which category dominates the elapsed time, then use Execute Anonymous to isolate and re-test the specific query or operation the Execution Overview pointed to, and finally use the Query Plan tool on that isolated query to confirm whether it's selectivity (an index problem) or something else (like a loop issuing it repeatedly) causing the cost.

## Key terms

| Term | Meaning |
|---|---|
| Query Plan tool | Developer Console feature showing the optimizer's candidate execution plans, cost, and leading operation type |
| Execute Anonymous | A Developer Console window that runs a block of Apex immediately, without deployment, useful for isolated testing |
| Logs tab | The Developer Console view listing captured debug logs with summary timing and an Execution Overview per log |
| Execution Overview | A visual timeline breaking down where a transaction's elapsed time went by category |

## Lab

In a Developer Edition org, set a trace flag for yourself, then use Execute Anonymous to run a short script that performs a loop-based SOQL anti-pattern deliberately (a few iterations issuing a separate query each time, similar to Lesson 3's "before" example, kept small enough to stay within limits). Open the resulting log in the Logs tab, check the Execution Overview to see how much of the elapsed time is attributed to Database operations, and compare that against a second run using a single bulk query instead. Write down the difference you observe.

## Check yourself

Can you describe, from memory, a sensible order to use these three tools together when diagnosing a specific slow transaction? Can you explain what a `TableScan` result from the Query Plan tool tells you that the Execution Overview alone would not?
