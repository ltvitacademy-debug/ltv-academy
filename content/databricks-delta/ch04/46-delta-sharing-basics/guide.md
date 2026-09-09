# Lesson 46 — Delta Sharing Basics

**Chapter 4 · Unity Catalog · Lesson 46 of 57**

## What you'll learn

- The real problem: sharing data with someone outside your own metastore entirely
- Shares, Providers, and Recipients — the three objects Delta Sharing adds
- Why the recipient doesn't need Databricks at all to read a shared table
- Governance still applies — sharing isn't the same as making data public

## Beyond GRANT — sharing outside your own metastore

Everything in Lessons 42–43 governs access **within** one metastore.
Delta Sharing solves a different problem: sharing a table with a
completely separate organization — a partner company, a client —
who has their own Databricks account, or none at all. `GRANT`
assumes the recipient is a known principal inside your metastore;
Delta Sharing assumes they're not.

## Shares, Providers, and Recipients

```sql
CREATE SHARE nyc_taxi_gold_share;
ALTER SHARE nyc_taxi_gold_share ADD TABLE nyc_taxi.gold.daily_revenue;

CREATE RECIPIENT partner_analytics_team
USING ID '<recipient-sharing-identifier>';

GRANT SELECT ON SHARE nyc_taxi_gold_share TO RECIPIENT partner_analytics_team;
```

A **share** is a named bundle of tables (here, just
`gold.daily_revenue`) you intend to share. A **provider** is your
own organization, doing the sharing. A **recipient** represents the
external organization receiving it. This mirrors `GRANT`'s shape —
privilege, object, principal — but the "principal" here is an
entire outside organization, not a user inside your workspace.

## The recipient doesn't need Databricks

This is Delta Sharing's real distinguishing feature: a recipient
can read a shared table with any Delta Sharing-compatible client —
including plain Python, Pandas, or Power BI — with no Databricks
account required on their end at all. Sharing works across the open
Delta Lake protocol itself, not a Databricks-to-Databricks-only
connection.

## Governance still applies — sharing isn't "public"

Adding a table to a share doesn't bypass anything from Lessons
42–43: a shared `gold.daily_revenue` can still carry column masks
or row filters, applied for the recipient the same way they'd apply
to an internal user. Delta Sharing extends who governance reaches,
it doesn't turn it off.

## Key terms

| Term | Meaning |
|---|---|
| Share | A named bundle of tables intended for external sharing |
| Recipient | An external organization receiving shared access — no Databricks account required |
| Governance still applies | Masks and row filters still work on a shared table |

## Check yourself

You're ready for Lesson 47 when you can explain, without looking: why
doesn't a Delta Sharing recipient need a Databricks account to read
a shared table?
