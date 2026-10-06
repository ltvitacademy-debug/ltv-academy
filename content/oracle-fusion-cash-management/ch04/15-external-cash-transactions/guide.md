# External Cash Transactions

Not every line on a bank statement has a pre-existing counterpart in Payables, Receivables, or Payroll. Bank fees, interest earned, and miscellaneous bank-initiated charges all show up on the statement with nothing in Oracle waiting to match them. This lesson covers the object that fills that gap: the external transaction.

## What you'll learn

- What an external cash transaction is, and when it's used
- How external transactions get created
- What's required for an external transaction to be accounted
- The relationship between external transactions and bank account transfers (previewed ahead of Lesson 16)

## What an external transaction is

An **external cash transaction** represents "cash activity that was not recorded within the application" — activity the bank initiated or reported that never passed through a subledger first. Common examples: a monthly account maintenance fee, interest earned on a balance, a wire transfer fee deducted at the time of a wire, or a miscellaneous adjustment the bank applied. None of these originate as a Payables invoice or a Receivables transaction; the bank statement is the *first* place they appear in writing.

## How they get created

External transactions are most often created directly from a bank statement line during reconciliation — exactly the scenario from Lesson 11, where a Cash Manager encounters a line with no system counterpart and creates the transaction on the spot rather than leaving it stuck. They can also be created manually, independent of reconciling a specific statement, if a Cash Manager already knows about an upcoming or recurring charge.

Every external transaction needs, at minimum, an amount, a transaction date, a bank account, and a GL cash account (or, in some cases, an expense/income account for things like bank fees or interest) so the Create Accounting process has somewhere to post it.

## The accounting requirement: reconciled first

External transactions follow the same rule as other Cash Management transactions: they must be **reconciled** against the bank statement before they can be accounted. This makes sense on reflection — an external transaction created *from* a statement line is, by definition, immediately reconciled to that same line at creation. The accounting itself then happens through the Create Accounting process (covered fully in Lesson 19), which sends the transaction to Subledger Accounting to generate the journal entry.

## A preview: bank transfers are built from external transactions

Lesson 16 will cover bank account transfers in depth, but it's worth knowing now that a bank transfer isn't a separate kind of object underneath the hood — a transfer between two bank accounts actually creates **two** external transactions: an outflow at the "from" account and an inflow at the "to" account. Everything covered in this lesson about reconciliation and accounting requirements applies to those two transactions as well.

## A worked example

First Continental Bank deducts a $35.00 monthly maintenance fee from Harborview Metals Inc.'s operating account. The fee appears on the statement with no system counterpart. During reconciliation, the Cash Manager creates a $35.00 external transaction, dated to match the statement, posting to a Bank Fees expense account — reconciled immediately against that same statement line, and ready for Create Accounting to pick up.

## Key terms

| Term | Meaning |
|---|---|
| External cash transaction | A Cash Management transaction for activity never recorded in another subledger |
| Reconciled-before-accounted rule | External transactions must be reconciled before Create Accounting can process them |

## Recap

External transactions capture bank-initiated activity — fees, interest, adjustments — that has no other home in Oracle, usually created directly from a statement line during reconciliation, and always reconciled before being accounted. Next up, lesson 16: bank account transfers, which are built from exactly this object.
