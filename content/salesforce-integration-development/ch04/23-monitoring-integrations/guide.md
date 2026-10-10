# Lesson 23 — Monitoring Integrations

**Chapter 4 · Patterns and Practice · Lesson 23 of 23**

## What you'll learn

- What happens by default when an unhandled Apex exception occurs
- Why relying only on exception emails is a known weak point
- What Event Monitoring's Apex Unexpected Exception event type adds
- How to query the EventLogFile object for durable, structured failure data
- A three-layer monitoring approach for a real integration, combining all of this course's tools

## The default: debug logs and exception emails

Unhandled Apex exceptions are recorded in debug logs, and Salesforce also emails the org's designated Apex exception recipients when an unhandled exception occurs — the email carries the stack trace, the exception message, and the org/user identifiers, with no other data included. Debug logs themselves are only generated under specific conditions: active user-based Trace Flags, Apex test runs, or requests that include debugging parameters or headers — meaning a production integration failure won't necessarily leave a debug log behind at all unless logging happens to be active at that moment.

## Why relying only on exception emails is a known weak point

Salesforce's own documentation explicitly discourages relying only on unhandled-exception emails as your monitoring strategy. In practice, these emails land in an inbox that may not be actively watched, carry no structured data for trend analysis (how often is this actually happening, and when), and only cover genuinely *unhandled* exceptions — any error your own try/catch (Lesson 6) already caught and logged in a custom way won't trigger one at all, which is good for user experience but means the exception email path alone gives an incomplete picture of integration health.

## Event Monitoring's Apex Unexpected Exception event type

For a more durable, queryable signal, Event Monitoring (available to all orgs at no extra cost) provides a specific **Apex Unexpected Exception** event type, which records unhandled exceptions in structured **Event Log Files** rather than one-off emails. This gives you a dataset you can actually analyze over time — trends, spikes, which specific integration is failing most — rather than a stream of individual emails you'd have to manually tally.

## Querying EventLogFile

The `EventLogFile` object is the API access point for this data. You filter on fields like `EventType` and `LogDate`, then retrieve the `LogFile` field, which holds CSV data whose column structure is defined by that specific event type's schema:

```apex
List<EventLogFile> logs = [
    SELECT LogFile, LogDate, LogFileFieldNames
    FROM EventLogFile
    WHERE EventType = 'ApexUnexpectedException'
    AND LogDate = TODAY
];
```

Accessing `EventLogFile` requires the **View Event Log Files** and **API Enabled** permissions. Because the log schema for each event type can change between releases, the documentation recommends checking the `LogFileFieldNames` and `LogFileFieldTypes` fields after each release rather than assuming a fixed column layout forever.

## A three-layer monitoring approach

Putting this course's tools together, a credible monitoring strategy for a real integration combines three layers, not just one:

1. **Your own custom logging** — a custom object (like the `Order_Sync_Failure__c` pattern from Lesson 21) capturing the endpoint, status code, and error for every failure your own try/catch (Lesson 6) already handles. This is visible to admins directly in Salesforce with no special licensing, and it's the only layer that captures errors you deliberately caught rather than left unhandled.
2. **The built-in unhandled-exception email** — a backstop for anything that slips past your own error handling entirely, costing nothing extra to have in place.
3. **Event Monitoring's Apex Unexpected Exception event type** — a durable, queryable record of unhandled exceptions over time, useful for spotting trends a single email never would.

No single layer covers everything on its own; together, they do.

## Key terms

| Term | Meaning |
|---|---|
| Unhandled exception email | Default notification Salesforce sends for an uncaught Apex exception |
| Apex Unexpected Exception event type | Event Monitoring's structured record of unhandled exceptions |
| EventLogFile | The API object exposing Event Monitoring data, queried by EventType and LogDate |
| Three-layer monitoring | Custom logging + exception emails + Event Monitoring, combined rather than relying on just one |

## Lab

In a scratch org (or an org with Event Monitoring enabled), run a SOQL query against `EventLogFile` filtered to `EventType = 'ApexUnexpectedException'` and inspect what comes back — even an empty result tells you whether any unhandled exceptions occurred recently. Then design, in writing, the three-layer monitoring plan for the Order Sync project from Lesson 21: name the specific custom object/fields for layer 1 (you already built this), what layer 2 looks like with no extra work, and what a layer-3 query would need to filter on to spot a spike in order-sync failures specifically.

## Check yourself

Explain, without looking back, why relying only on the default unhandled-exception email is a known weak point for monitoring an integration. Then name all three layers of the monitoring approach from this lesson, and what each one specifically catches that the others don't.
