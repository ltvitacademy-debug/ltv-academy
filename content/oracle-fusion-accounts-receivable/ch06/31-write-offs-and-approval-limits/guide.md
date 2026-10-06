# Write-Offs and Approval Limits

An adjustment (lesson 30) corrects a balance because it was wrong. A **write-off** is different in spirit: the balance is correct — the customer really does owe that amount — but the company has decided it will never collect it, and formally removes it from the books anyway. This lesson covers write-offs, how they differ from adjustments, and the approval structure that governs both receipt write-offs and transaction write-offs.

## What you'll learn

- The difference between a write-off and an adjustment
- Receipt write-offs versus transaction (invoice) write-offs
- Approval limits specific to write-offs
- System options that bound what can be written off at all

## Write-off versus adjustment

The distinction matters for both accounting and intent:

- An **adjustment** says "this balance is not actually correct — fix the number."
- A **write-off** says "this balance is correct, but we're not going to collect it, and we're taking the loss."

Both ultimately reduce a balance and route through a Receivables Activity (write-offs use a type specifically for write-offs rather than Adjustment), but they tell very different stories to an auditor. A pattern of frequent adjustments might suggest invoicing errors worth fixing upstream; a pattern of write-offs is a collections and credit-risk conversation.

## Receipt write-offs

A **receipt write-off** handles a small leftover balance on a receipt — most often a minor underpayment that isn't worth chasing. If Meridian Office Supply owes $500.00 and pays $497.50, rather than leaving $2.50 open indefinitely or formally adjusting it, the clerk can write off that $2.50 remainder at the point of applying the receipt, closing the transaction cleanly. System options define a write-off limit range per receipt — balances outside that range cannot be written off this way and must be handled through a different process (a full adjustment, or escalated approval).

## Transaction write-offs

A **transaction write-off** (sometimes called an invoice write-off) deals with a larger, standalone balance the company has given up trying to collect — commonly after collections efforts (next lesson) have run their course and the customer is deemed unlikely to ever pay. This is the AR equivalent of declaring a bad debt: the invoice stays in transaction history for audit purposes, but its balance is zeroed out and the loss is recognized in the GL.

## Approval limits for write-offs

Just like adjustments, write-offs are governed by approval limits assigned per user, by currency. A user's write-off approval limit defines the minimum and maximum amount they're authorized to write off without further approval — some companies even set a minimum amount, since write-offs below some threshold might not be worth the audit trail overhead while anything within range is fine to process directly. Anything above the maximum requires escalation, often to a credit manager or controller.

## Recap

A write-off formally abandons collection of a balance the company agrees is legitimate, as opposed to an adjustment that corrects a wrong number. Receipt write-offs clean up small leftover amounts at the point of applying a receipt; transaction write-offs retire a larger balance as a bad debt, usually after collections has exhausted its options. Both are bounded by per-user, per-currency approval limits. Next up, lesson 32: collections and dunning, the process that usually precedes a transaction write-off.
