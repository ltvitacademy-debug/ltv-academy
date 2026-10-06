# Script — Payment Terms and Due Dates

## Segment 1 (title)

Last lesson mentioned that payment terms calculate an invoice's due date. This lesson opens that box, because "2 10 net 30" is a phrase everyone in AP repeats without always knowing exactly how Payables turns it into a real calendar date.

## Segment 2 (steps)

A payment term is defined once, then assigned to a supplier or entered on an invoice. One term can have several lines, and each line produces one installment - most invoices get a single installment, but a term can split an invoice into several, each for a percentage or fixed amount, each with its own due date.

## Segment 3 (code)

Every due date is calculated one of two ways. Days adds a number of days to the invoice's terms date - net 30 means due date equals terms date plus 30 days. Fixed date means due on a specific day, month, and year no matter when the invoice was dated. A cutoff day and a months-ahead setting push the due date into a later month for terms like "due the 15th of next month."

## Segment 4 (code)

Each line can also carry up to three discount tiers, each with its own percentage and date, calculated the same way. 2 10 net 30 really means: take a 2% discount if paid within 10 days, otherwise the full amount is due in 30. Take Brightfield's supplier Solara Packaging, a $4,000 invoice dated June 1st: full amount due July 1st, or $3,920 if paid by June 11th.

## Segment 5 (outro)

Pay on June 8th and Payables can automatically take that $80 discount. Pay on June 20th and the window already closed. That closes out Chapter 1. Up next, Chapter 2: Suppliers, starting with suppliers, sites, and contacts.
