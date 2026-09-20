# Stored Procedures, Triggers & UDFs in Cosmos DB

T-SQL stored procedures, triggers, and scalar functions are all familiar territory from earlier in
this path. Cosmos DB has direct equivalents — but they're written in JavaScript and executed
inside the database engine itself, not in a proprietary procedural SQL dialect. That's a genuine
architectural difference, not just a syntax swap, and it comes with a real constraint that has no
clean T-SQL analog: transactional scope is confined to a single logical partition.

## What you'll learn

- How stored procedures, triggers, and UDFs differ from their T-SQL counterparts
- Why a stored procedure's transactional guarantee only covers one partition key
- The real distinction between pre-triggers and post-triggers, and why triggers aren't automatic

## Stored procedures: JavaScript, registered per container

A Cosmos DB stored procedure is a JavaScript function registered against a specific container.
It can perform multiple reads and writes and have them succeed or fail together — but only within
a single logical partition. There is no cross-partition transaction.

```js
function createOrder(orderDoc) {
  var context = getContext();
  var container = context.getCollection();
  var accepted = container.createDocument(
    container.getSelfLink(),
    orderDoc,
    function (err, created) {
      if (err) throw new Error("Order insert failed: " + err.message);
      context.getResponse().setBody(created);
    }
  );
  if (!accepted) throw new Error("Request not accepted");
}
```

This is the closest thing Cosmos DB has to a T-SQL stored procedure wrapping several statements in
one transaction — except the "transaction" boundary is the partition key, not the whole database.

## Triggers: explicit, not automatic

T-SQL triggers fire automatically whenever a matching DML statement runs. Cosmos DB triggers do
not — a **pre-trigger** or **post-trigger** must be explicitly named on the create/replace/delete
request that invokes it. Pre-triggers run before the operation (commonly used to validate or
modify the incoming document); post-triggers run after (commonly used to update related documents
or write an audit record). Nothing fires "automatically" the way an `AFTER INSERT` trigger does in
SQL Server — the client has to opt in on each call.

## UDFs: scalar functions used inside queries

A user-defined function extends the query language itself, called with a `udf.` prefix inside a
`SELECT`:

```js
// UDF registered as "toFahrenheit"
function toFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}
```

```sql
SELECT c.city, udf.toFahrenheit(c.tempCelsius) AS tempF
FROM c
```

This plays the same role as a T-SQL scalar function used in a `SELECT` list — computed per row (per
document), inline in the query.

## Key terms

| Term | Meaning |
|---|---|
| Stored procedure | A JavaScript function registered on a container, transactionally scoped to one partition key |
| Pre-trigger | Runs before a create/replace/delete when explicitly named on the request |
| Post-trigger | Runs after a create/replace/delete when explicitly named on the request |
| UDF | A JavaScript scalar function callable from a query with a `udf.` prefix |
| Partition-scoped transaction | Multi-statement atomicity that only holds within a single logical partition |

## Check yourself

A developer expects a Cosmos DB post-trigger to fire automatically on every insert, the way an
`AFTER INSERT` trigger does in SQL Server. Why will that expectation be wrong, and what does the
developer actually need to do?
