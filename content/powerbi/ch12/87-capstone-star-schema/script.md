# Lesson 87 — Build the Star Schema · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Two fact tables, sharing dimensions — still a star schema, just with
a bigger diagram.

## S2 · STEPS: DimSalesTerritory -> DimProduct family -> DimCustomer/DimReseller -> DimDate -> two fact tables

Every dimension connects to both fact tables where it applies. Build
these one-to-many, dimension on the one side, exactly like Chapter
Four taught.

## S3 · CODE: OrderDateKey (active) | DueDateKey, ShipDateKey (inactive)

FactInternetSales has three date roles, but only one relationship can
be active. This is the exact scenario Chapter Six used to teach
USERELATIONSHIP — and Lesson 88 puts it to work.

## S4 · CODE: DimDate -> surrogate key relationship -> Mark as date table required

Since the relationship runs through a whole-number key, not the date
column itself, DimDate has to be explicitly marked — auto date-time
won't cover this on its own.

## S5 · OUTRO CARD

Model built, relationships correct. Lesson 88 writes the DAX measures
that actually answer Lesson 84's four requirements.
