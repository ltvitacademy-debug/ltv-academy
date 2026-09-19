# Script — SQL Auditing & Compliance Monitoring

## Segment 1 (title)

Encryption, masking, and row filtering all shape what's currently protected. None of them answer what a real compliance investigation actually asks — who accessed this table, and when. SQL Auditing is the feature that produces that historical record.

## Segment 2 (code: where the record lives)

Auditing writes events to a storage account, Log Analytics, or Event Hub — never inside the audited database itself. A record of who touched sensitive data shouldn't be alterable by the same principals whose activity it's recording.

## Segment 3 (code: scoping it to what matters)

A database audit specification can target exactly the objects you've already classified as sensitive — auditing every SELECT, UPDATE, and DELETE on one table, tied directly to a server audit's destination.

## Segment 4 (steps: what a defensible answer actually needs)

The audit has to be enabled and scoped to the real sensitive objects. The destination has to be outside the reach of the audited principals. Retention has to match the compliance window, often months or years. And someone actually has to review it.

## Segment 5 (outro)

An audit log nobody ever queries is a compliance liability, not a control. Next up: Ledger and Change Tracking, and a real scenario tying TDE, auditing, classification, and tamper-evidence together.
