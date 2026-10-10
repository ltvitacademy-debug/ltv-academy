# Lesson 11 — DML Statements

**Chapter 2 · Working with Data in Apex · Lesson 11 of 43**

## What you'll learn

- The six DML statements: `insert`, `update`, `upsert`, `delete`, `undelete`, `merge`
- Running DML directly on a single sObject or on a list of sObjects
- Why `upsert` needs an external ID (or the record's own `Id`) to decide insert vs. update
- What `merge` can and can't do, and which standard objects support it
- That a failed DML statement throws a `DmlException` you must handle

## insert, update, and delete

The three most common DML statements work directly on sObjects or lists of
sObjects, the same way the SQL `INSERT`, `UPDATE`, and `DELETE` statements
work on rows:

```apex
Account acct = new Account(Name = 'Acme Rockets');
insert acct;

acct.Industry = 'Aerospace';
update acct;

delete acct;
```

Each statement also accepts a `List` of sObjects, and operating on a list in
one DML call is far more efficient than looping and calling DML once per
record — this matters once you reach governor limits in Chapter 4:

```apex
List<Contact> newContacts = new List<Contact>{
    new Contact(LastName = 'Ripley', Email = 'ripley@example.com'),
    new Contact(LastName = 'Hicks', Email = 'hicks@example.com')
};
insert newContacts;
```

After `insert`, Salesforce populates the `Id` field on each sObject in the
list, so `newContacts[0].Id` is now set.

## undelete

`undelete` restores records out of the Recycle Bin within the retention
window, using the `Id` of the deleted record:

```apex
delete acct;
undelete acct;
```

## upsert

`upsert` either inserts a new record or updates an existing one, depending on
whether a match is found. By default it matches on the record's own `Id`
field. You can instead pass a specific field — typically a custom **external
ID** field — as a second argument so unmatched values insert and matched
values update:

```apex
List<Contact> importedContacts = new List<Contact>{
    new Contact(LastName = 'Vasquez', Legacy_System_Id__c = 'LS-1001')
};
upsert importedContacts Legacy_System_Id__c;
```

If the external ID value matches more than one existing record, that record
is reported as an error rather than upserted.

## merge

`merge` combines up to three duplicate records of the same type into one
master record: it reassigns related child records (like Contacts on an
Account) to the master, then deletes the duplicates. `merge` is only
available for **Account, Contact, Case, and Lead**:

```apex
Account master = [SELECT Id FROM Account WHERE Name = 'Acme Rockets' LIMIT 1];
Account duplicate = [SELECT Id FROM Account WHERE Name = 'Acme Rockets Inc' LIMIT 1];
merge master duplicate;
```

## What happens when DML fails

A DML statement (as opposed to a `Database.*` method, covered next lesson)
is **all-or-nothing**: if any record in the operation fails validation — a
required field is missing, a validation rule fails, a trigger throws — the
entire statement throws a `System.DmlException` and none of the records in
that statement are saved. Always wrap DML you don't fully control in a
try/catch:

```apex
try {
    insert new Account(); // missing required Name field
} catch (DmlException e) {
    System.debug('Insert failed: ' + e.getMessage());
}
```

Chapter 2's exception-handling lessons (15–17) cover catching and reporting
on `DmlException` in depth, including how to inspect which record and field
caused the failure.

## Key terms

| Term | Meaning |
|---|---|
| DML statement | `insert`, `update`, `upsert`, `delete`, `undelete`, or `merge`, run directly on sObjects |
| External ID | A field used by `upsert` to decide whether a record is new or existing |
| `merge` | Combines up to three duplicate Account/Contact/Case/Lead records into one |
| `DmlException` | Thrown when any record in a DML statement fails and the whole statement is rolled back |

## Lab

In Execute Anonymous, run this end-to-end sequence against Account/Contact:

```apex
Account a = new Account(Name = 'Lab Test Co');
insert a;

Contact c = new Contact(LastName = 'Test', AccountId = a.Id);
insert c;

a.Industry = 'Education';
update a;

List<Contact> toUpsert = new List<Contact>{
    new Contact(Id = c.Id, Title = 'Lab Contact')
};
upsert toUpsert;

delete c;
undelete c;

System.debug('Final account industry: ' + [SELECT Industry FROM Account WHERE Id = :a.Id].Industry);
```

Confirm in the debug log that the account, contact, update, upsert, delete,
and undelete all completed without a `DmlException`.

## Check yourself

Why does `upsert` need a field passed to it beyond the record's own `Id` when
you're importing records from an external system? What four standard objects
can `merge` be used on?
