# Lesson 10 — CRUD Operations Through the REST API

**Chapter 2 · Using the APIs · Lesson 10 of 22**

## What you'll learn

- The exact verb, URL, and status code for each CRUD operation
- Create: what you send, and what Salesforce sends back
- Update and delete: why they return 204 No Content
- Upsert by external ID, without first needing to know the record's Salesforce ID

## Create

```http
POST /services/data/v61.0/sobjects/Account
Authorization: Bearer 00D...xyz
Content-Type: application/json

{ "Name": "Acme Corporation", "Phone": "(555) 123-4567" }
```

A successful create returns **`201 Created`**, with a response body telling you the new record's ID and whether it succeeded:

```json
{ "id": "001xx000003DGb2AAG", "success": true, "errors": [] }
```

## Read (retrieve)

```http
GET /services/data/v61.0/sobjects/Account/001xx000003DGb2AAG
Authorization: Bearer 00D...xyz
```

Returns **`200 OK`** with the full record (or just the fields you ask for via a `?fields=` query parameter, to avoid pulling back every field unnecessarily).

## Update

```http
PATCH /services/data/v61.0/sobjects/Account/001xx000003DGb2AAG
Authorization: Bearer 00D...xyz
Content-Type: application/json

{ "Phone": "(555) 999-0000" }
```

A successful update returns **`204 No Content`** — an empty body. This surprises people coming from APIs that echo back the updated record, but Salesforce's convention is: no error means it worked, and if you need to see the result, issue a separate GET. Notice the body only includes the field being changed — `PATCH` only updates fields you send, leaving everything else untouched.

## Delete

```http
DELETE /services/data/v61.0/sobjects/Account/001xx000003DGb2AAG
Authorization: Bearer 00D...xyz
```

Also returns **`204 No Content`** on success — same convention as update.

## Upsert by external ID

Sometimes you're integrating with a system that has its own identifier for a record, and you don't know (or don't want to look up) the matching Salesforce ID. **Upsert** solves this by matching on a designated **external ID field** instead:

```http
PATCH /services/data/v61.0/sobjects/Account/Legacy_System_Id__c/LS-00482
Authorization: Bearer 00D...xyz
Content-Type: application/json

{ "Name": "Acme Corporation" }
```

If no Account currently has `Legacy_System_Id__c` equal to `LS-00482`, Salesforce creates a new one with that value and returns `201 Created`. If a matching record already exists, Salesforce updates it and returns `204 No Content`. This single operation covering both cases is exactly what makes upsert valuable for integrations syncing against an external system's own IDs — you never have to branch your own logic on "does this already exist?"

## Key terms

| Term | Meaning |
|---|---|
| Create | `POST /sobjects/{Type}` — returns 201 Created with the new record's id |
| Read | `GET /sobjects/{Type}/{id}` — returns 200 OK with the record |
| Update | `PATCH /sobjects/{Type}/{id}` — returns 204 No Content, only sent fields change |
| Delete | `DELETE /sobjects/{Type}/{id}` — returns 204 No Content |
| Upsert | `PATCH /sobjects/{Type}/{externalIdField}/{value}` — inserts (201) or updates (204) based on a match |
| External ID field | A field (often from a source system) designated for upsert matching, instead of the Salesforce record ID |

## Lab

Write out the four exact HTTP requests (method, URL, and body where relevant) needed to: create a new `Contact` named "Dana Lee"; retrieve that Contact by ID; update that Contact's `Email` field; and finally delete it. Then write the single upsert request you'd use instead if you were syncing Contacts from an external HR system using an external ID field called `HR_Employee_Id__c` with value `EMP-4471`.

## Check yourself

Can you state the HTTP verb and expected success status code for each of create, read, update, and delete? Can you explain why upsert is more convenient than a plain update when integrating against a system that has its own record identifiers?