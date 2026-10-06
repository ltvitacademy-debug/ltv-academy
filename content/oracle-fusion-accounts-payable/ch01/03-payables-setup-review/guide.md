# Payables Setup Review

Before Brightfield Office Supply's AP team can enter a single invoice, a fair amount of configuration has to exist. This lesson is a map, not a deep dive: it names each piece of required Payables setup and says what it's for, so the next several lessons (Payables Options, System Options, payment terms, suppliers, invoice setup) have somewhere to attach. Think of this as the table of contents for everything Payables needs behind the scenes.

## What you'll learn

- Why Payables setup is organized by business unit, not by one global switch
- The seven areas of setup every Payables implementation needs
- How this setup map connects to the next several lessons in this course

## Setup is organized around the business unit

In Oracle Fusion, a **business unit (BU)** is the organizational entity that actually processes transactions — it's the "who" behind "who entered this invoice, and under which rules." A company can have one BU or dozens, by country, division, or legal entity. Most Payables setup is scoped at the business unit level, which is why two business units in the same company can run Payables with different invoice tolerances, different default payment terms, or different approval rules, even though they ultimately post to the same chart of accounts.

## The seven areas of Payables setup

1. **Business unit and ledger assignment** — every Payables transaction belongs to exactly one business unit, and that business unit is tied to a primary ledger, which determines the chart of accounts and currency rules behind every posted invoice.
2. **Payables Options and System Options** — Payables Options are set per business unit (invoice tolerances, discount handling, accounting defaults); System Options apply more broadly across the deployment (tax calculation behavior, reporting currency behavior). Lesson 4 covers both in detail.
3. **Payment terms** — the rules that calculate an invoice's due date and any early-payment discount. Lesson 5 covers these.
4. **Tax configuration** — transaction tax rules (and, separately, withholding tax rules) that determine what tax gets calculated or recorded on an invoice. Chapter 3 touches tax basics for invoices.
5. **The supplier model** — suppliers, their sites, their addresses, their bank accounts, and the business classifications used for compliance reporting. All of Chapter 2.
6. **Bank accounts and payment methods** — the disbursement bank accounts Payables will actually pay from, and the methods (check, EFT, wire) available to use. Chapter 6.
7. **Invoice approval rules** — whether an invoice needs human approval before it can be paid, and who approves it. Chapter 4.

## Why this matters as a map

New Payables users often meet these seven areas in the wrong order — they hit a tolerance error on day one and have no idea Payables Options exists, or they can't understand why an invoice has no due date and don't know payment terms drive that. Having the whole map up front means that when a later lesson zooms into one box, you already know where it fits relative to the other six.

## A quick mental check

If you can answer "which of the seven areas would I look at" for a given symptom, you're in good shape for the rest of this course:

- Invoice is stuck on a price-variance hold → tolerances live in Payables Options (area 2).
- Invoice has no due date calculated → payment terms (area 3).
- Invoice needs a manager's sign-off before paying → approval rules (area 7).
- A new vendor can't be paid yet → the supplier record, including its bank account, isn't complete (area 5 and 6).

## Recap

Payables setup is scoped mostly at the business unit level and breaks into seven areas: BU/ledger assignment, Payables and System Options, payment terms, tax configuration, the supplier model, bank accounts and payment methods, and approval rules. Next up, lesson 4: Payables Options and System Options, the two configuration screens that shape almost everything else in this list.
