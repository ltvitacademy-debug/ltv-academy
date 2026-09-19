# Script — Capstone Kickoff & Business Scenario

## Segment 1 (title)

This capstone ties together every AWS service from AWS Data Engineering into one working platform, then layers on the production practices that separate a portfolio demo from a job-ready project.

## Segment 2 (code: the scenario)

Northfield Outdoor Supply is a mid-size e-commerce retailer. Today their sales and inventory data lives in an on-premises SQL Server database, and reporting means a nightly manual export to a spreadsheet. We're building them a serverless-first AWS data platform with same-day visibility instead.

## Segment 3 (steps: the pipeline, end to end)

The pipeline lands raw files in S3, catalogs them with a Glue crawler, transforms them with a Glue ETL job, loads the result into Redshift, exposes it to ad hoc queries through Athena, and Step Functions orchestrates the whole chain on a schedule.

## Segment 4 (outro)

Chapter 3 makes it production-grade — monitoring, least-privilege IAM, CI/CD, cost optimization, and disaster recovery. Next up: architecture planning, where we decide exactly how these services fit together before writing a line of pipeline code.
