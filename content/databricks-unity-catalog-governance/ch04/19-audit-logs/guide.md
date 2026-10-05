# Lesson 19 — Audit Logs

**Chapter 4 · Discovery, Lineage and Auditing · Lesson 19 of 25**

## What you'll learn

- The real schema of `system.access.audit`, column by column
- A working query for "who did what, and when"
- How to narrow in on a specific action against a specific object
- Why some `request_params` values are masked, and who can see them unmasked
- Retention and regional-scope considerations for audit data

## What gets logged

`system.access.audit` is the audit log system table introduced in Lesson 18 — one row per auditable event, across every workspace in your account's region. "Auditable" is broad: table reads, grants, login attempts, notebook executions, job runs, and configuration changes all land here, tagged with the service that generated them (`unityCatalog`, `accounts`, `clusters`, and others).

## The real schema

| Column | Type | What it holds |
|---|---|---|
| `event_time` / `event_date` | timestamp / date | When the event happened — filter on `event_date` for performance |
| `user_identity` | struct | Who did it — `{"email": "user@domain.com", "subjectName": null}` |
| `service_name` | string | Which service generated the event, e.g. `unityCatalog` |
| `action_name` | string | The specific action, e.g. `getTable` |
| `source_ip_address` | string | Where the request came from |
| `request_params` | map | Parameters of the request — table names, schema names, and more |
| `response` | struct | `{"statusCode": 200, "errorMessage": null, "result": null}` |
| `audit_level` | string | `WORKSPACE_LEVEL` or `ACCOUNT_LEVEL` |

Account-level events record `workspace_id` as `0`. When a workspace is deleted, its audit events older than 14 days are removed from the table.

## A basic query: who did what

```sql
SELECT event_time, user_identity.email, service_name, action_name
FROM system.access.audit
WHERE event_date = CURRENT_DATE() - 1
  AND service_name = 'unityCatalog'
ORDER BY event_time DESC
LIMIT 50;
```

Filtering on `event_date` rather than `event_time` is Databricks' own recommendation — `event_date` is what the table's performance optimizations are actually built around.

## Narrowing to a specific object

`request_params` is a map, so you can filter or extract specific keys. Here's a real pattern for "who read this specific table in the last 30 days":

```sql
SELECT event_time, user_identity.email, action_name
FROM system.access.audit
WHERE event_date >= DATE_SUB(CURRENT_DATE(), 30)
  AND service_name = 'unityCatalog'
  AND action_name = 'getTable'
  AND request_params['full_name_arg'] = 'hr_catalog.silver.employees'
ORDER BY event_time DESC;
```

This is the real audit equivalent of the lineage query from Lesson 17 — instead of "what depends on this column," it answers "who actually touched this table, and when."

## Masked request parameters

Some `request_params` keys hold full SQL definitions — `function_info`, `view_definition`, `definition_json`, `managed_definition` — and are **omitted** from query results unless the querying user is an account admin or a member of the `databricks_pii_access` account-level group. Every other column, and every other key in `request_params`, is unaffected. This protects against audit logs themselves becoming a leak of sensitive SQL logic (a view definition might embed a filter condition someone doesn't want broadly readable) while still recording *that* the action happened.

## Scope and retention

Audit logs are regional: a workspace's events live in the audit table for its own region, except account-level events, which are global. The table retains 365 days by default (configurable, per Lesson 18). This is a Public Preview system table, so treat column additions as expected rather than surprising.

## Key terms

| Term | Meaning |
|---|---|
| `system.access.audit` | The audit log system table — one row per auditable event across the account's region |
| `action_name` | The specific logged action, e.g. `getTable`, `createTable`, `login` |
| `databricks_pii_access` | The account-level group whose members can see masked SQL-definition request parameters |

## Lab

Write the query you'd run to answer: "which users ran `getTable` against any table in the `hr_catalog` schema in the last 7 days, and how many times each?" (Hint: `request_params['full_name_arg']` typically holds the full three-part table name.)

## Check yourself

Without looking back: which column should you filter on for query performance, `event_time` or `event_date`, and name the four `request_params` keys that are masked from non-admins by default.
