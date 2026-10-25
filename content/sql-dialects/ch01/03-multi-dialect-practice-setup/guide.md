# Lesson 3 — Setting Up a Multi-Dialect Practice Environment

**Chapter 1 · The Landscape · Lesson 3 of 5**

## What you'll learn

- Genuinely free ways to practice each dialect from this course on your own machine or in the cloud
- Which installs are full local databases vs. cloud free tiers
- A sane order to install things in, so you're not fighting five installers at once
- What to expect once each tool is running (client, not server, differences)

## SQL Server — you likely already have this

You already know T-SQL, so you may already have a practice instance. If not: **SQL Server
Developer Edition** is free and full-featured (not a crippled trial), intended exactly for
learning and development. Alternatively, Azure SQL has a free tier if you'd rather practice in the
cloud without installing anything locally.

## Oracle — Database XE or Autonomous Database Free Tier

Oracle offers **Oracle Database XE (Express Edition)** as a genuinely free download for local
practice — it has some size and resource limits compared to the paid editions, but it's a real
Oracle database, not a simulator. If you'd rather not install anything locally, **Oracle Autonomous
Database Free Tier** in Oracle Cloud gives you a hosted Oracle instance at no cost.

## MySQL — Community Edition

**MySQL Community Edition** is free and open-source, and installs cleanly on Windows, macOS, or
Linux. This is the same MySQL engine used in production everywhere — there's no "crippled" free
tier distinction here the way there is with some commercial databases.

## PostgreSQL — also free and open-source

**PostgreSQL** itself is entirely free and open-source, full stop. There's no edition split to
think about. Install it directly, or reach for a GUI client like pgAdmin alongside it.

## Cloud warehouses — trial and community tiers

- **Snowflake** offers a **30-day free trial** with credits, enough to work through warehouse-
  specific lessons later in this course.
- **Databricks** offers a **free Community Edition**, a genuinely free (not time-limited the same
  way) way to run Spark SQL in a notebook environment.

```sql
-- Once you're set up, a sanity-check query on each platform should return
-- something back -- that's all you need before moving on:

-- SQL Server:
SELECT @@VERSION;

-- Oracle:
SELECT * FROM v$version;

-- MySQL:
SELECT VERSION();

-- PostgreSQL:
SELECT version();
```

## A sane install order

Do SQL Server first (you likely have it), then PostgreSQL (easiest clean install), then MySQL,
then Oracle XE (heaviest installer), and save the cloud warehouse trials for when you actually
reach Chapter 9 — trial clocks are often time-limited, so don't start them early.

## Key terms

| Term | Meaning |
|---|---|
| Developer Edition | A vendor's free, full-featured edition intended for learning/development, not production |
| Express Edition (XE) | Oracle's free, resource-limited (but genuinely functional) edition |
| Community Edition | A vendor's free, open-source or no-cost edition (MySQL, Databricks) |
| Free trial | Time-limited full access, typically requiring a credit card (Snowflake) |

## Lab

Install at least one platform you don't already have running (PostgreSQL is the fastest clean
install if you're not sure where to start), and run that platform's version-check query from this
lesson to confirm it works.

## Check yourself

You're ready for Lesson 4 when you can name which of these five platforms has no "crippled" free
tier at all, and which two are better started later in the course because of time-limited trials.
