# Lesson 16 — Promises · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Last lesson ended with a nesting problem. Promises are the object
JavaScript added specifically to fix it — a proper representation of a
value that doesn't exist yet, but will, eventually, one way or another.

## S2 · STEPS CARD (SVG: Pending / Fulfilled / Rejected)

Every promise lives in exactly one of three states. It starts pending,
meaning the work isn't done yet. It can move to fulfilled, meaning it
succeeded and now holds a resolved value. Or it can move to rejected,
meaning it failed and holds a reason why. And here's the important part:
once a promise settles into fulfilled or rejected, it can never change
state again — ever.

## S3 · CODE CARD (SVG: new Promise with resolve/reject)

You create a promise with the Promise constructor, which takes a function
with two parameters: resolve and reject. Call resolve with a value to
fulfill the promise, or call reject with an error to reject it. Here, after
a second, we either resolve with a block number, or reject with a timeout
error — exactly one of those two will happen.

## S4 · CODE CARD (SVG: then/catch/finally chain)

To actually use a promise's result, you chain methods onto it. then takes a
function that runs if the promise fulfills, and receives the resolved
value. catch takes a function that runs if it rejects instead, and
receives the error. And finally runs no matter what happened — fulfilled or
rejected — which makes it perfect for cleanup work.

## S5 · CODE CARD (SVG: flat .then() chain, getUser -> getBalance -> getTransactions)

Here's where promises actually solve last lesson's problem. Each then call
returns a brand new promise, so dependent steps chain in a flat, readable
line instead of nesting deeper and deeper. Get the user, then get their
balance, then get their transactions, then render — one line per step, and
a single catch at the end covers every single one of them.

## S6 · CODE CARD (SVG: Promise.all with three balances)

And when steps don't depend on each other at all, Promise.all lets you run
several promises at the same time instead of one after another. It waits
for every promise in the array to fulfill, and hands you back their results
in the same order — or it rejects immediately the moment any single one of
them fails.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

That's Promises: three states, settled exactly once, chained flat instead
of nested, and runnable concurrently with Promise.all when steps don't
depend on each other. Next lesson, we make chains like this read even more
like ordinary, top-to-bottom code, using async and await.
