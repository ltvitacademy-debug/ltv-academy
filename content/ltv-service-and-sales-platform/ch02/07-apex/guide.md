# Lesson 7 — Apex

**Chapter 2 · Build: Automation and Code · Lesson 7 of 25**

## What you'll learn

- What Apex is and the specific situations on this platform where it's the right tool, per Lesson 2's rule
- Apex's core syntax: classes, methods, access modifiers, collections, and `with sharing`
- Your first real class for this capstone: `ServiceContractEvaluator`
- Governor limits — what they are, why they exist, and the specific numbers you need to design around

## What Apex is, concretely

**Apex** is Salesforce's strongly-typed, object-oriented programming language, syntactically close to Java, that runs on Salesforce's servers (not in the browser) against your org's data and metadata. Where Flow is reached for first per Lesson 2, Apex is for logic that needs full programmatic control: complex conditional logic across multiple objects, callouts to external systems, and anything that has to behave correctly and testably under bulk data operations, not just one record clicked through the UI.

## A first Apex class: evaluating contract coverage

Solstice needs a reusable piece of logic — "is this appliance covered, and up to what amount?" — that both the Lesson 9 trigger and, later, a Lightning Web Component will call. A standalone class with a static method is the right shape for that:

```apex
public with sharing class ServiceContractEvaluator {

    // Returns the active Service_Contract__c covering the given Asset,
    // or null if no active contract exists.
    public static Service_Contract__c getActiveContract(Id assetId) {
        List<Service_Contract__c> contracts = [
            SELECT Id, Coverage_Limit__c, Start_Date__c, End_Date__c
            FROM Service_Contract__c
            WHERE Asset__c = :assetId
              AND Start_Date__c <= :Date.today()
              AND End_Date__c >= :Date.today()
            ORDER BY End_Date__c DESC
            LIMIT 1
        ];
        return contracts.isEmpty() ? null : contracts[0];
    }

    // Returns true if claimAmount is within the active contract's coverage limit.
    public static Boolean isClaimCovered(Id assetId, Decimal claimAmount) {
        Service_Contract__c contract = getActiveContract(assetId);
        if (contract == null) {
            return false;
        }
        return claimAmount <= contract.Coverage_Limit__c;
    }
}
```

A few deliberate choices here matter beyond the syntax. `public with sharing` means this class enforces the running user's sharing rules and record-level access when it queries — the opposite, `without sharing`, would let the class see every `Service_Contract__c` regardless of who's running it, which is the wrong default for a class any user-facing automation might call. The method takes an `Id` and a `Decimal` rather than a whole `Case` or `Warranty_Claim__c` record, which keeps it reusable by anything that has an Asset Id and an amount, not just one specific trigger.

## Collections and bulk-safe thinking

Apex gives you three core collection types — `List`, `Set`, and `Map` — and using them correctly is the difference between code that works on one record and code that works on a bulk data load of thousands. `getActiveContract` above queries by a single Id because it's meant to be called once per record it's evaluating, but a caller that needs to evaluate many Assets at once should collect those Ids into a `Set<Id>` and run one query filtering `WHERE Asset__c IN :assetIds`, rather than calling this method in a loop — a pattern you'll apply directly in Lesson 9's trigger, where "don't query inside a loop" stops being a style note and starts being the difference between a trigger that works and one that fails on a 200-record import.

## Governor limits: why they exist and what they are

Apex runs on shared, multi-tenant infrastructure — your code, every other customer's code, and the platform itself share the same servers — so Salesforce enforces **governor limits**: hard caps on resource usage per transaction that exist specifically to stop one runaway script from degrading the platform for everyone else. The limits that matter most for this capstone, per Salesforce's current Apex Developer Guide: up to **100 SOQL queries in a synchronous transaction (200 in an asynchronous one)**, a maximum of **50,000 records retrieved by SOQL** across the whole transaction, up to **150 DML statements**, and a maximum of **100 callouts per transaction** with a combined callout timeout of **120 seconds**. Hit any of these and Apex throws a `LimitException` that stops the transaction — which is exactly why "query once, outside the loop" is a governor-limit requirement, not just good style.

## Key terms

| Term | Meaning |
|---|---|
| Apex | Salesforce's strongly-typed, server-side, object-oriented programming language |
| `with sharing` / `without sharing` | Class-level keyword controlling whether the class enforces the running user's record-level sharing |
| Bulkification | Writing code that handles many records in one transaction without exceeding governor limits |
| Governor limit | A platform-enforced per-transaction cap on resource usage (queries, DML, callouts, etc.) |
| `LimitException` | The runtime exception thrown when code exceeds a governor limit |

## Lab

Create `ServiceContractEvaluator` as shown above in your scratch org. Then write a short Anonymous Apex script in Developer Console that creates a test `Service_Contract__c` with a `Coverage_Limit__c` of 500, and calls `isClaimCovered` with a claim amount of 400 (should return true) and 600 (should return false). Confirm both results in the debug log.

## Check yourself

- Why does `ServiceContractEvaluator` use `with sharing` instead of `without sharing`?
- Why does `isClaimCovered` take an `Id` and a `Decimal` instead of a whole `Warranty_Claim__c` record?
- Name two of the governor limits covered in this lesson and what each one caps.
