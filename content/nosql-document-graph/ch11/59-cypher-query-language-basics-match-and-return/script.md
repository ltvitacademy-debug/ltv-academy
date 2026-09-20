# Script — Cypher Query Language Basics: MATCH & RETURN

## Segment 1 (title)

Every query so far in this course has been eyeballed in Neo4j Browser. Production work means writing Cypher, Neo4j's declarative query language. Its defining idea: a query looks like the pattern it's matching — parentheses for nodes, brackets for relationships, arrows for direction.

## Segment 2 (code: patterns look like the graph)

MATCH (p:Person)-[:WORKS_AT]->(c:Company) RETURN p.name, c.name. A node is parentheses with a label. A relationship is brackets on a dash, with an arrow showing the direction it's stored in. This does the conceptual work of a SELECT, FROM, and JOIN — except there's no join being computed, because the relationship already exists as a stored pointer.

## Segment 3 (code: RETURN projects the results)

RETURN is Cypher's SELECT. You can alias results, deduplicate with DISTINCT, cap size with LIMIT the same way you'd use TOP in T-SQL, or return a whole node object with every property on it — no fixed column list required.

## Segment 4 (steps: why it isn't just SQL with new syntax)

A SQL JOIN is computed at query time and its cost grows with table size. A Cypher traversal follows a physical pointer from one node to another — constant-time, regardless of how big the database is. That's the real payoff, and it's why deep multi-hop patterns stay fast where equivalent SQL joins get expensive.

## Segment 5 (outro)

Next up: filtering, sorting, and aggregating in Cypher — WHERE, ORDER BY, and real aggregation functions like count and collect.
