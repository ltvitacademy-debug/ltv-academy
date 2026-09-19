# Script — Database Watcher

## Segment 1 (title)

Azure Monitor and the DMVs are built around one database at a time. That's fine for one incident, but it falls apart once you're responsible for dozens or hundreds of databases and need to answer "which one needs attention right now" as a single question. That's the specific gap database watcher fills.

## Segment 2 (steps: what it actually is)

Database watcher is a managed monitoring solution, currently in preview, for Azure SQL Database and Managed Instance. It collects data from over seventy system catalog views and DMVs, across every database you register as a target, into one central store — a single-pane-of-glass view instead of one dashboard per resource.

## Segment 3 (code: the architecture)

Three pieces. A watcher resource you create and control. SQL targets — up to 100 databases or instances per watcher, even across subscriptions. And a data store — either an Azure Data Explorer cluster or Real-Time Analytics in Microsoft Fabric — where the collected data lands with single-digit-second latency.

## Segment 4 (code: be honest about its state)

This is a real, shipped capability, with estate-wide heatmaps and per-resource drill-down dashboards built as Azure Workbooks. But it's still in preview — limits and supported regions are still expanding, and alerting isn't available with every data-store option. Worth checking Microsoft's current docs before you lean on it in production.

## Segment 5 (outro)

Database watcher gives you the fleet-wide view. Next up, the DMVs it's actually querying underneath — the same views you can run yourself, one database at a time.
