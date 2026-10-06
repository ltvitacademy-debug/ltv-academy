# Script — Sets & Tuples

## Segment 1 (title)

Two more structures, each solving one specific problem the others don't: sets for uniqueness, tuples for data that shouldn't change.

## Segment 2 (code: sets drop duplicates)

A set is an unordered collection where every item is automatically unique — adding a duplicate does nothing. The most common real use: de-duplicating a list. set() on a list of repeated model names gives you back just the unique ones.

## Segment 3 (code: set operations)

Sets support real set operations. The pipe operator is union — everything from either group. The ampersand is intersection — only what's in both. The minus sign is difference — only what's in the first but not the second.

## Segment 4 (code: tuples are immutable)

A tuple looks like a list but uses parentheses, and once created it cannot be modified — no append, no changing an item. Reading still works fine; trying to assign to an index raises a TypeError.

## Segment 5 (code: why immutability is the point)

Here's the payoff: because a tuple can't change, it can be used as a dictionary key, while a list cannot. That's a real, common pattern — caching a result keyed by a tuple of settings that together uniquely identify it.

## Segment 6 (outro)

Four structures down: lists, dicts, sets, tuples. Next lesson pulls them together — nested, JSON-like structures, which is exactly what real API responses actually look like.
