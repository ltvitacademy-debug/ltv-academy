# Script — Unity Catalog Architecture, Revisited

## Segment 1 (title)

Databricks & Delta Lake Lesson 38 already covered the object hierarchy in full — metastore, catalog, schema, table. This course assumes you have that picture already. This lesson is what that picture leaves out.

## Segment 2 (screenshot: the hierarchy, recapped)

One governance layer, shared across every workspace attached to it. That's the whole picture at the level Lesson 38 needed it — this chapter goes further.

## Segment 3 (code: catalog bindings)

A metastore can attach to many workspaces, but a catalog inside it can be bound to just a subset of them. A finance catalog might be readable only from the two workspaces Finance actually uses, even though ten other workspaces share the same metastore.

## Segment 4 (code: one metastore per region)

A new team's instinct is often "we need our own metastore." In practice, Databricks recommends one metastore per region for the whole organization, with isolation handled by catalog bindings instead — splitting metastores per team recreates exactly the silos Unity Catalog was built to eliminate.

## Segment 5 (outro)

Same hierarchy, a level deeper: bindings, not separate metastores. Next up: catalogs, schemas, and the one object Lesson 38 didn't cover at all — external locations.
