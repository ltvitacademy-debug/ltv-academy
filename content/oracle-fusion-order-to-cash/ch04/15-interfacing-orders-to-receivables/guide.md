# Interfacing Orders to Receivables

Lesson 14 described which fields end up on the invoice. This lesson covers the mechanism that actually moves them there — the handoff between Order Management/Shipping and Receivables, which does not happen by magic and does not happen inside Receivables itself.

## What you'll learn

- The two systems involved in getting shipment data to Receivables, and what each does
- What the Receivables interface tables are, at a conceptual level
- Why this handoff is a staging step, not a finished invoice
- Where SO-48217 sits in this process right after confirmation

## Two separate steps, two separate systems

Getting a confirmed shipment onto a Receivables invoice happens in two distinct steps, run by two different parts of Oracle Fusion:

1. **The Invoicing Integration workflow activity**, which runs as part of order orchestration once a line is eligible (after ship confirmation and Interface Trip Stop). This step gathers everything about the shipped line — item, quantity, price, customer, terms, dates — and writes it to a staging area that Receivables can read: the Receivables interface tables.
2. **AutoInvoice**, a Receivables program that reads from those same interface tables, validates every record against Receivables' own setup (customer, item, currency, tax, and more), and — for records that pass — creates real Receivables transactions.

The distinction matters: step 1 is Order Management's job of packaging and handing off the data; step 2 is Receivables' job of accepting, validating, and finally creating the transaction. A problem can live in either step, and troubleshooting means knowing which one you're actually looking at.

## Why a staging area, not a direct write

Receivables does not let Order Management reach in and create an invoice directly. Instead, shipment data lands in interface tables — essentially a holding area of raw, not-yet-validated rows — and AutoInvoice is the only path from there into a real transaction. This separation exists so Receivables can enforce its own validation consistently, regardless of which source system (Order Management, a third-party system, a manual data load) the data originally came from. AutoInvoice doesn't care where a row came from; it only cares whether the row is valid.

## Where SO-48217 stands right now

The Savannah shipment's 400 units confirmed, Interface Trip Stop ran, and the Invoicing Integration step has packaged that line's data — customer, 400 units, the discounted unit price, Net 30 terms — into the Receivables interface tables. Nothing in Receivables itself exists yet. The line is waiting for AutoInvoice to run and decide whether it can become a real transaction, which is exactly where the next lesson picks up.

## Recap

Shipment data reaches Receivables in two separate steps: order orchestration's Invoicing Integration activity packages and writes the data to Receivables interface tables, and AutoInvoice later reads, validates, and converts qualifying rows into real transactions. Until AutoInvoice runs, the data is only staged, not yet a transaction. Next up, lesson 16: running AutoInvoice, and what happens when a record doesn't pass validation cleanly.
