# async/await Basics

**Chapter 6 · Async Python for AI Workloads · Lesson 28 of 37**

Two keywords turn an ordinary Python function into one that can pause on a slow operation and let other work happen in the meantime: `async` and `await`. This lesson covers their syntax in isolation, before Lesson 29 wires them up to Python's actual event loop.

## What you'll learn

- How `async def` creates a coroutine function instead of a regular function
- What `await` actually does, and why you can only use it inside an `async def`
- Why calling a coroutine function doesn't run it — and what to do instead
- The most common beginner mistake with these two keywords

## Defining a coroutine function

```python
async def fetch_response(prompt):
    print(f"sending: {prompt}")
    return f"response to: {prompt}"
```

Adding `async` in front of `def` changes what calling this function produces. A normal function call runs the body immediately. Calling an `async def` function does *not* run the body — it returns a **coroutine object**, a paused, not-yet-started task description.

```python
result = fetch_response("hello")
print(result)
# <coroutine object fetch_response at 0x...>
```

That's the single most common beginner mistake: calling a coroutine function expecting the return value, and getting a coroutine object instead. Nothing printed "sending: hello" either — the body never ran.

## Actually running it: `await`

```python
import asyncio

async def main():
    result = await fetch_response("hello")
    print(result)

asyncio.run(main())
# sending: hello
# response to: hello
```

`await` is what actually runs a coroutine and pauses until it completes. `await` can only appear inside another `async def` function — you can't use it at the top level of a normal script, which is why `main()` itself has to be a coroutine, started with `asyncio.run()` (the subject of the next lesson).

## Why this matters for AI calls

`await` is the point where Python can hand control to something else while the awaited thing is slow (like waiting on a network response). It's the mechanism, not just syntax — it's literally the "pause here and let other work happen" instruction.

## Recap

- `async def` defines a coroutine function; calling it returns a coroutine object, it does not run the body.
- `await` runs a coroutine and pauses the enclosing coroutine until it finishes.
- `await` is only legal inside another `async def` function.
- The most common mistake: calling a coroutine function and forgetting to `await` it.
- Next lesson: `asyncio` itself — `asyncio.run()`, tasks, and the event loop that makes all of this work.
