# Cash Management Overview and Work Areas

Welcome to Oracle Fusion Cash Management, the first course in the Financial Operations stage of the Oracle Fusion Financials Consultant path. You already understand General Ledger, Payables, and Receivables from earlier courses. Cash Management is the module that sits underneath all three: it is where a company proves, bank account by bank account, that what its books say happened actually happened at the bank. This lesson introduces the module's purpose and the work areas you'll use throughout the course.

## What you'll learn

- What Cash Management is responsible for, and what it is not
- The three work areas you'll use: Cash Management and Banking, Cash Positioning, and Cash Forecasting
- The Bank Account Model that underlies everything else in this course
- The Cash Manager job role and where setup tasks live

## What Cash Management actually does

Payables pays suppliers. Receivables records what customers owe and collects it. Both of those subledgers eventually touch real money moving through a real bank account. Cash Management is the module that reconciles the system's version of events (the payments and receipts recorded in Oracle) against the bank's version of events (the bank statement). It also gives treasury staff a day-to-day view of how much cash sits in which account, and a longer-range forecast of what's coming in and going out.

Three things fall inside Cash Management's job: holding the record of every bank account the business uses, reconciling bank statements against system transactions, and positioning/forecasting cash. It is explicitly *not* responsible for initiating payments (that's Payables) or recording what a customer owes (that's Receivables) — it consumes those transactions, it doesn't create the business events behind them.

## The three work areas

- **Cash Management and Banking** — the home base for bank statement loading, reconciliation, and bank/branch/account setup and maintenance.
- **Cash Positioning** — a short-term, account-by-account view of current and projected balances, used to decide whether to invest surplus cash or cover a shortfall.
- **Cash Forecasting** — a longer-range projection of cash inflows and outflows, built from historical trends and from open transactions that haven't settled yet.

You'll spend Chapters 1–3 almost entirely in Cash Management and Banking, then move into Cash Positioning and Cash Forecasting in Chapter 4.

## The Bank Account Model

Every bank account a company uses is modeled in a strict three-level hierarchy:

| Level | What it represents |
|---|---|
| **Bank** | The financial institution itself (e.g., the bank's name and country) |
| **Bank Branch** | A specific branch of that bank, identified by a routing number or equivalent |
| **Bank Account** | An actual account number at that branch, owned by one or more of the company's legal entities |

This model exists so a company can "define and keep track of all bank accounts in one place" and explicitly grant access to specific business units, functions, and users — you'll go deeper on that access model in Lesson 3. For now, remember the shape: one bank can have many branches, and one branch can have many accounts.

## Who sets this up

Setup tasks for banks, branches, and accounts live in the Setup and Maintenance work area, under the **Set Up Bank, Branches, and Accounts** task list. To perform that setup, a user needs the **Cash Management Administration** duty role, typically carried by the **Cash Manager** job role. Keep that role name in mind — you'll see it again when we cover security in Lesson 3.

## Key terms

| Term | Meaning |
|---|---|
| Bank Account Model | The Bank → Branch → Account hierarchy Oracle uses to store every account |
| Cash Management and Banking | The work area for statement loading, reconciliation, and bank setup |
| Cash Positioning | Short-term, account-level view of current/projected balances |
| Cash Forecasting | Longer-range projection of cash inflows and outflows |
| Cash Manager | The job role that typically carries Cash Management Administration access |

## Recap

Cash Management proves the books match the bank: it holds the bank account hierarchy, reconciles statements against system transactions, and gives treasury a short-term position and a longer-range forecast. Everything in this course builds on the Bank → Branch → Account model. Next up, lesson 2: setting up banks, bank branches, and bank accounts.
