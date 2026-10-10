# Lesson 9 — Logging and Auditing Integrations

**Chapter 2 · Operating Securely · Lesson 9 of 13**

## What you'll learn

- Why integration monitoring has to be deliberately built, since there's no human session to notice something wrong
- The difference between historical event log data and real-time event monitoring, and why they serve different purposes
- What Setup Audit Trail captures that event monitoring doesn't, and vice versa
- How to design a baseline of "normal" integration activity so abnormal activity is actually detectable

## No human means no one notices by accident

Lesson 1 opened this course with the observation that a compromised integration can run, unnoticed, for a long time precisely because there's no person present to react to something looking wrong. Logging and auditing exist to manually build back the thing a human session gets for free: a way to notice when something is off. For an integration, that has to be designed in deliberately — nothing about an API call itself forces anyone to look at it afterward.

## Two different kinds of event data

Salesforce's event monitoring capability provides two genuinely different kinds of data, and an architect needs both for a complete picture, not just one:

**Historical event log data** captures what already happened, queryable after the fact through Salesforce's platform APIs. This data becomes available for querying only after a processing delay (commonly cited as roughly 25–45 minutes after the activity occurred), and it's retained for a limited window — frequently cited as around 30 days, with practical querying typically covering a narrower recent slice of that window at a time. This is the right tool for after-the-fact investigation: "what did this integration user actually do over the last two weeks," reconstructed from a complete historical record once the processing delay has passed.

**Real-time event monitoring** streams events (including login activity, through dedicated login-event objects) as they happen, rather than after a processing delay. This is the right tool for detecting and reacting to something unusual close to when it occurs — an integration user suddenly logging in from an unexpected pattern, for example — rather than only discovering it during a retrospective review. The trade-off is that real-time monitoring requires actively subscribing to and processing a stream, rather than just running a query whenever convenient.

Treating these as interchangeable is a design mistake: a security program that only ever queries historical event logs will reliably learn what happened, but only well after the fact; a program that only watches real-time streams without ever doing a periodic historical review can miss patterns that only become visible with more data over a longer window.

## Setup Audit Trail: configuration changes, not data activity

A separate, simpler mechanism — the **Setup Audit Trail** — tracks changes to the org's own configuration: who changed a permission set, modified a connected app's policy, or edited a Named Credential's settings, and when. This is a different axis entirely from event monitoring's focus on data access and API activity: Setup Audit Trail answers "who changed how this integration is configured to behave," while event monitoring answers "what did this integration's identity actually do once it was configured that way." A thorough integration security review (covered in Lesson 10) draws on both: has anyone quietly loosened this integration's IP relaxation setting or permission set (Setup Audit Trail), and has the integration's actual API activity matched what's expected given its current configuration (event monitoring).

## Building a baseline before you need one

Event data is only useful for spotting something abnormal if you already have a working sense of what normal looks like for that specific integration — its usual call volume, the hours it typically runs, which objects it typically touches. Querying real-time or historical events without first establishing that baseline just produces a pile of data with no way to tell ordinary activity from a problem. The practical sequence is: once an integration goes live, deliberately observe its real activity for a representative period, document what normal looks like (volume, timing, scope), and only then set alerting thresholds or review criteria against that documented baseline — rather than guessing at thresholds before the integration has ever run in production.

## Key terms

| Term | Meaning |
|---|---|
| Event monitoring | Salesforce's capability for capturing data on user and API activity, available as historical event log data and real-time event streams |
| Historical event log data | Event data queryable after a processing delay, retained for a limited window, suited to after-the-fact investigation |
| Real-time event monitoring | Event data streamed as it happens, suited to detecting unusual activity close to when it occurs |
| Setup Audit Trail | A separate log of configuration changes to the org itself (permission sets, connected apps, Named Credentials), distinct from data/API activity logging |
| Baseline | A documented description of an integration's normal activity pattern, against which abnormal activity can actually be recognized |

## Lab

A client has never set up any monitoring for an integration user that's been running daily for two years. Design a monitoring plan: what would you use historical event log data for versus real-time monitoring, what would you specifically ask Setup Audit Trail to help you verify, and describe the process you'd follow over the integration's first month in production to establish a documented baseline before setting any alerting thresholds.

## Check yourself

Can you explain the difference between historical event log data and real-time event monitoring, and give a scenario where you'd specifically need each one? Can you explain why Setup Audit Trail and event monitoring answer two different questions, and why a thorough review needs both?
