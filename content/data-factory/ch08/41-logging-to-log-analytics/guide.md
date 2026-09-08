# Lesson 41 — Logging to Log Analytics

**Chapter 8 · Monitoring & Error Handling · Lesson 4 of 4**

## What you'll learn

- Why the Monitor hub alone genuinely isn't enough long-term
- How to configure a diagnostic setting to Log Analytics
- Resource-specific mode vs. Azure-Diagnostics mode, and why it matters
- Real KQL queries against your own pipeline run history

## The 45-day problem

Here's a fact that catches people off guard: **Data Factory only
stores pipeline run history for 45 days.** The Monitor hub, which
Lesson 38 covered in depth, is genuinely built for recent
troubleshooting — not as a permanent audit trail. If you need to
answer "how has this pipeline's failure rate trended over the last
six months," the Monitor hub alone can't answer that.

## Routing diagnostics to Log Analytics

The fix is a **diagnostic setting** that streams Data Factory's
resource logs to a Log Analytics workspace, where they're retained on
your own terms and queryable with real code:

![Diagnostics settings screen listing log categories — ActivityRuns, PipelineRuns, TriggerRuns, and several SSIS-specific logs — alongside destination options including Send to Log Analytics.](/courses/data-factory/ch08/41-logging-to-log-analytics/monitor-oms-image2.png)
*Check only the categories you actually need. If you don't use SSIS at all, skip every SSIS log category — there's no reason to pay for and store data you'll never query.*

The three log categories that matter for nearly every data factory:

| Category | Log Analytics table |
|---|---|
| ActivityRuns | `ADFActivityRun` |
| PipelineRuns | `ADFPipelineRun` |
| TriggerRuns | `ADFTriggerRun` |

## Resource-specific mode — pick this one

The destination table setting offers two modes:

- **Azure diagnostics** — every log category dumps into one shared
  `AzureDiagnostics` table.
- **Resource specific** — each category gets its own table
  (`ADFPipelineRun`, `ADFActivityRun`, and so on).

Microsoft's own guidance is direct here: an Azure log table can't
exceed 500 columns, and the shared `AzureDiagnostics` table hits that
ceiling fast once multiple services write into it. **Resource
specific** is the recommended choice, and the one you should default
to.

## Writing real queries

Once logs are flowing — allow up to 15 minutes for a new event to
actually appear — you query them from **Logs** under Monitoring, using
the Kusto Query Language (KQL). A few genuinely useful starting
points:

**Pipeline run availability over time:**
```
ADFPipelineRun
| where Status != 'InProgress' and Status != 'Queued'
| where FailureType != 'UserError'
| summarize availability = 100.00 - (100.00*countif(Status != 'Succeeded') / count())
    by bin(TimeGenerated, 1h), _ResourceId
| order by TimeGenerated asc
| render timechart
```

**Top 5 activities failing with system errors in the last 24 hours:**
```
ADFActivityRun
| where TimeGenerated >= ago(24h)
| where Status != 'InProgress' and Status != 'Queued'
| where FailureType != 'UserError'
| summarize failureCount = countif(Status != 'Succeeded')
    by bin(TimeGenerated, 1h), ActivityName
| top 5 by failureCount desc nulls last
```

**Latest status of every pipeline run:**
```
ADFPipelineRun
| summarize argmax(TimeGenerated, *) by RunId, Status, _ResourceId
```

Notice the `FailureType != 'UserError'` filter appearing twice — it's
a deliberate pattern, excluding failures caused by your own pipeline
configuration so the query surfaces genuine system-level reliability
issues instead.

## Why this matters beyond just "more data"

Once pipeline run data lives in Log Analytics, three things become
possible that the Monitor hub alone can't do:

- **Cross-factory analysis** — route multiple data factories into one
  workspace and query across all of them at once.
- **Custom alerting** — a log alert can fire on the result of any KQL
  query, not just a pre-built metric.
- **Dashboards and workbooks** — build a real, shareable reliability
  dashboard instead of eyeballing the Monitor hub's list view.

## Key terms

| Term | Meaning |
|---|---|
| Diagnostic setting | The configuration that routes a resource's logs to a destination like Log Analytics |
| Resource-specific mode | Routes each log category to its own dedicated table, avoiding the 500-column limit |
| KQL | Kusto Query Language, used to query Log Analytics data |
| `ADFPipelineRun` / `ADFActivityRun` | The Log Analytics tables holding pipeline- and activity-level run history |

## Lab

1. Open **Diagnostics settings** for your data factory in the Azure
   portal and note which log categories are available.
2. Configure a diagnostic setting sending PipelineRuns, ActivityRuns,
   and TriggerRuns to a Log Analytics workspace in Resource specific
   mode.
3. Write one sentence explaining why Resource specific mode is
   preferred over Azure diagnostics mode.

## Check yourself

You're ready for Chapter 9 when you can explain, in one sentence, why
the 45-day retention limit makes Log Analytics necessary for any
data factory you actually care about long-term.
