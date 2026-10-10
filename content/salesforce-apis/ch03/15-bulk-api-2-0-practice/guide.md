# Lesson 15 — Bulk API 2.0 Practice

**Chapter 3 · Limits and Practice · Lesson 15 of 22**

## What you'll learn

- The exact endpoints and verbs for every stage of a Bulk API 2.0 ingest job
- How to upload CSV data and signal that upload is complete
- The job state machine: Open, UploadComplete, InProgress, JobComplete, Failed, Aborted
- How to retrieve successful, failed, and unprocessed results separately

## Stage 1: create the job

```http
POST /services/data/v61.0/jobs/ingest
Authorization: Bearer 00D...xyz
Content-Type: application/json

{ "object": "Contact", "operation": "insert", "lineEnding": "LF" }
```

```json
{ "id": "750xx000000005LAAQ", "state": "Open", "object": "Contact", "operation": "insert" }
```

The job starts in state **`Open`**, ready to receive data.

## Stage 2: upload CSV data

```http
PUT /services/data/v61.0/jobs/ingest/750xx000000005LAAQ/batches
Authorization: Bearer 00D...xyz
Content-Type: text/csv

FirstName,LastName,Email
Dana,Lee,dana.lee@example.com
Sam,Okafor,sam.okafor@example.com
```

You can upload data across multiple `PUT` calls to the same batches endpoint if your source data arrives in chunks — Salesforce handles the internal batching and chunking of however much data you've sent once the job closes.

## Stage 3: close the job (signal upload complete)

```http
PATCH /services/data/v61.0/jobs/ingest/750xx000000005LAAQ
Authorization: Bearer 00D...xyz
Content-Type: application/json

{ "state": "UploadComplete" }
```

This is a required call for every ingest job — processing never starts until you explicitly tell Salesforce the upload is finished. Once this succeeds, the job moves to **`UploadComplete`** and gets queued; Salesforce then moves it to **`InProgress`** once it's dequeued and processing begins.

## Stage 4: poll for completion

```http
GET /services/data/v61.0/jobs/ingest/750xx000000005LAAQ
Authorization: Bearer 00D...xyz
```

```json
{ "id": "750xx000000005LAAQ", "state": "InProgress", "numberRecordsProcessed": 1, "numberRecordsFailed": 0 }
```

Keep polling until `state` is `JobComplete` (success) — or `Failed` or `Aborted`, which are terminal outcomes you need to handle too.

## Stage 5: retrieve results

Once `JobComplete`, three separate CSV result sets are available:

```http
GET /services/data/v61.0/jobs/ingest/750xx000000005LAAQ/successfulResults/
GET /services/data/v61.0/jobs/ingest/750xx000000005LAAQ/failedResults/
GET /services/data/v61.0/jobs/ingest/750xx000000005LAAQ/unprocessedrecords/
```

Separating these three matters: a job can be `JobComplete` overall while still having some individual records fail validation — `JobComplete` describes the *job*, not a guarantee that every record succeeded. Always check `failedResults` even on a "successful" job.

## Key terms

| Term | Meaning |
|---|---|
| Ingest job states | Open → UploadComplete → InProgress → JobComplete (or Failed / Aborted) |
| `PATCH .../jobs/ingest/{id}` with `state: UploadComplete` | The required call that signals upload is finished and queues the job for processing |
| `successfulResults` / `failedResults` / `unprocessedrecords` | The three separate result sets a completed job exposes |

## Lab

Write out, as five separate HTTP requests with method, URL, and body/headers where relevant, the complete lifecycle for inserting a batch of new `Lead` records via Bulk API 2.0: create the job, upload a small CSV sample of your own (at least 2 rows), close the job, poll it once, and retrieve its `failedResults`.

## Check yourself

Can you name all the states a Bulk API 2.0 ingest job passes through, in order, and the one PATCH call that triggers processing to actually start? Can you explain why a job can be `JobComplete` and still have some records appear in `failedResults`?