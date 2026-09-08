# Lesson 57 — Schedule, Secure & Monitor

**Chapter 11 · Capstone Project · Lesson 5 of 6**

## What you'll learn

- Scheduling the pipeline to actually beat the 8 AM deadline
- Closing the last real security gaps before calling it production
- Routing diagnostics to Log Analytics for genuine long-term visibility
- The final checklist before Lesson 58's walkthrough

## Scheduling with real margin, not exact timing

The stakeholder's ask was "before the 8 AM leadership meeting" — not
"at 8 AM sharp." A **Schedule trigger** set for 5 AM gives the whole
pipeline three real hours of margin, covering the source query, the
data flow's Spark cluster startup, and the retry policy from Lesson
55 actually needing to use its retries on a bad night:

```
"type": "ScheduleTrigger",
"typeProperties": {
  "recurrence": {
    "frequency": "Day",
    "interval": 1,
    "startTime": "2026-09-09T05:00:00",
    "timeZone": "Eastern Standard Time"
  }
}
```

Building in margin here is a deliberate design choice, not laziness —
a pipeline that only just barely makes an 8 AM deadline on a good
night has no room left for a bad one.

## Closing the remaining security gaps

Lesson 54 already put the SQL connection string behind Key Vault.
Two more real gaps close out Lesson 53's security requirement:

- **The Azure SQL Database sink's credentials** get the same
  treatment — a Key Vault reference, never a plain connection string,
  matching the source side exactly.
- **RBAC on the resource group**: only the on-call data engineering
  team gets **Data Factory Contributor**; everyone else who needs
  visibility gets **Reader** — read and monitor, no ability to
  accidentally edit a production pipeline.

Neither of these is new material — they're Chapter 10's managed
identity, Key Vault, and RBAC patterns, applied to this specific
pipeline rather than taught in the abstract.

## Monitoring built for more than tonight

The Monitor hub answers "did last night's run succeed." For the
kind of long-term visibility a real production pipeline actually
needs — has this pipeline's reliability changed over the last month —
Chapter 8's Log Analytics routing applies directly:

```
ADFPipelineRun
| where PipelineName == "NorthwindNightlySalesPipeline"
| where TimeGenerated >= ago(30d)
| summarize successRate = 100.0 * countif(Status == "Succeeded") / count()
    by bin(TimeGenerated, 1d)
| render timechart
```

This single query turns "seems to be working fine" into an actual,
verifiable 30-day reliability trend Northwind's team can check
without relying on memory or anecdote.

## The pre-Lesson-58 checklist

Before walking through the finished pipeline in the next lesson,
every one of these should genuinely be true:

- [ ] Schedule trigger fires at 5 AM, giving real margin before 8 AM.
- [ ] Every credential — source and sink — is a Key Vault reference.
- [ ] RBAC is scoped: Contributor for the team, Reader for everyone
      else who needs visibility.
- [ ] Diagnostic logs route to Log Analytics with `PipelineRuns`,
      `ActivityRuns`, and `TriggerRuns` enabled.
- [ ] An alert fires on failed activity runs for this specific
      pipeline, scoped, not factory-wide.

## Key terms

| Term | Meaning |
|---|---|
| Schedule margin | Deliberate buffer time between a trigger's fire time and a hard deadline |
| 30-day reliability trend | A KQL query summarizing success rate over time, not just the latest run |

## Lab

1. Calculate the real margin between a 5 AM trigger and an 8 AM
   deadline, accounting for a data flow that typically takes 20
   minutes to run.
2. Write the RBAC assignment you'd make for a stakeholder who only
   needs to view pipeline status, never edit it.
3. Walk through the pre-Lesson-58 checklist against your own version
   of this capstone pipeline.

## Check yourself

You're ready for Lesson 58 when every item on this lesson's checklist
is genuinely true for your own pipeline, not just planned.
