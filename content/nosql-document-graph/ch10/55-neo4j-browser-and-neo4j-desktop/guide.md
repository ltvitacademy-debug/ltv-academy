# Neo4j Browser & Neo4j Desktop

With an instance running from the previous lesson, this lesson covers the two tools used
to actually work with it day to day: **Neo4j Browser**, the web-based query and
visualization interface, and **Neo4j Desktop**, the local application that manages
instances and opens Browser against them. Together they're the closest Neo4j equivalent to
SQL Server Management Studio — one tool for running queries and seeing results, one for
managing the instances themselves.

## What you'll learn

- What Neo4j Browser is, and how it renders query results as an actual graph
- What Neo4j Desktop manages that Browser doesn't
- The built-in commands and guides that make both tools useful for learning, not just
  production querying

## Neo4j Browser: query and visualize

Neo4j Browser is a **web-based** tool, served over HTTP by the running Neo4j instance
itself (reachable at `http://localhost:7474` for a local install, or launched directly from
Neo4j Desktop or an Aura instance's console). It has three core pieces:

- **The query bar** at the top, where Cypher statements are typed and run
- **The results pane**, which can render results three ways: as a **graph visualization**
  (nodes and relationships as an actual interactive diagram — click a node to expand its
  connections), as a **table**, or as **raw text/JSON**. Query results default to the
  graph view, which is genuinely useful for visually spotting an unexpectedly connected or
  isolated node, something a table of foreign key values could never show as directly.
- **The command bar's special commands**, prefixed with `:`, such as `:schema` to see the
  database's labels, relationship types, and indexes at a glance, or `:play` to open
  Neo4j's built-in interactive guides for learning Cypher.

Browser also keeps a scrollable history of every query run in the session, and lets you
pin favorite queries for reuse — a lightweight version of saved queries in SSMS.

## Neo4j Desktop: managing instances

Where Browser is for *querying* a running database, Neo4j Desktop is for *managing* the
instances themselves — the layer above Browser, not a replacement for it:

- **Projects** group related database instances together (for example, separate projects
  per course chapter or per application)
- Inside a project, each **local DBMS** can be started, stopped, or removed independently,
  with its own Neo4j version and plugins
- **Plugins** like APOC (a widely used utility procedure library) and the **Graph Data
  Science library** (covered later in this course) install from inside Desktop with one
  click, rather than a manual file copy
- Desktop opens Neo4j Browser against the currently selected, running DBMS with a single
  click — the two tools are meant to be used together, not as alternatives

## Working with both together

A realistic session: open Neo4j Desktop, start the local DBMS for this course's lab
project, click to open Neo4j Browser against it, run `:schema` to confirm what's already in
the database, then start writing and running Cypher queries in the query bar, watching
results render as an interactive graph. This is the loop the rest of this chapter's labs
will use.

## Key terms

| Term | Meaning |
|---|---|
| Neo4j Browser | Web-based tool for running Cypher queries and viewing results as a graph, table, or raw text |
| Graph visualization | Browser's default result view — an interactive diagram of the actual nodes and relationships returned |
| Neo4j Desktop | Local application for managing projects, database instances, and plugins |
| APOC | A widely used plugin library of utility procedures, installable from Neo4j Desktop |

## Check yourself

What's the difference in purpose between Neo4j Browser and Neo4j Desktop — why would you
need both rather than just one?
