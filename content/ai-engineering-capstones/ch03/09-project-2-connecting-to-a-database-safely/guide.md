# Lesson 9 — Connecting to a Database Safely

**Chapter 3 · Project 2 — AI Data Analyst (SQL/APIs) · Lesson 9 of 23**

## What you'll learn

- Why an AI-driven database connection is a bigger attack surface than a
  normal application's
- The one rule that prevents SQL injection: never string-concatenate SQL
- How to create and use a dedicated read-only database role
- Two more defense-in-depth layers worth adding before you ever let an
  LLM near a query

## Why this lesson exists before any LLM code

Lesson 10 is going to have a language model generate SQL. Before that's
safe to run against anything real, the *connection itself* has to be
unable to do damage no matter what text ends up in a query string —
whether that text comes from a careless developer, a confused model, or
a user actively trying to break it. This lesson is entirely about that
connection, with zero LLM code in it. Get this wrong and nothing in
Lessons 10–12 is trustworthy.

## The one rule: never string-concatenate SQL

SQL injection happens when untrusted text is spliced directly into a
query string instead of passed as data. This is true whether the text
comes from a web form or from an LLM's output.

```python
# VULNERABLE -- never do this, with or without an LLM in the loop
name = user_input  # or: name = llm_output
query = f"SELECT * FROM customers WHERE name = '{name}'"
cursor.execute(query)
# input  O'Brien'; DROP TABLE customers; --  breaks this immediately
```

```python
# SAFE -- the driver sends the value as data, never as SQL syntax
query = "SELECT * FROM customers WHERE name = %s"
cursor.execute(query, (name,))
```

The second version works with `psycopg2` (Postgres), `sqlite3` (`?`
instead of `%s`), and every major Python database driver. The database
driver — not string formatting — is what keeps a value from ever being
interpreted as SQL syntax, no matter what characters it contains. This
is the single highest-leverage thing in this entire lesson: if your
code only ever builds queries this way, injection through the query
*text* is closed, even before anything else below.

## A dedicated read-only role

Parameterized queries stop injection through the value. They don't stop
a correctly-parameterized `DELETE` or `UPDATE` statement — and an LLM
asked to "help with the data" can absolutely generate one. The fix is a
database role that can't write, so there's nothing destructive *to* run:

```sql
CREATE ROLE ai_analyst_readonly WITH LOGIN PASSWORD '...';
GRANT CONNECT ON DATABASE sales TO ai_analyst_readonly;
GRANT USAGE ON SCHEMA public TO ai_analyst_readonly;
GRANT SELECT ON orders, customers, products TO ai_analyst_readonly;
-- No INSERT, UPDATE, DELETE, or DDL grants of any kind.
```

Connect your AI data analyst using this role's credentials, never an
admin or application-write account. If the role physically cannot
`DROP TABLE`, a bad query — model-generated or human-written — can
return wrong results, but it can't destroy anything.

## Two more layers worth adding

- **A statement timeout.** A generated query with an unintended cross
  join can scan a huge table and hang the connection. A short timeout
  (a few seconds) turns a runaway query into a fast, visible failure
  instead of a stuck connection.
- **A hard row limit.** Cap results (e.g., `LIMIT 500`, enforced in code
  even if the generated query omits it) so a broad query returns a
  bounded, inspectable result instead of flooding the response.

None of these three layers — parameterization, least-privilege role,
timeout/row-cap — replaces the others. Together they mean an untrusted
or AI-generated query can be wrong, but it can't be dangerous.

## Key terms

| Term | Meaning |
|---|---|
| SQL injection | Untrusted text being interpreted as SQL syntax instead of as a data value |
| Parameterized query | A query where values are passed separately from the SQL text, so the driver never treats them as syntax |
| Least privilege | Granting a role only the access it needs — here, `SELECT` on specific tables and nothing else |
| Statement timeout | A connection-level limit that aborts a query running longer than expected |

## Lab

Stand up (or reuse) your Project 2 database. Create a read-only role
scoped to only the tables your project needs, connect to it from code
using parameterized queries, and set a statement timeout. Confirm the
role's connection fails if you manually try an `INSERT` against it.

## Check yourself

- Why does `cursor.execute(query, (name,))` prevent injection when an
  f-string with the same value does not?
- If your AI analyst's database role can't run `DELETE`, what's the
  worst a maliciously-crafted question could still do?
- Name the three defense-in-depth layers from this lesson and what each
  one specifically protects against.
