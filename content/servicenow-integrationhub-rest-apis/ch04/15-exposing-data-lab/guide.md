# Lesson 15 — Exposing Data Lab

**Chapter 4 · Exposing ServiceNow Data via REST · Lesson 15 of 29**

## What you'll learn

- Building a real, versioned Scripted REST API on top of course 6's capstone tables
- Writing a v1 GET resource with real path-parameter and query-parameter handling
- Returning a real 404 via `response.setStatus(404)` when a record isn't found
- Sketching, without building it yet, what a v2 could add later without breaking v1

## The scenario

Course 6's capstone built a scoped application, `x_acme_eqchk`, to track equipment loaned out to
employees. It has two real tables: `x_acme_eqchk_equipment` (the inventory — asset tag, name,
category, condition, availability) and `x_acme_eqchk_request` (extends `task`, carrying the
approval-then-fulfillment workflow — `equipment`, `requested_for`, `approved_by`, `due_date`,
`checkout_date`, `return_date`).

The ask now: an external facilities dashboard needs to look up a single checkout request's status
over REST, without logging into the instance. This lab exposes that one request, as a versioned
Scripted REST API — v1 first, with a plan for what v2 could add.

## Setting up the API and its version

**The API definition (`sys_ws_definition`):** name "Equipment Checkout API," base path
`/api/x_acme_eqchk`. **Required roles:** `x_acme_eqchk.equipment_admin` — only that role (or
`admin`) can call anything under this API at all, checked by the platform before any Resource
script runs, exactly as the chapter's security-layer lesson covered.

**The Version:** a Version record named `v1`, contributing the `/v1` base-path segment. Everything
built in this lab is reachable at `/api/x_acme_eqchk/v1/...`.

**The Resource:** relative path `/checkout/{sys_id}`, method GET. The full URL a caller hits is:

```
GET /api/x_acme_eqchk/v1/checkout/{sys_id}
```

## The v1 Resource script, built step by step

Start with the path parameter and the lookup:

```javascript
(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    var requestId = request.pathParams.sys_id;

    var gr = new GlideRecord('x_acme_eqchk_request');
    if (!gr.get(requestId)) {
        response.setStatus(404);
        response.setBody({ error: 'No checkout request found with sys_id ' + requestId });
        return;
    }
```

`request.pathParams.sys_id` pulls the identifier straight out of the URL's `{sys_id}` segment.
`gr.get(requestId)` is the familiar one-line GlideRecord lookup — it returns `false` when nothing
matches, which is exactly the signal to answer with a 404 instead of a record built from empty
fields.

Next, handle one optional query parameter — whether the caller wants the full approval trail
included, or just the current status:

```javascript
    var includeHistory = request.queryParams.include_history === 'true';
```

`request.queryParams.include_history` is a string or `undefined`, never a boolean — the explicit
`=== 'true'` comparison is what turns it into one. Omitting `?include_history=true` entirely
means `includeHistory` evaluates to `false`, which is the sensible default: a dashboard asking for
one record's status doesn't need the full history unless it explicitly asks for it.

Now build the response body:

```javascript
    var result = {
        number: gr.getValue('number'),
        short_description: gr.getValue('short_description'),
        state: gr.state.getDisplayValue(),
        requested_for: gr.requested_for.getDisplayValue(),
        equipment_name: gr.equipment.equipment_name.toString(),
        due_date: gr.getValue('due_date'),
        checkout_date: gr.getValue('checkout_date'),
        return_date: gr.getValue('return_date')
    };

    if (includeHistory) {
        result.approved_by = gr.approved_by.getDisplayValue();
    }

    response.setStatus(200);
    response.setBody(result);

})(request, response);
```

`gr.equipment.equipment_name` dot-walks through the `equipment` reference field to the equipment
record's own name — the same reference pattern course 6's capstone used, now serialized straight
into a REST response instead of read on a form. The `approved_by` field only gets added to the
response when `includeHistory` is true, which is the Resource choosing what to return based on a
real caller-supplied option, not just a fixed shape every time.

## What a real call returns

A GET to `/api/x_acme_eqchk/v1/checkout/<sys_id>?include_history=true` for an approved,
checked-out request returns:

```json
{
  "number": "EQR0001042",
  "short_description": "Loaner laptop for onboarding",
  "state": "Checked Out",
  "requested_for": "Priya Patel",
  "equipment_name": "Dell Latitude 5440",
  "due_date": "2026-11-05 17:00:00",
  "checkout_date": "2026-10-20 09:30:00",
  "return_date": "",
  "approved_by": "Marcus Webb"
}
```

Without `include_history`, the same call omits `approved_by` entirely — the response shape is
smaller by exactly the field the caller didn't ask for.

## A real 404 in practice

A GET to `/api/x_acme_eqchk/v1/checkout/` with a sys_id that doesn't exist on
`x_acme_eqchk_request` never reaches the `response.setBody(result)` line at all — `gr.get()`
returns `false`, the script sets status 404, and the response is:

```json
{ "error": "No checkout request found with sys_id 7f3a0c9b..." }
```

The facilities dashboard can branch cleanly on that status code — 404 means "this checkout doesn't
exist," not "something went wrong on our end."

## What a v2 could add later, without touching v1

v1 answers "what's the current status of this one checkout." A v2 — a separate Version record, a
separate Resource script, under `/api/x_acme_eqchk/v2/...` — could add a computed `is_overdue`
flag (comparing `due_date` against the current date) or let `GET /checkout` with no sys_id list
every checkout for a given `requested_for`, the way Lesson 13's multi-Resource pattern allows.
Neither addition touches v1's script at all — the facilities dashboard calling v1 today keeps
getting exactly the response shape it was built against, even after v2 ships.

## Key terms

| Term | Meaning |
|---|---|
| `request.pathParams.sys_id` | Pulls the `{sys_id}` segment out of the Resource's own URL path |
| `request.queryParams.include_history === 'true'` | Converts a string query parameter into a real boolean before branching on it |
| `gr.equipment.equipment_name` | Dot-walking a reference field straight into a REST response body |
| `response.setStatus(404)` | Returned before `setBody()` runs, when `gr.get()` finds no matching record |

## Check yourself

Without looking back: in this lab's script, why does `includeHistory` compare
`request.queryParams.include_history` to the literal string `'true'` instead of using the value
directly in an `if` statement?
