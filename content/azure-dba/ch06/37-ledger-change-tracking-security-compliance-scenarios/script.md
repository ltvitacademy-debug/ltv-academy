# Script — Ledger, Change Tracking & Security/Compliance Scenarios

## Segment 1 (title)

SQL Auditing writes a log of who did what — but that log itself could theoretically be edited by someone with enough access. Ledger solves a stricter problem: cryptographically proving a table's history hasn't been tampered with, not just recording that it happened.

## Segment 2 (code: ledger)

Every insert, update, and delete against a ledger table is appended to a tamper-evident history, and the database periodically computes a cryptographic digest you can store outside the database and later use to verify nothing was altered — even by someone with sysadmin rights.

## Segment 3 (code: change tracking)

Don't conflate this with Ledger or auditing. Change Tracking answers "which rows changed since I last checked," for synchronization scenarios — lightweight by design, no history of values, no cryptographic proof, not a security feature at all.

## Segment 4 (code: a real compliance scenario)

A healthcare company proving patient records were never altered, that only authorized staff see full SSNs, and that every access is retrievable — needs TDE, classification, masking, auditing, and Ledger together, each answering a different piece of the same compliance question.

## Segment 5 (outro)

Auditing tells you what happened. Ledger proves the record is genuine. Change Tracking just tracks what's new. Chapter 6 is complete — next up, Chapter 7: Monitoring Azure SQL.
