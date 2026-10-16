# SQL Safety Checklist for AI Data Analysts

Built from Project 2, Lessons 9-10 (Connecting to a Database Safely; Natural-Language-to-SQL Patterns). Run through this before letting any LLM-generated query near a real database — every item here is a layer that still matters even if the others are also in place.

## Connection layer (Lesson 9)

- [ ] Every query is parameterized — values are passed separately from SQL text (`cursor.execute(query, (value,))`), never spliced in with an f-string or `.format()`, with or without an LLM in the loop
- [ ] The AI analyst connects using a **dedicated read-only database role** — no `INSERT`, `UPDATE`, `DELETE`, or DDL grants of any kind
- [ ] A **statement timeout** is set on the connection (a few seconds), so a runaway generated query fails fast instead of hanging
- [ ] A **hard row limit** is enforced in code (e.g. `LIMIT 500`), even if the generated query itself omits one

## Generation layer (Lesson 10)

- [ ] SQL is requested through a structured tool call (`tool_use`), never parsed out of free-text prose
- [ ] The tool's `description` explicitly states this connection is read-only and names exactly which tables it may query
- [ ] The system prompt is schema-aware: it names real table and column names so the model can't invent ones that don't exist
- [ ] A **pre-execution validation** function runs on every generated query before it reaches the database connection, checking:
  - [ ] The statement starts with `SELECT` (case-insensitive)
  - [ ] There is no semicolon-chained second statement
  - [ ] None of `insert`, `update`, `delete`, `drop`, `alter`, `grant`, `truncate` appear as whole words

## Known gap to name honestly

- [ ] The validation above defends the **query text**. It does not defend against prompt injection **via the user's question wording** manipulating the model's reasoning. If this gap hasn't been tested, say so explicitly in your README's known-limitations section (per Lesson 12) rather than implying the system is airtight.

## Before calling this project portfolio-ready

- [ ] You can explain, out loud, why parameterization alone isn't enough (a correctly-parameterized `DELETE` still runs if the role allows it)
- [ ] You can explain why the read-only role alone isn't enough (it doesn't stop a wrong-but-harmless query from returning misleading results)
- [ ] You have manually tried at least one adversarial question designed to produce a disallowed query, and confirmed validation caught it
