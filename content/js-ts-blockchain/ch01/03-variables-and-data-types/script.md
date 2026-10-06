# Script — Variables & Data Types

## Segment 1 (title)

Every script you write starts with variables — named places to hold a value. JavaScript gives you three ways to declare one, and today's goal is knowing which to reach for, and what kinds of values you can actually store.

## Segment 2 (code: let, const, var)

const should be your default — it can't be reassigned after that line, which makes a script easier to reason about. Reach for let only when you genuinely need to reassign something later, like a counter. var is old JavaScript syntax with looser scoping rules that cause real bugs — this course never uses it in new code.

## Segment 3 (code: primitive types)

JavaScript's basic types are string, number, boolean, undefined, and null, plus one most languages don't have: bigint. Regular numbers can't safely represent whole numbers past about nine quadrillion, and a token balance expressed in wei routinely blows past that — so every blockchain library in this course uses bigint instead.

## Segment 4 (code: typeof)

The typeof operator tells you what you're holding — typeof "Ana" is "string", typeof 29 is "number". One famous exception: typeof null returns "object", a genuine bug baked into JavaScript since 1995 that's never been fixed, because fixing it would break too much of the existing web.

## Segment 5 (outro)

Declare with const by default, know your seven primitive types, and check any of them with typeof. Next up: control flow — how a script actually makes decisions.
