# Conditions: If/Else Logic in Flows

Lesson 3's approval flow left one question unanswered: what actually happens to the approver's decision? That's a **condition** — the action that checks whether something is true or false and branches your flow accordingly. Castlebridge Logistics' shipping approval flow uses a condition to tell "Approve" from "Reject" and send an entirely different email down each path.

## What you'll learn

- How the Condition action's three boxes build a true/false test
- How the If yes and If no branches work, and why only one of them ever runs
- How to build more demanding checks with an expression instead of the simple three-box form
- How the "Approve" branch of Castlebridge's shipping approval decides what happens next

## The Condition card: three boxes, one test

A condition compares one value against another, using an operator like "is equal to" or "is greater than." Here's a condition checking whether a tweet's retweet count is 10 or more — the same three-box shape works whether you're comparing a retweet count or an approver's response:

![Screenshot of a Condition card in the Power Automate designer with three fields: a dynamic value labeled "Retweet...", an operator dropdown set to "is greater than," and a typed value of 10.](/courses/power-automate/ch01/04-conditions-if-else-logic/specify-condition.png)
*Value, operator, comparison value — every condition in Power Automate reduces to this same three-part shape.*
Source: [Microsoft Learn — Add a condition to a cloud flow](https://learn.microsoft.com/en-us/power-automate/add-condition)

For Castlebridge's shipping approval, the three boxes would read: **Approver response** → **is equal to** → **Approve**.

## If yes, if no — only one branch runs

Once the condition evaluates, Power Automate drops into exactly one of two branches: **If yes** (the condition was true) or **If no** (it was false). Each branch gets its own independent set of actions — here, adding a Send an email action on the If yes side:

![Screenshot of the If yes branch with a "Choose an action" panel open, "Send an email" typed in the search box, and "Send an email (V2)" highlighted under Office 365 Outlook.](/courses/power-automate/ch01/04-conditions-if-else-logic/if-yes-condition.png)
*Actions added under If yes only ever run when the condition is true — the If no branch is configured completely separately.*
Source: [Microsoft Learn — Add a condition to a cloud flow](https://learn.microsoft.com/en-us/power-automate/add-condition)

For Castlebridge, If yes sends "Your shipment has been approved" and updates the record to Approved; If no sends a rejection email with the reason and updates the record to Rejected. Both branches read from the same **Approver response** value — only one side ever executes per run.

## Beyond the three boxes: expressions

The simple three-box condition handles one comparison. When Castlebridge needs to check more than one thing at once — say, approved *and* the shipment value is over a threshold — switch to an expression using `and()`, `or()`, or `not()`:

```
and(equals(outputs('Start_and_wait_for_an_approval')?['outcome'], 'Approve'), greater(triggerBody()?['ShipmentValue'], 10000))
```

*An original expression combining two checks with `and()` — only true when both the approval was granted and the shipment value exceeds $10,000.*

This is Power Automate's expression language, the same one you'll build on in Lesson 7.

## Key terms

- **Condition** — an action that tests whether a value meets a comparison and branches the flow
- **If yes / If no** — the two branches a condition creates; exactly one runs per flow execution
- **Operator** — the comparison itself, such as is equal to, is greater than, or contains
- **Expression** — Power Automate's formula syntax, used for conditions more complex than one simple comparison
