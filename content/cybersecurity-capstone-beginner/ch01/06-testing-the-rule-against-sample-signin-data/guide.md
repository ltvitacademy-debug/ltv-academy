# Lesson 6 — Testing the Rule Against Sample Sign-In Data

**Chapter 1 · Beginner Capstone: Baseline Security Hardening and the First Detection Rule · Lesson 6 of 10**

## What you'll learn

- Why a detection rule needs to be tested against known scenarios before it ever runs live
- How to build three small, synthetic `SigninLogs` scenarios that each test a different edge of
  the rule's logic
- How to tell a true positive from a false positive by walking the query through each scenario by
  hand
- Why "the rule compiled" and "the rule works" are two different claims

## A rule that's never been tested is a rule nobody trusts

Lesson 5's query is syntactically correct and conceptually sound — but Mara hasn't actually
watched it fire yet. Before pointing this rule at Hartwell's real `SigninLogs` data, she builds
three small, synthetic scenarios in Sentinel's Logs blade using `datatable`, each one designed to
test a different edge of the query's logic. This is the same discipline as testing code before
shipping it: a rule that's never been run against a known scenario is a rule nobody — including
Mara — actually knows will behave correctly.

## Scenario 1: the real attack pattern — should fire

```kql
let TestData = datatable(TimeGenerated: datetime, UserPrincipalName: string, ResultType: string, IPAddress: string)
[
    datetime(2026-01-15T09:00:00), "jreyes@hartwellutil.com", "50126", "203.0.113.42",
    datetime(2026-01-15T09:01:00), "jreyes@hartwellutil.com", "50126", "203.0.113.42",
    datetime(2026-01-15T09:02:00), "jreyes@hartwellutil.com", "50126", "203.0.113.42",
    datetime(2026-01-15T09:03:00), "jreyes@hartwellutil.com", "50126", "203.0.113.42",
    datetime(2026-01-15T09:04:00), "jreyes@hartwellutil.com", "50126", "203.0.113.42",
    datetime(2026-01-15T09:04:30), "jreyes@hartwellutil.com", "50126", "203.0.113.42",
    datetime(2026-01-15T09:06:00), "jreyes@hartwellutil.com", "0",     "203.0.113.42"
];
TestData
```

Six failures (`ResultType "50126"`, Entra ID's code for an incorrect password) in just over five
minutes, then a success at `09:06:00` — the exact shape of someone finally guessing a phished
password right. Run through Lesson 5's full query, this scenario should produce exactly one
result row.

## Scenario 2: failures with no success — should NOT fire

Same six failed attempts, but the user never signs in successfully afterward — maybe they gave up
and called the help desk instead. The `Failures` portion of the query still flags this cluster
(`FailedCount > 5`), but the `join kind=inner Successes` step finds no matching successful sign-in
to pair it with, so the join produces zero rows. **This is correct behavior, not a bug** — a
failure cluster with no success afterward isn't the pattern this specific rule was built to
catch, even though it might be worth a separate, simpler alert someday.

## Scenario 3: one failure, then a success — should NOT fire

A normal, everyday scenario: a user mistypes their password once, then gets it right on the
second try two minutes later. `FailedCount` for that bucket is 1, which never clears the
`FailedCount > 5` threshold, so `Failures` returns nothing for this user at all, and the join has
no row to work with. This is the false positive this rule is specifically designed to avoid —
without it, every ordinary typo would generate an incident, and the SOC would learn to ignore
this rule within a week.

## Reading the results like an analyst, not just a developer

Running all three `datatable` scenarios through the finished query and checking the output
against expectations is the actual test:

| Scenario | Expected result | Why |
|---|---|---|
| 1 — failures then success | 1 row returned | Matches the exact pattern the rule targets |
| 2 — failures, no success | 0 rows returned | `join kind=inner` finds no success to pair with |
| 3 — one failure, then success | 0 rows returned | Never clears the `FailedCount > 5` threshold |

Three results, three confirmations: the rule fires on the real pattern (a true positive) and
stays silent on both plausible near-misses (avoiding false positives). That's a meaningfully
stronger claim than "the query ran without an error" — a query can run clean and still be wrong.

## Why this step isn't optional

A rule deployed straight from Lesson 5 without this check could easily have an off-by-one error
in the time window, a typo in the `ResultType` comparison, or a join condition that's backwards —
all of which compile fine and look correct on a glance, but would either miss real attacks or
flood the SOC with noise from ordinary typos. Testing against known scenarios *before* going live
is what turns "I think this rule works" into "I confirmed this rule works."

## Key terms

| Term | Meaning |
|---|---|
| `datatable` | A KQL operator that builds a small, inline synthetic table for testing |
| True positive | A test case the rule correctly flags — the real attack pattern |
| False positive | A test case the rule incorrectly flags — here, specifically avoided by design |
| ResultType "50126" | Microsoft Entra ID's result code for a sign-in failure due to an incorrect password |

## Lab

Write a fourth `datatable` scenario: two different users each failing twice within the same
10-minute bucket, neither crossing the threshold alone. Walk through why the query should
correctly produce zero rows for this scenario too.

## Check yourself

You're ready for Lesson 7 when you can explain, in your own words, why "the query compiled
without an error" and "the query behaves correctly" are two different claims, and how the three
test scenarios in this lesson each prove something different about the rule.
