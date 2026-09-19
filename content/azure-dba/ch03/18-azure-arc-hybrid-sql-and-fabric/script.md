# Script — Azure Arc, Hybrid SQL & Azure SQL Database in Microsoft Fabric

## Segment 1 (title)

Two current DP-300 exam objectives newer than most of this course. SQL Server enabled by Azure Arc manages an instance anywhere outside Azure through Azure's control plane -- and critically, the database itself never moves.

## Segment 2 (code: Arc architecture)

You install the Connected Machine agent and the SQL Server extension on the existing box -- outbound HTTPS only. The instance keeps running exactly where it already is, while Azure gains inventory, best practices assessment, Defender for Cloud, Entra auth, and Extended Security Updates.

## Segment 3 (steps: what registering buys you)

A single inventory across every SQL Server you own, queryable with Resource Graph. Best practices assessment against Microsoft's field experience. Entra ID authentication on the instance itself. And Extended Security Updates purchased and billed through Azure once a version ages out.

## Segment 4 (steps: SQL database in Microsoft Fabric)

A real, GA deployment option running the same SQL Database Engine as Azure SQL Database -- but provisioned inside a Fabric workspace. Every write mirrors automatically into OneLake, so the same data is instantly queryable by Spark and Power BI with zero ETL pipeline.

## Segment 5 (code: querying across Fabric items)

Identity is Fabric-native -- Entra ID and workspace roles, not a separate SQL login. And because the data lives in OneLake too, you can write a single T-SQL query joining a SQL database table with a warehouse table in the same workspace.

## Segment 6 (outro)

Chapter 3 is done -- a decision framework, two ways to keep one database maintainable, a way to scale beyond it, and these two current deployment shapes. Chapter 4, Authentication & Authorization, starts next.
