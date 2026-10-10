# Lesson 31 — Apex Security: Sharing and CRUD/FLS

**Chapter 4 · Governor Limits and Design · Lesson 31 of 43**

## What you'll learn

- Why Apex runs in "system mode" by default, and what that actually means
- The `with sharing`, `without sharing`, and `inherited sharing` class keywords
- Why sharing enforcement and CRUD/FLS (field-level security) enforcement are two completely separate concerns
- How to actually enforce CRUD/FLS from Apex: `WITH SECURITY_ENFORCED`, `WITH USER_MODE`, and `Security.stripInaccessible`
- Why this matters more in a REST service or a controller than in most triggers

## System mode, by default

Unless told otherwise, Apex code runs in **system mode**: it can read and write any record and any field in the org, regardless of the running user's actual permissions, sharing rules, field-level security, or object-level CRUD permissions. This is intentional — a lot of legitimate automation (a trigger enforcing a business rule, a scheduled job doing cleanup) genuinely needs to act across data the running user might not personally have access to. But it also means that any Apex code exposed to end users — a Visualforce/LWC controller, an Apex REST service, anything invoked directly by a user action — can accidentally expose or modify data that user shouldn't be able to see or touch, unless the developer deliberately adds enforcement.

## Sharing keywords control record-level sharing only

Three class-level keywords control whether a class respects the org's sharing rules (role hierarchy, sharing rules, manual sharing) for the running user:

```apex
public with sharing class AccountService {
    // runs with the current user's sharing rules enforced
}

public without sharing class DataCleanupService {
    // explicitly ignores sharing rules — e.g. for a scheduled admin job
}

public inherited sharing class AccountHelper {
    // runs in whatever sharing mode the calling context used
}
```

`with sharing` enforces the running user's sharing rules for that class's execution. `without sharing` explicitly turns sharing enforcement off — useful when, for example, a class called from a `with sharing` context genuinely needs unrestricted access for a specific reason. `inherited sharing` runs in the sharing mode of whatever called it; when used as the entry point for something like an Apex REST service or an Aura/LWC controller, it behaves as `with sharing`. Salesforce's own guidance treats leaving the keyword off entirely — relying on indeterminate, caller-dependent behavior without stating intent — as something to avoid, since it makes a class's actual security behavior unclear just from reading its declaration.

## Sharing keywords do NOT enforce CRUD or field-level security

This is the detail that catches people off guard: declaring a class `with sharing` only controls **which records** a user can see based on sharing rules. It does **not** check whether that user actually has **read/create/edit/delete (CRUD)** permission on the object, or **field-level security (FLS)** permission on individual fields. A `with sharing` class can still happily return a field the running user's profile has no access to, because sharing and CRUD/FLS are enforced through entirely separate mechanisms.

## Enforcing CRUD/FLS explicitly

Because system mode skips CRUD/FLS by default, Apex gives you a few explicit ways to enforce it:

```apex
// Option 1: WITH SECURITY_ENFORCED on a SOQL query — throws an exception if
// the running user lacks access to any field/object referenced in the query
List<Account> accts = [SELECT Id, Name, AnnualRevenue FROM Account WHERE Industry = 'Technology' WITH SECURITY_ENFORCED];

// Option 2: WITH USER_MODE — enforces sharing rules, CRUD, and FLS together,
// without throwing — inaccessible fields/records are simply omitted
List<Account> acctsUserMode = [SELECT Id, Name, AnnualRevenue FROM Account WITH USER_MODE];

// Option 3: Security.stripInaccessible — strip fields/records the user can't
// access from an already-retrieved list before using or returning it
SObjectAccessDecision decision = Security.stripInaccessible(AccessType.READABLE, accts);
List<Account> safeAccounts = (List<Account>) decision.getRecords();
```

`WITH SECURITY_ENFORCED` and `WITH USER_MODE` are SOQL clauses, checked at query time; `Security.stripInaccessible` works on records you already have in memory, which is useful before serializing a result out to an external caller.

## Why this matters more for user-facing code

A trigger handler usually processes records the current automation is already supposed to touch, often with `without sharing` deliberately chosen for backend consistency. An Apex REST service or an `@AuraEnabled` controller method, by contrast, is directly invoked by a specific logged-in user — exactly the situation where skipping CRUD/FLS checks can let that user read or modify data their actual permissions were never supposed to allow.

## Key terms

| Term | Meaning |
|---|---|
| System mode | Apex's default execution mode, with full access regardless of the running user's permissions |
| `with sharing` / `without sharing` / `inherited sharing` | Class-level keywords controlling record-level sharing-rule enforcement only |
| CRUD | Object-level Create/Read/Update/Delete permission, enforced separately from sharing |
| FLS | Field-Level Security — per-field access permission, enforced separately from sharing |
| `WITH SECURITY_ENFORCED` / `WITH USER_MODE` | SOQL clauses that enforce CRUD/FLS (and, for USER_MODE, sharing) for the running user |
| `Security.stripInaccessible` | Strips fields/records the running user can't access from an in-memory list of sObjects |

## Lab

Create a Visualforce-style or Apex REST-style scenario in a Developer Edition org: write a small `@AuraEnabled` method (or Apex REST `@HttpGet` method) that queries Accounts, first without any CRUD/FLS enforcement, then rewritten using `WITH USER_MODE`. Log in as (or simulate) a user whose profile lacks access to one of the queried fields, and compare what each version actually returns.

## Check yourself

Can you explain why a `with sharing` class can still leak a field the running user's profile doesn't have access to? What's the practical difference between `WITH SECURITY_ENFORCED` throwing an exception versus `WITH USER_MODE` silently omitting inaccessible data?
