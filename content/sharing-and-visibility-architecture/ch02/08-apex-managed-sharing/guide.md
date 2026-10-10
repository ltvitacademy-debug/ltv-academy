# Lesson 8 — Apex Managed Sharing

**Chapter 2 · Advanced Sharing · Lesson 8 of 24**

## What you'll learn

- Why Apex managed sharing exists — what it can express that sharing rules and OWD cannot
- The `__Share` object, its `RowCause`, `AccessLevel`, and `UserOrGroupId` fields
- Who can create Apex managed sharing, and why the org-wide default matters
- How Apex managed sharing behaves differently from manual and rule-based sharing when ownership changes
- How to write and insert a share record safely in bulk Apex

## Why reach for Apex at all

Chapter 1 covered sharing rules: criteria-based or owner-based grants that widen access beyond org-wide defaults using declarative logic. Sharing rules are powerful, but their condition language is limited to what the rule-criteria UI exposes — field values on the record, or the owner's role/group membership. A Technical Architect reaches for **Apex managed sharing** the moment the sharing logic needs something a point-and-click rule cannot express: a calculation across related records, a lookup against an external system, a multi-object traversal, or logic that changes based on a status transition rather than a static field value. If you can't phrase the grant as "share when field X equals Y," it's an Apex managed sharing problem, not a sharing-rule problem.

## The share object

Every object that supports row-level sharing has a companion **share object**. For standard objects it's named `<Object>Share` (e.g., `OpportunityShare`); for custom objects it's `<Object>__Share` (e.g., `Invoice__Share`). Each share record is a grant of access to one user or group on one record, and it carries three fields that matter:

- **`UserOrGroupId`** — who receives the access (a User, or any group-like Id: public group, role, or role-and-subordinates).
- **`AccessLevel`** (named `<Object>AccessLevel` on the share row, e.g. `OpportunityAccessLevel`) — `Read` or `Edit`. `All` exists internally but can't be granted through a share insert.
- **`RowCause`** — why the access exists. This is the field that separates Apex managed sharing from the other kinds.

`RowCause` can be `Owner` (the implicit row created by ownership), `Manual` (a user-managed share), a sharing-rule-generated cause, or a **custom Apex sharing reason** you define on the object. Only rows with an Apex-defined `RowCause` are Apex managed sharing in the strict sense — and critically, those rows can only be inserted, updated, or deleted by code running with `Modify All Data`, not by the record owner clicking Share. That's the architectural guarantee: once your trigger or batch job grants access for reason `Escalated_Reviewer__c`, an end user cannot revoke or duplicate it through the UI the way they could a manual share.

## A persistence property that matters for design

Manual sharing is deleted automatically if the record's owner changes, because the platform assumes the original owner's manual grants may no longer make sense under new ownership. Apex managed sharing does **not** get cleared on an ownership change — it persists until your code removes it. This is a deliberate design lever: if a grant represents a durable business fact ("this partner firm is permanently on this account's deal team") rather than a transient delegation from one owner, model it as Apex managed sharing so a reassignment doesn't silently strip access your process depends on.

## Writing the share insert

```apex
// Example on a custom object; standard objects follow the same pattern (e.g. OpportunityShare)
Invoice__Share shareRow = new Invoice__Share();
shareRow.ParentId           = invoiceId;
shareRow.UserOrGroupId      = reviewerQueueId;
shareRow.AccessLevel        = 'Edit';
shareRow.RowCause           = Schema.Invoice__Share.RowCause.Escalated_Reviewer__c;

Database.SaveResult result = Database.insert(shareRow, false);
if (!result.isSuccess()) {
    for (Database.Error err : result.getErrors()) {
        System.debug('Share insert failed: ' + err.getStatusCode() + ' ' + err.getMessage());
    }
}
```

Two things an architect checks before this code ships: the object's org-wide default must **not** already be the most permissive level (Public Read/Write for a custom object) — if it is, a share row is a no-op, because everyone already has that access implicitly. And the insert must run in bulk-safe form — `Database.insert(list, false)` with partial-success handling — because a `DuplicateRowError` (the same user/group already has an equal-or-higher grant on that record under a different cause) will otherwise throw and roll back an entire batch. Always use the allOrNothing-false form plus `SaveResult` inspection when writing sharing logic that touches more than one record.

## Key terms

| Term | Meaning |
|---|---|
| Share object | The companion object (`__Share` / `Share`) that stores one access grant per row |
| RowCause | The field that records why a share row exists — owner, manual, rule, or a custom Apex reason |
| AccessLevel | `Read` or `Edit` granted by the share row; `All` is owner-only and can't be inserted |
| Apex managed sharing | Share rows created by code under a custom `RowCause`, removable only by code with Modify All Data |
| DuplicateRowError | The insert error thrown when a user/group already holds an equal-or-greater grant under another cause |

## Lab

In a scratch or Developer org, create a custom object `Project__c` with an org-wide default of Private. Define a custom Apex sharing reason on it (see Lesson 9 for the exact setup screen), then write and execute anonymous Apex that inserts a `Project__Share` row granting `Edit` access to a public group under that custom `RowCause`. Confirm in the record's Sharing detail page that the row appears with your reason as the label. Then reassign the record's owner and confirm the share row survives — contrast that with a manual share on the same record, which would have been deleted by the reassignment.

## Check yourself

What specific kind of sharing requirement can Apex managed sharing express that a criteria-based sharing rule cannot? Why does Apex managed sharing survive an owner change while manual sharing does not, and why does that distinction matter when you're deciding which mechanism to use for a given business rule?
