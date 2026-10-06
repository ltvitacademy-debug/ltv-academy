# Lesson 14 — Loops

**Chapter 3 · Flow Logic · Lesson 14 of 31**

## What you'll learn

- What the Loop element actually does, and the one setting it needs
- Current Item from Loop — the special variable every loop generates
- The single most important rule for loops: keep data elements out of them
- A real example showing that rule applied correctly

## A loop runs a path once per item in a collection

The **Loop** element creates a circular path in your flow. It has exactly one required setting: a **Collection Variable**. The Loop element takes every value in that collection and runs it, one at a time, through whatever elements sit on its **For Each** path.

Here's a real one — OppLoop, configured with the collection produced by a Get Records element upstream:

![The Flow Builder canvas: Start (scheduled, daily) feeds into Get Opps Closed 7 Days Ago (a Get Records element), which feeds into OppLoop (a Loop element) with a For Each path and an After Last path that both lead toward End.](/courses/salesforce-flow-automation/ch03/14-loops/loop-element-config.png)

Every time the loop restarts, Flow Builder places the next record from the collection into a special variable called **Current Item from Loop**, named after the loop (here, `OppLoop`). Elements inside the loop can reference that record's fields through this variable — it even works inside formulas and text templates, not just element fields.

## What's actually inside the loop

Once the Loop element exists, you build the **For Each** path with whatever should run per record. Here, two Action elements run for every opportunity that comes through:

![The Flow Builder canvas: inside OppLoop's For Each path, a Lock Opportunity action runs first, followed by an Opp Chatter Post action, before the loop returns to the top for the next item.](/courses/salesforce-flow-automation/ch03/14-loops/loop-canvas-with-actions.png)

Each of those actions references **Current Item from Loop OppLoop > Opportunity ID** — so each iteration locks and posts about whichever specific opportunity the loop is currently holding.

## The rule that matters most: data elements don't belong inside a loop

It's tempting to update a group of records by putting an Update Records element inside a loop, so it runs once per record. Don't. Get Records, Create Records, Update Records, and Delete Records elements each run a SOQL query or DML operation, and a flow is limited to **100 SOQL queries and 150 DML operations**. Multiply either of those by the number of items in a large collection, and the loop can blow past the limit and fail.

The fix: keep **Get Records before the loop**, and keep **Create Records, Update Records, and Delete Records after the loop** — operating on the whole collection in one shot instead of once per item. Here's that exact pattern, built for a flow that deactivates inactive users:

![The Flow Builder canvas: Get Active Users (Get Records, before the loop) feeds UserLoop; inside the For Each path, a Days Since Last Login Decision element leads to a Deactivate Current User Assignment element for the 30+ outcome; after the loop (the After Last path), a single Deactivate User Collection Records Update Records element runs once, outside the loop, before End.](/courses/salesforce-flow-automation/ch03/14-loops/loop-update-after-loop-canvas.png)

Inside the loop, the Assignment element only changes the *in-memory* value of the current item's Active field — it doesn't touch the database. The single Update Records element after the loop is what actually commits every changed record back to Salesforce, in one DML operation instead of one per user.

## Key terms

| Term | Meaning |
|---|---|
| Collection Variable | The only required setting on a Loop element — what the loop iterates over |
| Current Item from Loop | The auto-generated variable holding the current iteration's record/value |
| For Each | The path that runs once per item in the collection |
| After Last | The path that runs once, after every item has been processed |

## Check yourself

A flow needs to send a follow-up task to the owner of every opportunity in a 200-record collection. Where should the Create Records element that makes those tasks go — inside the loop, or after it — and why does it matter at 200 records specifically?
