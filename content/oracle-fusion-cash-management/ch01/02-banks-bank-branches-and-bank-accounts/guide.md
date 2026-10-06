# Banks, Bank Branches and Bank Accounts

Lesson 1 introduced the three-level hierarchy that every Oracle bank account lives inside: Bank, Bank Branch, and Bank Account. This lesson goes one level deeper — what each of those objects actually contains, how they're typically set up, and how a bank account connects back to the rest of Financials.

## What you'll learn

- The attributes that define a Bank, a Bank Branch, and a Bank Account
- How implementations typically load this data: spreadsheet upload versus manual entry
- How a bank account connects to legal entities, business units, and the General Ledger
- A worked example using a fictional company

## Bank: the institution

A **Bank** record is the simplest of the three — essentially the financial institution's name, its country, and a unique bank identifier (in the US, often tied to routing information at the branch level rather than the bank level). A single Bank record can be shared by many branches and, through them, by accounts belonging to completely unrelated companies implementing Oracle Fusion — the Bank object itself carries no company-specific data.

## Bank Branch: the routing-level detail

A **Bank Branch** belongs to exactly one Bank and carries the information needed to route money to it: branch name, address, and a routing/transit number (in the US, the ABA routing number; other countries use their own equivalents such as a sort code or IBAN bank code). A branch also records whether it supports specific payment methods, such as EFT or check clearing, which matters later when Payables and Receivables decide how a transaction can move.

## Bank Account: where the money actually sits

A **Bank Account** belongs to exactly one Bank Branch and is where the company-specific detail lives: the account number, currency, account type (checking, savings), and — critically — the legal entity (or entities) that own it. Each bank account is also linked to a **cash account** in the General Ledger: the GL account code combination that represents "cash in this bank account" on the balance sheet. Every transaction that reconciles against this bank account ultimately posts to that cash account.

## Worked example: Harborview Metals Inc.

Imagine a fictional manufacturer, **Harborview Metals Inc.**, implementing Oracle Fusion. It banks with a fictional institution, **First Continental Bank**. The setup looks like this:

| Level | Example value |
|---|---|
| Bank | First Continental Bank (US) |
| Bank Branch | First Continental Bank — Charlotte Main (routing 071000001, fictional) |
| Bank Account | Operating Account #4471-0012, USD, owned by Harborview Metals Inc. legal entity |

Once that account exists, it can be assigned a GL cash account such as `01-000-1110-0000-000` (Cash — Operating, fictional chart of accounts values) so that every reconciled transaction knows exactly where to land in the General Ledger.

## How this gets set up in practice

Two common approaches:

- **Spreadsheet upload** — for implementations with many accounts (multiple legal entities, multiple currencies, dozens of branches), consultants build the bank, branch, and account data in a spreadsheet using the ADFdi-enabled template, then upload it in bulk. This is the standard approach during an initial implementation.
- **Manual entry** — for a handful of accounts, or for an addition after go-live, a Cash Manager can create a single bank, branch, or account directly in the Setup and Maintenance work area.

Either way, the create order matters: a Bank must exist before its Branches, and a Branch must exist before its Accounts — you cannot create an account that points at a branch that hasn't been created yet.

## Key terms

| Term | Meaning |
|---|---|
| Bank | The financial institution; shared across branches and accounts |
| Bank Branch | A specific branch with routing information |
| Bank Account | The actual account; owned by a legal entity, tied to a GL cash account |
| Cash account | The GL account code combination representing this account's cash balance |

## Recap

A Bank is the institution, a Bank Branch adds routing detail, and a Bank Account adds the account number, currency, owning legal entity, and GL cash account. Implementations usually load this data through a spreadsheet upload, and the create order always runs top-down: Bank, then Branch, then Account. Next up, lesson 3: who can use a bank account, and how that access is secured.
