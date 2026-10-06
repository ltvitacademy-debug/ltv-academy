# Popular AI Libraries, Overview

**Chapter 4 · Virtual Environments & Package Management · Lesson 21 of 37**

This chapter's closing lesson is a map, not a deep dive: a tour of the Python libraries you'll run into constantly while building AI applications, grouped by what job each one does. You don't need to memorize all of them — you need to recognize which category a new library belongs to the next time you see one.

## What you'll learn

- The four main categories of AI-adjacent Python libraries
- What each category's job is, with real, commonly used examples
- Why this course spends Chapter 5 specifically on `requests`
- Where to go deeper later: `pip show` to inspect any installed package

## Category 1 — Provider SDKs

These are official client libraries published by AI providers, each wrapping that provider's API behind Python objects (exactly the client/response/error pattern from Lesson 16).

```
pip install openai        # OpenAI's models
pip install anthropic     # Anthropic's Claude models
```

## Category 2 — HTTP libraries

Underneath every provider SDK, something is making real network requests. `requests` is the standard, widely used library for that — and Chapter 5 of this course is built entirely around it, because understanding raw HTTP is what makes every SDK's behavior predictable rather than magic.

```
pip install requests
```

## Category 3 — Orchestration & application frameworks

Once you're chaining multiple AI calls together — retrieving documents, calling a model, parsing its output, calling another tool — a plain script gets unwieldy. Frameworks like LangChain provide reusable pieces (prompt templates, memory, tool-calling helpers) for that.

```
pip install langchain
```

## Category 4 — Data & ML libraries

Most AI applications eventually touch structured data or classic machine learning, even if the "AI" part is a hosted model call. `numpy` and `pandas` handle numeric and tabular data; `scikit-learn` covers classic ML algorithms; `torch` (PyTorch) is for training or running neural networks directly, rather than calling a hosted API.

```
pip install numpy pandas scikit-learn
pip install torch
```

## Testing matters here too

`pytest`, covered properly in Chapter 7, is the standard framework for writing automated tests — just as relevant for AI code (testing a prompt-building function, mocking an API response) as any other Python code.

```
pip install pytest
```

## Inspecting any package you've installed

`pip show` prints a package's version, summary, and where it's installed from — useful the moment you're not sure exactly what you have:

```
pip show requests
# Name: requests
# Version: 2.31.0
# Summary: Python HTTP for Humans.
```

## Recap

- Provider SDKs (`openai`, `anthropic`) wrap a specific AI provider's API in Python objects.
- `requests` handles raw HTTP — the foundation under every SDK, and Chapter 5's focus.
- Orchestration frameworks (`langchain`) help when you're chaining multiple AI calls and tools together.
- Data/ML libraries (`numpy`, `pandas`, `scikit-learn`, `torch`) show up constantly even in API-driven AI work.
- Next chapter: Working With APIs in Python — putting `requests` to use for real.
