# Script — Stored Procedures & User-Defined Functions, Basics

## Segment 1 (title)

T-SQL separates functions, which return a value usable inline in a SELECT, from stored procedures, which can run DML and are invoked separately. Snowflake keeps exactly this split — nothing to relearn about why each exists, just how each is written.

## Segment 2 (code: Snowflake Scripting procedure)

Snowflake's procedural SQL is called Snowflake Scripting. The shape is familiar — DECLARE, BEGIN and END, IF, loops — but invocation uses CALL instead of EXEC, assignment uses colon-equals instead of SET, variables have no at-sign prefix, and the body is wrapped in dollar-sign quoting.

## Segment 3 (code: SQL UDF)

A SQL UDF is a single expression, not a procedural block — no BEGIN, no side effects, just a computed return value usable inline in a query, exactly like a T-SQL scalar function used the same way.

## Segment 4 (code: JavaScript & Python UDFs)

Beyond SQL UDFs, Snowflake also supports JavaScript and Python UDFs for logic that's awkward to express in pure SQL. Both get called exactly like a SQL UDF once created — the point for now is knowing they exist, not mastering them.

## Segment 5 (outro)

Next lesson is a hands-on exercise: rewriting a full T-SQL query, with TOP, plus, and CASE, into its Snowflake SQL equivalent — tying together everything from this chapter.
