# Lesson 8 — Relationships Lab

**Chapter 2 · Relationships & the Dependency View · Lesson 8 of 26**

## What you'll learn

- How to turn four disconnected CI records into a real, connected relationship graph
- How to pick the correct relationship type and direction for each real connection
- How to read a Dependency View query by hand, from either end of the graph
- How to trace transitive impact through the graph for a real emergency-maintenance scenario

## The scenario

Chapter 1's lab modeled Harrow Logistics' order tracking application as four separate CI records: one `cmdb_ci_appl` (Order Tracking Application), two `cmdb_ci_server` records (WEB-HARROW-01 and APP-HARROW-01), and one `cmdb_ci_database` record (Harrow Orders DB). That lab ended by pointing out the gap: those four records existed, but nothing on the platform yet said the application actually runs on those two servers, or that it actually depends on that database. This lab closes that gap — and then uses the resulting graph for real impact analysis, exactly as Lesson 7 described.

## Step 1 — Build the relationship records

Using Lesson 5's directional-pair types, three `cmdb_rel_ci` records connect the four CIs:

```
Relationship 1:
  parent: Order Tracking Application
  child:  WEB-HARROW-01
  type:   Runs on :: Runs

Relationship 2:
  parent: Order Tracking Application
  child:  APP-HARROW-01
  type:   Runs on :: Runs

Relationship 3:
  parent: Order Tracking Application
  child:  Harrow Orders DB
  type:   Depends on :: Used by
```

Notice the type choice for each one is deliberate, not arbitrary. The application genuinely **runs on** each server — that's the "Runs on :: Runs" pair from Lesson 5. The application's relationship to the database is different in kind: the application doesn't run *on* the database, it **depends on** it for data — so that connection correctly uses "Depends on :: Used by" instead. Picking "Runs on" for the database relationship would describe something that isn't actually true, and would quietly corrupt any later query that assumes "Runs on" means what it's supposed to mean.

## Step 2 — Read the graph from the Dependency View

With those three records in place, opening the Dependency View on the Order Tracking Application CI would now show exactly what Step 1 built: one CI with two "Runs on" relationships (to WEB-HARROW-01 and APP-HARROW-01) and one "Depends on" relationship (to Harrow Orders DB) — a small graph where the application sits in the middle, connected to the three CIs beneath it. Opening the Dependency View on Harrow Orders DB instead shows the same data from the other side: one "Used by" relationship, pointing back up at the Order Tracking Application. Same three records, two different starting points, two consistent views — exactly the "graphical read of existing data" Lesson 6 described.

## Step 3 — Trace impact for emergency database maintenance

Now apply Lesson 7's method for real. Harrow Orders DB needs emergency maintenance and has to come offline for two hours. Starting at Harrow Orders DB and walking its relationships outward:

1. **Direct relationship**: Harrow Orders DB is **used by** the Order Tracking Application (the reverse reading of Relationship 3).
2. **What that means for the application**: the Order Tracking Application depends on this database, so taking the database offline means the application itself cannot function correctly for those two hours — not just "the database is unavailable," but "the thing people actually use is broken."
3. **What that means for the servers**: WEB-HARROW-01 and APP-HARROW-01 stay technically up and reachable — their own relationships to the application are "Runs on," not "Depends on" the database — but with the application they host broken, that uptime doesn't help anyone. The honest impact statement is about the application, not the server hardware.

The correct, complete impact statement for this maintenance window is: *"Taking Harrow Orders DB offline breaks the Order Tracking Application for its full duration — WEB-HARROW-01 and APP-HARROW-01 will stay up but will be serving a non-functional application."* That is a materially more useful answer than "a database server is going down," and it's the direct product of the three relationship records built in Step 1 — nothing more was needed to get there.

## Step 4 — Where this chain currently stops, and why

Lesson 7 stressed that real impact analysis should follow the chain as far as it genuinely goes, not stop early. Here, the chain legitimately stops at the Order Tracking Application, because that's as far as this CMDB currently models it — no CI yet represents "the business service this application supports" or which departments rely on it. That's not a mistake in this lab; it's an accurate reflection of what's been built so far. Chapter 3 introduces the Common Service Data Model specifically to add that missing layer — a real business-service CI that the Order Tracking Application would relate to, extending this exact same chain one hop further, from "an application is broken" to "a named business service, with named consumers, is broken."

## Key terms

| Term | Meaning |
|---|---|
| Relationship record | A `cmdb_rel_ci` row connecting two specific CIs with a chosen, directional type |
| Correct type selection | Choosing the relationship type that matches what's actually true (e.g., "Depends on," not "Runs on," for a data dependency) |
| Two-sided graph read | Opening the Dependency View from either end of a relationship shows the same data, correctly reversed |
| Chain endpoint | Where an impact-analysis trace legitimately stops, because no further relationship has been modeled yet |

## Check yourself

Before moving to Chapter 3, make sure you can answer: why does the impact statement for the emergency database maintenance correctly center on the Order Tracking Application rather than on WEB-HARROW-01 or APP-HARROW-01, and what real gap in this CMDB is Chapter 3's Common Service Data Model built to close?
