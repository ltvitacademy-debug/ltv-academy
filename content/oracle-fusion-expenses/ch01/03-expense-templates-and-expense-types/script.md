# Script — Expense Templates and Expense Types

## Segment 1 (title)

This lesson goes deep on the two objects everything else in Expenses setup depends on: the expense report template and the expense type. If lesson two was the map, this is the first real stop on it.

## Segment 2 (steps)

An expense report template is the set of expense types available to an employee, scoped to a business unit. It does three things at once: defines which types an employee can pick, carries default accounting information so most items distribute to the ledger invisibly, and can restrict a type to a specific employee role, like limiting client entertainment to sales staff.

## Segment 3 (steps)

Oracle groups individual expense types into system-defined categories: Airfare, Hotel, Meals, Entertainment, Car Rental, Mileage. The category drives behavior, like whether a type participates in itemization or can be captured from a card feed. The expense type is the specific thing an employee picks inside that category - Hotel, Motel, and Bed and Breakfast can all sit inside Accommodations, each with its own policy limit.

## Segment 4 (code)

Here's what that nesting looks like. Accommodations contains Hotel at two seventy-five a night, Motel at one forty, Bed and Breakfast at one sixty. Meals contains separate types for a business meal with a client present versus employee-only. Same category, different policy behavior per type.

## Segment 5 (steps)

When a Castellan sales rep picks Hotel, the template has already decided the default GL account, whether a receipt is required above some threshold, whether itemization is required, and whether the type is even reimbursable at all. She never chooses an account combination herself - the template handles that invisibly.

## Segment 6 (outro)

Remember this: templates are business-unit containers that carry default accounting, and types live inside seeded categories that drive system behavior. Up next, lesson four: the dollar policies and limits that sit on top of the types we just defined.
