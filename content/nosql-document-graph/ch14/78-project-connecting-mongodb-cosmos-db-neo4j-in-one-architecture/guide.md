# Project: Connecting MongoDB, Cosmos DB & Neo4j in One Architecture

Lesson 77 matched each of Meridian Outfitters' three problems to the platform that actually
fits it: MongoDB for the uneven 40,000-SKU catalog, Neo4j for recommendations and fraud-ring
detection, Cosmos DB for cart and session state across three continents. That was the easy
part — three separate decisions, made one at a time. This lesson asks the harder question: what
does it look like when all three run in the same production application, at the same time,
supporting the same shopper?

## What you'll learn

- A real architecture diagram showing where MongoDB, Neo4j, and Cosmos DB each sit in one
  Meridian request path
- How data actually moves between the three platforms — not a shared database, but events and
  sync jobs connecting independent systems
- The honest operational cost of polyglot persistence, weighed against its real benefit, from a
  DBA's perspective rather than a developer's

## One shopper, three platforms

Picture a Meridian shopper in Melbourne browsing tents. A single visit to that product page and
the checkout that follows touches all three platforms, each doing the job it's suited for:

```
                        ┌─────────────────────────┐
                        │   Meridian Web / App     │
                        └───────────┬─────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐         ┌──────────────────┐        ┌──────────────────┐
│    MongoDB     │         │     Cosmos DB     │        │       Neo4j       │
│ product catalog │         │ cart & session    │        │ recommendation &  │
│ (40,000 SKUs)   │         │ (3-region reads)  │        │ fraud graph        │
└───────┬────────┘         └─────────┬─────────┘        └─────────┬─────────┘
        │  1. Product page loads      │  2. Add-to-cart is a       │  4. "Customers who
        │  the tent document          │  low-latency local write   │  bought this" query
        │  straight from Mongo        │  (session consistency)     │  runs against the graph
        │                              │                            │
        └───────────────► 3. Order is placed → purchase event ─────┘
                            published, consumed by a sync job
                            that writes a new (:Customer)-[:BOUGHT]->(:Product)
                            edge into Neo4j
```

Read that left to right as a real request flow, not three unrelated diagrams stitched together:

1. **Product page load** — the web app reads the tent's document straight from MongoDB. No
   join, no reconstruction — the document already has the shape the page needs.
2. **Add to cart** — the cart write goes to Cosmos DB, in whichever region is physically closest
   to the shopper, under session consistency. The shopper's own next read always reflects their
   own write, without waiting on a round trip to a single home region.
3. **Order placed** — this is the seam between the three systems. Placing an order is a
   transactional write against Meridian's order system, but it also **publishes an event**:
   "customer X bought product Y." Nothing queries Neo4j synchronously during checkout — that
   would make the checkout path depend on a fourth system being up.
4. **Recommendation graph updated** — a separate sync job consumes that purchase event and
   writes the corresponding `(:Customer)-[:BOUGHT]->(:Product)` relationship into Neo4j. The
   next shopper who views that tent gets a recommendation informed by this purchase, but not
   from this purchase's own checkout request.

That last point matters enough to say directly: **the three platforms are not one shared
database with three faces.** They're three independent systems, each owning its own data, kept
in sync by events and jobs — not by a live query reaching across platforms. MongoDB doesn't know
Neo4j exists. Cosmos DB doesn't know MongoDB exists. The application layer, and the integration
jobs between them, are what make this look like one architecture instead of three unrelated
ones.

## The real cost of running three platforms

A relational DBA moving into this world for the first time should not romanticize it. Running
MongoDB, Cosmos DB, and Neo4j in production instead of one well-run SQL Server instance is a
real, ongoing operational cost, and this course's earlier chapters on backup, security, and
monitoring for each platform exist precisely because that cost is real:

- **Three backup strategies to own**, not one — MongoDB's replica-set-aware backups, Cosmos
  DB's continuous or periodic backup settings, and Neo4j's own backup tooling, each with
  different retention and restore mechanics.
- **Three security surfaces to secure** — MongoDB authentication and RBAC, Cosmos DB keys/RBAC
  and network isolation, Neo4j's own role-based access control. A DBA responsible for this
  architecture is responsible for all three, not the one they like best.
- **Three monitoring dashboards, three sets of alert thresholds, three vendors' worth of
  documentation** to stay current on, instead of one deeply-known engine.
- **A sync job that can fail quietly** — if the purchase-event consumer that updates Neo4j goes
  down, the recommendation graph silently goes stale while checkout keeps working fine. That
  failure mode doesn't exist in a single-database system, and it's exactly the kind of thing a
  DBA needs to monitor for.

## The real benefit that justifies it

Set against that cost, the benefit is equally real, not a marketing claim: **each problem is
solved by the tool actually built for it.** The catalog wouldn't perform well as a
heavily-joined EAV table. The recommendation and fraud queries wouldn't perform well as
multi-hop relational self-joins that get worse every time marketing asks for one more hop. The
cart and session data wouldn't serve UK, German, and Australian shoppers with acceptable latency
from a single-region SQL Server instance. A single "just use one database for everything"
architecture wouldn't fail Meridian instantly — it would fail slowly, as each of these three
problems separately gets worse with scale, exactly as Lesson 77 described.

This is the actual judgment call a senior DBA makes, and it isn't "always centralize" or "always
add another specialized platform." It's weighing a specific, real operational cost against a
specific, real performance and scalability benefit, for each individual problem, rather than
applying either instinct as a blanket rule.

## Key terms

| Term | Meaning |
|---|---|
| Polyglot persistence | Using more than one data storage technology in one application, each chosen for a specific access pattern rather than one database for everything |
| Event-driven sync | Keeping independent data stores consistent by publishing and consuming events (e.g. "order placed") rather than querying across platforms live |
| Operational surface area | The total set of things a DBA/ops team must monitor, back up, and secure — grows with each additional platform in the architecture |
| Session consistency | Cosmos DB's consistency level guaranteeing a client always reads its own writes, used here for cart/session state |

## Check yourself

Why does the purchase event get published and consumed by a separate sync job, instead of the
checkout process writing directly to Neo4j as part of placing the order? What would go wrong if
it worked the other way?
