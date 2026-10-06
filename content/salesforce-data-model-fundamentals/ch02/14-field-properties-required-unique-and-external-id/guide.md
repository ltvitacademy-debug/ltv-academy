# Field Properties: Required, Unique, and External ID

**Chapter 2 · Fields · Lesson 14 of 23**

A field's data type decides *what kind* of value it holds. A separate set of checkboxes, set during
the same New Custom Field flow, decides *how that value behaves*: whether it can be blank, whether
it can repeat across records, and whether the outside world is allowed to use it to find a record.
Those checkboxes are Required, Unique, and External ID.

## What you'll learn

- What each of the three properties actually enforces, and on which field types they're available
- Why External ID exists specifically to support integrations, not day-to-day data entry
- How these properties sit in the same New Custom Field flow every other field type uses

## Required: no blank allowed

A **Required** field can't be saved blank — Salesforce blocks the save and asks the user to fill it
in. This is enforced everywhere a record can be created or edited: the UI, the API, an import, a
Flow. It's the simplest of the three properties, and the most commonly used.

![The Fields & Relationships New button — the same starting point used for every field, including the ones where Required, Unique, and External ID get set on Step 2.](/courses/salesforce-data-model-fundamentals/ch02/14-field-properties-required-unique-and-external-id/fields-new-button.png)

## Unique: no repeats allowed

A **Unique** field rejects a save if its value already exists on another record of the same object.
Salesforce lets you choose case-sensitive or case-insensitive uniqueness — "ABC123" and "abc123"
count as the same value under case-insensitive, but as two different values under case-sensitive.
Only certain field types (Text, Number, Email, Auto Number) can be marked Unique.

## External ID: a bridge to the outside world

**External ID** marks a field as holding a value from an *external* system — an ERP's customer
number, a legacy database's primary key. Checking this box does two real things: it makes the field
searchable and indexed for fast lookups, and — critically — it makes the field usable as the
matching key in an **upsert** operation, where an integration can update an existing record or
insert a new one based on whether that external value already exists in Salesforce.

![A related list column literally labeled External ID, holding values like 1004-2 and 1004-3 that originate outside Salesforce.](/courses/salesforce-data-model-fundamentals/ch02/14-field-properties-required-unique-and-external-id/external-id-column.png)

An External ID field is very often also marked Unique — the two properties work together: Unique
guarantees no duplicate key collides with another record, External ID tells the API this is the key
to match on.

```
Upsert(sObjectType, "Legacy_Customer_Id__c", records)
```

That's the shape of an upsert call: give it the object, the External ID field to match on, and a
batch of records — Salesforce finds existing matches and updates them, and inserts everything else.

## Key terms

| Term | Meaning |
|---|---|
| Required | Blocks save unless the field has a value, enforced everywhere — UI, API, import, automation |
| Unique | Rejects a save if the value already exists on another record of the same object |
| External ID | Marks a field as indexed and usable as the match key for an upsert against an outside system |
| Upsert | An operation that updates a matching record or inserts a new one, based on an External ID |

## Check yourself

An integration needs to sync customer records from an outside billing system without creating
duplicates every time it runs. Which field property makes that possible, and what does it let the
integration do that a plain Text field couldn't?
