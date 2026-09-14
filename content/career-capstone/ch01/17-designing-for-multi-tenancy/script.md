# Lesson 17 — Designing for Multi-Tenancy · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Designing for multi-tenancy — three models for how much of the stack
your tenants actually share, and what each one costs you.

## S2 · CODE CARD (three tenancy models)

Shared means one schema for everyone, tagged by tenant_id — cheap,
but the weakest isolation. Siloed means one database or workspace
per tenant — strong isolation, more infrastructure. Hybrid pools most
tenants and siloes the large or regulated ones.

## S3 · CODE CARD (enforcing isolation)

Adding a tenant_id column is the easy part. One missed filter in one
report leaks tenant A's rows to tenant B. Real enforcement lives in a
security predicate on the table itself, so no query can skip it —
not application code that has to remember.

## S4 · CODE CARD (noisy neighbor)

Fabric Capacities make this concrete: one workspace's runaway query
can throttle every other workspace sharing that capacity. That's the
noisy-neighbor problem, and it's exactly why the largest or most
demanding tenants tend to end up siloed.

## S5 · OUTRO CARD

The model isn't a house style — it's decided against the actual
non-functional requirement, tenant by tenant. Next up: designing for
data freshness SLAs.
