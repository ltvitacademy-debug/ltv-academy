# Lesson 4 — CMDB Fundamentals Lab

**Chapter 1 · CMDB Fundamentals · Lesson 4 of 26**

## What you'll learn

- How to apply Lesson 1's CI test to a real, concrete scenario
- How to pick the right `cmdb_ci` subclass for each component, using Lesson 2's hierarchy
- Which class-specific fields each CI would actually carry
- Where this simple model would already start showing the data-quality risks from Lesson 3

## The scenario

A mid-size company, Harrow Logistics, runs a customer-facing order
tracking application. It's a standard three-tier web application:

1. A web server running the public-facing site
2. An application server running the business logic
3. A database server holding order and customer data

Your job in this lab is to work through, on paper, exactly how this
application would be modeled in the CMDB — which CI classes are
needed, and which class-specific fields each one would carry. There's
no ServiceNow instance to click through here; this is the modeling
exercise itself, the part that has to happen correctly before any
record gets created.

## Step 1 — Identify the application itself

The order tracking application, as a whole, is itself a Configuration
Item — separate from any of the servers it runs on. Using Lesson 2's
hierarchy, this is a `cmdb_ci_appl` record:

- **name**: Order Tracking Application
- **version**: 4.2
- **vendor**: in-house build
- **business_criticality**: high (customer-facing, revenue-affecting)

Run Lesson 1's test against it: does its state matter? Yes — whether
it's up, degraded, or down directly affects customers. Do its
relationships matter? Yes — it depends on the servers below it, and
Chapter 2 will show you how to make those dependencies explicit as real
relationship records. It passes the test cleanly.

## Step 2 — Identify the server tier

The web server and the application server are each a physical or
virtual server, so each gets its own `cmdb_ci_server` record:

| Field | Web server | App server |
|---|---|---|
| name | WEB-HARROW-01 | APP-HARROW-01 |
| operating_system | Linux (Ubuntu 22.04) | Linux (Ubuntu 22.04) |
| cpu_count | 4 | 8 |
| ram | 16 GB | 32 GB |
| virtualization_type | VM | VM |

Notice these are two separate CI records, not one "server tier" record.
Each server has its own, independently trackable state — the app
server could go down for maintenance while the web server stays up —
so each needs to be identifiable and trackable on its own.

## Step 3 — Identify the database tier

The database itself — not the server it happens to run on — is a
`cmdb_ci_database` record:

- **name**: Harrow Orders DB
- **db_type**: PostgreSQL
- **schema**: orders_prod
- **instance_name**: harrow-orders-01

Note the distinction worth sitting with: the database server (a
`cmdb_ci_server`, hosting the database engine) and the database instance
itself (a `cmdb_ci_database`, the actual data and schema) are two
separate CIs. The server could be patched and rebooted without the
database instance changing at all; the database could be migrated to
new hardware without its own schema or instance name changing. Keeping
them separate is exactly what lets each one's state be tracked
accurately and independently — collapsing them into one record would
lose that.

## Step 4 — Where this model is already fragile

Even this simple, five-CI model already shows the real risks from
Lesson 3. If Discovery (Chapter 4) scans the servers automatically but
the application and database records were entered manually, their
`operational_status` values could drift out of sync with reality at
different rates — the servers staying current while the application
record quietly goes stale. And without a named owner for the
application record specifically, nobody is positioned to notice if its
`business_criticality` or version falls out of date as the application
evolves. Nothing about this model is wrong; it's just already exposed
to the exact governance gaps Lesson 3 described.

## What you've built

Four CI records: one `cmdb_ci_appl`, two `cmdb_ci_server`, and one
`cmdb_ci_database`. Right now they're four disconnected records that
happen to exist — nothing yet says the application actually runs on
those two servers, or that the app server actually talks to that
database. Chapter 2 is where relationships turn these four records
into something that actually represents the running application.

## Key terms

| Term | Meaning |
|---|---|
| Three-tier application | A web tier, an application tier, and a database tier, each separately modeled |
| `cmdb_ci_appl` record | Represents the application itself, independent of the servers running it |
| Database instance vs. database server | The data/schema (`cmdb_ci_database`) is a separate CI from the server hosting it (`cmdb_ci_server`) |

## Check yourself

Before moving to Chapter 2, make sure you can answer: why are the
database server and the database instance modeled as two separate CI
records instead of one combined record?
