# Lesson 57 — Geographic Hierarchies, Groups & Custom Territories

**Chapter 9 · Maps & Geographic Analysis · Lesson 57 of 95**

## What you'll learn

- The built-in geographic hierarchy Tableau creates automatically
- How to assign or change a field's Geographic Role manually
- Why a business's real sales territories almost never match any
  official geographic boundary
- How to build a custom territory by grouping existing regions

## The built-in hierarchy

When Tableau recognizes a field as geographic, it doesn't just geocode
that one field — it builds a natural drill-down hierarchy:

![Tableau's Data pane showing a geographic hierarchy — Country/Region, Region, State/Province, City, Postal Code, nested with drill-down icons — and the right-click Geographic Role submenu listing Airport, Area Code, CBSA/MSA, City, Congressional District, Country/Region, County, NUTS Europe, State/Province, and ZIP Code/Postcode.](/courses/tableau/ch09/57-geographic-hierarchies-groups-custom-territories/geo-roles.png)
*Country down to Postal Code, already nested — click the + to drill from a whole country down to individual cities.*
Source: [Tableau Help — Format Geographic Fields in Tableau](https://help.tableau.com/current/pro/desktop/en-us/maps_geographicroles.htm)

This hierarchy is what makes double-clicking into a filled map of the
US drill down into states, then counties, without you building
anything — Tableau already knows State sits inside Country, and County
sits inside State.

## Assigning a Geographic Role manually

Sometimes a field that *is* geographic doesn't get auto-detected — a
column named `Territory` or `Branch_Code` won't be recognized
automatically even if its values are really city names. Right-click
the field, go to **Geographic Role**, and assign one manually from the
same menu shown above.

## When real territories don't match any official boundary

Here's the problem hierarchies and roles alone can't solve: a
company's actual sales territories are business decisions, not
geographic facts. "Northeast Region" at one company might be six
specific states; at another, it might be those six states minus
upstate New York, which reports to a different region entirely. No
built-in geographic role captures a boundary like that, because it
doesn't correspond to any real administrative boundary — it's a
grouping a sales VP drew on a whiteboard once.

## Building a custom territory

The fix is a **Group**: select the individual regions that make up
your real territory (holding Ctrl/Cmd to multi-select on the map or in
the Data pane), right-click, and choose **Group**. Give the group a
name — "Northeast (Sales)" — and it behaves as a new dimension value
you can filter, color, and aggregate by, sitting on top of the real
underlying geography:

![A filled map of Australia shaded by region, with custom territory boundaries drawn over the smaller underlying administrative areas, grouping them into larger, business-defined territories.](/courses/tableau/ch09/57-geographic-hierarchies-groups-custom-territories/custom-territories.png)
*The underlying map still knows the real, small regions — the group just adds a business-defined layer on top.*
Source: [Tableau Help — Create Territories on a Map](https://help.tableau.com/current/pro/desktop/en-us/maps_custom_territories.htm)

## Key terms

| Term | Meaning |
|---|---|
| Geographic hierarchy | Tableau's built-in nested drill-down (Country > State > City, etc.) for recognized geographic fields |
| Geographic Role | The manual assignment that tells Tableau a field represents a specific kind of location |
| Custom territory | A Group of underlying regions combined into a business-defined boundary that doesn't match any official geography |

## Lab

1. In Sample Superstore, drill down from `Country/Region` to `State` to `City` on a filled map using the built-in hierarchy.
2. Select 3-4 states that make up a hypothetical custom sales territory, group them, and name the group.
3. Rebuild the map colored by your new custom territory group instead of by State, and compare the two views.

## Check yourself

You're ready for Lesson 58 when you can explain why a company's real
sales territories usually require a manually built Group rather than
relying on Tableau's built-in geographic hierarchy alone.
