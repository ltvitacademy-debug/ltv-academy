# Lesson 1 — Governance in Microsoft Fabric

**Chapter 1 · Fabric Governance Foundations · Lesson 1 of 25**

## What you'll learn

- What Microsoft Fabric is, in one sentence: one SaaS platform, one tenant, one underlying lake, many workloads
- Why a platform built on a single shared lake needs its own governance layer, distinct from general governance theory
- The five governance surfaces this course covers, chapter by chapter
- How this course relates to the rest of the catalog — and what it assumes you already know
- Who actually owns Fabric governance decisions in practice, and why that ownership shifts as you go

## What Microsoft Fabric is

Microsoft Fabric is a single SaaS analytics platform that bundles what used to be separate products — a lakehouse engine, a data warehouse, Data Factory pipelines, Power BI, Real-Time Intelligence, and Data Science tools — into one product, under one tenant, built on top of one underlying lake called **OneLake**. You don't provision a separate storage account per workload the way you might across disconnected tools. Every lakehouse, warehouse, and semantic model you create stores its actual data as folders and files inside that same OneLake, automatically.

That's the one sentence worth remembering: **one tenant, one lake, many workloads.**

## Why Fabric needs its own governance layer

General data governance theory — policies, roles, stewardship, data quality — applies everywhere, Fabric included. But Fabric's architecture creates a governance problem most general theory doesn't anticipate: because every workload shares the same underlying lake, a permission mistake or an ungoverned workspace isn't boxed into one tool the way it might be if your warehouse, your BI layer, and your pipelines were three unrelated products with three separate security models. In Fabric, a mistake is visible tenant-wide by default, because tenant-wide is the default shape of the platform.

That single fact — one shared lake instead of several disconnected ones — is why this course exists as its own course, and why it goes deep on how governance shows up specifically inside Fabric's UI and architecture, rather than re-teaching governance theory you'd already find in a general course like *Data Governance Foundations* elsewhere in this catalog.

## The five governance surfaces this course covers

This course follows Fabric's own shape, broad-to-narrow, one chapter at a time:

1. **Fabric Governance Foundations** (this chapter) — the tenant, capacity, the admin portal, domains, and workspaces: the structural containers everything else lives inside
2. **OneLake** — the shared lake itself, lakehouses and warehouses, OneLake security, shortcuts, and data access roles
3. **Security and Protection** — item permissions, row- and column-level security, sensitivity labels, and auditing
4. **Discovery and Lineage** — the catalog, endorsement and certification, lineage, and impact analysis
5. **Governed Analytics** — governed self-service analytics and Purview integration, closing with a case study and a practice lab

## What this course assumes you already know

This course assumes you can already build a lakehouse, a warehouse, or a pipeline in Fabric — that's covered in the separate *Fabric & Real-Time Analytics* course in this catalog. This course teaches how to **govern** what you already know how to build, not how to build it. If a lesson mentions creating an item, it's showing you the governance-relevant settings around that item, not re-teaching the build steps.

## Who owns Fabric governance in practice

In most organizations, tenant and capacity settings sit with a small, central admin team — the people with the broadest blast radius if something goes wrong. Domain, workspace, and item-level decisions get distributed outward to business-unit leads and individual workspace owners, who understand their own data better than a central team ever could. This course follows that same path: broad, centralized decisions first, narrower, delegated decisions later — the same order you'll see the platform itself default to, lesson by lesson.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Fabric | A single SaaS analytics platform unifying lakehouse, warehouse, pipeline, BI, real-time, and data science workloads under one tenant |
| OneLake | The one automatic, tenant-wide data lake every Fabric workload stores its data in |
| Workload (item type) | A Fabric capability area — such as a lakehouse, warehouse, pipeline, or report — created as an item inside a workspace |

## Lab

Without opening Fabric yet, write down one sentence for each of this course's five chapters, in your own words, describing what you expect that chapter to cover based on this lesson's roadmap alone. Keep the note — you'll check it against what you actually learn as you go.

## Check yourself

Can you explain, in one or two sentences, what specifically makes governing Microsoft Fabric different from general data governance theory — and name the course in this catalog that already covers how to build the Fabric items this course teaches you to govern?
