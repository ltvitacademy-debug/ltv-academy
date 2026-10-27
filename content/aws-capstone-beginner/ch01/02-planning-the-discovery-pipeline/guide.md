# Planning the Discovery Pipeline

**Chapter 1 · Beginner Capstone: First Look at the Files · Lesson 2 of 10**

## What you'll learn

- Why S3 + Glue Crawler + Athena is the right-sized stack for "let me query what's already there"
- What each of the three services actually does, in plain English, before touching the console
- Where this plan deliberately stops, and what would need to change for it to go further

## The plan, in plain English

Before opening the AWS console, sketch what has to happen, in order:

```
Raw order CSVs already in S3 (northfield-raw-zone)
        |
        v
   Glue Crawler  <-- scans the files, infers columns and types
        |
        v
  Glue Data Catalog  <-- a table definition, pointing at the S3 files
        |
        v
      Athena  <-- runs real SQL against those files, on demand
        |
        v
  Answer: units + revenue by product category, August 2026
```

Four steps, three AWS services, and the data never moves. That last point matters: S3
stays the single source of truth for the raw files the whole way through.

## Why each service earns its place

**S3** is already doing its job — the files are there. Nothing to decide here except
confirming the bucket and prefix are right, which Lesson 3 covers.

**Glue Crawler** solves one specific problem: Athena needs to know a file's structure
(column names, data types) before it can run SQL against it, and nobody wants to type out
a `CREATE TABLE` statement by hand with every column guessed correctly on the first try.
The crawler scans a sample of the files, infers a schema, and registers it as a table in
the **Glue Data Catalog** — metadata only, no data copied.

**Athena** is a serverless SQL query engine that reads directly from S3 using the schema
the Catalog provides. There's no cluster to provision and no server to manage — you write
a query, Athena scans only the S3 objects it needs, and you pay per terabyte scanned.

## Why NOT Glue ETL + Redshift yet

It's worth naming the next step up, because an interviewer will often ask "what would you
build differently if this needed to run every day?" The honest answer: a **Glue ETL job**
would clean and reshape the data into a curated zone, and **Redshift** would hold it for
fast, repeated, complex queries from multiple analysts. That's real, more expensive
infrastructure, and it earns its cost only once there's a recurring workload.

Right now there's one stakeholder, one question, asked once. S3 + Crawler + Athena
answers it at effectively zero fixed cost — you pay only for the data Athena actually
scans, not for infrastructure that sits idle. That tradeoff — ad hoc and cheap vs.
repeatable and more expensive — is the real decision this lesson plans around, and it's
exactly the decision the Intermediate project revisits once a second stakeholder needs a
dataset that gets queried over and over.

## What "done" looks like for this plan

By the end of Lesson 6, there's a Glue Crawler that has cataloged the raw order files as a
real table, and a working `SELECT * FROM orders_raw LIMIT 10;` in Athena proving the whole
chain works end to end — before Lesson 7 writes the query that actually answers the
Operations Manager's question.

## Key terms

| Term | Meaning |
|---|---|
| Serverless | No server or cluster to provision, patch, or pay for while idle |
| Crawler | A Glue component that scans files and infers their schema automatically |
| Pay-per-query | Athena's pricing model — billed by terabytes of data scanned per query, not by uptime |
| Curated zone | A separate, cleaned/transformed copy of data — out of scope for this project |

## Check yourself

Why does S3 + Glue Crawler + Athena cost effectively nothing when idle, while Redshift
does not — and why does that difference matter when the whole job is answering one
question, once?
