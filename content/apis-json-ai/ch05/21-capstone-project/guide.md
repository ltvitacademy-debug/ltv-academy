# Lesson 21 — Capstone: A Reusable AI API Client

**Chapter 5 · Capstone · Lesson 21 of 22**

## What you'll learn

- How every chapter of this course fits into one real project
- The exact requirements your capstone client needs to meet
- How the pieces from Chapters 3 and 4 combine into a single class
- What "done" looks like, so you can self-assess before submitting

## The project

Build a Python class — call it `AIClient` — that wraps a real AI
provider's chat API. This isn't a new topic: it's every lesson in this
course, assembled into one real, working piece of software you can put in
a portfolio.

## Requirements checklist

Your `AIClient` needs to demonstrate:

1. **Correct request/response handling** (Lesson 11) — send a real
   `model`/`messages` body, parse the real response shape back.
2. **Resilient error handling** (Lessons 14, 18) — custom exceptions,
   and a retry loop that only retries transient failures.
3. **Rate-limit awareness** (Lesson 19) — read real rate-limit headers
   and back off using `retry-after` when present.
4. **A tested retry path** (Lesson 20) — at least one mocked test that
   proves a `429` followed by success actually recovers.
5. **Clean class design** (Lesson 17) — shared config in `__init__`,
   one method per real action, nothing API-specific leaking into caller
   code.

Streaming (Lesson 12) and tool calling (Lesson 13) are strong additions,
not strict requirements — add them if you want the project to go further.

## How the pieces assemble

Every method you write is a real endpoint from Chapter 3, wrapped the way
Chapter 4 taught:

```python
class AIClient:
    def __init__(self, api_key, base_url="https://api.anthropic.com"):
        self.session = requests.Session()
        self.session.headers.update({"x-api-key": api_key})
        self.base_url = base_url

    def send_message(self, model, messages, max_tokens=1024):
        # real request shape, retry loop, rate-limit headers
        ...

    def list_models(self):
        # real cursor-based pagination loop
        ...
```

Each `...` is a lesson you've already built, in miniature — you're not
learning anything new here, you're proving you can combine what you know.

## What "done" looks like

A finished capstone runs against a real API key, handles a simulated
rate-limit gracefully in its test suite, and reads cleanly enough that
another developer could use `AIClient` without reading your source code
first — just the method names and their docstrings.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | A project that demonstrates everything learned, combined |
| Requirement vs. stretch goal | What's required to pass vs. what goes further |
| Self-assessment | Checking your own work against the rubric before submitting |

## Lab

Before writing any code, write the method signatures you intend to build
(just the `def` lines, no bodies) for your `AIClient`. Check each one
against the requirements checklist above.

## Check yourself

Of the five requirements above, which one would your current understanding
be weakest on if you started building right now — and which lesson would
you revisit first?
