# Script — Natural-Language-to-SQL Patterns

## Segment 1 (title)

It's tempting to just ask Claude to "write a SQL query" and pull the SQL out of its prose with a regex. Don't. The Messages API's tool use feature exists for exactly this problem: define a tool whose input is the SQL string, and Claude's response comes back as a structured block your code controls, not free text you have to parse.

## Segment 2 (code: the tool definition)

Here's the real shape: a run_sql_query tool with a name, a description telling Claude exactly when to use it and that the connection is read-only, and an input_schema requiring a single SQL string. Alongside it, a system prompt spells out the actual tables and columns in your database, so the model can't invent a column name that doesn't exist.

## Segment 3 (code: validate before executing)

A schema-aware prompt and a least-privilege role make a bad query survivable, but you still shouldn't run SQL you haven't checked. A real validation function confirms the query starts with SELECT, contains no chained statements, and has no banned keywords like DROP or DELETE -- a second, independent check that catches anything the model's training alone doesn't.

## Segment 4 (steps: the round trip)

The full round trip: send the question, the tool, and the schema-aware prompt. Claude replies with a tool_use block naming run_sql_query and the generated SQL. Your code validates it, executes it through the safe read-only connection from Lesson 9, and sends the result back as a tool_result block keyed to that same tool call. Claude turns the rows into a plain-English answer.

## Segment 5 (outro)

With validated, schema-aware SQL working end to end, Lesson 11 adds the other half of an AI data analyst: enriching that SQL result with a live call to an external API.
