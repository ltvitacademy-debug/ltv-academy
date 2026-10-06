# Script — Multiple Accounting Representations

## Segment 1 (title)

Several earlier lessons promised full detail on this scenario: a single business event, accounted differently for two different reporting needs. This lesson delivers it, tying together accounting methods, ledger assignment, and primary and secondary ledgers.

## Segment 2 (steps)

A multinational company might need local GAAP for a statutory filing and IFRS for group consolidation at the same time. These standards can require genuinely different treatment of the exact same event - different depreciation methods, different revenue timing, different account structures. One representation can't satisfy both.

## Segment 3 (steps)

Rather than running two separate Fusion instances, a company uses a primary ledger for one representation and secondary ledgers for additional ones. Subledger transactions are entered once - one invoice, one receipt - but Subledger Accounting generates accounting for that single event into more than one ledger, using a different accounting method for each.

## Segment 4 (steps)

The transaction itself is identical across every representation - same amount, same date, same supplier. What differs is the accounting method assigned to each ledger. The primary ledger's method suits local GAAP; the secondary ledger's method, built from different AADs, suits IFRS, for that exact same event.

## Segment 5 (code)

Picture a ten thousand dollar equipment purchase. Local GAAP might depreciate it over five years; IFRS, under different componentization rules, over seven. One asset addition event. The primary ledger's method, built around local GAAP's Fixed Assets AAD, and the secondary ledger's method, built around IFRS's AAD, each generate their own appropriate depreciation entries from that one shared event.

## Segment 6 (outro)

So remember: multiple accounting representations satisfy more than one standard from the same transactions, by assigning a different accounting method per ledger, while the transaction itself is entered only once. Up next, lesson twenty-seven: data access and security in Subledger Accounting.
