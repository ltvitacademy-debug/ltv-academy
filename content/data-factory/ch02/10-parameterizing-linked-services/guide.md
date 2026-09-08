# Lesson 10 — Parameterizing Linked Services & Datasets

**Chapter 2 · Connecting to Data · Lesson 5 of 5**

## What you'll learn

- The real problem parameterizing a linked service solves
- How to add dynamic content in the Studio UI, step by step
- What the resulting expression actually looks like
- One firm rule about parameterizing passwords and secrets

## The problem: one linked service per database, forever?

Picture a company with fifty databases on the same logical SQL
server — one per client, say. Without parameters, connecting to all
fifty means building fifty nearly-identical linked services, each
differing only in a database name. That's fifty things to maintain,
fifty places a typo can hide, and fifty items cluttering Lesson 6's
Manage hub list.

**Parameterizing** a linked service solves this directly: define the
database name (or server, or file path) as a **parameter** instead of
a fixed value, and pass in the actual value at run time — one linked
service, reused across all fifty databases.

## Adding dynamic content in the UI

While editing a linked service, look for the **Add dynamic content**
link underneath a configurable field, like the database name box:

![Screenshot of a linked service's configuration form, with the Add dynamic content link highlighted underneath the fully qualified domain name field.](/courses/data-factory/ch02/10-parameterizing-linked-services/dynamic-content-link.png)
*Any field that can accept a parameter shows this link — easy to miss the first time you're looking for it.*

Selecting it opens the **Add dynamic content** panel, where you can
write an expression directly, or select the **+** button to create a
brand-new parameter on the spot:

![Screenshot of the Add dynamic content panel, showing an expression referencing a DBName parameter, and a plus button highlighted for creating a new parameter.](/courses/data-factory/ch02/10-parameterizing-linked-services/dynamic-content-box.png)
*`@{linkedService().DBName}` — the expression that reads this linked service's own DBName parameter at run time.*

## What this actually produces

Underneath, a parameterized linked service's JSON gains a `parameters`
block, and the value that used to be fixed becomes an expression:

```
"typeProperties": {
  "connectionString": "Server=tcp:myserver.database.windows.net,1433;Database=@{linkedService().DBName};..."
},
"parameters": {
  "DBName": { "type": "String" }
}
```

Whatever calls this linked service — a dataset, a pipeline parameter,
a `ForEach` loop iterating over client names (Chapter 4) — supplies
the actual `DBName` value at run time. The linked service itself never
changes; only what gets passed into it does.

## Which connectors support this natively

Most common connectors — Azure Blob Storage, Azure SQL Database, SQL
Server, Amazon S3, and dozens more — offer this **Add dynamic content**
experience built directly into the UI. For a connector that doesn't,
you can still parameterize it by hand: expand **Advanced**, check
**Specify dynamic contents in JSON format**, and write the parameterized
JSON yourself.

## One firm rule: never parameterize a secret directly

Microsoft's own guidance is blunt about this: **don't parameterize
passwords or secrets.** Store every secret in Azure Key Vault instead,
and parameterize the **secret's name**, not its value. A parameter is
visible in plain text wherever it's set — a password never should be.

## Key terms

| Term | Meaning |
|---|---|
| Parameter | A named, typed placeholder value a linked service or dataset accepts at run time |
| Dynamic content | An expression, like `@{linkedService().DBName}`, evaluated at run time instead of a fixed value |
| Add dynamic content | The UI link that opens the expression editor for a parameterizable field |

## Lab

1. If you built an Azure SQL or Blob Storage linked service earlier
   in this chapter, edit it and look for an **Add dynamic content**
   link under one of its fields.
2. Create a new parameter (name it something like `DBName` or
   `ContainerName`) and reference it with dynamic content in that
   field.
3. Write one sentence explaining why storing a password as a Key
   Vault secret name, rather than parameterizing the password itself,
   keeps the actual credential out of plain sight.

## Check yourself

Chapter 2 is complete when you can explain, from memory, why a
company with fifty near-identical databases would parameterize one
linked service rather than build fifty separate ones — and why a
password should never be the thing you parameterize directly.
