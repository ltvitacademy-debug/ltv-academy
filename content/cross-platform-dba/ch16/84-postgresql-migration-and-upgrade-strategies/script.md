# Script — PostgreSQL Migration & Upgrade Strategies

## Segment 1 (title)

This lesson closes out the PostgreSQL section of the course. Every PostgreSQL chapter since chapter twelve has built toward one question: how do you move a running database to a new major version without an unacceptable outage or a leap of faith?

## Segment 2 (code: pg_upgrade)

pg_upgrade is PostgreSQL's built-in in-place upgrade tool. Copy mode, the default, copies data files to the new version's format — safe, and it keeps the old cluster as a fallback, but slower for a large database. Link mode hard-links the data files instead, which is dramatically faster, at the cost of no longer having the old cluster as an independent fallback.

## Segment 3 (steps: choosing a path)

For near-zero downtime, logical replication from Lesson eighty-two is the tool — stand up a new cluster on the new major version as a subscriber, let it catch up while the old cluster keeps serving traffic, then cut over. It's more operationally complex than pg_upgrade, since you're running two clusters side by side. A straightforward pg_dump and pg_restore is also a valid path for a small enough database.

## Segment 4 (outro)

That's the PostgreSQL section of this course, complete. Next up, Chapter seventeen opens with Lesson eighty-five: assessing a cross-platform migration project, where the course pulls Oracle, MySQL, and PostgreSQL together.
