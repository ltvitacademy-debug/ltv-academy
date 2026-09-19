# Capstone Kickoff & Business Scenario

This capstone ties together every AWS service from AWS Data Engineering into one working
platform, then layers on the production practices — monitoring, security, CI/CD, cost —
that separate a portfolio demo from a job-ready project. Every lesson from here to the end
builds the same platform, one piece at a time.

## What you'll learn

- The business scenario this capstone builds toward
- The exact AWS services involved, and why each one earns its place
- What "done" looks like by Lesson 15

## The scenario: Northfield Outdoor Supply

Northfield Outdoor Supply is a mid-size e-commerce retailer selling camping and hiking
gear. Today, their sales, inventory, and customer data live in an on-premises SQL Server
database, and "reporting" means a nightly manual export to a spreadsheet. Leadership wants
same-day visibility into sales trends, inventory turnover, and customer behavior —
without hiring a database administrator to babysit a growing warehouse.

That's the job this capstone does: build a serverless-first AWS data platform that
ingests Northfield's order and inventory data, catalogs and transforms it, lands it
somewhere analysts can query with plain SQL, and runs on a schedule without anyone
manually kicking it off.

## The pipeline, end to end

By Lesson 8, the pipeline looks like this:

```
Raw order/inventory files
        |
        v
   S3 (raw zone)  <-- Lesson 3: Ingesting Data Into S3
        |
        v
  Glue Crawler + Catalog  <-- Lesson 4: Cataloging With Glue
        |
        v
   Glue ETL Job (Spark)  <-- Lesson 5: Transforming With Glue ETL
        |
        v
     Redshift  <-- Lesson 6: Loading Into Redshift
        |
        v
  Athena (ad hoc queries against S3 + Redshift Spectrum)  <-- Lesson 7
        |
        v
Step Functions orchestrates the whole chain on a schedule  <-- Lesson 8
```

Chapter 3 then makes it production-grade: CloudWatch monitoring and alarms, IAM
least-privilege roles for every service in the chain, a CI/CD pipeline so changes deploy
without manual console clicks, a cost-optimization pass, and an honest look at disaster
recovery. Chapter 4 wraps with how to present this project in an interview and what to
put in a portfolio.

## Why this scenario, not a toy dataset

Every AWS service in this course maps to a real decision Northfield's team has to make —
not an arbitrary tutorial exercise. Choosing S3 storage classes (from AWS Data
Engineering's Chapter 1) is a real cost decision once inventory history piles up. Choosing
between a Redshift cluster and Redshift Serverless (Lesson 6 of that course) is a real
call once you know Northfield's query patterns are bursty (heavy at month-end, quiet
otherwise). This capstone keeps returning to that same concrete business, so every AWS
service choice has a stated reason, not just "because the course said so."

## Key terms

| Term | Meaning |
|---|---|
| Raw zone | The S3 prefix holding unmodified, as-ingested source files |
| ETL | Extract, Transform, Load — the Glue job's job |
| Orchestration | Scheduling and sequencing the pipeline's steps automatically |
| Job-ready project | A demo built with the same production practices a real team would require |

## Check yourself

Why does this capstone commit to one concrete business scenario (Northfield Outdoor
Supply) instead of just building each AWS service's feature in isolation with sample
data?
