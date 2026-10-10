# Lesson 19 — API Practice Project

**Chapter 3 · Limits and Practice · Lesson 19 of 22**

## What you'll learn

- How to chain authentication, querying, CRUD, and error handling into one real workflow
- Where a Composite request simplifies a multi-step operation you'd otherwise do by hand
- How to decide, mid-project, when a single-record REST approach should become a Bulk API 2.0 job instead
- How to self-check a multi-step integration project against each lesson that fed into it

## The project

A fictional company, Northstar Supply Co., wants to sync a batch of new vendor contacts from an external spreadsheet export into Salesforce as Contacts linked to an existing Account, then verify the load and handle any records that failed. This project deliberately combines Lessons 7 through 18 into one connected exercise rather than testing each piece in isolation.

## Step 1 — Authenticate

Using the Web Server flow from Lesson 7, obtain an access token:

```http
POST /services/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=aPr...&client_id=3MVG9...&client_secret=...&redirect_uri=https://myapp.com/callback
```

## Step 2 — Confirm the target Account exists

Before linking new Contacts, query for the Account by name (Lesson 11):

```http
GET /services/data/v61.0/query/?q=SELECT+Id,Name+FROM+Account+WHERE+Name='Northstar+Supply+Co.'
Authorization: Bearer {{access_token}}
```

## Step 3 — Decide: REST or Bulk?

The spreadsheet export has 6 vendor contacts. Per Lesson 20's decision guidance (previewed here): this is a small enough batch that a `/composite` request (Lesson 16), not a full Bulk API 2.0 job, is the right tool — Bulk API 2.0's job-management overhead doesn't pay for itself at this scale.

## Step 4 — Create the Contacts with a Composite request

Chain the Account's known ID into each new Contact using `referenceId`, with `allOrNone` set so a bad row doesn't leave some Contacts created and others missing:

```json
{
  "allOrNone": true,
  "compositeRequest": [
    { "method": "POST", "url": "/services/data/v61.0/sobjects/Contact", "referenceId": "C1", "body": { "LastName": "Alvarez", "AccountId": "001xx0000012345AAA" } },
    { "method": "POST", "url": "/services/data/v61.0/sobjects/Contact", "referenceId": "C2", "body": { "LastName": "Petrova", "AccountId": "001xx0000012345AAA" } }
  ]
}
```

## Step 5 — Handle errors

If the response includes any sub-request with an error-shaped body (Lesson 13), inspect its `errorCode`: a `REQUIRED_FIELD_MISSING` means fixing the source data before retrying, while a transient `500` on one sub-request might warrant a retry with backoff (Lesson 14).

## Step 6 — Verify

Query back the newly created Contacts to confirm the load:

```http
GET /services/data/v61.0/query/?q=SELECT+Id,LastName+FROM+Contact+WHERE+AccountId='001xx0000012345AAA'
Authorization: Bearer {{access_token}}
```

## Key terms

| Term | Meaning |
|---|---|
| End-to-end integration workflow | Authenticate, confirm context, choose the right API for scale, write, handle errors, verify |
| Scale-based API choice | Picking REST/Composite for small batches vs. Bulk API 2.0 for large ones, based on record count |

## Lab

This entire lesson *is* the lab. Complete the six-step project above as written exercises: write out each of the six HTTP requests in full (method, URL, headers, and body where relevant), using placeholder IDs and tokens where a real org isn't available. Then extend it: suppose the spreadsheet export instead contained 40,000 vendor contacts rather than 6 — rewrite Steps 3 and 4 using the Bulk API 2.0 job lifecycle from Lesson 15 instead of a Composite request, and explain in a sentence why the right tool changed.

## Check yourself

Can you walk through, from memory, the six stages this project combined and which earlier lesson each one came from? Can you explain the specific threshold reasoning that would make you switch from a Composite request to a full Bulk API 2.0 job as the batch size grows?