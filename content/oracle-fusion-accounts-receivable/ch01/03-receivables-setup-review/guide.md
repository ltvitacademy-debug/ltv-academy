# Receivables Setup Review

Before anyone can enter an invoice, a set of setup objects has to exist. This lesson is a map of that setup — what each piece is for and how the pieces depend on each other — so that when we build each one in detail over the next few chapters, you already know where it fits.

## What you'll learn

- The full list of Receivables setup objects and what each one controls
- The order dependencies between them
- Why setup in Receivables always starts from the ledger and business unit down

## The setup map

Receivables setup sits underneath two things that come from outside the module entirely: a **ledger** (the accounting representation of a legal entity, defined in General Ledger) and a **business unit** (an organizational unit that processes transactions and is assigned to that ledger). Every piece of Receivables setup is scoped to a business unit, which is why implementers always confirm the ledger and business unit structure first.

From there, the setup objects are:

- **Receivables system options** – one record per business unit controlling defaults: the AutoAccounting rule set, cash and tax account defaults, whether discounts are allowed, how AutoInvoice behaves, and more. Covered in lesson 4.
- **Payment terms** – define when an invoice is due, and whether it's due all at once or in installments. Covered in lesson 5.
- **Trading Community and customers** – the party/account/site structure every transaction and receipt is recorded against. Covered in Chapter 2.
- **Transaction types** – define the behavior of a transaction class (invoice, debit memo, credit memo): its natural sign, whether it opens a receivable, and its default accounting. Covered in Chapter 3.
- **Transaction sources (batch sources)** – control numbering and defaulting, and distinguish manually entered transactions from AutoInvoice-imported ones. Covered in Chapter 3.
- **Receivables activities** – provide default accounting for everything that is not a transaction or a receipt itself: adjustments, miscellaneous cash, write-offs, late charges. Covered in Chapter 3.
- **Memo lines** – predefined descriptions and default accounting used on debit memos, on-account credits, and chargebacks so the person entering them doesn't have to pick a GL account from scratch. Covered in Chapter 3.
- **AutoAccounting rules** – the rule logic (referenced from system options) that derives default general ledger accounts for transaction lines, tax, freight, and receivables, based on attributes like transaction type or salesperson.

## Why the order matters

You cannot create a usable transaction type until you know which receivables activities and memo lines it might need to reference, and you cannot create a customer account site with a bill-to use until the business unit and its system options already exist, because the site is what ties a customer to a specific business unit's receivables. In practice, implementation teams work roughly top-down: ledger and business unit first, system options next, then customers, then transaction setup, in parallel with payment terms — all of it finished before go-live, well before the first real invoice is keyed in.

## A quick self-check

If you can answer "where would I go to change this?" for the following, you have the map:

- A customer should get 2% off if they pay within 10 days → **payment terms**
- Every invoice to a certain customer should default to a specific GL account → **AutoAccounting rules**, referenced through transaction type and system options
- A write-off needs a bad-debt expense account → **receivables activity** of type Adjustment or Write-off
- A recurring $500 service charge needs a reusable description → **memo line**

## Recap

Receivables setup radiates out from the ledger and business unit: system options and payment terms first, then the trading community and customer structure, then transaction types, sources, activities, and memo lines. Each later lesson in Chapters 1 through 3 builds one of these pieces in depth. Next up, lesson 4: system options and accounting setup in detail.
