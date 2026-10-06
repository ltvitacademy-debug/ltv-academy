# Script — Formula Fields

## Segment 1 (title)

Every field type so far stores a value someone typed in. A Formula field is different: it stores nothing. Every time a record is viewed, Salesforce recalculates it from scratch, using whatever the source fields hold right now.

## Segment 2 (screenshot: formula editor)

The formula editor gives you three tools instead of making you memorize syntax: Insert Field opens a picker of every field on the object and related objects, Insert Operator adds math and comparison symbols, and Functions lists every formula function with a description. Check Syntax validates the whole thing before you can save.

## Segment 3 (screenshot: insert field)

Insert Field is worth a closer look — it can cross a relationship, reaching fields on a related Account from an Opportunity or Contact formula, without you having to know the relationship syntax by hand.

## Segment 4 (screenshot: AND formula)

Here's a real one: a Checkbox field called Big Opportunity, defined as AND of two conditions — the related Account's employee count over 1000, and the Opportunity's own Amount over 10000. Zero syntax errors, and the result updates itself the instant either value changes.

## Segment 5 (outro)

A Formula field can never go stale, because nothing is stored to go stale — it's recalculated on every view. Next up: Roll-Up Summary fields, which also calculate automatically, but by aggregating child records instead of evaluating an expression.
