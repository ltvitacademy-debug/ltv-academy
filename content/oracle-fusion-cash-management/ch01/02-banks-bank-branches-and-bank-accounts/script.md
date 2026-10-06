# Script — Banks, Bank Branches and Bank Accounts

## Segment 1 (title)

Lesson one introduced the three level hierarchy: bank, bank branch, and bank account. This lesson goes one level deeper into what each of those objects actually holds, and how they get set up.

## Segment 2 (steps)

A bank record is the simplest: the institution's name, country, and a unique identifier. One bank can be shared by many branches, and by accounts belonging to completely unrelated companies — the bank object itself carries no company-specific data. A bank branch belongs to exactly one bank and carries the routing detail: branch name, address, and a routing or transit number. A bank account belongs to exactly one branch and holds the account number, currency, account type, and the legal entity that owns it. Every account also links to a cash account in the general ledger.

## Segment 3 (code)

Picture a fictional manufacturer, Harborview Metals Inc, banking with a fictional institution, First Continental Bank. The bank is First Continental Bank. The branch is First Continental Bank, Charlotte Main. The account is Operating Account 4471-0012, in US dollars, owned by Harborview Metals Inc, linked to a cash account on the chart of accounts.

## Segment 4 (steps)

Two common ways to set this up. For a full implementation with many accounts, consultants build the data in a spreadsheet using an upload template and load it in bulk. For a single addition after go-live, a Cash Manager can create one bank, branch, or account directly in the setup work area. Either way, the create order runs top down: the bank first, then its branches, then the accounts under each branch.

## Segment 5 (outro)

Remember that order — bank, then branch, then account — and the fact that every account ultimately ties to a GL cash account. Up next, lesson three: who can actually use a bank account, and how that access gets secured.
