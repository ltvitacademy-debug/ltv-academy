# Lesson 1 — Why Python for AI Engineering?

**Chapter 1 · Python Fundamentals · Lesson 1 of 37**

## What you'll learn

- Why Python, specifically, became the language of AI and machine learning work
- What an "AI engineer" actually spends their day writing code for
- The three things Python gives you that matter most for this path: readable syntax, a huge library ecosystem, and being the language every major AI provider supports first
- What this course covers, and what it deliberately leaves out

## It isn't an accident

Every major AI provider — OpenAI, Anthropic, Google, Meta — ships its official SDK in Python first, often *only* in Python for the newest features. PyTorch and TensorFlow, the two frameworks nearly all modern AI models are built and trained with, are Python libraries at their core. That's not a coincidence; it's the result of three things Python offers that other languages don't combine as well:

```
1. Readable syntax     — less ceremony between an idea and working code
2. Massive ecosystem    — pandas, NumPy, PyTorch, requests, FastAPI...
3. First-class AI support — every provider's SDK ships in Python first
```

## What an AI engineer actually does

"AI engineer" doesn't usually mean training models from scratch — that's a smaller, more research-heavy specialty. Most AI engineering work is **integration**: calling a model's API, shaping the data you send it, handling the response, wiring it into a real application, and doing all of that reliably at scale. That work is almost entirely Python: `requests` or an SDK to call an API, data structures to hold the request and response, functions and classes to organize the logic, and error handling for when a call fails.

## What this course covers

This course assumes nothing — no prior programming at all. Chapters 1 and 2 build the core language: variables, control flow, functions, error handling, and the data structures (lists, dictionaries, sets, nested JSON-like structures) you'll use constantly to shape data for an AI API. Later chapters in this path move into object-oriented Python, packaging, calling real APIs over HTTP, async programming for concurrent AI calls, testing, and a capstone project. Each piece is chosen because it shows up directly in real AI-engineering code — not because it's "classic" computer science.

## Key terms

| Term | Meaning |
|---|---|
| AI engineering | Building applications that call and integrate AI models, as distinct from training them |
| SDK | A provider's official library for calling its API (e.g. the `openai` or `anthropic` Python package) |
| Ecosystem | The universe of third-party libraries available for a language — Python's is unusually deep for AI/data work |

## Check yourself

Before Lesson 2, be able to name the three reasons this lesson gives for why Python, specifically, leads AI work — and explain in your own words what "integration" work means for an AI engineer day to day.
