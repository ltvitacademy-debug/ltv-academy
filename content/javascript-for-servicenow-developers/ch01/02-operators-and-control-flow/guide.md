# Lesson 2 — Operators & Control Flow

**Chapter 1 · JavaScript Fundamentals · Lesson 2 of 32**

## What you'll learn

- Why `===` matters more than `==`, and the real difference between them
- The logical operators (`&&`, `||`, `!`) that combine conditions
- `if` / `else if` / `else` and `switch` for branching logic
- `for` and `while` loops for repeating work

## Strict equality vs. loose equality

JavaScript has two different equality operators, and mixing them up causes
real bugs. `==` performs **type coercion** first — it converts the two
values to a common type, then compares them. `===` checks type *and* value
together, with no conversion at all.

```javascript
"1" == 1;    // true  - the string "1" is coerced to the number 1
"1" === 1;   // false - different types, no coercion, not equal

0 == false;  // true  - false is coerced to 0
0 === false; // false - different types

null == undefined;  // true  - a special-case coercion rule
null === undefined; // false - different types
```

That `"1" == 1` result looks harmless until you're comparing a value that
came back from a form field (always a string) against a number you
expected. ServiceNow scripting style strongly favors `===` and `!==`
everywhere, precisely to avoid these silent, surprising conversions. Get in
the habit now: default to `===`, and only reach for `==` if you have a
specific, deliberate reason to allow coercion.

## Combining conditions with logical operators

Three operators let you combine or invert boolean conditions:

```javascript
var isEscalated = true;
var isAssigned = false;

isEscalated && isAssigned;   // false - both must be true
isEscalated || isAssigned;   // true  - at least one is true
!isAssigned;                  // true  - inverts the value
```

`&&` and `||` also "short-circuit" — they stop evaluating as soon as the
result is already determined. `isAssigned && doSomething()` never calls
`doSomething()` at all if `isAssigned` is `false`, since the overall result
is already known to be `false`.

## Branching with if / else if / else

```javascript
var priority = 1;

if (priority === 1) {
  console.log("Critical");
} else if (priority === 2) {
  console.log("High");
} else if (priority === 3) {
  console.log("Moderate");
} else {
  console.log("Low");
}
```

Each condition is checked in order, top to bottom. The first one that
evaluates to `true` runs its block, and the rest are skipped entirely —
even if a later condition would also have been `true`.

## Branching with switch

When you're comparing one value against many possible exact matches,
`switch` is often more readable than a long `if / else if` chain:

```javascript
switch (priority) {
  case 1:
    console.log("Critical");
    break;
  case 2:
    console.log("High");
    break;
  default:
    console.log("Standard");
}
```

The `break` statement matters — without it, execution "falls through" into
the next `case` instead of stopping, which is a common source of bugs for
developers new to `switch`.

## Repeating work with loops

A `for` loop is the standard way to repeat an action a known number of
times — for example, walking through a list of ticket numbers:

```javascript
var tickets = ["INC0010042", "INC0010043", "INC0010044"];
for (var i = 0; i < tickets.length; i++) {
  console.log(tickets[i]);
}
```

A `while` loop repeats as long as a condition stays `true`, which suits
situations where you don't know in advance how many times you'll need to
repeat:

```javascript
var attempts = 0;
while (attempts < 3) {
  console.log("Attempt " + (attempts + 1));
  attempts++;
}
```

## Key terms

| Term | Meaning |
|---|---|
| `===` | Strict equality — compares type and value, no coercion |
| `==` | Loose equality — coerces types before comparing |
| Type coercion | JavaScript automatically converting a value to another type for a comparison |
| Short-circuit evaluation | `&&` / `||` stop evaluating as soon as the result is known |
| `switch` | Branches on exact matches against one value; needs `break` to avoid fall-through |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why does
`"1" == 1` evaluate to `true` while `"1" === 1` evaluates to `false`, and
what happens if you forget a `break` inside a `switch` statement?
