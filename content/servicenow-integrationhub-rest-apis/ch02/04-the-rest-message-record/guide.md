# Lesson 4 — The REST Message Record

**Chapter 2 · Consuming External REST APIs · Lesson 4 of 29**

## What you'll learn

- What a REST Message record (`sys_rest_message`) actually represents
- Why the Endpoint and Authentication Profile live on the parent record, not the operation
- What a REST Message Function (`sys_rest_message_fn`) is, and why each HTTP operation gets its own
- How a Function's relative path combines with the parent's base Endpoint at request time
- Where this record fits relative to the inbound Scripted REST APIs you'll see in Chapter 4

## The parent record: one external system, one REST Message

Chapter 1 drew the line between integrations ServiceNow initiates (outbound) and integrations
something else initiates against ServiceNow (inbound). A **REST Message** record, stored in the
`sys_rest_message` table, is the real ServiceNow object for the outbound side — it is the
definition of "how to talk to one external REST API."

A REST Message record holds exactly two things at the parent level:

- **Endpoint** — the base URL of the external system, e.g. `https://api.weatherservice.com/v1`
- **Authentication Profile** — a default credential (Basic Auth, OAuth 2.0, or an API key
  profile — Chapter 3 covers each) that every operation under this record uses unless a specific
  Function overrides it

That's deliberate. The base URL and the credential rarely change per-operation — they describe the
*system* you're integrating with, not any one call to it. If the weather service rotates its API
key, you update the Authentication Profile once, and every Function under the REST Message
inherits the fix automatically.

## The child records: one Function per operation

A REST Message by itself can't send anything — it has no HTTP method and no path. Each real
operation against that external system is a separate **REST Message Function** record
(`sys_rest_message_fn`), a child of the parent REST Message. A Function holds:

- **HTTP method** — GET, POST, PUT, PATCH, or DELETE
- **Endpoint** (yes, Functions have their own Endpoint field too) — usually just the relative
  path, appended to the parent's base Endpoint, e.g. `/current?city=${city}`
- **HTTP headers** — specific to this operation, e.g. `Content-Type: application/json` on a POST
  but not needed on a GET
- **Content** — the request body template, for methods that send one

So a single REST Message named `WeatherAPI` might have two Functions under it:

```
REST Message: WeatherAPI
  Endpoint: https://api.weatherservice.com/v1
  Authentication Profile: WeatherAPI Basic Auth

  Function: getCurrentConditions
    HTTP Method: GET
    Endpoint: /current?city=${city}

  Function: getForecast
    HTTP Method: GET
    Endpoint: /forecast?city=${city}&days=${days}
```

Notice the `${city}` and `${days}` placeholders. Those are real, literal syntax inside a
Function's Endpoint or Content field — a name wrapped in `${ }` that script fills in at
request time with `setStringParameterNoEscape()`. Lesson 6 covers exactly how.

## Why split the model this way

This two-level structure (one parent, many children) mirrors how a real external API is usually
organized: one base host, many endpoints hanging off it. It also means you reuse the same
Authentication Profile across every operation against that system without re-entering it, and a
developer calling the REST Message from script only ever needs two strings — the REST Message
name and the Function name — to reach any configured operation. Lesson 6 shows that exact call
pattern using `RESTMessageV2`.

## How this differs from the Scripted REST APIs you'll see later

It's easy to conflate the two, so be precise: a **REST Message** (this lesson) is what ServiceNow
uses to call *someone else's* API — outbound. A **Scripted REST API** (Chapter 4) is what
ServiceNow exposes so *someone else* can call *it* — inbound. Same HTTP concepts (methods,
headers, JSON bodies), opposite direction, and genuinely different records under the hood.

## Key terms

| Term | Meaning |
|---|---|
| REST Message | `sys_rest_message` — the parent record defining one outbound connection: base Endpoint + default Authentication Profile |
| REST Message Function | `sys_rest_message_fn` — a child record defining one HTTP operation: method, relative path, headers, body |
| Endpoint | The base URL on the parent, or the relative path on a Function, that combine into the full request URL |
| Authentication Profile | The credential record a REST Message uses by default for every Function under it |
| Placeholder | `${name}` syntax inside a Function's Endpoint or Content, substituted by script before the request is sent |

## Check yourself

A REST Message named `CRM` has one Function, `createContact`, configured as a POST. Where does
the base URL live, where does the HTTP method live, and why does ServiceNow split those two
pieces of information across two different records instead of storing them together on one?
