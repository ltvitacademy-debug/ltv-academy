# Lesson 9 — Handling Relationships and External IDs

**Chapter 2 · Designing the Migration · Lesson 9 of 18**

## What you'll learn

- What an External ID field is and why migrations depend on it
- How upsert uses an External ID to make a load safely re-runnable
- How External IDs solve the "I don't know the new Salesforce Id yet" problem for relationships
- The classic pitfall that creates duplicate records on every re-run

## The problem External IDs exist to solve

Lesson 8 established load order; this lesson covers the specific mechanism that makes loading relationships *within* that order actually practical. When a child record is being loaded and needs to point at its parent, the obvious-sounding approach — "look up the parent's new Salesforce Id and put it in the lookup field" — runs into an immediate problem: at the moment the source data is being prepared, nobody knows what Salesforce Id the parent record is going to get, because Salesforce assigns Ids automatically at insert time. The **External ID field** — a custom field, flagged as an External ID in its field definition, that stores a record's identifier from the legacy or source system — exists specifically to route around this problem.

## Upsert and idempotent loads

Once a parent object carries an External ID (commonly its legacy system's own primary key or record number), loads can use **upsert** instead of a plain insert. Upsert matches the incoming record against an existing one using the External ID field (or Salesforce's own Id if no External ID exists) — if a match is found, the existing record is updated; if not, a new record is inserted. This single feature is what makes a migration load **idempotent**: safe to run more than once without creating duplicates. That matters enormously in practice, because real migrations are rarely clean on the first attempt — a batch fails partway through, a connection drops, a rehearsal needs to be re-run after fixing a mapping bug — and upserting against an External ID means re-running the same file simply re-confirms records that already loaded correctly and only inserts the ones that are genuinely still missing.

Marking the External ID field "Unique" (in addition to "External ID") is standard practice specifically to enforce this safety — it prevents two different source records from accidentally colliding on the same External ID value and silently overwriting each other.

## Populating relationships via External ID, not a known Salesforce Id

The same External ID field that makes upsert idempotent also solves the relationship-loading problem directly. Rather than requiring the load file to already contain the parent's new Salesforce Id (which, as above, doesn't exist yet when the file is prepared), Data Loader's field mapping lets a lookup/master-detail column be mapped straight to the *parent object's External ID field*. The parent still has to be loaded first (sequencing, Lesson 8, hasn't gone away), but the child's load file never needs to know the parent's new Id at all — it only ever needs to carry the parent's legacy identifier, which was known from the very beginning.

## The classic pitfall

The single most common mistake in this area is upserting against the Salesforce record **Id** instead of a proper legacy **External ID**. The symptom is specific and recognizable: the very first load run appears to work fine, but every subsequent re-run of the same file creates a brand-new set of duplicate records instead of matching the ones that already loaded — because the source file never actually contained a Salesforce Id to match against in the first place (it only has the Id *after* the first run assigns one, and by then the source file hasn't been updated to include it). The fix is always the same: load against a true External ID captured from the source system, not the Id Salesforce assigns after the fact.

## Key terms

| Term | Meaning |
|---|---|
| External ID field | A custom field flagged as an External ID, storing a record's identifier from the source system |
| Upsert | An operation that updates a record if an External ID (or Id) match is found, and inserts a new record otherwise |
| Idempotent load | A load safe to run more than once without creating duplicate records |
| Relationship loading via External ID | Mapping a lookup/master-detail column to a parent's External ID field instead of needing its new Salesforce Id |

## Lab

A migration loads Accounts first (with a Legacy_Account_Id__c External ID field, marked Unique) and then Contacts, where each Contact's "Account" lookup is mapped to the parent's Legacy_Account_Id__c rather than any Salesforce Id. On the first run, 10,000 Contacts load successfully. Two days later, during rehearsal, the team needs to re-run the exact same Contact file after fixing an unrelated email-format bug. Explain what will happen to the 10,000 already-loaded Contacts when the file is re-run, and why that outcome depends specifically on the External ID being marked Unique and the load using upsert rather than plain insert.

## Check yourself

Can you explain why a migration generally can't rely on knowing a parent's new Salesforce Id at the time a child's load file is prepared? Can you describe the specific symptom that shows up when a migration mistakenly upserts against Salesforce's Id instead of a true External ID?
