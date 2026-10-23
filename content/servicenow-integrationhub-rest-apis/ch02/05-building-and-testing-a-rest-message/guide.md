# Lesson 5 — Building & Testing a REST Message

**Chapter 2 · Consuming External REST APIs · Lesson 5 of 29**

## What you'll learn

- The real order of steps for configuring a working REST Message
- How to add a Function for each distinct operation you actually need
- What the built-in "Test" capability on a Function does, and why it matters before you script
- How to read a test's real response — status code and body — to verify configuration
- Why testing from the record catches configuration mistakes before they become script bugs

## Step one: configure the parent REST Message

Start with the REST Message record itself (`sys_rest_message` from Lesson 4). Two fields matter
most at this level:

- **Endpoint** — the base URL of the external system, entered exactly as the provider documents
  it, with no trailing operation path. For a fictional customer-lookup service, that might be
  `https://api.crmvendor.com/v2`.
- **Authentication Profile** — pick (or create, per Chapter 3) the credential this system expects.
  If every operation against this API uses the same credential, set it here once so every Function
  inherits it without re-entering anything.

Get the base Endpoint right first. Every Function's relative path gets appended to whatever you
put here, so a typo at the parent level breaks every child Function at once — which is exactly
why you test at the Function level before moving on, not after building all of them.

## Step two: add a Function for each real operation

Add one REST Message Function per distinct operation you actually need — don't build Functions
speculatively for operations nothing calls yet. For a customer-lookup integration you might need
exactly two:

```
Function: getCustomerByEmail
  HTTP Method: GET
  Endpoint: /customers?email=${email}

Function: createCustomer
  HTTP Method: POST
  Endpoint: /customers
  HTTP Header: Content-Type = application/json
  Content: {"email":"${email}","name":"${name}"}
```

Note the differences between the two: the GET needs no Content body, just a query-string
placeholder; the POST needs a `Content-Type` header and a JSON body template with its own
placeholders. Each placeholder here (`${email}`, `${name}`) gets a real value substituted in by
script — Lesson 6 shows exactly how.

## Step three: test the Function before trusting it

This is the step worth slowing down for. Every REST Message Function record has a real, built-in
**Test** capability — a button on the Function form that actually sends a live HTTP request to
the configured Endpoint, using the configured Authentication Profile, right from inside the
record. You're not simulating anything; this is a genuine outbound call to the real external
system.

When you run Test, you supply any variable values the Function's placeholders need (so for
`getCustomerByEmail`, you'd enter a real test email address), and ServiceNow returns the actual
response:

- **HTTP status code** — 200 for success, 401 if the Authentication Profile is wrong, 404 if the
  path is wrong, 500 if the external system itself errored
- **Response body** — the real JSON (or XML) payload the external system sent back, visible in
  full on the test results screen

## Why testing here, and not just in script, matters

If you skip the Test step and go straight to calling the REST Message from a Script Include, a
configuration mistake — a wrong path, a stale credential, a missing header — shows up as a
generic script-side failure that's harder to diagnose, because you can't immediately tell whether
the problem is your script's logic or the REST Message's configuration underneath it. Testing at
the record level isolates configuration problems from script problems: if Test returns a clean
200 with the expected body, you know the REST Message itself is correct, and any later failure
you hit when calling it from script (Lesson 6) is a script-side problem, not a configuration one.

## Key terms

| Term | Meaning |
|---|---|
| Base Endpoint | The root URL configured on the parent REST Message; every Function's path is appended to it |
| Test (on a Function) | A built-in capability that sends a real, live HTTP request from inside the record, before any script exists |
| HTTP status code | The real numeric result of a test call — 200 success, 401 auth failure, 404 bad path, 500 server error |
| Response body | The actual payload (JSON or XML) the external system returned, shown in full on the test results |
| Content | The request body template on a Function, used by methods like POST that send data |

## Check yourself

You configure a new Function, run Test, and get back a 401 status code. Is the problem more
likely in the base Endpoint, the Authentication Profile, or the relative path — and how does
isolating that now save you time versus discovering it later from inside a Script Include?
