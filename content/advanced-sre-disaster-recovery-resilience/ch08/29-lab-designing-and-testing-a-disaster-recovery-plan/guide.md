# Lesson 29 — Lab: Designing and Testing a Disaster Recovery Plan

**Chapter 8 · Capstone: Building a Resilient Enterprise System · Lesson 29 of 32**

## What you'll learn

- How to turn a dependency map (Chapter 4) into real, tiered RTO/RPO targets instead of one
  blanket number for an entire system
- How to match a DR architecture pattern to each tier, rather than over-building every service to
  the same standard
- How to automate a failover instead of writing a runbook a human has to execute correctly at 3 a.m.
- How to test a DR plan safely, by scoping the failover to one tier instead of the whole platform

## The scenario

Wrenhaven Retail runs a mid-size online storefront: a public web front end, a checkout/order
service, an inventory and catalog service, a Postgres primary database, and a Redis session cache,
all running in Azure's East US 2 region with a warm-standby footprint in Central US. Leadership has
asked for "a disaster recovery plan." That phrase means nothing on its own — a real plan has to
say, service by service, how much downtime and data loss is tolerable, and what architecture
actually delivers that.

## Step 1 — Extend the dependency map into tiers

Lesson 14's dependency mapping already answered "what calls what." This lab reuses that map and
adds a business-impact tier to each node:

```yaml
# dr-tiers.yaml
tier_1_checkout:
  services: [storefront-web, checkout-api, payment-integration]
  data_stores: [orders-db (Postgres), session-cache (Redis)]
  impact: "Revenue stops the instant this is down."

tier_2_catalog:
  services: [inventory-api, catalog-search]
  data_stores: [catalog-db (Postgres read replica)]
  impact: "Customers can't browse accurately, but existing carts still check out."

tier_3_reporting:
  services: [nightly-analytics-job, reporting-dashboard]
  data_stores: [analytics-warehouse]
  impact: "Internal only. Stale reports are an inconvenience, not an outage."
```

Three tiers, not one blanket rating — this is the whole point of a dependency map. Without it, a
DR plan either gold-plates reporting it doesn't need, or under-protects checkout it can't afford to
lose.

## Step 2 — Assign RTO and RPO per tier

| Tier | RTO (max downtime) | RPO (max data loss) | Why |
|---|---|---|---|
| 1 — Checkout | 5 minutes | 1 minute | Direct revenue, real money mid-transaction |
| 2 — Catalog | 30 minutes | 15 minutes | Degrades the experience, doesn't block revenue |
| 3 — Reporting | 24 hours | 24 hours | Internal, next business day is acceptable |

These numbers aren't guesses — each one is a negotiated cost tradeoff. A 1-minute RPO on checkout
means synchronous or near-synchronous replication, which costs real money and latency. A 24-hour
RPO on reporting means a nightly backup is genuinely good enough, and spending more there would be
waste.

## Step 3 — Pick an architecture pattern that actually delivers each number

```
Tier 1 (checkout):
  Azure SQL/Postgres Flexible Server auto-failover group (active-passive, near-sync)
  Azure Front Door, priority routing: East US 2 -> Central US
  Redis: geo-replicated, accept cache-cold-start on failover (session re-auth, not data loss)

Tier 2 (catalog):
  Read replica in Central US, promoted manually/scripted on failover
  Front Door failback once catalog-api in Central US reports healthy

Tier 3 (reporting):
  Nightly backup to geo-redundant storage only -- restored on demand, no standby compute running
```

Three different patterns for three different budgets. Tier 1 runs a standby database continuously;
Tier 3 runs nothing until it's actually needed.

## Step 4 — Automate the failover, don't document it as steps for a human

```bash
#!/usr/bin/env bash
# failover-tier1.sh -- flips Tier 1 traffic and DB to Central US
set -euo pipefail

echo "Promoting Postgres replica in centralus..."
az postgres flexible-server replica promote \
  --name wrenhaven-orders-db-replica-centralus \
  --resource-group rg-wrenhaven-dr

echo "Re-pointing Front Door origin group to centralus..."
az afd origin update \
  --resource-group rg-wrenhaven-dr \
  --profile-name wrenhaven-afd \
  --origin-group-name checkout-origins \
  --origin-name checkout-centralus \
  --priority 1

echo "Tier 1 failover complete. Verifying health..."
curl -sf https://checkout.wrenhaven.com/health || { echo "HEALTH CHECK FAILED"; exit 1; }
echo "Checkout healthy on centralus."
```

A script that runs the same way every time beats a runbook a tired on-call engineer has to read
correctly at 3 a.m. — this is Chapter 4 Lesson 15's point, applied for real here.

## Step 5 — Test it with a scoped failover, not a full-platform drill

A first DR test should never be "fail everything over and see what happens." It should prove one
tier's plan works, with a blast radius small enough to recover from if something's wrong:

```
1. Announce a scoped test window (Tier 1 only) in the incident channel.
2. Run failover-tier1.sh against a canary slice of traffic (5% via Front Door weighted routing).
3. Measure actual time-to-healthy: 4m 12s observed against a 5-minute RTO target. PASS.
4. Check replica lag at the moment of promotion: 38 seconds of orders in flight. Within the
   1-minute RPO target. PASS.
5. Fail back to East US 2, confirm catalog and reporting tiers were never touched.
```

The test only proves what it exercises. Tier 1 passing here says nothing about Tier 2 or Tier 3 —
each tier gets its own scoped test, which is exactly what Lesson 30 broadens into a full chaos
experiment and game day.

## Key terms

| Term | Meaning |
|---|---|
| RTO (Recovery Time Objective) | Maximum acceptable downtime for a service, set per tier, not platform-wide |
| RPO (Recovery Point Objective) | Maximum acceptable data loss, measured in time, set per tier |
| Tiered DR | Matching replication and failover architecture to each service's actual business impact instead of one standard for everything |
| Scoped failover test | Testing one tier's DR plan against a limited blast radius instead of the whole platform at once |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does Tier 1 get a
continuously running standby database while Tier 3 gets only a nightly backup — and what would go
wrong if those two tiers swapped architectures?
