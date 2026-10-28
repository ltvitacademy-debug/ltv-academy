# Lesson 16 — Building a Workbook for a Specific Use Case

**Chapter 4 · Workbooks & Visualization · Lesson 16 of 32**

## What you'll learn

- How to plan a custom workbook around one specific question, before writing any KQL
- A full worked example: a failed-login trend workbook built from a real KQL query
- How to add a parameter so a reader can filter the same workbook down to one user
- How this workbook fits together from the text, query, and parameter steps covered earlier in the chapter

## Step one: state the question before writing any KQL

Lesson 14 ended on a gap built-in templates can't close: something specific to one organization.
Say the real request here is "show me whether failed sign-ins are trending up, and let me check
one specific user without asking someone to rerun a query for me." That's a concrete, answerable
question, and it's worth writing down before opening the workbook editor — a workbook built
without a clear question in mind tends to turn into the same kind of cluttered, ignored dashboard
covered earlier in this course. One question, one clear chart, one way to narrow it down.

## Step two: the query, shaped for a timechart

The query step does the real work, and it should produce exactly the columns `render timechart`
expects — a time bin and a count:

```
SigninLogs
| where TimeGenerated > ago(7d)
| where ResultType != "0"
| summarize FailedCount = count() by bin(TimeGenerated, 1h)
| render timechart
```

`ResultType != "0"` is the filter that matters: in the Sign-in Logs table, a `ResultType` of `"0"`
means the sign-in succeeded, so excluding it leaves only failures. `bin(TimeGenerated, 1h)` groups
those failures into one-hour buckets — the same binning pattern from Chapter 2's aggregation
lesson — which gives `render timechart` the time-plus-number shape it needs to draw a trend line
instead of a single flat count.

## Step three: add a parameter so one reader can narrow it to a user

The second half of the original request — "let me check one specific user" — is exactly what a
**parameter step** is for. A text or dropdown parameter named something like `TargetUser` can be
added to the workbook canvas, and the query step is edited to reference it:

```
SigninLogs
| where TimeGenerated > ago(7d)
| where ResultType != "0"
| where UserPrincipalName == '{TargetUser}'
| summarize FailedCount = count() by bin(TimeGenerated, 1h)
| render timechart
```

`{TargetUser}` is how a workbook query step reads a parameter's current value — whatever the
reader types or selects gets substituted in before the query runs. Leave the parameter optional
(or default it to "all users" with a small KQL conditional) and the same workbook serves both the
"overall trend" view and the "check one person" view, without building two separate workbooks.

## Step four: a short text step tying it together

A one- or two-line text step at the top — explaining what the chart shows and how to use the
`TargetUser` parameter — is what turns this from "a chart someone else has to decode" into a
workbook a new analyst can pick up without asking anyone. That's the same text-plus-query-plus-
parameter assembly from Lesson 13, now built around one real, specific question instead of
described abstractly.

## Key terms

| Term | Meaning |
|---|---|
| `ResultType != "0"` | The Sign-in Logs filter that isolates failed sign-ins (a result of "0" means success) |
| `bin(TimeGenerated, 1h)` | Groups rows into one-hour time buckets, giving a timechart something to plot |
| `{TargetUser}` | Syntax a workbook query step uses to substitute a parameter's current value into the query |
| Text step | A short markdown explanation at the top of a workbook, tying the chart and parameter together |

## Check yourself

Why does the query filter on `ResultType != "0"` instead of writing a filter that lists out every
possible failure code individually? What does that choice protect against if Microsoft adds a new
failure code later?
