# Linting & Formatting Tools

**Chapter 7 · Testing & Code Quality · Lesson 33 of 37**

Tests check that code *works*. Linters and formatters check that code is *consistent and free of common mistakes* — catching an unused import, an undefined variable, or just a messy diff before a teammate (or you, in six months) has to deal with it. This lesson covers the two tools you'll see in nearly every real Python project: `black` and `ruff`.

## What you'll learn

- The difference between a **formatter** (changes style) and a **linter** (flags problems)
- `black`: opinionated, automatic code formatting
- `ruff`: a fast linter that catches real bugs, not just style issues
- A minimal `pyproject.toml` config for both

## Formatting with black

```python
# before
def  greet(name,greeting = "Hello" ):
    return(greeting+", "+name+"!")
```

```
black my_script.py
```

```python
# after
def greet(name, greeting="Hello"):
    return greeting + ", " + name + "!"
```

`black` rewrites your code's whitespace, quotes, and line breaks to one consistent style — automatically, with (deliberately) almost no configuration options to argue about. The point isn't that this style is objectively best; it's that nobody on a team spends time debating it ever again.

## Catching real problems with ruff

```python
import os          # never used
import json

def load_config(path):
    data = json.load(open(path))
    retrun data     # typo: should be "return"
```

```
ruff check my_script.py
# my_script.py:1:8: F401 'os' imported but unused
# my_script.py:6:5: F821 undefined name 'retrun'
```

Unlike `black`, `ruff` doesn't rewrite your code — it reports problems: unused imports, undefined names (often a typo like the one above), unreachable code, and dozens of other real bugs, all without running the program.

## A minimal config

```toml
# pyproject.toml
[tool.black]
line-length = 88

[tool.ruff]
line-length = 88
select = ["E", "F", "I"]   # errors, pyflakes, import order
```

Both tools read settings from `pyproject.toml`, the standard place for Python project configuration — one file, checked into the repo, so every contributor and every CI run uses the exact same rules.

## Recap

- A formatter (`black`) rewrites code style automatically; a linter (`ruff`) flags problems without rewriting anything.
- `black` ends style debates on a team by being deliberately non-configurable.
- `ruff` catches real issues — unused imports, undefined names, typos — before the code ever runs.
- Both tools read shared settings from `pyproject.toml`, checked into the repo so everyone uses the same rules.
- Next lesson: debugging techniques, for the bugs that make it past both of these tools.
