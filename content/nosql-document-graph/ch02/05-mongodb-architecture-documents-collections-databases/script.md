# Script — MongoDB Architecture: Documents, Collections & Databases

## Segment 1 (title)

Chapter 2 puts Chapter 1's theory into practice, starting with MongoDB's actual storage hierarchy. It will look familiar to a relational DBA at first glance — and that's exactly where the real differences matter most.

## Segment 2 (steps: the hierarchy)

MongoDB organizes data in three levels. A database is the top-level container on a mongod server. A collection groups related documents inside it — roughly like a table. A document is a single BSON record inside a collection — roughly like a row. That mapping is a useful starting orientation.

## Segment 3 (code: a collection is not a table)

A relational table enforces one schema for every row. A MongoDB collection, by default, doesn't. Two documents in the same collection can have completely different fields, and MongoDB accepts both. This isn't a missing feature — it's a deliberate architectural choice that lets stored data evolve alongside application code.

## Segment 4 (code: schema-less by default, not schema-free)

"Schema-less by default" is the accurate phrase — the default part matters. MongoDB supports schema validation: rules you attach to a collection to reject documents that don't match a defined structure. Most production MongoDB applications add validation once their document shape stabilizes.

## Segment 5 (outro)

Data integrity becomes more of an application and validation-rule responsibility, less of a pure engine guarantee, by default. Next up: actually installing MongoDB and MongoDB Compass so you can see this hierarchy for yourself.
