# Script — Unions & Combining Data Vertically

## Segment 1 (title)

Every join or relationship so far combines tables horizontally, matching rows on a key. A union does the opposite — it stacks tables vertically. This is Tableau's version of SQL's UNION ALL.

## Segment 2 (screenshot: manual union)

Here's the real manual Union dialog. May2016, June2016, and July2016 — three tables with the same columns — get stacked into one continuous table. Every row from every table is kept, duplicates included, exactly like UNION ALL.

## Segment 3 (screenshot: wildcard union)

Manually adding a table every month gets old fast. The Wildcard tab fixes that: give Tableau a naming pattern like asterisk-2016, and it automatically includes every table that matches — including ones added after you build this, the next time you refresh.

## Segment 4 (outro)

Next lesson covers data blending — what you do when two data sources can't be joined or related at all, because they don't share a real connection.
