# Lesson 11 — Event-Driven Design Practice

**Chapter 2 · Designing Event-Driven Solutions · Lesson 11 of 16**

## What you'll learn

- How to apply Lessons 7–10 together on one realistic scenario, start to finish
- A repeatable five-question design process for any new event-driven requirement
- How to decide between a custom platform event and Change Data Capture for a given fact
- How to spot a "command disguised as an event" in a draft design before building it
- Where idempotency and ordering decisions need to be made explicit, not left implicit

## This lesson is deliberately a practice lesson

Chapters so far have each introduced one new idea — a platform event, CDC, a schema-design rule, an idempotency pattern. Real design work requires combining all of them on one problem at once, under the kind of ambiguity a textbook example doesn't have. This lesson has no new concept of its own; it's a worked design exercise using everything from Lessons 7 through 10, followed by a lab that asks you to repeat the process on a new scenario on your own.

## A five-question design process

For any new "something happens, and other things need to react" requirement, work through these in order:

1. **What is the fact, exactly?** State it as a past-tense sentence, not an instruction. ("A customer's support case was escalated to Tier 2" — not "notify Tier 2 about this case.")
2. **Does this fact already correspond to a record change, or is it a derived/calculated moment?** A raw field change on an existing object points toward CDC; a calculated business moment (crossing a threshold, a multi-field condition becoming true) points toward a custom platform event, often published by logic that itself reacts to a CDC event.
3. **Who are the realistic subscribers, and what does each one need to act?** This drives the fat-event/thin-event call from Lesson 9 — don't guess at hypothetical future subscribers, design for the ones you can actually name.
4. **Can this event be delivered more than once, and does that matter for each subscriber's action?** If any subscriber's reaction isn't naturally idempotent (an insert, a send, a charge), that subscriber needs the tracking pattern from Lesson 10 — decide this now, not after a production duplicate-record incident.
5. **Does any subscriber depend on this event's relationship to another event's timing?** If yes, the schema (question 3) needs an explicit sequence/timestamp field; don't rely on arrival order.

## Worked example: a support case escalation

**Scenario:** When a support Case's `Priority__c` changes to `Critical` AND it has been open more than 4 hours, three things should happen independently: a Tier 2 on-call Slack-style notification (via an external integration), an internal dashboard counter increment, and a CSAT-risk flag set on the related Account.

Walking the five questions:

1. **The fact:** "Case {Id} became a critical, aged escalation." Not "notify Tier 2" — that's one subscriber's reaction, not the fact itself.
2. **CDC or custom event?** This is a *derived, calculated* moment — it depends on two conditions together (`Priority__c = Critical` AND case age), not a single raw field change CDC alone would announce. Design calls for: CDC (or a trigger) on `Case`, watching `Priority__c` in `changedFields`, with Apex checking the age condition, and *that* Apex publishing a custom `Case_Critical_Escalation__e` event only when both conditions are true.
3. **Subscribers and payload:** Three named subscribers — an external Pub/Sub API client (needs Case Id, Case Number, Account Id, Priority), an internal Apex trigger updating a dashboard counter (needs only the fact that this event fired), and an Apex trigger flagging the Account (needs Account Id). A moderately fat event carrying `CaseId__c`, `CaseNumber__c`, `AccountId__c`, and `EscalatedAt__c` covers all three without any follow-up lookup.
4. **Duplicates:** The Slack-style notification is NOT idempotent (a duplicate delivery would double-notify Tier 2) — needs the `EventUuid` tracking pattern from Lesson 10. The dashboard counter increment is also not idempotent (duplicate would inflate the count) — same pattern needed. The Account flag-set *is* idempotent (`CSAT_Risk__c = true` twice is harmless) — no extra tracking needed there.
5. **Ordering:** No subscriber here depends on this event's relationship to a different event's timing — question 5 doesn't add anything for this scenario.

Notice how much of the real design work happened in questions 2 and 4 — deciding where the "fact" actually gets created, and catching which of the three subscribers quietly needed idempotency handling and which didn't.

## Key terms

| Term | Meaning |
|---|---|
| Five-question design process | This lesson's repeatable sequence for designing any new event-driven requirement |
| Derived/calculated moment | A fact that depends on a multi-field or multi-step condition, not a single raw record change |

## Lab

Apply the five-question process to this new scenario, in writing: "When an Opportunity's Amount exceeds $100,000 AND its Stage changes to Negotiation, three things should happen independently: a deal-desk review task is created, a VP-level dashboard metric is incremented, and an external partner-commission system is notified." Work through all five questions explicitly, naming the event(s) involved, where each fires from (CDC trigger vs. custom event), the payload fields, and which of the three subscribers need the idempotency tracking pattern and which don't (with a one-sentence reason for each).

## Check yourself

In the worked support-case example, why does the "fact" get created by Apex reacting to a CDC event, rather than being the CDC event itself? Without re-reading the worked example, can you explain why the dashboard counter subscriber needed idempotency handling but the Account flag-set subscriber didn't?
