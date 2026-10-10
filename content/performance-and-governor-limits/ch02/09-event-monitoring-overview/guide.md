# Lesson 9 — Event Monitoring Overview

**Chapter 2 · Measuring and Diagnosing · Lesson 9 of 16**

## What you'll learn

- What Event Monitoring actually captures, and how it differs from a debug log
- The real distinction between Event Log File data and Real-Time Event Monitoring
- What access and retention actually look like by edition, per Salesforce's own documentation
- Why Event Monitoring is an org-wide diagnostic tool, not a replacement for debug logs

## Debug logs are per-transaction; Event Monitoring is org-wide

Everything in Lessons 7 and 8 operates at the scale of one transaction, captured by a trace flag you set deliberately before reproducing an issue. **Event Monitoring** operates at a completely different scale: it captures granular details of user and system activity across the entire org continuously, without anyone needing to set a trace flag first. Salesforce describes it as one of several tools the platform provides to help keep org data secure and observable — it makes a copy of specific transaction types, org by org, available through a standard object called `EventLogFile`.

This makes Event Monitoring the right tool for a different class of question than a debug log answers. A debug log answers "what happened in this one transaction I just reproduced." Event Monitoring answers questions like "which specific Apex class or page has been consuming the most CPU time across the whole org over the past week" or "which users are running the slowest reports" — patterns that only become visible by looking across many transactions over time, not by capturing one at a time.

## Event Log Files vs. Real-Time Event Monitoring

Salesforce documentation describes two distinct mechanisms under the Event Monitoring umbrella:

- **Event Log Files.** Data delivered as log files for a wide range of event types, generated asynchronously — meaning a given event can take up to an hour before it's available to query. These are retrieved either through the standard REST API against the `EventLogFile` object, or through the Event Log File Browser, a UI surfaced in Setup.
- **Real-Time Event Monitoring.** A separate, more immediate mechanism built on platform events, for monitoring specific event types (such as login events or report exports) as they happen, rather than waiting on the asynchronous log file delivery.

The practical difference for performance diagnosis: Event Log Files are better suited to retrospective analysis (what happened across the org this week), while Real-Time Event Monitoring is better suited to catching something as it's actively happening (an unusual spike in API calls right now).

## Access and retention depend on edition

Per Salesforce's own Trailhead documentation, access to Event Monitoring data differs by edition. **Developer Edition orgs get free access to all log file types, with 1-day data retention** — enough to explore the feature and its data shape, but not enough for any serious historical analysis. Production orgs with the appropriate add-on can access log file types with retention extending up to a full year, which is what makes genuine trend analysis (like "has average Apex CPU time per transaction crept up over the last six months") actually practical.

## Why this matters for a Technical Architect

A debug log, by design, only exists for a transaction someone deliberately captured. If a performance problem is intermittent, rare, or affects a user who never thought to report it, a trace-flag-based debug log will likely never capture it. Event Monitoring's always-on, org-wide capture is specifically the tool that catches these patterns — identifying, for instance, that one particular Apex class has been quietly consuming an outsized share of CPU time across hundreds of transactions a day, long before any individual user complaint would have surfaced it. Recommending Event Monitoring (or a platform like it) as part of an ongoing performance governance practice, not just a one-time debugging session, is a genuinely architect-level recommendation.

## Key terms

| Term | Meaning |
|---|---|
| Event Monitoring | Salesforce's org-wide capture of user and system activity, available through EventLogFile and Real-Time Event Monitoring |
| EventLogFile | The standard object through which Event Log File data is retrieved via API |
| Event Log File Browser | The Setup UI for exploring Event Log File data without needing direct API access |
| Real-Time Event Monitoring | Platform-events-based monitoring for specific event types as they happen, rather than async log delivery |

## Lab

A client asks: "Can we find out if any specific Apex class has been unusually slow across the whole org over the last month, not just in one transaction we happen to have reproduced?" Write a short recommendation memo (4-6 sentences) explaining why a debug log alone cannot answer this question, which Event Monitoring mechanism (Event Log Files vs. Real-Time Event Monitoring) is the better fit for this specific ask, and what retention limitation you'd flag if the client is currently on Developer Edition.

## Check yourself

Can you explain, in your own words, why Event Monitoring answers a different class of question than a debug log? Can you describe the practical difference between Event Log Files and Real-Time Event Monitoring, and name the Developer Edition retention limit from memory?
