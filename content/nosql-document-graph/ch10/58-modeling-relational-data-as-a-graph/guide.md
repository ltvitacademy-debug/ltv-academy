# Modeling Relational Data as a Graph

This lesson closes Chapter Ten with the thing every principle in the last few lessons was
building toward: a full worked example, converting a small, ordinary relational schema
into an actual graph model. The schema is deliberately familiar — `Customers`, `Orders`,
`OrderItems`, and `Products`, joined by foreign keys — because it's the same shape as the
migration warning from Lesson 52, worked through properly this time.

## What you'll learn

- The starting relational schema and its foreign key relationships
- How each table and foreign key maps onto the graph model, table by table
- The finished Cypher `CREATE` statements for the resulting graph

## The relational starting point

```
Customers(CustomerId PK, Name, Email)
Orders(OrderId PK, CustomerId FK, OrderDate)
OrderItems(OrderId FK, ProductId FK, Quantity)
Products(ProductId PK, Name, Price)
```

`Orders.CustomerId` is a foreign key to `Customers`. `OrderItems` is a classic **junction
table**, resolving the many-to-many relationship between `Orders` and `Products`, holding
`Quantity` as the one piece of data specific to that particular pairing.

## Applying the node-or-property test, table by table

- **Customers → node.** Each customer needs independent identity, is referenced by many
  orders, and is a natural thing to query directly ("show me this customer's orders"). Label:
  `Customer`.
- **Products → node.** Same reasoning — shared across many orders, queried directly
  ("which customers bought this product"). Label: `Product`.
- **Orders → node.** An order has its own identity, its own date, and connects both to a
  customer and to multiple products. Label: `Order`.
- **OrderItems → not a node — it becomes a relationship.** This is the key insight the
  earlier lessons were building toward. A junction table in a relational schema, whose only
  job is to connect two other tables and carry a small amount of pairing-specific data, maps
  directly onto a **relationship with a property** in the graph. `Quantity` doesn't need its
  own node — it becomes a property on the relationship connecting the `Order` to the
  `Product`.

The foreign keys themselves become **relationships**, not properties: `Orders.CustomerId`
becomes a `PLACED` relationship from `Customer` to `Order`, and the resolved
`OrderItems` junction becomes a `CONTAINS` relationship from `Order` to `Product`.

## The resulting graph model

```
(:Customer {customerId, name, email})
      -[:PLACED]->
(:Order {orderId, orderDate})
      -[:CONTAINS {quantity}]->
(:Product {productId, name, price})
```

And the Cypher to actually build a small piece of it:

```cypher
CREATE (c:Customer {customerId: 1, name: 'Ana Ortiz', email: 'ana@example.com'})
CREATE (p:Product {productId: 101, name: 'Widget', price: 9.99})
CREATE (o:Order {orderId: 5001, orderDate: date('2026-03-01')})
CREATE (c)-[:PLACED]->(o)
CREATE (o)-[:CONTAINS {quantity: 3}]->(p)
```

Notice what disappeared entirely: there's no `OrderItems` node, and no foreign key columns
anywhere. The junction table's *purpose* — connecting orders to products with a
quantity — survives completely, carried by the `CONTAINS` relationship and its property,
just without a table dedicated to it. A query like "what did this customer buy, and how
much of each" is now a direct three-hop traversal, `(c)-[:PLACED]->(o)-[:CONTAINS]->(p)`,
with no `JOIN` involved at all.

## Key terms

| Term | Meaning |
|---|---|
| Junction table | A relational table resolving a many-to-many relationship, typically mapping onto a graph relationship (with properties) rather than a node |
| Foreign key → relationship | The general pattern: relational foreign keys become graph relationships, not node properties |
| CONTAINS {quantity} | An example of a relationship carrying its own property, replacing a junction table's pairing-specific data |

## Check yourself

In the `Customers`/`Orders`/`OrderItems`/`Products` schema, why does `OrderItems` become a
relationship instead of a node in the graph model, and where does its `Quantity` column end
up?
