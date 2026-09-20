# Script — Neo4j Browser & Neo4j Desktop

## Segment 1 (title)

With an instance running, this lesson covers the two tools you'll actually use day to day: Neo4j Browser, the web-based query and visualization interface, and Neo4j Desktop, the local app that manages instances and opens Browser against them.

## Segment 2 (code: Neo4j Browser)

Browser is served over HTTP right from the running instance. Type Cypher into the query bar, and results render three ways — graph, table, or raw text — defaulting to an interactive graph visualization, genuinely useful for spotting an unexpectedly connected or isolated node. Special colon-commands like schema and play give you the database's structure at a glance or built-in interactive learning guides.

## Segment 3 (steps: Neo4j Desktop)

Desktop is the layer above Browser — for managing instances, not querying them. Projects group related database instances together, each local DBMS can be started or stopped independently with its own version, and plugins like APOC and the Graph Data Science library install with one click instead of a manual file copy.

## Segment 4 (outro)

The realistic loop: open Desktop, start the DBMS, launch Browser against it, check the schema, then start running Cypher. Next up: actually getting real data into Neo4j with LOAD CSV and the bulk import tool.
