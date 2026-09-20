# Provisioning a Cosmos DB Account & Container

Every Cosmos DB resource sits inside a strict hierarchy: account, then database, then
container. Understanding this hierarchy — and what gets configured at each level — is the
prerequisite for everything else in this chapter, from partitioning (Lesson 32) to
throughput provisioning (Lesson 34). This lesson walks the real, ordered sequence of
standing up each level, the way a DBA actually provisions one.

## What you'll learn

- The three-level resource hierarchy: account, database, container
- What gets configured at each level, and why it matters
- The real ordered sequence for provisioning, using the Azure CLI

## The resource hierarchy

- **Account** — the top-level Azure resource. An account is where you choose the API
  (Core, MongoDB, Cassandra, Gremlin, or Table, from Lesson 30), the Azure regions the
  account is deployed to, and account-wide settings like default consistency level
  (Chapter 8). One Azure subscription can hold multiple Cosmos DB accounts.
- **Database** — a logical grouping of containers within an account, roughly analogous to a
  SQL Server database as a namespace. Databases can optionally have their own provisioned
  throughput, shared across the containers inside them.
- **Container** — the actual unit that stores data (documents, in Core API) and the level
  at which partitioning (Lesson 32) and throughput (Lesson 34) are most commonly
  provisioned directly. A container is roughly analogous to a table, but with a mandatory
  partition key decision baked into its creation.

## Step 1: create the account

Using the Azure CLI, an account is created with a chosen API type and region:

```
az cosmosdb create \
  --name my-cosmos-account \
  --resource-group my-resource-group \
  --locations regionName=EastUS \
  --kind GlobalDocumentDB
```

`--kind GlobalDocumentDB` selects the Core (SQL) API — the API choice is made at account
creation and is not something changed later without creating a new account.

## Step 2: create the database

```
az cosmosdb sql database create \
  --account-name my-cosmos-account \
  --resource-group my-resource-group \
  --name AppDatabase
```

At this point no throughput has necessarily been provisioned yet — that decision can happen
here, at the database level, or deferred to individual containers.

## Step 3: create the container

```
az cosmosdb sql container create \
  --account-name my-cosmos-account \
  --resource-group my-resource-group \
  --database-name AppDatabase \
  --name Orders \
  --partition-key-path "/customerId" \
  --throughput 400
```

The `--partition-key-path` is mandatory and, per Lesson 32, effectively permanent for the
life of the container — this is the single most consequential decision made during
provisioning, on par with choosing a shard key in MongoDB. `--throughput 400` requests 400
RU/s of provisioned throughput (Lesson 34 covers what an RU actually is and how to size
this number correctly).

## Key terms

| Term | Meaning |
|---|---|
| Account | The top-level Cosmos DB resource; sets API type, regions, and account-wide consistency |
| Database | A logical namespace grouping containers within an account |
| Container | The unit that stores data; where partition key and throughput are most commonly set |
| `--kind GlobalDocumentDB` | Azure CLI flag selecting the Core (SQL) API at account creation |

## Check yourself

Why can't the API type (Core, MongoDB, Cassandra, and so on) be changed on an existing
Cosmos DB account after it's created?
