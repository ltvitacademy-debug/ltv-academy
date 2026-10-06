# Lesson 17 — async/await

**Chapter 3 · Asynchronous JavaScript · Lesson 17 of 39**

## What you'll learn

- What `await` actually does to a Promise
- Rewriting a `.then()` chain as `async`/`await`
- The two hard rules: `await` needs `async`, and `async` always returns a Promise
- Why awaiting independent calls one by one is slower than it needs to be

## Same promise, different syntax

```js
async function getBlock() {
  const block = await getBlockNumber;
  console.log("Block:", block);
}
```

`await` pauses execution of **that function** (not the whole program) until
the promise it's awaiting settles, then unwraps its resolved value directly
— no `.then()` callback required.

## Rewriting the flat chain

```js
async function loadFeed(id) {
  const user = await getUser(id);
  const balance = await getBalance(user.address);
  const txs = await getTransactions(balance.account);
  render(txs);
}
```

Compare this to the `.then()` chain from Lesson 16 doing the same job. Each
step here is its own line, assigned to a plain variable, reading top to
bottom in the exact order it executes — the asynchronous version of
ordinary synchronous code.

## Two rules

| Rule | What it means |
|---|---|
| `await` needs `async` | `await` is only valid inside a function declared `async` (or at a module's top level) |
| `async` always returns a Promise | Even a plain `return 5` inside an `async` function gets wrapped in a resolved promise automatically |

## Still promises underneath

```js
async function getBlock() {
  return 18_245_990;
}

getBlock().then((b) => console.log(b)); // 18245990
```

`async`/`await` is **syntax sugar over Promises**, not a separate
mechanism. An `async` function's return value is always a Promise — you can
still `.then()` it — which is why mixing `await` and `.then()` in the same
codebase works without conflict.

## Running independent awaits concurrently

```js
async function loadAll() {
  const [b1, b2, b3] = await Promise.all([
    getBalance(a1), getBalance(a2), getBalance(a3)
  ]);
}
```

Awaiting three independent calls one after another (`await a(); await b(); await c();`)
runs them in **sequence**, each waiting for the last, even when nothing
requires that order. Wrapping them in `Promise.all` and awaiting that one
promise still runs all three **concurrently**.

## Key terms

| Term | Meaning |
|---|---|
| `await` | Pauses an `async` function until a promise settles, then returns its resolved value |
| `async function` | A function that always returns a Promise and may use `await` inside it |
| Syntax sugar | Different syntax for the same underlying mechanism — here, Promises |

## Lab

1. Rewrite the `Promise.all` balance example from Lesson 16 using `async`/`await`.
2. Write an `async` function with no explicit `return`, then log what calling it and `.then()`-ing the result produces.
3. Time (with `console.time`/`console.timeEnd`) three awaited calls run one-by-one versus the same three run through `Promise.all`.

## Check yourself

You're ready for Lesson 18 when you can explain why `await a(); await b();`
is slower than `await Promise.all([a(), b()])` when `a` and `b` don't depend
on each other — and why `await` on its own, outside an `async` function, is
a syntax error.
