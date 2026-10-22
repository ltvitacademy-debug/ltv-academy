# Lesson 3 — Functions

**Chapter 1 · JavaScript Fundamentals · Lesson 3 of 32**

## What you'll learn

- Three ways to write a function: declarations, expressions, and arrow functions
- How parameters and `return` values actually work
- The real, practical difference in how `this` behaves between a regular function and an arrow function
- Why this distinction will matter directly once you start writing ServiceNow callbacks

## Function declarations

A function declaration names the function up front, with the `function`
keyword:

```javascript
function getPriorityLabel(priority) {
  if (priority === 1) {
    return "Critical";
  }
  return "Standard";
}

getPriorityLabel(1); // "Critical"
```

`priority` here is a **parameter** — a placeholder that receives whatever
value is passed in when the function is called. `return` sends a value
back to wherever the function was called from, and immediately stops
running the function — any code after a `return` inside that same block
never executes.

One quirk of function declarations: they're "hoisted," meaning JavaScript
makes them available even before the line where they're written, as long
as they're in the same scope. You can call `getPriorityLabel()` from code
written above its own declaration and it still works.

## Function expressions

A function expression assigns an unnamed (or separately named) function to
a variable instead:

```javascript
var getPriorityLabel = function (priority) {
  if (priority === 1) {
    return "Critical";
  }
  return "Standard";
};
```

Unlike a declaration, a function expression is **not** hoisted — the
variable exists, but isn't assigned the function until that line actually
runs. Calling it earlier throws an error, because at that point it's just
`undefined`.

## Arrow functions

Arrow functions, introduced in a newer version of JavaScript, are a shorter
syntax for writing a function expression:

```javascript
const getPriorityLabel = (priority) => {
  if (priority === 1) {
    return "Critical";
  }
  return "Standard";
};

// a one-line arrow function can skip the braces and the word "return"
const double = (n) => n * 2;
```

Arrow functions read well for short, simple logic, and you'll see them
constantly once this course reaches array methods like `.map()` and
`.filter()` in the next lesson.

## The real difference: how `this` behaves

Regular functions and arrow functions handle the keyword `this`
differently, and it's not just a style preference — it changes what your
code actually does. A regular function gets its own `this`, determined by
*how it's called*. An arrow function has no `this` of its own — it simply
uses whatever `this` was already in scope around it when it was defined.

```javascript
var ticket = {
  number: "INC0010042",
  logRegular: function () {
    console.log(this.number); // works - "this" is the ticket object
  },
  logArrow: () => {
    console.log(this.number); // likely undefined - "this" is NOT the ticket
  },
};
```

This matters in practice: inside a callback passed to something like a
timer or an event handler, a regular function often loses track of the
original `this`, while an arrow function keeps whatever `this` surrounded
it. Chapter 2's lesson on scope and `this` goes much deeper into exactly
why — for now, just recognize that the choice between a regular function
and an arrow function isn't purely cosmetic.

## Key terms

| Term | Meaning |
|---|---|
| Parameter | A named placeholder in a function definition that receives a passed-in value |
| `return` | Sends a value back to the caller and stops the function immediately |
| Hoisting | Function declarations are available even before the line they're written on |
| Function expression | A function assigned to a variable; not hoisted |
| Arrow function | Shorter function syntax that uses the surrounding `this` instead of its own |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why can
you call a function declaration before the line it's written on, but not a
function expression — and what's the one-sentence difference in how
regular functions and arrow functions treat `this`?
