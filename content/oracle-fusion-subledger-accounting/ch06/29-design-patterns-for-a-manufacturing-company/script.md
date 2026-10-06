# Script — Design Patterns for a Manufacturing Company

## Segment 1 (title)

This final lesson pulls together everything from this course into one design scenario: a manufacturing company implementing Subledger Accounting across its subledgers, the way you'd actually approach it as a consultant.

## Segment 2 (steps)

Picture this company: it purchases raw materials through Payables, sells finished goods through Receivables, owns a meaningful base of production equipment in Fixed Assets, and manages several bank accounts in Cash Management. Every subledger needs its own Application Accounting Definition, and all of them post into one General Ledger.

## Segment 3 (steps)

For Payables, the supplier base includes domestic and international freight suppliers - echoing lesson twenty-five's scenario. The Freight account rule needs conditions covering every category in use, not just the common case. Supporting references carrying supplier number are essential, because hundreds of suppliers need that Open Account Balances Listing to know what's owed to whom.

## Segment 4 (code)

For Receivables, description rules combining customer name and invoice number make Account Analysis usable when a distributor disputes a balance. For Fixed Assets, with dozens of equipment categories, a mapping set translating category into Natural Account avoids a separate rule condition for every one of them.

## Segment 5 (steps)

Cash Management reconciles bank activity against AP payments and AR receipts already accounted through SLA - so everything upstream determines how clean that reconciliation is. AP, AR, Assets, and Cash Management each generate journal entries through one shared engine, landing in one General Ledger that must tell one coherent story.

## Segment 6 (outro)

So the checklist: event classes covered, AADs validated and activated, Draft-then-Final configured sensibly, supporting references in place, accounting methods correct per ledger. That's this entire course. Next up in the Oracle Fusion Financials Consultant path: Oracle Financial Reporting, building the statements that consume everything you just learned to account for correctly.
