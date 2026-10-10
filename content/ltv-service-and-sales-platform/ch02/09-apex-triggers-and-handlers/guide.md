# Lesson 9 — Apex Triggers and Handlers

**Chapter 2 · Build: Automation and Code · Lesson 9 of 25**

## What you'll learn

- The one-trigger-per-object pattern and why this capstone enforces it
- Trigger context variables and the order a save actually runs in
- The full `WarrantyClaimTrigger` + `WarrantyClaimTriggerHandler` pair for this platform
- Why the trigger body itself should contain almost no logic at all

## One trigger per object, delegated to a handler class

A Salesforce org can technically have multiple triggers on the same object, but when it does, the order those triggers fire in relative to each other isn't something you control or should rely on. The standard, and this capstone's required, pattern is **one trigger per object**, with the trigger itself doing nothing but detecting which context it's in and handing off to a separate **handler class**:

```apex
trigger WarrantyClaimTrigger on Warranty_Claim__c (before insert, before update, after insert) {
    WarrantyClaimTriggerHandler handler = new WarrantyClaimTriggerHandler();

    if (Trigger.isBefore && Trigger.isInsert) {
        handler.beforeInsert(Trigger.new);
    }
    if (Trigger.isBefore && Trigger.isUpdate) {
        handler.beforeUpdate(Trigger.new, Trigger.oldMap);
    }
    if (Trigger.isAfter && Trigger.isInsert) {
        handler.afterInsert(Trigger.new);
    }
}
```

Keeping the trigger this thin matters for a concrete reason: trigger bodies are hard to unit test in isolation and hard to read at a glance, while a plain Apex class with ordinary methods is both. Every bit of real logic — validation, the coverage check, queuing the manufacturer callout — lives in `WarrantyClaimTriggerHandler`, never in the trigger file itself.

## Trigger context variables

`Trigger.new` is the list of records in their about-to-be-saved state (writable in `before` triggers, read-only in `after`). `Trigger.old` is the previous state, available on update/delete. `Trigger.oldMap` and `Trigger.newMap` give you `Id`-keyed maps of the same records, which is how you efficiently look up a specific record's prior values during a bulk update instead of looping to find it. `Trigger.isBefore` / `isAfter` / `isInsert` / `isUpdate` / `isDelete` tell you which of the context combinations fired this specific execution.

## The handler: validating claims against contract coverage

```apex
public with sharing class WarrantyClaimTriggerHandler {

    public void beforeInsert(List<Warranty_Claim__c> newClaims) {
        for (Warranty_Claim__c claim : newClaims) {
            if (claim.Asset__c == null) {
                claim.addError('A Warranty Claim must reference an Asset.');
                continue;
            }
            if (!ServiceContractEvaluator.isClaimCovered(claim.Asset__c, claim.Claim_Amount__c)) {
                claim.addError(
                    'Claim amount exceeds the active service contract coverage limit, or no active contract exists.'
                );
            }
        }
    }

    public void afterInsert(List<Warranty_Claim__c> newClaims) {
        Set<Id> claimIds = new Set<Id>();
        for (Warranty_Claim__c claim : newClaims) {
            if (claim.Claim_Status__c == 'Submitted') {
                claimIds.add(claim.Id);
            }
        }
        if (!claimIds.isEmpty()) {
            // Callouts can't run synchronously from a trigger context,
            // so submission is handed to a Queueable job -- see Lesson 11.
            System.enqueueJob(new WarrantyClaimSubmissionQueueable(claimIds));
        }
    }
}
```

Two design decisions here directly reuse earlier lessons. The coverage check reuses `ServiceContractEvaluator.isClaimCovered` from Lesson 7 instead of duplicating that query logic in the trigger handler — the same reason that method took an `Id` and a `Decimal` instead of a whole record. And `addError()` is how a `before` trigger blocks a save with a user-facing message, without throwing a raw unhandled exception; it rolls back the whole operation for that record and surfaces the message in the UI exactly like a validation rule would.

## Why the callout moves to a Queueable

The `afterInsert` method doesn't call the manufacturer's API directly — Apex explicitly disallows synchronous HTTP callouts from trigger context, because a trigger runs inside the same transaction as the DML that fired it, and a callout can take seconds, which would hold that transaction (and any lock it holds) open far too long. Enqueuing a Queueable job hands the callout to a separate, asynchronous transaction instead. Lesson 11 covers Queueable Apex in full; this lesson's job is just to recognize *why* the trigger can't do the callout itself.

## Order of execution: where this trigger fits

On a save, Salesforce runs before-triggers, then system and custom validation rules, then duplicate rules, then the database write (not yet committed), then after-triggers, then assignment rules, then (legacy) workflow rules, then other Flow automation, before finally committing. `WarrantyClaimTrigger`'s `beforeInsert` runs before any validation rule on the object, which is exactly why it uses `addError()` rather than assuming a validation rule will catch an invalid claim first — at that point in the order of execution, no validation rule has run yet.

## Key terms

| Term | Meaning |
|---|---|
| Trigger handler pattern | Keeping trigger bodies thin and delegating all logic to a separate class |
| `Trigger.new` / `Trigger.oldMap` | Context variables giving the new and previous (Id-mapped) record states |
| `addError()` | Method that blocks a save on a specific record with a user-facing error message |
| Order of execution | The fixed sequence (before triggers → validation rules → duplicate rules → save → after triggers → workflow → Flow → commit) a save runs through |

## Lab

Create `WarrantyClaimTrigger` and `WarrantyClaimTriggerHandler` as shown above (stub out `WarrantyClaimSubmissionQueueable` with an empty class for now — Lesson 11 builds it for real). In your scratch org, insert a `Warranty_Claim__c` with a claim amount above an active contract's coverage limit and confirm the save is blocked with your custom error message.

## Check yourself

- Why does this capstone require exactly one trigger per object, delegating logic to a handler class?
- What does `Trigger.oldMap` give you that `Trigger.old` doesn't?
- Why can't `WarrantyClaimTrigger` call the manufacturer's REST API directly from its `afterInsert` method?
