# Lesson 15 — Callbacks

**Chapter 3 · Asynchronous JavaScript · Lesson 15 of 39**

## What you'll learn

- What a callback actually is: a function passed into another function
- Node's error-first callback convention
- Why nesting dependent callbacks leads to "callback hell"
- The three concrete problems that motivate Promises (next lesson)

## A function passed into a function

```js
function greetLater(name, callback) {
  setTimeout(() => {
    callback(`Hello, ${name}!`);
  }, 1000);
}

greetLater("Ava", (message) => console.log(message));
```

A **callback** is just a regular function, handed to another function as an
argument, to be invoked later once that function's work finishes. There's no
special syntax — any function can be passed around and called by whoever
received it.

## The Node.js convention: error-first

```js
const fs = require("fs");

fs.readFile("wallet.json", "utf8", (err, data) => {
  if (err) return console.error("Failed:", err);
  console.log("Wallet data:", data);
});
```

Node's built-in APIs standardized on **error-first callbacks**: the first
parameter is always an error (or `null` if none occurred), and the second is
the actual result. Checking `err` before touching `data` is the rule, not
the exception — skipping it is a common source of bugs.

## When steps depend on each other

```js
getUser(id, (user) => {
  getBalance(user.address, (balance) => {
    getTransactions(balance.account, (txs) => {
      render(txs);
    });
  });
});
```

Each step here needs the result of the one before it, so each callback is
nested inside the last. This works, but it doesn't scale well.

## Three problems — "callback hell"

| Problem | Why it hurts |
|---|---|
| **Nesting** | Every dependent step indents one level further right |
| **Error handling** | Must be repeated at every single level, since any step can fail independently |
| **Reuse** | A step locked inside another function's callback is awkward to pull out, test, or reuse on its own |

These three problems — not callbacks themselves — are what the next two
lessons' patterns (Promises, then `async`/`await`) were built to solve.
Callbacks are still everywhere in JavaScript (event listeners, older Node
APIs), so recognizing the pattern matters even as you move to cleaner tools.

## Key terms

| Term | Meaning |
|---|---|
| Callback | A function passed as an argument, to be called later by the receiving function |
| Error-first callback | Node's convention: `(err, data) => {}` — always check `err` first |
| Callback hell | Deeply nested callbacks caused by chaining dependent asynchronous steps |

## Lab

1. Write a function `fetchNumber(callback)` that uses `setTimeout` to call `callback` with a random number after 500ms.
2. Chain three calls to a callback-based function where each result depends on the previous one, and count how many levels of nesting you end up with.
3. Rewrite the error-first `fs.readFile` example to log a friendly message instead of the raw error object when `err` is truthy.

## Check yourself

You're ready for Lesson 16 when you can name, from memory, the three
concrete problems with deeply nested callbacks — and explain what "error-first"
means in a Node.js callback.
