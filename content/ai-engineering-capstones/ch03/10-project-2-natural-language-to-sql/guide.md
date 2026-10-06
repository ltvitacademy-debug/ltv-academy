# Lesson 10 — Natural-Language-to-SQL Patterns

**Chapter 3 · Project 2 — AI Data Analyst (SQL/APIs) · Lesson 10 of 23**

## What you'll learn

- The real pattern for turning a plain-English question into SQL, using
  Claude's actual tool-calling format
- Why the query is requested through a tool call, not parsed out of free
  text
- The validation step that has to run *before* a generated query ever
  reaches the safe connection from Lesson 9
- What a schema-aware system prompt needs to contain to get reliable
  queries

## Ask for a tool call, not a text blob

It's tempting to just prompt "write me a SQL query for this question"
and regex the SQL out of Claude's reply. Don't. The Messages API's tool
use feature exists for exactly this: you define a tool whose input is
the SQL string, Claude's response comes back as a structured `tool_use`
block (not prose you have to parse), and your code is the thing that
actually decides whether to run it.

```json
{
  "name": "run_sql_query",
  "description": "Runs a single, read-only SELECT query against the sales database to answer the user's question. Only use this for questions answerable from the orders, customers, and products tables. Never use for anything other than SELECT -- this connection has no write access.",
  "input_schema": {
    "type": "object",
    "properties": {
      "sql": {"type": "string", "description": "A single SELECT statement, no semicolon-chained statements."}
    },
    "required": ["sql"]
  }
}
```

This is the exact tool-definition shape from the Messages API: `name`,
`description`, `input_schema` as JSON Schema. Send it in the `tools`
array of a request alongside a system prompt describing your actual
schema:

```text
You answer questions about the sales database using the run_sql_query
tool. Tables: orders(id, customer_id, product_id, qty, ordered_at),
customers(id, name, region), products(id, name, price). Always write a
single SELECT statement. Never guess a column name that isn't listed.
```

## The round trip

1. Send the user's question, the `run_sql_query` tool, and the
   schema-aware system prompt.
2. Claude's reply contains a `tool_use` block: `{"type": "tool_use",
   "id": "toolu_...", "name": "run_sql_query", "input": {"sql":
   "SELECT ..."}}`.
3. **Validate the SQL before running it** (next section) — this step is
   not optional just because the model is "usually right."
4. Execute the validated query through the Lesson 9 read-only,
   parameterized connection.
5. Send the result back as a `tool_result` block — `{"type":
   "tool_result", "tool_use_id": "toolu_...", "content": "<rows as
   text/JSON>"}` — so Claude can turn it into a natural-language answer.

## Validate before you execute

A schema-aware prompt and a least-privilege role make a bad query
*survivable*, but you still shouldn't run SQL you haven't checked. A
simple, real validation pass:

```python
import re

def validate_sql(sql: str) -> str | None:
    s = sql.strip().rstrip(";")
    if not re.match(r"(?is)^\s*select\b", s):
        return "Only SELECT statements are allowed."
    if ";" in s:
        return "Only a single statement is allowed."
    banned = r"\b(insert|update|delete|drop|alter|grant|truncate)\b"
    if re.search(banned, s, re.IGNORECASE):
        return "Query contains a disallowed keyword."
    return None  # None means "passed validation"
```

This isn't a replacement for the read-only database role from Lesson
9 — it's a second, independent check, so a generated query that somehow
slips something destructive-looking past the model's own training still
gets caught in your code before it ever reaches the database driver.

## Key terms

| Term | Meaning |
|---|---|
| `tool_use` block | The structured part of Claude's response naming a tool and its generated input — here, the SQL string |
| `tool_result` block | The message you send back containing the tool's output, keyed to the original `tool_use_id` |
| Schema-aware prompt | A system prompt that tells the model the real table and column names so it can't invent ones that don't exist |
| Pre-execution validation | Code-level checks (SELECT-only, no chained statements, no banned keywords) run before a generated query touches the database |

## Lab

Define a `run_sql_query` tool for your own Project 2 database, write a
system prompt describing your real schema, and wire up the validation
function above. Run your three to five test questions from Lesson 8
end-to-end and confirm each one produces a validated `SELECT` before it
touches your read-only connection.

## Check yourself

- Why does asking Claude to call a tool produce a more reliable query
  than asking it to "write SQL" in prose?
- What does `validate_sql` catch that the read-only role from Lesson 9
  does not?
- What two pieces of information does the system prompt need to contain
  for the model to generate queries against your real schema?
