# Script — Conditions: If/Else Logic in Flows

## Segment 1 (title)

Lesson 3's approval flow left one question unanswered: what actually happens to the approver's decision? That's a condition, the action that checks whether something is true or false and branches your flow accordingly. Castlebridge Logistics' shipping flow uses one to tell Approve from Reject.

## Segment 2 (screenshot)

Every condition reduces to the same three boxes: a value, an operator, and a comparison value. Here it's checking whether a retweet count is greater than 10. For Castlebridge's shipping approval, those same three boxes would read: Approver response, is equal to, Approve.

## Segment 3 (screenshot)

Once the condition evaluates, the flow drops into exactly one of two branches. If yes runs when the condition was true, If no runs when it was false, and each branch gets its own independent actions, like this Send an email action being added under If yes. Only one branch ever executes per run.

## Segment 4 (code)

When you need to check more than one thing at once, switch from the simple three boxes to an expression. This one combines two checks with and: true only when the approval outcome equals Approve, and the shipment value is greater than ten thousand dollars. Same condition action, just a sharper tool.

## Segment 5 (outro)

Value, operator, comparison — if yes, if no, exactly one branch. Up next, Lesson 5: loops, where you'll repeat actions across an entire list of items instead of just branching once.
