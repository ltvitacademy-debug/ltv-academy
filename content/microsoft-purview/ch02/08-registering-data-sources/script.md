# Lesson 8 — Registering Data Sources · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Before Purview can scan anything, it needs to know the source exists. That's what registration does — and it's the very first step in this chapter's workflow.

## S2 · STEPS CARD (before you register)

You'll need the Data Source Admin role, plus another Data Map role like Data Reader, assigned at the collection where the source will live. And that collection choice isn't cosmetic — it's where the source's metadata actually gets organized, from this point forward.

## S3 · SCREENSHOT (select source type)

Registration starts in Data Map, Data sources, Register. Pick a source type from the gallery — Azure Blob Storage, in this example — and continue.

## S4 · SCREENSHOT (map view)

Once you've registered a few sources, Map view shows them as a visual hierarchy — domains at the top, collections branching off, and sources nested under whichever collection owns them.

## S5 · SCREENSHOT (list view)

Table view is the flat alternative — a sortable list that scales better once you've got more than a handful of sources. Hover any row for quick actions: edit, new scan, or delete.

## S6 · STEPS CARD (moving sources)

A source isn't locked to its original collection. Scans move with it automatically. Already-scanned assets stay put until the next scan runs. And three multi-source connection types — Azure Multiple, AWS account Multiple, Synapse Multiple — can't be moved at all.

## S7 · SCREENSHOT (choose to move)

To move one, open the source, find Collection Path, select the ellipsis, and choose Move. Give it up to an hour to fully propagate.

## S8 · OUTRO CARD

Next lesson: scanning sources — turning that registered address into actual metadata in the Data Map.
