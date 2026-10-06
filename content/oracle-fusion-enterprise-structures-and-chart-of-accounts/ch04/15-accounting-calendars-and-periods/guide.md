# Accounting Calendars and Periods

Every ledger needs a calendar — one of its "4 Cs" from Chapter 2. This lesson covers what an Oracle Fusion accounting calendar actually consists of, and why the choices you make here ripple through every period-end close for as long as the ledger exists.

## What you'll learn

- What an accounting calendar defines, structurally
- The common calendar patterns: monthly (Gregorian), and 13-period/4-4-5 style calendars
- How periods are named, and why naming conventions matter
- Why calendars, once used by a live ledger, are extremely difficult to change

## What a calendar defines

An **accounting calendar** is the structure that breaks a fiscal year into a sequence of accounting **periods** — the time buckets every journal entry, invoice, and balance gets associated with. Defining a calendar means specifying:

```
Accounting Calendar defines:
  - Period Type (Month, 13-period, Week, Quarter...)
  - Number of periods per fiscal year
  - Start and end dates for each period
  - Period names and a numbering/naming convention
  - The fiscal year's start month (not always January)
```

## Common calendar patterns

Most Oracle Fusion implementations use one of two broad patterns:

- **Monthly (Gregorian) calendars**: twelve periods per year, each matching a calendar month (January, February, and so on). This is the most common pattern and the simplest to reconcile against a normal wall calendar.
- **13-period calendars**: used by companies, often retailers or manufacturers, that prefer equal-length accounting periods (commonly four or five weeks each) instead of irregular calendar months, frequently following a 4-4-5 week pattern across each quarter.

Neither pattern is "more correct" — the right choice depends on the business's own reporting conventions and industry norms, which is exactly the kind of fact a consultant gathers during design (Lesson 5), not invents.

## Naming periods

Each period needs a clear, unambiguous name — commonly something like "Jan-25" or "Period 1-25" — because that name is what users will see on every transaction, report, and period-close screen for years. Oracle Fusion gives flexibility in the naming convention, but consistency matters more than cleverness: a naming pattern that's hard to sort or easy to confuse with another period (say, two different fiscal years both just labeled "Period 1") causes real reporting headaches down the road.

## Why calendars are hard to change later

Once a calendar has live transactions posted against its periods, changing its structure — splitting a period, renaming it, or shifting period boundaries — is disruptive at best and sometimes effectively impossible without extensive cleanup. This is one of the enterprise structure decisions (alongside chart of accounts structure, covered in Chapter 5) that genuinely deserves to be "measured twice, cut once" before go-live, rather than treated as something to patch up later.

## Recap

An accounting calendar defines the period type, the number of periods, their dates, and their names for a fiscal year, with monthly and 13-period patterns being the most common choices — and it is a structure you want to get right before any transaction ever posts. Next up, lesson 16: period types and adjusting periods, including how a company handles the audit and true-up entries that don't belong in any regular period.
