# Debit Memos and Chargebacks

Both debit memos and chargebacks increase what a customer owes, and students often conflate them. They solve different problems: a debit memo bills for something new; a chargeback closes an old invoice and recreates the still-owed part as a new item. This lesson separates the two clearly.

## What you'll learn

- What a debit memo is for, and how it differs from an invoice
- What a chargeback is for, and exactly what happens when one is created
- How to tell, from a real situation, which one applies

## Debit memos

A **debit memo** is a transaction of class Debit Memo, used to bill a customer for something that wasn't on the original invoice at all — a miscellaneous fee, a restocking charge (lesson 15's memo lines are commonly used here), a correction that increases what's owed. Unlike a credit memo, a debit memo is not usually linked to a specific original invoice; it's simply a new amount owed, standing on its own. It gets its own transaction number, its own due date based on whatever payment term applies, and ages independently on the customer's account.

## Chargebacks

A **chargeback** is specifically a response to an underpayment or an unauthorized deduction on an existing invoice. Picture an invoice for $10,000 where the customer pays only $9,200, deducting $800 unilaterally for a reason the business doesn't agree with (maybe a damage claim it disputes). A chargeback:

1. **Closes the original invoice** – the $10,000 invoice is marked fully applied/closed using the $9,200 payment plus the chargeback.
2. **Creates a brand-new debit item** – a chargeback transaction for the $800 difference, with its own transaction number and its own due date, is created automatically as part of the same process.

The key distinction from an adjustment: an **adjustment** would write off that $800 and make it disappear from the books. A **chargeback** does not write anything off — it recreates the $800 as a new, fully collectible balance, because the business disagrees with the deduction and still expects to be paid.

## Telling them apart

- New charge, nothing to do with an existing invoice → **debit memo**.
- Customer underpaid or took an unauthorized deduction on an existing invoice, and you still expect to collect the difference → **chargeback**.
- Customer underpaid and you've decided to accept the loss → **adjustment** (Chapter 6), not a chargeback.

## A worked example

Harborline Retail Group pays $9,200 against a $10,000 Northwind Fixtures Co. invoice, deducting $800 for a damage claim Northwind's logistics team has already reviewed and rejected as unsupported. Northwind's AR team creates a chargeback: the original $10,000 invoice closes as fully applied, and a new $800 chargeback transaction is created, due under Harborline's standard terms, which Northwind continues to pursue as a legitimate, still-owed balance — distinct from writing the $800 off as an adjustment would be.

## Recap

A debit memo bills for something new and unrelated to an existing invoice. A chargeback closes an underpaid invoice and recreates the shortfall as a new, still-collectible debit item — the opposite of an adjustment, which would write that shortfall off. Next up, lesson 20: credit memos.
