# Lesson 30 — Active vs. Inactive Relationships

**Chapter 4 · Data Modeling · Lesson 7 of 8**

## What you'll learn

- Why Power BI allows only one active relationship between two tables
- What happens when the wrong relationship ends up active
- How to switch which relationship is active
- What an inactive relationship is still good for

## Two tables, two relationships

Sometimes two tables legitimately need to connect in more than one way.
Here, **ProjectTickets** has both an `OpenedBy` column and a `SubmittedBy`
column — and both could reasonably relate to **EmployeeRole**:

![Diagram of two tables, ProjectTickets and EmployeeRole, connected by two separate relationship lines.](/courses/power-bi/ch04/30-active-inactive/candmrel_activerelview.png)
*Two valid relationships between the same two tables — but Power BI can only treat one as the default.*

Power BI allows only **one active relationship** between any two tables at
a time, so that there's always an unambiguous default when you drop
fields from both tables onto a visual. The rest must be **inactive**.

## When the wrong one is active

If Power BI (or autodetect) picked the relationship you didn't want as the
default, your report can return numbers that are technically correct —
just not the numbers you meant:

![Screenshot of the Manage relationships dialog listing two relationships between ProjectTickets and EmployeeRole, with only the OpenedBy relationship checked as active.](/courses/power-bi/ch04/30-active-inactive/candmrel_managerelactive.png)
*OpenedBy is active. SubmittedBy exists, but Power BI ignores it by default.*

Build a visual with **Role**, **Employee**, and **Hours**, and you'll only
see project sponsors — the only people who *open* tickets — instead of
everyone who *submitted* one:

![Screenshot of a Power BI table visual showing only Project Sponsor rows under Role, because the active relationship filters by OpenedBy instead of SubmittedBy.](/courses/power-bi/ch04/30-active-inactive/candmrel_repcrossfilteractive.png)
*Not wrong, exactly — just answering "who opened this ticket," when you meant "who worked on it."*

## Switching the active relationship

Fix it in **Manage relationships**: uncheck the relationship that's
currently active, and check the one you actually want instead.

![Screenshot of the Manage relationships dialog with the SubmittedBy relationship now checked as active instead of OpenedBy.](/courses/power-bi/ch04/30-active-inactive/candmrel_managerelactivesubmittedby.png)
*Only one checkbox can be active between the same two tables — checking one unchecks the other.*

With SubmittedBy active, the same visual now reflects who actually worked
the hours, not who opened the ticket.

## What inactive relationships are still good for

An inactive relationship isn't deleted — it's dormant, available whenever
a DAX measure explicitly asks for it with the `USERELATIONSHIP` function.
This is exactly the pattern behind **role-playing dimensions**: a single
`Date` table connected to a fact table three separate ways — order date,
ship date, delivery date — with only one active by default, and measures
using `USERELATIONSHIP` to reach the other two on demand. You'll write
DAX measures like that later in the course; for now, know that "inactive"
means "available on request," not "unused."

## Key terms

| Term | Meaning |
|---|---|
| Active relationship | The default relationship Power BI uses automatically between two tables |
| Inactive relationship | A valid relationship that exists but isn't used unless a DAX measure requests it |
| USERELATIONSHIP | The DAX function that activates an inactive relationship for one calculation |

## Lab

1. Open **Manage relationships** on a model where two tables share more
   than one possible relationship (or imagine the ProjectTickets example
   above).
2. Note which relationship is currently active, and confirm it's the one
   your reports actually need.
3. Practice switching it: uncheck the active one, check the other, and
   observe how a report built on those tables changes.

## Check yourself

You're ready for Lesson 31 when you can explain why Power BI limits two
tables to a single active relationship — and what tool lets you reach an
inactive one anyway.
