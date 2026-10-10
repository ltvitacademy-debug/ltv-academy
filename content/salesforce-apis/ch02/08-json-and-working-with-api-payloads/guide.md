# Lesson 8 — JSON and Working With API Payloads

**Chapter 2 · Using the APIs · Lesson 8 of 22**

## What you'll learn

- The shape of a record in a REST response vs. what you send to create one
- How relationship fields appear in both directions: parent lookups and child subqueries
- Data types: how Salesforce fields map to JSON types
- Common payload mistakes that cause a request to fail

## Response shape vs. request shape

Lesson 3 showed a GET response for an Account:

```json
{
  "attributes": { "type": "Account", "url": "/services/data/v61.0/sobjects/Account/001xx000003DGb2AAG" },
  "Id": "001xx000003DGb2AAG",
  "Name": "Acme Corporation",
  "Phone": "(555) 123-4567"
}
```

But the body you send to *create* that same record looks different — no `attributes`, no `Id` (Salesforce assigns that):

```json
{
  "Name": "Acme Corporation",
  "Phone": "(555) 123-4567"
}
```

This asymmetry trips people up constantly: what Salesforce sends you is richer than what it expects you to send it. Only include the fields you actually intend to set.

## Relationship fields: lookups and subqueries

A **lookup** (parent) relationship is just a field holding the parent's ID:

```json
{
  "LastName": "Smith",
  "AccountId": "001xx000003DGb2AAG"
}
```

A **child relationship** (the reverse direction — an Account's related Contacts) only appears when you specifically query for it, as a nested structure:

```json
{
  "Id": "001xx000003DGb2AAG",
  "Name": "Acme Corporation",
  "Contacts": {
    "totalSize": 2,
    "done": true,
    "records": [
      { "Id": "003xx0000004Tn5AAE", "LastName": "Smith" },
      { "Id": "003xx0000004Tn6AAE", "LastName": "Jones" }
    ]
  }
}
```

Notice the child relationship result has its own `totalSize`/`done`/`records` shape — it's a nested query result, not a simple field.

## Data type mapping

JSON only has a handful of primitive types (string, number, boolean, null, object, array), and Salesforce field types map onto them predictably: text, picklist, and ID fields are JSON strings; Number, Currency, and Percent fields are JSON numbers; Checkbox fields are JSON booleans; Date fields are ISO 8601 strings like `"2026-03-15"`; DateTime fields are ISO 8601 strings with a time and offset like `"2026-03-15T14:30:00.000+0000"`. Getting a date format wrong (sending a Date value where a DateTime is expected, or vice versa) is a common source of a failed request.

## Common payload mistakes

A handful of mistakes account for most payload-related errors in practice:

- Including `Id` or `attributes` in a create request body (Salesforce will reject or ignore fields it doesn't expect on insert).
- Sending a string where a number or boolean is expected (e.g. `"true"` instead of `true`).
- Forgetting that a required field with no default value must be included on create, or the request fails validation.
- Mismatching a Date vs. DateTime format for a field that expects the other.

## Key terms

| Term | Meaning |
|---|---|
| Lookup relationship | A field on a record holding a parent record's ID |
| Child relationship | The reverse direction of a lookup, returned as a nested query result when specifically requested |
| ISO 8601 | The date/time string format Salesforce's JSON payloads use for Date and DateTime fields |

## Lab

Write the exact JSON request body you would send to create a new `Opportunity` with a `Name` of "Acme Renewal," a `CloseDate` of March 15, 2026, and a `StageName` of "Prospecting." Then write what you'd expect a GET response for that same record to look like once created, including the `attributes` object Salesforce would add (use a placeholder ID).

## Check yourself

Can you explain why a create request body doesn't include an `Id` or `attributes` object, even though every GET response does? Can you explain the difference between how a lookup field and a child relationship each appear in a JSON response?