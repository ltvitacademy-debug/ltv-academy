# Lesson 8 — Joining Tables and Time Windows in KQL

**Chapter 2 · KQL Fundamentals · Lesson 8 of 32**

## What you'll learn

- How `ago()` builds a real time window, and why almost every hunting query starts with one
- How `join kind=inner` combines two tables on a matching column
- What `$left` and `$right` mean inside a join's `on` clause
- A real, complete query correlating `SigninLogs` against a threat intelligence table within the last 24 hours

## `ago()`: filtering by a time window

Nearly every real hunting query in Sentinel starts the same way: narrow down to a recent slice of
time before doing anything else.

```kql
SigninLogs
| where TimeGenerated > ago(24h)
```

**`ago(24h)`** returns the timestamp 24 hours before the moment the query runs, so this keeps only
sign-ins from the last day. You've already used `ago(1d)` and `ago(7d)` in earlier lessons —
`ago()` accepts any unit (`m` for minutes, `h` for hours, `d` for days), and filtering on
`TimeGenerated` this way, right at the top of a query, keeps Log Analytics from scanning far more
data than you actually need.

## `join kind=inner`: combining two tables

A single table only tells you one side of a story. **`join`** combines rows from two tables based
on a matching column, the same idea as a SQL join:

```kql
SigninLogs
| where TimeGenerated > ago(24h)
| join kind=inner (
    ThreatIntelligenceIndicator
    | where TimeGenerated > ago(24h)
) on $left.IPAddress == $right.NetworkIP
```

`kind=inner` keeps only rows that have a match on **both** sides — here, only sign-ins whose
`IPAddress` also appears as a `NetworkIP` in Sentinel's threat intelligence feed. Notice that the
right-hand table gets its own `where TimeGenerated > ago(24h)` filter before the join even
happens; filtering both sides down first, rather than joining everything and filtering afterward,
is what keeps a join like this fast against tables with millions of rows.

## `$left` and `$right`: naming which table a column comes from

Inside the `on` clause, **`$left`** refers to the table before `join` (here, the filtered
`SigninLogs`) and **`$right`** refers to the table inside the parentheses (here,
`ThreatIntelligenceIndicator`). `$left.IPAddress == $right.NetworkIP` says: match a sign-in's IP
address to a threat intel indicator's network IP. You need this prefix whenever the two tables'
join columns have different names, exactly like `IPAddress` and `NetworkIP` here.

## Putting it together: a real correlation query

Add `project` and the full query becomes a real, usable hunting query:

```kql
SigninLogs
| where TimeGenerated > ago(24h)
| join kind=inner (
    ThreatIntelligenceIndicator
    | where TimeGenerated > ago(24h)
) on $left.IPAddress == $right.NetworkIP
| project TimeGenerated, UserPrincipalName, IPAddress, ThreatType, Description
```

Every row in the result is a sign-in in the last 24 hours from an IP address Microsoft's threat
intelligence already flagged — paired with `ThreatType` and `Description` explaining exactly why.
That's the same four building blocks from this whole chapter — filter, project, summarize-style
grouping, and now join — combined into the kind of query Chapter 3 turns into an automated,
always-running analytics rule.

## Key terms

| Term | Meaning |
|---|---|
| `ago()` | Returns a timestamp a given duration before now, e.g. `ago(24h)` for 24 hours ago |
| `join` | Combines rows from two tables based on a matching column |
| `kind=inner` | A join type that keeps only rows with a match on both tables |
| `$left` / `$right` | Refer to a column from the table before (`$left`) or inside the parentheses (`$right`) of a join |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking: in
`on $left.IPAddress == $right.NetworkIP`, which table does `$left` refer to, and why does filtering
both tables to `ago(24h)` before the join matter for performance?
