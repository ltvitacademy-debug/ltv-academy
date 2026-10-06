# Why OOP Matters for AI SDKs

**Chapter 3 · Object-Oriented Python · Lesson 16 of 37**

You now know classes, inheritance, and dataclasses. This lesson connects those three tools to a question you'll run into the moment you open any AI provider's Python SDK: why is everything an object? Understanding the pattern makes every SDK's docs easier to read, because they're all built the same way.

## What you'll learn

- Why SDKs wrap configuration and credentials in a client object instead of passing them to every function call
- How response objects give you structured, typed access instead of raw dictionaries
- Why SDKs build an exception hierarchy instead of one generic error
- How these three pieces — client, response, errors — map directly to Lessons 13–15

## The client object holds your setup once

Every major AI SDK — OpenAI's, Anthropic's, and others — gives you a client object you construct once with your credentials, then reuse for every call. This is exactly the pattern from Lesson 13: `__init__` stores state (the API key, a base URL, a default model) on `self`, so you never repeat it.

```python
class AIClient:
    def __init__(self, api_key, model="gpt-4"):
        self.api_key = api_key
        self.model = model

    def chat(self, prompt):
        # a real SDK sends an HTTP request here (Chapter 5)
        return f"[response to: {prompt}]"

client = AIClient(api_key="sk-demo")
client.chat("Summarize this article")
client.chat("Translate this sentence")
```

Without a client object, you'd have to pass `api_key` and `model` into every single function call. With it, you set up once and call `client.chat(...)` as many times as you need.

## Response objects give you structure, not just a dictionary

A raw API response is JSON — effectively a dictionary. SDKs typically wrap that JSON in a dataclass-like response object instead, so your editor can autocomplete fields and typos get caught early rather than silently returning `None`.

```python
from dataclasses import dataclass

@dataclass
class ChatResponse:
    text: str
    model: str
    tokens_used: int

response = ChatResponse(text="Hello!", model="gpt-4", tokens_used=12)
print(response.text)
# Hello! — response.txt would be a typo Python catches immediately,
# vs. response["txt"] on a raw dict, which fails silently at runtime
```

This is Lesson 15's dataclass pattern, applied to API responses instead of configuration.

## Exception hierarchies let you catch broadly or specifically

Lesson 14 covered inheritance between ordinary classes; SDKs apply the exact same idea to errors. A base error class sits at the top, with specific errors inheriting from it.

```python
class AIError(Exception):
    pass

class RateLimitError(AIError):
    pass

class AuthenticationError(AIError):
    pass

try:
    client.chat("...")
except AIError:
    print("Something went wrong with the AI call")
    # catches RateLimitError, AuthenticationError, and anything
    # else that inherits from AIError — without listing each one
```

You can catch `RateLimitError` specifically to retry, or catch `AIError` broadly to log any AI-related failure — the same `isinstance`-respects-inheritance behavior from Lesson 14.

## Recap

- A client object (Lesson 13's `__init__` + `self`) holds credentials and config once, instead of repeating them per call.
- Response objects (Lesson 15's dataclasses) give typed, autocomplete-friendly access instead of raw dictionaries.
- Exception hierarchies (Lesson 14's inheritance) let code catch errors broadly or specifically.
- Next lesson: you'll build a small class-based client wrapper yourself, combining all three ideas.
