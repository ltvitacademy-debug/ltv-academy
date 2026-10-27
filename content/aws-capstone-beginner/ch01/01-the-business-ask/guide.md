# The Business Ask: One Simple Question About the Files

**Chapter 1 · Beginner Capstone: First Look at the Files · Lesson 1 of 10**

## What you'll learn

- How a vague "can you just check the files" request turns into a specific, answerable question
- Why this project deliberately stops at S3 + Glue Crawler + Athena, and doesn't reach for a full ETL pipeline
- The real stakeholder, files, and question this entire Beginner capstone builds toward

## The ask

You're doing data work for **Northfield Outdoor Supply**, the same mid-size camping and
hiking gear retailer from the main AWS capstone — but earlier in their story, before any
of that automated pipeline existed. Right now, IT has only just set up one S3 bucket,
`northfield-raw-zone`, as a place to dump files instead of emailing spreadsheets around.

Northfield's Operations Manager pulled a month of order exports from the on-prem SQL
Server in August and dropped them into that bucket, one CSV per day, because someone on
the IT team said "just put them in S3, we'll figure out reporting later." Now the
Operations Manager wants an answer:

> "We've got a whole month of order files sitting in that S3 bucket — can you just tell me
> which product category sold the most? I want to know what to restock first."

No data warehouse. No BI tool. No scheduled pipeline. Just 31 CSV files already sitting in
a bucket, and one real business question riding on them.

## Why this is the right starting point

Every AWS data project eventually grows into something like the full Northfield
capstone — S3, Glue ETL, Redshift, Step Functions. But almost none of them *start* there.
They start exactly like this: raw files somebody already has, and one specific question
nobody has a clean way to answer yet. Reaching for Redshift to answer one ad-hoc question
against 31 CSV files would be solving a problem Northfield doesn't have yet.

This Beginner project builds the smallest real stack that answers the question properly:

```
Raw CSV files in S3
        |
        v
  Glue Crawler  -->  Glue Data Catalog (a table, without moving the data)
        |
        v
      Athena  -->  SQL query, straight against the files in S3
```

That's it. No transformation job, no second copy of the data, no second storage system.
By Lesson 6 you'll run a real SQL query against files that never left S3.

## Turning "which category sold the most" into a real question

Just like any stakeholder request, "which category sold the most" hides a decision: sold
the most **by what measure**? Units moved, or revenue? A category can rack up huge unit
counts selling cheap carabiners while a handful of expensive tents bring in more money.
The Operations Manager's real goal — "what do I restock first" — needs **both** numbers
side by side, so Lesson 7 answers this precisely:

> *"For August 2026, show total units sold and total revenue by product category, from the
> order export files already sitting in `northfield-raw-zone`, so the Operations Manager
> can decide what to restock first."*

## What this project does NOT need

- A Glue ETL job that cleans and reshapes the data — the raw files are clean enough to
  query as-is for one ad-hoc question.
- Redshift — there's no recurring reporting workload here, just one question.
- Step Functions or any scheduling — this runs once, by hand, this week.

Those three show up in the Intermediate project, when a second stakeholder needs a
*repeatable* curated dataset instead of a one-time answer.

## Key terms

| Term | Meaning |
|---|---|
| Raw zone | The S3 prefix holding unmodified, as-exported source files |
| Ad hoc query | A one-off question against data, run once, not on a schedule |
| Data Catalog | AWS Glue's metadata store — table names, columns, and types, pointing at files that stay in S3 |
| Schema-on-read | Applying structure (columns, types) when you query the data, not when you store it |

## Check yourself

Why does "which category sold the most" need to be clarified into "units sold AND
revenue" before you write any SQL — and why doesn't this question justify building a Glue
ETL job or loading the data into Redshift?
