# Script — Salesforce IDs

## Segment 1 (title)

Every relationship this chapter has covered — Lookup, Master-Detail, junction objects, Hierarchical, External Lookup — works by one record storing a reference to another. This lesson looks at what that reference actually is: a Salesforce ID.

## Segment 2 (code: key prefixes)

Every record gets a unique ID the instant it's created — not a field you fill in, Salesforce generates it, and it never changes. The first three characters are a key prefix identifying the object: every Account ID starts with 001, every Contact with 003, every Opportunity with 006. That's true across every org, because the prefix is tied to the object type.

## Segment 3 (code: 15 vs 18 character)

IDs come in two lengths. The 15-character ID, typical in a browser's URL bar, is case-sensitive — change even one character's capitalization and it points to a different record, or none at all. The 18-character ID adds three characters encoding the original case, making it case-insensitive and safe anywhere case might get silently altered.

## Segment 4 (steps: why it matters)

Three practical consequences: API integrations and data loads should always use the 18-character form. A spreadsheet that auto-capitalizes text can silently corrupt a 15-character ID. And every relationship field in this chapter — Lookup, Master-Detail, junction — is really just one of these IDs stored on another record.

## Segment 5 (steps: quick reference)

A short reference worth memorizing the shape of, not the exact codes: 001 for Account, 003 for Contact, 006 for Opportunity, 500 for Case — glance at the first three characters and you often know the object before you even look the record up.

## Segment 6 (outro)

Every concept from this chapter — objects, fields, relationships, Record Types, Schema Builder, and now IDs — comes together in the last lesson: designing a simple data model from a real set of requirements.
