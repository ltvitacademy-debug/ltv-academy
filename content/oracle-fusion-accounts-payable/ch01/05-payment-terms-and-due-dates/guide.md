# Payment Terms and Due Dates

Last lesson mentioned, in passing, that payment terms calculate an invoice's due date. This lesson stops and actually opens that box, because "2/10, Net 30" is one of those phrases everyone in AP repeats without always knowing exactly how Payables turns it into a real calendar date. By the end of this lesson you'll be able to read a payment term definition and predict the due date it produces for any invoice.

## What you'll learn

- Where payment terms are defined, and that one invoice can be split into several installments
- The two ways Payables calculates a due date: Days and Fixed Date
- How a cutoff day and months-ahead setting push a due date into the following month
- How early-payment discounts attach to the same structure

## Payment terms live on Manage Payment Terms, and drive installments

A payment term is defined once, on the **Manage Payment Terms** page, and then assigned to a supplier or entered directly on an invoice. A single payment term can have **one or more lines**, and each line produces one **installment** on the invoice — most invoices have a single installment (pay 100% by the due date), but a term can split an invoice into multiple installments, each for a percentage or fixed amount, each with its own due date.

## Two ways to calculate a due date

Every installment's due date is calculated one of two ways:

- **Days** — add a specific number of days to the invoice's terms date (usually the invoice date). "Net 30" is a Days term: due date = terms date + 30 days.
- **Fixed Date** — due on a specific day, month, and year regardless of when the invoice was dated. This is rare for ordinary trade invoices but useful for things like an annual service contract due every January 15.

For a Days term, Brightfield Office Supply's standard "Net 30" term means an invoice dated March 1 is due March 31.

## Cutoff day and months ahead: pushing into the next month

Some terms need to say something like "due on the 15th of next month," which plain day-counting can't express cleanly. Two extra fields handle this:

- **Cutoff day** — the day of the month after which the due date rolls forward to a later month. Without a cutoff day, the current accounting month is used.
- **Months ahead** — how many months forward to push the due date from the terms date.

Put together: a term with a cutoff day of 25, months ahead of 1, and a due day of 15 means an invoice dated on or before the 25th of a month is due the 15th of the *next* month, while an invoice dated after the 25th skips an extra month ahead. This is exactly how many real-world "bill due mid next month" supplier arrangements get modeled.

## Discounts ride along on the same line

Each payment term line can carry up to **three discount tiers**, each with its own percentage and its own date (calculated the same Days/Fixed-Date way as the due date itself). "2/10, Net 30" is really saying: take a 2% discount if paid within 10 days, otherwise the full amount is due in 30. Lesson 4 already introduced where the "always take this discount" behavior is configured (Payables Options); this lesson is where the discount's own date and percentage actually live.

## A worked example

Brightfield's fictional supplier **Solara Packaging Co.** is set up with term "2/10 Net 30" on a $4,000 invoice dated June 1:

- Due date (Net 30): June 1 + 30 days = **July 1**, for the full $4,000.
- Discount date (10 days): June 1 + 10 days = **June 11**, for a 2% discount — pay $3,920 instead of $4,000 if paid by June 11.

If Brightfield pays on June 8, Payables (per the discount options from lesson 4) can automatically take the $80 discount. If Brightfield pays on June 20, the discount window already closed, and the full $4,000 is due by July 1.

## Recap

Payment terms are defined once and drive one or more installments per invoice, each with a due date calculated by Days or Fixed Date, optionally pushed forward with a cutoff day and months-ahead setting. Discount tiers ride along on the same structure, with their own percentage and date. This closes out Chapter 1. Next up, Chapter 2: Suppliers, starting with suppliers, sites, and contacts.
