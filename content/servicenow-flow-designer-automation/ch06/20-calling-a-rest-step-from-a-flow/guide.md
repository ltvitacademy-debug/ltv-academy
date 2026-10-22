# Lesson 20 — Calling a REST Step From a Flow

**Chapter 6 · Integration Hub Actions in Flow Designer · Lesson 20 of 27**

## What you'll learn

- The real fields that make up a REST step: method, endpoint, headers, body, auth
- Why a Connection & Credential Alias replaces hardcoding a URL and credential per flow
- How data pills feed the request body, and how the response feeds data pills back
- How a REST step fits next to the Script and spoke actions you already know

## The fields inside a REST step

A REST step is a flow action, dropped into the canvas like any trigger or action you've already
used in this course. Configuring one means filling in five real things:

- **HTTP method** — GET, POST, PUT, PATCH, or DELETE, matching whatever the external API expects.
- **Endpoint URL** — the address being called. In a well-built flow this usually isn't typed in
  as a raw string; it's built from a Connection & Credential Alias record instead (more below).
- **Headers** — key/value pairs the external API requires, such as `Content-Type:
  application/json` or a custom header the target system needs.
- **Request body** — the payload sent with the call, typically JSON, and typically populated
  using data pills carried in from earlier steps in the flow.
- **Response mapping** — after the call returns, specific fields in the JSON response get mapped
  into new data pills that later steps in the flow can use.

```
REST step configuration:
  Method:    POST
  Endpoint:  from Connection & Credential Alias
  Headers:   Content-Type: application/json
  Body:      { "incident_id": {{data pill}} }
  Response:  extract {{account_tier}} -> new data pill
```

## Connection & Credential Alias: don't hardcode it

Hardcoding a URL and a credential directly into one flow's REST step works until that credential
rotates, or until a second flow needs to call the same external system. ServiceNow's real
mechanism for avoiding that is the Connection & Credential Alias — a reusable record that stores
the connection details (the base URL, the authentication profile) once, centrally, and securely.
A REST step references the alias instead of typing the URL and credential inline. Rotate the
credential in one place, and every flow using that alias picks up the change automatically.

## Data pills: in and out

Everything you've learned about data pills elsewhere in this course applies directly here. Going
in, the request body is usually built from data pills carried forward from the trigger or earlier
actions — for example, an incident's number or short description, inserted into the JSON payload
sent to the external system. Coming out, the REST step's response mapping lets you pull a
specific field out of the JSON that comes back and turn it into a new data pill, exactly like any
other action's output. A later step in the flow — a notification, a record update, another REST
step — can then reference that pill the same way it references any other output in the flow.

## Where the REST step sits among your other tools

You already know the Script step (custom code) and, from Lesson 19, spoke actions (pre-built,
system-specific). The REST step sits between them: more structured than a Script step — no code,
just configured fields — and more general than a spoke, because it isn't limited to systems that
happen to have a pre-built action set. Reach for a spoke first when one exists for the system
you're integrating with; reach for the REST step when it doesn't.

## Key terms

| Term | Meaning |
|---|---|
| REST step | A flow action configured with a method, endpoint, headers, body, and auth to call any REST API |
| Connection & Credential Alias | A reusable record storing a connection's base URL and authentication profile, referenced instead of hardcoded |
| Request body | The payload sent with a REST call, often built from data pills carried forward in the flow |
| Response mapping | Extracting a field from the REST call's JSON response into a new data pill for later steps |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why does a REST step typically
reference a Connection & Credential Alias instead of a hardcoded URL and credential, and what
happens to a field from the response after it's mapped into a data pill?
