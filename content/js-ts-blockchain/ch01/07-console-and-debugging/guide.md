# Lesson 7 — Working With the Console & Debugging

**Chapter 1 · Programming Fundamentals Through JavaScript · Lesson 7 of 39**

## What you'll learn

- The real Chrome DevTools Console — not just `console.log`, but `console.error`, `console.table`, and running JavaScript live against a page
- How to open DevTools and find the Console tab
- How to run JavaScript directly in the console to inspect or even change a running page
- Why `console.table` is worth knowing specifically for arrays of objects — exactly the shape blockchain data comes in

## Opening the console

Every major browser ships with built-in developer tools. In Chrome, press
`F12` or `Ctrl+Shift+J` (Windows) to open DevTools directly to the
**Console** tab — the same tab is reachable from the DevTools panel's tab
bar if it opens somewhere else first. The console shows two things at
once: anything your page's JavaScript logs, and a live prompt where you can
type and run JavaScript yourself, immediately, against the actual page.

## Beyond console.log

```js
console.log("Loading!");          // plain message
console.error("Something broke"); // shown in red, with a stack trace
console.table([
  { first: "René", last: "Magritte" },
  { first: "Chaim", last: "Soutine" },
]);
```

`console.log` is the one every beginner reaches for first, but it's not
the only tool. `console.error` marks a message as an error — it's styled
in red and, critically, in a real browser it comes with a clickable stack
trace showing exactly which line logged it. `console.table` renders an
array of objects as an actual table, instantly more readable than a wall
of nested `{ }` — and it's worth knowing specifically because arrays of
objects are exactly the shape most blockchain data (a list of
transactions, a list of token balances) comes in.

## Running JavaScript live, against the page

The console isn't just for reading output — it's a live JavaScript prompt.
Typing an expression and pressing Enter runs it immediately against the
actual page you have open, and prints back whatever it returns. This is
how experienced developers debug: not just reading logs, but reaching in
and querying or modifying a running page directly to understand what's
actually happening, instead of guessing.

## Why this matters for debugging

When a script doesn't do what you expect, the console is where you find
out why — add a `console.log` before the suspicious line, rerun it, and
read what the variable actually held at that moment versus what you
assumed it held. That one habit, checking what a value actually is instead
of assuming, resolves more bugs than anything else in this lesson.

## Key terms

| Term | Meaning |
|---|---|
| DevTools | A browser's built-in developer tools panel, opened with F12 |
| Stack trace | The chain of function calls that led to a given line of code executing |

## Check yourself

You're ready for Lesson 8 when you can open your browser's Console tab,
run `console.table` on an array of objects, and explain why you'd reach
for `console.error` instead of `console.log` for a real problem.
