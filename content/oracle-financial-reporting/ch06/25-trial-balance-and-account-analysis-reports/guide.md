# Trial Balance and Account Analysis Reports

The Income Statement and Balance Sheet are the polished, external-facing output. Behind them sit two detail-level reports that a consultant uses constantly during close to verify those statements are actually correct before anyone outside the accounting team sees them: the Trial Balance and Account Analysis.

## What you'll learn

- What a Trial Balance is and the specific check it performs
- Reading a Trial Balance: debit and credit columns, by account
- What an Account Analysis report adds beyond the Trial Balance
- When each report is the right one to pull during close

## The Trial Balance: does everything actually balance?

A **Trial Balance** lists every account in the chart of accounts (or every account with a non-zero balance, depending on how it's run) along with its debit or credit balance for the period, with a total debit column and a total credit column at the bottom. The entire point of the report is the check at the bottom: **total debits must equal total credits**. If they don't, something in the underlying journals is wrong — an out-of-balance journal somehow got posted, or a technical issue in how balances were summarized — and that has to be resolved before the Income Statement or Balance Sheet built from those same balances can be trusted.

This is the GL's fundamental self-check, directly tied to the double-entry bookkeeping principle from Accounting Fundamentals: every transaction posts equal debits and credits, so every account's balances summed across a ledger should also balance.

## Reading a Trial Balance

A typical Trial Balance, built in Financial Reporting Studio or pulled as a BI Publisher report, shows:

- **Account** (and often account description) as rows.
- **Beginning balance**, **period activity** (debits and credits), and **ending balance** as columns, for the period in question.
- A **grand total row** at the bottom confirming total debits equal total credits across the whole ledger.

Because it lists every account rather than summarizing into statement-level totals like "Total Revenue," a Trial Balance is a working document for the accounting team, not something handed to an external reader the way an Income Statement is.

## Account Analysis: one account, full detail

Where a Trial Balance shows every account's balance side by side, an **Account Analysis** report (sometimes "Account Inquiry" in some contexts) goes the other direction: it takes a single account (or a small set) and shows every transaction or journal line that moved its balance during the period — the detail a Trial Balance deliberately leaves out. This is the report you pull when the Trial Balance shows an account balance that looks wrong and you need to see exactly what posted to it, in order, to figure out why.

## When to pull which report

| Question | Report |
|---|---|
| "Does everything balance overall, for every account, this period?" | Trial Balance |
| "Why does this one specific account have this balance?" | Account Analysis |
| "What's the final, polished summary for someone outside accounting?" | Income Statement / Balance Sheet |

In practice, these three get used in sequence during a close: Trial Balance confirms things balance overall, Account Analysis investigates anything that looks off, and the formal statements get published once both checks are clean.

## Recap

The Trial Balance confirms total debits equal total credits across every account in the ledger — the GL's fundamental self-check; Account Analysis drills into a single account's full transaction detail when something needs investigating. Next up, lesson 26: Payables reports — aging and payments.
