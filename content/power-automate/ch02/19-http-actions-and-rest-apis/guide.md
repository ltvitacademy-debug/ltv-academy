# HTTP Actions and Calling REST APIs

Most of what you've built so far in this course leans on a first-party connector — SharePoint, Outlook, Teams, Dataverse. Those connectors exist because Microsoft built them. But Castlebridge Logistics' carrier-tracking partner, Meridian TrackAPI, doesn't have a Power Automate connector at all. It exposes a plain REST API, the same way thousands of other systems do. The HTTP action is the piece that lets a flow talk to any of them, connector or not.

## What you'll learn

- What the HTTP action is, and when you need it instead of a dedicated connector
- The four pieces of every HTTP call: method, URI, headers, and body
- How to read an HTTP status code and branch a flow on success or failure
- Where authentication fits into an HTTP call — previewed here, covered in full in Lesson 21

## Why you need the HTTP action

A connector is really just a pre-built wrapper around calls that someone at Microsoft (or a third party) already wrote for you. The HTTP action skips the wrapper. You give it a method, a URI, and whatever headers and body the target system expects, and it sends that request directly — no connector required. For Castlebridge's dispatch team, that means a flow can reach out to Meridian TrackAPI's live-status endpoint for a shipment even though nobody ever builds a "Meridian" connector.

## The four pieces of every HTTP call

- **Method** — GET to read data, POST to create something, PUT or PATCH to update it, DELETE to remove it. Meridian's tracking lookup is a GET.
- **URI** — the exact web address of the endpoint, often with a shipment ID or query string baked in using dynamic content from an earlier step.
- **Headers** — metadata the API needs alongside the request, most commonly `Content-Type` and an `Authorization` header carrying a token.
- **Body** — the JSON payload you send on a POST or PUT. A GET request usually has no body at all.

## Reading the response and handling failure

Every HTTP action returns a status code along with its response. Codes in the 200s mean success. A 401 means the call wasn't authenticated correctly; a 404 means the URI or shipment ID was wrong; a 500 means the problem is on Meridian's end, not yours. Rather than letting a bad call silently break the flow, you configure a **Condition** (or a **Run After** setting on the next step) that checks the status code and routes the flow down a different path — retry, alert dispatch, or log the failure — instead of crashing.

## Key terms

- **HTTP action** — the built-in action that sends a raw web request to any REST endpoint
- **Method** — GET, POST, PUT, PATCH, or DELETE; what kind of operation the call performs
- **Headers** — key-value metadata sent with the request, such as `Authorization` or `Content-Type`
- **Status code** — the three-digit number the API returns describing whether the call succeeded
