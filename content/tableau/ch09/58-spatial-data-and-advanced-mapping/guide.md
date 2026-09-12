# Lesson 58 — Spatial Data & Advanced Mapping

**Chapter 9 · Maps & Geographic Analysis · Lesson 58 of 95**

## What you'll learn

- What a spatial file actually is, and how it's different from a
  regular table with a City or State column
- How to connect Tableau directly to a shapefile
- How Tableau builds a map straight from a Geometry field, with no
  geocoding step required
- How a spatial join works, and why it's genuinely different from a
  normal key-based join

## Beyond geocoded fields: real spatial files

Every map so far in this chapter relied on Tableau *geocoding* a field
— matching a City or State name to a known location. A **spatial
file** works completely differently: it stores the actual shape
(point, line, or polygon) as data, not just a name to look up.
Shapefiles (`.shp`), GeoJSON, KML, and Esri File Geodatabases are the
common formats.

## Connecting to a spatial file

Connect to one directly from Tableau's start screen, the same way you'd
connect to Excel or SQL Server:

![Tableau's Data Source page connected to a shapefile named TERRESTRIAL_MAMMALS.shp, showing real spatial columns including Binomial, Family Nam, Origin, Year, and a Geometry column containing POLYGON and MULTIPOLYGON values.](/courses/tableau/ch09/58-spatial-data-and-advanced-mapping/spatial-map.png)
*A genuine `Geometry` column — the actual shape data, not a name Tableau has to look up.*
Source: [Tableau Help — Spatial File](https://help.tableau.com/current/pro/desktop/en-us/examples_spatial_files.htm)

Once connected, dragging that `Geometry` field onto the view builds a
map directly from the real shapes in the file:

![A filled polygon map of African countries, built directly from a connected spatial file's Geometry field and filtered by a species field, with no geocoding step involved.](/courses/tableau/ch09/58-spatial-data-and-advanced-mapping/spatial-connect.png)
*No City or State name was geocoded here — the polygon boundaries came straight from the file's own geometry data.*
Source: [Tableau Help — Create Tableau Maps from Spatial Files](https://help.tableau.com/current/pro/desktop/en-us/maps_shapefiles.htm)

This is exactly why spatial files matter for cases geocoding can't
handle: custom regions with no official name (a sales territory
someone drew by hand and saved as a shapefile), precise scientific or
environmental boundaries (a species' habitat range, a flood zone), or
any shape that simply isn't "a city" or "a state."

## Spatial joins: joining on location, not on a key

A normal join matches rows where a key column is equal — `CustomerID
= CustomerID`. A **spatial join** matches rows based on their actual
geometry relationship instead:

![Tableau's spatial join dialog joining Waterfowl_sites.shp and Japan_Basins.shp, using an 'Intersects' geometry join clause between the two files' Geometry columns instead of a normal equality join.](/courses/tableau/ch09/58-spatial-data-and-advanced-mapping/spatial-join-dialog.png)
*Instead of matching equal key values, this join matches rows whose shapes physically intersect.*
Source: [Tableau Help — Join Spatial Files in Tableau](https://help.tableau.com/current/pro/desktop/en-us/maps_spatial_join.htm)

"Intersects" here means: for every waterfowl site point, find which
river basin polygon it physically falls inside — a question a normal
key-based join has no way to answer, because there's no shared ID
between "a specific GPS point" and "a river basin," only a spatial
relationship.

## Key terms

| Term | Meaning |
|---|---|
| Spatial file | A file (shapefile, GeoJSON, KML, Esri geodatabase) storing actual shape data, not just names to geocode |
| Geometry field | The column holding the real point/line/polygon shape data in a spatial file |
| Spatial join | A join matching rows by their physical geometric relationship (like Intersects) instead of a shared key |

## Lab

1. Find a real, small shapefile or GeoJSON file (many government open-data portals publish these) and connect Tableau to it directly.
2. Drag its Geometry field onto a view and confirm a map renders with no geocoding involved.
3. Read through the spatial join example above and explain, in your own words, why "Intersects" can't be replaced with a normal equality join.

## Check yourself

You're ready for Chapter 10 when you can explain, in one sentence, why
a spatial file doesn't need geocoding the way a City column does, and
what "Intersects" means in a spatial join.
