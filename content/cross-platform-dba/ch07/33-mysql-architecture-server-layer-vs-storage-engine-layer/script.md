# Script — MySQL Architecture: Server Layer vs. Storage Engine Layer

## Segment 1 (title)

SQL Server, Oracle, and PostgreSQL each have exactly one storage engine baked into the product. MySQL splits into two layers, and the bottom layer is genuinely swappable per table — that's a real architectural difference, not a naming quirk.

## Segment 2 (code: choosing an engine per table)

Engine choice is a CREATE TABLE clause. This orders table is created as InnoDB, SHOW ENGINES lists every engine compiled into the server, and ALTER TABLE can even change a table's engine, like moving an old audit log to the compact Archive engine.

## Segment 3 (steps: where a query goes)

A query's path runs through the server layer first: the connection handler authenticates and assigns a thread, the parser builds a parse tree, and the optimizer picks a join order and access path — all before touching a single storage engine.

## Segment 4 (code: a real architectural difference)

That plan then hits the storage engine API, which any engine can implement differently. InnoDB gives you row-level locking and full transactions; MyISAM doesn't. SQL Server, Oracle, and PostgreSQL simply don't have this per-table choice to make.

## Segment 5 (outro)

Next up, Lesson 34 digs into the two storage engines you'll actually encounter in practice: InnoDB and MyISAM, and why InnoDB is the correct default almost every time today.
