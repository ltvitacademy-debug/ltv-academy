# Script — HTTP Actions and Calling REST APIs

## Segment 1 (title)

Most of the connectors you've used so far exist because Microsoft built them. But Castlebridge Logistics' carrier-tracking partner, Meridian TrackAPI, doesn't have a Power Automate connector at all — just a plain REST API. The HTTP action is how a flow talks to it anyway.

## Segment 2 (steps)

Every HTTP action has four pieces. The method says what kind of operation you're doing — GET to read, POST to create, PUT or PATCH to update, DELETE to remove. The URI is the exact address of the endpoint, often built with dynamic content from an earlier step. Headers carry metadata like the content type and an authorization token. And the body carries the JSON payload on a POST or PUT — a GET usually skips it entirely.

## Segment 3 (code)

Here's what that looks like for Castlebridge. The flow sends a GET to Meridian's shipment status endpoint, with the shipment ID plugged in from the trigger, and an authorization header carrying a bearer token. No body needed, because a GET is just asking for data, not sending any.

## Segment 4 (steps)

Every call comes back with a status code, and you can't just assume it worked. Codes in the 200s mean success. A 401 or 403 means authentication failed. A 404 means the URI or shipment ID was wrong. And a 500 means the problem is on Meridian's side. Checking that code with a condition lets the flow retry, alert dispatch, or log the failure instead of silently breaking.

## Segment 5 (outro)

Whatever Meridian sends back arrives as a raw JSON string — not yet something your flow can work with field by field. That's exactly what the next lesson solves: turning that string into usable data with Parse JSON.
