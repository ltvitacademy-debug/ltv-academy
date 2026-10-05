# Lesson 14 — Attribute-Based Access Control and Governed Tags

**Chapter 3 · Fine-Grained Security · Lesson 14 of 25**

## What you'll learn

- What a governed tag is, and how it differs from an ordinary tag
- The real Catalog Explorer UI for assigning governed tags, and how locked tags are distinguished from system tags
- What attribute-based access control (ABAC) is, and the real `CREATE POLICY` syntax
- How `has_tag()` / `has_tag_value()` let one policy protect many tables at once
- The separation-of-duties model ABAC is designed to enable

## What makes a tag "governed"

Unity Catalog has had ordinary key-value tags for a long time — anyone with `APPLY TAG` could set any key to any value. A **governed tag** is an account-level tag with a built-in **tag policy**: it restricts *which values* are allowed for that key, and *who* is permitted to assign it. Governed tags apply across catalogs, schemas, tables, columns, models, volumes, and several workspace object types, and are enforced consistently across every workspace attached to the account.

In the tag-assignment UI, governed tags are marked with a lock icon and grouped under **Governed** in the key dropdown. System tags — governed tags that Databricks itself defines and that you can't edit or delete — carry a wrench icon instead.

![Tag assignment dialog's key dropdown, with a lock icon next to 'Marketing' and 'pii' marking them as governed tags, and a wrench icon next to several 'sap.PersonalData.*' and 'system.certification_status' entries marking them as Databricks-defined system tags.](/courses/databricks-unity-catalog-governance/ch03/14-attribute-based-access-control-and-governed-tags/assign-governed-tags.png)
*Real Catalog Explorer tag-assignment dialog — the lock icon flags a governed tag; the wrench flags a system tag Databricks defines and maintains.*

## System tags you'll see out of the box

Some governed tags ship with Databricks itself and need no setup. `system.certification_status` marks an asset `certified` or `deprecated`. The `class.*` family — `class.email_address`, `class.us_ssn`, `class.credit_card`, and others — is what Databricks Data Classification applies automatically to columns it detects as sensitive (Lesson 15 covers this in depth).

![Edit Tags dialog, with the user typing 'system.' into the Key field and the dropdown narrowing to show 'system.certification_status' under a 'Governed' heading, marked with a wrench icon.](/courses/databricks-unity-catalog-governance/ch03/14-attribute-based-access-control-and-governed-tags/system-tags.png)
*Typing a prefix narrows the governed-tag list — `system.certification_status` is Databricks-defined and can't be edited or deleted.*

## Inheritance

Tags applied to a catalog or schema automatically flow down to everything inside it — except at the column level, which never inherits and always needs a direct tag.

![Diagram showing a governed tag applied at the catalog level flowing down through schemas to tables, with an arrow indicating columns do not inherit and must be tagged directly.](/courses/databricks-unity-catalog-governance/ch03/14-attribute-based-access-control-and-governed-tags/governed-tags-hierarchy.png)
*Tag a catalog once, and every schema and table inside it inherits that tag — columns are the one level that always needs its own tag.*

## ABAC: policies that key off tags, not individual objects

**Attribute-based access control (ABAC)** uses governed tags as the input to access-control policies, instead of writing a separate row filter or column mask for every table. A single policy, attached at a catalog or schema, automatically covers every table or column inside it that matches the policy's tag conditions — including tables created *after* the policy was written.

```sql
CREATE FUNCTION mask_pii(val STRING) RETURNS STRING
    RETURN '***';

CREATE POLICY mask_pii_for_hr
ON CATALOG catalog_a
COLUMN MASK mask_pii
TO `account users` EXCEPT `HR admins`
FOR TABLES
WHEN has_tag('HR')
MATCH COLUMNS has_tag('PII') AS pii_col
ON COLUMN pii_col;
```

Read it clause by clause: `ON CATALOG catalog_a` scopes the policy; `COLUMN MASK mask_pii` is the action; `TO account users EXCEPT HR admins` are the principals; `WHEN has_tag('HR')` restricts it to tables tagged `HR`; `MATCH COLUMNS has_tag('PII') AS pii_col` picks out exactly the columns tagged `PII` inside those tables. Every column tagged `PII`, on every table tagged `HR`, in `catalog_a` — now and in the future — gets masked for everyone except HR admins, from this one policy.

`has_tag('key')` and `has_tag_value('key', 'value')` are the two built-in functions ABAC policies use to match tags, and they're available for both the table-level `WHEN` condition and the column-level `MATCH COLUMNS` condition.

## Separation of duties

ABAC is designed so different teams can own different pieces without any one person needing every permission: someone defines the tag taxonomy, data stewards or an AI classifier tag the actual assets, a governance admin writes the policy once, and data creators just build tables inside the governed scope — the policy applies to them automatically.

![Diagram showing ABAC's separation of duties: a tag taxonomy owner defines tag keys and values, a data steward applies tags to assets, a governance admin writes policies, and a data creator builds objects that inherit the policy automatically.](/courses/databricks-unity-catalog-governance/ch03/14-attribute-based-access-control-and-governed-tags/governed-tags-hierarchy.png)
*The same tag that drives inheritance also drives ABAC — tag once, and both the hierarchy and every matching policy pick it up.*

## Key terms

| Term | Meaning |
|---|---|
| Governed tag | An account-level tag with a tag policy restricting its allowed values and who can assign it |
| System tag | A governed tag Databricks defines and maintains (wrench icon); can't be edited or deleted |
| ABAC policy | A `CREATE POLICY` statement that row-filters, masks, or grants based on tag conditions, covering every matching object automatically |
| `has_tag()` / `has_tag_value()` | Built-in functions ABAC policies use to match objects or columns by governed tag |

## Lab

Sketch (in plain English or SQL) an ABAC policy that masks any column tagged `pii:email` on tables in a `marketing` schema, for everyone except a `crm_admins` group. Identify which clause is the scope, which is the principal list, and which is the column match condition.

## Check yourself

Without looking back: what's the practical advantage of an ABAC policy over writing a column mask on each table individually, and how does Unity Catalog's UI visually distinguish a governed tag from an ordinary one?
