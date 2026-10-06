# Lesson 5 — Functions

**Chapter 1 · Python Fundamentals · Lesson 5 of 37**

## What you'll learn

- How to define and call a function with `def`
- Parameters, default values, and return values
- Keyword arguments — how real AI SDKs expect you to call them
- `*args` and `**kwargs`, at a beginner level, since you'll see them in library code

## Defining a function

A function packages logic under a name so you can reuse it instead of repeating code:

```python
def greet_model(model_name):
    return f"Connecting to {model_name}..."

message = greet_model("gpt-4o")
print(message)   # Connecting to gpt-4o...
```

`def` starts the definition, the parentheses hold **parameters** (inputs), and `return` sends a value back to whoever called the function. A function with no `return` statement returns `None`.

## Default values

A parameter can have a default, making it optional when the function is called:

```python
def call_model(prompt, temperature=0.7, max_tokens=500):
    return f"Calling with temperature={temperature}, max_tokens={max_tokens}"

call_model("Hello")                       # uses both defaults
call_model("Hello", temperature=0.2)      # overrides just one
```

## Keyword arguments

You can pass arguments by name instead of position — this is exactly how real AI SDKs expect calls to look, and it's worth getting comfortable with now:

```python
call_model(
    prompt="Summarize this article",
    temperature=0.2,
    max_tokens=1000,
)
```

Naming arguments makes a call self-documenting and order-independent — you can't accidentally swap two arguments of the same type.

## Multiple return values

Python functions can return more than one value at once, packaged as a tuple:

```python
def check_response(text):
    is_valid = len(text) > 0
    length = len(text)
    return is_valid, length

valid, length = check_response("Hello!")
```

## *args and **kwargs

You'll see these in real library code before you write them yourself. `*args` collects any number of extra positional arguments; `**kwargs` collects any number of extra named arguments:

```python
def log_call(model_name, *args, **kwargs):
    print(f"Called {model_name} with {args} and {kwargs}")

log_call("gpt-4o", "extra", temperature=0.5)
# Called gpt-4o with ('extra',) and {'temperature': 0.5}
```

This is how libraries like `requests` accept a flexible, open-ended set of options without defining every possible parameter by name.

## Key terms

| Term | Meaning |
|---|---|
| Parameter | A named input a function expects, listed in its `def` line |
| Default value | A parameter's value when the caller doesn't provide one |
| Keyword argument | An argument passed by name (`temperature=0.2`) rather than position |
| `*args` / `**kwargs` | Catch any number of extra positional / named arguments |

## Check yourself

Before Lesson 6, be able to write a function with one required parameter and one optional parameter with a default value, and call it both ways — with and without the optional argument.
