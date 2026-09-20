# Project: Choosing the Right Model for a Real Business Problem

Every chapter so far has taught one platform at a time. This chapter, the course's closing
capstone, does the opposite: it hands you one company with three real data problems and asks
you to make the same decision a working DBA would actually have to make — not "which of these
three databases is best," but "which real problem does each one actually solve." That question
only makes sense once you can look at a specific business and tell its problems apart.

Meet **Meridian Outfitters** — a mid-size outdoor gear retailer selling tents, boots, headlamps,
cookware, and climbing hardware online across North America, with a launch into the UK, Germany,
and Australia starting next quarter. Meridian runs its financial and order data in SQL Server,
same as every DBA reading this has managed before. But three problems on their roadmap don't fit
that model well, and this lesson walks through why, one at a time.

## What you'll learn

- Meridian's three real data problems, and why each one is a poor fit for a single relational
  table design
- The actual decision process for matching a data problem to MongoDB, Neo4j, or Cosmos DB —
  not a memorized rule, a reasoned one
- Why "use the platform that fits the access pattern" beats "pick your favorite database" for
  every one of these three problems

## Problem 1: A catalog that won't sit still (→ MongoDB)

Meridian's catalog has around 40,000 SKUs across roughly 200 categories, and those categories
don't share attributes. A four-person tent has a floor area, a packed weight, a season rating,
and a pole material. A pair of hiking boots has a shoe size, a width, a waterproof rating, and a
lacing system. A cookware set has piece count, material, and stovetop compatibility. None of
those fields apply to the other two products.

Modeled relationally, this becomes either a `products` table with dozens of mostly-NULL columns,
or a normalized `product_attributes` key-value table joined back to `products` on every single
page load — the EAV (entity-attribute-value) pattern, which every experienced DBA has seen
degrade query performance as the attribute table grows. Neither option matches how the catalog
is actually read: the product page for one tent needs exactly that tent's fields, nested and
ready to render, not reconstructed from a dozen joined rows.

This is a document-database problem. In MongoDB, each product is one document, and a tent's
document and a boot's document can carry completely different fields side by side in the same
`products` collection:

```
{ _id: "tent-alpine-2p", category: "tents",
  floorAreaSqFt: 29, packedWeightOz: 96, seasonRating: 3 }

{ _id: "boot-ridgeline-mid", category: "boots",
  size: 10.5, width: "D", waterproof: true, lacing: "speed-hook" }
```

No schema migration is needed to add a new category next season. That flexibility is the
architectural bet document databases make, and it's exactly Meridian's problem.

## Problem 2: "Customers who bought this also bought…" (→ Neo4j)

Meridian's marketing team wants a recommendation engine: show a shopper looking at a tent the
other products that tent's past buyers also bought. Relationally, that query means joining
`orders` to `order_items` to `orders` again to `order_items` again — a multi-hop self-join that
gets slower and uglier the more hops you add, and marketing's next request is always "can we go
one hop further" (people who bought what *those* buyers bought).

A second, less pleasant version of the same shape shows up in fraud review: Meridian's loyalty
program was recently abused by a ring of accounts sharing shipping addresses and payment cards
to farm referral credit. Finding that ring relationally means the same kind of expensive
multi-hop join, run under pressure, against a growing `accounts` table.

Both problems are graph-shaped: they're about *how entities connect*, not about the entities
themselves. Neo4j stores the relationship between a customer and a product as a real, stored
edge, not something rebuilt from a join at query time, so a two-hop traversal is a cheap
pointer-chase instead of an expensive join:

```
MATCH (c:Customer)-[:BOUGHT]->(p:Product {id: "tent-alpine-2p"})
MATCH (c)-[:BOUGHT]->(rec:Product)
WHERE rec.id <> "tent-alpine-2p"
RETURN rec.id, count(*) AS timesBoughtTogether
ORDER BY timesBoughtTogether DESC LIMIT 5
```

Adding "one hop further" here means adding one more `MATCH` line, not rewriting a chain of
joins.

## Problem 3: Cart and session state on three continents (→ Cosmos DB)

Meridian's UK, Germany, and Australia launch means shoppers in Manchester and Melbourne will hit
the same site a customer in Denver does. A shopping cart and session read needs to feel instant
everywhere — a few hundred milliseconds of extra round-trip latency to a single US datacenter is
exactly the kind of thing that quietly raises cart-abandonment rates. This isn't a modeling
problem like the first two; it's a distribution problem. The data itself (a cart: customer ID,
line items, timestamps) is simple enough to fit in a relational table just fine.

What SQL Server on-prem, and even a single-region Azure SQL Database, can't do natively is serve
low-latency reads and writes from multiple regions at once while keeping that data reasonably
consistent. This is Cosmos DB's actual differentiator from earlier in this course: turnkey
multi-region distribution with a choice of consistency levels. Meridian's cart/session service
is a textbook fit for **session consistency** — a shopper always sees their own writes
immediately, while the system doesn't pay for strict global consistency it doesn't need.

## Why this isn't "pick a favorite"

Notice what didn't happen in any of these three decisions: nobody asked "which database is
better." Each choice came from asking what the data actually looks like and how it's actually
read — flexible, uneven records read whole (MongoDB); relationships queried by traversal, not
by the entities themselves (Neo4j); simple data that needs to be everywhere at once
(Cosmos DB). That's the same discipline this entire course has been building since Lesson 1,
now applied to one continuous business instead of three separate demos.

## Key terms

| Term | Meaning |
|---|---|
| EAV (entity-attribute-value) pattern | A relational workaround for variable attributes that trades a clean schema for expensive joins at read time |
| Multi-hop traversal | A query that follows a chain of relationships (e.g. customer → product → other buyers → their products) — cheap in a graph, expensive as repeated relational joins |
| Session consistency | A Cosmos DB consistency level guaranteeing a client always sees its own writes, without paying for full global strong consistency |
| Access pattern | How data is actually read in production — the real starting point for choosing a data platform, not a preference for one product |

## Check yourself

Meridian's engineering lead suggests keeping the "customers who bought this also bought" feature
in SQL Server, just with a few extra indexes on the `order_items` table. Based on this lesson,
what's the real problem with that plan, and why does it get worse over time rather than better?
