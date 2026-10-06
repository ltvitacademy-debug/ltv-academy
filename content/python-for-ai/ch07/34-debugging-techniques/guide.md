# Debugging Techniques

**Chapter 7 · Testing & Code Quality · Lesson 34 of 37**

Tests, type hints, and linting catch a huge share of bugs — but not all of them. This lesson, closing out the chapter, covers what to actually do once something is broken: reading a traceback properly, breakpoints, and a couple of habits that make debugging AI-calling code specifically less painful.

## What you'll learn

- How to read a Python traceback from the bottom up
- Using `breakpoint()` to pause execution and inspect state interactively
- `print()` debugging, done deliberately instead of scattered everywhere
- A specific trap when debugging async code

## Reading a traceback

```
Traceback (most recent call last):
  File "main.py", line 12, in <module>
    result = process(data)
  File "main.py", line 7, in process
    return data["respones"]["text"]
KeyError: 'respones'
```

Read tracebacks **bottom to top**. The last line is the actual error: a `KeyError` because the code looked up `"respones"` — a typo for `"response"`. The lines above show the call stack that got you there — `process()` was called from line 12, and the failure happened inside it on line 7. The bottom line almost always tells you what's wrong; the lines above tell you where.

## breakpoint(): pause and inspect

```python
def process(data):
    breakpoint()
    return data["response"]["text"]
```

Dropping `breakpoint()` into your code pauses execution right there and opens `pdb`, Python's interactive debugger, in your terminal. From that prompt you can type `data` to see its actual value, `data.keys()` to check what's really in it, `n` to step to the next line, or `c` to continue running. This beats guessing what a variable contains from the error message alone.

## print() debugging, with intent

```python
print(f"DEBUG: data keys = {list(data.keys())}")
result = process(data)
print(f"DEBUG: result = {result!r}")
```

`print()` debugging still works and is often the fastest first move — the trick is being deliberate: a clear `DEBUG:` prefix so the lines are easy to find and delete later, and printing exactly the value you're unsure about (`list(data.keys())`, not the whole object dumped blindly).

## The async-specific trap

```python
async def fetch_and_process(prompt):
    result = call_api(prompt)     # missing await!
    print(result)
    # <coroutine object call_api at 0x...> — not the actual response
```

The single most common async bug: forgetting `await` doesn't raise an error — it just silently hands you a coroutine object instead of a result. If a debugging session turns up a variable that looks like `<coroutine object ...>` instead of the value you expected, check for a missing `await` first.

## Recap

- Read a traceback from the bottom up: the last line is the error, the lines above are the call stack that led there.
- `breakpoint()` pauses execution and opens `pdb`, letting you inspect real variable values interactively.
- `print()` debugging works best with a clear prefix and a targeted value, not a wall of output.
- A variable that prints as `<coroutine object ...>` almost always means a missing `await`.
- Next chapter: the capstone — building a real Python CLI tool that calls an API, using everything from this course.
