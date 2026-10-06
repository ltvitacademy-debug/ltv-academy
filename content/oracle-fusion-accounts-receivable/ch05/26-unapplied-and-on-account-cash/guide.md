# Unapplied and On-Account Cash

The last lesson mentioned that overpaid or unmatched cash can end up "unapplied" or "on-account." These two statuses sound similar, and clerks often use the words loosely, but Oracle Fusion Receivables treats them as genuinely different states with different implications for reporting and customer relationships. This lesson draws the line between them clearly.

## What you'll learn

- The difference between unapplied and on-account cash
- Why the distinction matters for aging and collections
- How each type of cash gets applied later
- How to find unapplied and on-account cash sitting on a customer's account

## Unapplied cash

**Unapplied cash** is money received from a known customer that has not been applied to any specific transaction yet. The receipt exists, the customer is identified, the amount is known — but Receivables hasn't been told which invoice (if any) it pays. This happens most often with a receipt that comes in before the clerk has matched it, or an overpayment where the excess amount is deliberately left unmatched until a future invoice shows up.

Unapplied cash still belongs to the customer and reduces what they'd owe in a practical sense, but formally, every open invoice still shows its full balance due until the cash is applied against it. This matters a great deal for **aging reports** (covered later in this chapter): a customer can look overdue on paper while actually holding a credit balance sitting unapplied, simply because nobody has matched the pieces together yet.

## On-account cash

**On-account cash** is a step further removed from any specific transaction. Rather than being "available to apply, but not yet applied," it is formally associated with the customer's account as a credit, independent of any individual invoice. On-account cash often results from a deliberate business decision — a customer makes a large prepayment ahead of an expected order, or a company decides an overpayment should simply sit as a standing credit on the account rather than wait for a specific invoice.

The practical difference: unapplied cash usually implies "we expect to match this soon," while on-account cash implies "this is just a credit balance on the account for now," with no particular invoice in mind.

## Why the distinction matters

Both unapplied and on-account cash reduce how much a customer effectively owes, but neither one closes an open invoice by itself — the invoice remains open until someone performs the application. This creates a real operational risk: a collections team working strictly off the aging report (open invoice balances) could chase a customer for a late payment when that customer is, in fact, sitting on an unapplied credit that covers it. Part of good receivables hygiene is a regular routine of searching for unapplied and on-account cash and clearing it against open items before it misleads anyone.

## Finding and applying it later

Receivables provides search tools (and standard reports) specifically to surface unapplied and on-account balances by customer, so a clerk — often during month-end close — can review every customer with a credit sitting idle and match it to open invoices. Once matched, the amount moves from unapplied/on-account into applied, and the open invoice balance drops accordingly.

Fictional example: Meridian Office Supply has $250.00 sitting unapplied since last month's overpayment (from lesson 25), and this month submits a new order generating a $1,000.00 invoice. The AR clerk applies the $250.00 unapplied amount against the new invoice, reducing its open balance to $750.00, and applies the new receipt covering the rest.

## Recap

Unapplied cash is matched to a customer but not yet to a specific transaction; on-account cash is a standing credit on the customer's account, deliberately not tied to any invoice. Neither closes an open invoice automatically, which makes clearing them a routine but important part of receivables hygiene. Next up, lesson 27: automatic receipts and remittances.
