# Lesson 1 — Course Introduction: Becoming an Azure Database Administrator

**Chapter 1 · Azure SQL & DBA Foundations · Lesson 1 of 95**

## What you'll learn

- What this course assumes you already have, and what it doesn't re-teach
- The real shift this course makes: from writing SQL to keeping SQL alive
- The DP-300 certification this course is built against, and why the section lengths aren't arbitrary
- The arc of all 16 chapters, in one pass

## What you already have

T-SQL Development's 118 lessons already covered writing SQL —
`SELECT`, `JOIN`s, stored procedures, primary/foreign keys, indexes,
and by its final chapters, warehousing concepts like fact/dimension
tables and star schemas. This course does not re-teach any of that.
Every one of those skills gets reused immediately, redirected toward
a different job: not writing queries against a database, but keeping
the database itself running, secure, fast, and recoverable.

```
T-SQL Development:        Azure Database Administrator:
write a query               why is this query slow, and how do you fix it
create a table               who's allowed to read this table, and how do you prove it
design a schema              how do you keep this schema alive through a regional outage
```

## The real shift: from developer to administrator

A developer's SQL knowledge answers "how do I get the data I need?"
A DBA's job starts after that query already works: does it run fast
enough under real load, is the right person (and only the right
person) allowed to see the result, what happens if this server goes
down at 2 a.m., and how do you prove all of that to an auditor. This
course is organized around exactly those questions — deployment,
security, monitoring, performance, automation, migration, backup,
and high availability — not around more SQL syntax.

## What this course is built against

This course follows Microsoft's **DP-300** certification blueprint
(Administering Relational Databases on Microsoft Azure), current as
of its most recent skills-measured update. DP-300 weights five real
domains, and this course's section lengths deliberately mirror that
weighting rather than splitting every topic evenly:

| DP-300 domain | Weight | Where it lives in this course |
|---|---|---|
| Platform resources | 15-20% | Chapters 1-3 |
| Security | 20-25% | Chapters 4-6 |
| Monitoring & performance | 20-25% | Chapters 7-9 (Chapter 8 alone is 9 lessons) |
| Automation | 15-20% | Chapters 10-11 |
| High availability & disaster recovery | 20-25% | Chapter 14 (8 lessons) |

Two newer additions to the real exam objectives — **Azure Arc-enabled
SQL services** and **Azure SQL Database in Microsoft Fabric** — are
folded into Chapter 3 rather than skipped, since Microsoft added
them to the current blueprint.

## The arc, chapter by chapter

Chapters 1-3 get you a real environment running and choosing the
right deployment shape. Chapters 4-6 lock it down — who can access
what, over what network, with what encrypted. Chapters 7-9 are about
knowing when something's wrong and fixing it, with Chapter 8's query
performance tuning as this course's single largest chapter on
purpose. Chapters 10-11 automate what you'd otherwise do by hand
every week. Chapter 12 gets an on-prem database into Azure in the
first place. Chapter 13 makes sure you can always get it back.
Chapter 14 makes sure it survives a real outage. Chapter 15 is one
continuous real-world scenario tying all of it together. Chapter 16
closes with exam review and DBA interview practice.

## Key terms

| Term | Meaning |
|---|---|
| DP-300 | Microsoft's certification for administering relational databases on Azure |
| Platform resources | The deployment/configuration domain — Chapters 1-3 |
| HA/DR | High Availability & Disaster Recovery — Chapter 14, 20-25% of the exam |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: what
does this course assume you already know from T-SQL Development, and
what's the one thing it redirects that knowledge toward instead of
re-teaching it?
