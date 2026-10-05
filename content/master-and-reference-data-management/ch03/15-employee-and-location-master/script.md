# Lesson 15 — Employee and Location Master · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Two internal-facing domains round out the chapter: employee master and
location master — who works here, and where the organization actually
operates.

## S2 · STEPS CARD (employee master)

Employee master looks structurally like customer master, but with
job-specific attributes: title, cost center, manager, hire date. The key
difference is origin — it comes from one system, HR, not dozens of
external touchpoints. That means less deduplication, more distribution:
keeping payroll, IT, and badge access in sync.

## S3 · STEPS CARD (location master)

Location master identifies every physical site that matters: offices,
warehouses, stores, plants. A record holds a location code, address,
geocode, and type-specific attributes. It drives shipping routing, retail
roll-ups by store, and tax jurisdiction calculation — a stale address can
misroute a shipment or miscalculate a tax bill.

## S4 · STEPS CARD (why easier)

Both domains are usually more tractable than customer or vendor master,
because a small number of internal systems generate the data instead of
dozens of external ones. It's not zero effort — reorganizations and site
changes happen constantly — but the fuzzy-matching fight mostly doesn't
apply here.

## S5 · STEPS CARD (how they connect)

These domains show up as attributes inside other domains: a customer's
account manager is an employee ID, a vendor's dock is a location code.
That's why governance treats all of it as one connected system — a
broken reference in one domain propagates into every domain pointing at it.

## S6 · OUTRO CARD

Next lesson: hierarchies and relationships — the structure underneath
every domain in this chapter, made explicit.
