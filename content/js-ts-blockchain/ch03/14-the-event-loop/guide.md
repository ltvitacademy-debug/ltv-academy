# Lesson 14 — The Event Loop

**Chapter 3 · Asynchronous JavaScript · Lesson 14 of 39**

## What you'll learn

- Why `setTimeout(fn, 0)` doesn't run immediately
- The call stack, Web APIs, and the task queue — the three moving parts
- Why Promise callbacks (microtasks) always run before `setTimeout` callbacks (macrotasks)
- Why one slow synchronous function can freeze an entire page

## Guess the order

```js
console.log("one");
setTimeout(() => console.log("two"), 0);
console.log("three");

// logs: one, three, two
```

Most people guess `one, two, three`. The real output is `one, three, two`.
Even with a 0ms delay, `setTimeout`'s callback never runs until **every** line
of synchronous code currently running has finished — no exceptions.

## The four pieces

| Piece | Role |
|---|---|
| **Call stack** | Where your synchronous code actually executes, one frame at a time |
| **Web APIs** | Browser/Node machinery that runs `setTimeout`, `fetch`, timers, etc. outside the JS engine |
| **Task queue** | Where finished callbacks wait their turn to run |
| **Event loop** | Continuously checks: is the call stack empty? If yes, pull the next task off the queue |

JavaScript itself is **single-threaded** — only one call stack, one thing
running at a time. Everything "asynchronous" is really: hand the work to
something outside the JS engine, then come back to it later via the queue.

## Two queues, not one

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

// logs: A, D, C, B
```

There's a second, higher-priority queue: the **microtask queue**, which is
where resolved Promise callbacks (`.then`, `async/await` continuations) go.
The event loop always drains the **entire** microtask queue before it takes
even one task off the regular task queue. That's why `C` (a microtask) beats
`B` (a macrotask), even though `B` was scheduled first.

## Why this matters: blocking code

```js
function expensiveLoop() {
  for (let i = 0; i < 5_000_000_000; i++) {}
  console.log("done");
}
// freezes the page — the call stack never empties
```

Because there's only one call stack, a single long-running synchronous
function blocks *everything* — timers, network callbacks, clicks, rendering —
until it finishes. This is exactly the problem asynchronous patterns (which
the rest of this chapter covers) exist to avoid: never tie up the one call
stack with slow work you don't have to.

## Key terms

| Term | Meaning |
|---|---|
| Call stack | Where synchronous JS actually runs, one function frame at a time |
| Task queue (macrotask queue) | Where `setTimeout`/`setInterval`/I/O callbacks wait |
| Microtask queue | Higher-priority queue for resolved Promise callbacks; fully drained before each macrotask |
| Event loop | The mechanism that moves queued callbacks onto the stack once it's empty |
| Single-threaded | JavaScript runs one call stack at a time — no true parallel execution of your code |

## Lab

1. Paste the first code block into a browser console or Node REPL and confirm the actual output order.
2. Add a second `setTimeout` and a second `Promise.resolve().then(...)` to the second example — predict the order, then run it to check.
3. Replace the `expensiveLoop` body with a loop to `100_000_000` and time how long the page is unresponsive.

## Check yourself

You're ready for Lesson 15 when you can explain, without looking back, why
`console.log("A"); setTimeout(() => console.log("B")); Promise.resolve().then(() => console.log("C")); console.log("D");`
prints `A, D, C, B` — not some other order.
