# Following the Transaction into General Ledger

Every accounting entry so far in this course — the receipt accrual in lesson 18, the invoice accounting in lesson 20 — has been sitting inside subledgers. This lesson follows them the rest of the way into the General Ledger, where they finally become part of LTV Manufacturing Corporation's financial statements.

## What you'll learn

- Why subledger accounting is a separate step from GL posting
- The two journals this transaction actually produces
- How to drill back down from a GL journal to its source transaction
- Where this transaction ends up on LTV's financial statements

## Subledgers, Subledger Accounting, and the GL

Receiving and Payables are both **subledgers**: detailed, transaction-level ledgers that track activity specific to their domain. Neither subledger posts directly to the General Ledger on its own. Instead, **Subledger Accounting (SLA)**, the engine you studied in the Subledger Accounting course elsewhere in this path, takes each subledger's accounting event, applies the accounting rules configured for it, and creates the journal entries that are then transferred to the General Ledger. This separation exists so that GL always receives properly formed, balanced journals, regardless of which operational subledger generated the underlying event.

## The two journals this transaction produces

Tracing LTV's bearing purchase end to end, two distinct journals reach the General Ledger:

1. **The receipt accrual journal**, originating in Receipt Accounting when Priya's receipt was accepted (lesson 18): debiting the maintenance expense account and crediting the uninvoiced receipts accrual account.
2. **The invoice accounting journal**, originating in Payables when Chen's invoice was validated and accounted (lesson 20): debiting the uninvoiced receipts accrual account (clearing it) and crediting accounts payable liability.

A later third event — the actual cash payment — produces a third journal debiting accounts payable liability and crediting cash, once the Payment Process Request actually disburses funds, completing the cycle.

## Drilling from GL back to the source

One of the most useful things a consultant can do is **drill down**: starting from a journal line sitting in the General Ledger, trace it backward through Subledger Accounting to the specific subledger transaction that created it — in this case, back to Chen's specific invoice, or Priya's specific receipt, each ultimately referencing Marcus's purchase order and Dana's original requisition. This drill-down capability is exactly why this course has spent so much time tracking a handful of document numbers: a GL journal by itself tells you an amount and an account, but drilling down tells you the full story of why that amount landed on that account.

## Where this lands on LTV's financial statements

The maintenance expense account from the receipt journal ultimately rolls up into LTV's income statement, inside the cost structure for its manufacturing plant. The accounts payable liability from the invoice accounting rolls up into LTV's balance sheet as a current liability, until the payment journal reduces both the liability and cash. None of this is unique to procurement — it is the exact same General Ledger structure and the exact same financial statements you studied in earlier courses in this path — but now you have watched a specific transaction travel the whole distance from Dana's request to the balance sheet and income statement.

## Recap

Subledger Accounting translates each subledger's events — the receipt accrual and the invoice accounting — into balanced journals in the General Ledger, with a final payment journal completing the cycle. Drilling down from a GL journal traces it back to its source document. This transaction's accounting ultimately lands on LTV's income statement (expense) and balance sheet (liability, then cash). Next up, lesson 22: reconciling this entire procure-to-pay cycle end to end.
