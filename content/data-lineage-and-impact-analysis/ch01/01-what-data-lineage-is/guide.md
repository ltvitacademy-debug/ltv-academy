# Lesson 1 — What Data Lineage Is

**Chapter 1 · Lineage Concepts · Lesson 1 of 25**

## What you'll learn

- The definition of data lineage — the recorded path data takes from where it originates to everywhere it ends up, through every transformation along the way
- The package-tracking analogy that makes the idea concrete
- Three everyday examples of lineage-like tracing you already use without calling it that
- How this course builds directly on the Metadata Management & Business Glossary course that came before it

## The definition, and the sharper version

**Data lineage is the recorded path data takes from its origin, through every transformation, to every place it's used.** A plain definition like "tracking where data comes from" is accurate but incomplete — it misses the "every transformation" part, which is where most real problems actually hide.

Here's the sharper version: **lineage lets you answer, step by step, exactly how a number got to be the number you're looking at — and exactly what else would be affected if any step in that chain changed.** A revenue figure on an executive dashboard didn't appear from nowhere. It was extracted from a source system, moved through one or more transformation steps, loaded into a warehouse, modeled, and rendered. Lineage is the map of that entire journey, recorded well enough that someone other than the original builder can retrace it.

## The package-tracking analogy

A shipped package gets scanned at every stage of its trip: picked up at the warehouse, scanned at a sorting facility, scanned onto a truck, scanned again at delivery. The tracking page you check isn't the package — it's the *recorded path* the package took, hop by hop.

Data lineage does the exact same job for a number on a report. An order gets placed in a source system → a nightly job extracts it → a transformation step in staging cleans and reshapes it → it's loaded into a warehouse table → it's aggregated into a semantic model → it's displayed on a dashboard. Each of those arrows is a **hop** — the lineage equivalent of a package scan. If a number looks wrong, you don't guess; you walk the hops backward until you find where it diverged from what it should be.

## Three everyday examples of lineage thinking

- **A bank wire transfer's trail** — "sent from Account X, cleared through intermediary Bank Y, deposited to Account Z" is a lineage record for money, letting anyone retrace exactly how funds moved between the origin and the destination
- **A document's version history** — "Track Changes" in Word or the revision history in Google Docs records who changed a paragraph, when, and what it looked like before — lineage for a piece of text instead of a piece of data
- **A food product's sourcing label** — "grown in Region A, processed at Facility B, packaged at Facility C" is farm-to-table lineage, letting a buyer retrace a product back through every stage it passed through

## Why this course builds on the one before it

Metadata Management & Business Glossary gave you the vocabulary and the inventory: what a column is called, what it means, who owns it, and where it lives in the catalog. Lineage is the next layer on top of that same foundation — it's the record of *movement*, not just identity. You can't usefully trace where a column's value came from unless you can already name and locate that column, which is exactly what the data dictionary and catalog entries from the prior course give you. Over this course's 5 chapters, you'll go from these core concepts, to actually tracing data through real system types, to using lineage for impact analysis, to documenting it, and finally to applying all of it in realistic scenarios.

## Key terms

| Term | Meaning |
|---|---|
| Data lineage | The recorded path data takes from its origin, through every transformation, to where it's used |
| Hop | One recorded step in that path — an extraction, a transformation, or a load |
| Source system | The system where a piece of data originates, before any lineage hop has happened to it |

## Lab

Pick one report, spreadsheet, or dashboard number you look at regularly (work or personal — even a bank balance or a fitness app total). Without opening any system, write down every hop you *believe* that number passes through, from where it's first entered to where you see it. Then ask: could you actually prove each of those hops, or are some of them guesses? That gap between "what I assume" and "what I could prove" is exactly what formal lineage closes.

## Check yourself

Can you state the package-tracking analogy in your own words, and name three hops a single number on a report you use might pass through before you ever see it?
