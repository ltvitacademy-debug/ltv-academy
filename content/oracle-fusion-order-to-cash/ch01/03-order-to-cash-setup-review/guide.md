# Order-to-Cash Setup Review

Before any sales order can be entered, a lot of configuration has to already exist. Most of it you set up, or at least saw set up, in earlier courses in this path — Enterprise Structures and Chart of Accounts, General Ledger, and Accounts Receivable. This lesson is a short, deliberate review, not a re-teach: the goal is to connect setup objects you already know to the role they play specifically in Order-to-Cash, so the rest of this course can move quickly without stopping to re-explain them.

## What you'll learn

- Which setup objects from earlier courses get reused directly in O2C
- The handful of setup objects that are new to Order Management specifically
- Why a missing or misconfigured setup object is one of the most common causes of a stuck order

## Setup you already have

- **Business unit and legal entity** — every sales order is entered and processed within a business unit, which ties back to a legal entity for accounting purposes, exactly as you learned in Enterprise Structures.
- **Chart of accounts and ledger** — the structure that will eventually receive the revenue and receivable journal entries this cycle generates.
- **Customer account and site** — the customer master record, including the bill-to and ship-to site, which you saw created in the Accounts Receivable course. Order Management reads these same customer records; it does not maintain a separate customer list.
- **Receivables transaction types and transaction sources** — these determine how an invoice created from a sales order will behave in Receivables (which GL accounts it defaults to, whether it's open for crediting, and so on).
- **Receipt classes and methods** — these govern how a customer's payment will later be recorded and applied, something Accounts Receivable and Cash Management already covered.

## Setup that's new here

- **Item and pricing setup** — items need to exist (typically set up in Product Information Management) and be assigned to a price list that Order Management will use to calculate the order's price.
- **Order orchestration and fulfillment rules** — the sequence of steps (reserve, ship, invoice) a given order type will follow, and which ones run automatically versus which wait for a person.
- **Credit check and hold rules** — the thresholds and conditions that will cause an order, or a customer, to be stopped before it ships.
- **Shipping parameters** — the warehouse (inventory organization) an order ships from, and the rules that determine how it's picked and packed.

## Why this matters

A surprising share of "the order won't invoice" or "the order won't even save" support tickets trace back to one missing setup object: a customer site with no active price list assigned, a ship-from organization that isn't enabled for a particular item, a transaction source that points at a disabled transaction type. As a consultant, your mental model should be: a sales order is not really one object, it is a chain of references into all of this setup, and the chain breaks wherever one reference is missing.

## Recap

Order-to-Cash setup splits into two groups: configuration you already understand from Enterprise Structures, General Ledger, and Accounts Receivable, reused as-is, and a smaller set of new setup — items, pricing, orchestration, credit rules, and shipping parameters — that belongs specifically to Order Management. Next up, lesson 4: meeting the fictional company and customer you'll follow through the rest of this course, and the plan for how their one transaction will move.
