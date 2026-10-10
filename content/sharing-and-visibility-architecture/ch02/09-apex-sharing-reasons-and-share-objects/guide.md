# Lesson 9 — Apex Sharing Reasons and Share Objects

**Chapter 2 · Advanced Sharing · Lesson 9 of 24**

## What you'll learn

- How to define a custom Apex sharing reason on a custom object, and why that setup step still lives in Salesforce Classic
- The naming rules for a sharing reason's label versus its API name
- How a sharing reason is referenced from Apex once it exists
- Why a single record can carry multiple share rows for the same user under different reasons
- The practical limits and prerequisites an architect checks before relying on this mechanism

## Where sharing reasons actually live

Lesson 8 established that Apex managed sharing requires a custom `RowCause` — a label you define rather than one Salesforce ships. That label is called an **Apex sharing reason**, and it is defined declaratively, not in code: from Setup, open the custom object's detail page and use the **Apex Sharing Reasons** related list. This is one of the few remaining pieces of Salesforce configuration that is still only exposed in Salesforce Classic — there is no Lightning Experience equivalent screen, so an architect documenting a build process needs to flag that whoever sets this up will need Classic access (or the Metadata API / Tooling API, which can also create a `SharingReason` component without touching the UI at all). This matters operationally: a declarative build checklist that assumes "everything is in Lightning now" will stall here unless the team knows to switch to Classic or use metadata deployment instead.

Each sharing reason has two parts, same as a custom field: a **label** (what appears in the Reason column on a record's Sharing Detail page, and what a non-technical user sees) and a **name** (the API-facing identifier). The name follows standard Salesforce API naming rules — letters, numbers, and underscores only, must start with a letter, can't end in an underscore or contain two consecutive underscores, and must be unique within the org. Salesforce automatically appends `__c` to the name, so a reason named `Escalated_Reviewer` becomes `Escalated_Reviewer__c` in code.

## Referencing a reason from Apex

Once a reason exists, code references it off the object's `Schema` describe for the share object, not as a plain string:

```apex
shareRow.RowCause = Schema.Invoice__Share.RowCause.Escalated_Reviewer__c;
```

Using the schema token rather than a hardcoded string buys compile-time safety: if the reason is ever renamed or deleted, the reference breaks at compile time instead of failing silently at runtime with a bad string value.

## Why multiple reasons on one record matters

A single user or group can hold more than one share row on the same record, as long as each row has a different `RowCause`. This is deliberate, and it is one of the more useful architectural properties of Apex managed sharing: it lets you track *independent* justifications for access that happen to land on the same person. A compliance reviewer might get `Edit` access under reason `Escalated_Reviewer__c` because of a status transition, and separately get `Read` access under reason `Audit_Sample__c` because the record was pulled into a quarterly audit sample — two business processes, two reasons, two rows, each removable independently without disturbing the other. If you collapsed this into a single generic "Apex" reason, you'd lose the ability to answer "why does this person have access" with anything more specific than "some code did it," and you couldn't safely revoke one grant without accidentally also removing the other.

## Constraints to check before you rely on this

A few hard constraints shape where this pattern can and can't be used. Apex sharing reasons can only be defined on **custom objects** — there is no equivalent for standard objects like Opportunity or Case; sharing those programmatically still uses Apex managed sharing, but under the standard causes the platform already defines (or indirectly, through a custom object that relates to them). The object's org-wide default also can't already be the most permissive level for its type (Public Read/Write for a custom object) — if it is, any share row, Apex-managed or otherwise, is redundant, because OWD already grants that access to everyone. And creating or modifying the Apex managed sharing rows themselves at runtime still requires the running context to have `Modify All Data` — ordinarily satisfied by running the sharing logic in a `without sharing` class or a system context like a trigger handler, rather than depending on each individual user's permissions.

## Key terms

| Term | Meaning |
|---|---|
| Apex sharing reason | A custom RowCause value defined on a custom object's detail page, used to label Apex managed sharing |
| Label vs. name | The user-facing Reason text vs. the API-facing `__c` identifier used in code |
| Schema token reference | Referencing a reason as `Schema.Object__Share.RowCause.Reason__c` instead of a hardcoded string |
| Independent reason rows | Multiple share rows for the same user/group on one record, each under a different reason, removable independently |

## Lab

On the `Project__c` object from Lesson 8's lab, open its detail page in Salesforce Classic (or create the reason via the Tooling API if Classic isn't available in your sandbox) and add two Apex sharing reasons: `Escalated_Reviewer` and `Audit_Sample`. Write anonymous Apex that grants the same user `Edit` access under `Escalated_Reviewer__c` and separately `Read` access under `Audit_Sample__c` on the same record. Query the `Project__Share` object for that record and confirm two distinct rows exist for the same `UserOrGroupId` with different `RowCause` values, then delete only the `Audit_Sample__c` row and confirm the `Escalated_Reviewer__c` row is untouched.

## Check yourself

Why can a single user end up with two separate share rows on the same record instead of one row with a combined access level? What's the practical cost of defining Apex sharing reasons only being available through Salesforce Classic (or the Metadata/Tooling API), and how would you account for that in a deployment runbook?
