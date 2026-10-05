# Lesson 16 — Lineage for Root Cause Analysis

**Chapter 3 · Dependencies and Impact · Lesson 16 of 25**

## What you'll learn

- Why root cause analysis is an upstream walk — the mirror image of impact analysis
- The basic process: start at the symptom, walk upstream, find where the break actually happened
- Why the break is often not where the wrong number first appears
- A worked example tracing a bad report number back to its real source

## Root cause analysis is the mirror of impact analysis

Lessons 14 and 15 walked **downstream** from a proposed change to find what it would affect. **Root cause analysis (RCA)** walks the opposite direction: you start with a **symptom** — a number that's visibly wrong, a report that looks off, a dashboard that doesn't reconcile with another system — and walk **upstream**, hop by hop, until you find the point where the data actually went wrong.

This is Lesson 12's distinction put directly to use: impact analysis answers "what breaks if I change this," asked *before* a change. Root cause analysis answers "where did this break happen," asked *after* something's already wrong. Same graph, same lineage documentation, opposite direction, opposite timing.

## The basic process

1. **Start at the symptom** — the exact report, field, and value that looks wrong, as precisely as you can state it.
2. **Walk upstream** — move to the immediate upstream dataset and check whether the problem is already present there, or whether it's introduced at this hop.
3. **Repeat at each hop** — keep walking upstream until you find a hop where the data was correct just before, and wrong just after. That hop is where the root cause lives.

Without documented lineage (Chapter 4), this process becomes guesswork and tribal knowledge — asking around for "who built this report" and hoping someone remembers what feeds it.

## The break usually isn't where the symptom shows up

A wrong number in `ExecutiveRevenueDashboard` almost never means the bug is *in* the dashboard. The dashboard is just where someone noticed it. The actual error could be two, three, or five hops upstream — in a transformation's business rule (Lesson 13), a schema change nobody flagged, or a source system that silently started sending a different value. Root cause analysis is specifically the discipline of not stopping at the first place the symptom is visible, and instead walking back until you find where the data itself actually diverged from correct.

## A worked example

`ExecutiveRevenueDashboard` shows revenue 8% lower than finance's own numbers this month. Walking upstream:

```
ExecutiveRevenueDashboard
  <- RevenueFact            (values match StagingView — correct here)
  <- StagingView             (values match SourceTable — correct here)
  <- SourceTable              (missing rows from the 14th — WRONG here)
```

The dashboard and RevenueFact are correctly reflecting what's upstream of them; the error isn't in either. StagingView is also faithfully passing along what it received. The actual break is at SourceTable — a source system that failed to send a batch of orders on the 14th. The fix belongs there, not in the dashboard, even though the dashboard is where the problem was first noticed.

## Key terms

| Term | Meaning |
|---|---|
| Root cause analysis (RCA) | Walking upstream from a symptom to find the hop where data actually went wrong |
| Symptom | The visible, downstream sign that something is wrong — not necessarily where the error originated |
| Divergence point | The specific upstream hop where correct data became incorrect |

## Lab

Pick a real or hypothetical "this number looks wrong" scenario from your own work or coursework. Walk upstream through as many hops as you can identify, and for each hop, note whether you believe the data was already correct entering that hop or not — exactly as the worked example above does.

## Check yourself

Can you explain why root cause analysis walks upstream while impact analysis walks downstream? Can you explain, with your own example, why the place a symptom is noticed is often not the place the error actually happened?
