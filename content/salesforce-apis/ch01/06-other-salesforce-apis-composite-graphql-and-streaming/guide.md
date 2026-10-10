# Lesson 6 — Other Salesforce APIs: Composite, GraphQL and Streaming

**Chapter 1 · API Foundations · Lesson 6 of 22**

## What you'll learn

- What the Composite API solves: combining multiple REST calls into one
- What the GraphQL API solves: fetching exactly the nested data shape a client needs
- What the Streaming API family solves: being told about changes instead of asking
- How these three differ from REST, SOAP, and Bulk, which you've already met

## Composite API: fewer round trips

REST is simple, but a real task often needs several REST calls chained together — create a parent record, then create three child records that reference it, for example. Doing that as four separate HTTP round trips is slow and, in the event of a partial failure partway through, leaves you with an ambiguous saved state. The **Composite API** solves this by letting a single HTTP request carry multiple sub-requests:

```json
{
  "compositeRequest": [
    {
      "method": "POST",
      "url": "/services/data/v61.0/sobjects/Account",
      "referenceId": "NewAccount",
      "body": { "Name": "Acme Corporation" }
    },
    {
      "method": "POST",
      "url": "/services/data/v61.0/sobjects/Contact",
      "referenceId": "NewContact",
      "body": {
        "LastName": "Smith",
        "AccountId": "@{NewAccount.id}"
      }
    }
  ]
}
```

The second sub-request references the first one's result with `@{NewAccount.id}` — the new Account's ID doesn't even exist yet when you write the request, but the Composite API resolves it as it processes each step in order. Chapter 3 goes much deeper on Composite's several forms (plain Composite, sObject Collections, and Composite Graph).

## GraphQL API: ask for exactly the shape you need

REST typically returns a fixed shape per resource — if you want an Account along with its related Contacts and their related Opportunities, you'd normally need separate calls or a carefully constructed SOQL subquery. The **GraphQL API** (introduced by Salesforce in beta in 2022 and matured since) lets a client describe the *exact* nested shape of data it wants in a single query, and gets back exactly that shape — no more, no less:

```http
POST /services/data/v61.0/graphql
```

```json
{
  "query": "{ uiapi { query { Account { edges { node { Name Contacts { edges { node { Name } } } } } } } } }"
}
```

GraphQL doesn't replace REST — it's a different way to *ask* for related data when a client needs a specific, often deeply nested shape in one round trip, especially useful for front-end applications that would otherwise need several chained REST calls.

## Streaming API family: push instead of poll

Every API covered so far is **pull**-based: the client asks, Salesforce answers. Sometimes what you actually need is the opposite — being told the moment something changes, without constantly asking "has it changed yet?" That's what the **Streaming API** family provides, built on the CometD/Bayeux publish-subscribe protocol:

- **PushTopics** — a subscription defined by a SOQL query; whenever a record matching that query changes, subscribers get notified.
- **Platform Events** — custom-defined event types your org can publish and subscribe to, for arbitrary business events (not tied to a specific record's change).
- **Change Data Capture (CDC)** — subscribe to a per-object channel (e.g. `/data/AccountChangeEvent`) and receive a notification, including what changed, whenever a record of that type is created, updated, deleted, or undeleted.

A subscriber connects once and keeps receiving events as they happen, instead of repeatedly calling `/query` to check for changes — which both wastes API calls and introduces delay between when something actually happened and when a poller would notice.

## How these three fit together

None of these three replace REST, SOAP, or Bulk — they solve different, narrower problems: Composite reduces round trips for multi-step operations, GraphQL reduces round trips for deeply nested read shapes, and Streaming eliminates the need to poll for changes at all. You'll use REST as your default and reach for one of these three when its specific problem shows up.

## Key terms

| Term | Meaning |
|---|---|
| Composite API | Combines multiple REST sub-requests into a single HTTP call, with cross-referencing between steps |
| GraphQL API | Lets a client request an exact, often deeply nested, data shape in one query |
| Streaming API | The real-time, push-based notification API family (PushTopics, Platform Events, CDC) |
| PushTopic | A SOQL-query-defined Streaming API subscription |
| Platform Event | A custom-defined event type an org can publish and subscribe to |
| Change Data Capture (CDC) | Per-object streaming channels that notify subscribers of create/update/delete/undelete |

## Lab

A client application needs to display an Account's name alongside the names of all its related Contacts, in one screen, and wants to minimize the number of round trips to Salesforce. Separately, a different part of the same application needs to know the instant any Opportunity's `StageName` changes to `Closed Won`, without polling. For each of these two needs, name which API from this lesson fits, and explain in one sentence why a plain REST call alone wouldn't be the best fit.

## Check yourself

Can you explain, in one sentence each, what problem Composite API, GraphQL API, and Streaming API each solve? Can you name the three real forms the Streaming API family takes (PushTopics, Platform Events, CDC) and what distinguishes them?