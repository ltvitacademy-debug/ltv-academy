# API-Based Integration Basics

Not every integration goes through a packaged connector. Sometimes a data engineer needs to pull records with a script, an integration platform calls Salesforce on your behalf, or a warehouse tool uses Salesforce's APIs under the hood. You met Salesforce's APIs in the SOQL and Data Management course. This lesson revisits them from an integration point of view: which API fits which job, how authentication works, and how to stay inside the limits.

## What you'll learn

- The main Salesforce API families and what each is best at
- How an integration authenticates without a human logging in
- How to pull only changed records instead of everything, every time
- Why API limits shape integration design

## Choosing the right API

Salesforce exposes several ways to move data, and the right one depends on volume and timing.

- **REST API.** Request and response over HTTPS with JSON. Good for querying with SOQL, reading or updating individual records, and moderate volumes.
- **Bulk API (2.0).** Built for large asynchronous jobs: you submit a query or a data file, Salesforce processes it in the background, and you download the results. This is the usual choice for loading or extracting big tables.
- **Streaming and change events.** Instead of asking "what changed?" on a schedule, a subscriber listens for Change Data Capture events or Platform Events and receives changes as they happen. Salesforce's Pub/Sub API is the current way to subscribe programmatically. Verify the current recommendation in the developer docs, since streaming options have evolved.

A useful rule of thumb: small and interactive means REST, big and scheduled means Bulk, and near real time means event-based.

## A REST query, end to end

The REST API's query endpoint accepts a SOQL string, exactly the language you already know. The request includes an API version in the path and an access token in a header. Responses come back in pages, so a robust client follows the "next records" link until the results are complete.

## Authentication for integrations

An integration is a program, so it needs credentials that don't depend on a person clicking through a login page. Salesforce uses **OAuth 2.0** for this. An application is registered in the org and granted specific scopes. It then obtains short-lived access tokens, using a flow suited to server-to-server work.

The registration object has been changing. Historically it was a **connected app**, and Salesforce has been moving new integrations toward **external client apps**. Check current documentation and your org's settings before building, because the default for creating new ones has shifted across recent releases.

Two habits matter regardless of the mechanism. First, run integrations as a dedicated integration user with only the permissions the job needs, not as a named administrator. Second, remember that whoever the integration runs as determines which records and fields it can see. A pipeline that quietly misses records is often a permissions problem.

## Pulling only what changed

Re-downloading an entire object every hour is wasteful. Most objects carry a `SystemModstamp` field that updates whenever a record changes. Filtering on it lets a job fetch only what changed since the last successful run:

```sql
SELECT Id, Name, Amount, SystemModstamp
FROM Opportunity
WHERE SystemModstamp > 2026-01-01T00:00:00Z
```

Store the high-water mark from each run and use it as the next run's starting point. Deleted records need separate handling, since a deleted row simply stops appearing in query results.

## Limits shape the design

Salesforce enforces limits on API usage, including a request allowance that varies by edition and license, plus per-query and per-job constraints. Don't memorize numbers. Look up your org's current limits and monitor consumption. Practical consequences: prefer Bulk for large pulls, use incremental filters, and avoid polling more often than the business needs.

## Recap

Pick REST for small interactive work, Bulk for volume, and events for near real time. Authenticate with OAuth as a least-privilege integration user, pull incrementally with `SystemModstamp`, and design around limits.

## Check yourself

A nightly job re-extracts all Opportunities and is approaching the org's API limit. What two changes would you make?
