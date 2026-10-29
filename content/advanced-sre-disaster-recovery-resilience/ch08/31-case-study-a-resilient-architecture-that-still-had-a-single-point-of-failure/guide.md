# Lesson 31 — Case Study: A Resilient Architecture That Still Had a Single Point of Failure

**Chapter 8 · Capstone: Building a Resilient Enterprise System · Lesson 31 of 32**

## What you'll learn

- Why a genuinely multi-region, redundant architecture can still have a single point of failure
  hiding one layer below the application
- Why dependency mapping (Chapter 4) has to be re-run against supporting infrastructure, not just
  the services a team writes code for
- How a shared secrets store became Wrenhaven Retail's unseen single point of failure
- How the fix changes the dependency map itself, not just one piece of infrastructure

This case study is an illustrative scenario built for this course, not a report on a real company
or a real incident.

## Picking up where Lesson 30 left off

The game day's incident commander asked a question nobody on the call could answer with
confidence: "Is anything else silently depending on East US 2 right now?" The honest answer,
uncomfortable as it was, turned out to be yes — and finding it took a second look at
infrastructure nobody had put on the original dependency map at all.

## The architecture genuinely was redundant

On paper, and in practice, Wrenhaven's checkout path had real multi-region redundancy:

```
East US 2 (primary)              Central US (secondary)
  checkout-api                     checkout-api
  orders-db (primary)      <-->    orders-db (replica, auto-failover group)
  Redis session cache               Redis session cache (geo-replicated)
  Front Door (global)       -- routes to whichever region is healthy
```

Every piece a dependency-mapping exercise typically checks was actually redundant: compute in
both regions, a database with a working auto-failover group, geo-replicated cache, and a global
router. Lesson 29's scoped test had already passed against exactly this architecture. None of that
was fake or theatrical — it was real engineering, done correctly, at the layer most teams stop at.

## What the game day actually exposed

During the full-outage rehearsal, Ops failed the checkout path over to Central US exactly as
planned. Front Door routed traffic there. The database failover group promoted its replica. And
checkout-api in Central US came up... and immediately failed every request with authentication
errors against the payment gateway and the database connection string itself.

```
checkout-api (centralus) startup log (drill):
  Fetching secret "payment-gateway-api-key" from vault: wrenhaven-kv-eastus2
  ERROR: Unable to reach wrenhaven-kv-eastus2 (region unreachable per drill scenario)
  Fetching secret "orders-db-connection-string" from vault: wrenhaven-kv-eastus2
  ERROR: Unable to reach wrenhaven-kv-eastus2 (region unreachable per drill scenario)
  checkout-api failed to start: no secrets available.
```

Every service in both regions pulled its secrets from a single Azure Key Vault instance,
`wrenhaven-kv-eastus2`, that had never been replicated anywhere. Checkout-api in Central US wasn't
missing a database or a route — it was missing the credentials to use either one, because the one
place those credentials lived was inside the exact region the drill had just declared unreachable.

## Why the original dependency map missed this

Lesson 14's dependency map recorded `checkout-api depends on Key Vault` as a single edge — true,
but incomplete. It never asked the follow-up question a deeper pass requires: *which region is
that dependency actually running in, and does the secondary's survival depend on the primary's?*
The same blind spot commonly hides in a shared DNS provider whose nameservers all live behind one
account, or a single identity provider tenant that both "redundant" regions call to authenticate —
a secrets vault here, but the pattern is the same failure mode in any of those three. Redundancy
at the application layer means nothing if every redundant copy still shares one invisible,
unredundant dependency underneath it.

## The fix: replicate the dependency, then re-run the dependency map

```
1. Deploy a second Key Vault instance in Central US: wrenhaven-kv-centralus.
2. Replicate secrets into it on a schedule, treated as actual infrastructure with its own
   monitoring -- not a one-time manual copy.
3. Point centralus services at centralus's own vault first, with a documented, tested
   fallback order -- never a single hardcoded vault reference anywhere in the fleet.
4. Re-run the Chapter 4 dependency-mapping exercise specifically asking, for every existing
   edge: "is the thing on the other end of this edge itself region-redundant, or did we just
   assume it was because the service calling it is?"
```

Step 4 is the real lesson. The fix to one vault doesn't close this gap — rerunning the question
against every dependency does, because the next hidden single point of failure is never going to
announce itself; it's going to look exactly like a dependency nobody thought to ask about twice.

## Key terms

| Term | Meaning |
|---|---|
| Hidden single point of failure | A shared, unredundant dependency underneath an otherwise genuinely redundant architecture |
| Supporting infrastructure | Secrets vaults, DNS, and identity providers — infrastructure dependencies below the application layer that a dependency map must also cover |
| Dependency map depth | Whether a map stops at "depends on X" or continues to "and is X itself redundant, or shared across every redundant copy?" |
| Blast radius (revisited) | A region failover's real blast radius includes every shared dependency it silently still relies on |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: why did Wrenhaven's multi-region
checkout path still fail during the drill, even though compute, database, and cache were all
genuinely redundant — and what question does a dependency map have to ask about *every* edge, not
just the application-layer ones, to catch this before a real outage does?
