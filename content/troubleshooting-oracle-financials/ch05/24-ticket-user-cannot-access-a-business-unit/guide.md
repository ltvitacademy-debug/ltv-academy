# Ticket: User Cannot Access a Business Unit

**Chapter 5 · Assets, Expenses and Setup Tickets · Lesson 4 of 5**

## What you'll learn

- The difference between a job role, a data role, and a security profile
- Why "can see the page but not the data" and "can't even see the page" point to different fixes
- How to read a role's data security policies to find exactly what's missing
- A resolution note for a new-hire access gap

## Function privilege vs. data access — not the same thing

A **job role** (and the privileges bundled into it) determines whether a user can see a page or function at all — the menu item, the button, the task. **Data access** — which specific business units, ledgers, or legal entities that function actually operates on — comes from **data roles** and the **security profiles** attached to them. A user can have full functional access to, say, Manage Invoices, and still see zero invoices if their data role's security profile doesn't include the business unit those invoices belong to. Those are two separate failure points, and they need two separate checks.

## The ticket

> **Ticket #40718 — BrightPath Facilities Group.** New AP clerk reports: "I can open Manage Invoices just fine, but when I search for anything in the Westfield Campus business unit, I get zero results. My manager says I should see them." Severity: Medium.

## Investigating

1. **Confirm this is a data issue, not a function issue.** The clerk can open Manage Invoices (the page loads, the search fields work) — so function privilege isn't the problem. The symptom is specifically "can see the page but not this BU's data."
2. **Check the clerk's assigned data role(s)** in Security Console. They have one data role assigned, correctly carrying AP transaction privileges — but its **security profile** only includes the "Riverside Campus" business unit.
3. **Compare against the manager's expectation.** The clerk was hired specifically to support Westfield Campus, but whoever provisioned their account during onboarding copied a template from a Riverside-based role and never updated the business unit scope.

## Root cause

The clerk's data role has correctly configured functional privileges but a security profile scoped only to Riverside Campus, not Westfield Campus, because the account was provisioned from a template built for a different business unit and the scope was never corrected for this specific hire.

## Resolving it

Assign a data role (or correct the security profile on the existing one) that includes Westfield Campus, matching the business unit the clerk was actually hired to support. Confirm with the manager which other business units, if any, this role should include — don't just add every BU to make the symptom disappear; scope it to what the role actually needs.

## Documenting it

> **Ticket #40718 — BrightPath Facilities Group.** New AP clerk could open Manage Invoices but saw zero results for the Westfield Campus business unit.
> **Root cause:** The clerk's data role had correct functional privileges but a security profile scoped only to Riverside Campus; the account was provisioned from a template for a different business unit and never corrected.
> **Fix:** Updated the data role's security profile (confirmed with the manager) to include Westfield Campus.
> **Verified:** Clerk now returns search results for Westfield Campus invoices in Manage Invoices.
> **Note:** Recommend onboarding checklist explicitly confirm business unit scope on any role copied from a template, rather than assuming the template matches the new hire's actual assignment.

## Key terms

| Term | Meaning |
|---|---|
| Job role / function privilege | Determines whether a user can access a page or function at all |
| Data role | Combines a job role with a specific data security grant |
| Security profile | Defines the actual scope (business unit, ledger, legal entity, etc.) a data role grants access to |

## Check yourself

Why did confirming the clerk could open Manage Invoices at all matter to narrowing down this ticket so quickly?
