# Webhooks & Event-Driven Scripts

Every API you've called so far in this chapter, you called — your script decided when to ask. A **webhook** flips that around: the shipping carrier calls *you*, the instant a shipment's status changes, by sending an HTTP POST to a URL Northbridge Retail registered with them. This lesson builds a minimal receiver for that callback, and — just as important — shows you how to verify it actually came from the carrier before acting on it.

## What you'll learn

- What a webhook is and how it differs from the APIs you've called so far
- How to build a minimal Flask endpoint that receives a webhook POST
- How to verify a webhook's HMAC signature before trusting its payload
- How to act on a verified event

## What a webhook actually is

A webhook is just an inbound HTTP request: the carrier's system sends a POST to a URL Northbridge configured in advance, carrying a JSON body describing what happened — "shipment NB-10492 was delivered at 2:14 PM." There's no polling, no "did it change yet?" loop. The event arrives when it happens.

That also means your script is now a tiny web server, not just a client. Flask is the simplest way to stand one up:

```python
from flask import Flask, request

app = Flask(__name__)

@app.route("/webhooks/shipment-status", methods=["POST"])
def shipment_status():
    event = request.get_json()
    print("Received event:", event["type"])
    return {"status": "received"}, 200
```

That's a working receiver — but it has a serious problem: it trusts *anyone* who can reach that URL.

## Why you must verify the signature

The carrier's webhook URL is, by necessity, public — Northbridge's own server has to be reachable from the internet for the carrier to POST to it. That means anyone who finds or guesses the URL can send a fake `shipment.delivered` event, and without verification your code would act on it exactly as if it were real — triggering a customer notification, releasing a hold, anything the handler does.

The fix is a **signature**: the carrier computes an HMAC hash of the request body using a secret only the carrier and Northbridge know, and sends it in a header. Your receiver recomputes that same hash locally and compares the two:

```python
import hashlib
import hmac
import os

from flask import Flask, request, abort

app = Flask(__name__)
WEBHOOK_SECRET = os.environ["CARRIER_WEBHOOK_SECRET"].encode()

@app.route("/webhooks/shipment-status", methods=["POST"])
def shipment_status():
    signature = request.headers.get("X-Carrier-Signature", "")
    expected = hmac.new(WEBHOOK_SECRET, request.data, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(signature, expected):
        abort(401, "Invalid signature")

    event = request.get_json()
    handle_shipment_event(event)
    return {"status": "received"}, 200
```

Two details matter here. First, the HMAC is computed over `request.data` — the *raw* request bytes — not the parsed JSON, because re-serializing JSON can produce a slightly different byte string than what the carrier actually signed. Second, `hmac.compare_digest()` is used instead of `==`. A plain string comparison exits as soon as it finds a mismatched character, which leaks timing information an attacker could use to guess the correct signature one byte at a time; `compare_digest()` always takes the same amount of time regardless of where the mismatch is.

## Acting on the verified event

Only after the signature check passes does the handler look at what actually happened and respond accordingly:

```python
def handle_shipment_event(event):
    if event["type"] == "shipment.delivered":
        print(f"Order {event['order_id']} delivered at {event['timestamp']}")
        notify_customer(event["order_id"])
    elif event["type"] == "shipment.exception":
        print(f"Order {event['order_id']} flagged: {event['reason']}")
        flag_for_review(event["order_id"])
```

Returning `200` quickly matters too — most webhook providers, including shipping carriers, will retry (and eventually give up) if your endpoint doesn't respond fast, so slow downstream work like sending an email should be queued rather than done inline before you respond.

## Key terms

| Term | Meaning |
|---|---|
| Webhook | An inbound HTTP callback a provider sends to your server when an event happens |
| HMAC | A keyed hash used to prove a message came from someone who knows a shared secret |
| `hmac.compare_digest()` | A constant-time comparison that avoids leaking timing information |
| Signature verification | Confirming a webhook's HMAC matches before trusting or acting on its payload |

## Recap

A webhook is the carrier calling you, not the other way around — and because the receiving URL is public, you must verify its HMAC signature with `hmac.compare_digest()` before acting on anything in the payload. Verify first, parse the event second, act third, and respond quickly. That closes out this chapter on APIs and cloud automation — next, Chapter 5 puts everything so far to work on real automation tasks.
