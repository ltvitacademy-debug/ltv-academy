# Lesson 7 — ETL and ELT Lineage · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 6 covered extraction, step one of every pipeline. This lesson covers what happens next — and the difference between ETL and ELT isn't just a reordering of letters, it changes where lineage actually lives.

## S2 · STEPS — ETL

In ETL, raw data is pulled, transformed in a dedicated engine — SSIS, Informatica, a script — and only the finished result lands in the warehouse. Lineage lives in the orchestration tool's job definitions. If that job isn't documented, the lineage has to be reconstructed by reading code.

## S3 · STEPS — ELT

In ELT, raw data lands unchanged first, then gets transformed in place with SQL or a tool like dbt. Cheap cloud storage and compute are what made this practical — you don't have to decide what to keep before you've even looked at it.

## S4 · CODE — WHERE LINEAGE LIVES

A dbt model that references two staging tables to build a fact table has declared its own lineage edges in plain SQL. The tool can parse those references and draw the dependency graph automatically — lineage as a byproduct of the code, not a separate documentation step.

## S5 · OUTRO

Next lesson: following a row through a data lake and warehouse — bronze, silver, gold, and what views versus materialized tables mean for lineage.
