# Lesson 30 — Calling Multiple AI APIs Concurrently · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

This is the payoff for the whole chapter. Back in lesson twenty-seven,
three sequential API calls took three seconds. Here's the concurrent
version of that same idea, using asyncio dot gather — the standard way to
run several coroutines together.

## S2 · CODE: The concurrent rewrite

gather takes any number of coroutines, starts them all at once, and
returns their results as a list once every one of them is done. Three
calls that used to take three seconds in sequence now overlap and finish
in around one second total.

## S3 · STEPS: What gather() guarantees

Two things matter here. Every coroutine you hand to gather starts
concurrently — nothing waits in line. And the results come back in the
exact order you passed the coroutines in, even if a later call happens to
finish before an earlier one.

## S4 · STEPS: Why not requests here

requests is synchronous — calling requests dot get inside an async
function still blocks, and it stalls the entire event loop for every other
coroutine too. Async code needs an async-aware client instead, like httpx
dot AsyncClient or aiohttp, both of which you can actually await.

## S5 · CODE: One failure shouldn't cancel the rest

By default, gather cancels every other call the moment one of them raises
an exception. Pass return underscore exceptions equals True, and failed
calls come back as exception objects sitting right there in the results
list instead — one bad response doesn't take down the whole batch.

## S6 · OUTRO CARD

gather, an async HTTP client, and return exceptions — that's concurrent AI
calling in Python. Next chapter: Testing and Code Quality, starting with
writing basic unit tests for code exactly like this.
