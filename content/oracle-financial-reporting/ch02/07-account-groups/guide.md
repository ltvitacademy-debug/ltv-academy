# Account Groups

Not every reporting need justifies building a full formatted statement. Sometimes a controller just wants to keep an eye on a handful of accounts — cash, a specific liability, a watched expense line — without opening a whole Income Statement every time. Account Groups are Oracle Fusion's answer to that lighter-weight need, and they live in the Financial Reporting Center you toured in lesson 5.

## What you'll learn

- What an Account Group is and the specific problem it solves
- The Sunburst visualization used to display them
- Why Account Groups are scoped to General Ledger only
- How Account Groups differ from a full Financial Reporting Studio statement

## A curated watchlist of accounts

An Account Group is a user-defined set of specific accounts (and, typically, their current balances) that someone wants to monitor together, independent of any formal statement structure. Rather than building a report with rows and columns and formulas, a user selects the accounts they care about and groups them — closer to a personal watchlist than a formal financial statement.

Typical uses include:

- Watching cash and cash-equivalent accounts across several bank accounts at a glance.
- Monitoring a handful of expense accounts a manager has been asked to control closely this quarter.
- Tracking a specific liability or contra account during a period where its balance is under unusual scrutiny.

## The Sunburst visualization

When an account group is created, it becomes visible in the Financial Reporting Center with a distinctive radial visualization called **Sunburst**. Sunburst displays the grouped accounts as nested rings, sized by balance, so a user can see at a glance which accounts in the group are carrying the largest balances relative to the others — a quick visual read that a flat list of numbers doesn't give you as immediately.

This is a deliberately different presentation style from the row-and-column grids of Financial Reporting Studio statements. Account Groups are meant for fast visual monitoring, not for producing something you would hand to an auditor as a formal exhibit.

## Scoped to General Ledger

Account Groups are a General Ledger-only feature: they are built from GL accounts and balances, and they are not available as a monitoring mechanism for, say, open Payables invoices or Receivables transactions directly (those are better served by OTBI analyses, covered in Chapter 3). If a request is "let me watch GL account balances casually," Account Groups fit. If the request is "let me watch open AP invoices," that's a different tool.

## Account Groups versus a full statement

| | Account Group | Financial Reporting Studio statement |
|---|---|---|
| Structure | Flat list of chosen accounts | Formal rows, columns, formulas |
| Visualization | Sunburst (radial, size-by-balance) | Grid/table layout |
| Typical use | Casual, personal monitoring | Formal financial statement for distribution |
| Scope | General Ledger only | General Ledger balances cube |
| Effort to build | Pick accounts, done | Design rows, columns, headers, point of view |

Account Groups are quick to set up precisely because they skip the formal design work a statement requires. That's their strength and their limit at the same time.

## Recap

Account Groups give a user a quick, curated watchlist of General Ledger accounts, visualized with the Sunburst radial chart inside the Financial Reporting Center — a lighter-weight alternative to building a full statement when all you need is to keep an eye on a handful of balances. Next up, lesson 8: the basics of Financial Report Studio itself, for when you do need to build that full statement.
