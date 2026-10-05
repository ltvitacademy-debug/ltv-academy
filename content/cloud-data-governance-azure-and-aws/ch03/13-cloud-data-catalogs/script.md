# Lesson 13 — Cloud Data Catalogs · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE CARD

Cloud Data Catalogs — once storage is locked down, how does anyone actually find
what's in it?

## S2 · SCREENSHOT (open Purview portal)

Azure's catalog is Microsoft Purview, reached through its own governance portal,
linked right from the Purview account's overview page in the Azure portal.

## S3 · SCREENSHOT (sources page)

Every registered source lives on the Sources page, organized into collections — a
hierarchy for scoping permissions and organizing sources by team.

## S4 · SCREENSHOT (select data source)

Registering a source just tells Purview it exists and which collection it belongs
to. No metadata gets extracted yet — that's a separate step.

## S5 · STEPS (register, scan, search)

Register, then scan — scanning is what actually walks the source, extracts schema,
and classifies sensitive columns. Then search makes it all findable, without
granting raw data access.

## S6 · OUTRO CARD

Next up: the AWS Glue Data Catalog — AWS's equivalent, with crawlers standing in
for scans.
