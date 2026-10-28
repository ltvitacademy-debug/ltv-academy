# Lesson 29 — Lab: Writing a Custom Analytics Rule with KQL

**Chapter 8 · Capstone: End-to-End Detection and Response in Sentinel · Lesson 29 of 32**

## What you'll learn

- How to take a detection idea in plain English and turn it into a real KQL query against
  `SigninLogs`, the way Chapter 2 and Chapter 3 both built toward
- How to write an "impossible travel" query using a self-join, one of the join patterns from
  Lesson 8
- How to wrap that query in a scheduled analytics rule: schedule, lookup period, and alert
  threshold, from Lesson 9
- Why entity mapping (Lesson 11) is what turns a plain alert into something the investigation
  graph in Lesson 22 can actually work with

## The detection idea: impossible travel

A user account signs in successfully from the United States, and nineteen minutes later signs in
successfully again — this time from a country on the other side of the world. No commercial
flight makes that trip in nineteen minutes. That pattern, known as **impossible travel**, is a
classic sign of a compromised credential being used from two places at once: the legitimate user
in one location, an attacker with a stolen password in another. It's also a perfect lab case,
because Chapter 2's KQL and Chapter 3's rule-building come together to detect it from scratch.

## Step 1: the base query

Every successful sign-in lands in the `SigninLogs` table, with the country in
`LocationDetails.countryOrRegion`. The query below — built with the join syntax from Lesson 8 —
joins `SigninLogs` to itself on `UserPrincipalName`, keeping only pairs where the second sign-in
happened after the first, from a different country, within one hour:

```
let TimeWindow = 1h;
SigninLogs
| where ResultType == "0"
| extend Country = tostring(LocationDetails.countryOrRegion)
| project TimeGenerated, UserPrincipalName, Country, IPAddress
| join kind=inner (
    SigninLogs
    | where ResultType == "0"
    | extend Country = tostring(LocationDetails.countryOrRegion)
    | project TimeGenerated2 = TimeGenerated, UserPrincipalName, Country2 = Country, IPAddress2 = IPAddress
  ) on UserPrincipalName
| where TimeGenerated2 > TimeGenerated
| where Country != Country2
| where (TimeGenerated2 - TimeGenerated) < TimeWindow
| project UserPrincipalName, TimeGenerated, Country, IPAddress, TimeGenerated2, Country2, IPAddress2
```

`ResultType == "0"` keeps only successful sign-ins — a failed attempt from a second country isn't
proof of anything by itself. Every other line is a technique straight out of Chapter 2:
`extend` to pull a nested field out of `LocationDetails`, `project` to shape columns before a
join, and a `join kind=inner` to compare each sign-in against every other sign-in from the same
user.

## Step 2: from query to scheduled rule

A query sitting in Logs is a one-time answer. A **scheduled analytics rule** (Lesson 9) is what
runs that same query automatically and turns a match into an incident. Creating one means
pasting this query into the rule's query editor, then setting:

- **Run query every**: 1 hour — matches the `TimeWindow` the query already checks
- **Lookup data from the last**: 1 hour — the window of raw logs the query is allowed to see
- **Alert threshold**: trigger when the number of results is greater than 0 — any matching pair
  at all is worth an analyst's attention, so there's no tuning threshold to raise here

## Step 3: entity mapping

An alert that just says "a query matched" isn't enough for the investigation graph in Lesson 22
to do anything with. **Entity mapping** (Lesson 11) tells Sentinel which columns in the result set
are real entities — an account, an IP address — so it can link this alert to every other alert
touching the same account or address. For this rule: map `UserPrincipalName` to the **Account**
entity, and `IPAddress` plus `IPAddress2` to the **IP address** entity (one entry each, since the
query returns two separate addresses). Once that's saved, any future alert naming this same user
or either IP will surface as related — exactly what Lesson 30 picks up next.

## Key terms

| Term | Meaning |
|---|---|
| Impossible travel | Two successful sign-ins from the same account, from different countries, too close together to be real travel |
| Self-join | Joining a table to itself to compare rows against other rows in the same table |
| Alert threshold | The rule setting that decides how many matching results trigger an incident |
| Entity mapping | Tagging result columns as real entities (Account, IP address) so Sentinel can correlate across alerts |

## Check yourself

Why does this rule filter on `ResultType == "0"` on both sides of the join instead of only on
the first sign-in?
