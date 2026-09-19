# Lesson 35 — Data Discovery, Classification & Sensitive Data

**Chapter 6 · Data Security & Compliance · Lesson 35 of 95**

## What you'll learn

- What SQL Information Protection actually does: finding and labeling sensitive columns
- Information types and sensitivity labels, and how they differ
- Why classification is a discovery/labeling tool, not a protection mechanism by itself
- How classification connects to everything else in this chapter and to auditing

## The question every earlier lesson in this chapter assumed you'd already answered

TDE, Always Encrypted, Dynamic Data Masking, and Row-Level Security all assume you already know
*which* columns are sensitive enough to need them. On a schema you designed yourself, that might be
obvious. On a database you inherited, migrated, or that's grown for years across many teams, it
usually isn't — a `Notes` column might contain free-text SSNs someone pasted in three years ago, or
a `PhoneNumber` column might be exactly what it says and nothing more. **Data Discovery &
Classification** (also called **SQL Information Protection**) exists to answer that question
systematically rather than by memory or tribal knowledge.

## What it actually does: scan, suggest, label

Azure SQL's built-in classification engine scans column names, data types, and (optionally) data
patterns to suggest likely-sensitive columns, using a built-in taxonomy of **information types**
(Credit Card Number, SSN, Email, Financial, Health, Networking, and dozens more) mapped to
**sensitivity labels** (typically a scale like Public, General, Confidential, Highly Confidential —
the exact label set is configurable per organization).

![Azure Portal Data Discovery and Classification tab, showing suggested sensitive columns with information type and sensitivity label dropdowns](/courses/azure-dba/ch06/35-data-discovery-classification-sensitive-data/data-discovery-and-classification.png)
*The classification tab: suggested columns, each pickable by information type and sensitivity label.*

Classification is a **recommendation engine with a human approval step** — Azure suggests, a DBA or
data owner reviews and either accepts, edits, or dismisses each suggestion, and the accepted result
is stored as **metadata** (extended properties) on the column. Nothing about the actual query
behavior, storage, or access changes as a result of classifying a column — that's the critical thing
to understand before moving on.

## Querying classification metadata

```sql
SELECT
  schema_name(o.schema_id) AS schema_name,
  o.name AS table_name,
  c.name AS column_name,
  cc.label, cc.information_type
FROM sys.sensitivity_classifications cc
JOIN sys.columns c ON cc.major_id = c.object_id AND cc.minor_id = c.column_id
JOIN sys.objects o ON c.object_id = o.object_id;
```

This lets you (or a compliance report generator) answer "show me every column across every database
on this server labeled Highly Confidential" as a query, rather than a manual audit.

## Classification is discovery, not protection — that distinction matters

This is the single most important thing to get right about this feature: **classifying a column
does not encrypt it, mask it, filter it, or restrict access to it in any way.** A column labeled
"Highly Confidential — SSN" with no additional control applied is exactly as unprotected as it was
before the label existed. Classification's value is entirely in what it enables *next*:

```
Classification (this lesson):    identifies WHICH columns need protecting
TDE (Lesson 31):                 protects data at rest, once you know what's there
Always Encrypted (Lesson 32):    protects the most sensitive columns even in memory
DDM (Lesson 33):                 hides values from unprivileged eyes in results
RLS (Lesson 34):                 restricts which rows are visible at all
Auditing (Lesson 36):            proves who actually accessed classified columns
```

A classified column with none of those controls applied is a documented gap, not a closed one — and
that's exactly the kind of finding a real compliance audit surfaces: not "is this data sensitive"
(classification already answered that) but "given that it's labeled sensitive, what's actually
protecting it, and can you prove that."

## Key terms

| Term | Meaning |
|---|---|
| SQL Information Protection | The feature name for Azure SQL's classification engine |
| Information type | The category of sensitive data (SSN, Credit Card, Health, etc.) |
| Sensitivity label | The organization's confidentiality scale applied to a classified column |
| `sys.sensitivity_classifications` | System view exposing classification metadata for querying |

## Lab

1. Open the Data Discovery & Classification tab for a real or test database and review the
   auto-suggested columns.
2. Accept, edit, or dismiss at least three suggestions, then query
   `sys.sensitivity_classifications` to confirm the accepted labels are stored as metadata.
3. For one Highly-Confidential-labeled column, write one sentence stating which of Lessons 31-34's
   controls (if any) is actually applied to it today, and which gap that leaves.

## Check yourself

You're ready for Lesson 36 when you can explain, without looking: why doesn't classifying a column
as "Highly Confidential" change anything about who can query it or how it's stored?
