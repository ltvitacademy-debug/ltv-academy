# Creating an Expense Report

Chapter 1 covered what a consultant configures before anyone can submit a report. Starting here in Chapter 2, we switch to the employee's point of view: what actually happens on screen when someone creates and submits an expense report in Oracle Fusion Expenses.

## What you'll learn

- The structure of an expense report: header versus expense items
- The two entry paths — manual entry and starting from imported transactions
- What information is required at the header level versus the item level
- How an expense report differs from a single expense item

## Header versus items

Every expense report has two layers:

- **The report header** — a name/description for the whole report (commonly the purpose and trip, like "Chicago Distributor Conference — March 2026"), the business purpose, the expense report template it's built from, and the business unit it belongs to.
- **Expense items** — individual lines, each with its own expense type, date, amount, currency, and (where relevant) receipt and justification.

A single report can combine items from an entire multi-day trip: airfare, four nights of hotel, a rental car, and six meals, each as a separate line but all submitted together under one header.

## Two ways an item gets onto a report

1. **Manual entry** — the employee opens Expenses, picks an expense type from the template, and types in the amount, date, merchant, and currency by hand. This is the default path for cash expenses with a paper or emailed receipt.
2. **From an imported transaction** — corporate card transactions arrive through a card issuer feed (covered fully in lesson 9) and appear as a queue of unassigned transactions. The employee opens one, confirms or corrects the expense type Expenses guessed from the merchant category code, and attaches it to a report instead of typing the amount from scratch.

Most companies encourage path two wherever a corporate card was used, since the amount, date, and merchant are already accurate from the card network and cannot be mistyped.

## Required fields at each level

At the **header**, Castellan requires:

- A business purpose (free text, minimum length enforced)
- The correct expense report template (usually defaulted from the employee's assignment, but changeable if the employee is, say, traveling under a different business unit's cost center for a special project)

At the **item** level, required fields depend on the expense type but typically include:

- Date of the expense (cannot be in the future, and Castellan limits it to no more than 90 days in the past before escalating for special approval)
- Merchant name
- Amount and currency
- Receipt image, if the type and amount cross the receipt threshold from lesson 4

```
Expense Report Header
  Purpose: Chicago Distributor Conference - March 2026
  Business Unit: Castellan US Operations
  Template: US Standard Travel

  Item 1: Airfare           03/10/2026   $412.00
  Item 2: Hotel (3 nights)  03/10-13/26  $825.00
  Item 3: Ground Transport  03/10/2026    $58.00
  Item 4: Business Meal     03/11/2026    $96.00
```

## Saving a draft versus submitting

An employee can save an incomplete report as a draft and come back to it — useful mid-trip, when receipts are still trickling in. Nothing is validated against policy or routed for approval until the employee clicks **Submit**. At submission, Expenses runs every applicable policy check and audit rule across every item on the report at once, which is why a report with one over-policy item among ten perfectly normal items still gets flagged as a whole, even though only one line triggered it.

## Recap

An expense report is a header (purpose, template, business unit) wrapping one or more expense items, each with its own type, date, amount, and receipt. Items can be entered manually or pulled from an imported card transaction feed. Nothing is checked against policy until the employee submits. Next up, lesson 6: receipts, attachments, and itemization in more depth.
