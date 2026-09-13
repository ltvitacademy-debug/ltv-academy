# Lesson 1 — Welcome to Snowflake: Course Overview & What You'll Build

**Chapter 1 · Snowflake Architecture & Getting Started · Lesson 1 of 60**

## What you'll learn

- What this course assumes you already know, and what it teaches instead
- The shape of the 15 chapters ahead, in four groups
- What Snowsight — Snowflake's web interface — actually looks like
- The capstone project this whole course builds toward

## Who this course is for

This is a **focused specialization, not a mega-course**. It assumes you
already know SQL — joins, CTEs, indexes, primary/foreign keys, and
fact/dimension tables — from T-SQL Development or equivalent
experience. Nothing here re-teaches SQL from scratch. Every lesson
answers one question: *how does the thing I already know how to do get
done in Snowflake specifically?*

## What a real Snowflake session looks like

Nearly everything in this course happens inside **Snowsight**,
Snowflake's web-based interface — a SQL worksheet, a tree of databases
and schemas, and a role and warehouse you actively choose for every
query:

![A real Snowsight worksheet: a SQL editor with a query, the database object tree (Cybersyn database, schemas, tables) on the left, and role/warehouse selectors in the top right — SYSADMIN role, ANALYTICS_WH warehouse.](/courses/snowflake/ch01/01-welcome-to-snowflake-course-overview/snowsight-worksheet.png)
*Every query in Snowflake runs as a specific role, against a specific warehouse — both visible and switchable right here, not buried in a settings menu.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

Two things stand out immediately if you're coming from SSMS: the
**role** you're running as (SYSADMIN here) and the **warehouse**
powering the query (ANALYTICS_WH) are both explicit, visible, and
changeable per query — Snowflake separates "who's asking" and "what's
paying for the compute" from the query itself in a way on-prem SQL
Server never made you think about.

## The four groups this course moves through

1. **Foundations & SQL differences** (Ch. 1–2) — Snowflake's
   architecture, and exactly where its SQL dialect diverges from
   T-SQL.
2. **Getting data in and shaping it** (Ch. 3–7) — loading data,
   Snowpipe, ELT transformations, dimensional modeling, and JSON/semi-
   structured data.
3. **Running it like production** (Ch. 8–11) — Streams & Tasks,
   security/RBAC, performance tuning, and cost management.
4. **Connecting it and closing it out** (Ch. 12–15) — Power BI,
   where Snowflake fits alongside dbt/ADF/Airflow, troubleshooting,
   and a full end-to-end capstone.

## The capstone you're building toward

Chapter 15 isn't a quiz — it's a real pipeline: raw data (SQL
Server/CSV/JSON) loaded into Snowflake, transformed through a proper
staging → warehouse → reporting layering, modeled dimensionally with
Streams and Tasks keeping it current, secured with RBAC, and finally
connected to Power BI. Everything in between exists to make that
capstone possible, not as an isolated exercise.

## Key terms

| Term | Meaning |
|---|---|
| Snowsight | Snowflake's web-based UI — worksheets, object browser, role/warehouse selectors |
| Role | The identity a query runs as — determines what it's allowed to see or do |
| Warehouse | The compute resource powering a query — separate from the data itself |
| Worksheet | A Snowsight tab for writing and running SQL, roughly Snowflake's version of an SSMS query window |

## Lab

1. If you don't have one already, sign up for a free Snowflake trial
   account.
2. Open Snowsight and locate the role selector and warehouse selector
   — note what role and warehouse you're currently using.
3. Open a new worksheet and run `SELECT CURRENT_ROLE(),
   CURRENT_WAREHOUSE();` — confirm it matches what the UI showed you.

## Check yourself

You're ready for Lesson 2 when you can find the role switcher and
warehouse switcher in Snowsight without hunting for them, and you can
explain in one sentence why Snowflake makes both explicit per query.
