# Lesson 23 — Purview Integration With Fabric · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

The OneLake catalog is real, and it's scoped to Fabric. Most
organizations running Fabric also run other platforms — and none of
those show up there. That's where Purview comes in.

## S2 · SCREENSHOT CARD (scan setup, same tenant)

This is registering a Fabric tenant as a scanned source in Purview
— a name, whether to include personal workspaces, and a credential.
Same tenant, same organization: Purview's own managed identity is
the simplest choice, no secrets to manage.

## S3 · SCREENSHOT CARD (app registration)

For a cross-tenant setup, or a narrower identity than Purview's own,
the alternative is a dedicated service principal — registered here
in Azure AD, just like any other app.

## S4 · SCREENSHOT CARD (API permissions)

That registered app only gets exactly the API permissions the scan
actually needs, granted and auditable — least privilege, applied to
the account doing the scanning itself.

## S5 · SCREENSHOT CARD (scan trigger)

A one-time scan goes stale the moment someone adds a new lakehouse.
Once for a first pass, Recurring to keep that picture current — the
first scan is always full, every one after is incremental.

## S6 · OUTRO CARD

Fabric's lakehouses, warehouses, and semantic models, sitting in the
same enterprise catalog as everything else. Next lesson: a full case
study, walking every chapter of this course through one scenario.
