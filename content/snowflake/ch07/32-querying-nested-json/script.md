# Script — Querying Nested JSON

## Segment 1 (title)

A VARIANT column holds a whole JSON object, but a raw blob sitting in one cell isn't useful on its own. You need to pull specific fields out of it, the same way you'd reference any column — and Snowflake has a dedicated syntax for exactly that.

## Segment 2 (screenshot: JSON row panel)

This is a query result on a VARIANT column, with one row's value expanded to show its formatted JSON — CIK, company name, filed date. Every field visible here is reachable with colon notation: v colon CIK, v colon COMPANY underscore NAME, and so on, cast to a real type with a double-colon.

## Segment 3 (steps: colon notation and casting)

Three things to know: v colon field name pulls out the raw value. It comes back typed VARIANT, so you almost always cast it — double-colon string, double-colon date, double-colon number. And nested fields chain just like JavaScript dot notation: v colon address colon city, cast to string.

## Segment 4 (steps: views and PARSE_JSON)

Writing colon notation everywhere gets old fast, so wrap it in a view once — downstream queries just see plain typed columns and never know it started as JSON. And if the JSON arrives as a plain string instead of a VARIANT column, PARSE_JSON converts that string into a VARIANT you can query the same way.

## Segment 5 (outro)

Next lesson: FLATTEN — turning a JSON array buried inside a VARIANT column into actual rows.
