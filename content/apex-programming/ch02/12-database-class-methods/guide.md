# Lesson 12 — Database Class Methods

**Chapter 2 · Working with Data in Apex · Lesson 12 of 43**

## What you'll learn

- Why `Database.insert`/`update`/`delete`/`upsert`/`merge` exist alongside the plain DML statements
- The `allOrNone` parameter and what partial success means
- Reading a `Database.SaveResult[]` with `isSuccess()`, `getId()`, and `getErrors()`
- The `Database.Error` methods: `getMessage()`, `getStatusCode()`, `getFields()`
- When to reach for `Database.*` methods instead of plain DML statements

## Two ways to do DML

Lesson 11 covered the plain DML statements (`insert`, `update`, …), which are
all-or-nothing: one bad record throws a `DmlException` and nothing in the
statement saves. The `Database` class gives you the same operations as
**static methods** — `Database.insert()`, `Database.update()`,
`Database.delete()`, `Database.upsert()`, `Database.merge()` — with one key
difference: an optional `allOrNone` Boolean parameter.

```apex
List<Account> accts = new List<Account>{
    new Account(Name = 'Good Co'),
    new Account() // missing required Name — will fail
};

Database.SaveResult[] results = Database.insert(accts, false);
```

## allOrNone and partial success

- `allOrNone = true` (the default if you omit the parameter) behaves like
  plain DML: any failure throws a `DmlException` for the whole batch.
- `allOrNone = false` processes every record independently. Records that
  pass validation are committed; records that fail are **not** committed,
  but no exception is thrown. Instead, each outcome comes back in a result
  array you inspect yourself.

```apex
Database.SaveResult[] results = Database.insert(accts, false);

for (Database.SaveResult sr : results) {
    if (sr.isSuccess()) {
        System.debug('Inserted Id: ' + sr.getId());
    } else {
        for (Database.Error err : sr.getErrors()) {
            System.debug('Failed: ' + err.getStatusCode() + ' - ' + err.getMessage()
                + ' on fields ' + err.getFields());
        }
    }
}
```

The result array lines up positionally with the input list: `results[0]`
reports on `accts[0]`, `results[1]` on `accts[1]`, and so on.

## The result classes

Each `Database.*` method has its own result type, but they share the same
shape:

| Method | Returns |
|---|---|
| `Database.insert` / `Database.update` | `Database.SaveResult[]` |
| `Database.upsert` | `Database.UpsertResult[]` (adds `isCreated()`) |
| `Database.delete` | `Database.DeleteResult[]` |
| `Database.merge` | `Database.MergeResult[]` (adds `getMergedRecordIds()`, `getUpdatedRelatedIds()`) |

All of them expose `isSuccess()` and `getErrors()`, and `getId()` returns the
ID of the record the result corresponds to. `Database.UpsertResult` adds
`isCreated()`, which tells you whether that element was a brand-new insert
or an update to an existing record:

```apex
Database.UpsertResult[] upResults = Database.upsert(importedContacts, Contact.Legacy_System_Id__c, false);
for (Database.UpsertResult ur : upResults) {
    if (ur.isSuccess() && ur.isCreated()) {
        System.debug('Newly created: ' + ur.getId());
    }
}
```

## Database.Error

Every failed result carries one or more `Database.Error` objects:

- `getMessage()` — human-readable description of what went wrong
- `getStatusCode()` — a `StatusCode` enum value categorizing the error
- `getFields()` — the field name(s), if any, that caused the error

## Choosing plain DML vs. Database methods

Use plain DML statements when any failure really should stop everything (for
example, a critical single-record save). Use `Database.*` methods with
`allOrNone = false` when you're processing a batch of independent records —
like a data import — and want the good records to save even if a few rows
are bad.

## Key terms

| Term | Meaning |
|---|---|
| `allOrNone` | Boolean parameter on `Database.*` methods controlling all-or-nothing vs. partial success |
| `Database.SaveResult` | Per-record outcome of `Database.insert`/`Database.update` |
| `Database.Error` | Describes one failure: message, status code, and affected fields |
| Partial success | Some records in a batch commit while others fail, with no exception thrown |

## Lab

Run this in Execute Anonymous to see partial success in action:

```apex
List<Account> batch = new List<Account>{
    new Account(Name = 'Partial Success Co'),
    new Account(Name = null) // will fail: Name is required
};

Database.SaveResult[] results = Database.insert(batch, false);
for (Integer i = 0; i < results.size(); i++) {
    if (results[i].isSuccess()) {
        System.debug('Row ' + i + ' saved: ' + results[i].getId());
    } else {
        System.debug('Row ' + i + ' failed: ' + results[i].getErrors()[0].getMessage());
    }
}
```

Confirm in the debug log that one account saved and the other reported an
error, with no exception halting the script.

## Check yourself

What is the difference in behavior between `Database.insert(accts)` (no
second argument) and `Database.insert(accts, false)`? Which Database result
class is the only one with an `isCreated()` method, and why does that method
exist only there?
