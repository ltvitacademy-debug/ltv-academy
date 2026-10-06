# Lesson 3 — Variables & Data Types

**Chapter 1 · Python Fundamentals · Lesson 3 of 37**

## What you'll learn

- How to create a variable in Python, and why there's no separate declaration step
- Python's core built-in types: `str`, `int`, `float`, `bool`, `None`
- How to check a value's type with `type()`
- f-strings, the standard way to build text from variables

## Creating a variable

Python variables need no declaration keyword and no explicit type. You just assign:

```python
model_name = "gpt-4o"
max_tokens = 500
temperature = 0.7
is_streaming = True
```

Python is **dynamically typed**: it looks at the value on the right of `=` and figures out the type. `model_name` becomes a `str` because of the quotes; `max_tokens` becomes an `int` because it's a whole number with no decimal point.

## The core types

```python
str     "gpt-4o"      text, always in quotes
int     500            whole number
float   0.7            decimal number
bool    True / False   exactly these two values, capitalized
None    None            Python's "nothing" / "no value"
```

`None` deserves its own mention — it's Python's explicit way of saying a variable holds no meaningful value yet, distinct from `0`, `""`, or `False`. You'll see it constantly as a default value, especially for optional function arguments later in this course.

## Checking a type: `type()`

When you're not sure what type a value actually is, `type()` tells you directly:

```python
>>> type(max_tokens)
<class 'int'>
>>> type(temperature)
<class 'float'>
```

## Converting between types

Python won't silently combine incompatible types the way some languages do — `"5" + 3` raises a `TypeError`, not a surprising result. You convert explicitly:

```python
age_text = "25"
age_number = int(age_text)      # "25" -> 25
price = str(19.99)              # 19.99 -> "19.99"
```

## f-strings: building text from variables

The standard, modern way to combine variables into a message is an **f-string** — put `f` before the opening quote, and `{variable}` anywhere inside:

```python
model_name = "gpt-4o"
temperature = 0.7
print(f"Calling {model_name} at temperature {temperature}")
# Calling gpt-4o at temperature 0.7
```

This is the pattern you'll use constantly to build prompts, log messages, and error messages throughout this course.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic typing | Python infers a variable's type from the value assigned to it |
| `type(x)` | Returns the actual type of a value |
| `None` | Python's explicit "no value" — distinct from `0`, `""`, or `False` |
| f-string | `f"text {variable}"` — the standard way to build text from variables |

## Check yourself

Before Lesson 4, be able to explain why `"5" + 3` raises an error in Python instead of silently producing `"53"`, and write an f-string that prints a variable's value inside a sentence.
