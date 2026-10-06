# Calling Multiple AI APIs Concurrently

**Chapter 6 · Async Python for AI Workloads · Lesson 30 of 37**

This is the payoff for the whole chapter: taking the sequential, three-second example from Lesson 27 and turning it into a concurrent version that finishes in roughly one second. The tool for this is `asyncio.gather()`, the standard way to run several coroutines together and collect all their results.

## What you'll learn

- `asyncio.gather()` — running several coroutines concurrently and collecting ordered results
- Rewriting Chapter 5's `requests`-based calls as async-friendly coroutines
- Why a real async HTTP client (`httpx` or `aiohttp`) is needed, not `requests` itself
- How to handle one call failing without the rest being cancelled

## The concurrent rewrite

```python
import asyncio
import httpx

async def call_api(client, prompt):
    resp = await client.post("https://api.example.com/v1/complete",
                              json={"prompt": prompt})
    return resp.json()["text"]

async def main():
    prompts = ["summarize doc 1", "summarize doc 2", "summarize doc 3"]
    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(*(call_api(client, p) for p in prompts))
    return results

asyncio.run(main())
# all three calls in flight together — ~1s total, not ~3s
```

`asyncio.gather(*coroutines)` takes any number of coroutines (or tasks), runs them all concurrently, and returns their results as a list — **in the same order you passed them in**, even though they may finish in a different order.

## Why not `requests` here?

`requests` is a synchronous library: calling `requests.get()` always blocks, even inside an `async def` function, which would stall the entire event loop for everyone. Async code needs an async-aware HTTP client — `httpx.AsyncClient` (shown above) or `aiohttp` are the two standard choices, and both expose an `await`-able `.post()`/`.get()`.

## Handling one failure without losing the rest

```python
async def main():
    prompts = ["doc 1", "doc 2", "doc 3"]
    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(
            *(call_api(client, p) for p in prompts),
            return_exceptions=True,
        )
    for prompt, result in zip(prompts, results):
        if isinstance(result, Exception):
            print(f"{prompt} failed: {result}")
        else:
            print(f"{prompt}: {result}")
```

By default, `asyncio.gather()` cancels every other call the moment one raises an exception. Passing `return_exceptions=True` changes that: failed calls come back as exception objects sitting in the results list instead, so one bad API response doesn't take down the other nine.

## Recap

- `asyncio.gather(*coroutines)` runs several coroutines concurrently and returns results in the original order.
- `requests` blocks the event loop even inside async code — use an async HTTP client like `httpx.AsyncClient` instead.
- By default, one failed call cancels the rest of the batch under `gather()`.
- `return_exceptions=True` lets the batch finish even if some calls fail, returning exceptions in place of results.
- Next chapter: testing and code quality — starting with writing basic unit tests for code like this.
