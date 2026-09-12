# Script — Fixing Geographic Data Errors

## Segment 1 (title)

Real-world location data is messy. This lesson covers what to do when Tableau can't place one of your locations on a map.

## Segment 2 (screenshot: special values dialog)

When Tableau can't map a value, it flags it and offers three choices: Edit Locations to correct it, Filter Data to exclude it, or Show Data at Default Position — which is rarely the right choice, since it silently misrepresents where that data actually belongs.

## Segment 3 (screenshot: match values dialog)

Choosing Edit Locations opens a match dialog. For a genuinely unrecognized value, you can type in exact latitude and longitude coordinates yourself.

## Segment 4 (steps: unrecognized vs ambiguous)

An unrecognized location at least raises a red flag. An ambiguous one is sneakier — Tableau silently picks a match, but possibly the wrong one, since a name like Aberdeen exists in more than one place. The fix is adding a second geographic field, like State or Country, so Tableau has enough context to disambiguate correctly.

## Segment 5 (outro)

Next lesson: geographic hierarchies, groups, and building custom territories on top of real geography.
