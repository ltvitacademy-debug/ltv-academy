# Lesson 5 — Functions

**Chapter 1 · Programming Fundamentals Through JavaScript · Lesson 5 of 39**

## What you'll learn

- How to declare a function and why bundling logic into one makes it reusable
- Parameters, arguments, default parameter values, and `return`
- The difference between a function declaration and a function expression
- What a function returns when it has no explicit `return` statement — a fact that trips up every beginner at least once

## Declaring a function

```js
function greet(name) {
  return `Hello, ${name}`;
}

console.log(greet("Ana")); // "Hello, Ana"
```

A function is a named, reusable block of code. `name` here is a
**parameter** — a placeholder the function expects to receive. `"Ana"` is
the **argument** — the actual value passed in when the function is called.
`return` sends a value back out to wherever the function was called from.

## Default parameters

```js
function greet(name = "friend") {
  return `Hello, ${name}`;
}

console.log(greet());        // "Hello, friend"
console.log(greet("Ana"));   // "Hello, Ana"
```

A default parameter value is used automatically whenever the caller doesn't
pass that argument at all. This is far more useful than it looks once
functions take several optional settings.

## Function declarations vs. function expressions

```js
// Declaration — hoisted, can be called before it appears in the file
function add(a, b) {
  return a + b;
}

// Expression — a function stored in a variable, not hoisted
const subtract = function (a, b) {
  return a - b;
};
```

Both work the same way once defined. The practical difference: a function
*declaration* can be called earlier in the file than where it's written
(JavaScript "hoists" it); a function *expression* assigned to a variable
cannot — the variable doesn't exist yet at that point in the file.

## What a function returns with no return statement

```js
function logOnly(message) {
  console.log(message);
  // no return statement
}

const result = logOnly("hi"); // logs "hi"
console.log(result);          // undefined
```

This is one of the most common beginner surprises: a function with no
`return` doesn't return nothing — it returns `undefined`, every time,
silently. If a bug shows a value as `undefined` where you expected real
data, check whether the function that produced it forgot to `return`.

## Key terms

| Term | Meaning |
|---|---|
| Parameter | The named placeholder a function expects to receive |
| Argument | The actual value passed in when the function is called |
| Hoisting | JavaScript moving function *declarations* to the top of their scope before running |

## Check yourself

You're ready for Lesson 6 when you can write a function with a default
parameter, and explain exactly what it returns if you forget the `return`
keyword.
