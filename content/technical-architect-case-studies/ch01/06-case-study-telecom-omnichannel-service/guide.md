# Lesson 6 — Case Study: Telecom Omnichannel Service

**Chapter 1 · Technical Architect Case Studies · Lesson 6 of 21**

## What you'll learn

- How Omni-Channel routing and skills-based assignment work together across voice, chat, SMS, and social
- Why an event-driven outage alert differs architecturally from a routed customer interaction
- How to design for interaction volumes that would overwhelm standard objects, using a tiered storage strategy
- How a bulk legacy-data migration and a day-one live interaction load need different API tools

## The scenario

Nimbus Mobile runs a contact center handling voice calls, web chat, SMS, and social-media messages, millions of customer interactions per month across every channel combined. Management wants a single queue model: whichever channel a customer uses, their interaction should route to the best-available agent based on skill (billing, technical support, retention) rather than a separate siloed queue per channel. During a regional network outage, the system needs to push an alert to every agent handling calls from the affected area within seconds, so agents can set expectations with customers proactively instead of being blindsided. Three years of legacy case history from the previous contact-center platform needs to move into the new system before go-live. Finance is worried about both storage costs and the day-one load on the platform once millions of monthly interactions start flowing through it live.

## One queue model, several channels

Treating voice, chat, SMS, and social as separate siloed systems is the easy, naive design and the wrong one here: the business requirement is explicitly a single skill-based routing decision regardless of channel. **Omni-Channel** with skills-based routing is built for exactly this — every incoming work item, whatever its origin channel, becomes a routable work item carried into the same routing engine, matched against agent skill and availability rather than a fixed per-channel queue. Voice specifically needs **Service Cloud Voice** to bring telephony into the same console and routing engine as the other channels, so a voice interaction and a chat interaction are both just "work" to the router, not two unrelated systems an agent has to juggle across separate screens.

## Outage alerts are a push, not a queue item

The outage-alert requirement is a fundamentally different shape of problem from routed customer work: it isn't one customer's interaction waiting for an agent, it's a broadcast that needs to reach every currently-active agent handling a specific region within seconds, triggered by an external network-monitoring event, not a customer action. This is an **event-driven** pattern — the network team's monitoring system publishes an event the moment an outage is detected, and a subscriber on the Salesforce side fans that event out to every relevant active agent session, rather than trying to force the alert through the same routing queue built for one-to-one customer interactions. Mixing these two patterns — trying to route an outage alert as if it were a customer case — would both slow the alert down and clog the routing queue with something that was never a customer-initiated interaction in the first place.

## Millions of interactions a month: not every record lives the same place

At this volume, every interaction cannot reasonably stay as a full, actively-indexed standard Case record forever — storage costs and query performance both degrade as records accumulate past what day-to-day operational querying actually needs. A tiered approach fits: live and recent interactions (the window agents and supervisors actually query against day to day — recent weeks, not years) stay as standard Case records with full search and reporting support, while older interaction history moves into a large-data-volume storage pattern built for scale, queryable through an asynchronous query path rather than the always-on indexes standard objects maintain. Compliance and historical reporting still have a path to the old data; it just isn't competing for the same resources as this month's live queue.

## Different API tools for different jobs

Migrating three years of legacy case history before go-live is a one-time, very large batch job — the right tool loads records in large batches asynchronously, built for exactly this kind of bulk data movement, not for responding to a single live customer action. The live, day-one interaction load is the opposite profile: individual records created and updated continuously as actual customer interactions happen, which is what the standard real-time API path and the platform's own case-creation flows are built for. Reaching for the bulk-batch tool for live traffic, or trying to push three years of historical records through the same path built for single live transactions, would each be the wrong match of tool to job.

## Key terms

| Term | Meaning |
|---|---|
| Omni-Channel | Salesforce's skills-based work-routing engine, channel-agnostic once work items reach it |
| Service Cloud Voice | Brings telephony into the same console and routing engine as other service channels |
| Event-driven broadcast | Pushing a notification to many active sessions at once, triggered by an external event, distinct from one-to-one routed work |
| Large-data-volume storage pattern | A storage approach for historical records sized for scale, queried asynchronously rather than through always-on indexes |
| Bulk vs. real-time API | Batch-oriented bulk tooling for large one-time data movement, versus real-time APIs for individual live transactions |

## Lab

Nimbus Mobile's network team wants outage alerts to appear directly inside an agent's active voice call screen within five seconds of detection. Sketch the event flow from the network-monitoring system's detection to the agent's screen, naming each component, and explain why this should not be modeled as a new "Case" routed through Omni-Channel.

## Check yourself

Can you explain why a single skills-based routing model works across four different channels without four separate queues? Can you state why the legacy data migration and the live day-one interaction load need two different API approaches rather than one?
