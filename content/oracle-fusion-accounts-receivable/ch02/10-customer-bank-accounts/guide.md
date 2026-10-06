# Customer Bank Accounts

So far every customer attribute we've covered describes the customer's identity and terms. This lesson covers one that describes their money: the bank account a customer pays from, or gets refunded to.

## What you'll learn

- Why Receivables stores a customer's bank account at all
- The two main scenarios that use it: direct debit receipts and refunds
- How a customer bank account relates to the party/account structure you already know

## Why Receivables needs this

Most receipts simply arrive — a wire, a check, a card payment — and Receivables just records that money came in from a given customer. But two scenarios need Receivables to know a customer's actual bank details in advance:

- **Direct debit / automatic receipts** – some customers (especially in B2B relationships with recurring, predictable billing) authorize the business to pull payment directly from their bank account on or near the due date, rather than initiating payment themselves each time. This requires the customer's bank account to be on file and linked to an authorized automatic-receipt method.
- **Refunds** – when a customer is owed money back (an overpayment, a cancelled order, a large credit memo), the refund can be issued electronically to the customer's bank account on file instead of a paper check.

## Where the bank account lives

A customer bank account is associated with the **party**, not a specific account site — the same bank account can be used across more than one customer account belonging to that party, similar to how a party can have multiple addresses. Each bank account record stores the bank, branch, account number, and currency, and is explicitly authorized for use by one or more customer accounts and, where relevant, specific receipt methods.

## Setup dependency

Before a customer bank account can be entered, the bank and bank branch themselves must already exist as shared setup data (the same bank/branch definitions used elsewhere in Oracle Fusion Cash Management). Receivables doesn't maintain its own separate list of banks — it points to the same shared bank and branch records that Payables and Cash Management use, which keeps a single bank's details consistent no matter which module references it.

## A worked example

Cascade Outdoor Supply (from earlier lessons) moves to automatic receipts for predictability on both sides. Cascade's controller provides bank account details once; Northwind Fixtures Co.'s AR team confirms the bank and branch already exist in the shared setup, then adds Cascade's account number as a customer bank account tied to Cascade's party and authorized for its "Cascade Outdoor Supply – US" customer account. From the next billing cycle on, Northwind's automatic receipt process pulls each due invoice amount directly from that account on the due date, instead of waiting for Cascade to initiate a wire manually.

## Recap

A customer bank account exists mainly to support direct debit/automatic receipts and electronic refunds. It's tied to the party (reusable across that party's accounts) and depends on the bank/branch already existing as shared Oracle Fusion setup data. This closes out the "money" side of a customer record. Next up, lesson 11: merging and maintaining customers.
