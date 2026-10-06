# Lesson 14 — The Event Loop · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Welcome to Chapter Three: Asynchronous JavaScript. We're starting with the
single most important mental model in this entire chapter — the event loop.
Once this clicks, promises and async/await stop feeling like magic and start
feeling like plumbing.

## S2 · CODE CARD (SVG: console.log order example)

Try to guess the order these three lines print before you run them. Most
people guess one, two, three. But the actual output is one, three, two. Even
though we told setTimeout to wait zero milliseconds, it still runs last. Why?
Because JavaScript finishes every line of synchronous code first, no matter
how short the delay on anything asynchronous.

## S3 · STEPS CARD (SVG: Call Stack / Web APIs / Task Queue / Event Loop)

Here's the mechanism underneath that. Your synchronous code runs on the call
stack, one line at a time. Things like setTimeout and fetch get handed off to
Web APIs outside the JavaScript engine entirely. When those finish, their
callback doesn't run immediately — it gets placed in a task queue to wait.
And the event loop's only job is to check: is the call stack completely
empty? Only then does it pull the next waiting task off the queue and run it.

## S4 · CODE CARD (SVG: microtask vs macrotask ordering)

There's actually a second queue, and it jumps the line. Promise callbacks go
into a microtask queue, which the event loop always fully drains before it
touches the task queue setTimeout uses. That's why, in this example, A and D
print first as synchronous code, then C prints before B — the promise beats
the timeout, even though the promise was scheduled second.

## S5 · CODE CARD (SVG: blocking loop example)

This is also why a single slow, synchronous function is dangerous. If
something runs a massive loop with no awaiting, no setTimeout, nothing
asynchronous at all, it occupies the call stack completely. The event loop
can't get a turn, so nothing else runs — no clicks, no renders, no timers —
until that loop finally finishes. Asynchronous patterns exist specifically to
avoid writing code like this.

## S6 · OUTRO CARD (SVG: next lesson, LTV seal)

That's the event loop: one call stack, two queues, and a loop that only
moves on when the stack is empty. Next lesson, we look at the oldest pattern
for actually writing asynchronous code with it — callbacks — and the problem
they eventually run into at scale.
