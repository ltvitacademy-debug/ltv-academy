# Lesson 28 — async/await Basics · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Two keywords turn an ordinary Python function into one that can pause on a
slow operation and let other work happen in the meantime: async and await.
This lesson covers the syntax, before next lesson wires it up to the real
event loop.

## S2 · CODE: Defining a coroutine function

Adding async in front of def changes what calling this function produces.
A normal function runs immediately. Calling an async def function does not
run the body at all — it hands you back a coroutine object, a paused task
description that hasn't started yet.

## S3 · STEPS: The most common mistake

This trips up almost everyone the first time. Calling fetch underscore
response by itself just creates that paused coroutine object — nothing
runs, nothing prints. You have to await it to actually execute the body
and get the real result back.

## S4 · CODE: Actually running it, await

await is what runs a coroutine and pauses until it completes. Notice await
only appears inside another async def function — here, main. That's why
you can't just sprinkle await into a normal script; you start the whole
thing with asyncio dot run, which the next lesson covers.

## S5 · STEPS: One rule to remember

await is only legal inside an async def function. Try to use it at the top
level of a plain script and Python throws a syntax error immediately — that
restriction is exactly why async code needs its own entry point.

## S6 · OUTRO CARD

async def defines a coroutine, await runs one. Next lesson: asyncio itself
— asyncio dot run, tasks, and the event loop that's actually making all of
this work underneath.
