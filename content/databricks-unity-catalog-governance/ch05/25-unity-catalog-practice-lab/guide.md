# Lesson 25 — Unity Catalog Practice Lab

**Chapter 5 · Lakehouse Governance · Lesson 25 of 25**

## What you'll learn

- How to apply this entire course's governance model to a single scenario, end to end, in your own Unity Catalog metastore (or a trial workspace)
- The full sequence of SQL and configuration steps a real Unity Catalog rollout actually requires, in order
- How to self-check your work against what a working governance setup should produce
- Where the Data Governance career path continues from here

## Before you start

This lab assumes access to a Databricks workspace with Unity Catalog enabled — a free trial workspace works fine, since everything below uses standard SQL and Catalog Explorer, nothing that requires production data. If you don't have one available, read through each step and write out the exact SQL you'd run; the goal is fluency with the sequence, not just the syntax.

## The scenario

You're the first person at a small company to set up Unity Catalog governance. The company has one dataset worth protecting — a `customers` table with a `signup_region` column and an `email` column — and one external partner who needs read access to a summarized version of it.

## Part 1 — Foundations (Chapter 1)

1. Create a catalog and a schema to hold your work:
   ```sql
   CREATE CATALOG IF NOT EXISTS lab;
   CREATE SCHEMA IF NOT EXISTS lab.sales;
   ```
2. Create the `customers` table with at least `customer_id`, `signup_region`, and `email` columns, and insert a handful of rows across at least two different `signup_region` values so Part 3's row filter has something real to filter.

## Part 2 — Permissions (Chapter 2)

3. Create (or reuse) two groups in your account console representing two audiences: one broad, one narrow — for example `analysts` and `finance`.
4. Grant schema-level access relying on inheritance, not a per-table grant:
   ```sql
   GRANT USE CATALOG, USE SCHEMA ON SCHEMA lab.sales TO analysts;
   GRANT SELECT ON SCHEMA lab.sales TO analysts;
   ```
5. Run `SHOW GRANTS ON SCHEMA lab.sales;` and confirm `analysts` appears with the privileges you just granted.

## Part 3 — Fine-grained security (Chapter 3)

6. Write and apply a column mask function that shows the real `email` value to `finance` and a redacted value (e.g. `'REDACTED'`) to everyone else, then attach it with `ALTER TABLE ... ALTER COLUMN email SET MASK`.
7. Write and apply a row filter function that restricts `analysts` to rows where `signup_region = 'west'`, then attach it with `ALTER TABLE ... SET ROW FILTER`.
8. Query the table as a member of each group (or review the function logic) and confirm the mask and filter each behave as intended.

## Part 4 — Discovery, lineage and auditing (Chapter 4)

9. Add a comment to the `customers` table and to the `email` column describing what they contain — this is what makes the table discoverable (Lesson 16) rather than just technically present.
10. Query `system.access.audit` (or your metastore's equivalent system table) and find at least one log entry showing your own `CREATE TABLE` or `GRANT` statement from the steps above.

## Part 5 — Lakehouse governance (Chapter 5)

11. Create a share exposing a summarized, non-PII version of the table to the external partner:
    ```sql
    CREATE SHARE IF NOT EXISTS partner_share
      COMMENT 'Summary customer counts by region for the partner';

    CREATE VIEW lab.sales.customer_summary AS
      SELECT signup_region, COUNT(*) AS customer_count
      FROM lab.sales.customers
      GROUP BY signup_region;

    ALTER SHARE partner_share ADD TABLE lab.sales.customer_summary;
    ```
12. Create a recipient and grant it access:
    ```sql
    CREATE RECIPIENT IF NOT EXISTS lab_partner;
    GRANT SELECT ON SHARE partner_share TO RECIPIENT lab_partner;
    ```
13. Run `SHOW GRANTS ON SHARE partner_share;` to confirm the recipient is listed, then run `REVOKE SELECT ON SHARE partner_share FROM RECIPIENT lab_partner;` to practice pulling access back.

## Self-check

You've completed the lab correctly if you can answer yes to all of the following:

- [ ] `SHOW GRANTS ON SCHEMA lab.sales` lists the `analysts` group with `SELECT`
- [ ] The column mask and row filter functions exist and are attached to `customers` (check `DESCRIBE TABLE EXTENDED lab.sales.customers`)
- [ ] A system-table query returns at least one real audit entry from your own work this lab
- [ ] `SHOW GRANTS ON SHARE partner_share` showed the recipient before you revoked it, and showed nothing after

## Key terms

| Term | Meaning |
|---|---|
| End-to-end governance pass | Applying metastore structure, permissions, fine-grained security, auditing, and sharing together to one real dataset |
| Self-check | Verifying your own governance setup with the same commands (`SHOW GRANTS`, system tables) an auditor would use |

## Where the path continues

Congratulations — this closes **Databricks Unity Catalog Governance**, and with it, every chapter from metastores through fine-grained security, auditing, Delta Sharing, and migration. The skills in this lab — schema-level grants, column masks and row filters, lineage and audit queries, and governed sharing — are the same shape of problem in any governed data platform, which is exactly why the Data Governance career path continues next with **Snowflake Data Governance**: the same governance questions, answered with Snowflake's own roles, secure views, and data sharing model.

## Check yourself

Can you redo this entire lab from memory — catalog and schema, schema-level grant, column mask, row filter, an audit-log query, and a Delta Share with a recipient — without looking back at the numbered steps?
