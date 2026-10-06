# Writing a Simple Class-Based Client Wrapper

**Chapter 3 · Object-Oriented Python · Lesson 17 of 37**

This lesson closes out the chapter by building a small wrapper of your own, combining everything from Lessons 13–16: `__init__` and `self` to hold state, a dataclass for a structured response, and an instance method that tracks history. Chapter 5 will swap the mocked network call for a real one with `requests` — the class shape you build here won't need to change.

## What you'll learn

- How to design a wrapper class around credentials, state, and behavior
- Using a dataclass for the return value instead of a raw string or dict
- Tracking conversation history as an instance attribute
- Why this shape makes the eventual swap to a real HTTP call painless

## Designing the wrapper

A client wrapper typically needs three things: credentials/config stored once, a method that does the actual work, and (often) some memory of what happened so far. Here's a wrapper that mocks the network call but is otherwise structured exactly like a real one:

```python
from dataclasses import dataclass

@dataclass
class AIResponse:
    text: str
    prompt: str

class AIClientWrapper:
    def __init__(self, api_key, base_url="https://api.example.com"):
        self.api_key = api_key
        self.base_url = base_url
        self.history = []

    def _headers(self):
        return {"Authorization": f"Bearer {self.api_key}"}

    def ask(self, prompt):
        self.history.append(prompt)
        # Chapter 5 replaces this line with a real requests.post() call
        reply_text = f"[mock reply to: {prompt}]"
        return AIResponse(text=reply_text, prompt=prompt)
```

`__init__` stores `api_key`, `base_url`, and an empty `history` list — all per-instance state, independent for every `AIClientWrapper` you construct (Lesson 13). `_headers` is a small helper method; the leading underscore is a Python convention meaning "internal — not part of the class's public interface," though nothing stops you from calling it.

## Using it

```python
client = AIClientWrapper(api_key="sk-demo")
r1 = client.ask("Summarize this article")
r2 = client.ask("Translate this sentence")

print(r1.text)
print(len(client.history))
# [mock reply to: Summarize this article]
# 2
```

Each `ask()` call appends to `self.history`, so the wrapper remembers every prompt sent through it over its lifetime — something a plain function couldn't do without a global variable.

## Why the mock swaps out cleanly later

The entire public shape — `client = AIClientWrapper(api_key=...)`, then `client.ask(prompt)` returning an `AIResponse` — never has to change when Chapter 5 replaces the single mocked line inside `ask()` with a real `requests.post(self.base_url, headers=self._headers(), ...)` call. That's the actual payoff of wrapping a class around this logic now, instead of writing one-off functions: the interface is stable even while the implementation underneath it changes.

## Recap

- A wrapper class bundles credentials (`__init__`), behavior (methods), and running state (`self.history`) together.
- Returning a dataclass (`AIResponse`) instead of a raw string keeps the door open for more fields later without breaking existing calls.
- An instance attribute like `self.history` gives an object memory across multiple method calls — plain functions can't do this without reaching for a global.
- This chapter's four building blocks — classes, inheritance, dataclasses, and why SDKs use them — are now one working wrapper.
- Next chapter: virtual environments and package management, so you can actually install libraries like `requests` to make this wrapper real.
