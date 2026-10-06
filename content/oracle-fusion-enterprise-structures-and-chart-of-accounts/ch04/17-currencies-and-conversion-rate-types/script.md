# Script — Currencies and Conversion Rate Types

## Segment 1 (title)

Currency is the third of a ledger's four C's. This lesson covers enabling currencies for use, and the four predefined rate types Oracle Fusion gives you for translating one currency into another.

## Segment 2 (steps)

Oracle Fusion ships with a large list of ISO currencies already defined, but each must be explicitly enabled before use, through Manage Currencies. A US-only company might enable just USD; a multinational enables every currency it actually transacts in.

## Segment 3 (code)

Four conversion rate types are predefined. Spot: a rate for a specific date, for volatile currencies. Corporate: a smoothed standard rate set by management. User: no automatic rate, the preparer enters one manually. Fixed: a rate that stays fixed, for pegged currencies.

## Segment 4 (steps)

User rate type is the one exception to automation — Oracle Fusion won't supply a rate, so the preparer must type one in, used sparingly for one-off cases. Companies can also define additional custom rate types beyond these four.

## Segment 5 (outro)

A ledger's functional currency is fixed at creation; a transaction's currency might be totally different, requiring conversion through one of these rate types. Next up, lesson eighteen: daily rates, where these rates actually get loaded and maintained.
