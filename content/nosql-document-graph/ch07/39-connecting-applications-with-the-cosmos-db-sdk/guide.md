# Connecting Applications with the Cosmos DB SDK

Every relational connection you've ever opened — ADO.NET, ODBC, JDBC — follows the same rough
pattern: a connection string, a driver, a client object you reuse across calls. Cosmos DB's
official SDKs follow that same pattern, adapted for a database that speaks JSON documents and
bills by the request unit instead of returning a raw result set.

## What you'll learn

- The official SDKs Microsoft ships, and when you'd reach for each one
- The endpoint + key connection pattern, and why the client object should be a singleton
- What a basic point read looks like through the SDK, and why it's the cheapest operation you can run

## The official SDKs

Microsoft maintains official Cosmos DB SDKs for **.NET**, **Java**, **Python**, and **Node.js**
(JavaScript/TypeScript), each wrapping the same underlying REST API and exposing the same core
concepts — client, database, container, item — in that language's idioms. All four are actively
maintained, open source, and the right first choice for new application code; community SDKs exist
for other languages but aren't first-party.

## Connecting: endpoint and key

Every Cosmos DB account exposes an **endpoint URI** (the account's HTTPS address) and one or more
**keys** (primary/secondary, read-write or read-only) used to authenticate. Together they form the
same role a connection string plays for SQL Server — everything the client needs to reach the
account and prove it's authorized.

```csharp
using Microsoft.Azure.Cosmos;

// Create once, reuse for the lifetime of the application
CosmosClient client = new CosmosClient(
    accountEndpoint: "https://my-account.documents.azure.com:443/",
    authKeyOrResourceToken: "<primary-key>"
);

Database database = client.GetDatabase("RetailDB");
Container container = database.GetContainer("Orders");
```

The `CosmosClient` is expensive to construct — it opens connections, discovers the account's
regions, and initializes internal caches. Create exactly one per application (a singleton), the
same discipline you'd apply to a SqlConnection pool, and reuse it for every operation.

## A point read: the cheapest thing you can do

```csharp
ItemResponse<Order> response = await container.ReadItemAsync<Order>(
    id: "order-4471",
    partitionKey: new PartitionKey("customer-882")
);
Order order = response.Resource;
double ruCharge = response.RequestCharge;
```

Reading a single item by its `id` and partition key — a **point read** — is the cheapest, fastest
operation Cosmos DB offers, typically around 1 RU regardless of item size for small documents.
Every SDK exposes the request charge on the response, letting you measure exactly what an
operation cost in real time rather than guessing from an execution plan.

## Key terms

| Term | Meaning |
|---|---|
| CosmosClient | The top-level SDK object representing a connection to a Cosmos DB account; expensive to create, meant to be a singleton |
| Endpoint | The account's HTTPS URI used to connect |
| Key | The primary/secondary credential authorizing the client (read-write or read-only) |
| Point read | Reading a single item by id + partition key, the cheapest possible operation |

## Check yourself

A developer new to Cosmos DB creates a fresh `CosmosClient` inside every API request handler in
their web app. Why is that a real problem, and what should they do instead?
