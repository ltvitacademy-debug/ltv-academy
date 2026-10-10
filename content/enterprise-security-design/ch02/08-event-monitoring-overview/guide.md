# Lesson 8 — Event Monitoring Overview

**Chapter 2 · Applying Security Architecture · Lesson 8 of 15**

## What you'll learn

- The three real tools in Salesforce's Event Monitoring family, and what each one is actually good for
- Why "real-time" and "near-real-time" aren't interchangeable, and which tool is which
- What Transaction Security Policies add on top of Event Monitoring — the ability to act, not just observe
- How to pick a reasonable combination of these tools for a given investigative or detection need

## Three tools, not one feature

Lesson 4 introduced "Event Monitoring" as a family of tools worth a dedicated lesson. There are three distinct pieces, and an architect needs to know which does what, because they answer different questions at different speeds:

- **Event Log Files.** Comprehensive CSV log files covering a wide range of event types — logins, report exports, API calls, URI access, and many more — generated at scheduled intervals (daily, or hourly for some event types) rather than continuously streamed. Best for thorough, after-the-fact historical analysis: reconstructing exactly what happened over a past period.
- **Event Log Objects.** The same underlying event data, but exposed as queryable Salesforce objects through the platform's standard APIs, with a lookup delay (the data becomes queryable some time after the event occurs — this delay should be verified against current Salesforce documentation when designing against it, since it has varied across releases). This is "near-real-time," not instant, but it is far more convenient to build dashboards and automated queries against than parsing CSV files.
- **Real-Time Event Monitoring.** A genuinely real-time capability that uses statistical and anomaly-detection methods to flag unusual activity as it happens, rather than after a delay — this is the tool for actually catching something in progress, not just reconstructing it afterward.

The practical lesson here: if someone says "we have Event Monitoring enabled," that sentence alone doesn't tell you whether they can detect an in-progress data exfiltration attempt or only reconstruct one after the fact next business day. An architect has to ask which of the three tools, specifically, is in play.

## From observing to acting: Transaction Security Policies

Everything above is observational — it tells you what happened or is happening, but doesn't do anything about it on its own. **Transaction Security Policies** are a rules engine that sits on top of real-time events and can take an actual action when a policy's conditions are met: notify an admin, block the transaction outright, force a step-up (multi-factor) authentication challenge, freeze the user, or end the session. This is the "monitoring and response" layer from Lesson 3's defense-in-depth table actually closing the loop — detection plus an automatic response, rather than detection that depends on a human noticing a report later.

Out of the box, enabling Transaction Security typically gives an org a couple of starter policies to build from (for example, a policy limiting concurrent login sessions, and a policy limiting bulk data exports), each backed by an Apex class an architect can customize rather than being locked into a fixed, one-size-fits-all rule.

## Choosing a combination for a real need

None of these tools substitutes for the others, so a design typically layers them deliberately:

| Need | Reach for |
|---|---|
| "What happened across the org in the last quarter, for a compliance audit?" | Event Log Files |
| "Build a live-ish dashboard an admin can check during the day" | Event Log Objects |
| "Catch a suspicious bulk export attempt as it's happening" | Real-Time Event Monitoring |
| "Automatically block or challenge a suspicious action the instant it occurs" | Transaction Security Policies |

A mature design usually uses more than one row of that table simultaneously, because audit needs, dashboard needs, and in-the-moment detection needs are genuinely different requirements, not one requirement with three names.

## Key terms

| Term | Meaning |
|---|---|
| Event Log Files | Comprehensive, interval-generated CSV logs covering many event types, for historical analysis |
| Event Log Objects | The same event data exposed as queryable objects with a lookup delay, for near-real-time dashboards |
| Real-Time Event Monitoring | Genuine real-time anomaly detection on platform activity |
| Transaction Security Policies | A rules engine that can act (notify, block, step-up, freeze, end session) on real-time events, not just observe them |

## Lab

A financial services firm's compliance team asks for the ability to (1) produce a full year-end report of every report export in the org, and (2) automatically block any single user from exporting more than 500 records in report form within one hour. For each requirement, name which specific tool from this lesson satisfies it, and explain why the other tools in this lesson wouldn't.

## Check yourself

Can you explain, without looking back at this lesson, the real difference between Event Log Files and Event Log Objects? Can you explain why Transaction Security Policies are categorically different from the other three tools in this lesson, in terms of what they're capable of doing rather than just observing?
