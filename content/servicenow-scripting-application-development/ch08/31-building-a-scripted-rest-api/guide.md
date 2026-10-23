# Lesson 31 — Building a Scripted REST API

**Chapter 8 · Scripted REST APIs & Script Actions · Lesson 31 of 37**

## What you'll learn

- What a Scripted REST API actually is, and the two record types that define one
- The real `request` and `response` objects your resource script has access to
- How to read path parameters and send back JSON with `response.setBody()`
- How this fundamentals-level build differs from the full REST/IntegrationHub course ahead

## A custom endpoint, not a built-in one

Every ServiceNow table already exposes a Table API endpoint for free — you've used GlideRecord
server-side, but the platform also offers REST access to any table over HTTP. A **Scripted REST
API** is different: it's an endpoint *you* define, with a URL path, an HTTP method, and a script
you write, for cases where the generic Table API doesn't fit — a custom lookup, a calculated
value, a payload shaped exactly how an external system expects it.

Two record types work together to define one:

- **`sys_ws_definition`** — the API itself. It has a name and a **base path**, something like
  `/api/x_acme_fleet/vehicle`. Everything under that base path belongs to this API.
- **Resource** (a child record under the API) — one actual endpoint. Each Resource has its own
  **relative path** (appended to the base path), its own **HTTP method** (GET, POST, PUT,
  DELETE), and its own server-side script.

So a single Scripted REST API can hold several Resources — a GET for reading, a POST for
creating — each with a different path or method, all under one shared base path.

## The `request` and `response` objects

Inside a Resource's script, the platform hands you two objects — no setup, they're just there:

- **`request`** — the incoming HTTP request. `request.body.data` holds the parsed JSON body (for
  POST/PUT), `request.pathParams` holds any `{placeholders}` from the URL, and
  `request.queryParams` holds `?key=value` query string parameters.
- **`response`** — how you send something back. `response.setBody(obj)` serializes a JavaScript
  object as the JSON response, and `response.setStatus(code)` sets the HTTP status code
  (200, 404, 400, and so on).

## A real GET resource: look up an Incident by number

Say the Resource's relative path is `/incident/{number}`, method GET. The `{number}` segment is
a path parameter — ServiceNow parses it into `request.pathParams.number` automatically:

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var incidentNumber = request.pathParams.number;

    var gr = new GlideRecord('incident');
    gr.addQuery('number', incidentNumber);
    gr.query();

    if (!gr.next()) {
        response.setStatus(404);
        response.setBody({ error: 'No incident found with number ' + incidentNumber });
        return;
    }

    var result = {
        number: gr.getValue('number'),
        short_description: gr.getValue('short_description'),
        state: gr.state.getDisplayValue(),
        priority: gr.priority.getDisplayValue(),
        assigned_to: gr.assigned_to.getDisplayValue()
    };

    response.setBody(result);

})(request, response);
```

Nothing here is new mechanically — it's the same GlideRecord query pattern from earlier in this
course, just called from a REST script instead of a Business Rule or Script Include. The only new
pieces are reading `request.pathParams` and writing out through `response.setBody()` instead of
returning a value.

## A GET that accepts a query parameter instead

If the Resource's path were just `/incident` (no placeholder), you'd read the same number from a
query string like `/api/x_acme_fleet/vehicle/incident?number=INC0010023`:

```javascript
(function process(request, response) {
    var incidentNumber = request.queryParams.number;
    // ...same GlideRecord lookup as above
})(request, response);
```

Path parameters are for identifying *which* resource ("this one incident"); query parameters are
for filtering or options on top of that.

## What's deliberately out of scope here

This lesson covers defining one endpoint — enough to build and test a working GET resource.
Authentication schemes, versioning a Scripted REST API across releases, request headers, custom
error payload standards, and consuming *outbound* REST calls from ServiceNow to other systems are
real topics — they're the subject of the next course in this path, ServiceNow IntegrationHub &
REST APIs. Keep this lesson's mental model simple: a Resource is a URL + a method + a script with
`request` in and `response` out.

## Key terms

| Term | Meaning |
|---|---|
| Scripted REST API (`sys_ws_definition`) | A custom REST endpoint family you define, with a shared base path |
| Resource | One endpoint under a Scripted REST API — its own relative path, HTTP method, and script |
| `request` | The incoming request object — `.body.data`, `.pathParams`, `.queryParams` |
| `response` | The outgoing response object — `.setBody()`, `.setStatus()` |
| Path parameter | A `{placeholder}` segment in a Resource's path, parsed into `request.pathParams` |

## Check yourself

Without looking back: what are the two record types that together define a Scripted REST API, and
which one actually holds the HTTP method and the script?
