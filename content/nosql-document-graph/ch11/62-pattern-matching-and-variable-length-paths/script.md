# Script — Pattern Matching & Variable-Length Paths

## Segment 1 (title)

Every Cypher query so far has matched a fixed, known-depth pattern. Real graph problems often ask "find everyone reachable within three hops" instead. Cypher answers that with variable-length path syntax — the clearest place graph databases show their real advantage over relational joins.

## Segment 2 (code: variable-length syntax)

Adding a star and a min-to-max range inside the brackets tells Cypher to match a chain of that relationship type, anywhere from the minimum to the maximum hops long. You can bound both ends, bound just one end, or leave it fully unbounded — though an unbounded path deserves real caution on a densely connected graph.

## Segment 3 (code: multi-hop example)

This query finds every person reachable from Dana by following REPORTS_TO one, two, or three hops — her manager, her manager's manager, and so on — all in a single query, with each chain length returned as its own row.

## Segment 4 (steps: why graphs win)

In SQL Server, this kind of query means nested self-joins or a recursive CTE, and its cost still grows with the width of the table. In Neo4j, a relationship is a stored pointer — traversing it hop by hop costs what the actual matching paths cost, not what the whole table costs.

## Segment 5 (outro)

Next up: subqueries and advanced Cypher patterns — CALL subqueries, the WITH clause for chaining query parts, and OPTIONAL MATCH, Cypher's answer to a LEFT JOIN.
