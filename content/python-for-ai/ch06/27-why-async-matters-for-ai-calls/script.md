# Lesson 27 — Why Async Matters for AI Calls · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every AI API call you've made so far in this course has been synchronous —
your program stops dead, waits for the response, then moves on. That's fine
for one call. It falls apart the moment you need ten.

## S2 · CODE: The synchronous bottleneck

time dot sleep here stands in for a real network wait — sending bytes to a
provider, waiting for the model to generate a response, getting bytes back.
Python has nothing useful to do during that second. It just waits.

## S3 · CODE: Three calls, one at a time

Call three calls back to back and you get three full seconds, guaranteed.
Call two never starts until call one is completely finished, even though
call one spent its whole second doing nothing but waiting.

## S4 · STEPS: Why this is fixable

This is the key distinction. CPU-bound work, like crunching numbers, keeps
the processor busy — async can't help there. I/O-bound work, like waiting
on a network response, leaves the CPU sitting idle. That idle time is
exactly what async is built to exploit.

## S5 · STEPS: What async buys you

Instead of blocking on request one, you start it and immediately start
requests two and three as well. All three wait in flight together, and all
three finish around the same time — roughly one second total, not three.

## S6 · OUTRO CARD

Async won't make a single call faster — it lets you overlap multiple slow
calls instead of serializing them. Next lesson: the async and await
keywords that actually make that overlap happen.
