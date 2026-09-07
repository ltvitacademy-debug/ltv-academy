# Lesson 51 — DATESYTD, TOTALYTD & DATESBETWEEN · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

TOTALYTD is shorthand for CALCULATE plus DATESYTD. Here's exactly when
spelling it out the long way pays off.

## S2 · CODE: CALCULATE(SUM(FactInternetSales[SalesAmount]), DATESYTD(DimDate[FullDateAlternateKey]), DimSalesTerritory[SalesTerritoryCountry] <> "United States")

TOTALYTD only takes one extra filter. Need a second condition alongside
year-to-date — like restricting to non-US sales — and DATESYTD spelled
out inside CALCULATE gives you room for as many filters as you need.

## S3 · CODE: DATESBETWEEN(<dates>, <StartDate>, <EndDate>)

And for ranges that don't follow a calendar pattern at all — not a
year, not a month, just two dates you name — DATESBETWEEN is the tool.

## S4 · CODE: Customers LTD = CALCULATE(DISTINCTCOUNT(FactInternetSales[CustomerKey]), DATESBETWEEN(DimDate[FullDateAlternateKey], BLANK(), MAX(DimDate[FullDateAlternateKey])))

A life-to-date measure: BLANK finds the earliest date automatically,
MAX finds the latest date in context. The result never resets — it
just keeps accumulating since day one.

## S5 · OUTRO CARD (SVG: chapter complete, LTV seal)

A date table, CALENDAR to build one, DATEADD to shift dates, and the
YTD family to accumulate them — every function in this chapter is
CALCULATE, applied to dates. Next up: Chapter Seven, Building Reports
and Visualizations.
