# Adjustments

Chapter 5 covered the clean case: a transaction has a balance, a receipt pays it, the balance goes to zero. But balances don't always resolve through cash. A customer might be owed a small goodwill credit that isn't worth a full credit memo. A rounding difference of a few cents might exist because of a currency conversion. Oracle Fusion Receivables has a dedicated tool for changing a transaction's balance without a receipt or a credit memo: the **adjustment**.

## What you'll learn

- What an adjustment is and how it differs from a credit memo or a write-off
- Positive versus negative adjustments
- The role of Receivables Activities in adjustment accounting
- Approval limits for adjustments

## What an adjustment actually changes

An adjustment changes the balance due on a specific transaction, up or down, without involving a receipt or a separate credit transaction type. It's a direct correction tool, typically for small discrepancies or policy-driven balance changes rather than a full reissue of a transaction. Because it directly touches the transaction's balance, it shows up immediately in aging and collections views, same as a receipt application would.

## Positive and negative adjustments

- A **negative adjustment** reduces the balance due — the far more common case. Examples: writing off a small rounding difference, granting a minor goodwill credit for a shipping delay, correcting a tax calculation error on a closed transaction.
- A **positive adjustment** increases the balance due — less common, but legitimate. Examples: correcting an invoice that was keyed for too low an amount, adding a late fee that policy calls for outside the normal invoicing flow.

Fictional example: Meridian Office Supply disputes a $6.20 freight charge on an otherwise correct invoice, and the company's policy allows the AR team to waive small freight disputes under $25 without a formal credit memo. The clerk enters a negative adjustment for $6.20, referencing the specific invoice, and the balance due drops by that amount immediately.

## The Receivables Activity behind every adjustment

Just like a miscellaneous receipt needs a Receivables Activity of type "Miscellaneous Cash," an adjustment needs a Receivables Activity of type "Adjustment." This activity determines the GL account that absorbs the adjustment — commonly something like a goodwill/discrepancy expense account — so the accounting entry is automatic and consistent every time, rather than requiring the clerk to pick a GL account manually on each adjustment.

## Approval limits

Adjustments are not a backdoor around internal controls — Receivables enforces **approval limits** per user, typically by currency, capping how large an adjustment a given person can create or approve without escalation. A clerk might be authorized for adjustments up to $500; anything larger routes to a supervisor or requires an additional approval step before it posts. This mirrors the approval-limit concept you'll see again in the next lesson, applied to write-offs.

## Adjustments versus credit memos

It's worth being explicit about why a company would use an adjustment instead of a credit memo for something like the freight dispute above: a credit memo is a full transaction in its own right, with its own number, its own place in transaction history, and usually implies a more formal dispute or return process. An adjustment is lighter weight — meant for small, policy-governed corrections where creating an entire new transaction would be overkill. Choosing which tool fits is a matter of company policy, documented back in Chapter 3's Receivables Activities setup.

## Recap

An adjustment changes a transaction's balance due directly, without a receipt or credit memo, driven by a Receivables Activity of type Adjustment and governed by per-user approval limits. Negative adjustments (reducing balance) are the common case; positive adjustments exist for less common corrections. Next up, lesson 31: write-offs and approval limits, where the balance isn't corrected — it's abandoned.
