# Customer Profiles and Credit Limits

Every mention of "profile class" so far has been a promise to come back to it. This lesson delivers: what a customer profile actually controls, how credit limits work, and what happens when a transaction would push a customer over their limit.

## What you'll learn

- What a profile class is and why it saves setup effort
- The specific attributes a profile controls, including credit limit
- How credit limit checking behaves when a new transaction would exceed it
- Where profile values can be overridden per customer

## Profile classes: setup once, apply many times

A **customer profile class** is a template of default values that gets assigned to many customer accounts at once, so nobody has to configure the same ten settings on every new customer by hand. A company might define a "Standard Wholesale" profile class and a "High-Risk / COD" profile class, each with different defaults, and assign the right one when creating each account.

## What a profile controls

- **Credit limit** – the maximum total open balance (sometimes combined with an order-hold limit used upstream in Order Management) the customer is allowed to carry.
- **Payment terms default** – the term applied unless a transaction overrides it.
- **Statement cycle** – whether and how often this customer gets a printed/emailed statement.
- **Dunning / collections** – whether the customer is included in dunning letter runs and which dunning plan applies.
- **Tolerance** – how much of a small discrepancy (a slightly underpaid invoice, for example) is automatically written off versus flagged for review.
- **Automatic receipt and match rules**, for customers set up on automatic payment processing.

Any individual customer account can override specific values from its assigned profile class — the profile is a starting point, not a permanent constraint.

## Credit limit checking in practice

When a new transaction would cause a customer's total open balance (existing open invoices plus the new one) to exceed their credit limit, Receivables can be configured to flag the transaction for a credit hold rather than block entry outright — the transaction can still be entered and saved, but it's prevented from shipping further orders or, depending on configuration, from completing, until someone with the right authority reviews and releases the hold. This keeps credit control a deliberate decision rather than a silent stoppage.

## A worked example

Harborline Retail Group (from earlier lessons) is assigned the "Standard Wholesale" profile class, which sets a $50,000 credit limit and Net 30 terms. Harborline currently has $42,000 in open invoices. A new order would create an $11,000 invoice, which would push its open balance to $53,000 — over the limit. The transaction is flagged on credit hold; Northwind's credit analyst reviews Harborline's payment history, sees it's always paid on time, and manually releases the hold so the invoice can complete. No system setting was changed — this was a one-time, documented exception.

## Recap

A profile class bundles default credit, terms, statement, and dunning behavior so it can be assigned to many accounts at once, and any value can still be overridden per account. Credit limits compare a customer's total open balance against a ceiling, and exceeding it typically creates a hold for review rather than a hard block. Next up, lesson 10: customer bank accounts.
