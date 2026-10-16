# Normal Balances & Account Types Quick Reference

A one-page reference for the five account types this course builds on, pulled together from
Chapters 1 through 4. Keep this open while you record transactions until the normal-balance
table is automatic.

## The accounting equation (Lesson 2)

```
Assets = Liabilities + Equity
```

Every transaction keeps this equation in balance. Debits and credits are simply "left side" and
"right side" of that equation, applied through the normal-balance rule below.

## The normal-balance table

| Account Type | Normal Balance | Increases With | Decreases With | Appears On | Examples |
|---|---|---|---|---|---|
| **Asset** | Debit | Debit | Credit | Balance Sheet | Cash, Accounts Receivable, Supplies, Prepaid Insurance, Equipment |
| **Liability** | Credit | Credit | Debit | Balance Sheet | Accounts Payable, Notes Payable, Wages Payable, Unearned Revenue |
| **Equity** | Credit | Credit | Debit | Balance Sheet | Common Stock, Retained Earnings |
| **Revenue** | Credit | Credit | Debit | Income Statement | Service Revenue, Sales Revenue |
| **Expense** | Debit | Debit | Credit | Income Statement | Rent Expense, Utilities Expense, Wages Expense, Depreciation Expense, Insurance Expense |

A quick way to remember it: assets and expenses both carry a normal debit balance; liabilities,
equity, and revenue both carry a normal credit balance. If you ever get stuck, go back to the
accounting equation itself — liabilities and equity sit on the same side of the equals sign, so
they behave the same way.

## The four-step method for recording any transaction (Lesson 7)

1. **Identify the accounts involved.** What changed?
2. **Classify each account.** Asset, liability, equity, revenue, or expense?
3. **Determine the direction of change.** Did it increase or decrease?
4. **Apply the normal-balance rule.** Increases post to the normal-balance side; decreases post
   to the opposite side. Debits must equal credits in total.

Step 1 is the only step that takes real judgment — steps 2 through 4 are mechanical once you know
the table above.

## Contra accounts (an exception worth memorizing)

A **contra-asset** account carries the *opposite* normal balance of the account family it belongs
to, so it can reduce that account's reported value without erasing the original figure.

| Contra Account | Belongs To | Normal Balance |
|---|---|---|
| Accumulated Depreciation | Equipment / other fixed assets (Assets) | Credit |

## The two-question map for adjusting entries (Lesson 22)

|  | Cash hasn't moved yet | Cash already moved |
|---|---|---|
| **Revenue** | Accrued Revenue | Deferred (Unearned) Revenue |
| **Expense** | Accrued Expense | Deferred (Prepaid) Expense |

## Why this matters in Oracle Fusion

Oracle Fusion Financials already knows every seeded account's type and normal balance the moment
a chart of accounts segment is tagged with that account type — it will never post a debit where a
credit belongs. What it still depends on is a human (or a correctly configured subledger rule)
identifying *which* accounts a transaction touches in the first place. This reference is the exact
table Oracle Fusion is automating under the hood.
