# Script — A Cost Optimization Pass

## Segment 1 (title)

The pipeline works, is monitored, is secured, and deploys through CI/CD. This lesson takes a pass specifically at cost — showing you thought about spend the way a real team has to, every month.

## Segment 2 (code: S3 lifecycle policy)

Raw order files stay in S3 Standard for 30 days, then move to Standard-IA, then to Glacier Instant Retrieval after 90 days — still millisecond-readable at every tier, since analysts query the curated zone, not year-old raw data directly.

## Segment 3 (code: Glue DPU sizing)

northfield-orders-etl runs five G.1X workers, sized for one night's incremental partition rather than a full historical reprocess. Glue bills per DPU-hour, so the dashboard from Lesson 9 tracks DPU-hours per run in case that sizing needs revisiting as data volume grows.

## Segment 4 (steps: four levers, one already the biggest)

Redshift Serverless, chosen back in Lesson 6 for Northfield's bursty query pattern, is already the single biggest cost lever in this whole pipeline — auto-pause beats a cluster billing 24/7. S3 lifecycle tiering handles aging raw data automatically. And Parquet plus the Athena scan cap from Lesson 7 was already cutting query cost before this lesson even started.

## Segment 5 (outro)

Next up: disaster recovery considerations — what happens if a zone, a region, or a table is lost, and how this pipeline recovers.
