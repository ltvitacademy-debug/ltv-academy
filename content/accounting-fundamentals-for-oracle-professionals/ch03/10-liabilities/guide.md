# Liabilities

Liabilities are the mirror image of assets: instead of what a business controls, they represent what a business owes. Nearly every topic from the asset lesson has a direct counterpart here.

## What you'll learn

- The formal definition of a liability
- The difference between current and long-term liabilities
- Common examples of each
- Which Oracle Fusion module exists specifically to manage one major category of liability

## What counts as a liability

A **liability** is a present obligation of the business, arising from a past transaction, that will require an outflow of economic benefit (usually cash) to settle. Breaking that down:

- **Present obligation** — the business owes it now, not just might owe it someday.
- **Past transaction** — something already happened to create the obligation (a purchase on credit, a loan taken out, wages earned by employees but not yet paid).
- **Future outflow** — settling it will cost the business something, usually cash, eventually.

## Current vs. long-term liabilities

Just like assets, liabilities split into two buckets based on timing:

- **Current liabilities**: due within one year (or one operating cycle). Examples: Accounts Payable, Wages Payable, the current portion of a long-term loan, taxes payable.
- **Long-term liabilities**: due beyond one year. Examples: a mortgage payable, long-term notes payable, bonds payable.

A single loan can actually straddle both categories — the portion due within the next twelve months is classified as a current liability, while the remainder stays long-term. This is exactly the kind of detail that gets configured carefully in a real general ledger.

## Worked example: classifying a company's liabilities

A fictional manufacturer, **Caldwell Precision Works**, has the following at year-end:

| Item | Current or Long-term? |
|---|---|
| Amounts owed to suppliers (Accounts Payable) | Current |
| Wages earned by employees, not yet paid | Current |
| A 10-year mortgage on its factory, due next month | Current (mortgage due within a year) |
| The remaining 9+ years of that same mortgage | Long-term |
| Sales tax collected from customers, owed to the state | Current |

Notice the mortgage example: the same loan is split between current and long-term liability based purely on *when* each portion is due, not on the loan as a single lump.

## Why "owing something" doesn't always mean a loan

New students often think of liabilities as only loans. In practice, the most common liability on most companies' books is simple **Accounts Payable** — amounts owed to suppliers for goods or services already received but not yet paid for. If Caldwell Precision Works buys $8,000 of raw materials on 30-day credit terms, it immediately has an $8,000 liability (Accounts Payable), even though no loan agreement was ever signed.

## Why this maps directly to Oracle Fusion

**Oracle Fusion Payables** exists specifically to manage the Accounts Payable liability: recording supplier invoices, tracking what's owed and when it's due, processing payments, and feeding the resulting liability balances into the General Ledger. Understanding Accounts Payable as a liability category now means the entire purpose of the Payables module — and why it matters that invoices get coded to the right liability accounts — will make immediate sense later in the path.

## Recap

A liability is a present obligation from a past transaction that will require a future outflow to settle. Liabilities split into current (due within a year) and long-term (due beyond a year), and a single loan can straddle both. Accounts Payable, not loans, is the most common liability most businesses carry — and it's exactly what Oracle Fusion Payables is built to manage. Next up, lesson 11: equity.
