# Lesson 6 — Error Handling: try/except

**Chapter 1 · Python Fundamentals · Lesson 6 of 37**

## What you'll learn

- Why unhandled errors crash your whole program
- How `try` / `except` catches an error and keeps running
- Catching specific exception types instead of everything blindly
- `finally`, and raising your own exceptions with `raise`

## When code fails

Some failures are predictable: a network request times out, a file doesn't exist, an API key is missing. Without handling, any of these **crashes the entire program**:

```python
result = 10 / 0
# ZeroDivisionError: division by zero
# Program stops here — nothing after this line runs
```

## try / except: catching the failure

Wrap risky code in `try`; if it raises an exception, `except` catches it and the program keeps running:

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Can't divide by zero — using a default instead")
    result = 0

print("Program keeps running:", result)
```

This matters enormously for AI engineering: a single failed API call — a timeout, a rate limit, a malformed response — should never be allowed to crash an entire application.

## Catch specific exceptions, not everything

It's tempting to write a bare `except:` that catches anything, but that hides real bugs along with expected failures. Catch the specific exception type you expect:

```python
import json

try:
    data = json.loads("not valid json")
except json.JSONDecodeError:
    print("The API returned something that isn't valid JSON")
except KeyError:
    print("The response was missing an expected field")
```

Common exceptions you'll meet constantly in AI/API work: `KeyError` (a dictionary is missing a key you expected), `ValueError` (a value is the wrong shape, like bad JSON), `TypeError` (an operation got the wrong type), and `ConnectionError` (a network call failed).

## finally: code that always runs

`finally` runs whether or not an exception happened — useful for cleanup, like closing a file or a connection:

```python
try:
    file = open("data.txt")
    contents = file.read()
except FileNotFoundError:
    print("File doesn't exist")
finally:
    print("Done attempting to read the file")
```

## Raising your own exceptions

You can signal your own error conditions with `raise`:

```python
def call_model(prompt):
    if not prompt:
        raise ValueError("prompt cannot be empty")
    return f"Calling model with: {prompt}"
```

This stops execution and hands a clear, specific error up to whoever called the function — far more useful than a confusing failure somewhere else, later.

## Key terms

| Term | Meaning |
|---|---|
| Exception | An error Python raises when something goes wrong at runtime |
| `try` / `except` | Runs risky code, and catches a specific error type if it fails |
| `finally` | Code that always runs, whether or not an exception happened |
| `raise` | Signals your own error condition, stopping execution with a message |

## Check yourself

Before Lesson 7, be able to explain why catching a specific exception type (like `ValueError`) is better practice than a bare `except:`, and write a `try`/`except` around code that might raise a `ZeroDivisionError`.
