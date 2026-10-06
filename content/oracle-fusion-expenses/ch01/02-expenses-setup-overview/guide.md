# Expenses Setup Overview

Before Castellan Supply Co. can let a single employee submit an expense report, a consultant has to configure a chain of setup objects in a specific order. This lesson is the map of that chain — what each setup object is, why it exists, and the order you build it in. We will go deep on several of these objects (templates, policies, audit rules, approval rules) in later lessons; here the goal is to see how the pieces connect.

## What you'll learn

- The sequence of setup tasks under "Define Expenses Configuration"
- What expense system options control
- How business units scope every other setup object
- Why setup order matters, and what breaks if you skip a step

## Setup lives under business units

Almost every Expenses setup object is defined **per business unit**, not once for the whole company. Castellan Supply Co. has three business units: Castellan US Operations, Castellan Canada Operations, and Castellan Field Services. Each can have its own expense templates, policies, and approval routing, because a per diem rate that makes sense in the United States may not make sense in Canada, and field service technicians may have a different mileage policy than corporate sales staff.

## The setup sequence

1. **Expenses system options** — business-unit-level switches: whether receipts are required above a threshold, whether itemization is required for certain categories, the default currency, and whether cash advances are allowed at all for that business unit.
2. **Expense report templates** — the container that groups expense types together, discussed in depth in lesson 3. No employee can enter an expense item without a template.
3. **Expense types and categories** — the specific things employees can claim (Hotel, Airfare, Ground Transportation, Client Entertainment), nested inside categories and templates.
4. **Conversion rate policies** — how foreign-currency receipts get translated to the ledger currency: Corporate, Spot, or User-entered rates.
5. **Expense policies and limits** — the dollar thresholds and rules covered in lesson 4, such as maximum hotel rate per night or per diem caps.
6. **Audit rules and the audit list** — the automated checks covered in lesson 10 that flag reports (or employees) for mandatory review.
7. **Approval rules** — the BPM-based workflow routing covered in lesson 11, built on top of the supervisor hierarchy, cost center ownership, or project ownership.
8. **Corporate card program setup** — card issuer feed mapping and usage policies, covered in lesson 9.

## Why order matters

Each later step depends on something earlier in the list. You cannot define an expense policy limit on "Hotel" until the Hotel expense type exists. You cannot route approvals by cost center until the business unit and its cost center structure already exist from your enterprise structures setup. If you try to build audit rules before templates exist, there is nothing yet for the audit rule to evaluate. Experienced consultants build Expenses setup top-down through this list and resist the temptation to jump ahead to the "interesting" parts like audit rules before the foundation is in place.

## A quick worked example

Suppose Castellan Field Services needs to add a new expense type, "Safety Equipment Rental," for technicians who occasionally rent specialized gear on a job site. The sequence a consultant follows is:

1. Confirm the Field Services business unit already has system options configured (it does — set up when the business unit went live).
2. Add "Safety Equipment Rental" as an expense type under the existing "Field Supplies" category on the Field Services expense report template.
3. Set a policy limit, say $500 per rental without a manager's written pre-approval attached as a justification.
4. Decide whether this new expense type should be subject to a 100% audit (since it is unusual and easy to abuse) — more on audit list design in lesson 10.
5. Confirm it posts to the correct natural account, likely a "Field Equipment Expense" GL account rather than a generic travel account.

Nothing about this is exotic — it is the same pattern every new expense type setup follows.

## Recap

Expenses setup is a dependency chain: system options, then templates and types, then conversion rates, then policies, then audit rules, then approval rules, then corporate card programs. Everything is scoped per business unit because different parts of a company legitimately need different rules. Next up, lesson 3: a close look at expense templates and expense types, the two objects everything else in this chain depends on.
