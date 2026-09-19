# Script — Point-in-Time Restore

## Segment 1 (title)

Point-in-time restore is what turns Azure's automated backup stream into something you actually use in an incident — pick any moment within the retention window, and Azure reconstructs the database exactly as it existed then.

## Segment 2 (screenshot: restore button on the overview page)

From a database's Overview page, the Restore button opens a dialog where you choose Point in time and pick a timestamp — and restoring always creates a new database alongside the original, it never overwrites anything.

## Segment 3 (screenshot: restoring a deleted database)

Point-in-time restore also covers the less obvious case — someone deleted the entire database. Azure keeps that deleted database's backups for the rest of its retention period, but you restore it from the server's Deleted Databases list, not from the database itself, because there's no database left to right-click.

## Segment 4 (steps: what actually matters in an incident)

Remember three things: restoring creates a new database, not an overwrite. The retention window defaults to 7 days and can go up to 35. And you can't restore to a point before the earliest backup available in that window.

## Segment 5 (outro)

That 7-to-35-day window is the short-term default — for compliance needs well beyond that, long-term retention policies extend it up to 10 years, which is next.
