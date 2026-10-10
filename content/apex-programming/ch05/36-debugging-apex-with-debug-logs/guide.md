# Lesson 36 — Debugging Apex with Debug Logs

**Chapter 5 · Applied Apex · Lesson 36 of 43**

## What you'll learn

- How to actually configure a debug log so it captures what you need, instead of reading a default log blind
- Debug log categories and log levels, and what each category actually records
- Reading `USER_DEBUG` lines efficiently instead of scrolling through the whole log
- Setting a Trace Flag for a specific user so you can capture a log from a real UI action, not just Execute Anonymous
- A few System.debug() habits that make logs easier to search later

## Why the default log is often not enough

Lesson 1 showed you `System.debug()` and the raw idea of a debug log. In real debugging work, the default log verbosity is either too noisy to read quickly or missing the specific detail you actually need — so the first real debugging skill is configuring what gets captured, not just reading whatever comes back.

## Log categories and levels

A debug log is organized into **categories** — distinct areas of execution, such as `Apex_Code` (your own Apex statements and System.debug calls), `Apex_Profiling` (CPU time and limit usage), `Database` (SOQL/DML operations), `Validation` (validation rule evaluation), `Workflow` (Process Builder/Flow/Workflow Rule execution), and a few others. Each category is set to a **log level** controlling how much detail it records, from least to most verbose: `NONE`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `FINE`, `FINER`, `FINEST`. Setting `Apex_Code` to `FINEST` captures every line of execution and variable detail; setting it to `ERROR` captures almost nothing unless something actually fails. For a focused debugging session, the practical approach is to raise only the categories you actually need (usually `Apex_Code` and `Database`) and leave the rest at a lower level, which keeps the resulting log small enough to actually read.

## Setting a Trace Flag

To capture a log from something other than Execute Anonymous — a real button click, a Flow, a scheduled job — you set a **Trace Flag** for the specific user whose actions you want to capture, under **Setup → Debug Logs → New**. The Trace Flag specifies which user, for how long (a time window, not indefinitely), and at what log level for each category. Every qualifying action that user takes during that window generates a new debug log entry, visible in the Debug Logs list.

## Reading USER_DEBUG lines efficiently

Every `System.debug()` call appears in the log on a line tagged `USER_DEBUG`. Rather than scrolling through hundreds of lines of execution trace, the Developer Console's log viewer lets you filter directly to `USER_DEBUG` entries — in practice, this is how almost every real debugging session actually reads a log, rather than reading top to bottom.

```apex
System.debug('Processing Contact: ' + con.Id + ', LeadSource=' + con.LeadSource);
```

## Habits that make logs easier to search

A `System.debug()` call that just prints a bare value (`System.debug(con.LeadSource);`) is hard to make sense of later, especially once there are several debug statements in the same method. Labeling each one with context — what it is, and often which record it's about — makes the log far easier to scan or search:

```apex
// Harder to search later:
System.debug(result);

// Easier to search later:
System.debug('ContactLeadSourceCleanupBatch.execute result count: ' + scope.size());
```

## Key terms

| Term | Meaning |
|---|---|
| Debug log category | A distinct area of execution a log can capture, such as Apex_Code, Database, or Workflow |
| Log level | How much detail a category records, from NONE up to FINEST |
| Trace Flag | A configuration that captures debug logs for a specific user over a specific time window |
| `USER_DEBUG` | The log line tag for every `System.debug()` call |

## Lab

In a Developer Edition org, go to **Setup → Debug Logs → New Trace Flag**, set it for your own user with `Apex_Code` at `FINE` and `Database` at `FINE`, for a 15-minute window. Perform a real UI action that triggers one of this course's earlier triggers (e.g., update an Opportunity to Closed Won from Lesson 33's lab). Open the resulting debug log, filter to `USER_DEBUG` lines, and confirm you can find your trigger handler's debug output without reading the full log top to bottom.

## Check yourself

What is the difference between a debug log *category* and a *log level*? Why would setting every category to `FINEST` make a log harder to use for a focused debugging task, even though it captures the most detail?
