# Receivables Transactions and Receipts

The last two lessons covered the Payables side: invoices, lines, distributions, payments. Receivables mirrors that structure closely, but with its own table names and its own vocabulary — "receipts" instead of "payments," and "applications" that work slightly differently because Receivables has to handle more transaction types than Payables does.

## What you'll learn

- The table that stores Receivables transaction headers, and the transaction types it covers
- How transaction lines differ by type (line, tax, freight)
- Where the authoritative "amount still owed" figure lives
- How a customer's receipt is recorded, and how it's applied to a transaction

## Transaction headers: RA_CUSTOMER_TRX_ALL

`RA_CUSTOMER_TRX_ALL` is the header table for Receivables transactions, keyed by `CUSTOMER_TRX_ID`. Unlike Payables, which only deals with supplier invoices, this one table covers several transaction types at once: invoices, debit memos, credit memos, commitments, and bills receivable. A type/class column on the header distinguishes which kind of transaction a given row represents. The header also carries references to the customer account and the bill-to/ship-to sites from Chapter 2's `HZ_CUST_ACCT_SITES_ALL` and `HZ_CUST_SITE_USES_ALL`.

## Transaction lines: RA_CUSTOMER_TRX_LINES_ALL

`RA_CUSTOMER_TRX_LINES_ALL` stores the line-level detail for all of those transaction types, distinguished by a `LINE_TYPE` column: `LINE` for the actual goods or services billed, `TAX` for tax lines, and `FREIGHT` for shipping charges, among others. This is a meaningful difference from Payables lines, which don't carry this kind of type distinction — Receivables needs it because a single customer transaction legitimately mixes several different kinds of amounts that need to be reported and, eventually, accounted for differently.

## The authoritative balance: AR_PAYMENT_SCHEDULES_ALL

Here's where Receivables works differently from Payables in a way worth remembering. In Payables, you'd sum `AP_INVOICE_PAYMENTS_ALL` to figure out how much has been paid. In Receivables, the table most commonly relied on for open balances is `AR_PAYMENT_SCHEDULES_ALL`, which Oracle updates whenever activity occurs against a transaction — a credit memo, a chargeback, a receipt, an adjustment. It carries the remaining amount owed directly, rather than requiring you to sum every applied receipt yourself every time. This table joins back to `RA_CUSTOMER_TRX_ALL` through `CUSTOMER_TRX_ID`, and it's the table behind most AR aging reports.

## Receipts: AR_CASH_RECEIPTS_ALL

When a customer actually pays, that's a **receipt**, recorded in `AR_CASH_RECEIPTS_ALL`, keyed by `CASH_RECEIPT_ID`. A receipt on its own just represents money that came in; it doesn't yet say which transaction(s) it settles.

## Applying a receipt: AR_RECEIVABLE_APPLICATIONS_ALL

The actual matching of a receipt (or a credit memo) to one or more transactions happens in `AR_RECEIVABLE_APPLICATIONS_ALL`. Each row records an applied amount and a status — common values include **APP** (applied), **UNAPP** (unapplied, meaning the cash came in but hasn't been matched to a transaction yet), **ACC** (on-account), and **UNID** (unidentified, meaning Oracle doesn't even know which customer the money belongs to yet). This mirrors the many-to-many pattern from Payables: a receipt can apply across multiple transactions, and a transaction can be settled across multiple receipts or credit memos.

## Recap

`RA_CUSTOMER_TRX_ALL` and `RA_CUSTOMER_TRX_LINES_ALL` store Receivables transaction headers and lines, covering invoices, credit memos, and more in one structure. `AR_PAYMENT_SCHEDULES_ALL` carries the authoritative open balance. `AR_CASH_RECEIPTS_ALL` records receipts, and `AR_RECEIVABLE_APPLICATIONS_ALL` records how those receipts are matched to transactions, with status values ranging from applied to unidentified. Next up, lesson 11: pulling the Payables and Receivables chains together to see how invoices and payments relate across both sides of the business.
