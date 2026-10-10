# Lesson 6 — Case Study: Subscription Billing

**Chapter 1 · Application Case Studies · Lesson 6 of 16**

## What you'll learn

- Why quote-to-cash is a chain of systems of record, not one feature
- How subscription amendments and renewals create data problems a one-time-sale design never had to solve
- Where usage-based billing changes the architecture, not just the pricing model
- Why "the price on the invoice doesn't match the quote" is usually a handoff bug, not a pricing bug

## The scenario: Veltrix Software

Veltrix Software sells annual software subscriptions, and recently added a usage-based add-on (metered API calls) on top of the flat subscription fee. Sales quotes deals using Salesforce CPQ; invoices currently get generated manually in the finance team's separate accounting system by someone re-keying the CPQ quote's numbers. As Veltrix's deal volume and plan complexity have grown — multi-year terms, mid-term seat increases, the new usage add-on — the manual re-keying step has become the place where mistakes consistently show up: a customer's invoice doesn't match what the sales quote promised. Veltrix wants that fixed, which first requires naming where in the chain the mismatch actually happens.

## Quote-to-cash is a chain, and each system of record is only authoritative for its own stage

"Quote-to-cash" names a chain of distinct stages, each with its own natural system of record: CPQ is authoritative for the negotiated quote (products, discounts, approved pricing); a contract or order record is authoritative for what was actually agreed and signed; and a billing system is authoritative for what actually gets invoiced and collected over time, including everything that happens to the deal after the ink is dry. Veltrix's current design has only the first stage automated (CPQ) and then hands off to a human to manually translate that into the third stage (an invoice), with nothing enforcing that the handoff happened correctly. The invoice-mismatch complaint is a symptom of that specific gap — it's not that CPQ calculated a wrong price, it's that nothing carried CPQ's calculated price forward automatically into billing.

The architectural fix is to close that gap with Salesforce's billing capability (sold today under **Revenue Cloud**, which brings CPQ and billing functionality together), so an approved quote flows into billing records without a re-keying step — not primarily a pricing-logic fix, but an integration-and-automation fix to the handoff itself.

## Subscriptions create a data problem one-time sales never had

A one-time sale closes once; a subscription has a whole life after the close that Veltrix's design has to represent explicitly: **amendments** (the customer adds 20 seats mid-term), **renewals** (the 12-month term is up and either auto-renews or gets re-quoted), and **cancellations** (partial or full, often with proration). Each of these needs to update the active subscription's billing schedule without re-running the entire original quote-to-cash chain from scratch, and each needs an auditable link back to the original contract so finance can answer "why did this month's invoice change" without archaeology. A design that only handles new-sale quoting and has no explicit model for amendments and renewals will work perfectly in a demo and then break on every subscription's first mid-term change — which, for an annual-subscription business, is not a rare edge case, it's most of the install base eventually.

## Usage-based billing is an architecture change, not a pricing-table change

Veltrix's metered API add-on is a genuinely different problem from flat subscription pricing, because the amount billed depends on something that happens continuously during the billing period, not something decided once at quote time. That requires a usage-ingestion path — the system that counts API calls has to feed usage records into the billing system on some cadence (daily, or at minimum before each billing run) — plus a defined proration or true-up rule for what happens if usage is reported late or corrected after an invoice already went out. This is new architectural surface area with no equivalent in Veltrix's flat-fee design, and it has to be scoped as its own piece of the project rather than assumed to be "the same as subscriptions, just with a different number."

## Key terms

| Term | Meaning |
|---|---|
| Quote-to-cash | The chain from a sales quote through contract and order to billing and cash collection |
| System of record | The system treated as authoritative for a specific stage of that chain |
| Subscription amendment | A mid-term change to an active subscription (e.g., added seats) that updates billing without re-running the full original quote |
| Renewal | The process of extending or re-quoting a subscription at the end of its term |
| Usage-based billing | Billing driven by metered consumption during a period, requiring a usage-ingestion path into the billing system |

## Lab

A Veltrix customer disputes an invoice, claiming they were charged for 20 extra API-call units they never used. Write a short investigation plan: (1) which system in the quote-to-cash chain should be checked first for this specific kind of dispute, and why, (2) what two pieces of evidence (specific records or logs) would prove whether the usage-ingestion path or the billing calculation is at fault, and (3) one process change that would have let Veltrix catch this discrepancy before the invoice went out rather than after the customer complained.

## Check yourself

Can you name the three stages of quote-to-cash this lesson identifies and which system is authoritative for each? Can you explain, in your own words, why usage-based billing is a bigger architectural change than adding a new flat-fee product to the price book?
