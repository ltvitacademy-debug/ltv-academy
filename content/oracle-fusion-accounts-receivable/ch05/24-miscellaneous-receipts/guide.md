# Miscellaneous Receipts

Not every dollar that lands in the bank came from a customer paying an invoice. A company receives interest on its cash balances, a refund from an insurance provider, a rebate from a supplier, proceeds from selling old equipment. None of that has anything to do with a customer's open balance — there's no invoice to apply it against. Oracle Fusion Receivables handles this with a **miscellaneous receipt**, a separate receipt type built for money that needs to be recorded and distributed to the General Ledger, but never touches customer accounts receivable at all.

## What you'll learn

- How a miscellaneous receipt differs from a standard receipt
- The role of the Receivables Activity on a miscellaneous receipt
- How distributions are built — manually or using distribution sets
- Typical business examples of miscellaneous receipts

## No customer balance involved

A standard receipt always reduces a customer's open balance — that's the whole point of it. A miscellaneous receipt does the opposite: it records cash coming in and immediately distributes it to one or more General Ledger accounts, with no subledger balance affected. Receivables still requires you to enter a bank account, an amount, and a date, but there is no "apply to open transactions" step, because there's nothing in AR to apply it to.

## The Receivables Activity drives the accounting

Every miscellaneous receipt requires a **Receivables Activity** of type "Miscellaneous Cash." This activity record, configured back in Chapter 3, determines the default GL account(s) the credit side of the entry hits — interest income, equipment gain/loss, a rebate clearing account, whatever fits the business reason for the cash. The debit side is almost always the cash account tied to the remittance bank account, same as any receipt.

Fictional example: Larkspur Furnishings Inc. earns $312.47 in interest on its operating bank account for the month, per the bank statement. The treasury clerk enters a miscellaneous receipt, amount $312.47, Receivables Activity "Interest Income," and the system knows to debit Cash and credit the Interest Income GL account configured on that activity — no customer involved anywhere in the transaction.

## Distributions: one line or many

A simple miscellaneous receipt, like the interest income example, distributes 100% to a single GL account. But Receivables also supports multi-line distributions for more complex cash events — say a $5,000 insurance settlement that needs to be split 60% to an equipment loss account and 40% to a repairs expense account. You can either:

- Enter the distribution lines manually, specifying the GL account and percentage or amount for each line, or
- Apply a predefined **distribution set**, a reusable template of accounts and percentages set up in advance for a recurring type of miscellaneous receipt (useful when the same split happens month after month, like a recurring rebate).

Whichever method is used, the distribution lines must add up to 100% of the receipt amount before the receipt can be saved.

## Common business examples

- Interest earned on bank balances
- Insurance claim proceeds
- Proceeds from the sale of a fixed asset
- Rebates or refunds from a vendor that aren't tied to a specific AR transaction
- Tax refunds

## Recap

A miscellaneous receipt records cash that has nothing to do with a customer's open balance. Instead of applying to transactions, it distributes directly to GL accounts, driven by a Receivables Activity of type Miscellaneous Cash, either as a single line or a multi-line distribution using manual entry or a distribution set. Next up, lesson 25: applying receipts to transactions in more depth, including partial payments, overpayments, and multiple transactions in one receipt.
