# How Business Processes Flow Through an ERP

**Chapter 1 · ERP Fundamentals · Lesson 2 of 20**

Lesson 1 established that an ERP is one connected system built from integrated modules. This lesson makes that concrete by following two business processes end to end — the two you will hear about constantly as an Oracle Fusion Financials consultant: **Procure-to-Pay** and **Order-to-Cash**.

## What you'll learn

- Why "process" matters more than "module" when you're learning an ERP
- The Procure-to-Pay cycle, step by step
- The Order-to-Cash cycle, step by step
- Why both cycles end in the same place: the General Ledger
- Key vocabulary: process flow, Procure-to-Pay (P2P), Order-to-Cash (O2C)

## Think in processes, not screens

A new consultant's first instinct is to learn an ERP screen by screen. That's backwards. What actually matters to the business is the **process** — the sequence of steps a real transaction travels through, often crossing several modules along the way. Learn the process, and the screens make sense as stops along that journey. Learn only the screens, and you'll never understand why a transaction is stuck.

## Procure-to-Pay (P2P): buying something

Imagine our fictional company, **Blue Harbor Manufacturing**, needs to buy steel from a supplier.

1. **Requisition.** An employee requests the steel be purchased. This is a request, not yet a commitment to the supplier.
2. **Purchase Order (PO).** Procurement approves the requisition and issues a PO to the supplier — now there's a legal commitment to buy.
3. **Receipt.** The steel arrives at the warehouse. A receiving clerk records that it was received, in what quantity and condition.
4. **Invoice.** The supplier sends an invoice. Accounts Payable matches it against the PO and the receipt — a control called the **three-way match** — before approving payment.
5. **Payment.** Accounts Payable pays the supplier, and the transaction posts to the General Ledger as a reduction in cash and an increase in inventory (or an expense).

Notice how many modules that touched: Procurement (requisition, PO), Supply Chain (receipt), Financials/Payables (invoice, payment) — all one continuous process, no retyping between steps.

## Order-to-Cash (O2C): selling something

Now a customer orders finished goods from Blue Harbor Manufacturing.

1. **Sales Order.** A sales rep enters the customer's order.
2. **Fulfillment / Shipment.** The warehouse picks, packs, and ships the goods, which also reduces inventory.
3. **Invoice.** Accounts Receivable generates an invoice to the customer based on what was actually shipped.
4. **Cash Receipt.** The customer pays, and Accounts Receivable applies the payment against the open invoice.
5. **General Ledger.** The sale, the cost of the goods, and the cash received all post automatically to the books.

## Both roads lead to the General Ledger

This is the pattern to internalize: every business process in the ERP — whatever module it starts in — eventually produces an **accounting entry** that lands in the **General Ledger (GL)**. The GL is the financial heartbeat of the company; P2P and O2C are two of the main arteries feeding it. A later course in this path, Subledger Accounting, covers exactly how a shipment or an invoice automatically becomes a balanced debit-and-credit entry — for now, just know that it happens, and that it happens without anyone manually journalizing it.

## Key terms

| Term | Meaning |
|---|---|
| Process flow | The sequence of steps a real transaction travels through, often across several modules |
| Procure-to-Pay (P2P) | Requisition → PO → Receipt → Invoice → Payment |
| Order-to-Cash (O2C) | Sales Order → Fulfillment → Invoice → Cash Receipt |
| Three-way match | Comparing a PO, a receipt, and a supplier invoice before paying |
| General Ledger (GL) | Where every process's accounting impact ultimately lands |

## Check yourself

You're ready for Lesson 3 when you can list, from memory, the five steps of Procure-to-Pay and the five steps of Order-to-Cash, and explain why a three-way match protects the company from paying for goods it never received.
