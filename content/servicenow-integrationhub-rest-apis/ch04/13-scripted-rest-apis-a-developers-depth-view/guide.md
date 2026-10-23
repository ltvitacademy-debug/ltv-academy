# Lesson 13 — Scripted REST APIs: a Developer's-Depth View

**Chapter 4 · Exposing ServiceNow Data via REST · Lesson 13 of 29**

## What you'll learn

- A one-sentence recap of what course 6 already covered, and what this lesson adds on top
- Reading query parameters for real, with `request.queryParams.paramName`
- Supporting several HTTP methods as separate Resources under one API definition
- Setting real HTTP response status codes with `response.setStatus()` beyond the basic 404 case
- The REST API's own role requirement — a distinct security layer, checked before any script runs

## What course 6 already covered

Course 6, Chapter 8 introduced the Scripted REST API mechanically: a `sys_ws_definition` with a
base path, one Resource with a relative path and a script, and the `request`/`response` objects
that script receives. That's enough to build one working GET endpoint. This lesson goes past
that single-endpoint mental model into how a real Scripted REST API is actually shaped once it
has more than one Resource, more than one method, and real access control to worry about.

## Reading query parameters for real

Course 6 showed `request.queryParams.number` in passing. In a real Resource, query parameters are
how optional filters and options get passed without cluttering the path. Say a Resource's relative
path is `/equipment`, method GET, meant to list equipment optionally filtered by category:

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var category = request.queryParams.category; // undefined if not supplied

    var gr = new GlideRecord('x_acme_eqchk_equipment');
    if (category) {
        gr.addQuery('category', category);
    }
    gr.query();

    var results = [];
    while (gr.next()) {
        results.push({
            asset_tag: gr.getValue('asset_tag'),
            equipment_name: gr.getValue('equipment_name'),
            availability: gr.getValue('availability')
        });
    }

    response.setBody({ result: results });

})(request, response);
```

Every `queryParams` property is a string — `request.queryParams.category` is `undefined` when the
caller doesn't send `?category=Laptop` at all, which is exactly why the script checks `if
(category)` before calling `addQuery()` rather than assuming it's always present.

## One API, several Resources, several methods

A single Scripted REST API definition can carry many Resources, each with its own relative path
and HTTP method, all sharing one base path. A real "Equipment API" built on top of
`x_acme_eqchk_equipment` might define:

```
Base path: /api/x_acme_eqchk/equipment

Resource 1:  GET  /{sys_id}        -> read one piece of equipment
Resource 2:  GET  /                -> list equipment, optional ?category=
Resource 3:  POST /                -> create a new equipment record
Resource 4:  PUT  /{sys_id}        -> update an existing equipment record
```

Each Resource is its own record with its own script — a GET and a POST on the same relative path
`/` are two separate Resources, not one script branching on method. That separation is what keeps
each script focused on exactly one operation, instead of growing a long if/else chain checking
`request.httpMethod` inside a single script.

## Real status codes, not just 404

Course 6 showed `response.setStatus(404)` for "record not found." A developer's-depth view uses
the right status for each real outcome, not just that one case:

```javascript
(function process(request, response) {

    var body = request.body.data;

    if (!body || !body.asset_tag) {
        response.setStatus(400); // bad request — required field missing
        response.setBody({ error: 'asset_tag is required' });
        return;
    }

    var gr = new GlideRecord('x_acme_eqchk_equipment');
    gr.initialize();
    gr.asset_tag = body.asset_tag;
    gr.equipment_name = body.equipment_name;
    gr.category = body.category;
    var newSysId = gr.insert();

    if (!newSysId) {
        response.setStatus(500); // insert failed server-side
        response.setBody({ error: 'Could not create equipment record' });
        return;
    }

    response.setStatus(201); // created
    response.setBody({ sys_id: newSysId, asset_tag: gr.getValue('asset_tag') });

})(request, response);
```

`400` signals the caller sent a bad request (missing data), `201` signals a resource was actually
created (not just a generic `200`), and `500` signals something failed on the server's side, not
the caller's. An integration consuming this API can branch its own error handling on these codes
instead of parsing the response body to guess what happened.

## The REST API's own role requirement — a separate security layer

Every `sys_ws_definition` has its own **Default requested authentication** and an optional set of
**required roles**, configured on the API definition itself — not on any individual Resource, and
not the same thing as a table's ACLs. This matters because of *when* it's checked: the platform
evaluates the API-level role requirement before any Resource's script runs at all. A caller who
lacks the required role never reaches the script — they get an authorization failure straight from
the platform. Table ACLs still apply on top of that, inside whatever GlideRecord calls the script
makes — but the API-level role check is the first gate, and it's evaluated first for a reason: it
keeps the entire API unreachable to the wrong caller, rather than relying on every script inside it
to re-check permissions correctly every time.

## Key terms

| Term | Meaning |
|---|---|
| `request.queryParams.name` | Reads a `?name=value` query parameter; `undefined` if the caller didn't send it |
| Resource (per method) | Each HTTP method on a path is its own Resource record with its own script, not a branch inside one script |
| `response.setStatus()` | Sets the real HTTP status for the outcome — 400, 201, 404, 500 — not just a default 200 |
| Required roles (on the API definition) | A role requirement set on the Scripted REST API itself, checked before any Resource's script runs |

## Check yourself

Without looking back: why does the platform check a Scripted REST API's required roles before any
Resource script runs, rather than leaving each script to check `gs.hasRole()` for itself?
