# Capstone: An AI Agent That Triages Support Tickets

This is where every piece from this chapter comes together. Castlebridge Logistics' customer support team gets dozens of tickets a day through a shared support inbox — dispatch delays, billing disputes, damaged freight claims, account access problems, and the occasional ticket that doesn't fit any category at all. Right now, a human reads every single one before anything happens. In this capstone, you'll design the system that lets a Copilot Studio agent do the first read, propose what should happen next, and hand off to a human only at the moments that actually require judgment.

## What you'll learn

- How to combine an agent, a classification tool, a routing flow, and an approval gate into one working system
- Why the system is built as two separate flows rather than one, and which lesson that decision comes from
- How to decide which proposed actions are safe to run immediately and which ones need a human first
- How to describe, in plain language, a complete AI automation architecture — the skill this whole chapter has been building toward

## The scenario

A new message lands in Castlebridge Logistics' support inbox. Today, a support rep opens it, decides what kind of issue it is, decides how urgent it is, and decides what to do — forward it to dispatch, open a billing case, start a damage claim, loop in IT for an account issue, or just reply directly. The goal of this capstone is an agent, the **Castlebridge Support Triage Agent**, that reads the ticket, makes that same judgment call, and gets most of the routing done automatically — while keeping a human in control of anything that can't be easily undone.

## Step 1 — Build the triage agent

Following the pattern from Lesson 15, create a new agent named **Castlebridge Support Triage Agent**. Its instructions should describe its job plainly: read an incoming support ticket, determine its category and urgency, and decide whether it can be routed automatically or needs a person to look at it first. Give it generative orchestration (the default), since it needs to reason about each ticket rather than match fixed phrases.

## Step 2 — The classification tool

Following Lesson 16's requirements, build a **Classify Support Ticket** agent flow with the **When an agent calls the flow** trigger and a **Respond to the agent** action, so it can be attached to the agent as a synchronous, agent-level tool. Inside it, an AI Builder or Azure AI prompt — the same kind of action you built in Chapter 2 — reads the ticket text and returns a structured result:

```json
{
  "category": "Damaged Freight",
  "urgency": "High",
  "proposedAction": "escalate",
  "summary": "Customer reports a pallet arrived with visible water damage; requests replacement."
}
```

That `proposedAction` field is the hinge the whole system turns on. A value like `"route"` means the ticket can go straight to the right team's queue. A value like `"escalate"` or `"close"` means a person has to sign off first — exactly the distinction Lesson 18 built toward.

## Step 3 — Routing by category

For tickets the agent can route automatically, a second part of the flow posts the ticket to the right destination: Dispatch Operations for delays, the Billing queue for disputes, the Claims process for damaged freight, and the Security/IT team for account access issues. Anything that doesn't fit cleanly falls to a default human-review queue — this is the same trigger-classify-route shape you studied in the real screenshot back in Lesson 16.

## Step 4 — The approval gate

For any ticket where `proposedAction` is `"escalate"` or `"close"`, Lesson 18's two-flow pattern applies directly. The synchronous tool flow from Step 2 never performs the escalation or closure itself — it only classifies and responds to the agent right away. A **second, separately triggered flow** watches for tickets flagged this way and runs **Start and wait for an approval**, assigned to the support lead team, using the **First to respond** approval type so one lead can clear it quickly. Only after an approval comes back does that second flow actually close the ticket or notify the escalation contact. A rejection routes the ticket to the default human-review queue instead — nothing ever auto-closes or auto-escalates without a person agreeing first.

## Final deliverables

By the end of this capstone, you've designed:

- **An agent** (Castlebridge Support Triage Agent) using generative orchestration to reason about each incoming ticket
- **A classification tool** — an agent flow with the correct trigger and response action, returning a structured category, urgency, and proposed action
- **A routing flow** that sends low-risk, clearly-categorized tickets straight to the right team automatically
- **A human-in-the-loop approval flow**, separate from the synchronous tool call, that gates every auto-close and auto-escalation behind a real person's sign-off

That's the complete shape of enterprise AI automation this chapter has been building toward: an agent that reasons, a flow that acts, and a human who stays in control of the moments that matter.

## Key terms

- **Proposed action** — the field in a classification result that determines whether a ticket can route automatically or needs human approval first
- **Triage agent** — an agent whose job is to read incoming work and decide what should happen to it next, not to resolve it itself
- **Two-flow pattern** — a fast, synchronous tool flow for classification, paired with a separately triggered flow for anything requiring a slower human approval
- **Default human-review queue** — the fallback destination for tickets that don't clearly match any automated category
