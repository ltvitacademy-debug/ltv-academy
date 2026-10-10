# Lesson 11 — Handling History and Audit Fields

**Chapter 2 · Designing the Migration · Lesson 11 of 18**

## What you'll learn

- Why migrating a record's real creation/modification history is harder than it sounds
- How the audit-field override permission works, and its key limitation
- The real limits on Salesforce's standard Field History Tracking
- How to decide, deliberately, whether historical audit data is even worth migrating

## The question nobody asks until it's too late

Every Salesforce record automatically carries four system audit fields — `CreatedDate`, `CreatedById`, `LastModifiedDate`, and `LastModifiedById`. During an ordinary data load, Salesforce sets all four itself, stamped with the load's actual date and the loading user's Id — which means that, left alone, every single migrated record would appear to have been "created" on migration day, by whichever service account ran the load, regardless of how old the record actually is in the real world. For a lot of migrations that's a perfectly acceptable outcome. For others — where the business genuinely needs reporting or audit trails that reflect real original creation dates — it's a design decision this chapter needs to make explicitly, not one that should be discovered as a surprise after go-live.

## Overriding audit fields on load

Salesforce provides a way to override this default: a system permission (commonly surfaced as "Set Audit Fields upon Record Creation," granted through a permission set rather than available directly on standard profiles, including System Administrator) that, once assigned, lets a migration insert specify real values for `CreatedDate` and the other audit fields instead of accepting whatever the load would otherwise stamp. This is genuinely useful for preserving a record's real history — but it comes with an important limitation worth designing around: the override generally only works on an **insert**, not on a later update to an already-existing record. That has a direct sequencing consequence: if a record needs its real historical `CreatedDate` preserved, that value has to be set at the moment the record is first created in the target org, not patched in afterward. Salesforce's own guidance is to enable this permission only for the duration of the migration and disable it again once the project is done — it's a migration tool, not a standing feature of the org.

## Field History Tracking has its own hard limits

A separate question from "what did the record's own audit fields say" is "what changed on this record over its life, and when" — which in Salesforce is **Field History Tracking**. Standard Field History Tracking is capped at 20 tracked fields per standard or custom object (Tasks and Events are capped lower, at 6 fields each), with history retained 18 months in the Salesforce UI and up to 24 months through the API. These are hard platform limits, not configuration choices — an object that needs more than 20 fields tracked, or history retained longer than those windows, needs the separate, paid **Field Audit Trail** add-on, which raises the per-object field cap to up to 200 fields and allows a custom retention policy (set in months or years, including indefinite storage). A migration project inheriting a legacy system's rich field-level change history essentially never has a way to recreate that full history inside standard Field History Tracking after the fact — the feature tracks changes going forward from when tracking is turned on, it does not retroactively populate history for changes that happened before migration.

## Deciding whether history is worth migrating at all

Given those constraints, this lesson's real design decision isn't a technical one so much as a business one: is the cost and complexity of trying to preserve real creation dates and historical field-level change logs actually worth it for this migration, or is "migrated on cutover date, with the audit trail starting fresh from there" an acceptable, simpler outcome? Reasonable answers differ by object and by business need — a Contract object where legal/compliance genuinely cares about original signing dates is a very different case from an old marketing Campaign object where nobody will ever look at its exact creation timestamp again. Whatever the business decides, this is a decision to make and document in Chapter 2, not something to leave unresolved and improvise during the actual load.

## Key terms

| Term | Meaning |
|---|---|
| Audit fields | CreatedDate, CreatedById, LastModifiedDate, LastModifiedById — system fields normally set automatically by Salesforce |
| Audit field override | A permission allowing a migration insert to set real historical values for audit fields instead of the load's own timestamp |
| Field History Tracking | Salesforce's feature for tracking field-level changes over time, capped at 20 tracked fields per object (6 for Tasks/Events), 18/24-month retention |
| Field Audit Trail | A paid add-on raising the field-tracking cap to 200 fields and allowing custom, longer retention policies |

## Lab

A legal/compliance team insists that migrated Contract records must show their true original signing date in CreatedDate, since this feeds a regulatory audit report. Separately, the same team asks whether the legacy system's full fifteen-year field-level change history for those contracts can be recreated in Salesforce's Field History Tracking after migration. Write a short response explaining what's achievable for each request, including the one sequencing constraint on the audit-field override and the one hard limitation on recreating historical field-level changes after the fact.

## Check yourself

Can you explain why the audit-field override's insert-only limitation has a direct consequence for how (and when) historical CreatedDate values have to be loaded? Can you state Field History Tracking's standard field-count and retention limits, and explain why they make it impossible to simply "backfill" a legacy system's full change history after migration?
