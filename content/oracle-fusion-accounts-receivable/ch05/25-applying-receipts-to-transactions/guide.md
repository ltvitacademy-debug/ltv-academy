# Applying Receipts to Transactions

Lesson 23 introduced the basic idea of applying a standard receipt to a transaction, assuming the simplest case: one receipt, one invoice, exact amount. Real customer payments are rarely that clean. A customer pays two invoices with one check. A customer pays less than they owe. A customer pays more than they owe. This lesson covers how Oracle Fusion Receivables handles each of those situations.

## What you'll learn

- Applying a single receipt across multiple transactions
- Handling underpayments (short pays) and overpayments
- Applying at the line level versus the transaction level
- Unapplying and re-applying a receipt

## One receipt, many transactions

A receipt amount does not have to match a single invoice. If Meridian Office Supply sends one check for $7,800.00 covering three separate open invoices, the clerk applies the receipt against all three lines in the same Apply Receipts action, selecting each transaction and confirming the amount applied to each. Receivables tracks the applied amount per transaction, so partial history is preserved even though all three came from the same check.

## Underpayments: short pays

When a customer pays less than the full balance due — a short pay — Receivables lets the clerk apply the available amount toward the transaction, leaving the remaining balance open as normal. Depending on company policy and the receivables activity configured, a small residual difference can also be written off at the time of application (covered in more detail in Chapter 6) rather than left open indefinitely. For a significant underpayment with no explanation, standard practice is to leave the balance open and follow up with the customer — this is exactly the kind of item a collections agent will chase (also in Chapter 6).

## Overpayments

When a customer pays more than the balance due, Receivables gives a few options for the excess amount:

- Leave it **unapplied** on the receipt, to apply to a future invoice
- Apply it **on-account**, meaning it's associated with the customer but not tied to any specific transaction yet (the next lesson covers the distinction)
- Refund it back to the customer, if the overpayment was a genuine error

Fictional example: Meridian Office Supply owes $4,250.00 on an invoice but sends a check for $4,500.00. The clerk applies $4,250.00 to close the invoice and leaves $250.00 unapplied on the same receipt, to be used against Meridian's next order.

## Applying at the line level

For transactions with multiple lines — say an invoice with freight, tax, and several product lines — Receivables normally applies at the transaction level, reducing the overall balance due without caring which specific line the money "belongs" to. In some configurations, particularly where revenue recognition rules differ by line, you can apply at a more granular level, but the transaction-level balance is what drives whether the invoice shows as open, partially paid, or closed.

## Unapplying and reapplying

Mistakes happen — a receipt gets applied to the wrong invoice. Receivables lets you **unapply** a receipt from a transaction, which reverses the application and returns both the receipt and the transaction to their prior state (the transaction's balance due goes back up, and the receipt amount becomes available to apply elsewhere). You can then reapply it correctly. This is a normal, supported workflow step, not an exception-handling process — it happens often enough that every AR clerk needs to know it.

## Recap

A single receipt can apply against multiple transactions, and payments rarely match exactly. Underpayments leave a balance open (or get written off, in small cases); overpayments get left unapplied, put on-account, or refunded. Applications normally happen at the transaction level, and a mis-applied receipt can always be unapplied and reapplied. Next up, lesson 26: unapplied and on-account cash in more depth.
