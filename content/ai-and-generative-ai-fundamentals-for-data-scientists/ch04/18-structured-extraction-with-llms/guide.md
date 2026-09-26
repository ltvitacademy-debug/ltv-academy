# Structured Extraction With LLMs

So far the model has returned prose. That is fine for a chat window, but a data scientist usually wants **rows and columns**. Suppose a support inbox holds thousands of free-text tickets, and you want a table with a category, an urgency score, and an order ID for each. A language model can read the messy text and fill in those fields. The catch is that the model's output is text, and text can be wrong in ways a database will not tolerate.

The core habit of this lesson is simple: **never trust the model's output until your own code has validated it.** Everything below runs locally. The model is replaced by canned replies we wrote by hand, including deliberately broken ones, so you can see exactly how validation behaves.

## What you'll learn

- How to ask for JSON and define the fields you expect
- How to parse and validate a reply with Python's `json` module
- The common ways model output goes wrong
- How to retry by feeding the error back to the model

## Define the target

Decide the fields before writing any prompt. For our support tickets:

- `category`: one of `billing`, `shipping`, `returns`, `other`
- `urgency`: an integer
- `order_id`: a string

Then tell the model exactly that in the prompt, for example: "Return only a JSON object with the keys category, urgency, and order_id. category must be one of billing, shipping, returns, other." A precise instruction helps, but it is a request, not a guarantee.

## Validate in plain Python

```python
import json

SCHEMA = {
    "category": ("str", {"billing", "shipping", "returns", "other"}),
    "urgency": ("int", None),
    "order_id": ("str", None),
}

def validate(raw):
    text = raw.strip()
    if text.startswith("```"):
        text = text.strip("`").removeprefix("json").strip()
    try:
        data = json.loads(text)
    except json.JSONDecodeError as err:
        return None, f"not valid JSON: {err.msg}"
    for field, (kind, allowed) in SCHEMA.items():
        if field not in data:
            return None, f"missing field: {field}"
        if kind == "int" and not isinstance(data[field], int):
            return None, f"{field} must be an integer"
        if kind == "str" and not isinstance(data[field], str):
            return None, f"{field} must be a string"
        if allowed and data[field] not in allowed:
            return None, f"{field} not in {sorted(allowed)}"
    return data, None
```

The function returns either the clean data or a human-readable error. That error message is useful later.

## Five canned replies

We wrote five replies a real model could plausibly produce: one perfect, one wrapped in a markdown code fence (very common), one missing a field, one with an invented category, and one that is chatty prose instead of JSON. Running `validate` on each printed:

```
OK   {'category': 'returns', 'urgency': 2, 'order_id': 'A-1001'}
OK   {'category': 'billing', 'urgency': 3, 'order_id': 'A-1002'}
FAIL missing field: order_id
FAIL category not in ['billing', 'other', 'returns', 'shipping']
FAIL not valid JSON: Expecting value
```

Three of the five would have silently corrupted a table if you had loaded them without checking. Cleaning the code fence rescued the second reply for free.

## Retry with the error

Because `validate` explains what was wrong, you can tell the model and ask again. Below, a fake model first returns the reply with the missing field, then a corrected one.

```python
replies = iter([canned[2], canned[0]])
def fake_model(prompt):
    return next(replies)

def extract(ticket, max_tries=3):
    prompt = f"Extract JSON from: {ticket}"
    for attempt in range(1, max_tries + 1):
        data, error = validate(fake_model(prompt))
        if data:
            return data, attempt
        prompt += f"\nYour last reply was rejected: {error}"
    return None, max_tries
```

The run printed `({'category': 'returns', 'urgency': 2, 'order_id': 'A-1001'}, 2)`: success on the second attempt. Always cap the number of tries, and decide what to do when they run out, such as logging the ticket for a human to review.

## A note on pydantic and provider features

Libraries such as pydantic let you declare the same schema as a Python class and validate against it, which is less code for bigger schemas. That is not run here, since it is a separate package. Many providers also offer built-in structured-output or JSON-schema modes that constrain the model's reply. Feature names and details change, so check the current documentation of the API you use. Even with those features on, keep your own validation: it is cheap, and it is what protects your data.

## Recap

To extract data with an LLM, define the fields, ask for JSON, and validate every reply in your own code. Expect code fences, missing fields, invented values, and prose. Return clear errors, retry a limited number of times with the error included, and route failures to a person. Next: what all of this costs, how long it takes, and what data you should never send.
