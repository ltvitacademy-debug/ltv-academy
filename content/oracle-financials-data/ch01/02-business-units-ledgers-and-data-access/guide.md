# Business Units, Ledgers and Data Access

Two concepts decide where a row of financial data lives, and who is allowed to see it: the **business unit** and the **ledger**. They sound similar, and new consultants frequently confuse them, but they answer two different questions. A business unit answers "which part of the operation did this transaction belong to?" A ledger answers "which set of accounting books does the resulting journal entry belong to?" This lesson separates the two cleanly, because almost every table you'll study for the rest of this course carries a column tied to one or the other.

## What you'll learn

- What a business unit is, and which column identifies it on transaction tables
- What a ledger is, and the "four Cs" that define one
- How one ledger can serve many business units, and vice versa
- How Oracle Fusion uses these two concepts to secure who can see what data

## Business units: the operational boundary

A **business unit (BU)** is the operational entity that a transaction is processed under — think of it as "which office, division, or operating company did this." When someone enters a supplier invoice in Payables or a customer transaction in Receivables, that row is stamped with a business unit. Nearly every multi-org transaction table carries a `BUSINESS_UNIT_ID` column (or, in some older-style multi-org tables, an `ORG_ID`) for exactly this reason.

Business units aren't just a label — they're also a security boundary. A user's role assignments determine which business units they can process transactions for. An AP clerk assigned only to the "US Operations" business unit cannot enter or even see invoices stamped with "UK Operations," regardless of what they're looking at in GL.

## Ledgers: the accounting boundary

A **ledger** is a different kind of boundary. It defines the actual set of accounting books a journal entry posts into, and every ledger is defined by four things often nicknamed the "four Cs":

- **Chart of accounts** — the structure of account segments used to classify every journal line
- **Calendar** — the accounting periods (monthly, for example) that transactions post into
- **Currency** — the functional currency balances are kept in
- **Convention** — essentially the accounting method/subledger accounting setup applied

Ledgers are represented in the data model by the `GL_LEDGERS` table. A company can have a **primary ledger** for its main books, plus optional **secondary ledgers** (a different accounting method or chart, kept in sync with the primary) and **reporting currency** ledgers (the same books, restated into another currency). On `GL_LEDGERS`, a secondary ledger points back to its primary through a `PRIMARY_LEDGER_ID` column.

## How the two relate

Business units and ledgers don't have to match up one-to-one:

- Multiple business units can all post their accounting into the **same** ledger (common when several divisions share one chart of accounts and one set of books).
- A single business unit is always assigned one primary ledger for its financial transactions, so that every invoice or transaction it processes knows exactly which books it accounts into.

This is why, when you're tracing data, you'll often see a transaction's `BUSINESS_UNIT_ID` used to determine operational ownership and context, while its downstream journal entry carries a `LEDGER_ID` to determine which set of books it landed in. They're related, but they're answering different questions, and a table can carry one, the other, or both.

## Data access is layered on top of both

Oracle Fusion's security model uses business units to secure subledger transactions (can this user process AP invoices for this BU?) and a separate mechanism called a **data access set** to secure which ledgers and ledger/BU combinations a user can view or act on inside General Ledger itself. A GL user might be granted a data access set that spans several ledgers for reporting, even though their transactional access in AP or AR is restricted to a single business unit. Keeping these two layers distinct in your head will save you real confusion the first time you try to explain why a user can run a report across three ledgers but can't enter an invoice outside their own business unit.

## Recap

A business unit is the operational boundary a transaction is processed under, carried on transaction tables as `BUSINESS_UNIT_ID`. A ledger is the accounting boundary a journal entry posts into, defined by chart of accounts, calendar, currency, and convention, and represented by `GL_LEDGERS`. The two relate but don't have to match one-to-one, and Oracle Fusion secures access to each separately. Next up, lesson 3: how to actually read Oracle's own table and view documentation, so you're not guessing at any of this from memory.
