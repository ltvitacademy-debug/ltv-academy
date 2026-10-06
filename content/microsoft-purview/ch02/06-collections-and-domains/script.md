# Lesson 6 — Collections and Domains · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Chapter 2 starts here — collections and domains, the organizational skeleton everything else in the Data Map hangs off of.

## S2 · STEPS CARD (domains contain collections)

A domain is the top-level container — one default domain plus up to four custom ones, each scoping its own credentials and scan rule sets. A collection nests inside a domain, organizing sources by business flow. Every source you register belongs to exactly one collection, inside one domain.

## S3 · SCREENSHOT (role assignments tab)

Every domain and collection has a Role assignments tab — here's the Finance collection. Collection admins, Data source admins, Data curators, Data readers, each with its current members listed right there.

## S4 · SCREENSHOT (edit role assignments)

Edit role assignments opens those same four categories. Pick one, search for a user or group, and add them.

## S5 · STEPS CARD (eight roles)

Eight roles total, same pattern everywhere. Data source admin manages sources and can run existing scans. Data reader and data curator split read-only from full asset management. And collection or domain admin manages the structure itself — who else gets access.

## S6 · SCREENSHOT (restrict inheritance)

Permissions flow downhill by default — grant Data reader on a parent, every subcollection inherits it. Restrict inherited permissions turns that off for one collection. One exception: permissions from the default domain itself can't be restricted anywhere beneath it.

## S7 · SCREENSHOT (register source)

And here's where this connects forward — registering a source means picking a domain, then a collection. That's the hinge into next lesson's Data Map.

## S8 · OUTRO CARD

Next lesson: the Purview Data Map itself — capacity units, billing, and what it's actually tracking under the hood.
