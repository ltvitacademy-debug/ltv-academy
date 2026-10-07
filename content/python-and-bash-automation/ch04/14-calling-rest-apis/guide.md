# Calling REST APIs

Northbridge Retail's fulfillment team doesn't want to log into the shipping carrier's web portal every morning to check order status — they want a script that pulls it automatically. The carrier exposes that data through a REST API, and in this lesson you'll use Python's `requests` library to call it: sending GET and POST requests, reading status codes correctly, and walking through paginated results without missing data.

## What you'll learn

- How to send a GET request with query parameters to filter what comes back
- How to send a POST request with a JSON body to create or change something
- How to check `response.status_code` and use `raise_for_status()` to catch failures
- How to read `response.json()` into a normal Python dictionary
- How to follow a paginated API until you've collected every result

## GET requests and query parameters

A GET request reads data without changing anything on the server, so filtering happens through **query parameters**, not the request body. `requests.get()` builds the URL and query string for you when you pass a `params` dictionary:

```python
import requests

response = requests.get(
    "https://api.shipfast-carrier.com/v2/shipments",
    params={"order_id": "NB-10492", "status": "in_transit"},
    headers={"Accept": "application/json"},
    timeout=10,
)
response.raise_for_status()

shipment = response.json()
print(shipment["tracking_number"], shipment["eta"])
```

`timeout=10` matters more than it looks — without it, a hung connection to the carrier's API can block your script forever. Always set one.

## POST requests and JSON bodies

A POST request creates or changes something — here, registering a new outbound shipment with the carrier — so the data belongs in the **request body**, not the URL. Passing a dictionary to `json=` tells `requests` to serialize it and set the `Content-Type: application/json` header automatically:

```python
payload = {
    "order_id": "NB-10492",
    "carrier_service": "ground",
    "weight_kg": 2.3,
    "destination_zip": "30301",
}

response = requests.post(
    "https://api.shipfast-carrier.com/v2/shipments",
    json=payload,
    timeout=10,
)
response.raise_for_status()

created = response.json()
print("New shipment ID:", created["shipment_id"])
```

## Status codes: trust them, don't guess

Every response carries a `status_code` — 200s mean success, 400s mean your request was wrong, 500s mean the carrier's server had a problem. `raise_for_status()` is the simplest way to handle this: it does nothing on success and raises an exception on any 4xx or 5xx response, so a bad call fails loudly instead of silently returning garbage.

```python
response = requests.get(url, timeout=10)

if response.status_code == 404:
    print("No shipment found for that order.")
elif response.status_code == 429:
    print("Rate limited — back off and retry later.")
else:
    response.raise_for_status()
    data = response.json()
```

## Handling pagination

The carrier's API never hands back every shipment in one response — it caps each page at 100 results and includes a `next` link when more exist. Trying to read "all shipments" from a single call will quietly give you an incomplete list unless you follow the pages:

```python
def fetch_all_shipments(service):
    shipments = []
    url = "https://api.shipfast-carrier.com/v2/shipments"
    params = {"service": service, "page_size": 100}

    while url:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        page = response.json()

        shipments.extend(page["results"])
        url = page.get("next")  # None once there's no further page
        params = None  # the "next" URL already carries its own query string

    return shipments
```

## Key terms

| Term | Meaning |
|---|---|
| Query parameters | Key-value pairs appended to a URL, used to filter a GET request |
| Request body | The payload sent with a POST/PUT/PATCH request, usually JSON |
| `raise_for_status()` | A `requests` method that raises an exception on a 4xx/5xx response |
| Pagination | Splitting a large result set across multiple requests/pages |

## Recap

GET requests filter through query parameters; POST requests carry their data in a JSON body. Always check status codes with `raise_for_status()` instead of assuming success, and always follow a `next` link until it's `None` so you don't silently lose data. Next up, lesson 15: authenticating these calls properly instead of assuming the carrier's API is open to anyone.
