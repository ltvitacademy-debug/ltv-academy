# Expense Templates and Expense Types

This lesson goes deep on the two objects every other piece of Expenses setup depends on: the expense report template and the expense type. If lesson 2 was the map, this is the first stop on it.

## What you'll learn

- What an expense report template actually is and why it is defined per business unit
- How categories, expense types, and templates relate to each other
- What gets defaulted automatically when an employee picks an expense type
- A worked example adding a new expense type to a template

## The expense report template

An **expense report template** is the set of expense types available to an employee when they create a report, scoped to a business unit. Castellan US Operations uses a template called "US Standard Travel," while Castellan Field Services uses "Field Services Expenses," which includes types the corporate template does not, like Safety Equipment Rental.

A template does three things at once:

1. It defines **which expense types** an employee can pick from.
2. It carries **default accounting information** — cost center, natural account, and intercompany segments — so most expense items distribute to the General Ledger without the employee ever seeing an account combination.
3. It can restrict a type to a particular **employee expense role**, for example limiting "Client Entertainment" to employees in sales roles.

## Expense categories and expense types

Oracle Fusion groups individual expense types into **expense categories**, which are seeded, system-defined groupings like Airfare, Hotel, Meals, Entertainment, Miscellaneous, Car Rental, and Mileage. The category drives system behavior — for example, the category determines whether an expense type participates in itemization, or whether it is eligible to be captured from a corporate card feed.

An **expense type** is the specific thing an employee actually picks, nested inside a category. "Hotel," "Motel," and "Bed and Breakfast" might all be separate expense types inside the Accommodations category, each with its own policy limit even though they share the same category-level behavior.

```
Category: Accommodations
  Expense Type: Hotel          (policy limit: $275/night)
  Expense Type: Motel          (policy limit: $140/night)
  Expense Type: Bed & Breakfast (policy limit: $160/night)

Category: Meals
  Expense Type: Business Meal - Client Present
  Expense Type: Business Meal - Employee Only
```

## What a template defaults automatically

When Priya Nandakumar, a Castellan sales representative, selects "Hotel" on her expense report, the template behind her business unit has already decided:

- The **default GL account** — Travel & Lodging Expense, under her cost center.
- Whether the type is **receipt-required** above a dollar threshold (covered more in lesson 6).
- Whether the type requires **itemization**, such as splitting a hotel folio into room charge, tax, and incidentals.
- Whether the type is **reimbursable** at all — some companies configure types like "Personal Phone Use" as explicitly non-reimbursable, tracked for visibility only.

Priya never chooses an account combination herself. The template, built during setup, handles that invisibly.

## Worked example: adding an expense type

Suppose Castellan decides to let field technicians claim parking directly instead of folding it into mileage. The steps:

1. Confirm "Parking" does not already exist as an expense type under the Ground Transportation category — it usually does, as a seeded type, so most companies simply activate it rather than create it from scratch.
2. Add it to the Field Services Expenses template.
3. Set its default GL account to the same cost center structure as other Field Services ground transportation types.
4. Decide on a policy limit if any (parking is often left uncapped but receipt-required above $25).
5. Leave Hotel, Meals, and Mileage policy limits untouched — adding one type never requires revisiting unrelated types.

## Recap

An expense report template is a business-unit-scoped container of expense types, and it carries default accounting information so employees never pick GL accounts. Expense types live inside system-defined categories, which drive behaviors like itemization and card eligibility. Next up, lesson 4: the policies and dollar limits that sit on top of the types we just defined.
