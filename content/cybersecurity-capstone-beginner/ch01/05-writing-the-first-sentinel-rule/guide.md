# Lesson 5 — Writing the First Sentinel Analytics Rule

**Chapter 1 · Beginner Capstone: Baseline Security Hardening and the First Detection Rule · Lesson 5 of 10**

## What you'll learn

- How to turn Lesson 1's detection target — a cluster of failed sign-ins followed by a success —
  into a real, syntactically correct KQL query against `SigninLogs`
- Why a simple failure-count query isn't enough on its own, and what `join` adds to make it
  sequence-aware
- How to set a Scheduled Analytics Rule's run frequency, lookback window, and alert threshold so
  the rule actually runs the way it's meant to
- Why entity mapping is what turns a plain alert into something worth investigating

## From hardened servers to detection

Lessons 3 and 4 hardened Hartwell's four servers. This lesson builds the other half of Lesson 1's
ask: one real Microsoft Sentinel rule watching for exactly the pattern a phished credential would
produce if an attacker actually tried to use it. Hartwell's staff accounts authenticate through
Microsoft Entra ID, so every sign-in — successful or failed — lands in Sentinel's `SigninLogs`
table, where `ResultType` is `"0"` for a success and a non-zero code for every kind of failure.

## Step one: count the failures

The most direct starting query for "too many failed sign-ins" groups failures by user and by a
fixed time window:

```kql
SigninLogs
| where ResultType != "0"
| summarize FailedCount = count() by UserPrincipalName, bin(TimeGenerated, 10m)
| where FailedCount > 5
```

`bin(TimeGenerated, 10m)` rounds timestamps down into 10-minute buckets, and
`summarize ... by UserPrincipalName, bin(...)` collapses the table into one row per user per
bucket, counting the failures in each. `where FailedCount > 5` keeps only the buckets with more
than five failures. This is a real, runnable query — but on its own, it's only half the pattern
Lesson 1 actually described.

## Why a count alone isn't enough

A query that only counts failures in a window, without checking *order*, fires on both "five
failures then a successful sign-in" and "five failures with no success at all" — a locked-out
account, or someone who simply gave up and called the help desk. Both of those are worth knowing
about eventually, but they're not the specific signature this rule was built to catch: a cluster
of failures immediately followed by a success, which is what it actually looks like when an
attacker finally gets a guessed or phished credential right.

## Step two: add the success-after-failure check

Making the query sequence-aware means joining the failure-count logic against the user's
successful sign-ins, and keeping only the cases where a success landed *after* the failure
cluster:

```kql
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

`Failures` reuses the count-and-bin logic from step one, and also tracks `LastFailure`, the most
recent failed attempt in that cluster. `Successes` is every successful sign-in, trimmed to just
the columns the join needs. `join kind=inner Successes on UserPrincipalName` lines up each
flagged user's failure cluster with their own successful sign-ins, and the final `where` keeps
only a success that landed after `LastFailure` and within a reasonable window of it — exactly the
"failures, then a success" requirement Lesson 1 described, now enforced in real KQL instead of
left as a plain-English description.

## Turning the query into a Scheduled Analytics Rule

A query sitting in Sentinel's Logs blade is a one-time answer; a **Scheduled Analytics Rule**
is what runs it automatically and turns a match into an incident. Creating one, under
**Microsoft Sentinel → Configuration → Analytics → Create → Scheduled query rule**, means
pasting the query above into the rule's query editor and setting:

- **Run query every**: 10 minutes — matching the 10-minute bucket the query already uses.
- **Lookup data from the last**: 20 minutes — deliberately *longer* than the run frequency, so an
  event that happened just before a run, but hadn't finished ingesting yet, doesn't fall into a
  gap between two runs.
- **Alert threshold**: trigger when the number of query results is greater than 0 — any matching
  pair is worth an analyst's attention.

## Entity mapping: making the alert investigable

An alert that just says "a query matched" isn't enough to work with later. **Entity mapping**
tells Sentinel which result columns are real entities, so it can correlate this alert with any
other alert touching the same account or address. For this rule: map `UserPrincipalName` to the
**Account** entity, and `IPAddress` to the **IP address** entity. Once saved, any future alert
naming this same user or IP surfaces as related — the foundation Lesson 6 tests against sample
data before this rule goes live.

## Key terms

| Term | Meaning |
|---|---|
| `bin()` | Rounds a datetime down into fixed-size time buckets, e.g. `bin(TimeGenerated, 10m)` |
| Sequence-aware query | A query that checks the order events occurred in, not just how many occurred |
| `join kind=inner` | Combines rows from two tabular results that share a matching key |
| Entity mapping | Tagging result columns as real entities (Account, IP address) so Sentinel can correlate alerts |

## Lab

Change the query's threshold from `FailedCount > 5` to `FailedCount > 3`, and explain in one
sentence what tradeoff that makes — more sensitive to real attacks, but at what cost?

## Check yourself

You're ready for Lesson 6 when you can explain, without looking, what specifically the `join`
plus `where SuccessTime > LastFailure` adds that the simpler failure-count-only query from step
one was missing.
