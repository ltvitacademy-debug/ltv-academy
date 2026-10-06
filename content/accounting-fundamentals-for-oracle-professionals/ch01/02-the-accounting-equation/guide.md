# The Accounting Equation

Every accounting system ever built, from a handwritten ledger to Oracle Fusion General Ledger, rests on one unbreakable rule: the accounting equation. Once you understand it, debits and credits (coming in Chapter 2) stop feeling like arbitrary rules and start feeling like simple arithmetic.

## What you'll learn

- The accounting equation itself, and what each term means
- Why the equation always has to stay in balance
- How a single transaction affects two or more parts of the equation at once
- Why Oracle Fusion will not let you post an unbalanced journal

## The equation

$$\text{Assets} = \text{Liabilities} + \text{Equity}$$

In plain language:

- **Assets** are everything the business owns or controls that has value: cash, inventory, equipment, buildings, amounts customers owe it.
- **Liabilities** are everything the business owes to others: loans, unpaid bills, wages owed but not yet paid.
- **Equity** is what's left over for the owners after liabilities are subtracted from assets — it's the owners' residual claim on the business.

Rearranged, the equation says: *what the business owns equals what it owes to others, plus what belongs to its owners.* That has to be true at every single moment, for every business, no exceptions.

## Example: starting a company

Imagine a brand-new, entirely fictional consulting company, **Meridian Fusion Consulting**, started by its owner with $50,000 of her own cash.

- Assets: Cash $50,000
- Liabilities: $0
- Equity: $50,000

Assets ($50,000) = Liabilities ($0) + Equity ($50,000). Balanced.

Now Meridian Fusion Consulting borrows $20,000 from a bank to buy a server.

- Assets: Cash $50,000 + Server $20,000 = $70,000
- Liabilities: Loan payable $20,000
- Equity: $50,000

Assets ($70,000) = Liabilities ($20,000) + Equity ($50,000). Still balanced — the borrowed cash became an asset (the server), and the obligation to repay it became a liability. Nothing was created or destroyed; the equation simply absorbed the transaction on both sides.

## Every transaction touches the equation at least twice

This is the deepest idea in all of accounting, and it's the reason the next chapter exists at all: **every transaction must affect the equation in at least two places, and by equal amounts**, so that the equation never falls out of balance. Buy the server with a loan, and both an asset and a liability increase by $20,000. Pay an employee in cash, and cash (an asset) decreases while an expense (which reduces equity) increases. This "always two-sided" property is called **double-entry accounting**, and it is the reason every journal entry you will ever see — including every journal entry Oracle Fusion posts automatically from a subledger — has at least one debit and one credit of equal, offsetting value.

## Why this matters for Oracle Fusion

Oracle Fusion General Ledger will physically reject a journal entry where total debits don't equal total credits. That's not an arbitrary software restriction — it's the system enforcing the accounting equation itself. When you later see error messages about "unbalanced journals" while configuring or troubleshooting Oracle Fusion, you'll know exactly what rule is being protected.

## Recap

The accounting equation, Assets = Liabilities + Equity, must stay in balance at all times. Every transaction affects it in at least two places by equal amounts — this is double-entry accounting. Next up, lesson 3: businesses, entities, and the books, where we look at who actually keeps a set of books and why Oracle Fusion organizes everything around something called a "ledger."
