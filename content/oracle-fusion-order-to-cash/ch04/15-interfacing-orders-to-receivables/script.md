# Script — Interfacing Orders to Receivables

## Segment 1 (title)

Lesson fourteen described which fields end up on the invoice. This lesson covers how they actually get there - the handoff between Order Management and Receivables, which doesn't happen by magic and doesn't happen inside Receivables itself.

## Segment 2 (steps)

Two separate steps, two separate systems. The Invoicing Integration workflow activity runs once a line is eligible after ship confirmation, and writes everything about that shipment into a staging area: the Receivables interface tables. AutoInvoice, a Receivables program, later reads those same tables, validates every record, and creates real transactions for the ones that pass.

## Segment 3 (steps)

Why a staging area instead of a direct write? Receivables doesn't let Order Management reach in and create an invoice directly. This separation lets Receivables enforce its own validation consistently, no matter where the data came from - Order Management, a third-party system, a manual load. AutoInvoice doesn't care about the source. It only cares whether the row is valid.

## Segment 4 (code)

Here's where our order stands right now. Four hundred units confirmed, Interface Trip Stop ran, and Invoicing Integration has packaged the customer, quantity, discounted price, and net thirty terms into the interface tables. Nothing in Receivables exists yet - it's staged, waiting for AutoInvoice.

## Segment 5 (outro)

Up next, lesson sixteen: running AutoInvoice, and what happens when a record doesn't pass validation cleanly.
