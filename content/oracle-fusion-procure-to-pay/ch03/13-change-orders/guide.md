# Change Orders

The purchase order has been sent to Meridian Bearing Supply Co. Real purchasing rarely stays perfectly static after that point. This lesson covers what happens when something about an already-approved purchase order needs to change.

## What you'll learn

- What a change order is and when one is required
- How Oracle Fusion versions a purchase order through changes
- Which kinds of changes trigger reapproval, and which do not
- A realistic change scenario on LTV's bearing purchase order

## What a change order is

A **change order** is a formal update to an already-approved purchase order — modifying quantity, price, need-by date, supplier, or even cancelling a line — tracked as a new, numbered **version** of the same purchase order rather than a silent edit. Oracle Fusion preserves the history of every version, so a consultant or auditor can see exactly what the purchase order looked like before and after each change, who made it, and when.

## Not every change needs the same scrutiny

Oracle Fusion's change order rules distinguish between changes that are significant enough to require reapproval and changes that are minor enough to apply immediately. Typically, changes to quantity, price, or a cancellation are considered significant and trigger a new approval cycle, run through the same BPM-based approval engine as the original purchase order. Other changes, like correcting a text note or updating a non-financial description, may be allowed to apply without a new approval. The exact thresholds and which fields trigger reapproval are configurable, which is why two different Oracle Fusion implementations can behave differently for what looks like the same kind of edit.

## A realistic scenario on LTV's purchase order

Suppose, a few days after the purchase order is sent, Meridian Bearing Supply Co. calls Marcus to say a small cost increase on raw materials means the unit price needs to go up slightly before they can ship. Marcus creates a change order on the existing purchase order, updating the unit price on the schedule. Because a price change is a significant financial change, it routes back through approval — likely to the same procurement manager who approved the original purchase order — before the new price takes effect. Once approved, the purchase order becomes a new version (for example, version 2) reflecting the updated price, and Meridian is notified of the revised terms through the same communication method used originally.

## Retroactive changes and their limits

A change order can sometimes be applied **retroactively** — for instance, adjusting a price after a receipt has already happened, which then affects how the receipt's accrual is valued. This is powerful but risky: changing terms after goods have already been received or invoiced can create mismatches that show up later as matching holds or accrual reconciliation differences, which is exactly the kind of exception this course examines in Chapter 5 and Chapter 6. A disciplined consultant treats a retroactive change order as something to flag and double check downstream, not just something to approve and forget.

## Recap

A change order updates an approved purchase order through a new, tracked version rather than a silent edit, with significant financial changes (quantity, price, cancellation) routing back through approval. LTV's bearing purchase order survives a realistic mid-stream price adjustment from Meridian this way. Next up, lesson 14: what happens when a purchase order reaches the end of its life — closing and cancelling.
