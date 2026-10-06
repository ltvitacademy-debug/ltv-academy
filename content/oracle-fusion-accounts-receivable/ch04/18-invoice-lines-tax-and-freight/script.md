# Script — Invoice Lines, Tax and Freight

## Segment 1 (title)

Last lesson treated an invoice line as a single number, quantity times price. In practice, most real invoices carry more than one kind of line, and tax and freight each have their own rules for how they're calculated and where they land in the accounting.

## Segment 2 (steps)

A transaction can mix several line types. The item or revenue line itself. Tax lines, calculated automatically off the ship-to location, the item, and any exemptions, and a transaction can carry more than one if different taxes apply. Freight lines, a separate shipping charge. And occasionally a catch-all charges line for other fees.

## Segment 3 (steps)

Tax determination looks at the ship-to location, not necessarily the bill-to, the nature of the item, and the customer's exemption status, generally handled by a shared tax engine. Freight can go one of two ways: a single flat line for the whole shipment, or calculated per item line when things ship separately. Either way, AutoAccounting has its own separate sourcing rule just for the freight account.

## Segment 4 (outro)

Picture Northwind Fixtures Co shipping Harborline Retail Group ten thousand dollars of taxable fixtures and two thousand dollars of non-taxable installation labor. The invoice gets two item lines, one tax line at seven percent on just the taxable ten thousand, seven hundred dollars, and one flat freight line of one hundred fifty dollars. Total: twelve thousand eight hundred fifty. Items go to revenue, tax to a tax liability account, freight to its own freight revenue account. Up next, lesson nineteen: debit memos and chargebacks.
