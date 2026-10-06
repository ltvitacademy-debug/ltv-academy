# Oracle Fusion Cloud Architecture Overview

**Chapter 2 · Oracle Fusion Cloud Applications · Lesson 9 of 20**

You don't need to be a cloud infrastructure engineer to work in Oracle Fusion Cloud Financials — Lesson 7 already established that Oracle manages the infrastructure. But a functional consultant should still know, at a conceptual level, what's running underneath the screens. This lesson gives you just enough architecture to talk intelligently about it.

## What you'll learn

- What Oracle Cloud Infrastructure (OCI) is, and why Fusion Cloud runs on it
- What a customer's set of environments typically looks like
- How the unified data model from Lesson 6 is actually structured
- Why "the cloud" doesn't mean "no structure at all"

## Oracle Cloud Infrastructure (OCI)

**Oracle Cloud Infrastructure (OCI)** is Oracle's own cloud computing platform — its answer to AWS or Microsoft Azure. Oracle Fusion Cloud Applications runs on top of OCI: the physical data centers, networking, and compute resources that Lesson 7 described Oracle as fully responsible for. You'll sometimes see references to an older "Oracle Cloud Classic" infrastructure in historical documentation — Oracle has been migrating Fusion customers onto OCI for several years, and modern implementations run on OCI from day one.

## A customer's environments

When a company subscribes to Oracle Fusion Cloud, it doesn't get just one copy of the application — it gets at least two: a **Production** environment, which is where the real, live business runs, and at least one **non-production** environment (commonly used as a test environment), used to try things out without risk. Lesson 16 covers this in depth; for now, the architectural point is that these environments are logically separate even though they're all running on the same underlying OCI infrastructure, so a mistake made in a test environment can never touch production data.

## The unified data model, structurally

Lesson 6 described Oracle Fusion's unified data model conceptually — one set of master data shared across pillars. Architecturally, this is possible because all of Fusion Cloud's pillars (ERP, SCM, HCM, CX, EPM) are built on **one common underlying data model and a shared technology foundation**, rather than being separate products Oracle glued together after acquiring different companies. That's a meaningfully different architecture from, say, running separate on-premises PeopleSoft and Siebel systems side by side and building custom interfaces between them.

## Security and isolation

Even though many customers ("tenants") share Oracle's infrastructure, each customer's data is logically isolated — one company can never see another company's transactions, configuration, or users, regardless of how the underlying hardware is shared. This isolation is part of what Oracle, not the customer, is responsible for maintaining, consistent with the "who manages what" table from Lesson 7.

## Why this matters for you

As a Financials consultant, you'll never log into a server or configure OCI directly — but understanding that Fusion Cloud is a true cloud-native application, not an old on-premises product simply hosted remotely, helps explain why features like the quarterly update cadence (Lesson 10) work the way they do, and why Oracle can roll out the same update to every customer on the same schedule with confidence.

## Key terms

| Term | Meaning |
|---|---|
| Oracle Cloud Infrastructure (OCI) | Oracle's cloud computing platform that Fusion Cloud runs on |
| Production environment | Where the real, live business runs |
| Non-production environment | Used for testing, isolated from production |
| Tenant isolation | Each customer's data kept separate despite shared infrastructure |

## Check yourself

You're ready for Lesson 10 when you can explain, in plain language, why Oracle Fusion Cloud being built on one shared data model and one cloud platform (rather than several acquired products glued together) makes features like unified reporting and a predictable update schedule possible.
