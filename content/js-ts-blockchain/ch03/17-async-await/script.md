# Lesson 17 — async/await · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Promises fixed the nesting problem, but then chains still read differently
from normal code. async and await are syntax sugar on top of the exact same
promises, designed to make asynchronous code read top to bottom, like
ordinary synchronous code does.

## S2 · CODE CARD (SVG: async function getBlock with await)

The await keyword pauses execution of the function it's in — not the whole
program, just that function — until the promise it's awaiting settles. Once
it resolves, await unwraps the value directly, no then callback needed.
Here, getBlock reads almost like a plain synchronous function, even though
getBlockNumber is genuinely asynchronous underneath.

## S3 · CODE CARD (SVG: loadFeed with three sequential awaits)

Compare this to last lesson's flat promise chain doing the exact same job:
get the user, then the balance, then the transactions, then render. With
await, each step is just its own line, assigned to a plain variable,
reading in the exact order it actually executes.

## S4 · STEPS CARD (SVG: await needs async / async always returns a Promise)

Two rules make this work. First, await is only valid inside a function
marked async — or at the top level of a module. Try using it anywhere else
and you'll get a syntax error. Second, an async function always returns a
promise, no matter what you return inside it.

## S5 · CODE CARD (SVG: async function returning a plain value, then .then())

That second rule matters because it proves async and await aren't some
separate new mechanism — they're still promises underneath. Here, getBlock
just returns a plain number, but calling it still gives you back a promise,
which you can still chain a then onto if you wanted to. async slash await
is sugar over the exact machinery from the last lesson, not a replacement
for it.

## S6 · CODE CARD (SVG: Promise.all with await, three balances)

One easy mistake: if you await three independent calls one after another,
they run in sequence, each waiting for the last to finish, even though
nothing requires that order. Wrap them in Promise.all instead, and await
that single promise — all three still run concurrently, and you get all
three results back together.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

That's async and await: the same promises, written to read like
synchronous code. One thing we deliberately skipped — what actually happens
when an awaited promise rejects. That's next lesson: error handling in
async code.
