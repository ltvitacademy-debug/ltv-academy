# Lesson 4 — IaaS vs. PaaS for SQL Server

**Chapter 1 · Azure SQL & DBA Foundations · Lesson 4 of 95**

## What you'll learn

- A one-line recap of IaaS vs. PaaS in general, if you need it
- Exactly how that distinction maps onto the three options from Lesson 3
- Who patches the OS, and who patches SQL Server itself, in each case
- Why "PaaS" isn't a single point on a dial — Managed Instance and Azure SQL Database are both PaaS, but not equally so

## If you've taken Azure Fundamentals, skip ahead

Azure Fundamentals Lesson 2, "IaaS, PaaS & SaaS," already covered
the general distinction: IaaS gives you the infrastructure and you
manage everything above it; PaaS manages the platform (OS, runtime,
patching) for you and you manage only your application and data. If
you took that lesson, you already have this framework — this lesson
does not re-teach it. What follows applies that framework
specifically to SQL Server, where "the platform" means the operating
system *and* the database engine itself.

## Mapping the framework onto Lesson 3's three options

| Option | Model | Who patches the OS | Who patches SQL Server |
|---|---|---|---|
| Azure SQL Database | PaaS | Microsoft | Microsoft |
| Azure SQL Managed Instance | PaaS | Microsoft | Microsoft |
| SQL Server on Azure VM | IaaS | You | You |

At first glance this makes SQL Server on a VM look strictly worse —
you're patching two things instead of zero. That's the correct
reading for patching specifically. It's the wrong reading for
control: full IaaS is what you reach for precisely when you need
OS-level access PaaS won't give you at all — a third-party agent
that must run on the box, a feature version PaaS hasn't caught up
to yet, or compliance language that requires you to name the exact
patch level running underneath your database.

## PaaS isn't one point on a dial

The table above shows Azure SQL Database and Managed Instance as
identical rows, and for OS/engine patching, they are. But "PaaS"
doesn't mean "identically managed" — it means "the platform layer is
someone else's job," and how much of *your* database engine surface
is exposed still varies enormously between them. Azure SQL Database
hides instance-level concepts entirely; Managed Instance exposes
nearly all of them while still keeping the patching promise. Two
PaaS products, two very different amounts of what you can still
touch.

```
IaaS vs. PaaS, applied to SQL Server specifically:

              patches OS   patches SQL Server   instance surface
SQL Database:  Microsoft    Microsoft             least (DB-scoped)
Managed Inst.: Microsoft    Microsoft             near-full (instance)
VM + SQL:      you          you                   full (it's the real thing)
```

## Why this distinction is the real decision lever

Every deployment decision this course revisits in Chapter 3 comes
back to this same lens: how much of the platform do you actually
need to control, versus how much of it would you rather Microsoft
own so you stop thinking about it. A workload with no special OS
requirements and no need for instance-level features almost always
belongs on the most-PaaS option available, because every layer
Microsoft manages is a layer that stops being your on-call problem.

## Key terms

| Term | Meaning |
|---|---|
| IaaS (for SQL Server) | You manage the OS and SQL Server patching yourself — SQL Server on Azure VM |
| PaaS (for SQL Server) | Microsoft manages OS and SQL Server patching — Azure SQL Database and Managed Instance |
| Instance surface | How much of SQL Server's instance-level functionality a PaaS option still exposes to you |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why
are Azure SQL Database and Managed Instance both classified as PaaS
even though one exposes far more SQL Server surface than the other?
