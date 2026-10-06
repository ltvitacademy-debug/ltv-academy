# Script — ES6+ Syntax

## Segment 1 (title)

JavaScript's official name is ECMAScript, and ES6 was a major update that added most of the syntax this course treats as completely normal. Every modern blockchain library expects this syntax, so this lesson makes it explicit before moving faster through the rest of Chapter 2.

## Segment 2 (code: block scoping)

Lesson 3 said to avoid var — here's precisely why. var is scoped to the nearest function, so it leaks out of if blocks and loops in ways that cause real, hard-to-track bugs. let and const are scoped to the nearest block, the curly braces they're declared inside, which matches what you'd actually expect.

## Segment 3 (code: classes)

A class bundles data with behavior that operates on it. constructor runs once, when a new instance is created, and this refers to that specific instance's own data — so each Wallet you create keeps its own address and balance separate from every other one.

## Segment 4 (code: ternary)

The ternary operator is condition, question mark, value if true, colon, value if false — a compact one-line form of a simple if/else that assigns a value either way. It reads awkwardly at first but becomes natural quickly, and shows up constantly in real codebases.

## Segment 5 (outro)

ES6 is the baseline every blockchain library assumes: proper block scoping, classes, and the ternary operator. Next up: arrow functions and destructuring — two more ES6 features you'll use in nearly every line of real code.
