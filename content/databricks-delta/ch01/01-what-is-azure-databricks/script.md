# Lesson 1 — What Is Azure Databricks? · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes (course opener).

---

## S1 · TITLE CARD

Welcome to Azure Databricks and Delta Lake — the second course in
this data engineering track. Let's start with what Databricks
actually is.

## S2 · CODE CARD (picking up from Foundations)

Data Engineering Foundations ended with real PySpark — DataFrames,
joins, window functions, partitioned writes. Every line of that ran
against some Spark cluster. This course is about that cluster
itself: Azure Databricks.

## S3 · CODE CARD (managed Spark)

Recall Foundations Lesson 28 — Spark is a distributed engine, and
someone has to provision the machines, install Spark, and keep it
running. Azure Databricks does exactly that. A few clicks, a
working cluster, ready for a notebook to attach to.

## S4 · STEPS CARD (lakehouse)

That's the whole pitch behind the term lakehouse. A data lake is
cheap and flexible, but weak on transactions and schema guarantees.
A warehouse has those guarantees, but is rigid and expensive. A
lakehouse is cheap storage with Delta Lake's guarantees layered on
top — both at once. Chapter 2 covers exactly how.

## S5 · OUTRO CARD

Fundamentals, Delta Lake, medallion architecture, Unity Catalog,
and Lakeflow — that's this whole course, in order. Next lesson:
creating a Databricks workspace, where every cluster and notebook
actually lives.
