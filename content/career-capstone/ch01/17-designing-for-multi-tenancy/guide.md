# Lesson 17 — Designing for Multi-Tenancy

**Chapter 1 · System Design for Data Engineers · Lesson 17 of 81**

## What you'll learn

- The three tenancy models: shared, siloed, and hybrid
- Why "add a tenant_id column" alone doesn't guarantee isolation
- The noisy-neighbor problem, and how Fabric Capacities make it concrete
- Choosing a model against the non-functional requirements from Lesson 2

## Three tenancy models

A multi-tenant system serves many customers ("tenants") from one platform.
The design question is how much of the stack each tenant actually shares.

```
Shared:   one schema, one set of tables, every row tagged tenant_id
          -- cheapest, most operational leverage, weakest isolation

Siloed:   one database (or Fabric workspace) per tenant
          -- strongest isolation, most infrastructure to operate

Hybrid:   most tenants pooled (shared), large/regulated tenants siloed
          -- the isolation guarantee itself becomes tenant-tiered
```

None of these is "correct" in the abstract. A free-tier SaaS product
with thousands of small tenants needs the shared model's economics.
A healthcare platform with three large hospital customers needs the
siloed model's hard boundary. Most real platforms end up hybrid.

## Enforcing isolation, not just modeling it

Adding a `tenant_id` column to a shared table is the easy part. The
hard part is guaranteeing every single query filters on it — one
missed `WHERE tenant_id = @current_tenant` in one report, one join,
one ad hoc query, and tenant A sees tenant B's rows. That isn't a
modeling problem, it's an enforcement problem, and it has to be
enforced at a layer that can't be forgotten:

```sql
-- Enforcement lives in a security predicate on the table itself,
-- not in application code that has to "remember" to filter
CREATE SECURITY POLICY TenantFilter
ADD FILTER PREDICATE dbo.fn_TenantAccessPredicate(tenant_id)
ON dbo.FactOrders
WITH (STATE = ON);
-- Every query against FactOrders is now filtered automatically,
-- even one someone writes by hand next year
```

The shared model only works if the filter is structurally impossible
to skip. If a platform can't guarantee that, it has quietly chosen
the siloed model's cost without getting its isolation benefit.

## The noisy-neighbor problem

Isolation isn't only about who can *see* what — it's also about who
can *slow down* whom. In the shared model, one tenant running a huge
ad hoc query against `FactOrders` can starve every other tenant on
the same compute. Fabric Lesson 14's capacities and SKUs make this
concrete: a Fabric Capacity is a shared, metered pool of compute
behind every workspace assigned to it. One workspace's runaway KQL
query or overloaded Eventstream can throttle everything else sharing
that capacity — that's the noisy-neighbor problem, not an abstraction.

```
Shared capacity, many workspaces:
  Tenant A's heavy query  --> consumes most of the capacity unit
  Tenant B's dashboard    --> throttled, slow, unrelated to B's own load

Siloed capacity per tenant (Fabric Lesson 2's workspace-per-tenant):
  Tenant A's heavy query  --> only affects Tenant A
  Tenant B's dashboard    --> unaffected, at the cost of its own capacity
```

This is exactly why the siloed model shows up disproportionately for
a platform's largest or most demanding tenants: they're the ones most
likely to cause — or suffer from — noisy-neighbor contention.

## Choosing a model against real requirements

Go back to Lesson 2's functional vs. non-functional split. A
non-functional requirement like "tenant data must be provably
isolated for a compliance audit" forces siloed, full stop — no amount
of clever filtering satisfies an auditor who needs physical
separation. A requirement like "onboard a new tenant in under a
minute, at near-zero marginal cost" forces shared. Most platforms
discover their answer isn't one model but a tiered hybrid, decided
tenant by tenant against the actual requirement, not a house style.

## Key terms

| Term | Meaning |
|---|---|
| Shared tenancy | One schema for all tenants, isolated by a filtered tenant_id |
| Siloed tenancy | One database/workspace per tenant, isolated physically |
| Hybrid tenancy | Most tenants pooled, some tenants siloed, tiered by need |
| Noisy neighbor | One tenant's load degrading another tenant sharing the same compute |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
does adding a `tenant_id` column to a shared table fail to guarantee
isolation on its own, and what has to be true for it to actually work?
