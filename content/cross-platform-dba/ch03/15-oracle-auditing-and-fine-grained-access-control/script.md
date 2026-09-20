# Script — Oracle Auditing & Fine-Grained Access Control

## Segment 1 (title)

Oracle's modern answer to auditing is Unified Auditing, introduced in 12c and the default mechanism since. Beyond just recording what happened, Oracle also has Virtual Private Database, a genuinely distinctive way to control what a query is even allowed to see.

## Segment 2 (code: Unified Auditing)

Unified Auditing consolidates what used to be scattered across three separate mechanisms into one audit trail. You write custom policies, or enable predefined ones like ORA_LOGON_FAILURES, and every record lands in one queryable view, unified_audit_trail.

## Segment 3 (code: VPD)

Virtual Private Database is a different problem — instead of recording access, it transparently rewrites every query against a table to add a WHERE predicate, enforced at the database level. The application never has to remember to filter; the database does it no matter what SQL is sent.

## Segment 4 (steps: three tools)

Three related but distinct tools: Unified Auditing records what happened database-wide, Fine-Grained Auditing records only when a specific condition or column is touched, and VPD restricts what rows a query can even return in the first place.

## Segment 5 (outro)

Next up: Transparent Data Encryption — how Oracle encrypts data at rest, at the tablespace level or the individual column level, using a wallet to protect the keys.
