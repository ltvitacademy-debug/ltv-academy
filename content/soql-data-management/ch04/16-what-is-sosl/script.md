# Script — What Is SOSL?

## Segment 1 (title)

SOQL always starts from one object. But what if someone types a name into a search box and wants every record that mentions it? That's the job of Salesforce's second language: SOSL.

## Segment 2 (code: the syntax)

FIND, in braces, Acme. IN ALL FIELDS. RETURNING Account, Contact, Lead. SOSL is the Salesforce Object Search Language. It's a text search, not a table query. No FROM, no WHERE. The term goes in braces, and the objects to search go in RETURNING.

## Segment 3 (steps: search scopes)

The IN clause sets the scope. ALL FIELDS is the default. NAME FIELDS, EMAIL FIELDS, and PHONE FIELDS narrow it down, and SIDEBAR FIELDS matches what the sidebar search uses. A narrower scope usually means more relevant results.

## Segment 4 (code: wildcards and limits)

The match isn't case-sensitive. Star matches any number of characters, question mark matches exactly one. SOSL searches text, not numbers or dates, and returns up to two thousand records in total. It works from a search index, so brand-new records can take a moment to show up.

## Segment 5 (outro)

So SOSL is for finding text across objects. Next up, Lesson 17: when to reach for SOSL, and when SOQL is still the right tool.
