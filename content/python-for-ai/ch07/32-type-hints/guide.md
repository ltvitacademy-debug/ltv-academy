# Type Hints

**Chapter 7 · Testing & Code Quality · Lesson 32 of 37**

Python doesn't require you to declare a variable's type, and it never will — but you can optionally *annotate* one, and tools like your editor and `mypy` will use those annotations to catch mistakes before you ever run the code. This lesson covers the type-hint syntax you'll see in nearly every real-world Python/AI codebase.

## What you'll learn

- Basic type hints on function parameters and return values
- Hinting collections: `list[str]`, `dict[str, int]`
- `Optional[X]` for values that might be `None`
- Why type hints don't change runtime behavior, but still catch real bugs

## Basic hints

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    return a + b
```

`name: str` means "this parameter is expected to be a string." `-> str` means "this function returns a string." Python itself doesn't enforce any of this at runtime — you could still call `greet(42)` and it would run. The value comes from tools reading the hints.

## Hinting collections

```python
def average(numbers: list[float]) -> float:
    return sum(numbers) / len(numbers)

def count_words(text: str) -> dict[str, int]:
    counts: dict[str, int] = {}
    for word in text.split():
        counts[word] = counts.get(word, 0) + 1
    return counts
```

`list[float]` says "a list where every element is a float." `dict[str, int]` says "a dict with string keys and integer values." This is exactly the shape of data you're constantly passing around when working with AI API responses.

## Optional values

```python
from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)   # None if not found
```

`Optional[str]` means "a string, or `None`." It's shorthand for `Union[str, None]`, and it exists because `dict.get()`, and plenty of other real functions, genuinely can return `None` — the hint makes that possibility visible in the function's signature instead of a surprise three calls later.

## Why bother if Python doesn't enforce it

```
mypy my_script.py
# my_script.py:8: error: Argument 1 to "greet" has
#   incompatible type "int"; expected "str"
```

A separate tool, `mypy`, reads your type hints and checks your whole codebase for mismatches *without running it* — catching the kind of bug that would otherwise only surface when that exact line finally executes in production. Most editors also use hints live, for autocomplete and inline warnings as you type.

## Recap

- `name: str` and `-> str` annotate a parameter and return type; Python doesn't enforce them at runtime.
- `list[float]` and `dict[str, int]` hint the contents of a collection, not just its container type.
- `Optional[X]` documents that a value might be `None` — common for lookups that can fail.
- `mypy` (and most editors) read these hints to catch type mismatches before the code ever runs.
- Next lesson: linting and formatting tools — the other half of keeping a codebase clean.
