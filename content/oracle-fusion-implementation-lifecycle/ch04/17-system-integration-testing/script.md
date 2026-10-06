# Script — System Integration Testing

## Segment 1 (title)

Scripts are written. This lesson covers the first level where they actually get executed: System Integration Testing, or SIT, the project team's own proof the configured, migrated system works end to end before business users ever touch it.

## Segment 2 (steps)

SIT validates an integrated, end-to-end process, not one screen in isolation. For Cash Management, that might mean a payment issued in AP posts to the ledger, the bank processes it, a statement comes in, and reconciliation happens automatically, a single event touching four parts of the system. SIT catches problems that only show up when pieces interact.

## Segment 3 (steps)

SIT is run by the project team: functional consultants testing their own and adjacent modules, technical consultants validating integrations, with a testing lead coordinating. Business users generally aren't involved yet. SIT is the team's own quality gate before asking the business to spend its time testing.

## Segment 4 (steps)

Entry criteria for SIT typically require configuration promoted to Test, test data loaded, and scripts written and traced to the RTM. Exit criteria require all critical scripts executed with a passing result, and any open defects triaged to an acceptable severity before the project moves into UAT.

## Segment 5 (outro)

Brightfield's SIT cycle runs its reconciliation script successfully, but a second scenario testing a partial payment fails to auto-match. That becomes a logged defect, triaged before SIT can close for Cash Management. Up next, lesson eighteen: User Acceptance Testing, where the business takes over.
