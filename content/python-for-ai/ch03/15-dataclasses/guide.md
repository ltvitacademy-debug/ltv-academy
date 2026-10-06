# Dataclasses

**Chapter 3 · Object-Oriented Python · Lesson 15 of 37**

Plenty of classes you'll write exist purely to hold a bundle of related values — an API configuration, a parsed response, a request payload. Writing `__init__`, `__repr__`, and `__eq__ ` by hand for each one is repetitive. Python's `@dataclass` decorator writes that boilerplate for you.

## What you'll learn

- What `@dataclass` generates automatically
- Declaring fields with type annotations and default values
- How dataclass equality (`==`) differs from a plain class's
- `frozen=True` for immutable, read-only instances

## Without `@dataclass`

A plain class holding configuration needs you to hand-write `__init__`, and printing an instance gives an unhelpful default representation:

```python
class APIConfigPlain:
    def __init__(self, api_key, base_url):
        self.api_key = api_key
        self.base_url = base_url

print(APIConfigPlain("sk-123", "https://api.example.com"))
# <__main__.APIConfigPlain object at 0x7f...>
```

## With `@dataclass`

Add `@dataclass` above the class, declare each field as `name: type`, and Python writes `__init__`, a readable `__repr__`, and `__eq__` for you.

```python
from dataclasses import dataclass

@dataclass
class APIConfig:
    api_key: str
    base_url: str = "https://api.example.com"
    timeout: int = 30

cfg = APIConfig(api_key="sk-123")
print(cfg)
# APIConfig(api_key='sk-123', base_url='https://api.example.com', timeout=30)
```

`base_url` and `timeout` have default values, so they're optional when constructing an instance — only `api_key` (no default) is required. The generated `__repr__` prints every field by name, which is far more useful for debugging than the plain class's output above.

## Equality compares values, not identity

A plain class's `==` checks whether two variables point at the exact same object. A dataclass's generated `__eq__` instead compares field values.

```python
cfg2 = APIConfig(api_key="sk-123")
print(cfg == cfg2)
# True — same field values, even though they're two separate objects
```

This matters constantly when testing: you can build an expected result and assert it equals the actual one without writing a custom comparison.

## Making an instance read-only with `frozen=True`

Pass `frozen=True` to the decorator, and attempting to change a field after construction raises an error — handy for values that should never be mutated once created, like an immutable configuration object.

```python
@dataclass(frozen=True)
class Point:
    x: int
    y: int

p = Point(1, 2)
p.x = 5
# dataclasses.FrozenInstanceError: cannot assign to field 'x'
```

## When to reach for a dataclass

Use a dataclass when a class's job is mainly to hold and move around structured data — a configuration, a parsed API response, a record from a file. Use a regular class (Lessons 13–14) when the class needs significant custom behavior beyond `__init__`, printing, and equality.

## Recap

- `@dataclass` auto-generates `__init__`, `__repr__`, and `__eq__` from annotated fields.
- Fields without a default are required; fields with a default are optional, and must come after required ones.
- Dataclass equality compares field values, not object identity.
- `@dataclass(frozen=True)` makes instances immutable after construction.
- Next lesson: why this all matters specifically for AI SDKs.
