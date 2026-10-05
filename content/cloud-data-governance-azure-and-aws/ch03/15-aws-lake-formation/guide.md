# Lesson 15 — AWS Lake Formation

**Chapter 3 · Storage and Catalogs · Lesson 15 of 25**

## What you'll learn

- Why Lake Formation exists as a layer on top of the Glue Data Catalog, not a replacement for it
- The named resource method for granting permissions — database, table, or column scope
- How column-filtered and cell-filtered grants narrow access below the table level
- How to read and write a real `GRANT` statement, in both the console and the CLI

## IAM alone doesn't give you table- or column-level access

IAM policies can grant or deny access to an S3 path, and Glue IAM policies can grant access to Data Catalog API actions — but neither one natively understands "this user can read columns A and B of this table, but not column C." **AWS Lake Formation** sits on top of both IAM and the Glue Data Catalog (Lesson 14) specifically to close that gap: it's a permissions model that understands databases, tables, and individual columns as first-class, grantable resources, and it's what AWS recommends instead of hand-rolling equivalent access through raw S3 and IAM policies.

## Granting permissions: the named resource method

The most direct way to grant Lake Formation permissions is the **named resource method** — picking specific databases or tables by name in the console's Grant permissions flow. The first decision is what you're granting permissions *on*:

![Console screenshot showing the LF-Tags or catalog resources section, with Named data catalog resources selected and a database and table chosen.](/courses/cloud-data-governance-azure-and-aws/ch03/15-aws-lake-formation/lf-grant-resources.png)
*Choosing named catalog resources — a specific database (retail) and table (inventory) — rather than an LF-Tag expression.*

(The alternative — granting by **LF-Tags** rather than by name — attaches key-value tags to resources and grants permissions against the tag instead of the resource, which scales far better across hundreds of tables but adds a layer of indirection; the named resource method is the more direct starting point.)

## Table-level permissions, with grant option

Once a database and table are chosen, the **Table and column permissions** section lists Lake Formation's actual permission vocabulary — notably different from, and finer-grained than, plain S3 or IAM actions:

![Console screenshot showing table permission checkboxes: Alter, Insert, Drop, Delete, Select, Describe, and Super, plus a separate Grantable permissions section.](/courses/cloud-data-governance-azure-and-aws/ch03/15-aws-lake-formation/lf-grant-table-permissions.png)
*Alter, Insert, Drop, Delete, Select, Describe — and Super, which is the union of all of them.*

Notice the **Grantable permissions** subsection, separate from the permissions being granted directly. This is Lake Formation's version of an IAM grant option: checking Select under Grantable permissions means the recipient can turn around and grant Select to someone else, not just use it themselves.

## Narrowing Select below the whole table

Choosing **Select** specifically (and nothing else) unlocks a **Data permissions** section that controls exactly how much of the table that Select actually covers:

![Console screenshot showing three data-permission options: All data access, Simple column-based access, and Advanced cell-level filters.](/courses/cloud-data-governance-azure-and-aws/ch03/15-aws-lake-formation/lf-grant-all-data-access.png)
*All data access is the default — but Simple column-based access and Advanced cell-level filters narrow it to specific columns or rows.*

**Simple column-based access** restricts Select to a chosen include- or exclude-list of columns. **Advanced cell-level filters** go further, applying a named **data filter** that can restrict both columns and rows together (for example: "Select on this table, but only where `region = 'EMEA'`, and never the `ssn` column") — the closest Lake Formation equivalent to the column- and cell-level comments flagged by the crawler in Lesson 14.

## The same grant, as a statement

Everything the console does maps onto a real `GRANT` statement, whether issued through the AWS CLI or read directly as SQL-like syntax:

```
GRANT SELECT, DESCRIBE
ON TABLE retail.inventory
TO ROLE AnalyticsReadOnlyRole;
```

The equivalent AWS CLI call is `aws lakeformation grant-permissions`, specifying a `DataLakePrincipalIdentifier`, a `Resource` (here, a `Table`), and a `Permissions` list — exactly the three things the console's Grant permissions wizard collects across its three sections.

## Key terms

| Term | Meaning |
|---|---|
| Named resource method | Granting Lake Formation permissions by picking specific databases/tables, as opposed to by LF-Tag |
| LF-Tag | A key-value tag attached to resources, used to grant permissions at scale without naming each resource |
| Grantable permission | A permission the recipient can re-grant to someone else, separate from using it themselves |
| Data filter | A named column and/or row restriction applied under a Select grant for fine-grained access |

## Lab

In a Lake Formation console (or by reading the CLI reference if no live account is available), grant `SELECT` and `DESCRIBE` on one table to a specific IAM role using the named resource method, with All data access selected. Then redo the same grant using Simple column-based access, excluding one sensitive column, and compare the two grants in `aws lakeformation list-permissions`.

## Check yourself

- What problem does Lake Formation solve that a plain IAM policy on an S3 path cannot?
- What's the difference between a permission being granted to a principal and that same permission being "grantable" by that principal?
- When would you reach for a data filter (Advanced cell-level filters) instead of Simple column-based access?
