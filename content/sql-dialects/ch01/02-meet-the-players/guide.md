# Lesson 2 — Meet the Players: SQL Server, Oracle, MySQL, PostgreSQL & Cloud Warehouses

**Chapter 1 · The Landscape · Lesson 2 of 5**

## What you'll learn

- The five families of SQL dialect you'll compare throughout this course
- Each platform's dialect name and where it came from
- How cloud data warehouses fit into (and complicate) this picture
- Which platforms borrow syntax ideas from each other, and why

## The four "traditional" relational platforms

**SQL Server — T-SQL.** You know this one. Transact-SQL, Microsoft's dialect, with roots shared
with Sybase going back to the 1980s. The baseline for this entire course.

**Oracle Database — PL/SQL.** Oracle's dialect pairs standard-ish SQL for queries with PL/SQL
("Procedural Language/SQL") for stored procedures, functions, packages, and anything beyond a
single statement. PL/SQL is its own substantial language — Chapter 6 of this course is dedicated
entirely to it.

**MySQL — MySQL's own dialect.** Built from scratch in the 1990s, MySQL has its own SQL dialect
with its own procedural syntax (closer in spirit to standard SQL/PSM than PL/SQL is, but still
distinctly its own). MariaDB forked from MySQL and shares almost all of its dialect, so what you
learn about MySQL mostly transfers.

**PostgreSQL — PostgreSQL's dialect + PL/pgSQL.** Postgres has a reputation for standards
compliance and also has its own rich set of extensions — native array and JSON types, powerful
operators, and PL/pgSQL for procedural code. Many newer products (including some cloud warehouses)
borrow syntax ideas from Postgres specifically because of this reputation.

```sql
-- The same idea, four different procedural "worlds" (full syntax comes later —
-- for now just notice these are four genuinely different languages for
-- "do something beyond a single query"):

-- T-SQL:      CREATE PROCEDURE ... AS BEGIN ... END
-- PL/SQL:     CREATE PROCEDURE ... IS BEGIN ... END;
-- MySQL:      CREATE PROCEDURE ... BEGIN ... END (with DELIMITER tricks)
-- PL/pgSQL:   CREATE FUNCTION ... AS $$ BEGIN ... END; $$ LANGUAGE plpgsql;
```

## Cloud data warehouses: a fifth family, with its own variations

Cloud warehouses are built for analytics at scale rather than transactional (OLTP) workloads, and
each has its own SQL dialect layered on top of standard SQL:

- **Snowflake** — its own SQL dialect, with strong semi-structured data support (`VARIANT` type)
- **Databricks / Spark SQL** — SQL over a Spark engine, with its own functions and some PySpark
  crossover
- **BigQuery** — Google's warehouse, standard-SQL-flavored but with its own functions and nested/
  repeated field handling
- **Redshift** — Amazon's warehouse, originally forked from PostgreSQL, so its dialect leans
  noticeably Postgres-flavored

Notice the pattern: warehouse vendors often borrow syntax ideas from Postgres or SQL Server rather
than inventing everything from scratch, because analytics-focused engineering teams are usually
already comfortable with one of those two.

## Key terms

| Term | Meaning |
|---|---|
| T-SQL | SQL Server's dialect |
| PL/SQL | Oracle's dialect, including its procedural language |
| PL/pgSQL | PostgreSQL's procedural language (Postgres's own SQL dialect covers plain queries) |
| OLTP | Online Transaction Processing — the traditional relational-database workload |
| Cloud data warehouse | An analytics-focused platform (Snowflake, Databricks, BigQuery, Redshift) with its own SQL variant |

## Lab

Without looking anything up, write down which dialect name goes with which platform: SQL Server,
Oracle, MySQL, PostgreSQL, Redshift. Then check your answers against this lesson. You'll use these
names constantly for the rest of the course.

## Check yourself

You're ready for Lesson 3 when you can name all five platform families in this course and explain,
in one sentence, why Redshift's dialect leans Postgres-flavored.
