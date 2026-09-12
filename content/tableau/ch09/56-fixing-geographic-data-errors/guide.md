# Lesson 56 — Fixing Geographic Data Errors

**Chapter 9 · Maps & Geographic Analysis · Lesson 56 of 95**

## What you'll learn

- What happens when Tableau can't place a location on a map
- The three built-in options for handling unknown or ambiguous locations
- How to manually correct a location Tableau genuinely can't recognize
- Why ambiguous locations (not just unrecognized ones) are the sneakier
  problem

## When Tableau can't place a location

Real-world location data is messy: typos, abbreviations, city names
that exist in more than one country. When Tableau can't map one or
more values in a geographic field, it flags them:

![Tableau's 'Special Values for [City]' dialog, reporting that 3 values have unknown geographic locations, with three options: Edit Locations, Filter Data, and Show Data at Default Position.](/courses/tableau/ch09/56-fixing-geographic-data-errors/edit-locations.png)
*A red "3 unknown" indicator appears in the bottom corner of the map, and this dialog offers three ways to handle it.*
Source: [Tableau Help — Edit Unknown or Ambiguous Locations](https://help.tableau.com/current/pro/desktop/en-us/maps_editlocation.htm)

Three choices, each appropriate in different situations:

- **Edit Locations** — manually correct the unrecognized values (the right choice when the data is worth keeping)
- **Filter Data** — exclude the special values from the view and calculations entirely (the right choice when the unknowns are genuinely bad data, like test rows)
- **Show Data at Default Position** — plots unknowns at a default point rather than hiding them (rarely the right choice for a real analysis, since it silently misrepresents where that data actually belongs)

## Editing locations manually

Choosing Edit Locations opens a match dialog:

![Tableau's 'Match values to locations' dialog, showing a list of city names — Bamako, Baraki, Barnsley, Beni Mellal, and others — several marked 'Unrecognized' in red, with an option to manually enter latitude and longitude for one.](/courses/tableau/ch09/56-fixing-geographic-data-errors/unrecognized-locations.png)
*For a genuinely unrecognized value, you can type in exact latitude/longitude coordinates yourself.*
Source: [Tableau Help — Edit Unknown or Ambiguous Locations](https://help.tableau.com/current/pro/desktop/en-us/maps_editlocation.htm)

For each unrecognized row, you can either pick the correct match from
Tableau's built-in geocoding database, or — when the location genuinely
isn't in that database — type in the exact latitude and longitude
yourself.

## The sneakier problem: ambiguous, not unknown

An unrecognized location at least announces itself with a red flag. An
**ambiguous** location is worse: Tableau silently picks *a* match, but
possibly the wrong one — "Aberdeen" exists in Scotland, South Dakota,
and Washington State, and if your data doesn't specify which, Tableau
has to guess. The fix is usually adding a second geographic field
(State or Country) to the view, which gives Tableau enough context to
disambiguate correctly instead of guessing.

## Key terms

| Term | Meaning |
|---|---|
| Unrecognized location | A value Tableau's geocoding database has no match for at all |
| Ambiguous location | A value that matches more than one real place, forcing Tableau to guess which one is meant |
| Edit Locations | The dialog for manually correcting or supplying coordinates for problem locations |

## Lab

1. Connect to a dataset with a City field containing at least one misspelled or unrecognized city name, and confirm Tableau flags it.
2. Use Edit Locations to manually enter latitude/longitude for the unrecognized value.
3. Add a State or Country field alongside City in a different view and observe whether it resolves any previously ambiguous matches.

## Check yourself

You're ready for Lesson 57 when you can explain the difference between
an unrecognized location and an ambiguous one, and why adding a second
geographic field is the fix for the ambiguous case specifically.
