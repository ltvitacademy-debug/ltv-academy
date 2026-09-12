# Lesson 54 — Geographic Roles & Creating Maps

**Chapter 9 · Maps & Geographic Analysis · Lesson 54 of 95**

## What you'll learn

- What a **geographic role** is, and how Tableau recognizes location
  data automatically (and when it doesn't)
- How to assign or fix a geographic role manually
- The exact steps to build your first map from a geographic field
- What Latitude/Longitude "generated" fields are, and where they come
  from

## Geographic roles: how Tableau knows a field is a place

Tableau ships with a built-in geocoding database. When you connect to
data, any field named (or recognized as) something like Country,
State, City, or ZIP Code automatically gets a **geographic role** —
Tableau tags it as a real-world location and silently generates
matching Latitude and Longitude fields you'll see appear in the Data
pane, ready to plot.

If Tableau doesn't recognize a field automatically — a column named
`Cust_Region` instead of `Region`, for example — you assign the role
yourself:

![Right-click menu on a field in the Data pane, with Geographic Role expanded showing options: None, Airport, Area Code (U.S.), CBSA/MSA (U.S.), City, Congressional District (U.S.), Country/Region (currently selected), County, NUTS Europe, State/Province, ZIP Code/Postcode.](/courses/tableau/ch09/54-geographic-roles-and-creating-maps/geographic-role-menu.png)
*Right-click any field > Geographic Role > pick the matching role.*
Source: [Tableau Help — Format Geographic Fields in Tableau](https://help.tableau.com/current/pro/desktop/en-us/maps_geographicroles.htm)

## Building a map, step by step

1. Assign a geographic role to your location field (or confirm
   Tableau already did it automatically — a small globe icon appears
   next to the field in the Data pane).
2. Double-click the field, or drag it onto the canvas. Tableau
   automatically populates Longitude on Columns and Latitude on Rows,
   and switches the view to a map.
3. Drag a measure (like Sales) onto Color or Size on the Marks card to
   encode a value onto the map.
4. Optionally drag a more granular geographic field (like State) onto
   Detail to break the map down further.

![The full Tableau Desktop workspace building a symbol map: the Marks card holding SUM(Sales), Country/Region, and State; the Background Layers panel on the left showing map layer options; and the resulting map of the United States with proportional circles sized by sales.](/courses/tableau/ch09/54-geographic-roles-and-creating-maps/symbol-map-workspace.png)
*Country/Region and State together generate the Latitude/Longitude Tableau needs to place each mark.*
Source: [Tableau Help — Build a Simple Map](https://help.tableau.com/current/pro/desktop/en-us/maps_howto_simple.htm)

## Where do Latitude and Longitude come from?

Once a field has a geographic role, Tableau automatically creates
**generated** Latitude and Longitude measures (you'll see them near
the bottom of the Measures list, in italics, labeled "(generated)").
These aren't your data — they're Tableau's own geocoding lookup,
matching your text values (like "Texas") against its internal
database of coordinates. This is exactly why Lesson 56 exists: when a
value in your data doesn't match anything in that internal database
(a typo, an abbreviation Tableau doesn't recognize), the generated
Latitude/Longitude comes back empty, and the point can't be plotted.

## Key terms

| Term | Meaning |
|---|---|
| Geographic role | A tag on a field telling Tableau it represents a real-world location, enabling automatic geocoding |
| Generated Latitude/Longitude | Coordinate fields Tableau automatically creates from a geographic role, via its internal geocoding database |
| Background Layers panel | Controls what map details (coastlines, borders, labels) render underneath your data |

## Lab

1. In the Sample Superstore workbook, confirm the State field already
   has a geographic role (look for the globe icon in the Data pane).
2. Build a map using State, with SUM(Sales) on Color.
3. Try manually changing State's geographic role to something
   mismatched (like City) and observe what happens to the map — this
   previews the kind of geocoding error Lesson 56 fixes properly.

## Check yourself

You're ready for Lesson 55 when you can build a map from a geographic
field from scratch, and explain in one sentence where the Latitude and
Longitude values on that map actually came from.
