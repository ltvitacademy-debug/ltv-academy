# Lesson 8 — ES6+ Syntax

**Chapter 2 · Modern JavaScript · Lesson 8 of 39**

## What you'll learn

- What "ES6+" actually means, and why nearly every blockchain library you'll ever use requires it
- `let`/`const` block scoping, properly explained this time, versus `var`'s older function scoping
- Classes — JavaScript's syntax for bundling data and behavior together
- The ternary operator, a compact shorthand for a simple `if`/`else`

## What "ES6+" means

JavaScript's official name is ECMAScript, and **ES6** (also called ES2015)
was a major update to the language that added most of the syntax this
course now treats as completely normal: `let`/`const`, arrow functions,
template literals, classes, and more. "ES6+" means ES6 and everything
after it. Every modern blockchain library — ethers.js, viem, Hardhat — is
written in and expects this syntax; there's no version of this course that
could skip it.

## Block scoping: the real reason let/const replaced var

```js
if (true) {
  let x = 1;
  var y = 2;
}

console.log(y); // 2 -- var "leaks" out of the if block
console.log(x); // ReferenceError -- let stays inside the block
```

Lesson 3 said to avoid `var`; here's precisely why. `var` is scoped to the
nearest *function*, so it leaks out of `if` blocks and loops in ways that
cause real, hard-to-track bugs. `let` and `const` are scoped to the nearest
*block* — the `{ }` they're declared inside — which matches what every
other modern language does and what you'd actually expect.

## Classes

```js
class Wallet {
  constructor(address, balance) {
    this.address = address;
    this.balance = balance;
  }

  describe() {
    return `${this.address}: ${this.balance} wei`;
  }
}

const w = new Wallet("0xAb12...", 500n);
console.log(w.describe()); // "0xAb12...: 500 wei"
```

A `class` bundles data (here, `address` and `balance`) with behavior that
operates on it (`describe()`). `constructor` runs once, when `new Wallet(...)`
creates an instance; `this` refers to that specific instance's own data.

## The ternary operator

```js
const balance = 0;
const status = balance > 0 ? "funded" : "empty";
// equivalent to:
// let status;
// if (balance > 0) { status = "funded"; } else { status = "empty"; }
```

`condition ? valueIfTrue : valueIfFalse` is a compact one-line form of a
simple `if`/`else` that assigns a value either way. It reads awkwardly at
first but becomes natural quickly, and you'll see it constantly in real
codebases once you start reading them.

## Key terms

| Term | Meaning |
|---|---|
| ECMAScript | The official standard JavaScript implements; ES6/ES2015 was a major revision |
| Block scope | Variable visibility limited to the nearest `{ }`, used by `let`/`const` |
| Ternary operator | `condition ? a : b` — compact shorthand for a simple if/else |

## Check yourself

You're ready for Lesson 9 when you can explain why `var` leaking out of an
`if` block is a bug risk that `let` doesn't have, and read a ternary
expression without translating it to `if`/`else` in your head.
