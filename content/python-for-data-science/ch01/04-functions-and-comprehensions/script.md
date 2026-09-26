# Script — Functions & Comprehensions

## Segment 1 (title)

Once you write the same three lines a second time, it is time for a function. And once you write the same loop a fifth time, it is time for a comprehension.

## Segment 2 (code)

A function starts with def, a name, and parameters. Return sends a value back. Here add tax takes a price and a rate, and rate defaults to point zero eight. Call it with just fifty and you get fifty-four. Name the argument, rate equals point one, and you get fifty-five. Naming arguments makes calls easier to read.

## Segment 3 (code)

A function can return several values. Python packs them into a tuple, and you unpack them on the spot: low, high, and average. And watch for this classic slip. If you forget return, the function still runs, but it hands back None, because the answer was computed and thrown away.

## Segment 4 (code)

Here is where Python gets compact. A list comprehension builds a new list in one line. Add tax to every total: the expression, then for t in totals. Put an if at the end and it filters, keeping only totals above twenty. Put an if and else at the front and it transforms every item, labeling each one big or small.

## Segment 5 (steps)

Read every comprehension in three parts. First, the expression, what you build for each item. Second, the for clause, where the items come from. Third, the optional if, which filters. Curly braces with a key and a value give you a dictionary comprehension. And if it needs more than a line of thinking, use a regular loop instead.

## Segment 6 (code)

One more tool: lambda, a small function with no name. It is most useful as the key when sorting. Here we sort orders by their second element, the amount, largest first. You will see this same pattern again when we apply small functions to pandas columns.

## Segment 7 (outro)

Functions and comprehensions cover how to process data. Next lesson covers how to hold it: lists, tuples, dictionaries, and sets.
