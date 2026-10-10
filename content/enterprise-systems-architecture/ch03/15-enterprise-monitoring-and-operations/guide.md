# Lesson 15 — Enterprise Monitoring and Operations

**Chapter 3 · Enterprise Design · Lesson 15 of 22**

## What you'll learn

- Why monitoring an integrated enterprise landscape is a different problem than monitoring one application
- What Salesforce's Event Monitoring contributes, and what it doesn't cover on its own
- The idea of end-to-end observability across an integration chain, not just at either endpoint
- Who should own an alert when something breaks in the middle of a multi-system data flow

## Monitoring one app versus monitoring a landscape

An application team monitoring just Salesforce can watch Salesforce's own health signals: are Apex jobs failing, are integration callouts erroring out, is a particular Flow throwing exceptions. That's necessary, but it answers a narrower question than the one a System Architect actually needs answered: is the *business process* working end to end, across every system it touches? An order can look perfectly healthy inside Salesforce — the opportunity closed, the integration call fired successfully — and still have failed, because the ERP on the receiving end rejected it for a reason Salesforce never saw. Monitoring that stops at Salesforce's own boundary will show green lights on a process that's actually broken.

## Salesforce Event Monitoring, and its real scope

**Event Monitoring**, one of the Salesforce Shield components introduced in Lesson 7, logs detailed user and system activity inside Salesforce — logins, API calls, report exports, and more — specifically to help detect and investigate suspicious or anomalous behavior. It's a genuinely useful tool for understanding what happened *inside* Salesforce. But, consistent with the pattern from Lesson 7, Event Monitoring's visibility stops at Salesforce's own boundary. It can tell you a particular integration user made an API call and what that call did inside Salesforce; it can't tell you what the ERP did with the data after receiving it, or whether a downstream system ever actually processed the record at all.

## End-to-end observability

The practical answer to this gap is designing observability for the whole integration chain, not just for each system's own internals: a batch job that logs not just "the job ran" but "the job ran, processed N records, and M of them were rejected by the receiving system with these specific error codes"; an event-driven flow that tracks whether a published event was actually consumed and acknowledged downstream, not just that it was published; a shared tracking identifier (a correlation ID) that travels with a business transaction across every system it touches, so a single transaction's full journey can be reconstructed from logs scattered across multiple systems when something goes wrong. None of this is a single Salesforce feature — it's an architectural discipline the System Architect has to design for deliberately, because no individual system's native monitoring tool is built to see across a boundary it doesn't own.

## Who owns the alert

A recurring operational failure in multi-system landscapes is an alert firing in a system nobody is actually watching, or an error that's visible in one system's logs but invisible to the team responsible for fixing the underlying problem. A batch sync failure between Salesforce and the ERP might technically "belong" to the integration platform's logs, but if the integration team doesn't know a failure there blocks the sales team's ability to see accurate order status, the alert routes to the wrong place and the business impact goes unaddressed. Part of a System Architect's job in designing enterprise monitoring is making sure every failure mode has a named owner who will actually be notified and who understands the business consequence of that specific failure — not just a log entry that technically exists somewhere.

## Key terms

| Term | Meaning |
|---|---|
| End-to-end observability | Monitoring a business process across every system it touches, not just within one system's own boundary |
| Event Monitoring | A Salesforce Shield component logging detailed user and system activity inside Salesforce |
| Correlation ID | A shared tracking identifier that travels with a business transaction across every system it touches |

## Lab

Revisit the ERP order-sync integration from earlier labs. Describe what Salesforce's own monitoring (including Event Monitoring) would and would not be able to tell you if an order successfully left Salesforce but was silently rejected by the ERP due to a data validation error on the ERP side. Then design, in writing, what end-to-end observability for this flow would need to include (at minimum: what gets logged, where, and who is alerted) so that this specific failure wouldn't go unnoticed.

## Check yourself

Can you explain why monitoring that stops at Salesforce's own boundary can show a false "all healthy" signal for a process that actually failed downstream? Can you describe what a correlation ID is for, and why reconstructing a transaction's full journey across systems depends on having one?

Sources: [Salesforce Shield](https://www.salesforce.com/platform/shield/guide/)
