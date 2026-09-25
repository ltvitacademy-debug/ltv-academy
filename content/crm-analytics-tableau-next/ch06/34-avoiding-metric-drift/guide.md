# Avoiding Metric Drift

A metric rarely fails all at once. It **drifts**. Two dashboards that agreed in January differ by three percent in June, and nobody can say when or why. This lesson closes the chapter by naming the common causes of drift and giving you a practical prevention and detection routine, built on the central definitions and governance you learned in the previous lessons.

## What you'll learn

- What metric drift is and how it shows up
- The four most common causes of drift in Salesforce analytics
- Design habits that prevent drift
- How to detect drift with a reconciliation check

## What drift looks like

Metric drift is when the same named number produces different values in different places, or a value changes for reasons unrelated to the business. The symptoms are familiar: a leadership meeting spent debating whose number is right, a dashboard that no longer matches a native report, a quarter-over-quarter comparison that quietly stopped being like for like.

## Four common causes

1. **Copied logic.** Someone duplicates a calculation into a personal dashboard, then tweaks a filter. Now there are two definitions with one name.
2. **Silent redefinition.** An editor changes a metric or a calculated field without telling consumers, so history and present stop lining up.
3. **Source changes.** Salesforce is a living system. A picklist value is renamed, a new opportunity stage appears, a field is repurposed, or a sync starts loading a different record set. The metric logic is unchanged, but its inputs are not.
4. **Ambiguous time and grain.** Fiscal versus calendar periods, close date versus created date, and time zone handling can each move a total. If the time dimension is not stated, people assume different ones.

## Prevention: design out the drift

- **One definition, referenced not copied.** Keep the logic in the semantic model and reference it, as covered in the governance lesson.
- **State everything in the description.** Filters, exclusions, time dimension, and owner belong in the metric's description.
- **Separate metrics for separate meanings.** If Sales needs open pipeline included, that is a new named metric, never an edit to the old one.
- **Control who can edit.** Keep the Editor role rare, and announce every change with an effective date.
- **Watch upstream.** When admins change stages or fields, someone should tell the analytics owner. Make that a standing part of the release process.

## Detection: reconcile against a trusted source

You already know how to write an independent check. Compare the metric against a query or native report that is computed a different way. For example, a SOQL check of Closed Won revenue for the current fiscal quarter:

```sql
SELECT SUM(Amount)
FROM Opportunity
WHERE IsWon = true
  AND CloseDate = THIS_FISCAL_QUARTER
```

If the semantic model metric for the same period and filters does not match, drift has crept in, and the difference points you to the cause. Remember that SOQL reads the source system, while the semantic model may read data synced through Data 360, so differences can also come from sync timing. Note the refresh time whenever you compare.

## Make it routine

- Reconcile your top metrics on a schedule, such as monthly and after every release that touches stages or fields.
- Keep a short change log with each metric's history.
- Retire old copies. A dashboard that nobody trusts should be removed, not left to compete.

## Key terms

| Term | Meaning |
|---|---|
| Metric drift | The same named metric producing different values over time or across places |
| Reconciliation | Comparing a metric with an independently computed source |
| Change log | A dated history of edits to a metric's definition |

## Check yourself

A picklist stage "Negotiation" is renamed to "Contract Review". The Closed Won Revenue metric still matches last month. Which cause of drift could hit the open pipeline metric, and how would you detect it?
