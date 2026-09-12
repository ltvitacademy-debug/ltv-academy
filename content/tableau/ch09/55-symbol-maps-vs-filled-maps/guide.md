# Lesson 55 — Symbol Maps vs. Filled Maps

**Chapter 9 · Maps & Geographic Analysis · Lesson 55 of 95**

## What you'll learn

- The two core Tableau map types and what each is actually good at
- How to switch between them on the Marks card
- Why filled maps can mislead you if you're not careful about what's
  being shaded
- Which one to pick for a given question

## Symbol maps: one mark per location, sized or colored

A **symbol map** places one mark (usually a circle) at each individual
location's coordinates, then encodes a quantitative value using size
and/or color. It's the default Mark type when Tableau first builds a
map from a geographic field.

![A proportional symbol map of the United States, with circles at individual locations sized by a quantitative value — larger circles in the west and a cluster of medium circles in the midwest and northeast.](/courses/tableau/ch09/55-symbol-maps-vs-filled-maps/symbol-map-us.png)
*Circle size (and often color) encodes the measure — bigger circle, bigger value, at that exact point.*
Source: [Tableau Help — Create Maps that Show Quantitative Values](https://help.tableau.com/current/pro/desktop/en-us/maps_howto_symbol.htm)

Symbol maps are the right choice when:

- You care about **individual locations**, not regions (specific
  stores, cities, or coordinates)
- You want to compare **magnitude** at a glance — bigger circle,
  bigger value
- Your geographic field is precise (city, ZIP, or lat/long) rather
  than a large polygon like a state or country

## Filled maps: shading whole regions

A **filled map** (also called a choropleth map) colors in the entire
polygon for each geographic area — state, county, country — based on
a value, instead of placing a mark at a point:

![A filled (choropleth) map of the United States by county, with each county shaded on an orange color scale from light (10.70%) to dark (46.60%) representing a percentage value.](/courses/tableau/ch09/55-symbol-maps-vs-filled-maps/filled-map-county.png)
*Every county gets colored in, not just a point — good for showing a rate or ratio spread across a whole area.*
Source: [Tableau Help — Create Maps that Show Ratio or Aggregated Data](https://help.tableau.com/current/pro/desktop/en-us/maps_howto_choropleth.htm)

Filled maps are the right choice when:

- You're showing a **ratio or rate** (percentage, average, per-capita
  value) rather than a raw count
- The geography itself *is* the unit of analysis — you're comparing
  states, counties, or countries as regions, not individual points
- You want the whole area colored, not just a dot at its center

## Where the two-map choice can mislead you

A filled map showing raw **counts** (not rates) is a classic
visualization trap: a state like Texas or California will always look
"bigger" on a filled map simply because it has more physical land
area, even if the underlying rate is unremarkable. This is exactly why
the filled map example above uses a *percentage*, not a raw count —
filled maps should almost always show a rate, never a raw total,
unless the count itself genuinely correlates with area (it almost
never does).

## Switching between them

Both map types come from the same Marks card dropdown — after
building an initial map, click the Marks card's mark-type dropdown and
choose **Map** (filled) or a shape/circle option (symbol). Which one
Tableau defaults to depends on the granularity of your geographic
field: precise point-level fields (City, ZIP) default to symbol; area
fields with defined boundaries (State, Country) can go either way.

## Key terms

| Term | Meaning |
|---|---|
| Symbol map | One mark per location, sized/colored by a measure |
| Filled (choropleth) map | Entire region polygon shaded by a measure — best for rates, not raw counts |
| Mark type dropdown | The Marks card control used to switch between map, circle, and other mark types |

## Lab

1. In the Sample Superstore workbook, build a symbol map of Sales by
   City.
2. Build a second worksheet: a filled map of Sales by State. Notice
   how the raw dollar total makes large, low-population states look
   deceptively significant.
3. Fix it: change the filled map's measure to `SUM(Sales) /
   COUNTD(Customer Name)` (an average per customer) instead of the
   raw total, and compare how the story changes.

## Check yourself

You're ready for Lesson 56 when you can explain, in one sentence, why
a filled map of raw counts by state is usually misleading — and which
map type you'd pick for "show me sales concentration by individual
store location."
