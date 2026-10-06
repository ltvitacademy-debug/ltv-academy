# The Order-to-Cash Context for Receivables

Welcome to Accounts Receivable, the companion module to Accounts Payable in the Oracle Fusion Financials suite. Where Payables tracks what a business owes, Receivables tracks what a business is owed. This course picks up with the assumption that you already understand double-entry accounting, the chart of accounts, and how a subledger feeds the general ledger. Here we apply all of that to the customer side of the business: invoices going out instead of bills coming in, and cash coming in instead of cash going out.

## What you'll learn

- Where Receivables sits inside the broader Order-to-Cash (O2C) process
- Which upstream applications can feed transactions into Receivables
- What Receivables sends downstream to General Ledger, Cash Management and Collections
- The vocabulary you'll hear throughout this course: transaction, receipt, application, subledger accounting

## Order-to-Cash, the big picture

Order-to-Cash is the end-to-end business process that starts the moment a customer wants to buy something and ends when their payment has been collected and reconciled in the books. It is the mirror image of Procure-to-Pay, which you may have seen in the Accounts Payable course. A typical O2C flow looks like this:

1. **Order capture** – a sales order, service contract, or project milestone is agreed with the customer, usually in Order Management or a CRM system.
2. **Fulfillment** – the goods ship or the service is delivered.
3. **Invoicing** – Receivables creates a transaction (an invoice, debit memo, or credit memo) that records what the customer now owes.
4. **Collection** – the customer pays, and Receivables records a receipt and applies it against the open transaction.
5. **Close and reconciliation** – the accounting entries for all of this flow to General Ledger, and the Receivables subledger is reconciled against it at period end.

Receivables owns steps 3 and 4. It does not create the sale and it does not literally move money — it is the accounting and billing system of record for "what is owed" and "what has been collected."

## What feeds Receivables

A Receivables transaction can arrive in one of two ways:

- **Manual entry** – someone keys an invoice, debit memo, or credit memo directly into the Receivables transaction pages. This is common for service businesses, one-off charges, or corrections.
- **Imported through AutoInvoice** – a high-volume source system (Order Management, Project Billing, a point-of-sale system, or any non-Oracle billing system) hands Receivables a batch of transaction lines, and the AutoInvoice program validates and creates transactions from them. We'll cover AutoInvoice in detail in Chapter 4.

Either way, every transaction eventually looks the same to Receivables: a header with a customer, a transaction type, and a date, carrying one or more lines with amounts, tax, and freight.

## What Receivables feeds downstream

Once a transaction and a receipt exist, Receivables is the source of three more things:

- **Subledger accounting**, which derives the debit and credit entries (for example, a debit to Accounts Receivable and a credit to a revenue account) and transfers them to **General Ledger**.
- **Cash Management**, which reconciles receipts against bank statement lines so finance knows the money actually landed.
- **Collections and dunning**, which uses open, overdue balances in Receivables to decide who gets a reminder letter or a phone call.

## A worked example

Northwind Fixtures Co. (a fictional wholesale distributor used throughout this course) ships $12,500 of goods to a customer, Harborline Retail Group (also fictional). Receivables records a standard invoice for $12,500. At completion, subledger accounting creates a journal entry: debit Accounts Receivable $12,500, credit Revenue $12,500. Thirty days later, Harborline pays. Receivables records a receipt for $12,500 and applies it to the invoice, which creates a second entry: debit Cash $12,500, credit Accounts Receivable $12,500. The invoice is now closed, and the customer's open balance is zero.

## Recap

Receivables sits in the middle of Order-to-Cash: it bills what was sold or delivered, and it collects and applies what customers pay. Transactions arrive manually or through AutoInvoice; accounting entries flow out to General Ledger, and receipt data flows out to Cash Management and Collections. Next up, lesson 2: the Receivables work areas and how a transaction moves through its lifecycle.
