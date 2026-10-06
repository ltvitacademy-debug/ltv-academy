# Reconciliation Rules and Matching Rules

Everything in Chapters 1 and 2 existed to get a bank account set up and a bank statement loaded. This lesson is where the real work of reconciliation begins: the rules that decide whether a statement line and a system transaction are "the same thing," and get matched and reconciled against each other.

## What you'll learn

- What a reconciliation rule set is, and what it's made of
- The components of a matching rule: source, match type, grouping, criteria
- The four match types, plus the special "zero amount" case
- How tolerance rules fit into a matching rule

## Reconciliation rule sets

A **reconciliation rule set** is the top-level object attached to a bank account. It's a named group of **matching rules** (and optionally tolerance rules) that together determine what automatic reconciliation is allowed to match, and how forgiving it's allowed to be about small differences. One rule set can be attached to multiple bank accounts that should behave the same way; different account types (a payroll account versus a general AP disbursement account) might reasonably use different rule sets.

## What a matching rule actually specifies

A matching rule is built from several pieces:

- **Transaction source(s)** — which kinds of system transactions this rule is even allowed to consider (for example, Payables disbursements, Receivables receipts, or external transactions).
- **Match type** — the shape of the match (see below).
- **Group-by attributes** — how to group bank statement lines or system transactions together before attempting a match, relevant for one-to-many or many-to-one matches.
- **Matching criteria** — the specific fields that must align, such as amount, date, and sometimes a reference number.

## The match types

| Match type | What it means |
|---|---|
| **One to One** | One statement line matches exactly one system transaction |
| **One to Many** | One statement line matches a group of several system transactions |
| **Many to One** | Several statement lines match a single system transaction |
| **Many to Many** | A group of statement lines matches a group of system transactions |
| **Zero Amount** | A special case for statement lines or transactions with a zero amount, matched without a monetary comparison |

A one-to-one rule is the simplest and most common case — for example, a single wire transfer on the statement matching a single Receivables receipt for the same amount. A one-to-many rule might match a single lump-sum deposit on the statement against several individual Receivables receipts that were physically deposited together.

## Tolerance rules inside a matching rule

A **tolerance rule** can be associated with a matching rule to allow a small variance — by percentage, by a flat amount, or both — between the statement line and the system transaction and still have it reconcile automatically. Tolerance only applies when the matching rule is a **one-to-one** match type; other match types don't support an associated tolerance. This is a meaningful limitation to remember: if a business needs tolerance on a many-to-many scenario, that tolerance has to be handled differently (often through manual reconciliation, covered in Lesson 11).

## A worked example

Harborview Metals Inc. sets up a one-to-one matching rule for its operating account: transaction source is Receivables Receipts, matching criteria is amount and value date, with a tolerance rule allowing a $0.02 variance to absorb occasional rounding differences from currency conversion. A separate one-to-many rule handles its lockbox account, where the bank often lumps several customer payments into a single deposit line.

## Key terms

| Term | Meaning |
|---|---|
| Reconciliation rule set | The named group of matching/tolerance rules attached to a bank account |
| Matching rule | Defines transaction source, match type, grouping, and matching criteria |
| Match type | One to One, One to Many, Many to One, Many to Many, or Zero Amount |
| Tolerance rule | An allowed variance, usable only with One to One match type rules |

## Recap

A reconciliation rule set, attached to a bank account, groups matching rules that define what can be matched and how. Matching rules specify a transaction source, a match type, grouping, and criteria, and a tolerance rule can soften a one-to-one match's exactness requirement. Next up, lesson 10: how automatic reconciliation actually runs these rules.
