# Invoice Adjustments and Corrections

Invoices don't always arrive clean, and problems don't always surface during the first validation pass. Sometimes a distribution needs a different account, a line amount was mistyped, or a hold reveals a genuine data error rather than a real matching dispute. This lesson covers adjusting an invoice after it's already been saved — and the point in its lifecycle where that stops being simple.

## What you'll learn

- Why editing a validated invoice knocks its status back to Needs Revalidation
- What can and can't be changed depending on how far an invoice has progressed
- Why paid invoices are the hard stop for ordinary adjustment
- The difference between adjusting and the heavier operations in the next lesson

## Editing a validated invoice puts it back in the queue

An invoice that has already reached **Validated** status doesn't become permanently locked the moment it gets there. You can still edit distributions, correct a line amount, or fix an account combination. But doing so changes the invoice's status to **Needs Revalidation** — Fusion requires the invoice to be re-checked by the Validate action before it can proceed again, exactly the way lesson 18 described validation working the first time. This is a deliberate design: an edited invoice is, by definition, no longer the invoice that was originally validated, so it has to earn that status again.

## What's editable depends on how far along the invoice is

The further an invoice has progressed, the more restricted adjustment becomes:

- **Validated but not yet accounted** — the most flexible state. Most distribution details (description, GL date, tax-related fields) remain editable, and editing simply triggers Needs Revalidation.
- **Accounted but not yet paid** — distributions that have already posted to the ledger are more constrained; depending on configuration, some fields (like the accounting date on a line or distribution not yet posted) can still change, but a posted distribution generally shouldn't be silently altered without an audit trail.
- **Paid or partially paid** — the hard stop for ordinary adjustment. Payables normally prevents updating or reversing distributions on a paid or partially paid invoice, because the payment itself was built from the invoice's accounting as it stood at that moment. Some organizations enable an "Allow Paid Invoice Adjustments" option that loosens this, but the default assumption is that a paid invoice's accounting is settled.

## Why this progression makes sense

Each stage represents more systems that now depend on the invoice looking exactly the way it did when they acted on it. A validated-but-unaccounted invoice has only affected Payables itself, so correcting it is low-risk. An accounted invoice has posted journal entries that other reports and reconciliations may already reference. A paid invoice has generated an actual outbound payment tied to specific dollar amounts — changing the invoice after the fact would disconnect it from the payment that already happened.

## A worked example

Brightfield's invoice from Maple & Co. Printing validates cleanly, but before it's accounted, AP notices the distribution was coded to the wrong cost center. Because it's validated-but-unaccounted, the distribution's account is simply corrected, which flips the invoice to Needs Revalidation; running Validate again clears that and the invoice proceeds normally. If that same miscoding were discovered only after the invoice had already been paid, correcting it would require a different mechanism entirely — not a simple edit, but the adjustment and reversal tools covered in the next lesson.

## Recap

Editing a validated invoice is allowed and routine, but it resets invoice status to Needs Revalidation, requiring the invoice to be re-validated before moving on. How much can be edited narrows as an invoice progresses — most flexible before accounting, more constrained after accounting, and essentially locked once paid, unless a specific option is enabled. Next up, lesson 22, the final lesson of Chapter 4: cancelling and reversing invoices, for situations an ordinary edit can't fix.
