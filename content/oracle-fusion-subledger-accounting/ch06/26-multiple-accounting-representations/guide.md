# Multiple Accounting Representations

Several earlier lessons mentioned this scenario and promised full detail later: a single business event, accounted differently for two different reporting needs. This lesson delivers that detail, tying together accounting methods (lesson 3 and 12), ledger assignment (lesson 13), and the primary/secondary ledger concept from your General Ledger course.

## What you'll learn

- Why a company needs more than one accounting representation of the same events
- How primary and secondary ledgers deliver this without duplicating transactions
- How accounting methods are what actually differ between the two representations
- A worked example: local GAAP versus IFRS for one invoice

## Why one representation isn't always enough

A multinational company might need to report its financial results under more than one accounting standard at once — for example, local GAAP for a country-specific statutory filing, and IFRS for group-level consolidated reporting. These two standards can require genuinely different accounting treatment for the exact same underlying business event: different depreciation methods, different revenue recognition timing, different account structures entirely. A single accounting representation cannot satisfy both requirements simultaneously.

## How primary and secondary ledgers solve this

Rather than running two entirely separate instances of Oracle Fusion, a company uses a **primary ledger** for one representation and one or more **secondary ledgers** for additional representations of the exact same underlying transactions. Subledger transactions are entered once — one invoice, one receipt — but Subledger Accounting can generate accounting for that single event into more than one ledger, using a different accounting method for each.

## What actually differs between the representations

The subledger transaction itself (the invoice, the receipt) is identical across every representation — same amount, same date, same supplier. What differs is the **accounting method** assigned to each ledger (exactly the lesson 13 concept). The primary ledger's accounting method might derive accounts and apply rules suited to local GAAP; the secondary ledger's accounting method, built from a different set of AADs, might derive different accounts or apply different journal line rules suited to IFRS, for that exact same event.

## A worked example

Picture a $10,000 piece of equipment purchased by a subsidiary. Under local GAAP depreciation rules, this might be set up to depreciate over 5 years; under IFRS, the same asset might be required to depreciate over 7 years based on different componentization rules. The underlying asset addition event is one event. But the primary ledger's accounting method (built around local GAAP's Fixed Assets AAD) and the secondary ledger's accounting method (built around IFRS's Fixed Assets AAD) each generate their own appropriate depreciation journal entries, in their own ledger, from that one shared event — exactly the mechanism you first previewed back in lesson 3 and lesson 13.

## Recap

Multiple accounting representations let a company satisfy more than one accounting standard from the same underlying transactions, by assigning a different accounting method to a primary ledger versus one or more secondary ledgers, while the subledger transaction itself is entered only once. Next up, lesson 27: data access and security in Subledger Accounting, covering who can see and touch this configuration and why that matters.
