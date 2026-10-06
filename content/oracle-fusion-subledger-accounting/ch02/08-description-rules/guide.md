# Description Rules

Journal line rules decide which lines exist. Account rules decide which account each line posts to. This lesson covers the rule type responsible for something easy to overlook but critical for every auditor, controller, and consultant who has to read a journal entry later: the description on each line.

## What you'll learn

- What a description rule is and what problem it solves
- How a description rule assembles text from constants and sources
- Why a well-built description rule matters for audit and troubleshooting
- A worked example combining several sources into one readable description

## The problem: generic descriptions are useless

Without a thoughtfully configured description rule, a journal line might show nothing more informative than "Payables Invoice" over and over, for every invoice from every supplier. Multiply that across thousands of transactions a month, and anyone trying to read the General Ledger or an Account Analysis Report — a controller closing the books, an auditor sampling transactions, you troubleshooting a posting error — has to click into each individual journal line just to find out which supplier, which invoice number, or which transaction the line relates to.

A **description rule** solves this by building a dynamic, data-driven description for each journal line at the moment SLA creates it, instead of relying on one static, generic label.

## How description rules build text

A description rule works similarly to the other rule types: it assembles its final text from a combination of **constant text** (fixed words you want to always appear, like "Invoice" or a colon) and **sources** (the same kind of transaction data sources you learned about in lesson 4 — supplier name, invoice number, invoice date, and so on). You lay these pieces out in order, and SLA concatenates them together at the time it builds the journal line.

Because description rules draw from sources, the exact same rule produces a different, transaction-specific description for every single invoice, receipt, or asset event it runs against — no two lines look identical unless the underlying data is actually identical.

## A worked example

Suppose a Payables invoice journal line currently shows just "Invoice." A better description rule might combine: the constant text "Invoice", a source for the supplier name, a constant colon and space, and a source for the invoice number. The result on an actual transaction might read "Invoice: Acme Office Supply : INV-48213" — immediately useful to anyone scanning the Account Analysis Report, without needing to open the transaction.

Receivables might build a similarly useful description combining the customer name and the transaction number; Fixed Assets might combine the asset number and a short description of the depreciation event. Each subledger application's available sources determine what is possible, but the technique is identical everywhere.

## Why this matters for reconciliation and audit

In Chapter 5, you will study reconciling subledgers to the General Ledger and reading reports like the Account Analysis Report. Every one of those activities goes faster, and is less error-prone, when the journal line descriptions in front of you are specific and meaningful rather than generic. Well-built description rules are a small, one-time configuration investment that pays off every single period, for as long as the system is in use.

## Recap

A description rule builds a dynamic, transaction-specific description for a journal line by combining constant text and sources, instead of leaving every line with a generic, repeated label. This matters directly for the reconciliation and audit work covered later in this course. Next up, lesson 9: supporting references, which carry additional reference data on a journal line beyond the account and the description.
