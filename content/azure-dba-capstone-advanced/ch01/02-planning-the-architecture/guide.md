# Lesson 2 — Planning the Architecture

**Chapter 1 · Scoping the Production-Grade Platform · Lesson 2 of 26**

## What you'll learn

- The five pieces this platform is actually built from, and the order they get built in
- Why that order matters — each piece depends on the one before it
- How this plan maps directly onto the rest of this capstone's chapters
- What "done" looks like for the whole project, not just one piece of it

## Five pieces, one platform

Lesson 1 ended with the board's four deliverables: a DR plan, security/compliance, automation, and
infrastructure as code. Turning those into an actual build plan adds a fifth piece — the ETL feed
that keeps Overlook's database current — and puts all five in a deliberate order:

```
Bicep infrastructure  →  Security & compliance  →  HA/DR  →  PowerShell automation  →  Data Factory ETL
```

Each arrow is a real dependency, not just a reading order:

1. **Bicep-provisioned infrastructure (Chapter 2).** Nothing else can exist until there's a real
   Azure SQL server and database to secure, protect, and automate against. Provisioning it as code
   means every later step can be reviewed and rebuilt, not just clicked once and forgotten.
2. **Security & compliance (Chapter 3).** Once the infrastructure exists, it gets locked down
   *before* it carries real patient data — encryption at rest, column-level protection, auditing,
   and least-privilege access. Doing this after HA/DR would mean replicating an unsecured database.
3. **High availability & disaster recovery (Chapter 4).** With the database provisioned and
   secured, it's safe to build the failover and recovery story — RPO/RTO targets, a failover group,
   geo-replication, and a DR runbook. HA/DR replicates *this* database, encryption settings and all.
4. **PowerShell automation (Chapter 5).** Health checks, backup verification, and alerting are
   built once there's a real, secured, HA-protected database to automate *against* — automating an
   environment that doesn't exist yet, or isn't secured yet, would mean rebuilding the scripts
   later anyway.
5. **Data Factory ETL (Chapter 6).** Finally, the ongoing feed that keeps appointment data flowing
   into the now-secured, now-protected, now-automated database — the last piece, because it depends
   on a stable target to write into.

## Why this order, and not some other order

It's tempting to build HA/DR first, since it sounds like the most urgent board concern. But
replicating an unsecured database just gives you two unsecured copies instead of one — and building
automation against infrastructure that doesn't exist yet means rewriting it the moment the real
Bicep template changes something. The order above is the order real production platforms actually
get hardened in: provision, secure, protect, automate, feed.

## How the plan maps onto the rest of this capstone

```
Chapter 2  Provisioning With Bicep               → the infrastructure itself
Chapter 3  Security & Compliance                 → locking it down
Chapter 4  High Availability & Disaster Recovery → protecting it from an outage
Chapter 5  Automation With PowerShell             → running it without manual effort
Chapter 6  The ETL Layer With Data Factory        → keeping it fed with real data
Chapter 7  The Incident, Presenting, Wrap-Up      → proving it all actually works
```

Chapter 7 is deliberately last and deliberately different from the rest: it's where an unannounced
DR drill tests whether Chapter 4's failover group and RPO/RTO targets hold up under real pressure,
and where the finished platform gets presented back to Overlook's leadership — the same board that
asked for all of this in Lesson 1.

## What "done" actually means for this project

By the end of this capstone, Overlook has: a reproducible Bicep template for its Azure SQL
environment, encryption and auditing a compliance officer could actually review, a tested failover
group with documented RPO/RTO numbers, PowerShell scripts that check and verify the database
without anyone babysitting them, and a Data Factory pipeline keeping appointment data current — all
presented back to leadership as one coherent platform, not five disconnected scripts.

## Key terms

| Term | Meaning |
|---|---|
| Dependency order | Building infrastructure before securing it, securing it before replicating it, and so on |
| RPO / RTO | The concrete recovery targets Chapter 4's HA/DR plan is measured against |
| ETL | Extract, Transform, Load — the ongoing data feed Chapter 6 builds with Data Factory |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why does security and compliance
have to come before HA/DR in this build order, and what would go wrong if you built them in the
opposite order?
