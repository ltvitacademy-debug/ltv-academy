# Script — Working With Development Teams

## Segment 1 (title)

Lesson 33 named the shift from gatekeeper to enabler. This lesson gets concrete about what that looks like day to day — where a DBA actually shows up in a development team's workflow, and why understanding query patterns matters as much as understanding the schema.

## Segment 2 (steps: too late vs. early enough)

The traditional handoff is late — a migration script lands on the DBA's desk right before deployment, after weeks of application code already assume the schema. Fixing a real problem then means reopening finished work under deadline pressure. Moving that conversation into sprint planning means feedback arrives before a single line of code gets written.

## Segment 3 (code: half the picture is the query)

A table can look perfectly designed as a CREATE TABLE statement and still be miserable in production, if the application queries it badly — firing one query per order instead of one query for all of them. That's an N+1 pattern, and it's invisible if you only ever look at the schema.

## Segment 4 (steps: schema, plus query pattern)

A DBA who only reads CREATE TABLE statements sees half the picture. The other half is how the application actually reads and writes that data — which columns get filtered on, how often, at what scale. Knowing both is what catches a design that fights its own access pattern before it ships.

## Segment 5 (outro)

Getting into these conversations early, and understanding the real query pattern, is what makes a DBA useful to a dev team instead of a bottleneck for one. Next up: shift-left database practices — catching schema and performance problems in development instead of production.
