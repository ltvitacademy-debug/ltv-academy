# Wrap-Up: What You Built, and What's Next

**Chapter 1 · Beginner Capstone: First Look at the Files · Lesson 10 of 10**

## What you'll learn

- A full recap of the real stack this project built, start to finish
- The specific business question it answered, and the real nuance in that answer
- What changes for the Intermediate project, and why those changes are necessary

## What you actually built

Ten lessons, one real stack, no shortcuts and nothing extra:

```
Northfield's August 2026 order exports (already in S3)
        |
        v
   S3 raw zone: northfield-raw-zone/orders-raw/
        |
        v
  Glue Crawler: northfield-orders-raw-crawler  -->  Glue Catalog table: orders_raw
        |
        v
      Athena: ad hoc SQL, straight against the files in S3
        |
        v
Answer: Camp Kitchen leads on units, Tents & Shelters leads on revenue
```

Along the way, you also handled two real complications that any production data project
runs into: a crawler that inferred a column's type slightly wrong (Lesson 5), and a flat
file layout that works fine at small scale but needs partitioning before it scales
(Lesson 8).

## The business result, one more time

The Operations Manager's one-sentence ask — "which category sold the most?" — turned out
to need two numbers, not one, because unit volume and revenue told two different stories.
That's the real skill this project exercised from end to end: clarifying a vague question
into something specific (Lesson 1), building only as much infrastructure as that specific
question needed (Lesson 2), and presenting the result honestly, nuance included (Lesson
9).

## What's deliberately NOT here

This project never touched a Glue ETL job, Redshift, or Step Functions — not because
they're advanced or intimidating, but because nothing in this project's actual requirement
called for them. That restraint is as much the point of this project as the SQL is.

## What changes next: the Intermediate project

The Intermediate tier picks up exactly where this restraint runs out. A **second
stakeholder** needs a **repeatable** dataset — not a one-time answer, but something
queried every month without someone re-running a crawler and re-writing a query by hand
each time. That one change in requirement — *recurring* instead of *ad hoc* — is what
justifies reaching for the next layer:

- A **Glue ETL job** that cleans and reshapes the raw files into a curated zone
  automatically, instead of a human doing it by hand each time.
- A properly structured, **partitioned-from-the-start** curated dataset, instead of
  retrofitting partitioning after the fact like Lesson 8 did here.
- The beginning of **scheduling**, so the pipeline runs without someone kicking it off
  manually.

Further out, the existing Advanced capstone picks up from there: Redshift for fast
repeated analytical queries, and Step Functions to orchestrate the entire chain on a
schedule, with the production practices — monitoring, IAM, CI/CD, cost control — that
turn this into a job-ready project.

## Key terms

| Term | Meaning |
|---|---|
| Ad hoc vs. recurring | A question asked once vs. a question that needs answering on an ongoing basis |
| Curated zone | A cleaned, transformed copy of raw data — built by a Glue ETL job, not hand-edited |
| Restraint | Building only the infrastructure a requirement actually justifies, nothing more |

## Check yourself

What single change in the business requirement — from the Operations Manager's one-time
question to a second stakeholder's recurring need — is what justifies adding a Glue ETL
job and real scheduling in the Intermediate project, when none of that was needed here?
