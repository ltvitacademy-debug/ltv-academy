# Script — Connecting Applications with the Cosmos DB SDK

## Segment 1 (title)

Every relational connection you've opened follows the same pattern — a connection string, a driver, a client object you reuse. Cosmos DB's official SDKs follow that same pattern, adapted for JSON documents billed by the request unit.

## Segment 2 (steps: the official SDKs)

Microsoft maintains official SDKs for .NET, Java, Python, and Node.js — all wrapping the same REST API and exposing the same core concepts: client, database, container, item. All four are open source and the right first choice for new application code.

## Segment 3 (code: connecting with endpoint and key)

Every account exposes an endpoint URI and one or more keys — the same role a connection string plays for SQL Server. The CosmosClient is expensive to construct, so you create exactly one per application and reuse it, the same discipline as pooling a SqlConnection.

## Segment 4 (outro)

A point read by id and partition key is the cheapest operation Cosmos DB offers, and every SDK exposes the exact request charge on the response. Next up: what happens when existing MongoDB and Cassandra apps point at Cosmos DB instead of rewriting anything.
