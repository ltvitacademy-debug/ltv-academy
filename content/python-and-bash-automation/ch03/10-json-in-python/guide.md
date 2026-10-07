# JSON in Python

Northbridge Retail's warehouse system exports a nightly inventory feed as JSON, and the shipping carrier's API returns JSON too. Before you can automate anything around either one, you need to be fluent in reading JSON into Python data structures and writing Python data structures back out as JSON. That's the whole job of the built-in `json` module, and it's one of the most-used tools in any automation script you'll write.

## What you'll learn

- The difference between `json.load`/`json.dump` (files) and `json.loads`/`json.dumps` (strings)
- How JSON objects and arrays map onto Python dicts and lists
- How to safely read nested data and handle missing keys without crashing
- How to write Python data back out as pretty-printed JSON

## Loading JSON from a file

Northbridge's inventory feed lands on disk as `inventory.json` every night. Reading it is two lines:

```python
import json

with open("inventory.json") as f:
    data = json.load(f)

print(type(data))   # <class 'list'> or <class 'dict'>, depending on the feed
```

`json.load()` takes an open file object. If the JSON you have is already a Python string — say, a response body you fetched yourself — use `json.loads()` ("loads" = "load string") instead:

```python
raw = '{"sku": "NB-1042", "warehouse": "ATL", "qty_on_hand": 318}'
record = json.loads(raw)
print(record["sku"])   # NB-1042
```

## Parsing a nested response

A real carrier-tracking API response for Northbridge looks like this once parsed:

```python
response = {
    "shipment_id": "SHIP-88213",
    "status": "in_transit",
    "destination": {
        "city": "Columbus",
        "state": "OH",
        "zip": "43215"
    },
    "events": [
        {"ts": "2026-10-04T14:02:00Z", "code": "PICKED_UP"},
        {"ts": "2026-10-05T09:15:00Z", "code": "IN_TRANSIT"}
    ]
}

city = response["destination"]["city"]
last_event = response["events"][-1]["code"]
print(f"{response['shipment_id']} is {response['status']} near {city}, latest: {last_event}")
```

JSON objects become dicts, JSON arrays become lists, and you chain `[]` lookups to walk into nested structure exactly like you would with any other dict-of-dicts.

## Handling missing keys safely

Real feeds are messy. Not every shipment record has a `tracking_url`, and a script that does `response["tracking_url"]` will raise a `KeyError` and crash the whole batch job the moment one record is missing it. Use `.get()` with a default instead:

```python
tracking_url = response.get("tracking_url", "not available")

# .get() also works for nested lookups, one level at a time
destination = response.get("destination", {})
zip_code = destination.get("zip", "unknown")
```

`dict.get(key, default)` returns `default` instead of raising when the key isn't present, which keeps one malformed record from taking down a batch of a thousand.

## Writing JSON back out

After Northbridge's script enriches a shipment record with a computed delay flag, it writes the result back out for the reporting pipeline to pick up:

```python
report = {"shipment_id": "SHIP-88213", "status": "in_transit", "delayed": False}

# dumps() -> a string, useful for logging or sending over the network
print(json.dumps(report, indent=2))

# dump() -> writes straight to a file
with open("shipment_report.json", "w") as f:
    json.dump(report, f, indent=2)
```

The `indent=2` argument is optional but worth using anywhere a human might read the output — it turns a single dense line into readable, nested formatting. Leave it off when size matters more than readability, like a high-volume log line.

## Key terms

- **`json.load(file)`** — parses JSON from an open file object into Python data
- **`json.loads(string)`** — parses JSON from a Python string into Python data
- **`json.dump(data, file)`** — writes Python data to a file as JSON text
- **`json.dumps(data)`** — converts Python data into a JSON string
- **`dict.get(key, default)`** — looks up a key without raising if it's missing

## Recap

JSON objects and arrays map directly onto Python dicts and lists, and the `json` module's four functions — `load`, `loads`, `dump`, `dumps` — cover every direction you need to move data between files, strings, and Python objects. Always reach for `.get()` with a default when a key might be missing from real-world data; it's the difference between a script that logs a warning and one that crashes a whole batch. Next up: YAML, the format Northbridge actually prefers for its own configuration files.
