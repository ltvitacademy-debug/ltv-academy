# Invoice Lines, Tax and Freight

Lesson 17 treated an invoice line as a single number: quantity times price. In practice, most real invoices carry more than one kind of line, and tax and freight each have their own rules for how they're calculated and where they land in the accounting.

## What you'll learn

- The different line types that can appear on one transaction
- How tax is determined and distributed across lines
- How freight is charged and accounted for, and the choice between one freight line or freight-per-line

## Line types on a transaction

A single Receivables transaction can mix several kinds of lines:

- **Line (item/revenue line)** – the actual product or service being billed, the kind of line covered in lesson 17.
- **Tax line** – calculated automatically based on the tax rules applicable to the customer's ship-to location, the item, and any tax exemptions on file; a transaction can carry multiple tax lines if different lines are taxed differently or multiple tax types apply (such as a state tax and a local tax).
- **Freight line** – a separate charge for shipping/delivery, which can be entered as its own line or allocated across the item lines depending on configuration.
- **Charges line** – a less common catch-all for other fees that aren't product revenue, freight, or tax.

## How tax gets calculated

Tax determination considers the ship-to location (not necessarily the bill-to location), the nature of the item or service, and the customer's tax registration and exemption status. In Oracle Fusion, this calculation is generally handled by the shared tax engine rather than Receivables maintaining its own separate tax logic, which is also why system options (lesson 4) includes a setting for how much tax calculation Receivables defers to that engine versus pre-calculated data coming in through AutoInvoice.

## How freight is handled

A business can configure freight one of two ways:

- **One freight line per transaction** – a single freight amount covers the whole shipment, often used when freight is a flat fee regardless of what's on the order.
- **Freight at the line level** – freight is calculated or entered per item line, useful when different lines ship separately or carry proportionally different freight costs.

Either way, AutoAccounting has its own sourcing rule specifically for the freight account, separate from the revenue account rule, so freight revenue (or freight expense recovery) can be tracked distinctly from product revenue.

## A worked example

Northwind Fixtures Co. ships Harborline Retail Group an order with two item lines: $10,000 of fixtures (taxable) and $2,000 of installation labor (non-taxable in Harborline's state). The invoice carries: two item lines, one tax line calculating 7% sales tax on only the $10,000 taxable line ($700), and one freight line for a flat $150 shipping charge. The total invoice is $12,850. Each piece — items, tax, freight — distributes to its own account through AutoAccounting: the item lines to revenue, the tax line to a tax liability account, and the freight line to a separate freight revenue account.

## Recap

A transaction can carry item lines, tax lines, freight lines, and occasionally charges lines, each accounted separately. Tax is determined by ship-to location, item nature, and exemptions, generally through the shared tax engine. Freight can be one flat line or allocated per item line, with its own AutoAccounting rule. Next up, lesson 19: debit memos and chargebacks.
