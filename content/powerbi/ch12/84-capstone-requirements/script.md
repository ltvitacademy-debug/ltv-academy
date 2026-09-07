# Lesson 84 — Business Requirements · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Nine lessons, one project. It starts here, with no Power BI screen at
all — just a vague ask that needs to become something buildable.

## S2 · CODE: "Something that shows how we're doing" -> four real requirements

The VP of Sales at Adventure Works Cycles wants "something that shows
how we're doing." Applying Chapter Eight's audience-first thinking
turns that into four specific requirements: regional performance,
product profitability, reseller fulfillment, and trend over time.

## S3 · STEPS: FactInternetSales -> FactResellerSales -> DimSalesTerritory -> DimProduct -> DimDate

Every one of those requirements maps to real AdventureWorksDW2014
tables — this is the exact list Lesson 85 imports next.

## S4 · CODE: In scope: USD, AdventureWorksDW2014, desktop | Out of scope: currency, other sources, mobile

Scope means saying what's out just as clearly as what's in. This
project stays USD-only, AdventureWorksDW2014-only, and desktop-only —
on purpose.

## S5 · OUTRO CARD

A written scope is what you'll check the finished dashboard against
in Lesson 93. Lesson 85 starts the actual build: importing the raw
data.
