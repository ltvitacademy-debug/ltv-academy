# Lesson 2 — Scoping the Kubernetes Migration

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 2 of 26**

## What you'll learn

- How to turn a broad mandate ("migrate to Kubernetes at scale") into a concrete, bounded scope
- Which of Driftwood's services actually move to Kubernetes for this phase, and which don't
- Why "the sale" is the right forcing deadline for this scope, and what that deadline rules out
- The difference between scoping a migration and scoping a greenfield build — you're moving real,
  already-running services, not designing from a blank page

## The services on the table

Driftwood's engineering org now ships a dozen services weekly. Before any cluster gets built,
Theo and Casey Lindqvist sit down and sort them into three buckets:

| Bucket | Services | Why |
|---|---|---|
| **Moves to Kubernetes now** | `catalog-api`, `checkout-api`, `cart-api` | These three are the storefront path a shopper walks through during the sale — browse, add to cart, pay. If any one fails under load, the sale fails. |
| **Stays as-is for this phase** | Internal admin tools, the nightly reporting job, the email-notification worker | None of these face customer traffic during the sale, and none benefit enough from Kubernetes right now to justify the migration risk this close to the deadline |
| **Explicitly deferred, not forgotten** | The remaining seven services | Real candidates for a later phase — Lesson 20 picks this list back up once the sale is behind you |

This is the same discipline from the intermediate project's scoping lesson, applied at a bigger
scale: scope isn't just "what do we build," it's "what do we deliberately *not* build yet, and
why." A plan that tries to migrate all twelve services before the sale is not more ambitious — it's
riskier, with no more time to validate it.

## What "moves to Kubernetes" actually means here

For `catalog-api`, `checkout-api`, and `cart-api`, the scope for this phase is specifically:

1. **Containerize and run on a real Kubernetes cluster** — not a proof-of-concept cluster, a
   production one, sized and configured to take real holiday traffic.
2. **Autoscale under load** — the whole point of moving off fixed VM sizing is that `checkout-api`
   in particular needs to scale out fast when traffic spikes, and back down when it doesn't.
3. **Stay observable and cost-attributable** — every one of these services needs to show up,
   individually, in both a reliability view and the new FinOps dashboard.

What's explicitly *out* of scope for this phase: migrating the database layer itself (the catalog
and order data stay on the managed databases they're already on), re-architecting any service's
internal code, and standing up a service mesh. Each of those is a real, defensible project — just
not one that fits inside the time remaining before the sale.

## Why the sale is the right deadline, and what it rules out

The sale date isn't an arbitrary deadline Theo picked — it's the forcing function that makes this
scope honest. A migration "done" two weeks before the sale, with no real traffic yet to validate
it, is not actually done; it's untested. Anchoring scope to the sale means:

- Every decision from here gets judged against one question: *will this hold up under the sale's
  real traffic, verified, not assumed?*
- There's no room left for scope creep disguised as thoroughness — a nice-to-have that doesn't
  directly serve surviving the sale gets deferred, not squeezed in.
- The plan has to include real validation time (Lesson 8's load test) before the sale, not just
  build time — "finished building" and "finished proving" are different milestones.

## A migration, not a greenfield build

One more scoping distinction matters: `catalog-api`, `checkout-api`, and `cart-api` already exist,
already run in production, and already have real customers depending on them today. That changes
the shape of the work versus designing a new system from scratch:

- Each service needs a **parallel path** onto Kubernetes that can be validated before cutover,
  not a big-bang replace.
- Rollback has to be a real, rehearsed option, not a hope — if the Kubernetes path misbehaves
  before the sale, the old path needs to still work.
- Nothing about each service's external behavior (API contracts, response shapes) can change as a
  side effect of the migration — the sale isn't the time to also ship a breaking change.

## Key terms

| Term | Meaning |
|---|---|
| Scope | The explicit, bounded set of work committed to for this phase — including what's deliberately excluded |
| Forcing deadline | A real external date that disciplines scope by making every inclusion justify itself against it |
| Parallel path | Running the new (Kubernetes) version of a service alongside the old one, validated, before cutting traffic over |
| Deferred (not cut) | Work explicitly scoped out of this phase but written down to revisit later, rather than silently dropped |

## Lab

1. Sort Driftwood's twelve services into the same three buckets Theo and Casey used, in your own
   words, and write one sentence justifying each bucket's criteria.
2. List the three things explicitly out of scope for this phase (database migration,
   re-architecting service internals, a service mesh) and write one sentence each on why deferring
   them is the right call this close to the sale.

## Check yourself

You're ready for Lesson 3 when you can name the three services moving to Kubernetes in this phase
and explain, from memory, why anchoring scope to the sale date — rather than to a feature list —
is what keeps this plan honest.
