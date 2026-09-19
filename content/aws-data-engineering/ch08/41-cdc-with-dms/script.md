# Script — CDC With DMS

## Segment 1 (title)

A full load answers how you get data in once. Change Data Capture answers the harder question: how you keep it in sync after that — streaming every insert, update, and delete from the source continuously.

## Segment 2 (steps: the transaction log)

DMS doesn't poll the source table for differences. It reads the database engine's own transaction log — SQL Server's transaction log, MySQL's binlog, Oracle's redo logs — the same mechanism the engine uses for crash recovery. That means DMS sees every committed change, in order, without running repeated queries against production.

## Segment 3 (code: full load + CDC, together)

The combined migration type does a full load first, noting the log position where it started, then seamlessly applies every change from that exact position onward. No gap, no missed or double-applied changes.

## Segment 4 (steps: a realistic use case)

A common pattern: an OLTP application database needs to feed a Redshift warehouse for reporting, without analytics queries competing with the app for resources. Full load plus CDC keeps that warehouse copy continuously current — new orders show up within seconds to minutes, not through a nightly batch job.

## Segment 5 (outro)

CDC with DMS down. Next up: DMS troubleshooting — the real issues you'll hit with LOB columns, validation, and connectivity.
