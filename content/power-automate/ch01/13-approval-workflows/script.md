# Script — Approval Workflows: Start and Wait for an Approval

## Segment 1 (title)

Back in Lesson 3, you built a simple approval without looking at what was really happening. This lesson opens that up. Castlebridge Logistics routes freight-damage claims over five thousand dollars through a real approval, and the action behind it has five distinct behaviors depending on who needs to respond.

## Segment 2 (screenshot)

The approvals connector gives you three actions. Create an approval starts a request and moves on immediately. Wait for an approval pauses later for the response. Start and wait for an approval does both in one step, which is why almost every flow reaches for it first.

## Segment 3 (steps)

That one action still has five approval types to choose from. Everyone must approve needs every named approver to respond, which is what Castlebridge Logistics uses for its larger claims. First to respond finishes the moment anyone answers, good for routine swaps. And sequential approval runs approvers one at a time, in order, each one gating the next.

## Segment 4 (code)

Once the action finishes, its output carries the approver's decision in an outcome field. A Condition step checks that field directly — equals outcome, quote Approve — and splits the flow into an approved branch and a rejected branch, the same pattern you'll reuse in every approval flow from here on.

## Segment 5 (outro)

You can now pick the right approval type and branch cleanly on the result. Next, in Lesson 14, you'll handle what happens when a step in that flow fails outright — configuring Run After and building a try, catch pattern around it.
