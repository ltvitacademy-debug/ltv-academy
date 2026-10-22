# Lesson 6 — Fundamentals Lab

**Chapter 1 · JavaScript Fundamentals · Lesson 6 of 32**

## What you'll learn

- How to combine variables, operators, functions, arrays, and objects in one real task
- How to write a function that filters a list of objects by more than one condition
- How `.filter()` and `.map()` chain together to go from raw data to exactly the output you need
- How to verify your own logic by tracing through it by hand, the way you'll debug real scripts later in this course

## The scenario

You've been handed a small, in-memory list representing open tickets.
Each ticket is an object with three properties: `number` (a string),
`priority` (a number, where `1` means highest priority), and `assigned`
(a boolean — `true` if someone is already working it). Your task: write a
function that returns the ticket *numbers* for every ticket that is both
**priority 1** and **unassigned** — exactly the list someone on a team lead
dashboard would want to see first thing in the morning.

This is a deliberately realistic shape. Later in this course, Chapter 3
covers GlideRecord, ServiceNow's API for querying real records — and the
data it hands back is shaped almost exactly like this: a list of
record-like objects with fields you'll filter and transform the same way.
Nothing here is ServiceNow-specific yet; it's the plain JavaScript skill
that chapter will build directly on.

## Step 1 — Shape the data

```javascript
var tickets = [
  { number: "INC0010042", priority: 1, assigned: false },
  { number: "INC0010043", priority: 3, assigned: true },
  { number: "INC0010044", priority: 1, assigned: true },
  { number: "INC0010045", priority: 2, assigned: false },
  { number: "INC0010046", priority: 1, assigned: false },
];
```

Five tickets, each an object literal (Lesson 5) inside an array literal
(Lesson 4). Before writing any logic, it helps to trace through by hand
which tickets *should* end up in the final answer. Priority `1` and
`assigned: false` only describes `INC0010042` and `INC0010046` — the other
three fail on one condition or the other. Knowing the expected answer
before you write the function is what lets you catch a bug instead of just
trusting whatever the code happens to produce.

## Step 2 — Filter for priority 1 and unassigned

```javascript
function getUnassignedCriticalNumbers(ticketList) {
  var unassignedCritical = ticketList.filter(function (ticket) {
    return ticket.priority === 1 && ticket.assigned === false;
  });

  // unassignedCritical is still an array of full ticket objects here
}
```

The condition inside `.filter()` uses `&&` (Lesson 2) to require **both**
things to be true at once: `ticket.priority === 1` and
`ticket.assigned === false`. Notice both comparisons use `===`, not `==` —
deliberately avoiding any type coercion, since `priority` should always
already be a real number and `assigned` a real boolean in this data.
`.filter()` (Lesson 4) returns a brand-new array containing only the
ticket objects that passed both checks — at this point in the function,
`unassignedCritical` still holds the *full objects*, not just their
numbers.

## Step 3 — Transform to just the ticket numbers

```javascript
function getUnassignedCriticalNumbers(ticketList) {
  var unassignedCritical = ticketList.filter(function (ticket) {
    return ticket.priority === 1 && ticket.assigned === false;
  });

  var ticketNumbers = unassignedCritical.map(function (ticket) {
    return ticket.number;
  });

  return ticketNumbers;
}
```

`.map()` (Lesson 4) walks the filtered array and returns a new array built
from whatever the callback function returns for each item — here, just the
`number` property (Lesson 5's dot notation) pulled out of each remaining
ticket object. The `return` keyword (Lesson 3) at the end sends the final
array back to whoever called the function.

## Step 4 — Run it and confirm the result

```javascript
var tickets = [
  { number: "INC0010042", priority: 1, assigned: false },
  { number: "INC0010043", priority: 3, assigned: true },
  { number: "INC0010044", priority: 1, assigned: true },
  { number: "INC0010045", priority: 2, assigned: false },
  { number: "INC0010046", priority: 1, assigned: false },
];

function getUnassignedCriticalNumbers(ticketList) {
  var unassignedCritical = ticketList.filter(function (ticket) {
    return ticket.priority === 1 && ticket.assigned === false;
  });

  return unassignedCritical.map(function (ticket) {
    return ticket.number;
  });
}

var result = getUnassignedCriticalNumbers(tickets);
console.log(result);
// ["INC0010042", "INC0010046"]
```

That matches the by-hand trace from Step 1 exactly — `INC0010042` and
`INC0010046` are the only two tickets that were both priority `1` and
unassigned. If the result hadn't matched, that mismatch is exactly the
signal that something in the filter condition was wrong, the same kind of
check you'll run constantly once you're debugging real scripts in Chapter
6.

## A variation worth trying yourself

What if the dashboard also needed to know *how many* tickets matched, not
just their numbers? Since `.filter()` already returns a real array,
`.length` (Lesson 4) answers that with no extra work:

```javascript
var unassignedCritical = tickets.filter(function (ticket) {
  return ticket.priority === 1 && ticket.assigned === false;
});

console.log(unassignedCritical.length); // 2
```

## Key terms

| Term | Meaning |
|---|---|
| Filter-then-map | A common pattern: narrow a list down with `.filter()`, then reshape what's left with `.map()` |
| Object property | A named field on an object, like `ticket.priority`, read with dot notation |
| Compound condition | Two or more checks joined with `&&` (or `||`) inside one `if` or `.filter()` callback |
| Tracing by hand | Working out the expected answer yourself before running the code, so you can catch a wrong result |
| Callback function | A function passed into another function (like `.filter()` or `.map()`) to run per item |

## Check yourself

You're ready for Chapter 2 when you can write, from scratch and without
looking back at this page, a function that takes an array of ticket
objects and returns the ticket numbers of every ticket that is priority 2
**or** priority 1, and still unassigned.
