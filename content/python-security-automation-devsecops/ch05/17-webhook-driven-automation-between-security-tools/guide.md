# Lesson 17 — Webhook-Driven Automation Between Security Tools

**Chapter 5 · Security Orchestration Across Tools · Lesson 1 of 4**

## What you'll learn

- Why security tools push alerts via **webhooks** instead of you polling
  their APIs on a timer
- How to stand up a minimal webhook receiver with Flask
- How to verify an inbound webhook's **HMAC signature** before trusting
  anything in its payload
- How to make webhook processing **idempotent**, so a redelivered event
  doesn't trigger your automation a second time

## Why webhooks instead of polling

Every automation script you've written so far in this course has been
the one reaching out — calling a REST API, paging through results,
backing off when it hit a rate limit. Polling works, but it has a built
in trade-off: poll too often and you burn through rate limits and
compute for no reason; poll too rarely and you're minutes behind a real
alert. A webhook flips the model. Instead of you asking "anything new?"
every 60 seconds, the security tool itself makes an outbound HTTP POST
to a URL you control the moment something happens — a new finding, a
closed case, a failed login threshold crossed. Your code becomes a
small HTTP server waiting for that POST, which means the delay between
"something happened" and "your automation reacted" drops from minutes
to seconds, and you're no longer spending API calls just to hear "no
change."

The cost of that speed is that your receiver is now a public-facing (or
at least network-reachable) endpoint, and anyone who finds its URL can
try to POST to it. That's the problem the next two sections solve.

## Building a minimal webhook receiver

A webhook receiver is just a small web app with one route. Flask is the
simplest way to stand one up for internal automation:

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/webhooks/security-tool", methods=["POST"])
def receive_alert():
    payload = request.get_json(silent=True)
    if payload is None:
        return jsonify({"error": "invalid JSON"}), 400

    # Signature verification happens here, before anything else runs.
    # Idempotency check happens right after that.
    # Only then do we hand the event to our real processing logic.
    process_alert(payload)
    return jsonify({"status": "accepted"}), 202

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
```

Two things matter about that shape even before you add security checks.
First, it returns quickly — `202 Accepted` — rather than doing all the
downstream work (ticket creation, Slack messages, enrichment calls)
inside the request itself. Most webhook senders have a short timeout
and will mark the delivery as failed, and retry it, if your endpoint
takes too long to respond. Second, every piece of real work is pushed
into a separate function so you can unit test `process_alert` without
spinning up a web server at all.

## Verifying the signature with hmac

An endpoint that accepts whatever JSON shows up and acts on it is an
open door. Most security and SOAR platforms that support outbound
webhooks sign each request: they compute an HMAC over the raw request
body using a shared secret, and send it as a header (the exact header
name varies by vendor — `X-Signature`, `X-Hub-Signature-256`, and
similar are all common). Your receiver recomputes that same HMAC over
the bytes it received and compares it to the header. If they don't
match, the payload was either corrupted in transit or wasn't sent by
the tool that holds the shared secret — reject it.

```python
import hmac
import hashlib

WEBHOOK_SECRET = b"shared-secret-from-the-sending-tool"

def verify_signature(raw_body: bytes, signature_header: str) -> bool:
    expected = hmac.new(WEBHOOK_SECRET, raw_body, hashlib.sha256).hexdigest()
    # compare_digest runs in constant time, so an attacker can't use
    # response-timing differences to guess the signature byte by byte.
    return hmac.compare_digest(expected, signature_header)
```

Two details are easy to get wrong here. First, you must verify against
the **raw request bytes**, not a re-serialized version of the parsed
JSON — Flask's `request.get_data()` gives you that, while
`request.get_json()` has already round-tripped the data through a
parser that may reorder keys or change whitespace, which would make
the signature mismatch even on a legitimate request. Second, always use
`hmac.compare_digest`, never `==`, for the comparison — a plain string
comparison can leak timing information about how many leading bytes
matched.

## Making processing idempotent

Webhook senders generally don't guarantee exactly-once delivery — if
your receiver is slow, or the network blips, or the sender's retry
logic simply fires twice, you can receive the same event more than
once. If `process_alert` creates a ticket or pages someone, a duplicate
delivery means a duplicate ticket or a duplicate page. The fix is to
track which events you've already handled, keyed by the event's own
unique ID (most webhook payloads include one, often called `event_id`
or similar):

```python
processed_events = set()  # in production: a table with a TTL, not a set in memory

def process_alert(payload: dict) -> None:
    event_id = payload.get("event_id")
    if event_id in processed_events:
        return  # already handled this exact event — do nothing
    processed_events.add(event_id)

    # real work: enrich, create a ticket, notify a channel, etc.
```

A Python `set` in memory is fine for understanding the pattern, but it
resets every time your process restarts and doesn't work if you run
more than one instance of the receiver. In a real deployment this
becomes a row in a database or a key in Redis with a time-to-live —
long enough to cover realistic redelivery windows, short enough that
the table doesn't grow forever.

## Key terms

| Term | Meaning |
|---|---|
| Webhook | An outbound HTTP POST a tool makes to your URL the moment an event happens, instead of you polling its API |
| HMAC signature | A keyed hash of the raw request body a sender attaches to a webhook so the receiver can prove the payload wasn't forged or altered |
| `hmac.compare_digest` | A constant-time string comparison used for signatures, so response timing can't leak how much of the signature matched |
| Idempotent processing | Handling the same event ID more than once without producing duplicate side effects, since redelivery isn't guaranteed to be exactly-once |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
must signature verification happen against the raw request bytes
rather than the parsed-and-reserialized JSON, and what specifically
goes wrong for your downstream systems if you skip the idempotency
check entirely?
