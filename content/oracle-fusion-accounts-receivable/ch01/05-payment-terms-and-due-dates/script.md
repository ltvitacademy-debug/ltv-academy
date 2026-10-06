# Script — Payment Terms and Due Dates

## Segment 1 (title)

Payment terms look small, but they decide exactly when an invoice becomes overdue, which ripples into aging, dunning and discounts. Let's close out chapter one by looking at how a due date actually gets calculated.

## Segment 2 (steps)

A payment term is made of one or more installments. Each installment has a due percentage, how much of the invoice is due on it. Days or a fixed date, how long after the anchor date it's due. And a date basis, the anchor itself, usually the invoice date. Net 30 is the simple case: one installment, one hundred percent, thirty days from the invoice date. Two ten net thirty adds a discount on top of that same shape.

## Segment 3 (code)

Here's a split term in action. Harborline Retail Group buys from Northwind Fixtures Co on a fifty-fifty net thirty-sixty term. Northwind issues a ten thousand dollar invoice dated March first. Receivables creates two scheduled payments: five thousand due March thirty-first, and five thousand due April thirtieth. Each one ages and gets dunned independently, even though it's all one invoice.

## Segment 4 (code)

Now compare a discount term instead. Same ten thousand dollar invoice, dated March first, but on two ten net thirty. Pay by March eleventh and Harborline can take the two percent discount, paying nine thousand eight hundred. Pay on March twentieth and that window's closed — full ten thousand is due by March thirty-first.

## Segment 5 (outro)

That closes chapter one. Chapter two moves to Customers, starting with the Trading Community Model that every transaction is recorded against.
