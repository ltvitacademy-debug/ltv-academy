# Lesson 9 — Scheduled Analytics Rules in Sentinel

**Chapter 3 · Analytics Rules & Detection Engineering · Lesson 9 of 32**

## What you'll learn

- What a Sentinel **Scheduled Analytics Rule** actually is — the real, vendor-specific implementation of the generic "correlation rule" concept from the SOC Operations course
- The four settings that define a scheduled rule: the KQL query, the run frequency, the lookback window, and the alert threshold
- How a rule's query results turn into an alert, and how alerts become incidents
- Why the run frequency and lookback window have to be set together, not independently

## From correlation rule to scheduled analytics rule

Earlier in this path, the correlation rule from the SOC Operations course was deliberately written in vendor-neutral pseudocode: `SOURCE`, `GROUP BY`, a threshold inside a time window, `THEN alert(...)`. That logic has to live *somewhere* concrete in a real SIEM, and in Microsoft Sentinel it lives in an **Analytics rule**. Sentinel supports several rule types (Scheduled, Near-Real-Time, Microsoft Security, Fusion, ML Behavior Analytics), but the **Scheduled** type is the general-purpose one you write yourself, under **Microsoft Sentinel → Configuration → Analytics → Create → Scheduled query rule**. It's the direct implementation of everything Lessons 13–14 of the prior course covered — the same `SOURCE`/`GROUP BY`/threshold/window/action shape, just expressed as a real KQL query plus a handful of scheduling settings instead of pseudocode.

## The four settings that define a scheduled rule

A scheduled rule has one KQL query and four settings that control how it runs:

- **The query** — any KQL query, written on the rule's "Set rule logic" tab, that returns rows when the condition you're watching for occurs.
- **Run query every** — how often Sentinel executes the query (as often as every 5 minutes, up to every 14 days).
- **Lookup data from the last** — the lookback window: how far back from "now" each run scans.
- **Alert threshold** — "Generate alert when number of query results" is greater than (or not greater than) some number N, usually 0.

Every time the schedule fires, Sentinel re-runs the query against the lookback window and checks the result count against the threshold — that's the whole engine.

## From query match to incident

When a scheduled run's result count crosses the threshold, Sentinel generates an **alert**. "Event grouping" controls whether all matching rows in that run become one alert or one alert per row, and "Alert grouping" controls whether a new alert joins an existing open incident or starts a new one. This is the automation step the prior course's pseudocode left as just `THEN alert(...)` — in Sentinel it's a configurable pipeline, not a single switch.

## Why run frequency and lookback must line up

These two settings aren't independent. If the lookback window is shorter than (or equal to) the run frequency, there's a real risk of a gap: log ingestion into the workspace isn't instantaneous, so an event that happened just before a run, but hadn't finished ingesting yet, can fall between two runs and never get evaluated by either one. Microsoft's own guidance is to set the lookback window **longer than** the run frequency — commonly double — specifically to absorb that ingestion delay. A rule that runs every 5 minutes but only looks back 5 minutes is quietly leaving a gap; the same rule looking back 10–15 minutes closes it.

## Key terms

| Term | Meaning |
|---|---|
| Scheduled analytics rule | A Sentinel rule type that runs a KQL query on a timer and alerts when results cross a threshold |
| Run query every | How often the rule executes (minimum 5 minutes) |
| Lookup data from the last | The lookback window scanned on each run |
| Alert threshold | The result-count condition that must be met to generate an alert |
| Alert grouping | Settings controlling whether new alerts join an existing incident or start a new one |

## Check yourself

Without looking back: why does Microsoft recommend setting the lookback window *longer* than the run frequency, rather than setting both to the same value?
