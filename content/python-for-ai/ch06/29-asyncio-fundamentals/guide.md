# asyncio Fundamentals

**Chapter 6 · Async Python for AI Workloads · Lesson 29 of 37**

`async` and `await` are the syntax. `asyncio` is the standard-library engine that actually schedules and runs coroutines — the event loop, `asyncio.run()`, and `asyncio.create_task()`. This lesson covers the three pieces you'll use in nearly every async script you write.

## What you'll learn

- `asyncio.run()` — the standard entry point for an async program
- What the event loop actually is, in plain terms
- `asyncio.create_task()` — starting a coroutine without immediately awaiting it
- Why `create_task()` is the key to running things concurrently, not just sequentially

## asyncio.run(): the entry point

```python
import asyncio

async def main():
    print("starting")
    await asyncio.sleep(1)   # async-friendly version of time.sleep
    print("done")

asyncio.run(main())
```

`asyncio.run()` creates an event loop, runs the given coroutine to completion, then closes the loop. It's meant to be called once, at the top level of your program — everything async happens inside that one call.

## The event loop, in plain terms

The **event loop** is a single-threaded scheduler. It keeps track of every coroutine currently in flight, and whenever one hits an `await` on something slow (like `asyncio.sleep()` or a network call), the loop sets it aside and runs another waiting coroutine instead. When the slow thing finishes, the loop comes back to resume it. Nothing happens in parallel — it's all still one thread — but the *waiting* overlaps.

## await alone still runs sequentially

```python
async def main():
    await asyncio.sleep(1)
    await asyncio.sleep(1)
    print("2 seconds have passed")
```

This is a common surprise: just using `await` twice in a row still waits for each one fully before starting the next — exactly like the synchronous version. `await` on its own doesn't create concurrency; it just lets *other* tasks run during the wait, if any exist.

## create_task(): actually starting things concurrently

```python
async def main():
    task1 = asyncio.create_task(asyncio.sleep(1))
    task2 = asyncio.create_task(asyncio.sleep(1))
    await task1
    await task2
    print("~1 second has passed, not 2")
```

`asyncio.create_task()` schedules a coroutine to start running *now*, in the background, and hands back a `Task` object you can `await` later. Both sleeps start immediately, run concurrently, and the two `await` calls just wait for results that are already in flight — which is exactly what Lesson 30 does with real API calls.

## Recap

- `asyncio.run()` is the standard entry point — it creates the event loop, runs your top-level coroutine, and closes the loop.
- The event loop is a single-threaded scheduler that overlaps waiting time across multiple coroutines.
- Chaining `await` calls back to back still runs them one after another — `await` alone isn't concurrency.
- `asyncio.create_task()` starts a coroutine running in the background immediately, which is what actually makes things concurrent.
- Next lesson: using exactly this pattern to call multiple AI APIs at once.
