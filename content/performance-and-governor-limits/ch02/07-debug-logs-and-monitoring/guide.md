# Lesson 7 — Debug Logs and Monitoring

**Chapter 2 · Measuring and Diagnosing · Lesson 7 of 16**

## What you'll learn

- How to read a debug log's structure well enough to find governor limit usage inside it
- The real, documented size and retention limits on debug logs themselves
- Why setting a trace flag with overly broad log levels backfires
- How to use `Limits` output alongside a debug log to pinpoint exactly where a limit was spent

## A debug log is a transaction's own account of itself

A **debug log** is the detailed, line-by-line record of everything that happened during one transaction — every SOQL query issued, every DML statement, every line of Apex executed, and critically, a `CUMULATIVE_LIMIT_USAGE` section at the end summarizing exactly how much of each governor limit that transaction consumed. This is the single most direct way to answer "where did my limit budget actually go," because it doesn't require guessing — the log states the real numbers for that specific execution.

A trace flag (set under Setup, or via the Developer Console's own log-capturing session) controls what gets logged and at what level of detail, across categories including `ApexCode`, `ApexProfiling`, `Database`, `Workflow`, `Validation`, and `Callout`. Each category can be set independently, from `NONE` up through increasingly verbose levels, with `FINEST` producing the most detail for that category.

## Reading the cumulative limit usage section

Every debug log ends with a summary block that looks roughly like this:

```
17:42:03.100 (100123456)|CUMULATIVE_LIMIT_USAGE
17:42:03.100 (100123456)|LIMIT_USAGE_FOR_NS|(default)|
  Number of SOQL queries: 42 out of 100
  Number of query rows: 18340 out of 50000
  Number of SOSL queries: 0 out of 20
  Number of DML statements: 12 out of 150
  Number of DML rows: 980 out of 10000
  Number of CPU time (in ms): 3401 out of 10000
  Number of heap size (in bytes): 412880 out of 6000000
17:42:03.100 (100123456)|CUMULATIVE_LIMIT_USAGE_END
```

This is the fastest way to confirm, from a real execution, exactly how close a transaction came to any of the Lesson 2 governor limits — no estimation, the platform's own count for that run. If `Number of SOQL queries: 97 out of 100` shows up on a transaction that "only has one trigger with one query," that's the direct evidence pointing you back to Lesson 5's lesson on transaction boundaries: something else running in the same transaction is responsible for the other 96.

## Real limits on debug logs themselves

Debug logs are not unlimited. Per Salesforce's own documentation: each individual debug log is capped at **20 MB**. If a transaction generates more output than that, the platform truncates the log by removing older lines to fit — and that removal can happen anywhere in the log, not only at the beginning, so a truncated log can have gaps in the middle. System-generated debug logs are retained for **24 hours**, and logs captured specifically for monitoring are retained for **7 days**. There's also an org-wide throttle: if log generation across the org exceeds **1,000 MB within a 15-minute window**, trace flags are automatically disabled and the users who set them are notified by email that they can re-enable logging after 15 minutes.

## Why overly broad log levels backfire

Setting every category to `FINEST` feels like "getting maximum visibility," but it actively works against you in two ways. First, it makes a transaction far more likely to hit the 20 MB cap and get truncated — exactly when you need the log intact, such as right before the governor limit exception you're chasing. Second, it buries the specific lines you actually need (a `CUMULATIVE_LIMIT_USAGE` block, or a specific `DML_BEGIN`/`SOQL_EXECUTE_BEGIN` line) under a much larger volume of unrelated detail. A more effective approach is to set only the categories relevant to the problem (typically `ApexCode` and `Database`) to a detailed level, and leave unrelated categories (like `Callout` or `Visualforce`, if the issue has nothing to do with them) at a coarser level or `NONE`.

## Key terms

| Term | Meaning |
|---|---|
| Debug log | The detailed, per-transaction record of Apex execution, queries, DML, and cumulative limit usage |
| Trace flag | The configuration controlling what gets logged, at what level, and for which user/duration |
| CUMULATIVE_LIMIT_USAGE | The debug log section summarizing exactly how much of each governor limit a transaction consumed |
| Log truncation | Removal of older log lines (from anywhere in the log, not just the start) once a log exceeds 20 MB |

## Lab

In a Developer Edition org, set a trace flag for your own user with `ApexCode` and `Database` at a detailed level. Trigger a transaction that issues a handful of SOQL queries and DML statements (for example, running one of this course's earlier bulkified trigger examples against a few test records). Open the resulting debug log and locate the `CUMULATIVE_LIMIT_USAGE` block. Write down the actual SOQL query count and DML statement count the log reports, and confirm they match what you expected from reading the code.

## Check yourself

Can you explain what the `CUMULATIVE_LIMIT_USAGE` section of a debug log tells you that reading the source code alone cannot? Can you state the debug log size cap and the two retention periods (system vs. monitoring) from memory, and explain why setting every log category to the most verbose level can actually make debugging harder, not easier?
