# Lesson 3 — Variables & Data Types

**Chapter 1 · Programming Fundamentals Through JavaScript · Lesson 3 of 39**

## What you'll learn

- The three ways to declare a variable in JavaScript, and which one you should reach for almost every time
- JavaScript's primitive data types, including the one that exists specifically for numbers too large for blockchain math
- Why `typeof` is the tool you'll use constantly to check what you're actually holding
- A first look at why type *mistakes* are exactly what TypeScript, in Chapter 4, exists to catch early

## Declaring variables: let, const, and var

```js
let count = 1;        // can be reassigned later
const owner = "Ana";  // cannot be reassigned after this line
var legacy = true;    // old syntax — avoid in new code
```

`const` should be your default. Reach for `let` only when you genuinely
need to reassign the variable later (a counter, a running total). `var` is
old JavaScript syntax with looser scoping rules that cause real bugs — this
course never uses it in new code, and you shouldn't either.

## The primitive data types

```js
let name = "Ana";          // string
let age = 29;              // number
let isActive = true;       // boolean
let nothingYet;            // undefined — declared, no value assigned
let empty = null;          // null — intentionally "no value"
let big = 9007199254740993n; // bigint — for numbers past safe integer range
```

Every one of these except `bigint` behaves the way most languages' basic
types do. `bigint` is the one worth pausing on: JavaScript's regular
`number` type can't safely represent whole numbers past
`2^53 - 1` (about 9 quadrillion) — and a token balance expressed in **wei**
(the smallest unit of ether) routinely blows past that. Every blockchain
library in this course uses `bigint` for exactly that reason.

## Checking a value's type

```js
console.log(typeof "Ana");     // "string"
console.log(typeof 29);        // "number"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" — a famous, long-standing JS quirk
console.log(typeof 10n);       // "bigint"
```

`typeof null` returning `"object"` is a genuine bug baked into JavaScript
since 1995 that's never been fixed, because fixing it would break too much
existing code on the web. It's worth knowing by name so it doesn't look
like your mistake the first time you hit it.

## Key terms

| Term | Meaning |
|---|---|
| Primitive | A basic data type: string, number, boolean, undefined, null, bigint, or symbol |
| Wei | The smallest unit of ether — routinely exceeds JavaScript's safe integer range |
| `typeof` | An operator that returns a string naming a value's type |

## Check yourself

You're ready for Lesson 4 when you can explain why `const` is the right
default, and why a blockchain library would store a wei balance as a
`bigint` instead of a regular `number`.
