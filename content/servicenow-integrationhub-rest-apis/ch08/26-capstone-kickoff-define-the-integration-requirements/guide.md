# Lesson 26 — Capstone Kickoff: Define the Integration Requirements

**Chapter 8 · Capstone: an Enterprise REST Integration · Lesson 26 of 29**

## What you'll learn

- How to turn a vague business ask into a real, written integration requirements doc
- Why this capstone's trigger makes it an event-driven, inbound integration — not a polling job
- The honest architectural call on whether a MID Server is needed here, and why
- The two-system design this capstone builds across Lessons 26–29: a webhook trigger plus a REST pull
- The vocabulary you'll reuse for the rest of this capstone: source of truth, event-driven, requirements doc

## The business ask

HR Operations brings you one sentence: "When a new hire is entered into Meridian HR, our cloud HR
system, we want the ServiceNow records ready before day one — automatically, same day, with no
one having to remember to kick it off by hand." That's not a requirements doc. It's a starting
point. Chapters 1 through 7 gave you every piece you need to turn it into one: integration
patterns, REST Messages, authentication, exposing your own data, IntegrationHub, resilient error
handling, and MID Servers. This capstone is where all seven chapters become one real integration,
built end to end across this chapter's four lessons.

## Turning the ask into a requirements doc

Before any configuration happens, write down what actually has to be true:

| Question | Answer for this integration |
|---|---|
| Trigger | A new employee record is created in Meridian HR |
| Data needed | First/last name, email, start date, department, manager |
| Target records | A pending `sys_user` record + an onboarding task set |
| Frequency / volume | Low — a handful of new hires a day, not a bulk feed |
| Timeliness | Same-day — tasks need to exist before the new hire's first day |
| Source of truth | Meridian HR owns the employee data; ServiceNow never guesses at it |

That last row matters more than it looks. Whatever record initiates this integration, Meridian HR
— not the message that triggers it — is the **source of truth** for what a new hire's actual
name, email, and start date are.

## Picking the pattern: event-driven trigger, not polling

Chapter 1 drew the line between polling (ServiceNow asks on a schedule, "anything new?") and
event-driven integration (the other system tells ServiceNow the moment something happens). A
Scheduled Job polling Meridian HR every few minutes would work, but it wastes calls on every poll
where nothing changed, and it still delays same-day task creation by however long the polling
interval is. Because Meridian HR can initiate the contact itself, this is an event-driven,
**inbound** integration: Meridian HR calls ServiceNow, not the other way around, the instant a new
hire is created.

But an inbound webhook payload is a poor place to carry the full employee record — it's data in
transit, not the source of truth, and trusting it blindly means ServiceNow's picture of a new hire
depends on whatever Meridian happened to include in one HTTP call. This capstone's design splits
the job in two: Meridian HR's webhook carries only a thin notification (an employee ID and an
event type), and ServiceNow turns around and calls *back out* to Meridian HR's own REST API to
pull the authoritative employee record. Lesson 27 builds exactly that pull, using a REST Message.

```
Meridian HR                          ServiceNow
(source of truth)                    (acts on the notification)
     |  1. employee.created webhook       |
     |------------------------------------>|  thin payload: employeeId only
     |                                     |
     |  2. GET /v2/employees/{id}          |
     |<------------------------------------|  REST Message pull (Lesson 27)
     |  3. full employee record            |
     |------------------------------------>|  creates sys_user + tasks
```

The resource that receives that first webhook is a Scripted REST API, built on Chapter 4's
knowledge. Here's the shape of it, as a preview of what Lesson 27 actually builds:

```javascript
// Scripted REST API resource — built out in Lesson 27
(function process(request, response) {
  var payload = request.body.data;
  gs.info('Onboarding webhook received for employeeId: ' + payload.employeeId);
})(request, response);
```

Nothing here pulls the full record yet — it just confirms the notification arrived. The actual
pull happens next.

## Does this need a MID Server?

Chapter 7 built the case for MID Servers: they close the gap between ServiceNow's cloud and
something that has no public-facing endpoint — an on-prem database, a legacy app behind a
firewall. Meridian HR is a cloud SaaS product with a documented, public HTTPS API. ServiceNow's
cloud instance can open an outbound connection to it directly, the same way every REST Message
since Lesson 4 has reached its target. There's nothing behind a firewall here, so a MID Server
would add a relay this integration doesn't need. If Meridian HR were instead an on-prem Oracle HR
database with no public endpoint, that decision would flip — and a MID Server would become
mandatory, not optional.

## Key terms

| Term | Meaning |
|---|---|
| Requirements doc | A written record of trigger, data, target records, volume, and timeliness — written before any configuration starts |
| Source of truth | The system whose data is authoritative; here, Meridian HR, never the webhook payload that merely notifies |
| Event-driven integration | The other system initiates contact the moment something happens, instead of ServiceNow polling on a schedule |
| Inbound integration | A call originates from the external system into ServiceNow, rather than ServiceNow calling out |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why does this integration's
webhook carry only an employee ID instead of the full new-hire record, and what does ServiceNow do
immediately after receiving that thin payload?
