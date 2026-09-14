# Lesson 46 — Using Copilot to Explain and Fix a KQL Query

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 46 of 81**

## What you'll learn

- A worked example of pasting a broken KQL query and using Copilot to explain it
- Why the explanation is a hypothesis, not a verified fact about your schema
- How to check a Copilot-suggested fix against your real Eventstream schema
- Why this is the same review discipline from Lesson 45, applied to KQL instead of PySpark

## The broken query

Say you inherited this query against `SensorEvents`, a table populated by
an Eventstream the way Fabric & Real-Time Analytics Lesson 19 covers, and
it fails:

```kql
SensorEvents
| summarize count() by deviceId
```

```
Error: 'deviceId' is not a valid column in table SensorEvents.
```

You don't recognize this table's schema, and the error alone doesn't tell
you what the right column name actually is.

## Asking Copilot to explain it

Paste the query and the error into the KQL Queryset's Copilot, from the
same in-cell `/explain` idea Lesson 44 covered for notebooks. A typical
response:

```
This query groups events by a column called "deviceId", but no
column with that name exists in SensorEvents. This is often a
naming mismatch — check whether the actual column uses a
different casing or naming convention, such as "device_id".
```

That's a genuinely useful lead. It is still a **guess about your specific
table** — Copilot is reasoning from a common naming pattern, not from
having inspected your Eventstream's real destination schema.

## Verify before you trust the fix

This is exactly the review habit from Lesson 45, now applied to KQL. Before
accepting `device_id` as the fix, check it against the schema the
Eventstream actually produced:

```
1. Run `SensorEvents | getschema` (or check the Eventstream's
   destination mapping) to see the real column list
2. Confirm `device_id` is actually there — not `DeviceId`,
   not `sensor_id`, not something else entirely
3. Only then apply the fix, using the KQL fundamentals from
   Lessons 22-27 (where, summarize, bin) to write it correctly
```

## The corrected, verified query

Once `device_id` is confirmed against the real schema, and assuming the
original intent was event counts per 5-minute window (not a single
all-time total), the fix also needs `bin()` from Lesson 26's time-series
functions — something the original broken query never had either:

```kql
SensorEvents
| summarize EventCount = count() by device_id, bin(Timestamp, 5m)
```

Copilot's explanation pointed at the naming issue. It didn't catch that the
query was also missing a time window — that gap only shows up once you
compare the result against what you actually needed, the same "match every
clause of the ask" habit from Lesson 45.

## Key terms

| Term | Meaning |
|---|---|
| Explanation as hypothesis | Copilot's explanation of an error is a lead to verify, not a confirmed fact about your schema |
| `getschema` | The KQL operator (or Eventstream mapping view) that shows you the real column list |
| Verified fix | A Copilot-suggested fix, checked against the real schema before you apply it |

## Check yourself

You're ready for Lesson 47 when you can explain, without looking: why is
checking `getschema` a necessary step even after Copilot correctly
diagnoses a naming mismatch?
