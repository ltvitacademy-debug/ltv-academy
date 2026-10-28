# Lesson 6 — Basic KQL Queries: Filtering and Projecting

**Chapter 2 · KQL Fundamentals · Lesson 6 of 32**

## What you'll learn

- How `where` filters a table down to just the rows you care about, and how stacking `where` clauses works
- How `project` chooses exactly which columns come back, and in what order
- How `take` caps the number of rows returned while you're still exploring data
- How to read a complete, real query against Sentinel's `SigninLogs` table from top to bottom

## `where`: narrowing down rows

**`where`** is the operator you'll use in almost every KQL query you write. It keeps only the rows
that match a condition and drops the rest:

```kql
SigninLogs
| where TimeGenerated > ago(1d)
| where ResultType != "0"
```

Two `where` clauses in a row act like an `AND` — a row has to pass both to survive. This query
starts from `SigninLogs` (Sentinel's record of every Azure AD sign-in attempt), keeps only
sign-ins from the last day (`TimeGenerated > ago(1d)`), then keeps only the failed ones
(`ResultType != "0"`, since a `ResultType` of `"0"` means success). You could write this as one
`where` with `and` instead, but stacking separate `where` lines is common in real Sentinel queries
because it's easier to read and easier to comment out one condition while testing.

## `project`: choosing columns

A table like `SigninLogs` has dozens of columns, but you rarely need all of them. **`project`**
keeps only the columns you list, in the order you list them, discarding everything else:

```kql
SigninLogs
| where TimeGenerated > ago(1d)
| where ResultType != "0"
| project TimeGenerated, UserPrincipalName, AppDisplayName, IPAddress, ResultType
```

Now the result is a clean, five-column view: when it happened, who signed in, which app they were
signing into, where from, and the result code. That's the shape an analyst actually wants to read
on screen, instead of scrolling through every raw field Azure AD logs.

## `take`: capping how many rows come back

While you're exploring a query, you usually don't want thousands of rows printed at once.
**`take`** (an alias for `limit`) caps the result:

```kql
SigninLogs
| where TimeGenerated > ago(1d)
| where ResultType != "0"
| project TimeGenerated, UserPrincipalName, IPAddress
| take 50
```

This returns at most 50 rows. It's important to know that `take` returns an **arbitrary** sample
of matching rows, not necessarily the newest or most severe ones — it's for a quick look while
building a query, not for a reliable "top 50" list. Lesson 7's `summarize` and `sort by` are the
real tools for ranking results.

## Putting it together

Those three operators — filter, then select, then limit — form a pattern you'll see constantly:
`where` narrows the rows, `project` narrows the columns, and `take` (when you need it) narrows the
row count for a quick look. Nearly every KQL query in this course starts from some version of this
shape before adding anything more advanced.

## Key terms

| Term | Meaning |
|---|---|
| `where` | Keeps only rows matching a condition; stacked `where` clauses act as `AND` |
| `project` | Keeps only the listed columns, in the order listed, dropping the rest |
| `take` / `limit` | Caps the number of rows returned; the sample is arbitrary, not guaranteed top-N |
| `ago()` | Returns a timestamp that many units before now, e.g. `ago(1d)` |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why does `take 50` not
necessarily give you the 50 most recent or most important rows, and what should you use instead if
you need a reliable ranked list?
