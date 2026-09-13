# Script — Jinja Basics Inside dbt

## Segment 1 (title)

Every ref, every config, every is_incremental block from the last four lessons is Jinja — a general-purpose templating language, not something dbt invented. dbt's job is to render a SQL file full of Jinja down to plain SQL and run that against your warehouse.

## Segment 2 (code: two delimiters)

Two delimiters do all the work. Double curly braces are an expression — they produce a value, dropped straight into the SQL. Curly brace percent is a statement — control flow, producing no value itself, just deciding whether the SQL inside it appears at all.

## Segment 3 (code: variables and loops)

Set defines a variable. loop.last is Jinja's built-in way to know you're on the final iteration of a for loop — exactly what you need to skip a trailing comma when generating a list.

## Segment 4 (code: if and for in real SQL)

A for loop can generate one sum case-when column per status, four columns written once. SQL has no loops or variables of its own — anything repetitive either gets typed out by hand every time, or generated once by a small loop.

## Segment 5 (steps: seeing the compiled output)

Every dbt run writes the fully rendered SQL, Jinja gone, to target/compiled. dbt Cloud's Compiled Code tab shows the same thing live, side by side with your source — the fastest way to confirm a loop is generating exactly the SQL you think it is.

## Segment 6 (outro)

Next lesson: Writing Custom Macros — packaging up a reusable piece of Jinja so you're not retyping the same loop or conditional in every model.
