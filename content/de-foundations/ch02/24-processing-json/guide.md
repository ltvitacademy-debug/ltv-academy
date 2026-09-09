# Lesson 24 — Processing JSON

**Chapter 2 · Python for Data Engineers · Lesson 24 of 62**

## What you'll learn

- What genuinely **nested** JSON looks like — not the flat list Lesson
  22 and 23 assumed
- `json.loads()` / `json.dumps()` — converting between JSON text and
  Python objects directly
- `pd.json_normalize()` — flattening nested JSON into a real DataFrame
- Accessing nested values manually, when flattening isn't the answer

## When JSON isn't flat

Lessons 22–23 assumed JSON shaped as a simple list of flat objects. Real
APIs often nest data instead:

```json
{
    "trip_id": "T1001",
    "fare": {"amount": 14.50, "currency": "USD"},
    "locations": {
        "pickup": {"borough": "Manhattan", "zone": "Midtown"},
        "dropoff": {"borough": "Brooklyn", "zone": "Williamsburg"}
    }
}
```

`pd.DataFrame()` on this directly would put entire dictionaries *inside*
single cells — not what you actually want.

## json.loads() and json.dumps()

```python
import json

json_text = '{"trip_id": "T1001", "fare": {"amount": 14.50}}'
data = json.loads(json_text)       # JSON text -> Python dict
print(data["fare"]["amount"])      # 14.50

back_to_text = json.dumps(data)    # Python dict -> JSON text
```

`loads` parses JSON text into real Python dictionaries and lists (the
same shapes from Lesson 15); `dumps` does the reverse. `requests`
(Lesson 23) already calls `loads` for you inside `.json()` — this is
what's happening underneath that call.

## pd.json_normalize() — flattening nested structure

```python
import pandas as pd

data = [{
    "trip_id": "T1001",
    "fare": {"amount": 14.50, "currency": "USD"},
    "locations": {
        "pickup": {"borough": "Manhattan"},
        "dropoff": {"borough": "Brooklyn"},
    },
}]

df = pd.json_normalize(data)
print(df.columns)
# trip_id, fare.amount, fare.currency,
# locations.pickup.borough, locations.dropoff.borough
```

`json_normalize` walks every level of nesting and turns it into
dot-separated column names — `fare.amount` instead of a dictionary
sitting inside a `fare` column. This is the real tool for turning a
genuinely nested API response into something you can actually filter
and group like a normal table.

## Accessing nested values manually

Sometimes you only need one or two nested values, and flattening the
whole structure is overkill:

```python
trip = {"fare": {"amount": 14.50, "currency": "USD"}}
amount = trip["fare"]["amount"]   # chain the keys directly
```

Chained key access — `trip["fare"]["amount"]` — works exactly like
Lesson 15's dictionary access, just one level deeper each time.

## Key terms

| Term | Meaning |
|---|---|
| Nested JSON | An object or array containing other objects/arrays inside it |
| `json.loads()` | Parses JSON text into Python dictionaries/lists |
| `json.dumps()` | Converts Python dictionaries/lists back into JSON text |
| `pd.json_normalize()` | Flattens nested JSON into dot-separated DataFrame columns |

## Lab

```python
import pandas as pd

data = [
    {"trip_id": "T1001", "fare": {"amount": 14.50}, "passenger_count": 1},
    {"trip_id": "T1002", "fare": {"amount": 9.75}, "passenger_count": 3},
]

df = pd.json_normalize(data)
print(df.columns)
print(df["fare.amount"].sum())
```

Confirm `fare.amount` appears as a real, summable numeric column, not a
column of dictionaries.

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: why
does `pd.DataFrame()` alone struggle with nested JSON, and what does
`json_normalize` actually do about it?
