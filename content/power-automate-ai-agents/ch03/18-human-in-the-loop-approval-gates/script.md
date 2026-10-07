# Script — Human-in-the-Loop: Approval Gates for AI Actions

## Segment 1 (title)

An AI agent that can classify, summarize, and decide is powerful — and that's exactly why some of its decisions shouldn't execute on their own. If an agent decides a ticket should be auto-closed, or an account should be escalated, that's a moment a human should get a say first. This lesson covers the Power Automate mechanism for that pause: the approval action.

## Segment 2 (steps)

Not every AI decision carries the same risk. Looking up an order status is low-risk — a wrong tool call just gives an unhelpful answer. Auto-closing a ticket, issuing a refund, or escalating an account is high-risk, with real and sometimes irreversible consequences. The fix isn't making the agent less capable — it's designing specific points where a human reviews the proposed action before it executes.

## Segment 3 (screenshot)

Power Automate's approvals connector gives you three actions: Create an approval, Start and wait for an approval, and Wait for an approval. For a human-in-the-loop gate, Start and wait for an approval is almost always the right choice — it creates the request and pauses the flow until a person responds.

## Segment 4 (steps)

When you configure the action, you choose an approval type. First to respond is fast — any one approver clears it, good for routine actions like closing a ticket. Everyone must approve is strict, requiring every assigned approver. And sequential approval asks approvers one at a time, in order — useful for something like escalating through a manager.

## Segment 5 (steps)

Remember, a flow attached to an agent as a tool has to respond within a hundred seconds, synchronously — and a human approval can take minutes or hours. So the practical pattern is two flows. The first is what the agent calls directly: fast, synchronous, it responds right away. A second, separate flow runs the approval on its own schedule, with no time limit, because the agent isn't waiting on it.

## Segment 6 (outro)

You'll build exactly this split in the capstone. Up next, Lesson 19: how these patterns scale across an entire organization, with governance controls to match.
