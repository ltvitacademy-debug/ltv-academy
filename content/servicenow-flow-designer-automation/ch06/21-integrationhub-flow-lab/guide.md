# Lesson 21 — IntegrationHub Flow Lab

**Chapter 6 · Integration Hub Actions in Flow Designer · Lesson 21 of 27**

## What you'll learn

- How to walk through a realistic two-integration scenario end to end, on paper
- When to reach for a spoke action vs. a generic REST step within the same flow
- How a Connection & Credential Alias and a data pill chain actually connect, in sequence
- How to describe, precisely, what each step in the flow configuration accomplishes

## The scenario

Your company wants a flow that reacts to Priority 1 incidents: the moment one is created, two
things should happen automatically. First, post an alert to a Microsoft Teams channel so the
on-call team sees it immediately. Second, look up extra account information from an external
CRM system's REST API, so the incident record carries the customer's account tier without anyone
having to check a second system by hand. Both pieces plug into a flow that already triggers on
"Incident created" with a condition of `Priority is 1 - Critical" — the trigger itself is
nothing new from earlier chapters. What's new is the two actions that follow it.

## Part 1 — the Teams alert, using the Teams Spoke

Because Microsoft Teams has a pre-built spoke, this half of the flow needs no REST configuration
at all. You drop in the Teams Spoke's "Post Message" action, configure:

- **Channel** — the on-call team's channel, selected from the spoke's own configuration fields
- **Message** — a text template built with data pills from the trigger, something like: "P1
  incident {{number}} created: {{short_description}}"

That's the entire first half of the lab. No endpoint, no headers, no auth profile to configure —
the spoke already knows how to reach Teams and authenticate against it. This is exactly the
value proposition from Lesson 19: configuration, not code, because a spoke already exists for
this system.

## Part 2 — the CRM lookup, using a generic REST step

The CRM has no spoke, so this half uses the generic REST step from Lesson 20. Configuring it
means working through the same five fields:

- **Method** — GET, since this is a lookup, not a change to the CRM's data
- **Endpoint** — built from a Connection & Credential Alias record pointing at the CRM's API
  base URL, rather than typing that URL and a credential directly into this one flow
- **Headers** — whatever the CRM's API requires, such as `Accept: application/json`
- **Request parameters** — the incident's caller or account identifier, carried forward as a
  data pill from the trigger, used to look up the right account in the CRM
- **Response mapping** — the CRM's JSON response includes an `account_tier` field; this gets
  mapped into a new data pill, call it `{{crm_account_tier}}`, that the rest of the flow can use

## Chaining the result

With `{{crm_account_tier}}` now available as a data pill, the flow's final action — an "Update
Record" step on the originating incident — writes that value into a custom field on the
incident, so any agent opening the ticket sees the account tier without opening the CRM
separately. That update step references `{{crm_account_tier}}` exactly the way any other action
in this course references a data pill: pick it from the list carried forward from upstream steps.

## Reading the finished flow

Laid out top to bottom, the finished flow is: trigger (Incident created, Priority 1) → Teams
Spoke "Post Message" action (configuration only) → generic REST step (GET, via a Connection &
Credential Alias, mapping `account_tier` to a data pill) → "Update Record" action writing that
data pill back onto the incident. Two different integration mechanisms, chosen for two different
reasons — one because a spoke existed, one because it didn't — inside a single flow, with zero
custom script steps anywhere in it.

## Key terms

| Term | Meaning |
|---|---|
| Teams Spoke | The pre-built spoke used here for the "Post Message" action — no REST configuration needed |
| Generic REST step | Used here for the CRM lookup, since no spoke exists for that system |
| Connection & Credential Alias | Stores the CRM's base URL and auth profile once, referenced by the REST step |
| account_tier | The CRM response field mapped into a data pill, then written onto the incident |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: in this flow, why does the
Teams half need no REST configuration at all, while the CRM half does — and what exact value
ends up written back onto the incident record, and from where?
