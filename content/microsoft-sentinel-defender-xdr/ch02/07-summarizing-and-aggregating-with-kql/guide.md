# Lesson 7 — Summarizing and Aggregating with KQL

**Chapter 2 · KQL Fundamentals · Lesson 7 of 32**

## What you'll learn

- How `summarize` collapses a table into one row per group, instead of one row per original record
- How `count()` answers "how many," `dcount()` answers "how many distinct," and `avg()` answers "what's the average"
- How the `by` clause controls what each group actually represents
- A real worked example that turns thousands of raw `SigninLogs` rows into a ranked list of top failed-sign-in users

## `summarize` + `count()`: collapsing rows into groups

**`summarize`** is KQL's aggregation operator — it takes many rows and collapses them into one row
per group. Paired with **`count()`**, it answers "how many rows landed in each group":

```kql
SigninLogs
| where TimeGenerated > ago(7d)
| where ResultType != "0"
| summarize FailedSignIns = count() by UserPrincipalName
| sort by FailedSignIns desc
```

Read this top to bottom: start with the last 7 days of sign-ins, keep only the failed ones, then
`summarize ... by UserPrincipalName` collapses every row down to **one row per distinct user**,
with `FailedSignIns` holding how many failed attempts that user had. `sort by FailedSignIns desc`
puts the worst offenders first. This exact pattern — count failures, group by user, sort
descending — is one of the single most common hunting queries written against Sentinel, because a
user with an unusually high failed-sign-in count is a classic sign of a password-spray or
brute-force attempt.

## `dcount()`: counting distinct values

`count()` counts rows; **`dcount()`** counts **distinct values** in a column instead:

```kql
SigninLogs
| where TimeGenerated > ago(7d)
| summarize DistinctIPs = dcount(IPAddress) by UserPrincipalName
```

This groups by user again, but instead of counting sign-in attempts, it counts how many
*different* IP addresses each user signed in from over the week. A legitimate user might sign in
from two or three IPs — home, office, phone. A user suddenly showing a `DistinctIPs` of 40 is a
strong signal worth investigating; that single, unusual number is often the thread that starts a
real incident.

## `avg()`: averaging a numeric column

**`avg()`** works the same way `summarize ... by` always does, just with a numeric mean instead of
a count:

```kql
Perf
| where ObjectName == "Processor" and CounterName == "% Processor Time"
| summarize AvgCPU = avg(CounterValue) by Computer
```

Here the `Perf` table (performance counters reported by any machine connected to the Log Analytics
workspace) is filtered to CPU utilization samples, then `summarize avg(CounterValue) by Computer`
produces one average CPU reading per machine — the same `summarize ... by` shape as the sign-in
examples above, just aggregating a different function over a different column.

## Key terms

| Term | Meaning |
|---|---|
| `summarize` | Collapses a table into one row per group, computing an aggregation for each group |
| `count()` | An aggregation function that counts rows in each group |
| `dcount()` | An aggregation function that counts distinct values of a column in each group |
| `avg()` | An aggregation function that computes the numeric mean of a column in each group |
| `by` clause | Defines what each group in a `summarize` represents, e.g. `by UserPrincipalName` |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: in
`summarize DistinctIPs = dcount(IPAddress) by UserPrincipalName`, what does one output row
actually represent, and why might a sudden high `DistinctIPs` value for one user matter to a SOC
analyst?
