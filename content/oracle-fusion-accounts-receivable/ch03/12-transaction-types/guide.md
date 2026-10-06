# Transaction Types

Chapter 3 moves from "who are we billing" to "how does Receivables know what kind of transaction this is, and how to account for it." Transaction type is the first and most important piece of that: it tells Receivables whether a transaction is an invoice or a credit memo, whether it increases or decreases what the customer owes, and a long list of default behaviors.

## What you'll learn

- What a transaction class is, and how transaction type relates to it
- The key attributes a transaction type controls
- Why getting the "natural application" and sign settings right matters

## Transaction class vs. transaction type

A **transaction class** is one of a small, fixed set built into Receivables: Invoice, Credit Memo, Debit Memo, and a few others like Chargeback and Bills Receivable. You cannot create new classes. A **transaction type**, by contrast, is something you define, and every transaction type is tied to exactly one class. A company typically has several transaction types per class — "Standard Invoice," "Service Invoice," and "Intercompany Invoice" might all be types of the Invoice class, each with different defaults.

## What a transaction type controls

- **Creation sign** – whether transactions of this type normally increase (positive) or decrease (negative, as with most credit memos) the customer's balance.
- **Open receivable** – whether completing a transaction of this type creates an open, outstanding item on the customer's account at all (some transaction types, like certain commitments, don't).
- **Natural application** – for credit memos, how they're expected to apply: "Invoice" natural application means they expect to be matched against a specific invoice, while others can remain unapplied as an on-account credit.
- **Default accounting references** – pointers used by AutoAccounting to help derive revenue, receivable, tax, and freight accounts for transactions of this type, as discussed in lesson 4.
- **Printing options** – default layout/template and whether transactions of this type print automatically in a batch run.
- **Allow overapplication** – whether a receipt can be applied for more than the transaction's balance (common for small discrepancies, discussed further in Chapter 5).

## Why the "level of control" setting matters

Transaction types also interact with transaction sources (lesson 13) to determine how much review a transaction needs before it can complete — this combination is sometimes called the level of control over transaction completion. A stricter combination might require every field to be manually verified; a looser one (common with AutoInvoice-imported transactions from a trusted, already-validated source) can allow transactions to complete automatically once imported.

## A worked example

Northwind Fixtures Co. defines a "Standard Invoice" transaction type (class: Invoice, positive sign, open receivable: yes) for everyday sales, and a separate "Standard Credit Memo" type (class: Credit Memo, negative sign, natural application: Invoice, meaning it's expected to be matched to a specific invoice) for returns and billing corrections. A rep issuing a $500 credit for a damaged shipment selects "Standard Credit Memo," which automatically carries a negative sign and expects to be applied against the original invoice rather than floating as an unapplied credit.

## Recap

Transaction class is fixed and built in; transaction type is what you configure, tied to one class, controlling sign, whether it opens a receivable, natural application behavior, default accounting references, and printing. Getting these right up front means every invoice or credit memo of that type behaves consistently without manual intervention. Next up, lesson 13: transaction sources and batch sources.
