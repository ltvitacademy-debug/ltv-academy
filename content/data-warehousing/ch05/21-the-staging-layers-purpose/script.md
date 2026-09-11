# Script — The Staging Layer's Purpose

## Segment 1 (title)

Welcome to Chapter 5, Staging and ETL Design. Before we touch a single CREATE TABLE statement, let's answer a basic question: why does raw source data land in an intermediate staging area at all, instead of going straight into the warehouse?

## Segment 2 (screenshot: the ETL pipeline)

Here's the classic Extract, Transform, Load pipeline. Extract pulls data out of the source system largely as-is. Transform is where staging does its real work — cleansing, deduplicating, converting types, running business rules — all against staged data, not the live production system and not the finished warehouse tables. Only once the data is warehouse-shaped does Load actually insert or merge it into your fact and dimension tables.

## Segment 3 (steps: what staging buys you)

That separation buys you three concrete things. It isolates the source system, so a slow transformation step never holds a lock against a database that's still taking live orders. It gives you a safe place to fail — a bad row breaks against a staging table you can inspect and fix, not a fact table analysts are actively querying. And it means a failed load can usually be re-run from staged data without hitting a fragile or rate-limited source system all over again.

## Segment 4 (outro)

Staging tables are a rough draft, not a published document — nobody outside the ETL process should query them directly. Next lesson: exactly how a staging table is structured to make that rough-draft role work.
