# Script — Aggregate Functions

## Segment 1 (title)

Chapter One was about listing records. Chapter Two is about summarizing them, and it starts with the five aggregate functions you already know from T-SQL: COUNT, SUM, AVG, MIN, and MAX.

## Segment 2 (code: the five functions)

Here is all five in one query over closed-won opportunities. COUNT of Id, SUM, AVG, MIN, and MAX of Amount. One row comes back. SUM and AVG need numeric or currency fields, while MIN and MAX also work on dates and text. COUNT underscore DISTINCT counts unique non-null values, like how many different accounts have opportunities.

## Segment 3 (code: COUNT versus COUNT of field)

SOQL has two count forms. COUNT with empty parentheses returns the number of matching rows as a plain integer, and it must be the only item in the SELECT list. COUNT of a field counts rows where that field is not null, and can sit beside other aggregates. Same idea as COUNT star versus COUNT column in T-SQL. For a total, COUNT of Id is the everyday choice, since Id is never null.

## Segment 4 (code: aliases)

Notice the names after each function. In SOQL you alias an aggregate by placing the name directly after it, with no AS keyword. Skip the alias and Salesforce names them expr0, expr1, expr2. Aggregate queries return AggregateResult records, and in Apex you read each value by its alias, so give every aggregate a meaningful name.

## Segment 5 (steps: rules)

Three rules. A plain field beside an aggregate needs GROUP BY, which is next lesson. Filtering on an aggregate needs HAVING, two lessons from now. And WHERE runs before any aggregation, so it can only filter individual rows.

## Segment 6 (outro)

Now you can summarize a whole object in one row. But what if you want one row per stage, or per industry? Next up: GROUP BY in SOQL.
