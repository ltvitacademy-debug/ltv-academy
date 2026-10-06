# Lesson 15 — Callbacks · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Now that we understand the event loop, let's look at the oldest, most
direct way JavaScript developers write asynchronous code: callbacks. If
you've touched any JavaScript before this course, you've already used one,
maybe without the name.

## S2 · CODE CARD (SVG: greetLater callback example)

A callback is nothing exotic — it's just a regular function, passed as an
argument into another function, to be called later once that function's
work is done. Here, greetLater takes a name and a callback. A second from
now, it builds the greeting and hands it to whatever function was passed
in. The caller decides what happens with the result; greetLater just
promises to call it eventually.

## S3 · CODE CARD (SVG: error-first fs.readFile example)

Node's built-in APIs standardized this into a convention you'll see
constantly: error-first callbacks. The callback's first parameter is always
reserved for an error, or null if nothing went wrong. Here, reading a file
hands back err and data — and the very first thing good code does is check
err before touching data at all.

## S4 · CODE CARD (SVG: nested getUser/getBalance/getTransactions)

The trouble starts when steps depend on each other. Get the user, then use
that user to get a balance, then use that balance to get transactions, then
render them. Each step can only start once the previous callback fires, so
each one gets nested one level deeper inside the last.

## S5 · STEPS CARD (SVG: Nesting / Error Handling / Hard to Reuse)

Developers eventually just called this callback hell, for three concrete
reasons. The nesting creeps further right with every step, which gets
unreadable fast. Error handling has to be repeated at every single level,
since each callback can fail independently. And because each step is locked
inside the one before it, pulling a step out to reuse or test on its own is
awkward at best.

## S6 · OUTRO CARD (SVG: next lesson, LTV seal)

Callbacks aren't wrong — they're still everywhere, especially in older Node
APIs and event listeners. But that nesting problem is exactly what the next
pattern was built to fix. Next lesson: Promises — a proper object for
representing a value that isn't ready yet, and a much flatter way to chain
steps together.
