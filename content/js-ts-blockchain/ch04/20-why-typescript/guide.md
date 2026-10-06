# Lesson 20 — Why TypeScript?

**Chapter 4 · TypeScript Fundamentals · Lesson 20 of 39**

## What you'll learn

- A real bug plain JavaScript can't catch until runtime
- How a type annotation catches the same bug before the code ever runs
- What TypeScript actually is: a superset of JavaScript, not a new language
- Why type information makes editor autocomplete dramatically better
- Why this matters more than usual in blockchain code

## A bug JavaScript can't catch until it runs

```js
function sendTokens(address, amount) {
  return wallet.transfer(address, amount);
}

sendTokens(42, "0.5 ETH"); // runs, then fails deep inside transfer()
```

The arguments are swapped — a number where an address belongs, a string
where an amount belongs. Plain JavaScript has no way to flag this until the
function actually executes, possibly deep inside a library, possibly in
production.

## The same mistake, caught before running

```ts
function sendTokens(address: string, amount: number) {
  return wallet.transfer(address, amount);
}

sendTokens(42, "0.5 ETH");
// Error: Argument of type 'number' is not assignable to type 'string'.
```

Two type annotations later, TypeScript's compiler flags this the moment
you save the file — the same bug, caught instantly, before the code has
run even once.

## What TypeScript actually is

| Step | What happens |
|---|---|
| **Write `.ts` files** | Same JavaScript syntax you already know, plus optional type annotations |
| **Compiler checks types** | `tsc` (the TypeScript compiler) checks for type mismatches |
| **Compiles to `.js`** | Types are erased entirely — browsers and Node only ever run plain JavaScript |

TypeScript is a **superset** of JavaScript: every valid JavaScript file is
already (nearly) valid TypeScript. You're not learning a new language —
you're adding an optional layer of checking on top of the one you know.

## Smarter autocomplete, too

```ts
function getBlock(provider: Provider) {
  provider. // editor now suggests: getBlockNumber, getBalance, getNetwork...
}
```

Once a value has a known type, your editor can tell you exactly what's
actually available on it — not a guess, a fact checked against that type's
real shape.

## Why this matters more in blockchain code

| Reason | Why it matters |
|---|---|
| **Money is on the line** | A wrong-type bug in transfer logic can mean real funds sent incorrectly |
| **ABIs are complex** | Smart contract calls often have many parameters, each with a specific type |
| **Caught before deploy** | TypeScript flags mismatches on your machine — not after the code is already live on mainnet |

## Key terms

| Term | Meaning |
|---|---|
| Type annotation | `: string`, `: number`, etc. — tells the compiler what type a value should be |
| `tsc` | The TypeScript compiler; checks types and compiles `.ts` to `.js` |
| Superset | A language that includes everything from another language, plus more — every `.js` file is close to valid TypeScript |
| Type erasure | TypeScript's types exist only at compile time; the emitted `.js` has no trace of them |

## Lab

1. Write a plain JavaScript function with two parameters, call it with the arguments swapped, and confirm nothing complains until you actually run it.
2. Add type annotations to the same function's parameters and watch your editor flag the swapped call immediately.
3. Declare a variable with an object type and type a `.` after it to see what your editor suggests.

## Check yourself

You're ready for Lesson 21 when you can explain, in your own words, why
TypeScript is called a "superset" of JavaScript, and what actually happens
to type annotations when the code compiles to `.js`.
