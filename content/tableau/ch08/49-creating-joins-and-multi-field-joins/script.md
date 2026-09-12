# Script — Creating Joins & Joining on Multiple Fields

## Segment 1 (title)

Now that you know what a join is inside Tableau's physical layer, let's actually build one — including joining on more than one field at a time.

## Segment 2 (screenshot: the Join dialog)

This is the real Join dialog. Pick a join type across the top — Inner, Left, Right, Full Outer — then pick your matching field on each side. Here, Book ID matches BookID. If one field pair isn't enough to match rows correctly, click "Add new join clause" and pick a second pair — that's Tableau's version of a composite key join.

## Segment 3 (code: the SQL equivalent)

If you've written this in SQL, you already understand this dialog: ON OrderID equals OrderID, AND WarehouseID equals WarehouseID. Every join clause you add in Tableau is one more AND condition in that same ON clause. A row only matches if every clause is satisfied.

## Segment 4 (outro)

Next lesson covers what happens when a join goes wrong — duplicate records and granularity mismatches that quietly inflate your numbers.
