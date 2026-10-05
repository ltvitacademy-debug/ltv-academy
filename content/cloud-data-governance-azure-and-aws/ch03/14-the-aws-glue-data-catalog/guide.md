# Lesson 14 — The AWS Glue Data Catalog

**Chapter 3 · Storage and Catalogs · Lesson 14 of 25**

## What you'll learn

- How the Glue Data Catalog organizes metadata into databases and tables
- What a crawler actually does, and when it runs versus when it doesn't
- How to read a real table's schema page, including its version history
- How schema comments can carry sensitivity classifications like PII tags

## Databases and tables, not files and folders

The **AWS Glue Data Catalog** is AWS's central metadata repository — technically the same catalog that Amazon Athena, Amazon Redshift Spectrum, and EMR all query against, which is why it comes up constantly outside of Glue itself. It organizes metadata into two familiar-sounding but specific concepts:

- A **database** in the Glue Data Catalog is just a logical namespace — a way to group related tables together. It holds no data itself.
- A **table** is metadata *about* data that physically lives elsewhere (almost always S3) — its schema, column names and types, partition structure, and storage location. The table definition and the underlying data are two separate things; deleting a Glue table does not delete the S3 objects it was describing.

## Crawlers: how tables get populated

A **crawler** is the AWS equivalent of the Purview scan from Lesson 13 — a job that connects to a data source (typically an S3 path), infers schema from the actual files it finds there, and writes or updates table definitions in the Data Catalog. Running one shows up in its own console page:

![Console screenshot showing a Glue crawler in the running state, with a success banner.](/courses/cloud-data-governance-azure-and-aws/ch03/14-the-aws-glue-data-catalog/glue-crawler-running.png)
*A crawler mid-run — status READY, one run currently "Running" in the Crawler runs history.*

Crawlers don't run continuously by default; they run on demand or on a schedule you configure, and each run can add new tables, add new partitions to existing tables, or update a table's schema if the underlying files changed shape.

## Reading a table's schema page

Once a crawler completes, its output is a table page showing the inferred schema, with **version history** tracked automatically every time that schema changes:

![Console screenshot showing a Glue Data Catalog table's schema — four string columns, Version 3.](/courses/cloud-data-governance-azure-and-aws/ch03/14-the-aws-glue-data-catalog/glue-table-schema.png)
*Table details: classification (CSV), S3 location, and a four-column schema at Version 3.*

Notice the table's **Location** field points at an `s3://` path — confirming the table is pure metadata pointing at S3 data, not a copy of it. The **Version** selector lets you see exactly how a schema evolved over successive crawler runs or manual edits.

## Comments carry classification

Table schemas aren't just structural — the **Comment** column on each field can carry free-text annotations, including the output of automated sensitive-data detection. Compare the same table, four versions later:

![Console screenshot showing the same table's schema at Version 7, with PII classification comments on two columns.](/courses/cloud-data-governance-azure-and-aws/ch03/14-the-aws-glue-data-catalog/glue-table-schema-pii.png)
*Version 7 of the same table — columns 3 and 4 now carry "Sensitive Data Element" comments for EMAIL and USA_SSN.*

This is a common real-world pattern: an automated classification job (AWS Glue's own sensitive data detection, or a custom Lambda) runs after the crawler, inspects sample values, and writes its findings directly into the schema's comment fields — which is exactly the kind of signal AWS Lake Formation (Lesson 15) and column-level permissions can act on downstream.

## Key terms

| Term | Meaning |
|---|---|
| Glue Data Catalog | AWS's central metadata repository, shared by Glue, Athena, Redshift Spectrum, and EMR |
| Database (Glue) | A logical namespace grouping related tables; holds no data itself |
| Table (Glue) | Metadata — schema, location, partitions — describing data that lives elsewhere, usually S3 |
| Crawler | A job that infers schema from a data source and writes/updates table definitions |
| Schema version | A tracked snapshot of a table's schema, created each time it changes |

## Lab

Point a Glue crawler at a small S3 folder containing a CSV file, run it, and inspect the resulting table's schema. Note the inferred column names and types. Then add or remove a column from the source CSV, re-run the crawler, and compare the new schema version against the original.

## Check yourself

- If you delete a table from the Glue Data Catalog, does that delete the underlying S3 data? Why or why not?
- What's the difference between a Glue database and a Glue table?
- Where do PII classification comments like "Sensitive Data Element | ['EMAIL']" typically come from, and what downstream system is likely to use them?
