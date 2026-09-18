# Lesson 28 — Delta Sharing

**Chapter 6 · Advanced Security & Governance · Lesson 28 of 34**

## What you'll learn

- A fast recap of Databricks & Delta Lake Lesson 46's basics — not a re-teach
- The open REST protocol underneath `CREATE SHARE` — what a recipient's client actually calls
- Databricks-to-Databricks sharing vs. open sharing with a credential file
- Sharing history/versions, not just a table's current snapshot

## What Lesson 46 already covered

Lesson 46 covered the core objects and the headline feature in
full: `CREATE SHARE`, `CREATE RECIPIENT`, `GRANT SELECT ... TO
RECIPIENT`, and the fact that a recipient can read a shared table
with a Delta Sharing-compatible client — Python, Pandas, Power BI —
without a Databricks account of their own. That's the right mental
model and this course assumes you already have it. What it left out
is what's actually happening underneath that `CREATE SHARE`
statement, and the operational choices a real sharing setup has to
make.

## The open protocol underneath

```text
Recipient's client (open-source delta-sharing library, Power BI, etc.)
        |
        v
REST calls to a Delta Sharing Server:
  - list shares the recipient can access
  - list tables within a share
  - get a table's metadata (schema, partitioning)
  - get short-lived, pre-signed URLs to the underlying Parquet files
        |
        v
Recipient reads the actual Parquet files directly from cloud storage
```

`CREATE SHARE` isn't a Databricks-only wire format — it's
provisioning access on top of a documented, open REST protocol.
That's *why* a non-Databricks client can read a shared table at
all: the client only needs to speak this REST protocol and then
read Parquet, both of which exist independently of Databricks.

## Databricks-to-Databricks sharing vs. open sharing

```text
Databricks-to-Databricks sharing:
  recipient also has Unity Catalog -- the shared table shows up
  directly as a read-only object IN their own catalog, no
  credential file to manage at all

Open sharing:
  recipient has no Databricks account -- the provider issues a
  credential file (a bearer token) the recipient's open-source
  client uses to authenticate REST calls to the Delta Sharing Server
```

Lesson 46's example works either way, but the two paths differ in
what the recipient actually manages. Databricks-to-Databricks
sharing means the recipient never handles a credential file at all
— the share simply appears as an object they can query, governed
the same way any other catalog object is. Open sharing is what
makes a non-Databricks recipient (plain Python, Power BI) possible,
at the cost of that recipient being responsible for a credential
file's security themselves.

## Sharing history, not just a snapshot

```sql
ALTER SHARE nyc_taxi_gold_share
ADD TABLE nyc_taxi.gold.daily_revenue
WITH HISTORY;
```

A plain shared table gives the recipient the current snapshot only
— useful, but it means "export the file and hand it over" in
spirit, just automated and access-controlled. Sharing **with
history** lets the recipient read the table's version history and
Change Data Feed through the same protocol, so they can pull
incremental changes since their last read instead of re-reading
the whole table every time. That distinction — snapshot vs. history
— is the real technical difference between Delta Sharing and simply
exporting a file, beyond just "no copying happens."

## Key terms

| Term | Meaning |
|---|---|
| Delta Sharing Server | The REST API a recipient's client calls to list shares/tables and get file access |
| Databricks-to-Databricks sharing | Shared table appears directly in the recipient's own Unity Catalog, no credential file |
| Open sharing | Credential-file-based access for recipients without a Databricks account |

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: why
does a non-Databricks client (plain Python, Power BI) being able to
read a shared table depend on Delta Sharing being an open REST
protocol rather than a Databricks-proprietary one?
