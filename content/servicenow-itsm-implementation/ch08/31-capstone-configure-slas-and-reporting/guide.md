# Lesson 31 — Capstone: Configure SLAs & Reporting

**Chapter 8 · Capstone: Enterprise IT Service Desk · Lesson 31 of 32**

## What you'll learn

- How Lesson 30's Priority tiers become real, schedule-aware SLA Definitions
- How the new-hire onboarding catalog item gets its own Requested Item SLA, separate from the Request as a whole
- How the Knowledge Base turns the service desk supervisor's complaint into a searchable, approved article library
- How a single Service Portal widget gives every employee visibility into their own open requests
- Why this lesson is where Caldwell's commitments stop being promises and start being provable

## SLA Definitions, one per priority tier, schedule-aware

Lesson 30 gave Meridian-related incidents a real Priority. That Priority only becomes a kept or broken commitment once an SLA Definition is attached to it. Caldwell's `contract_sla` records are built one per priority tier: Priority 1 gets a 1-hour response target and a 4-hour resolution target, running on a 24/7 schedule with no `cmn_schedule` attached, because a company-wide Meridian outage doesn't pause for the weekend. Priority 2 gets an 8-business-hour resolution target, running against an "8-5 Weekdays" schedule, so a Tuesday-afternoon ticket doesn't quietly breach over a weekend nobody expected it to count. Each definition's Start condition fires on State = In Progress, not on creation, so queue time before an agent picks up the ticket doesn't eat into the target — the same implementation principle Chapter 6 built, applied here against Caldwell's own Priority tiers. The Pause condition suspends the clock on State = On Hold with Hold Reason = Awaiting Caller, so a plant supervisor who takes two days to call back doesn't burn two days of the team's resolution window.

## Request fulfillment: the new-hire catalog item gets its own SLA

HR's requirement becomes a real catalog item — "New Hire IT Setup" — that generates one `sc_request` and, commonly, two `sc_req_item` records per order: one for the laptop and standard software image, one for application-specific access (ERP read access, VPN). Each Requested Item carries its own SLA, because the laptop provisioning team and the access-approval team work on genuinely different timelines — attaching one SLA to the overall Request would force both items onto whichever timeline happens to be slower. The Request's own `request_state` rolls up from its items rather than being set independently: if the laptop item is Closed Complete but the access item is still Work in Progress, the Request itself shows a calculated Partially Complete status, so a new hire's manager checking on "the onboarding request" sees an honest answer instead of a request that closed the moment the first item finished.

## Knowledge Base: searchable, and actually approved

The service desk supervisor's complaint — answering the same password-reset and VPN question fifteen times a day — gets solved by a real Knowledge Base, not a shared document. Articles for the most common questions (password reset self-service, VPN client setup, how to submit a New Hire IT Setup request) get authored in Draft, then routed through a real approval workflow before Publication — a designated reviewer confirms accuracy before an article reaches either agents or the public-facing portion of the Service Portal that end users can search directly. Articles tied to a specific symptom, like the Line 3 printer's prior intermittent-disconnect pattern, get flagged for review and retirement once the underlying switch is actually replaced, so the Knowledge Base doesn't quietly accumulate advice for problems that no longer exist.

## Service Portal: one widget, each employee's own requests

Chapter 7's Service Portal work gets applied here as a single, concrete widget: "My Open Requests," placed on each employee's portal landing page. The widget's server script runs a `GlideRecord` query against `sc_request` scoped to `requested_for = current user`, returning only that employee's own orders — not every request in the system, and not requiring them to know a ticket number to check status. A new hire can see their onboarding request's Partially Complete status without calling the service desk at all, which is the actual, measurable version of "self-service" the HR requirement was asking for back in Lesson 29.

## Key terms

| Term | Meaning |
|---|---|
| Priority-tier SLA Definition | A `contract_sla` record built per Caldwell priority level, each with its own duration, schedule, and Start/Pause conditions |
| Requested Item SLA | An SLA attached to `sc_req_item` rather than `sc_request`, matched to that specific item's own fulfillment timeline |
| Knowledge approval workflow | The Draft-to-Publication review step confirming an article is accurate before agents or end users can rely on it |
| "My Open Requests" widget | A Service Portal widget querying `sc_request` filtered to the current user, giving each employee visibility into their own orders |

## Check yourself

Before Lesson 32, explain without looking: why does Caldwell's new-hire onboarding catalog item generate two Requested Items with two separate SLAs instead of one SLA on the overall Request, and what does the Request's own `request_state` show while one item is done and the other isn't?
