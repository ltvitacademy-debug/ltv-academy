# Lesson 8 — Ownership

**Chapter 2 · Permissions · Lesson 8 of 25**

## What you'll learn

- Why every securable object has exactly one owner, and what that owner gets automatically
- How a container's owner can manage child objects they don't directly own
- The real `ALTER ... OWNER TO` syntax for transferring ownership
- Who is allowed to transfer ownership — and the one restriction that exists to prevent privilege escalation

## Every object has an owner

Every securable object in Unity Catalog — catalog, schema, table, view, volume, function — has exactly one **owner**. By default, that's whoever created it. Owners automatically have **all privileges** on the object, including the right to grant privileges to other principals, without anyone having to `GRANT` them anything first.

## Owning a container gets you its children too

Ownership compounds down the hierarchy. If you own a catalog, you automatically get the ability to manage every schema, table, and other object inside it — **even objects you didn't personally create and don't directly own**. This is exactly why Lesson 7's three-privilege chain (`USE CATALOG` + `USE SCHEMA` + the specific privilege) matters for everyone *except* the owner of the containing catalog or schema: that owner already has the management rights that chain exists to gate.

## Viewing and transferring ownership

```sql
-- Who owns this table?
DESCRIBE TABLE EXTENDED finance.accounts_payable.invoices;

-- Transfer ownership to a group
ALTER TABLE finance.accounts_payable.invoices
  OWNER TO `accounting`;

-- The same ALTER ... OWNER TO pattern works on any securable type
ALTER SCHEMA finance.accounts_payable OWNER TO `finance-admins`;
ALTER CATALOG finance OWNER TO `finance-admins`;
```

Who's allowed to run `ALTER ... OWNER TO`? The current owner, a metastore admin, the owner of the containing catalog/schema, or a principal with the `MANAGE` privilege on the object.

## The one restriction: views, functions, and models

There's a deliberate exception, aimed squarely at preventing privilege escalation: **only a metastore admin** can transfer ownership of a **view, function, or model** to just anyone in the account. A regular owner (or someone with `MANAGE`) can only transfer ownership of those object types to **themselves**, or to a group they're already a member of — not to an arbitrary third party. Tables, catalogs, schemas, and volumes don't carry this extra restriction.

## Why transferring view ownership to a group is a common pattern

One practical reason to transfer ownership deliberately: giving a **group** ownership of a view enables **collaborative editing** — every member of that group can edit the view's definition, while the data the view actually exposes is still governed by whatever privileges that group holds on the underlying tables.

```sql
ALTER VIEW analytics.reporting.active_customers
  OWNER TO `analytics-engineers`;
```

## Key terms

| Term | Meaning |
|---|---|
| Owner | The principal with all privileges on an object by default; usually whoever created it |
| `ALTER ... OWNER TO` | The SQL statement that transfers ownership of any securable object |
| Container ownership | Owning a catalog or schema grants management rights over every child object inside it |
| Privilege-escalation restriction | Only a metastore admin can transfer view/function/model ownership to an arbitrary third party |

## Lab

Write the `ALTER TABLE ... OWNER TO` statement transferring `marketing.campaigns.leads` to a group called `campaign-owners`. Then explain, in one sentence, why transferring ownership of a *view* to an arbitrary user is more restricted than transferring ownership of a *table*.

## Check yourself

- What privileges does an object's owner have by default, without any explicit GRANT?
- If you own a schema, what can you do with a table inside it that you didn't create and don't directly own?
- Who is allowed to transfer ownership of a view to any user in the account — and who is restricted to transferring it only to themselves or their own group?
