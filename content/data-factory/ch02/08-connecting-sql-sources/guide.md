# Lesson 8 — Connecting to Azure SQL & On-Premises SQL Server

**Chapter 2 · Connecting to Data · Lesson 3 of 5**

## What you'll learn

- The near-identical steps for connecting to Azure SQL Database
- Why on-premises SQL Server needs one extra decision Azure SQL doesn't
- What a self-hosted integration runtime actually solves here
- The AdventureWorks connection this course's labs depend on

## Azure SQL Database: cloud to cloud

Connecting to **Azure SQL Database** follows the exact same pattern
Lesson 7 already taught: **Manage → Linked services → New**, search
for the connector, and configure it:

![Screenshot of the New linked service configuration form for Azure SQL Database, showing server name, database name, and authentication type fields.](/courses/data-factory/ch02/08-connecting-sql-sources/configure-azure-sql-linked-service.png)
*Server name, database name, and an authentication type — SQL authentication, Microsoft Entra ID, or a managed identity.*

Because both Data Factory and Azure SQL Database live in Azure's
cloud, the default **Azure Integration Runtime** reaches it directly
— no extra infrastructure decision required.

## On-premises SQL Server: one real difference

Searching for and configuring the **SQL Server** connector looks
almost identical:

![Screenshot of the connector gallery with the SQL Server connector tile selected.](/courses/data-factory/ch02/08-connecting-sql-sources/sql-server-connector.png)

![Screenshot of the New linked service configuration form for SQL Server, showing server name, authentication type, and a Connect via integration runtime dropdown.](/courses/data-factory/ch02/08-connecting-sql-sources/configure-sql-server-linked-service.png)
*Same shape of form — but look at "Connect via integration runtime." This is where the real difference actually lives.*

The one decision Azure SQL never asked you to make: **which
integration runtime actually reaches this server?** If your SQL
Server instance sits inside an on-premises network, an Azure virtual
network, or any private network the Azure Integration Runtime can't
reach directly, you need a **self-hosted integration runtime** —
Chapter 7's topic — installed on a machine that *can* reach it.

## Why the gap exists

Data Factory runs in Microsoft's cloud. Your on-premises SQL Server —
the one hosting `AdventureWorks2012`, `AdventureWorksDW2014`, and
`Northwind` for this course's labs — sits on a machine the cloud has
no direct route to. A self-hosted integration runtime is software you
install on your own network that bridges that exact gap: it accepts
requests from the cloud service and relays them securely to your
local SQL Server, without ever exposing that server to the public
internet.

Without it, a linked service pointed at your local SQL Server simply
can't connect — Test connection will fail every time, and it isn't a
misconfiguration you can fix inside the linked service form itself.

## What this means for this course's labs

Every lab from here forward that touches `AdventureWorks2012`,
`AdventureWorksDW2014`, or `Northwind` through Data Factory depends on
a self-hosted integration runtime being installed and online — the
same dependency the Power BI course's SQL Server connector labs had.
Chapter 7 walks through installing one properly; for now, know that
this is the piece standing between "SQL Server connector configured"
and "connection actually works."

## Key terms

| Term | Meaning |
|---|---|
| Azure Integration Runtime | The default, cloud-based runtime — reaches any cloud-to-cloud connection |
| Self-hosted integration runtime | Software installed on your network, bridging Data Factory to on-premises data |
| Connect via integration runtime | The linked service setting that determines which runtime executes the connection |

## Lab

1. If you have access to an Azure SQL Database, create a linked
   service to it and confirm Test connection succeeds using the
   default Azure Integration Runtime.
2. If you have a local SQL Server instance (the one hosting
   AdventureWorks or Northwind for this course), start creating a SQL
   Server linked service and locate the **Connect via integration
   runtime** dropdown — don't worry if Test connection fails for now,
   Chapter 7 covers fixing that.
3. Write one sentence explaining, in your own words, why Data Factory
   can't just reach an on-premises SQL Server the same way it reaches
   an Azure SQL Database.

## Check yourself

You're ready for Lesson 9 when you can explain, without checking
back, exactly which one setting differs between an Azure SQL Database
linked service and an on-premises SQL Server linked service, and why.
