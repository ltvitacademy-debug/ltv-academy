# Script — Types, Variables & Control Flow

## Segment 1 (title)

C++ is statically typed: every variable has a type fixed at compile time, and that type never changes. That's a real shift if you're coming from Python. This lesson covers the built-in types, the habits that keep them safe, and the control flow that structures every program.

## Segment 2 (code)

These are the types you'll use constantly. An int for counts, a double for almost every price and calculation — the extra precision matters because rounding error compounds across millions of operations. A bool for yes-or-no flags, and a char for a single letter, like a one-character order side.

## Segment 3 (steps)

Two habits pay for themselves immediately. Mark anything you don't intend to reassign as const — the compiler will catch an accidental change for you, and it tells the next reader exactly what's an input versus what varies. Let auto infer a type when spelling it out wouldn't help anyone, but don't reach for it automatically. And never compare two doubles with equals-equals — prices accumulate rounding error, so compare against a small tolerance instead.

## Segment 4 (code)

The control-flow constructs will feel familiar. If and else branch on a condition, same as anywhere else. The loop here is a range-based for — it walks every element of a collection without you spelling out an index, which is exactly what you want when you don't actually need one.

## Segment 5 (steps)

For a fixed set of named values — an order side, a trade status, an option type — reach for enum class instead of a raw integer or a string. It's scoped, so you have to write the full name, and it won't silently convert to a number the way an old-style enum will. That one choice heads off a surprising number of real bugs.

## Segment 6 (outro)

Static types, const by default, auto where it helps, and the familiar control-flow shapes — that's the raw material every C++ program is built from. Up next, lesson four: functions and references, where you'll learn to pass this data around without copying it unnecessarily.
