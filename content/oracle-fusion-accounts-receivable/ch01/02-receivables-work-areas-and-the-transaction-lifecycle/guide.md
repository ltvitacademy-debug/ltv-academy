# Receivables Work Areas and the Transaction Lifecycle

Now that you know where Receivables sits in Order-to-Cash, it's time to get oriented inside the application itself. Oracle Fusion organizes Receivables functionality into a handful of work areas, and every transaction you create moves through a predictable sequence of statuses from the moment it's entered to the moment it's fully paid.

## What you'll learn

- The main Receivables work areas and what each one is for
- The difference between a transaction's completion status and its payment status
- The full lifecycle a standard invoice moves through, start to finish
- Why understanding status matters before you touch setup or transactions

## The Receivables work areas

Oracle Fusion groups Receivables tasks into work areas, each built around one part of the job:

- **Billing** – where you create, review, and complete transactions: invoices, debit memos, credit memos, and transaction batches. This is the Transactions Workbench you'll live in during Chapter 4.
- **Receipts** – where you enter, apply, and reverse customer receipts, and run automatic receipt and lockbox processes. Covered in Chapter 5.
- **Customers** – where you create and maintain customer parties, accounts, sites, profiles, and credit limits. Covered in Chapter 2.
- **Collections** – where overdue balances are reviewed, strategies and dunning letters are applied, and promises to pay are tracked. Covered in Chapter 6.

Setup tasks for all of the above (transaction types, sources, activities, memo lines, system options) live in the Setup and Maintenance work area, organized under the Receivables functional area. We cover that setup in Chapters 1 and 3.

## Two different statuses on one transaction

Every Receivables transaction actually carries two independent pieces of status information, and mixing them up is one of the most common beginner mistakes:

- **Completion status** describes whether the transaction itself is finished being entered: **Incomplete** or **Complete**. An incomplete transaction has no accounting and does not post anywhere.
- **Balance / payment status** describes how much of a complete transaction's balance is still outstanding: **Open** (balance due), **Closed** (fully paid or credited), or partially applied along the way.

A transaction must be Complete before it can be included in accounting, printed, or paid against. A transaction can be Complete and still Open for a very long time if the customer hasn't paid yet.

## The lifecycle of a standard invoice

1. **Entry** – the invoice header and lines are entered, either manually or through AutoInvoice. While lines, amounts, and required fields are still being worked out, the transaction sits as **Incomplete**.
2. **Completion** – once all required information is present (customer, transaction type, at least one line, valid accounting), the transaction is completed. Completion locks down key fields and makes the transaction eligible for accounting.
3. **Accounting** – the Create Accounting process derives the journal entry (debit Accounts Receivable, credit Revenue, plus tax and freight lines) and, depending on options, posts it to General Ledger.
4. **Open / outstanding** – the invoice now shows as an open item on the customer's account, visible on statements and aging reports, and subject to dunning if it becomes overdue.
5. **Application** – when a receipt comes in, all or part of it is applied against the invoice, reducing its open balance.
6. **Closed** – once the applied amount equals the invoice total (or the remaining balance is written off or credited), the invoice balance reaches zero and its status becomes Closed.

A credit memo or debit memo follows the same shape, just with the sign or direction of the balance reversed or added to the customer's account.

## Recap

Receivables work is organized into Billing, Receipts, Customers, and Collections work areas, backed by a shared Setup area. Every transaction has a completion status (Incomplete/Complete) separate from its balance status (Open/Closed), and a standard invoice moves through entry, completion, accounting, open, application, and closed. Next up, lesson 3: a review of everything Receivables setup needs before a single transaction can be entered.
