# Script — Intercompany Transactions

## Segment 1 (title)

Most journals stay inside one legal entity. An intercompany transaction crosses more than one, and that's what this lesson is about: how Oracle Fusion keeps each entity's own books balanced when a single business event touches two of them.

## Segment 2 (steps)

Intracompany crosses divisions within the same legal entity. Intercompany crosses different legal entities entirely, which means each entity's own books have to stay balanced independently, not just split between departments.

## Segment 3 (code)

LTV Manufacturing Corporation's US parent allocates four thousand dollars of IT service cost to its UK subsidiary. The system automatically generates the missing offsetting lines: an intercompany receivable in the US books, an intercompany payable in the UK books, so both sides stay balanced on their own.

## Segment 4 (steps)

Intercompany balancing rules are configured once, by pairs of legal entities, specifying exactly which receivable and payable accounts to use. From then on, every transaction crossing that same pair generates those lines automatically.

## Segment 5 (steps)

In theory, the US receivable and UK payable should always net to zero across the group. In practice, timing differences, FX differences, or a journal posted to only one side can throw them out of balance.

## Segment 6 (outro)

That's exactly what an Intercompany Reconciliation Report exists to catch before close. Up next, lesson 32: Consolidation Concepts, where these balances get eliminated entirely for group reporting.
