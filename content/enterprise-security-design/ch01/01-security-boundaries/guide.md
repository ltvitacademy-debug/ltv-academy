# Lesson 1 — Security Boundaries

**Chapter 1 · Designing Security · Lesson 1 of 15**

## What you'll learn

- What a security boundary is, and why an architect has to name them explicitly instead of assuming they're obvious
- The five boundaries a Salesforce architect routinely has to reason about, from the org edge down to a single field
- Why a breach that crosses one boundary doesn't automatically cross the next one
- How this lesson sets up the rest of Chapter 1's vocabulary (least privilege, defense in depth, threat modeling)

## A boundary is a place where trust changes

A **security boundary** is any point in a system where the level of trust changes — where something that was allowed to happen on one side is no longer automatically allowed on the other. Boundaries aren't always walls; they're decision points. Crossing one means a check has to run: is this request, this user, this process actually allowed to be here. A system with no boundaries has no security model at all, because nothing ever asks "should this be allowed?" — everything is just allowed, everywhere, by default.

Enterprise architects are expected to be able to name the boundaries in a system explicitly, because every one of them is a place a control has to be designed, tested, and eventually audited. If you can't list your boundaries, you can't know whether you've actually protected all of them.

## The boundaries inside a Salesforce org

A single Salesforce org has several boundaries nested inside each other, each with a different kind of control guarding it:

- **The org boundary.** Everything outside the org — the public internet, another company's systems, a partner's integration — versus everything inside it. Login, network-based restrictions (login IP ranges, trusted IP ranges), and multi-factor authentication are the controls that guard this boundary. Crossing it means you're now an authenticated session inside the org.
- **The user/session boundary.** Being authenticated into the org doesn't mean you're that user everywhere in the org forever — a session has a defined duration, and actions inside it are still tied back to exactly one authenticated identity for every subsequent check.
- **The object/CRUD boundary.** Can this user's profile or permission set even perform Create, Read, Update, or Delete on this *type* of record at all — an Account, an Opportunity, a custom object? This is checked before anything about a specific record is considered.
- **The record-sharing boundary.** Given that the user can read Accounts in general, can they read *this specific* Account? Org-Wide Defaults, role hierarchy, sharing rules, and manual sharing all operate at this boundary — it's evaluated per record, not per object.
- **The field-level boundary.** Given that the user can read this specific record, are there individual fields on it — a salary, a health status, a credit limit — they still aren't allowed to see? Field-Level Security (and, for the most sensitive fields, Shield Platform Encryption) guards this innermost boundary.

## Crossing one boundary doesn't cross the next one

The reason architects separate these out instead of treating "security" as one blob is that a failure at one boundary should not automatically become a failure at the next one. A phished login credential crosses the org boundary — but if object permissions, sharing rules, and field-level security are all configured correctly, the attacker who gets in still can't read every record in the org, still can't see the encrypted fields, and still can't delete objects their stolen identity's profile was never granted delete rights on. This is the entire point of designing boundaries deliberately rather than relying on just one of them (usually login) to do all the work. A design that only hardens the login screen and configures everything behind it wide open has, in practice, only one boundary — and one boundary that fails is a total failure.

## Key terms

| Term | Meaning |
|---|---|
| Security boundary | A point in a system where the level of trust changes and a check has to run before proceeding |
| Org boundary | The edge between the public internet and an authenticated Salesforce session |
| CRUD (object) boundary | Whether a profile/permission set allows an operation on a record type at all, independent of any specific record |
| Record-sharing boundary | Whether a user can access a specific record, governed by OWD, role hierarchy, and sharing rules |
| Field-level boundary | Whether a user can see a specific field on a record they can otherwise access |

## Lab

A mid-size insurance company's Salesforce org holds Policy records (custom object) with a `Premium_Amount__c` field and a related `Claims_History__c` field holding free text notes about a policyholder's past claims. Write out, boundary by boundary (org, CRUD, record-sharing, field-level), exactly what has to be true for a newly hired claims adjuster to be able to open a specific policyholder's Policy record and see both fields — and separately, what should still block them from seeing a *different* adjuster's book of policyholders even though their profile grants Read on the Policy object in general.

## Check yourself

Can you name the five boundaries from org edge to field level, in order, and say which control (login/IP/MFA, CRUD permission, OWD/role/sharing rule, or field-level security/encryption) guards each one? Can you explain, with your own example, why a compromised login credential doesn't automatically mean every record and field in the org is exposed?
