# Lesson 18 — Error Handling in Async Code

**Chapter 3 · Asynchronous JavaScript · Lesson 18 of 39**

## What you'll learn

- Why a rejected promise behind `await` throws like a normal exception
- Wrapping `await` in `try`/`catch`
- The silent trap of forgetting error handling entirely
- Catching at the call site with `.catch()` as an alternative
- Three habits for handling async errors honestly

## A rejected await throws

```js
async function getBlock() {
  try {
    const block = await getBlockNumber();
    console.log("Block:", block);
  } catch (err) {
    console.error("Failed to fetch block:", err.message);
  }
}
```

When a promise behind `await` rejects, it's thrown as a normal, catchable
exception right at that line — which means ordinary `try`/`catch` handles
it exactly the way it handles any other thrown error.

## The silent trap: forgetting try/catch

```js
async function getBlock() {
  const block = await getBlockNumber(); // rejects
  console.log("Block:", block); // never runs
}

getBlock(); // UnhandledPromiseRejection — crashes in Node
```

With no `try`/`catch` and no `.catch()` anywhere, a rejection has nowhere to
go. In modern Node.js, an unhandled promise rejection **crashes the
process** — this is never silent in practice, only in the moment you wrote
the code.

## Catching at the call site instead

```js
getBlock().catch((err) => console.error("Failed:", err.message));
```

An `async` function always returns a Promise (Lesson 17), so `.catch()` on
the call works just as well as `try`/`catch` inside the function. Use
whichever location makes handling the error easiest at that point in the
code.

## One catch for several awaited steps

```js
async function loadFeed(id) {
  try {
    const user = await getUser(id);
    const balance = await getBalance(user.address);
    const txs = await getTransactions(balance.account);
    render(txs);
  } catch (err) {
    console.error("Pipeline failed at some step:", err.message);
  }
}
```

One `try`/`catch` block covers every `await` inside it — a rejection at
*any* step jumps straight to `catch`, skipping the remaining steps.

## Three habits

| Habit | Why |
|---|---|
| **Wrap every `await`** | In `try`/`catch`, or `.catch()` the call — never leave one bare |
| **Catch specific errors** | Check `err` type/message before deciding how to react, rather than treating every failure identically |
| **Never swallow silently** | An empty `catch {}` block hides real bugs instead of fixing them |

## Key terms

| Term | Meaning |
|---|---|
| Thrown rejection | A rejected promise behind `await`, surfaced as a normal catchable exception |
| Unhandled promise rejection | What happens when a rejection has no `try`/`catch` or `.catch()` anywhere — crashes modern Node |
| Call-site catch | Handling the error with `.catch()` on the function call, instead of `try`/`catch` inside it |

## Lab

1. Write an `async` function that rejects on purpose, call it with no error handling, and observe the unhandled rejection in your console/terminal.
2. Fix it two ways: with `try`/`catch` inside the function, and separately with `.catch()` at the call site.
3. Wrap three sequential `await` calls in one `try`/`catch` and confirm a rejection on the second step skips the third.

## Check yourself

You're ready for Lesson 19 when you can explain what happens to a rejected
promise behind an `await` with no `try`/`catch` anywhere, and name two valid
places to actually catch it.
