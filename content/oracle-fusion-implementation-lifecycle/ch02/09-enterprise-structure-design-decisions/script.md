# Script — Enterprise Structure Design Decisions

## Segment 1 (title)

You learned the mechanics of legal entities, business units, and ledgers already. This lesson looks at them as implementation deliverables that have to be decided earliest of all, and are unusually expensive to change once the project moves forward.

## Segment 2 (steps)

Almost every other setup object is assigned to or scoped by a legal entity, business unit, or ledger. Changing a chart of accounts or splitting a business unit after go-live typically means re-running historical reporting and re-pointing integrations. That's why these decisions are front-loaded, well before individual module workbooks are finalized.

## Segment 3 (steps)

The core decisions are legal entities, the registered companies with their own statutory reporting; business units, the operational units that process transactions; ledgers, defined by the four Cs: chart of accounts, calendar, currency, and convention; and reference data sets, which can be shared across business units or kept separate.

## Segment 4 (steps)

Because the blast radius is so large, these decisions get their own design document, reviewed by finance leadership across every affected ledger and legal entity, sometimes including an external auditor, since the chart of accounts shapes future financial statements. This approval happens before individual module configuration workbooks are finalized.

## Segment 5 (outro)

Brightfield settles on one US legal entity, two business units sharing a single ledger, and one shared reference data set to keep payment terms and tax rules consistent across US operations. Up next, lesson ten: turning design decisions into formal business process design and solution design documents.
