# Lesson 29 — asyncio Fundamentals · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Async and await are the syntax. asyncio is the standard library engine that
actually schedules and runs coroutines. This lesson covers the event loop,
asyncio dot run, and create underscore task — the three pieces you'll use
in nearly every async script you write.

## S2 · CODE: asyncio.run(), the entry point

asyncio dot run creates an event loop, runs the coroutine you give it to
completion, then closes that loop. It's meant to be called once, at the
top level of your program. Notice asyncio dot sleep here — that's the
async-friendly version of time dot sleep, safe to await.

## S3 · STEPS: The event loop, in plain terms

The event loop is a single-threaded scheduler. When a coroutine hits an
await on something slow, the loop sets it aside and runs another waiting
coroutine instead of sitting idle. When the slow thing finishes, the loop
comes back and resumes it. Still one thread — but the waiting overlaps.

## S4 · CODE: await alone is still sequential

Here's a common surprise. Two awaits back to back still wait fully for
each one before starting the next — this takes two full seconds, not one.
await by itself doesn't create concurrency; it only lets other tasks run
during a wait, if any actually exist yet.

## S5 · CODE: create_task(), actually concurrent

asyncio dot create underscore task is what starts a coroutine running in
the background immediately, handing you back a task object to await later.
Both sleeps here start at the same moment, so the two awaits just wait for
results already in flight — about one second total, not two.

## S6 · OUTRO CARD

Run, event loop, create task — that's the full toolkit. Next lesson:
applying this exact create-task pattern to call several real AI APIs at
once instead of one after another.
