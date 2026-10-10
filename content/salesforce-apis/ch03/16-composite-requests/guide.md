# Lesson 16 — Composite Requests

**Chapter 3 · Limits and Practice · Lesson 16 of 22**

## What you'll learn

- The four real forms of Composite: `/composite`, `/composite/batch`, `/composite/sobjects`, `/composite/graph`
- Cross-referencing results between sub-requests with `referenceId`
- `allOrNone`, and what "not automatically rolled back" means in practice
- Verified limits for batch and graph, and why they exist

## `/composite`: chained sub-requests with cross-referencing

Introduced in Lesson 6: a single `/composite` call bundles up to **25 subrequests**, run serially, where later steps can reference earlier results:

```json
{
  "allOrNone": true,
  "compositeRequest": [
    { "method": "POST", "url": "/services/data/v61.0/sobjects/Account", "referenceId": "NewAccount", "body": { "Name": "Acme Corp" } },
    { "method": "POST", "url": "/services/data/v61.0/sobjects/Contact", "referenceId": "NewContact", "body": { "LastName": "Smith", "AccountId": "@{NewAccount.id}" } }
  ]
}
```

By default, if a later subrequest fails, earlier subrequests that already succeeded are **not automatically rolled back** — each step commits independently unless you set `"allOrNone": true`, which makes the whole composite request behave transactionally (all succeed, or none do).

## `/composite/batch`: simpler, independent sub-requests

An older, simpler form: subrequests run together in one call but **cannot** reference each other's results the way `/composite` can. Use `/composite/batch` when you just want to group several unrelated calls into one HTTP round trip, with no dependency between them.

## `/composite/sobjects`: collections for flat bulk CRUD

**sObject Collections** (`/composite/sobjects`) create, update, or delete a list of records of the same type in one call — this is the right tool when you have a flat list of records to CRUD, and don't need the cross-referencing or multi-object complexity of `/composite` or `/composite/graph`.

```json
{
  "allOrNone": false,
  "records": [
    { "attributes": { "type": "Contact" }, "LastName": "Lee" },
    { "attributes": { "type": "Contact" }, "LastName": "Okafor" }
  ]
}
```

## `/composite/graph`: the most powerful, and its verified limits

**Composite Graph** is the newest and most capable form, built for complex, multi-object transactional graphs. Verified limits (developer.salesforce.com, current docs): **up to 500 nodes per payload** (e.g. one graph of 500 nodes, or 50 smaller graphs totaling 500), **up to 75 graphs per payload**, and **a maximum graph depth of 15**. If more than 14 graphs in a single payload fail, Salesforce halts processing of the remaining graphs in that request.

## Choosing among the four

| Form | Use when |
|---|---|
| `/composite` | You need a handful of different operations, some referencing each other's results |
| `/composite/batch` | You need several independent operations grouped into one call, no cross-referencing |
| `/composite/sobjects` | You need flat bulk CRUD on a list of same-type records |
| `/composite/graph` | You need a complex, multi-object transactional graph at real scale |

## Key terms

| Term | Meaning |
|---|---|
| `referenceId` | A label on a Composite sub-request letting later steps reference its result |
| `allOrNone` | A flag making a Composite request behave transactionally — all sub-requests succeed, or the whole request is rolled back |
| sObject Collections | `/composite/sobjects` — bulk CRUD on a flat list of same-type records in one call |
| Composite Graph | `/composite/graph` — the most capable Composite form, for complex multi-object graphs (500 nodes/payload, 75 graphs/payload, depth 15) |

## Lab

A single transaction needs to create one new Account and three Contacts linked to it, where the whole operation should either fully succeed or fully fail with nothing left half-committed. Write the JSON body for the `/composite` request that does this, including the `allOrNone` setting and the `referenceId` cross-references needed to link each Contact's `AccountId` to the new Account.

## Check yourself

Can you explain the difference between `/composite` and `/composite/batch` in terms of whether sub-requests can reference each other? Can you state Composite Graph's three verified limits (nodes per payload, graphs per payload, max depth)?