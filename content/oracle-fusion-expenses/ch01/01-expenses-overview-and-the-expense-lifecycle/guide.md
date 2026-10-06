# Expenses Overview and the Expense Lifecycle

Welcome to Oracle Fusion Expenses, the seventh course in the Oracle Fusion Financials Consultant path. You have already configured General Ledger, Accounts Payable, Accounts Receivable, Cash Management, and Fixed Assets. Expenses is smaller than those modules in scope, but it is the one almost every employee in a company touches directly — anyone who travels, buys a meal on the company's behalf, or carries a corporate card eventually submits an expense report. This lesson lays out what the Expenses module does and the lifecycle every expense report follows, before we touch any setup screens.

## What you'll learn

- What problem Oracle Fusion Expenses solves for a company
- The six stages every expense report moves through
- How Expenses fits alongside Payables, General Ledger, and Subledger Accounting
- The vocabulary you will see on every screen in this course

## The problem: employees spend the company's money

Employees routinely spend their own cash or a company-issued card on business travel, client meals, office supplies, and conference fees. Someone has to collect that spending, check it against policy, get it approved, pay the employee back (or pay the card issuer), and post the right accounting entries to the General Ledger. Doing this with spreadsheets and paper receipts does not scale past a handful of employees, and it gives a company almost no ability to enforce policy or catch errors before money goes out the door.

Oracle Fusion Expenses is the module that automates this entire chain for one fictional example company we'll use throughout this course, **Castellan Supply Co.**, a mid-sized industrial distributor with about 1,400 employees, roughly 300 of whom travel regularly.

## The expense lifecycle

Every expense report, regardless of what is on it, moves through the same six stages:

1. **Incur** — an employee spends money: a hotel stay, a client dinner, a tank of gas in a rental car.
2. **Capture** — the employee records the expense in Expenses, either by entering it manually, importing a corporate card transaction, or letting a receipt-imaging service create a draft expense item.
3. **Submit** — the employee assembles expense items into an expense report and submits it.
4. **Audit and approve** — the system runs audit rules automatically, and a human approver (usually the employee's manager) reviews and approves or rejects the report.
5. **Account** — once approved, Expenses creates the accounting distributions that will post to the General Ledger through Subledger Accounting.
6. **Reimburse** — Expenses hands off to Payables, which pays the employee (for cash expenses) or the card issuer (for corporate card charges) through the normal Payables payment process.

Notice that Expenses does not pay anyone directly. It is a feeder system: it captures, polices, and accounts for spending, and then it hands the actual payment instruction to Payables — the same way a Payables invoice eventually becomes a payment.

## Where Expenses sits among the other modules

Expenses relies on setup you already built in earlier courses:

- **Enterprise structures** (business units, legal entities) determine which expense policies and templates apply to which employees.
- **Chart of Accounts and General Ledger** receive the final accounting entries, through Subledger Accounting rules, exactly like Payables and Receivables transactions do.
- **Payables** performs the actual reimbursement payment and is where an expense report becomes, functionally, an invoice.
- **Fixed Assets** does not interact with Expenses directly, but both modules feed the same General Ledger, so a consultant closing the books needs to understand both.

## Who uses this module day to day

- **Employees** enter and submit their own expense reports, usually from a phone app or browser.
- **Approvers**, typically the employee's manager, review and approve reports in their worklist.
- **Expense auditors** review reports that audit rules flag for manual review.
- **Accounts Payable staff** monitor the handoff from Expenses into the Payables invoice queue.
- **Fusion consultants** (your future role) configure templates, policies, audit rules, and approval routing so the first four groups rarely need to think about any of it.

## Recap

Oracle Fusion Expenses automates the full cycle of employee spending: incur, capture, submit, audit and approve, account, and reimburse. It is not a standalone payment system — it is a feeder to Payables and, ultimately, the General Ledger. Next up, lesson 2: an overview of everything a consultant configures before a single employee can submit a report.
