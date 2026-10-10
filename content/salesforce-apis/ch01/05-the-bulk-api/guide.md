# Lesson 5 — The Bulk API

**Chapter 1 · API Foundations · Lesson 5 of 22**

## What you'll learn

- Why loading large data volumes needs a fundamentally different API shape than REST
- Bulk API 1.0 vs. Bulk API 2.0, and why this course focuses on 2.0
- The asynchronous job model: submit, upload, process, retrieve
- When Bulk API is the right tool, and when it's overkill

## Why large data volumes need a different approach

Imagine loading 500,000 new Contact records using the REST API's single-record `POST /sobjects/Contact/` call. That's 500,000 separate HTTP requests — slow, likely to hit API rate limits (Lesson 14), and fragile, since any one of those half-million calls could fail independently. The **Bulk API** exists specifically to avoid this: instead of many small synchronous calls, you submit the *entire* dataset as one job, and Salesforce processes it asynchronously, in the background, at a scale and pace REST was never designed for.

## Bulk API 1.0 vs. Bulk API 2.0

Salesforce actually has two generations of this API:

- **Bulk API (1.0)** — the original version, a REST/SOAP hybrid where the caller manages dividing data into batches manually.
- **Bulk API 2.0** — the modern, pure-REST version, where Salesforce handles batching and chunking automatically. You just upload your data and let Salesforce figure out the optimal batch sizes internally.

Bulk API 2.0 is simpler to work with and is what this course (and most new integrations) uses — Lesson 15 walks through its exact job lifecycle step by step.

## The asynchronous job model

Every Bulk API 2.0 operation follows the same basic shape:

1. **Create a job**, specifying the target object and the operation (`insert`, `update`, `upsert`, or `delete`).
2. **Upload data** as CSV, in one or more uploads.
3. **Close the job**, signaling that all data has been uploaded and processing can begin.
4. **Poll for completion**, since processing happens asynchronously in the background.
5. **Retrieve results**, which separate out which records succeeded and which failed.

```http
POST /services/data/v61.0/jobs/ingest
Authorization: Bearer 00D...xyz
Content-Type: application/json

{
  "object": "Contact",
  "operation": "insert",
  "lineEnding": "LF"
}
```

```json
{
  "id": "750xx000000005LAAQ",
  "state": "Open",
  "object": "Contact",
  "operation": "insert"
}
```

This is a genuinely different shape than every REST call in Lesson 3 — there's no single request/response pair that does the whole job. The job spans multiple HTTP calls over time, which is exactly the trade-off that makes huge data volumes practical.

## When Bulk API is (and isn't) the right tool

Bulk API 2.0 is the right call whenever you're moving data at real volume — data migrations, nightly syncs, large one-time backfills. It is the *wrong* tool for a single real-time lookup or update a user is waiting on, because the asynchronous job model adds latency a synchronous REST call doesn't have. Picking between them comes down to one question: does this operation involve enough records that the overhead of job management pays for itself? Lesson 20 revisits this trade-off directly alongside every other API in this course.

## Key terms

| Term | Meaning |
|---|---|
| Bulk API | Salesforce's API family for high-volume asynchronous data loads |
| Bulk API 1.0 | The original Bulk API, where the caller manages batching manually |
| Bulk API 2.0 | The modern, pure-REST Bulk API, where Salesforce handles batching automatically |
| Ingest job | A Bulk API 2.0 job that loads data into Salesforce (insert/update/upsert/delete) |
| Asynchronous job model | Submit-upload-process-retrieve, as opposed to one blocking request/response |

## Lab

A client needs to migrate 3 million historical Order records from a legacy system into Salesforce as a one-time cutover. Write out, step by step, the five stages of the Bulk API 2.0 job lifecycle this job would go through (you don't need exact endpoint syntax yet — that's Lesson 15 — just name and order the five stages correctly).

## Check yourself

Can you explain why 500,000 individual REST `POST` calls is the wrong approach for a large data load, in terms of both time and risk? Can you name the five stages of a Bulk API 2.0 job's lifecycle, in order?