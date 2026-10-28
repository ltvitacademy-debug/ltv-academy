# Lesson 12 — Writing a Real KQL-Based Detection Rule

**Chapter 3 · Analytics Rules & Detection Engineering · Lesson 12 of 32**

## What you'll learn

- How to turn the brute-force-then-success pattern from the SOC Operations course into a real, syntactically correct KQL query
- Why a simple failure-count query isn't sequence-aware, and what that costs you
- How to use `let`, `summarize`, and `join` together to check that a success actually followed the failures
- How this finished query plugs into the schedule, threshold, and entity mapping from Lessons 9–11

## Step one: count the failures

Chapter 2 introduced `SigninLogs`, Microsoft Entra ID's sign-in log table inside a Sentinel workspace, where `ResultType` is `"0"` for a success and a non-zero code for every kind of failure. The most direct starting query for "too many failed sign-ins" looks like this:

```
SigninLogs
| where ResultType != "0"
| summarize FailedCount = count() by UserPrincipalName, bin(TimeGenerated, 10m)
| where FailedCount > 5
```

This groups failures by user and by 10-minute bucket, then keeps only the buckets with more than 5. It's a real, runnable rule query — but on its own, it's only half of the correlation rule from the prior course.

## Why count alone isn't enough

Lesson 14 of the SOC Operations course made a specific point: a rule that only counts events in a window, without checking *order*, fires on both "five failures then a success" and "one failure, a success, then four unrelated failures." The query above is exactly that kind of count-only rule — it flags any user with 5+ failures in 10 minutes, whether or not a success ever followed. It's a correct building block, but it isn't sequence-aware yet.

## Step two: add the success-after-failure check

To make it sequence-aware, the failure-count logic needs to be joined against the user's successful sign-ins, keeping only the cases where a success landed after the failure cluster:

```
let Failures = SigninLogs
    | where ResultType != "0"
    | summarize FailedCount = count(), LastFailure = max(TimeGenerated)
        by UserPrincipalName, bin(TimeGenerated, 10m)
    | where FailedCount > 5;
let Successes = SigninLogs
    | where ResultType == "0"
    | project SuccessTime = TimeGenerated, UserPrincipalName, IPAddress;
Failures
| join kind=inner Successes on UserPrincipalName
| where SuccessTime > LastFailure and SuccessTime < LastFailure + 10m
| project UserPrincipalName, FailedCount, LastFailure, SuccessTime, IPAddress
```

`Failures` reuses the count-and-bin logic from step one. `Successes` is every successful sign-in, with just the columns needed for the join. The `join kind=inner` lines up each flagged user's failure cluster with their own successful sign-ins, and the `where` clause keeps only a success that landed after `LastFailure` and within a reasonable window of it — the exact "after the failures" requirement the prior course's pseudocode specified, now enforced in real KQL.

## Putting the whole rule together

This finished query is what gets pasted into a Scheduled Analytics Rule's "Set rule logic" tab. `Run query every` and `Lookup data from the last` (Lesson 9) decide how often it runs and how far back it scans; the alert threshold fires whenever it returns a row; and entity mapping (Lesson 11) maps `UserPrincipalName` to an Account entity and `IPAddress` to an IP entity, so every resulting alert carries trackable entities into the incident. Every piece from this chapter lands in this one rule.

## Key terms

| Term | Meaning |
|---|---|
| `let` | Defines a named, reusable sub-query inside a larger KQL statement |
| `join kind=inner` | Combines rows from two tabular results that share a matching key |
| `bin()` | Rounds a datetime down into fixed-size time buckets, e.g. `bin(TimeGenerated, 10m)` |
| Sequence-aware query | A query that checks the order events occurred in, not just how many occurred |

## Check yourself

Without looking back: what specifically does the `join` plus `where SuccessTime > LastFailure` add that the first, simpler failure-count query was missing?
