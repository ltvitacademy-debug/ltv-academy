# Script — Spread & Rest Operators

## Segment 1 (title)

Spread and rest both use the exact same three-dot syntax, but do opposite jobs — spread expands a collection out, rest gathers values together. Chapter 2 closes with these, since you'll see this syntax on nearly every page of real code from here on.

## Segment 2 (code: spread on arrays)

Spread expands an array's elements out, in place, inside a new array literal. This is the modern way to build a new array that includes an existing one's contents, without mutating the original — which matters once other code might still be holding a reference to it.

## Segment 3 (code: spread on objects)

The same syntax works on objects. Spreading an object then overriding one field copies every property first, then applies the override — a one-line way to produce an updated copy instead of mutating the original, exactly the pattern frameworks like React expect for state updates.

## Segment 4 (code: rest parameters)

Rest uses the same three dots but does the opposite job: instead of expanding a collection out, it gathers any number of individual arguments into a single real array. This is how a function accepts an unknown number of arguments.

## Segment 5 (code: rest in destructuring)

Rest also shows up inside destructuring — one property pulled out by name, and dot-dot-dot-rest gathering everything else that wasn't explicitly destructured into its own object. The rule for telling them apart: spread expands inside a literal or function call, rest gathers inside a parameter list or destructuring pattern.

## Segment 6 (outro)

Spread to expand and copy without mutating, rest to gather multiple values into one array. That closes out Chapter 2 — modern JavaScript syntax you'll now recognize everywhere. Next up: Chapter 3, asynchronous JavaScript, where every blockchain call actually happens.
