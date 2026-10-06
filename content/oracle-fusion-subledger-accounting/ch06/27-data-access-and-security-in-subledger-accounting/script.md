# Script — Data Access and Security in Subledger Accounting

## Segment 1 (title)

You've now covered how SLA works, start to finish. This lesson asks a different question: who should be allowed to see and change any of it, and why that matters more here than for an ordinary transactional screen.

## Segment 2 (steps)

A typo in one supplier's address affects one supplier. A flawed account rule can silently misstate every transaction of a given type, across every ledger that AAD serves - potentially thousands of transactions before anyone notices. Because the blast radius of a configuration mistake is so much larger, access to configure SLA rules needs tighter control than access to simply enter transactions.

## Segment 3 (steps)

Oracle Fusion controls which ledgers a user can see or act on through data access sets - limiting visibility and transaction rights to specific ledgers, not blanket access to everything. A consultant on one subsidiary's books shouldn't automatically see a different subsidiary's ledger, especially in the multi-ledger scenarios from lesson twenty-six.

## Segment 4 (steps)

Beyond ledger access, Oracle Fusion lets a company separate who configures Subledger Accounting rules in the Accounting Methods Builder from who runs transactions day to day. The people entering invoices generally shouldn't also be the people who can change how those transactions get accounted - mixing those roles removes a real check against error and fraud.

## Segment 5 (code)

Here's the core distinction. Processing a transaction affects that one transaction. Configuring a rule affects every future transaction that rule applies to, across every period until someone changes it again. Those are not equivalent levels of risk, even inside the same Fusion environment.

## Segment 6 (outro)

So remember: data access sets limit which ledgers a user touches, and segregation of duties typically separates transaction processing from AMB configuration, because configuration mistakes have a much larger blast radius. Up next, lesson twenty-eight: rebuilding accounting after rule changes.
