# Lesson 85 — Import the Raw Data · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

The build starts here — connecting to the exact tables Lesson 84's
scope actually needs, nothing more.

## S2 · STEPS: FactInternetSales -> FactResellerSales -> DimSalesTerritory -> DimProduct family -> DimDate -> DimCustomer -> DimReseller

Nine tables, selected deliberately from the Navigator. Every one
traces back to a requirement from Lesson 84 — resist importing the
whole database "just in case."

## S3 · CODE: Import mode — chosen for a reason

Import mode wins here for a specific reason: this project doesn't
need real-time data, and Import gives the fastest experience while
actively building visuals in the lessons ahead.

## S4 · CODE: Import a few extra columns now -> trim them later in Power Query

One asymmetry worth knowing: cutting an unused column later is cheap.
Discovering you never imported a needed one is not. When in doubt,
bring it in.

## S5 · OUTRO CARD

Tables loaded, row counts checked. Lesson 86 is where the real
cleanup work begins, in Power Query.
