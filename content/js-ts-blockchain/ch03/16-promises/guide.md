# Lesson 16 — Promises

**Chapter 3 · Asynchronous JavaScript · Lesson 16 of 39**

## What you'll learn

- The three states of a Promise, and why it can only ever settle once
- How to create a Promise with `resolve`/`reject`
- Consuming one with `.then()`, `.catch()`, and `.finally()`
- Chaining dependent steps flat instead of nesting them
- Running independent promises concurrently with `Promise.all`

## Three states

| State | Meaning |
|---|---|
| **Pending** | The work hasn't finished yet |
| **Fulfilled** | Succeeded — holds a resolved value |
| **Rejected** | Failed — holds a reason (usually an `Error`) |

A Promise moves from pending to **exactly one** of fulfilled or rejected,
and once it settles there, it can never change state again.

## Creating a Promise

```js
const getBlockNumber = new Promise((resolve, reject) => {
  setTimeout(() => {
    const ok = true;
    ok ? resolve(18_245_990) : reject(new Error("RPC timeout"));
  }, 1000);
});
```

The `Promise` constructor takes a function with two parameters: call
`resolve(value)` to fulfill it, or `reject(error)` to reject it.

## Consuming a Promise

```js
getBlockNumber
  .then((block) => console.log("Block:", block))
  .catch((err) => console.error("Failed:", err.message))
  .finally(() => console.log("Done checking."));
```

- `.then()` runs on fulfillment, receiving the resolved value.
- `.catch()` runs on rejection, receiving the error.
- `.finally()` always runs, regardless of outcome — ideal for cleanup.

## Flat chains instead of nested pyramids

```js
getUser(id)
  .then((user) => getBalance(user.address))
  .then((balance) => getTransactions(balance.account))
  .then((txs) => render(txs))
  .catch((err) => console.error("Pipeline failed:", err));
```

Each `.then()` returns a **new** promise, so dependent steps chain in a
flat, readable line instead of nesting one level deeper per step — and a
single `.catch()` at the end covers failures from *any* step in the chain.

## Running several at once

```js
Promise.all([getBalance(a1), getBalance(a2), getBalance(a3)])
  .then(([b1, b2, b3]) => console.log(b1, b2, b3))
  .catch((err) => console.error("One of them failed:", err));
```

When steps **don't** depend on each other, `Promise.all` runs them
concurrently and resolves once every one has fulfilled — or rejects
immediately the moment any single one fails.

## Key terms

| Term | Meaning |
|---|---|
| Promise | An object representing a value that will be available later, in one of three states |
| Settle | A promise moving to fulfilled or rejected — permanent once it happens |
| `.then()` / `.catch()` / `.finally()` | Handlers for success, failure, and "either way" cleanup |
| `Promise.all` | Runs multiple promises concurrently, resolving when all fulfill or rejecting on the first failure |

## Lab

1. Write a Promise-returning function `rollDice()` that resolves with a random number 1-6 after 500ms.
2. Chain three `.then()` calls that each log and transform the previous result, ending in one `.catch()`.
3. Call three independent Promise-returning functions with `Promise.all` and log all three results together.

## Check yourself

You're ready for Lesson 17 when you can explain why a `.then()` chain
doesn't nest the way callbacks did, and what `Promise.all` does differently
from chaining `.then()` calls one after another.
