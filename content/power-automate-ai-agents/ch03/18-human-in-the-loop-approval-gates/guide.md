# Human-in-the-Loop: Approval Gates for AI Actions

An AI agent that can classify, summarize, and decide is powerful — and that's exactly why some of its decisions shouldn't execute on their own. If a Castlebridge Logistics agent decides a support ticket should be auto-closed, or a refund should be issued, or an account should be escalated to a manager, that's a moment where a human should get a say before anything happens. This lesson covers the Power Automate mechanism for inserting that pause: the **approval** action.

## What you'll learn

- Why human-in-the-loop matters most for irreversible or high-stakes AI-triggered actions
- The three approval actions available in Power Automate, and when to use each
- The five approval types and how they change who has to respond before the flow continues
- How an approval step fits inside a flow that a Copilot Studio agent calls as a tool

## Why gate AI actions at all

Generative orchestration, from the last lesson, is good at deciding *what probably should happen*. It is not infallible, and the cost of being wrong isn't the same for every action. Looking up an order status is low-risk — if the agent calls the wrong tool, a user just gets an unhelpful answer. Auto-closing a ticket, issuing a refund, or escalating to a manager is high-risk — a wrong call there has real consequences, and some of those actions can't be undone.

The fix isn't to make the agent less capable. It's to design specific points in the flow where, no matter how confident the AI's classification was, a human reviews the proposed action before it actually executes. That's human-in-the-loop design, and in Power Automate it's built on the **approvals** connector — the same connector used for ordinary business approvals like vacation requests and expense reports, just applied here to AI-proposed actions.

## The three approval actions

![Screenshot of the Power Automate action picker showing the three Approvals actions: Create an approval, Start and wait for an approval, and Wait for an approval.](/courses/power-automate-ai-agents/ch03/18-human-in-the-loop-approval-gates/list-approval-actions.png)
*The three Approvals actions available in a Power Automate flow.*

- **Start and wait for an approval** — the one you'll use most often. It creates the approval request and pauses the flow at that step until an approver responds (or it creates the request and immediately continues, depending on configuration) — in the common case, the flow pauses, so downstream steps only run after a response comes back.
- **Create an approval** — creates the request but doesn't wait; you'd pair it with a separate **Wait for an approval** action elsewhere in the flow, useful when you need other work to happen in parallel while the approval is pending.
- **Wait for an approval** — pauses on an approval that was already created elsewhere in the flow.

For a human-in-the-loop gate on an AI-proposed action, **Start and wait for an approval** is almost always the right choice: you want the flow to stop, full stop, until a person has weighed in.

## Five approval types

When you configure an approval action, you choose one of five approval types, and the choice matters for how strict the gate is:

| Type | Behavior |
|---|---|
| Approve/Reject — Everyone must approve | Every assigned approver must respond; the flow continues after all respond, or stops at the first rejection |
| Approve/Reject — First to respond | Any one approver's response completes the request |
| Custom Responses — Wait for all responses | You define custom response options; every approver must respond |
| Custom Responses — Wait for one response | You define custom response options; any one response completes it |
| Sequential approval | Approvers respond one at a time, in a defined order; each must respond before the next is asked |

For something like auto-closing a support ticket, "First to respond" from any member of the support lead team is usually enough. For something higher-stakes, like escalating an account-level issue, "Everyone must approve" or a sequential chain through a manager adds the extra scrutiny the action deserves.

## Where the gate sits in an agent-connected flow

Remember from Lesson 16 that a flow attached to an agent as a tool must respond to the agent within 100 seconds and synchronously. An approval that takes a human minutes or hours to act on cannot sit inside that same tool call — a person isn't going to respond inside a 100-second window.

The practical pattern is to split the work into two flows. The first flow is the one the agent calls directly: it does the fast, synchronous work (classify the ticket, decide the proposed action) and responds to the agent right away, perhaps saying "ticket logged, routing for review." A second, separate flow — triggered independently, for instance by the ticket being flagged for an action that needs sign-off — runs the **Start and wait for an approval** step on its own schedule, with no 100-second constraint, because it isn't the thing the agent is waiting on. You'll build exactly this split in the capstone.

## Key terms

- **Human-in-the-loop** — a design pattern that inserts a mandatory human review step before a high-stakes or irreversible AI-proposed action executes
- **Start and wait for an approval** — the Power Automate action that creates an approval request and pauses the flow until a response arrives
- **Approval type** — the rule governing how many approvers must respond, and in what order, before an approval request is considered resolved
- **Sequential approval** — an approval type where approvers respond one at a time in a defined order
- **Synchronous tool response** — the constraint (from Lesson 16) that rules out putting a slow, human-paced approval inside the same flow an agent is waiting on
