# Merging and Maintaining Customers

Customer data doesn't stay clean by itself. Sales reps create a new party instead of searching first, companies rename or restructure, and duplicate records creep in. This lesson, closing out Chapter 2, covers how to fix that without losing transaction history.

## What you'll learn

- Why duplicate customer records happen even with a shared party registry
- What a customer merge actually does to existing transactions and receipts
- Routine maintenance tasks beyond merging

## How duplicates happen

Even though the Trading Community Model is a shared registry across applications, duplicates still occur: a sales rep in a hurry types a slightly different company name instead of searching first; a customer is entered independently by two different business units before anyone notices; a company changes its legal name and a new party gets created instead of renaming the old one. Left alone, duplicates split a customer's transaction history across two records, which quietly breaks aging, statements, and credit limit checks — the system sees two separate customers with two separate (and each individually understated) open balances, instead of one customer with the true total.

## What a merge does

A customer merge takes a **duplicate** account (or party) and consolidates it into a **surviving** account (or party) that you designate. Running the merge:

- Moves open and historical transactions from the duplicate to the surviving account, so aging and statements reflect the true combined balance going forward.
- Moves receipts and their applications along with the transactions they were applied to, preserving the application history.
- Inactivates the duplicate account (or party) rather than deleting it, so the old record remains in the system for audit trail purposes — it just can no longer be transacted against.

Merges are typically reviewed carefully before running, since they're not something you'd want to casually reverse. Oracle Fusion generally expects a deliberate merge request rather than an instant, no-confirmation action, precisely because the transaction history impact is real.

## Other routine maintenance

Beyond merging, ordinary maintenance includes:

- **Inactivating** an account or site that's no longer used (a closed location, a customer who stopped buying) without merging it into anything — it simply becomes unavailable for new transactions while its history remains intact.
- **Updating profile class, credit limit, or payment terms** as a relationship changes — a customer growing from occasional buyer to a high-volume account might move from a conservative profile class to a standard one.
- **Correcting addresses and contacts** as customers move offices or staff turns over, which is why keeping contacts current matters for dunning and statement delivery discussed in earlier lessons.

## A worked example

Two different Northwind Fixtures Co. business units each independently entered the same customer, "Cascade Outdoor Supply," months apart — one spelled it "Cascade Outdoor Supply Inc." The AR team identifies both as the same real-world company, designates the original (with more transaction history) as the surviving account, and merges the duplicate into it. All of the duplicate's open invoices now appear under the surviving account's aging and statements, and the duplicate record is marked inactive rather than deleted, preserving a clean audit trail of what happened and why.

## Recap

Duplicates happen even in a shared registry, usually from skipped searches or independent entry across business units. A merge consolidates a duplicate's transactions and receipts into a surviving account and inactivates the duplicate rather than deleting it. Routine maintenance beyond merging includes inactivating unused records and keeping profile, credit, and contact data current. This closes Chapter 2. Chapter 3 moves to Transaction Setup, starting with transaction types.
