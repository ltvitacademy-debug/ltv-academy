# Script — Automation Collisions and Recursion

## Segment 1 (title)

A collision is what happens when two pieces of automation act on the same save and the result depends on an order nobody fully anticipated. The order of execution from last lesson isn't trivia, it's the tool you use to predict and prevent exactly this.

## Segment 2 (steps: what a collision looks like)

Classic example: a validation rule and a flow both touch the same field. The flow updates it in a before-save context, and the validation rule evaluates the updated value, not what the user actually typed. If nobody realized the flow ran first, the validation rule's behavior looks mysterious. Nothing here is individually broken, it's the combination nobody mapped out.

## Segment 3 (code: the documented safeguard)

Recursion is when an automation's own action causes the same record to save again. Workflow field updates are the classic cause, and Salesforce documents a hard safeguard: a workflow field update only re-triggers that one additional save, once, never an unbounded loop from workflow rules alone.

## Segment 4 (code: what gets skipped on a recursive save)

And here's the part straight from Salesforce's own developer guide: during a recursive save, steps 9 through 17 get skipped entirely. Assignment rules, auto-response rules, workflow rules, escalation rules, Process Builder and flows, roll-up summary updates on parent and grandparent records, all skipped. Only the earlier validation and trigger steps repeat. That's deliberate, so the other automations don't compound a save that's already recursing.

## Segment 5 (steps: avoiding it before it's a production incident)

Apex triggers and flow don't get that same automatic ceiling, you have to build the guard yourself. A few patterns that actually help: minimize how much automation stacks on one object, document which fields each piece reads and writes, use real entry and exit conditions in flow so it doesn't re-fire on a change it just made, and favor record-triggered flows over legacy workflow rules for anything new.

## Segment 6 (outro)

We've now covered what can go wrong when automation piles up. Last lesson in this chapter: how to actually keep it maintainable once it's live and other people are touching it too.
