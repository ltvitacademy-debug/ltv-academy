# What Data Cloud Solves

Chapter 3 was about building and shipping dashboards on data that CRM Analytics prepares for itself. Chapter 4 steps down a layer, to the data platform that Salesforce's newer analytics tools sit on. You met its vocabulary in Lesson 2. Before the next lessons walk through data streams, identity resolution, calculated insights, and segments, this lesson answers a simpler question: what is actually broken that Data Cloud exists to fix? A note on names: Salesforce launched the platform as **Data Cloud** and, as of this writing, calls it **Data 360**. It is the same platform, and both names appear in the product and in Trailhead.

## What you'll learn

- Why customer data is scattered, and why that breaks analytics
- The four jobs Data Cloud performs, from ingestion to activation
- How this differs from a warehouse or a CRM Analytics dataset
- What to keep in mind about its changing names and features

## The problem: one customer, many records

A typical company stores customer data in many places. The CRM holds accounts, contacts, and opportunities. A commerce system holds orders. A support tool holds cases. A marketing platform holds email engagement and web activity. A warehouse holds history. Each system has its own IDs, its own field names, and its own idea of what a "customer" is.

Picture one person, illustrative names only:

- CRM contact: Ana Ruiz, work email
- Commerce order: A. Ruiz, personal email
- Web form: Ana R., only a browser cookie

To every system these are three different people. Ask "how many customers bought last quarter?" and the answer is inflated. Ask "which customers have both an open case and an active campaign?" and you cannot answer at all, because nothing links the records. From your T-SQL background you know the shape of this failure: without a shared key you cannot join, and without clean keys your counts are wrong.

## The four jobs

Data Cloud addresses this with four stages, each of which gets a lesson in this chapter:

1. **Ingest.** Data streams bring data in from Salesforce and non-Salesforce sources, in batch or streaming form. For some external sources Salesforce also describes zero-copy approaches, where data can be queried in place rather than duplicated, though availability varies by source.
2. **Harmonize.** Ingested fields are mapped into a common data model so that "email" means the same thing regardless of origin.
3. **Unify.** Identity resolution matches records that describe the same person or account and links them into a unified profile.
4. **Analyze and act.** Calculated insights compute reusable metrics, and segments group profiles for use in marketing, service, and analytics tools such as Tableau Next.

## How it differs from what you know

**A warehouse** stores and models data for analysis, but you build the matching and modeling yourself, in SQL. **A CRM Analytics dataset** is prepared for one analytics purpose inside that platform. **Data Cloud** is a Salesforce-native layer that standardizes and unifies customer data once, so that many tools, including CRM Analytics, Tableau Next, and Agentforce, can draw on it. They are complementary, not rivals. Many organizations use a warehouse and Data Cloud together, which Chapter 7 explores.

## Why analysts should care

Unified data is what makes questions like "customer lifetime value across channels" possible at all. It is also why a wrong number in a modern Salesforce dashboard is often an upstream problem: an unmapped field, a missed match, a stale stream. Knowing the four jobs tells you where to look.

## Keeping current

Data Cloud has been renamed, re-packaged, and extended repeatedly, and features, licensing, and connector lists change each release. Learn the concepts here, and treat any specific feature or limit as something to verify in current release notes.

## Recap

- The problem is scattered records with no shared identity
- Ingest, harmonize, unify, then analyze and act
- Complements warehouses and CRM Analytics rather than replacing them
- Names and features shift, so verify details

## Check yourself

Three systems each hold a record for the same customer under different emails. Which of the four jobs decides they are one person?
