# Lesson 88 — Create DAX Measures · Voiceover script

Segments map 1:1 to slides. Target: ~3.5 minutes total.

---

## S1 · TITLE CARD

Four requirements from Lesson 84. Four measures, each answering one
of them directly — no extras.

## S2 · CODE: Total Sales -> Sales vs. Target %

Regional performance, answered directly: total sales against target,
by territory.

## S3 · CODE: Gross Margin % = DIVIDE(Gross Margin, Total Sales)

Profitability means margin percent, not just margin dollars — the VP
asked about margin specifically, and a percentage is what actually
answers that.

## S4 · CODE: USERELATIONSHIP(ShipDateKey, DateKey) -> fulfillment rate

Reseller fulfillment needs the ship-date relationship Lesson 87 left
inactive. USERELATIONSHIP activates it just for this one measure.

## S5 · CODE: VAR CurrentSales, VAR PriorYearSales -> RETURN

Trend over time, using variables first and a single RETURN — the
exact readability pattern Chapter Five taught.

## S6 · OUTRO CARD

Every measure traces back to a requirement — no extras, nothing
speculative. Lesson 89 finally builds the report pages these measures
belong on.
