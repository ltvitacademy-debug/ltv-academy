# Script — Monitoring MongoDB with mongostat & Atlas

## Segment 1 (title)

Chapter Four closes the same way good DBA practice always does: knowing how the server is actually behaving right now. MongoDB gives you mongostat and mongotop for command-line, real-time visibility, and Atlas's built-in dashboards for a managed alternative.

## Segment 2 (code: mongostat)

mongostat polls a running mongod and prints a continuously updating line of real counters — inserts, queries, updates, deletes per second, WiredTiger cache usage, connections, and replication lag. It's genuinely comparable to running top against the database process, the fast way to check if a server is under unusual load during an incident.

## Segment 3 (code: mongotop)

mongotop narrows the question from how busy the server is to which collection is consuming the time, reporting read and write time per collection, continuously refreshed — useful when mongostat shows elevated activity but doesn't say where it's coming from.

## Segment 4 (steps: CLI vs managed)

mongostat and mongotop are real-time, in-the-moment tools. Atlas dashboards cover the same categories but retained historically with alerting. And Atlas's Performance Advisor goes a step further, actively analyzing slow operations and recommending indexes.

## Segment 5 (outro)

Monitoring closes the security and administration chapter. Next up: Chapter Five opens with replica sets — how MongoDB actually achieves high availability and failover.
