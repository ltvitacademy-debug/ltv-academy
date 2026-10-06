# Script — Creating an Expense Report

## Segment 1 (title)

Chapter 1 covered what a consultant configures before anyone can submit a report. Starting here in Chapter 2, we switch to the employee's point of view: what actually happens when someone creates and submits an expense report.

## Segment 2 (steps)

Every expense report has two layers. The report header carries a name or purpose, the business purpose text, the template it's built from, and the business unit. Expense items are the individual lines underneath - each with its own type, date, amount, currency, and receipt where relevant. One report can bundle an entire trip: airfare, several hotel nights, a rental car, and multiple meals, all under one header.

## Segment 3 (steps)

There are two ways an item lands on a report. Manual entry: the employee picks a type and types in the amount, date, and merchant by hand - the default for cash expenses. Or from an imported transaction: corporate card charges arrive through a card issuer feed, already dated and amounted correctly, and the employee just confirms the expense type. Most companies push people toward the second path wherever a card was used.

## Segment 4 (code)

Here's what a header and its items look like together. A header for a Chicago conference trip in March twenty twenty-six, under Castellan US Operations, built from the US Standard Travel template. Underneath it: airfare, three nights hotel, ground transport, and a business meal, each a separate item with its own date and amount.

## Segment 5 (steps)

At the header level, Castellan requires a business purpose and the correct template. At the item level, requirements depend on the expense type but usually include the date, the merchant, the amount and currency, and a receipt image if the threshold from lesson four is crossed. An employee can save an incomplete report as a draft and come back later - nothing gets checked against policy until they click submit.

## Segment 6 (outro)

At submission, Expenses runs every policy check and audit rule across every item at once - which is why one over-policy line among ten normal ones still flags the whole report. Up next, lesson six: receipts, attachments, and itemization in more depth.
