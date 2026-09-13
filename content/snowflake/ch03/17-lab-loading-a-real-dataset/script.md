# Script — Lab: Loading a Real Dataset Into Snowflake

## Segment 1 (title)

This lab ties Chapter 3 together — stage, file format, and COPY INTO — against a real, publicly-accessible dataset: Cybersyn's consumer company metadata, straight from a public S3 bucket.

## Segment 2 (screenshot: LIST @stage result)

Before loading anything, confirm the stage actually sees real files. LIST @stage returns the real CSV files sitting in that public bucket — not a guess that the connection works, proof of it.

## Segment 3 (steps: the five-step walkthrough)

Create a database and external stage pointed at the bucket, define a named file format, create the target table, then run COPY INTO with ON_ERROR set deliberately.

## Segment 4 (code: verifying the load)

Check the COPY INTO result set for status and row counts, query the table directly, and then run the exact same COPY INTO again — it should load zero additional rows, proving Snowflake's load metadata is working exactly as Lesson 14 described.

## Segment 5 (outro)

Next chapter: Snowpipe. Everything in this lab ran as a manual COPY INTO you triggered yourself — Chapter 4 automates that same load so it happens the moment a new file lands, with nobody running anything by hand.
