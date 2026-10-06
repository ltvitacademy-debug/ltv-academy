# Bank Account Transfers

Lesson 15 previewed it: a bank account transfer isn't a special object of its own — it's two external transactions wired together. This lesson covers why companies transfer funds between accounts at all, how the mechanics work, and what currency differences add to the picture.

## What you'll learn

- Why a company moves money between its own bank accounts
- The two-transaction mechanics of a transfer
- How intercompany and intracompany transfers differ
- What happens when a transfer crosses currencies

## Why transfer funds between accounts at all

Companies commonly centralize cash into one main concentration account and sweep smaller operating or collection accounts up into it, or the reverse: fund a disbursement account from a central account right before a large payment run. The point is usually either consolidating idle cash so it can be invested in one place, or making sure a specific account has enough balance to cover upcoming outflows — exactly the kind of decision Lesson 17's Cash Positioning view is built to support.

## The two-transaction mechanics

A bank account transfer creates **two external transactions**: an outflow (treated like a payables-side transaction) at the **From** account, and an inflow (treated like a receivables-side transaction) at the **To** account. Both transactions carry the same transfer reference so they're clearly linked, and — as covered in Lesson 15 — each one must be reconciled against its own bank statement before it can be accounted. Practically, that means a transfer isn't "done" from an accounting standpoint the moment it's entered; it's done once both sides show up on their respective statements and get reconciled.

## Intercompany and intracompany transfers

A transfer can move funds **intracompany** — between two accounts owned by the same legal entity — or **intercompany** — between accounts owned by different legal entities within the same enterprise. An intercompany transfer typically needs the intercompany accounting relationships already configured in the ledger (a topic from the Subledger Accounting course), since the receiving legal entity's books and the sending legal entity's books both need a correct, balanced entry.

## Currency differences

If the From and To accounts are denominated in different currencies, the transfer isn't simply "move $X from here to there" — it's "move $X from here, converted to the To account's currency, arriving as some other amount there." Any resulting gain or loss from the exchange rate used is calculated by Subledger Accounting when the Create Accounting process runs, not by Cash Management itself; Cash Management just records the two transaction amounts, and accounting figures out the rest.

## A worked example

Harborview Metals Inc. sweeps $50,000.00 from its USD lockbox collection account into its USD main concentration account every Friday — a same-currency, intracompany transfer, straightforward to reconcile once both sides appear on Friday's or Monday's statements. Separately, its UK subsidiary (a different legal entity) occasionally needs an intercompany transfer from the US concentration account, converted from USD to GBP, with any FX gain or loss landing on the books through Subledger Accounting once Create Accounting runs.

## Key terms

| Term | Meaning |
|---|---|
| Bank account transfer | Two linked external transactions: an outflow and an inflow |
| Intracompany transfer | Between accounts owned by the same legal entity |
| Intercompany transfer | Between accounts owned by different legal entities |

## Recap

A bank transfer is two external transactions under the hood, each needing its own reconciliation before it's accounted, and can cross legal entities (intercompany) or currencies, with Subledger Accounting handling any resulting FX gain or loss. Next up, lesson 17: Cash Positioning, the view that often drives the decision to transfer in the first place.
