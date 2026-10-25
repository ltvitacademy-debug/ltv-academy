# Lesson 6 — Source Systems and Extraction · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter 1 defined lineage and the table-level vs. column-level distinction from Lesson 4, in the abstract. Chapter 2 traces an actual record through an actual pipeline, hop by hop, starting here, at the moment data leaves a source system and enters yours.

## S2 · STEPS — SOURCE SYSTEM TYPES

Almost every pipeline pulls from one of three categories. OLTP databases — SQL Server, Oracle, Postgres — written the instant something happens, by an order form or a POS terminal. SaaS and API sources, like Salesforce, a payroll vendor, or a shipping provider, where you don't get database access — only what their API exposes, paginated and rate-limited. And files and streams: CSV, Parquet, or fixed-width files dropped on a schedule, or event streams like Kafka topics and IoT telemetry arriving continuously.

## S3 · STEPS — WHAT METADATA IS AVAILABLE

Each category constrains what lineage metadata is even available at the source. An OLTP database usually has reliable timestamps and primary keys to work with. A vendor's CSV drop might have neither — which means your extraction job has to manufacture that lineage metadata itself, like a load timestamp or a batch ID, because the source system never will.

## S4 · STEPS — EXTRACTION METHODS

Four common extraction methods. Full extract pulls every row every time — simple, but it only shows what exists now, not what changed. Incremental extract pulls only rows changed since the last run. Change Data Capture reads the database's transaction log, capturing every insert, update, and delete as a discrete, ordered event — the richest source, since you get a row's full history, not just its current state. API pull makes paginated calls bounded by what the vendor's endpoint tracks — skip a last-modified field, and that history can't be reconstructed later.

## S5 · CODE — LINEAGE'S POINT ZERO

Every later hop in this chapter — staging, the warehouse, the semantic model, the dashboard — can only be as trustworthy as what gets recorded right here, the moment data first lands. If an extraction job doesn't tag each row with its source system, its extraction method, and the run that pulled it, there's no way to answer where this number came from three hops later — and you can't recover that lineage after the fact, only capture it now or lose it permanently.

## S6 · OUTRO

Next lesson: what happens to a row after it lands — ETL and ELT lineage, and why the shift between them changes how lineage gets captured, bolted on after the fact or built directly into the transformation itself.
