# Lesson 6 — Arrays & Objects

**Chapter 1 · Programming Fundamentals Through JavaScript · Lesson 6 of 39**

## What you'll learn

- Arrays: ordered lists, indexed from zero, with `.push()` and `.length`
- Objects: unordered key-value collections, accessed by dot or bracket notation
- How to nest arrays and objects inside each other — the shape almost all real blockchain data actually arrives in
- What happens when you access a property that doesn't exist

## Arrays: ordered lists

```js
const wallets = ["0xAb12...", "0xCd34...", "0xEf56..."];

console.log(wallets[0]);     // "0xAb12..." -- indexes start at 0
console.log(wallets.length); // 3

wallets.push("0x9988...");   // adds to the end
console.log(wallets.length); // 4
```

An array is an ordered list. The first element is always at index `0`, not
`1` — a detail that trips up every beginner at least once. `.length` tells
you how many elements it holds; `.push()` adds one more to the end.

## Objects: key-value collections

```js
const transaction = {
  from: "0xAb12...",
  to: "0xCd34...",
  value: 1500000000000000000n,
};

console.log(transaction.from);       // dot notation
console.log(transaction["to"]);      // bracket notation -- same result
```

An object holds named properties instead of numbered positions. Dot
notation (`transaction.from`) is the common style; bracket notation
(`transaction["from"]`) is required when the property name is stored in a
variable or contains characters dot notation can't express.

## Nesting: how real data actually looks

```js
const block = {
  number: 18500000,
  transactions: [
    { from: "0xAb12...", to: "0xCd34...", value: 100n },
    { from: "0xEf56...", to: "0x9988...", value: 250n },
  ],
};

console.log(block.transactions[0].to); // "0xCd34..."
console.log(block.transactions.length); // 2
```

Real blockchain data is almost never a single flat value — it's an object
(a block) containing an array (its transactions), where each item in that
array is itself an object. Reading `block.transactions[0].to` chains
property access and array indexing together, and that chaining pattern
shows up constantly once Chapter 5 starts working with real contract data.

## Accessing a property that doesn't exist

```js
console.log(transaction.gasPrice); // undefined -- no error thrown
```

Unlike many languages, accessing a missing property doesn't throw an error
— it quietly returns `undefined`. That's forgiving, but it also means a
typo in a property name fails silently instead of loudly, so it's worth
double-checking property names when something unexpectedly reads as
`undefined`.

## Key terms

| Term | Meaning |
|---|---|
| Index | An array position, counting from `0` |
| Property | A named value stored on an object |
| Nesting | An array or object containing another array or object inside it |

## Check yourself

You're ready for Lesson 7 when you can read a value two levels deep out of
a nested object/array structure, like `block.transactions[0].to`.
