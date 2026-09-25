# Script — Querying Custom Objects

## Segment 1 (title)

Almost every real Salesforce org has custom objects and custom fields that someone built to model the business. This lesson closes Chapter One by showing how SOQL reaches them.

## Segment 2 (code: the __c suffix)

Every custom object and custom field has an API name ending in double underscore c. An object labeled Project becomes Project underscore underscore c. A field labeled Start Date becomes Start underscore Date underscore underscore c. Everything else is the same as the last lesson. Id and Name have no suffix, because every custom object gets those standard fields automatically.

## Segment 3 (code: custom fields on standard objects)

The suffix is not just for custom objects. Admins add custom fields to standard objects all the time. Here Account has no suffix, but Region and Customer Tier do. The rule is simple: the suffix belongs to whichever thing is custom.

## Segment 4 (code: custom lookups and __r)

A custom lookup like Account underscore underscore c stores the Id of an Account. To reach a field on that related record, switch the suffix to double underscore r, for relationship, and use dot notation. Account r dot Name returns the account's name, and it works in WHERE too. Chapter 3 covers this fully.

## Segment 5 (steps: when it fails)

When a query fails, don't guess. Read the API name in Object Manager. Forgetting the suffix is the classic mistake, and the error message literally tells you to append double underscore c. If the suffix is right and it still fails, check the user's field-level security.

## Segment 6 (outro)

That completes Chapter One. You can read and write SELECT, FROM, WHERE, ORDER BY, and LIMIT, and query standard and custom objects. Next up: Lesson 7, aggregate functions, where we move from listing records to summarizing them.
