# Distribution Sets

Lesson 14 showed how a single invoice's lines turn into distributions. But some invoices are the *same shape* every single time — the monthly rent bill always splits the same way between the same two departments. Re-entering that split by hand every month is exactly the kind of repetitive setup Payables automates away with a **distribution set**.

## What you'll learn

- What a distribution set is, and when selecting one on an invoice saves real time
- The difference between a Full distribution set and a Skeleton distribution set
- Why a Full set's percentages must add up to exactly 100
- When a Skeleton set is actually the better choice

## What a distribution set does

A **distribution set** is a predefined template of distribution lines — GL accounts, optionally with percentages — that you select once on an invoice, and Payables automatically creates the matching distributions. Instead of manually entering distribution lines every time a recurring invoice like rent, a monthly software subscription, or a service retainer comes in, you pick the distribution set and the accounting is generated for you.

## Full distribution sets: the split is already decided

A **Full distribution set** specifies both the accounts *and* the percentage of the invoice amount each one receives. The defining rule: **the percentages across all lines in the set must total exactly 100%**. A Full set built for Brightfield's monthly rent invoice might be defined as 70% to the Sales facility expense account and 30% to the Administration facility expense account — select that set on any rent invoice, and Payables creates two distributions in that exact 70/30 split automatically, no matter the invoice's total amount.

## Skeleton distribution sets: only the accounts are fixed

A **Skeleton distribution set** defines the same list of accounts, but with no fixed percentage — the amounts are left at zero for someone to fill in at invoice entry time. This is useful when the *accounts* that should absorb a cost are always the same, but the actual *split* varies invoice to invoice — for example, if a shared service cost should always be split across the same two departments, but the actual ratio depends on something that changes monthly, like relative headcount. A Skeleton set saves you from re-selecting the right accounts every time, even though you still have to type in the amounts.

## Choosing between them

- Use a **Full** set when both the accounts and the split are genuinely fixed — recurring invoices with a truly stable allocation.
- Use a **Skeleton** set when the accounts are fixed but the split legitimately changes — you still want the right accounts every time, just not a hard-coded ratio.

## A worked example

Brightfield's facilities team sets up a Full distribution set called "Monthly Rent Split": 70% to Sales Facility Expense, 30% to Admin Facility Expense. Every month's rent invoice from the landlord gets this distribution set applied, and a $10,000 invoice automatically produces a $7,000 distribution and a $3,000 distribution without anyone re-typing the split. If, instead, Brightfield wanted the ratio to track actual headcount each month, it would define a Skeleton set with the same two accounts and leave the dollar amounts for AP to fill in from that month's headcount report.

## Recap

A distribution set is a reusable template that generates an invoice's distributions automatically. A Full set fixes both the accounts and a percentage split that must total 100%; a Skeleton set fixes only the accounts, leaving the amounts to be entered at invoice time. Next up, lesson 16: invoice import overview, for invoices that arrive in bulk rather than one at a time.
