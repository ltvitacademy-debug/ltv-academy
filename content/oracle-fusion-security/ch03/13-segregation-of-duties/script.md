# Script — Segregation of Duties

## Segment 1 (title)

Lesson twelve mentioned, almost in passing, that a company often wants the person entering an invoice to be different from the person approving it. This lesson makes that explicit: segregation of duties, the principle that no one person should hold conflicting access letting them both initiate and approve the same event unsupervised.

## Segment 2 (steps)

Segregation of duties is a fraud and error prevention control. If one person can both create a transaction and approve it, nothing stops them pushing through something improper. The classic example: someone who can both create a supplier and approve payments to that supplier could create a fictitious one and pay it. Oracle Fusion doesn't stop this automatically — it will happily provision a role combining both if an administrator builds it that way. SoD is a discipline applied to role design, not a feature that enforces itself.

## Segment 3 (steps)

An SoD conflict exists when one person's combined access, across all their roles, includes two duties the business has defined as incompatible. Common examples: creating a supplier and approving supplier payments, creating a journal entry and approving or posting it, entering a credit memo and approving the resulting write-off. This is about combined access across everything a person holds — two individually reasonable roles can still create a conflict together.

## Segment 4 (steps)

Oracle doesn't predefine this business logic itself — each enterprise defines its own incompatible duties. The current tool for detecting it is Oracle Advanced Access Controls, part of Oracle Risk Management Cloud, which continuously monitors role assignments and transactions against a conflict library and can simulate a proposed change before it's granted.

## Segment 5 (outro)

Sometimes a conflict can't be avoided — a small company's controller might need both invoice approval and journal posting during a staffing gap. The accepted response is documenting it as an accepted risk and adding a compensating control, like a weekly review, not pretending it doesn't exist. Up next, lesson fourteen: security reports and audits, where these conflicts actually get surfaced.
