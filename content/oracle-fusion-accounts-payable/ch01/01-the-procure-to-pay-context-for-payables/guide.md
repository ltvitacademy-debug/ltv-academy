# The Procure-to-Pay Context for Payables

Welcome to Oracle Fusion Accounts Payable, the second section in the Oracle Fusion Financials Consultant path. You already know, from Accounting Fundamentals for Oracle Professionals, what a journal entry is and why debits and credits must balance. This course is about one specific slice of Oracle Fusion Cloud: Payables, the module that owns supplier invoices and the payments that settle them. Before we open a single Payables screen, we need to see where Payables sits inside the larger chain of events that gets a business from "we need something" to "we paid for it."

## What you'll learn

- The full procure-to-pay (P2P) chain, from requisition to posted journal entry
- Which steps happen in Procurement, which happen in Payables, and which happen in Payments
- Why Payables is a "receiving" module: it reacts to documents created upstream
- The three documents Payables most often compares against an invoice: the purchase order, the receipt, and the agreement

## The procure-to-pay chain

Procure-to-pay describes everything a company does between deciding it needs to buy something and closing the books on having paid for it. In Oracle Fusion, that chain usually looks like this:

1. **Requisition** — an employee asks to buy something (Self Service Procurement).
2. **Purchase order (PO)** — Procurement turns an approved requisition into a legal commitment to a supplier, with agreed quantities and prices.
3. **Receipt** — the warehouse or requester confirms the goods or services actually arrived (Receiving).
4. **Invoice** — the supplier bills for what was ordered and delivered. This is where **Payables** takes over.
5. **Payment** — the invoice is paid, through the **Payments** module, using a bank account and a payment method.
6. **Accounting** — every one of these events can generate a journal entry, ultimately landing in the **General Ledger**.

Payables does not own steps 1 through 3. It is a downstream consumer of them. When an invoice shows up, Payables' job is to record it, compare it against whatever PO or receipt already exists, route it for approval if needed, and get it ready to pay.

## Why this matters before you touch an invoice screen

A huge number of real-world Payables problems are not actually Payables problems — they are upstream problems that only become visible when an invoice won't validate or won't match. A price mismatch is often a PO that was never updated. A "quantity billed exceeds quantity received" hold usually means Receiving hasn't recorded the delivery yet. If you only ever learn the Payables screens in isolation, every one of those situations looks like a mystery. If you understand the P2P chain, they look like exactly what they are: a document somewhere upstream that doesn't yet agree with the invoice in front of you.

## Not every invoice has a PO

Procure-to-pay as described above assumes a purchase order exists. In practice, plenty of real invoices — a monthly utility bill, a one-off consulting fee, an expense reimbursement — never start with a requisition or a PO at all. Payables handles both patterns: **PO-matched** invoices that get checked against a purchase order (and sometimes a receipt), and **non-PO** invoices that are coded directly to an account without any matching step. Later lessons on invoice types and matching return to this distinction in detail.

## A fictional example to carry through this course

Through this course we'll follow a fictional company, **Brightfield Office Supply**, a mid-size distributor that runs Oracle Fusion Cloud. Its suppliers, invoice numbers, and dollar amounts are invented for teaching purposes and do not represent any real company's records.

## Recap

Payables sits downstream of Procurement and Receiving, and upstream of Payments and the General Ledger. It receives invoices, compares them to whatever purchase orders or receipts already exist, and prepares them to be paid and accounted. Next up, lesson 2: a tour of the Payables work areas and the full lifecycle an invoice travels through once it lands there.
