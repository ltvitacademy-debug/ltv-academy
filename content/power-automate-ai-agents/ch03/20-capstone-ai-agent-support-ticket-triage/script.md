# Script — Capstone: An AI Agent That Triages Support Tickets

## Segment 1 (title)

This is where every piece from this chapter comes together. Castlebridge Logistics' support team gets dozens of tickets a day — dispatch delays, billing disputes, damaged freight, account access problems. Today a human reads every single one before anything happens. In this capstone, an agent does the first read and proposes what happens next.

## Segment 2 (steps)

A ticket lands in the support inbox. The Castlebridge Support Triage Agent reads it and makes the same judgment call a support rep would: what category is this, how urgent is it, and what should happen next. Depending on that judgment, a flow either routes the ticket automatically or holds it for a human to approve first.

## Segment 3 (code)

The classification tool returns a structured result: category, urgency, a short summary, and a proposed action. That proposed action field is the hinge the whole system turns on. Route means it's safe to send straight to the right team. Escalate or close means a person has to sign off before anything happens.

## Segment 4 (steps)

Four pieces make up the system. The agent itself, reasoning per ticket with generative orchestration. A classification tool — an agent flow with the right trigger and response action, synchronous and under a hundred seconds, exactly as Lesson 16 required. And a routing flow that sends clearly-categorized tickets to Dispatch, Billing, Claims, or Security, with anything unclear falling to a default human-review queue.

## Segment 5 (steps)

For any ticket flagged to escalate or close, Lesson 18's two-flow pattern applies directly. A separate flow, triggered independently with no time limit, runs Start and wait for an approval to the support lead team, using first to respond so one lead can clear it quickly. Approve it, and the flow actually closes the ticket or notifies the escalation contact. Reject it, and the ticket falls back to the human-review queue. Nothing irreversible ever runs unchecked.

## Segment 6 (outro)

That's the complete shape of enterprise AI automation this chapter built toward: an agent that reasons, a flow that acts, and a human who stays in control of the moments that matter. Congratulations — you've completed Copilot Studio and AI Agents, and this course.
