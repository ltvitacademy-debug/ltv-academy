# Data Access and Security in Subledger Accounting

You've now covered how SLA works, start to finish. This lesson addresses a different question entirely: who should be allowed to see and change any of it, and why that matters more for SLA than it might for an ordinary transactional screen.

## What you'll learn

- Why Subledger Accounting configuration carries unusually high risk if mishandled
- How data access sets limit which ledgers a user can see or affect
- Why segregation of duties matters specifically for AMB configuration
- The difference between who processes transactions and who configures rules

## Why SLA configuration carries outsized risk

A typo in one supplier's address affects one supplier. A flawed account rule, by contrast, can silently misstate every single transaction of a given type for every ledger that AAD serves — potentially thousands of transactions across multiple periods before anyone notices (exactly the scenario explored in lesson 25's troubleshooting walkthrough, except discovered late instead of caught in Draft). Because the blast radius of a configuration mistake is so much larger than a transactional mistake, access to configure SLA rules needs to be more tightly controlled than access to simply enter transactions.

## Data access sets

Oracle Fusion controls which ledgers a given user can see or act on through **data access sets** — a security construct that limits a user's visibility and transaction rights to specific ledgers or ledger sets, rather than granting blanket access to every ledger in the environment. A consultant working on one subsidiary's books should not, by default, be able to see or affect a different subsidiary's ledger, even though both might use Subledger Accounting. This matters particularly in the multiple-ledger, multiple-representation scenarios from lesson 26 — a user might legitimately need access to a primary ledger but have no business reason to touch a secondary ledger built for a different reporting purpose.

## Segregation of duties for AMB configuration

Beyond ledger-level access, Oracle Fusion's security model lets a company separate who can configure Subledger Accounting rules (in the Accounting Methods Builder) from who can simply run transactions day to day. This segregation matters because the people entering invoices and receipts generally should not also be the people who can change how those transactions get accounted — mixing those two responsibilities removes an important check against both error and fraud. A well-designed security setup keeps AMB configuration access limited to a small, specifically authorized group, separate from the broader transactional user base.

## Processing versus configuring: two different risk profiles

It's worth being explicit about the distinction this lesson is built around: processing a transaction (validating an invoice, applying a receipt) affects that one transaction. Configuring a rule affects every future transaction that rule applies to, across every period until someone changes it again. Any company's security design for Subledger Accounting should reflect that these are not equivalent levels of risk, even though both happen inside the same Oracle Fusion environment.

## Recap

Subledger Accounting configuration carries outsized risk because a single flawed rule can affect many transactions across many periods, which is why data access sets limit which ledgers a user can touch, and segregation of duties typically separates day-to-day transaction processing from AMB rule configuration. Next up, lesson 28: rebuilding accounting after rule changes, what happens to already-accounted transactions once a rule is fixed.
