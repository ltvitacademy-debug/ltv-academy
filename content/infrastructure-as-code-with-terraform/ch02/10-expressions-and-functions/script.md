# Script — Expressions & Functions

## Segment 1 (title)

Variables, resources, and data sources all give you values. This lesson covers the tools HCL gives you to transform and combine those values — for expressions, conditionals, and a set of built-in functions — the small amount of logic every real configuration eventually needs.

## Segment 2 (code)

A for expression builds a new list by looping over an existing one. Range of three produces zero, one, two, and the for expression runs the string template once per value, collecting the results into a new list. You'll see this pattern anywhere a variable number of similarly named resources needs to be generated automatically.

## Segment 3 (code)

A conditional expression picks one of two values based on a true or false condition: condition, question mark, true value, colon, false value. If environment equals prod, VM size becomes the larger size; otherwise it becomes the smaller one. It's the single most common way Terraform configurations vary behavior by environment without separate files.

## Segment 4 (code)

Four functions you'll reach for constantly. Lookup reads a map value by key with a safe fallback if the key's missing, safer than indexing the map directly. Join combines a list into one delimited string. Range generates a sequence for for expressions to loop over. And templatefile reads a file from disk and substitutes variables into it — handy for generating a startup script per VM.

## Segment 5 (steps)

HCL ships dozens more built-in functions for string manipulation, type conversion, dates and times, and collection operations. You don't need to memorize them — check the official function reference whenever you suspect there's probably already one for what you're trying to do.

## Segment 6 (outro)

You now have the full HCL toolkit: blocks, resources, variables, data sources, expressions, and functions. Next up, Lesson 11: running init, plan, apply, and destroy end to end.
