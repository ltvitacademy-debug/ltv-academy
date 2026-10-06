# Script — Connecting to a Database Safely

## Segment 1 (title)

Before any LLM generates a single line of SQL, the connection it runs against has to be unable to do damage no matter what text ends up in a query -- whether that text comes from a careless developer, a confused model, or someone actively trying to break it. This lesson is entirely about that connection, with zero LLM code in it.

## Segment 2 (code: vulnerable vs safe)

SQL injection happens when untrusted text is spliced directly into a query string instead of passed as data -- true whether it comes from a web form or an LLM's output. Building a query with an f-string is vulnerable: a crafted input can close the quote and inject its own SQL. The fix is a parameterized query, where the driver sends the value as data and never as syntax. This works the same way across psycopg2, sqlite3, and every major database driver.

## Segment 3 (code: read-only role)

Parameterized queries stop injection through the value, but they don't stop a correctly-parameterized DELETE or UPDATE -- and a model asked to help with the data can generate exactly that. The fix is a dedicated database role granted only SELECT on the specific tables the project needs, with no write or DDL grants at all. Connect your AI data analyst with that role's credentials, never an admin account.

## Segment 4 (steps: two more layers)

Two more layers are worth adding. A statement timeout turns a runaway query -- an unintended cross join scanning a huge table -- into a fast, visible failure instead of a stuck connection. And a hard row limit, enforced in code, caps how much data a broad query can return. None of these layers replaces the others; together they mean a wrong query can't become a dangerous one.

## Segment 5 (outro)

With a safe, read-only, bounded connection in place, Lesson 10 can finally bring in the language model -- turning a plain-English question into the actual SQL that runs through this connection.
