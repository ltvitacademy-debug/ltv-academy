# Lesson 12 — The Table API

**Chapter 4 · Exposing ServiceNow Data via REST · Lesson 12 of 29**

## What you'll learn

- What the Table API is, and why it requires zero custom scripting to use
- The real endpoint pattern for list, single-record, create, update, and delete operations
- The query parameters that control what comes back: `sysparm_query`, `sysparm_fields`, `sysparm_limit`
- The real tradeoff between reaching for the Table API and writing a Scripted REST API instead

## An API you didn't have to build

Every table in a ServiceNow instance — `incident`, `sys_user`, a custom table you created last
week — already has a working REST API the moment the table exists. No `sys_ws_definition`
record, no Resource, no script. This is the **Table API**, and it's the platform's built-in,
automatic REST interface to the same data GlideRecord reads and writes server-side. If all an
integration needs is "read some incidents" or "create a record in this custom table," the Table
API usually gets that done in minutes, with no development at all.

## The real endpoint pattern

The base path is `/api/now/table/{tableName}`, and the HTTP method decides what happens:

```
GET    /api/now/table/incident              -> list (query) incidents
GET    /api/now/table/incident/{sys_id}     -> one specific incident
POST   /api/now/table/incident              -> create a new incident
PUT    /api/now/table/incident/{sys_id}     -> replace an incident's fields
PATCH  /api/now/table/incident/{sys_id}     -> update only the fields sent
DELETE /api/now/table/incident/{sys_id}     -> delete an incident
```

Swap `incident` for any table name — `x_acme_eqchk_equipment`, `change_request`, `sys_user` — and
the same six operations work, with no additional setup. A `GET` with no `sys_id` always means
"give me a list"; a `GET` with a `sys_id` always means "give me exactly one record."

## Filtering the list with `sysparm_query`

An unfiltered `GET /api/now/table/incident` would try to return every incident in the instance.
`sysparm_query` takes an **encoded query** — the same encoded-query syntax `GlideRecord.addQuery()`
and `addEncodedQuery()` build and consume server-side, just written out as a query string value:

```
GET /api/now/table/incident?sysparm_query=active=true^priority=1
```

That `^` joins conditions with AND, exactly as it does in an encoded query inside a Business Rule
or Script Include. Anyone who has read an encoded query string in this path already knows how to
read one here — the Table API doesn't introduce new query syntax, it just accepts the syntax you
already have.

## Trimming the response: `sysparm_fields` and `sysparm_limit`

Two more query parameters shape what comes back, not which records match:

```
GET /api/now/table/incident?sysparm_query=active=true^priority=1
    &sysparm_fields=number,short_description,assigned_to
    &sysparm_limit=25
```

`sysparm_fields` is a comma-separated list — only those fields are serialized into each record,
instead of every field on the table (which, for a table like `incident`, is a lot of unused
bandwidth). `sysparm_limit` caps how many records come back in one call, which matters for paging
through a large result set without one response trying to carry thousands of rows.

A real response body for that call looks like this:

```json
{
  "result": [
    {
      "number": "INC0010045",
      "short_description": "VPN client fails to connect after update",
      "assigned_to": "Dana Reyes"
    },
    {
      "number": "INC0010051",
      "short_description": "Printer offline on 3rd floor",
      "assigned_to": "Miguel Torres"
    }
  ]
}
```

Every Table API response wraps its payload in a top-level `result` — a single object for a
one-record `GET`, an array for a list `GET`.

## Where the Table API stops being the right tool

The Table API's whole advantage is that it's automatic: it mirrors the table's own fields and
offers no way to run custom logic in between. That's also its limit. It cannot validate an
incoming payload against business rules beyond what the table's own ACLs and Business Rules
already enforce, it cannot reshape a response into a format an external system expects (it always
returns the table's raw field structure), and it cannot combine data from more than one table into
a single response. A Scripted REST API — this chapter's next two lessons — exists specifically for
those cases: anywhere the integration needs transformation, aggregation, or custom validation
logic that the Table API's zero-code convenience can't provide.

## Key terms

| Term | Meaning |
|---|---|
| Table API | ServiceNow's built-in, automatic REST interface to every table — no custom scripting required |
| `sysparm_query` | An encoded query string (same syntax as `GlideRecord`) that filters which records a list `GET` returns |
| `sysparm_fields` | A comma-separated field list that trims which fields appear in the response |
| `sysparm_limit` | Caps how many records a list `GET` returns in one response |
| `result` | The top-level key every Table API response wraps its payload in |

## Check yourself

Without looking back: what two things can a Scripted REST API do that the Table API fundamentally
cannot, no matter how `sysparm_query` or `sysparm_fields` are combined?
