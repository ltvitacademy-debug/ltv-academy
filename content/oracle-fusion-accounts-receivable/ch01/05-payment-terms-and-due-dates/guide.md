# Payment Terms and Due Dates

Payment terms are one of the smallest-looking setup objects in Receivables and one of the most consequential: they decide exactly when a customer's invoice becomes overdue, which ripples into aging reports, dunning, and discount calculations. This lesson closes out Chapter 1 by looking at how payment terms are built and how a due date actually gets calculated.

## What you'll learn

- The building blocks of a payment term: due percentage, days, and date basis
- How split (installment) payment terms work
- How early-payment discounts attach to a payment term
- How to trace a due date back to the rule that produced it

## The building blocks

A payment term is a named setup object (for example, "Net 30" or "2/10 Net 30") made up of one or more **installments**. Each installment specifies:

- **Due percentage** – what portion of the invoice total is due on this installment (100% for a simple term, or split across several installments for a payment plan).
- **Days or a fixed date** – how many days after the date basis the installment is due, or in some terms, a fixed day of a future month.
- **Date basis** – the anchor date the "days" count from: most commonly the transaction (invoice) date, but it can also be the ship date or a system-derived date.

A simple "Net 30" term has one installment: 100% due, 30 days from the transaction date. A "2/10 Net 30" term adds a discount: 2% off if paid within 10 days, full amount due by day 30.

## Split payment terms

Some agreements call for paying an invoice in installments rather than all at once. A split term might define two installments: 50% due 30 days from the invoice date, and the remaining 50% due 60 days from the invoice date. When a transaction uses this payment term, Receivables doesn't create two transactions — it creates two **scheduled payment** records against the one transaction, each with its own due date and amount, both visible on aging and dunning reports independently.

## A worked example

Harborline Retail Group buys from Northwind Fixtures Co. on a "50/50 Net 30/60" term. Northwind issues a $10,000 invoice dated March 1. Receivables generates two scheduled payments: $5,000 due March 31 (30 days from March 1), and $5,000 due April 30 (60 days from March 1). If Harborline pays only $5,000 on March 25, Receivables can apply it to the first scheduled payment, leaving the second $5,000 installment still open and tracked against its own April 30 due date.

Now compare a discount term. Suppose instead Northwind offers "2/10 Net 30" on a different $10,000 invoice, also dated March 1. If Harborline pays by March 11 (10 days out), it may take the 2% discount and pay $9,800. Pay on March 20 instead, and the discount window has closed — the full $10,000 is due, with the final due date still March 31.

## Recap

A payment term is one or more installments, each defined by a due percentage, a number of days (or fixed date), and a date basis to count from. Split terms create multiple scheduled payments against a single transaction; discount terms add an early-payment incentive on top of the same structure. This closes Chapter 1. Chapter 2 moves to Customers, starting with the Trading Community Model that every transaction and receipt is recorded against.
