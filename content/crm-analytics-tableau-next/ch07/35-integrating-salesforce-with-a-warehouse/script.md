Salesforce holds your customers and deals. Your warehouse holds billing, product usage, finance, and years of history. The interesting questions sit across both. This lesson maps how Salesforce data flows in and out of a warehouse. You already know the warehouse side, so we focus on Salesforce.

This is Salesforce's own zero-copy diagram. On the left, an external system such as a warehouse. Query federation sends live queries to its compute. File federation reads its storage directly. Both feed Data 360, formerly Data Cloud. And data sharing flows back the other way, so the warehouse can see Salesforce data.

Four patterns. Extract and load copies objects into the warehouse on a schedule, giving full history. Federation lets Data 360 query the warehouse in place. Sharing lets the warehouse query Data 360 data. And write-back pushes warehouse results, like a churn score, into Salesforce.

Pick by need. If the warehouse is the system of record for reporting, extract and load. If you want warehouse data inside Salesforce without copying it, use federation. If you want CRM data inside the warehouse, use sharing. Many architectures combine patterns.

Weigh four things. Latency, meaning how fresh the data must be. Cost, meaning who pays for compute and API calls. History, meaning whether you need snapshots. And governance, meaning where permissions and lineage live. Check current documentation for connector and licensing details.

Data flows both ways, and the right pattern depends on freshness, cost, history, and control. Next up: Salesforce plus Snowflake, the most common pairing in practice.
