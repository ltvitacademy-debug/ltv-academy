# Lesson 18 — Azure Arc, Hybrid SQL & Azure SQL Database in Microsoft Fabric

**Chapter 3 · Designing & Scaling Database Resources · Lesson 5 of 5 — Chapter Close**

## What you'll learn

- SQL Server enabled by Azure Arc — managing SQL Server anywhere through Azure's control plane, without moving the database
- What Arc registration actually gives you: inventory, best-practices assessment, Defender for Cloud, Entra auth, and Extended Security Updates
- Azure SQL Database in Microsoft Fabric — a genuinely current, GA deployment option
- What's real and current here, and where to check Microsoft's docs yourself as this keeps evolving

## A note on how current this lesson is

Both topics in this lesson were added to Azure and to the real DP-300
exam objectives more recently than most of this course. The details
below were checked against Microsoft's current documentation rather
than assumed — but both products keep shipping new capabilities, so
treat this lesson as a solid foundation and verify specifics against
`learn.microsoft.com` before an exam or a production decision.

## Azure Arc-enabled SQL Server — no data movement

**SQL Server enabled by Azure Arc** extends Azure's control plane to
SQL Server instances running **anywhere outside Azure** — your own
data center, an edge site, or any other cloud. Critically: **the
database itself never moves.** You install the Azure Connected
Machine agent and the Azure extension for SQL Server on the existing
box; they open only outbound HTTPS (port 443) to Azure. The instance
keeps running exactly where it already is.

```
On-prem / edge / other-cloud SQL Server
        |  Azure Connected Machine agent
        |  + Azure Extension for SQL Server
        |  (outbound HTTPS only -- no data moves)
        v
   Azure control plane
        |-- Inventory (version, edition, cores, host OS)
        |-- Best practices assessment
        |-- Microsoft Defender for Cloud
        |-- Microsoft Entra ID authentication (SQL Server 2022+)
        |-- Extended Security Updates (ESU), billed through Azure
```

## What registering actually buys you

- **A single inventory across every SQL Server you own** — query it
  with Azure Resource Graph, the same way you'd query any other Azure
  resource: which instances are still SQL Server 2014, which are
  running on Linux, which databases haven't been backed up recently.
- **Best practices assessment** — compares your configuration against
  Microsoft Support's field experience and tells you specifically what
  to change.
- **Microsoft Entra ID authentication for the SQL Server instance
  itself** (SQL Server 2022 and later) — the same modern,
  centrally-managed identity model this chapter's next lessons cover
  for Azure SQL, now available on an on-prem or any-cloud instance.
- **Extended Security Updates (ESU) purchased through Azure**, once a
  version reaches end of support — instead of a separate ESU
  contract, it's billed and managed the same way as everything else
  in Azure.
- **Pay-as-you-go SQL Server licensing** through Azure, as an
  alternative to buying licenses outright, for variable-demand
  workloads.

Arc-enabled SQL Server is a management and licensing layer over an
instance that stays exactly where it is — not a migration path.

## Azure SQL Database in Microsoft Fabric — new territory

**SQL database in Microsoft Fabric** is a real, current, generally
available deployment option (GA at Microsoft Ignite, November 2025):
a transactional (OLTP) database that runs on the **same SQL Database
Engine as Azure SQL Database**, but lives *inside a Fabric workspace*
instead of as a standalone Azure resource.

The defining difference from a standalone Azure SQL Database:

- **It's provisioned inside Fabric, not the Azure portal** — no
  separate purchasing-model decision (Lesson 8); compute comes from
  the Fabric capacity assigned to that workspace.
- **Every write is automatically mirrored into OneLake**, near real
  time, converted to Delta/Parquet format — so the same transactional
  data is instantly queryable by Spark notebooks, Power BI, and every
  other Fabric analytics engine, with **zero ETL pipeline** required
  to get it there.
- **Identity is Fabric-native**: access is controlled through
  Microsoft Entra ID and Fabric workspace roles/sharing — a user needs
  Read permission on the database item in Fabric, not a separate SQL
  login.
- **No separately-configured elastic pools** — a single Fabric
  capacity spreads compute across every SQL database in its
  workspaces, which is Fabric's version of the same cost-sharing idea.

```sql
-- Once inside Fabric, you still write ordinary T-SQL --
-- and you can even query across Fabric items in one statement:
SELECT *
FROM ContosoWarehouse.dbo.ContosoSalesTable AS Sales
INNER JOIN SalesLT.Affiliation AS Affiliation
  ON Affiliation.AffiliationId = Sales.RecordTypeID;
```

## Why this lesson closes Chapter 3

Both features answer the same underlying question this chapter has
been asking — "what deployment shape actually fits this workload" —
just for two cases the earlier lessons don't cover: a database that
has to stay outside Azure entirely (Arc), and a database that needs
to live *inside* an analytics platform from the moment it's created
(Fabric).

**Chapter 3 — Designing & Scaling Database Resources — is done.**
You now have a real decision framework (Lesson 14), two ways to keep
a single database maintainable at scale (Lessons 15-16), a way to
scale beyond a single database (Lesson 17), and these two newer
deployment shapes. **Chapter 4, Authentication & Authorization,**
starts next — who's allowed to connect to any of this, and how you
prove it.

## Key terms

| Term | Meaning |
|---|---|
| SQL Server enabled by Azure Arc | Registers an existing SQL Server instance (anywhere) into Azure's control plane; no data moves |
| Extended Security Updates (ESU) | Post-end-of-support patches, purchasable and billed through Azure once Arc-registered |
| SQL database in Microsoft Fabric | An OLTP database provisioned inside a Fabric workspace, auto-mirrored into OneLake |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
doesn't Azure Arc-enabled SQL Server move any data, and what does a
SQL database in Microsoft Fabric do automatically that a standalone
Azure SQL Database does not?
