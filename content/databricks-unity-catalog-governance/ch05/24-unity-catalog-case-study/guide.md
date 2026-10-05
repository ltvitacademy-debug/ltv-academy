# Lesson 24 — Unity Catalog Case Study

**Chapter 5 · Lakehouse Governance · Lesson 24 of 25**

## What you'll learn

- A full walkthrough applying every chapter of this course to one realistic, fictional scenario
- How metastores, permissions, fine-grained security, auditing, and Chapter 5's Lakehouse Governance topics connect as one coherent rollout, not five separate projects
- What actually changes, concretely, when an organization finishes a Unity Catalog adoption
- Where the Data Governance career path continues from here

## The scenario (fictional, illustrative)

**Driftwood Trail Outfitters** is a fictional mid-sized outdoor-gear retailer — not a real company. Three regional analytics teams each run their own Databricks workspace, each with its own Hive metastore, built up independently over several years. A demand-forecasting model is trained ad hoc in the West region's workspace with no record of which table it was trained on. Every month, someone manually exports a CSV of recent sales and emails it to a logistics partner, because nobody has set up anything more structured. This is a realistic composite of the problems this course exists to solve — not a real company's data.

## Applying the course, chapter by chapter

**Chapter 1 (Foundations):** The platform team starts by standing up a single Unity Catalog metastore and attaching all three regional workspaces to it (Lesson 2), replacing three independent Hive metastores with one governed boundary. They design the catalog layer around environment and business unit — `prod`, `staging`, and per-region schemas (Lesson 3) — rather than letting table sprawl continue unchanged, and decide up front which storage stays externally managed versus Unity-Catalog-managed (Lesson 5).

**Chapter 2 (Permissions):** Regional analyst groups get mapped to Unity Catalog groups (Lesson 6), and access is granted with `GRANT SELECT ON SCHEMA west.sales TO regional_analysts_west` rather than per-table one-offs (Lesson 7) — relying on inheritance (Lesson 9) so new tables added to a schema don't need a separate grant statement each time.

**Chapter 3 (Fine-Grained Security):** The sales table contains customer email addresses. Rather than withholding the whole table from most of the company, the governance team applies a column mask (Lesson 12) that shows full emails only to the Finance group, and a row filter (Lesson 11) limiting each region's analysts to their own region's rows by default — the same table, different views depending on who's querying it.

**Chapter 4 (Discovery, Lineage and Auditing):** The demand-forecasting model's missing lineage gets fixed going forward: retraining code now logs its input dataset, so the model's lineage graph (Lesson 17) shows exactly which sales table trained each version. System tables (Lesson 18) give the platform team a queryable audit log of every access to the sales schema, closing the "we have no idea who read this" gap Lesson 19 warned about.

**Chapter 5 (Lakehouse Governance):** The CSV-over-email process gets replaced with a real Delta Share (Lesson 21) — `CREATE SHARE`, a table added with a column mask already applied, and a recipient scoped to the partner's own metastore ID, replacing an unaudited email attachment with a revocable, logged grant. The forecasting model itself gets registered into Unity Catalog (Lesson 22) under `prod.forecasting.demand_model`, with a `Champion` alias so serving code never hardcodes a version number. And the three regions' Hive metastore tables get moved over using `SYNC` for the straightforward external tables and UCX (Lesson 23) to coordinate the larger West region migration, which has the most tables and the most history.

## The result

Six months later, Driftwood Trail Outfitters has one metastore instead of three Hive metastores, a documented and masked customer table instead of an all-or-nothing access decision, a forecasting model with real lineage back to its training data, and a partner data feed that can be audited and revoked in one SQL statement instead of a recurring email nobody tracks. Nothing about the underlying business changed — the data just finally has one home, with one consistent set of rules for who can see what.

## This course's closing advice

Start with the metastore and catalog layout before granting a single permission — structure decisions made early are expensive to undo later. Grant at the schema level and lean on inheritance rather than managing permissions table by table. Apply row filters and column masks to the *table*, not by duplicating it into a "safe" and "restricted" copy. Treat lineage and audit logging as something you turn on before an incident, not something you scramble to add after one. And when data needs to leave the metastore — to a partner, to an ML serving pipeline — reach for Delta Sharing and the Unity Catalog model registry rather than an ad hoc export.

## Lab

Pick one process at your own organization (or a hobby project) that moves data outside a system without any real access control — a shared spreadsheet, an emailed export, a copy-pasted query result. Sketch how you'd replace it using this lesson's pattern: one governed object (a share, a masked view, or a registered model), one scoped recipient or grant, and one place you could check later to see who actually used it.

## Check yourself

Can you walk through the Driftwood Trail Outfitters scenario from memory, chapter by chapter, and explain why the fix in each chapter builds on the one before it rather than standing alone?
