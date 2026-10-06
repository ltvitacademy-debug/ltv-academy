# Lesson 12 — Array Methods: map, filter & reduce

**Chapter 2 · Modern JavaScript · Lesson 12 of 39**

## What you'll learn

- `.map()` — transforming every element of an array into something new
- `.filter()` — keeping only the elements that pass a test
- `.reduce()` — collapsing an array down into a single value
- Why these three replace most hand-written `for` loops over arrays in real, modern code

## .map(): transform every element

```js
const balances = [100n, 250n, 0n];

const formatted = balances.map((b) => `${b} wei`);
console.log(formatted); // ["100 wei", "250 wei", "0 wei"]
```

`.map()` runs a function on every element and returns a **new array** of
the results, the same length as the original. The original array is never
changed. Use it whenever you want "the same list, but each item
transformed" — exactly what formatting a list of balances for display
looks like.

## .filter(): keep only what passes

```js
const balances = [100n, 250n, 0n, 75n];

const nonZero = balances.filter((b) => b > 0n);
console.log(nonZero); // [100n, 250n, 75n]
```

`.filter()` runs a test function on every element and returns a **new
array** containing only the elements where that test returned `true`. The
result can be shorter than the original — or even empty, if nothing
passes.

## .reduce(): collapse to one value

```js
const balances = [100n, 250n, 75n];

const total = balances.reduce((sum, b) => sum + b, 0n);
console.log(total); // 425n
```

`.reduce()` is the one that trips people up first. It walks the array,
carrying an **accumulator** forward from one element to the next, and
returns a single final value. The second argument to `.reduce()` (`0n`
here) is the accumulator's starting value. On each step, the function
receives the accumulator so far and the current element, and returns the
new accumulator for the next step.

## Chaining them together

```js
const transactions = [
  { to: "0xAb12...", value: 100n },
  { to: "0xCd34...", value: 0n },
  { to: "0xEf56...", value: 250n },
];

const total = transactions
  .filter((tx) => tx.value > 0n)
  .map((tx) => tx.value)
  .reduce((sum, v) => sum + v, 0n);

console.log(total); // 350n
```

These three chain naturally: filter down to what matters, map to pull out
just the field you need, reduce to a single total. This exact pattern —
filter, then map, then reduce over a list of transactions — is close to
what real blockchain code does constantly when summarizing on-chain data.

## Key terms

| Term | Meaning |
|---|---|
| `.map()` | Transforms every element, returns a new array of the same length |
| `.filter()` | Keeps only elements passing a test, returns a new (possibly shorter) array |
| `.reduce()` | Collapses an array into one value by carrying an accumulator forward |

## Check yourself

You're ready for Lesson 13 when you can chain `.filter()`, `.map()`, and
`.reduce()` together on one array to answer a single question about its
contents, in one expression.
