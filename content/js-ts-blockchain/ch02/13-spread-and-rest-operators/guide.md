# Lesson 13 — Spread & Rest Operators

**Chapter 2 · Modern JavaScript · Lesson 13 of 39**

## What you'll learn

- The spread operator (`...`) for expanding an array or object out
- Using spread to copy and merge arrays and objects without mutating the originals
- The rest operator — the same `...` syntax, doing the opposite job, gathering values together
- How to tell spread and rest apart, since they look identical

## Spread: expanding an array

```js
const base = [1, 2, 3];
const extended = [...base, 4, 5];

console.log(extended); // [1, 2, 3, 4, 5]
console.log(base);     // [1, 2, 3] -- unchanged
```

`...base` expands the array's elements out, in place, inside the new
array literal. This is the modern way to build a new array that includes
an existing one's contents — without mutating `base` itself, which matters
once other code might still be holding a reference to it.

## Spread: copying and merging objects

```js
const wallet = { address: "0xAb12...", balance: 100n };

const updated = { ...wallet, balance: 250n }; // copy, override one field
console.log(updated); // { address: "0xAb12...", balance: 250n }
console.log(wallet);  // { address: "0xAb12...", balance: 100n } -- unchanged
```

The same `...` syntax works on objects. `{ ...wallet, balance: 250n }`
copies every property from `wallet`, then overrides `balance` with a new
value — a one-line way to produce an updated copy of an object instead of
mutating the original, which is exactly the pattern frameworks like React
expect for state updates.

## Rest: gathering arguments together

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));    // 6
console.log(sum(1, 2, 3, 4)); // 10
```

The **rest** parameter uses the same `...` syntax but does the opposite
job: instead of expanding a collection out, it gathers any number of
individual arguments *into* a single real array (`numbers` here). This is
how a function accepts an unknown number of arguments.

## Rest inside destructuring

```js
const { address, ...rest } = { address: "0xAb12...", balance: 100n, nonce: 4 };

console.log(address); // "0xAb12..."
console.log(rest);    // { balance: 100n, nonce: 4 }
```

Rest also shows up inside destructuring: `address` is pulled out by name,
and `...rest` gathers *everything else* that wasn't explicitly
destructured into its own object.

## Telling them apart

The rule: `...` is **spread** when it appears inside an array/object
literal or a function call (expanding something out), and **rest** when it
appears in a function's parameter list or a destructuring pattern
(gathering values in).

## Key terms

| Term | Meaning |
|---|---|
| Spread | `...` expanding an array or object's contents out, in place |
| Rest | `...` gathering multiple values into one array, in a parameter list or destructuring |

## Check yourself

You're ready for Chapter 3 when you can use spread to produce an updated
copy of an object without mutating the original, and explain how rest in a
function parameter differs from spread in a function call.
