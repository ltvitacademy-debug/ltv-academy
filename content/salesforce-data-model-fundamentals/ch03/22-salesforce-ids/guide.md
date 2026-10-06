# Salesforce IDs

**Chapter 3 · Relationships and Schema · Lesson 22 of 23**

Every relationship this chapter has covered — Lookup, Master-Detail, junction objects, Hierarchical,
External Lookup — works by one record storing a reference to another. This lesson looks at exactly
what that reference actually is: a Salesforce ID.

## What you'll learn

- What a Salesforce ID encodes, and why the first three characters matter
- The difference between the 15-character and 18-character forms, and why both exist
- Why ID case sensitivity trips people up in integrations and spreadsheets

## Every record gets one, automatically

Every record of every object — standard or custom — gets a unique **Salesforce ID** the instant it's
created. It's not a field you fill in; Salesforce generates and assigns it, and it never changes for
the life of that record. Every Lookup, Master-Detail, and junction relationship this chapter has
covered is, underneath the UI, just one record's ID stored in another record's relationship field.

## The first three characters identify the object

An ID's first three characters are a **key prefix** that identifies which object the record belongs
to. Every Account ID starts with `001`; every Contact ID starts with `003`; every Opportunity ID
starts with `006`. That's true across every Salesforce org in existence — the prefix is tied to the
object type, not to any one company's data.

```
001 → Account
003 → Contact
006 → Opportunity
500 → Case
```

That means you can often tell what kind of record an ID refers to just by glancing at its first three
characters, before ever looking it up.

## 15 characters, case-sensitive — or 18, and it isn't

Salesforce IDs come in two lengths. The **15-character** ID is what you typically see in the browser's
URL bar, and it's **case-sensitive** — change the capitalization of even one character and it points
to a different record, or no record at all. The **18-character** ID adds three more characters that
encode the case information of the original 15, making the 18-character version **case-insensitive**
and safe to use anywhere case might get silently altered — a spreadsheet, an API integration, a
system that forces lowercase.

```
15-character (case-sensitive):
0013h00000AbCdEFGH

18-character (case-insensitive):
0013h00000AbCdEFGHIaX
```

API integrations and data loads should always use the 18-character form for exactly this reason —
it's resilient to a tool silently normalizing case along the way, where the 15-character form isn't.

## Why this matters for relationships

Every relationship field this chapter covered stores one of these IDs. A Lookup field's value, a
Master-Detail field's value, a junction record's two Master-Detail values — all of them are just a
15- or 18-character ID pointing at the related record. Understanding the ID format isn't trivia; it's
what's actually moving underneath every relationship diagram Schema Builder has drawn so far.

## Key terms

| Term | Meaning |
|---|---|
| Salesforce ID | The unique, system-generated identifier assigned to every record on creation |
| Key prefix | The first three characters of an ID, identifying the record's object type |
| 18-character ID | The case-insensitive form of an ID, safe for integrations and data loads |

## Check yourself

An integration imports a list of record IDs from a spreadsheet, and several of them fail to match
any record. The IDs are 15 characters long and the spreadsheet software is known to auto-capitalize
text. What's the most likely cause, and what ID format would have prevented it?
