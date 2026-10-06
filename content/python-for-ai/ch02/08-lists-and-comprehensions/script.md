# Script — Lists & List Comprehensions

## Segment 1 (title)

Chapter 2 starts here: the data structures you'll use constantly for AI work. First up, the most common one — lists.

## Segment 2 (code: creating and indexing)

A list is an ordered, changeable collection. Indexing starts at 0, not 1. Negative indices count from the end, so -1 is always the last item — useful when you don't know a list's length in advance. A slice like 0 colon 2 pulls a sub-list.

## Segment 3 (code: common list methods)

append adds one item to the end. extend adds multiple items at once. sort sorts in place. len tells you how many items there are, and the in keyword checks membership — these five cover most of what you'll do with a list.

## Segment 4 (code: list comprehensions)

A list comprehension builds a new list by transforming or filtering an existing one, in one readable line instead of a multi-line for loop. The pattern: expression, for item in iterable, with an optional if condition to filter.

## Segment 5 (code: why this matters for AI work)

Shaping data is most of what you do when integrating with an AI API. A comprehension is exactly how you'd pull just the text out of a batch of API responses — texts_only equals r bracket "text" bracket for r in responses.

## Segment 6 (outro)

Lists handle ordered data. Next up: dictionaries — the structure behind every JSON request and response you'll send to an AI API.
