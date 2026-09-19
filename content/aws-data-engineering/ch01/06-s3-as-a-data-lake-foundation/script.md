# Script — S3 as a Data Lake Foundation

## Segment 1 (title)

There's no single AWS product called "data lake" you provision. It's an architecture — plain S3 storage plus a shared catalog and query layer on top — and this lesson ties together everything from this chapter into that bigger picture.

## Segment 2 (steps: raw, staged, curated)

A well-organized lake separates data into zones by how processed it is: raw, or bronze, is exactly as it arrived from the source and untouched; staged, or silver, is cleaned, deduplicated, and usually columnar; curated, or gold, is business-ready and modeled for a specific consumer like a dashboard or a Redshift table.

## Segment 3 (code: the three building blocks)

S3 stores the bytes. The Glue Data Catalog holds the schema — table names, columns, partitions. Athena or Redshift Spectrum provide the SQL layer on top. Three separate, cheap services standing in for what would otherwise be one expensive, purpose-built data lake product.

## Segment 4 (outro)

Chapter one, done. Next up: IAM roles for services — how Glue, Lambda, and EC2 actually assume the permissions they run with.
