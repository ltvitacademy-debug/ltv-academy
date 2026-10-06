# Lesson 7 — Working With Modules

**Chapter 1 · Python Fundamentals · Lesson 7 of 37**

## What you'll learn

- What a module is, and why Python code is organized into them
- `import` in its different forms — and when to use each
- The difference between the standard library and third-party packages
- How `pip install` brings in a package so you can import it

## What a module actually is

A **module** is just a `.py` file full of code someone else (or you) wrote, that you can reuse by importing it instead of copy-pasting. Python ships with a huge **standard library** of modules for free — no installation needed:

```python
import json
import os
import datetime

data = json.loads('{"model": "gpt-4o"}')
current_dir = os.getcwd()
now = datetime.datetime.now()
```

## The different import forms

```python
import json                    # use as json.loads(...)
import json as j                # use as j.loads(...) — a shorter alias
from json import loads          # use as loads(...) directly
from json import loads, dumps   # import multiple specific names
```

`from X import Y` pulls a specific function or class directly into your file's namespace, so you don't need to prefix it. Both styles are common in real code — prefer `import json` when you'll use several things from it, and `from X import Y` when you only need one or two specific names.

## Standard library vs. third-party packages

The **standard library** ships with Python itself (`json`, `os`, `datetime`, `math`, `random`, `re`). **Third-party packages** — `requests`, `openai`, `pandas` — don't come with Python; you install them separately with `pip`, Python's package installer:

```
pip install requests
```

Once installed, you import a third-party package exactly the same way as a standard library one:

```python
import requests

response = requests.get("https://api.example.com/data")
```

This is the exact mechanism every AI provider's SDK uses: `pip install openai`, then `import openai` — a pattern you'll use constantly starting in Chapter 5 of this path.

## Organizing your own code into modules

Any `.py` file you write is itself a module other files can import. If you have `helpers.py` with a function `format_prompt()`, another file in the same folder can do:

```python
from helpers import format_prompt

result = format_prompt("Summarize this text")
```

This is how real projects stay organized once they grow past a single file — Chapter 3 of this path builds on this idea with classes and packages.

## Key terms

| Term | Meaning |
|---|---|
| Module | A `.py` file of reusable code you bring in with `import` |
| Standard library | Modules that ship with Python itself — no install needed |
| Third-party package | A module installed separately via `pip install` |
| `from X import Y` | Pulls a specific name directly into your file, no prefix needed |

## Check yourself

Before Chapter 2, be able to explain the difference between `import json` and `from json import loads`, and name one standard-library module and one third-party package you'd `pip install`.
