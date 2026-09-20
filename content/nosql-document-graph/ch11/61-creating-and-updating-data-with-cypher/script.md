# Script — Creating & Updating Data with Cypher

## Segment 1 (title)

MATCH and RETURN only read the graph. Real work also means writing to it — creating nodes and relationships, updating properties, and removing data cleanly. This lesson covers CREATE, MERGE, SET, and DELETE.

## Segment 2 (code: CREATE)

CREATE always inserts a new node or relationship, with no check for whether an equivalent one already exists — it's the closest analog to a plain T-SQL INSERT. Run that statement twice and you get two separate Marcus Lee nodes.

## Segment 3 (code: MERGE)

MERGE is Cypher's create-if-not-exists clause. It searches for the given pattern; if found, it behaves like MATCH, if not, it behaves like CREATE. Run it twice and you get exactly one node both times. ON CREATE SET and ON MATCH SET let you run different updates depending on which branch fired.

## Segment 4 (steps: SET, DELETE, DETACH DELETE)

SET updates properties on an already-matched node, or adds a label. DELETE removes a matched node or relationship, but Neo4j refuses to delete a node that still has relationships attached. DETACH DELETE removes the node and every relationship connected to it in one step.

## Segment 5 (outro)

Next up: pattern matching and variable-length paths — the part of Cypher where multi-hop traversal shows graph databases' real strength most clearly against relational joins.
