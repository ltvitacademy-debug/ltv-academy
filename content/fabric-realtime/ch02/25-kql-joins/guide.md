# Lesson 25 — KQL: Joins

**Chapter 2 · Real-Time Data Engineering · Lesson 25 of 70**

## What you'll learn

- `join` — KQL's real join operator, with the same core join kinds
- `$left.` / `$right.` — resolving ambiguous column names, KQL's own way
- Enriching a real trip event with zone data, from a small lookup table
- The genuine caveat: joins on a fast-moving stream aren't free

## join — the same core kinds

```kql
RawTripEvents
| join kind=leftouter (
    Zones
) on $left.PULocationID == $right.LocationID
```

`join kind=leftouter` is exactly Databricks & Delta Lake Lesson
55's `"left"` join — every left-side row kept, matched or not,
with unmatched right-side columns coming back as null. KQL supports
the same core kinds: `innerunique` (KQL's default), `leftouter`,
`rightouter`, `fullouter` — the same concepts, KQL's own default
differing slightly from SQL/PySpark's usual inner-join default.

## Resolving ambiguous columns

```kql
RawTripEvents
| join kind=leftouter (Zones) on $left.PULocationID == $right.LocationID
| project VendorID, $left.fare_amount, ZoneName = $right.Zone
```

`$left.` and `$right.` disambiguate a column name that exists on
both sides of the join — exactly the same real problem Databricks
& Delta Lake Lesson 55 solved with `trips.VendorID` vs.
`zones.VendorID`, just KQL's own `$left`/`$right` syntax instead of
referencing the original DataFrame variables.

## Enriching a real trip event

```kql
RawTripEvents
| where fare_amount > 0
| join kind=leftouter (Zones) on $left.PULocationID == $right.LocationID
| project VendorID, fare_amount, Zone, Borough
```

This is genuinely the same enrichment this course's own Databricks
& Delta Lake material did with `trips.join(zones, ...)` — turning a
bare `PULocationID` number into a real, readable zone name — just
running against a live, streaming `RawTripEvents` table instead of
a static Delta table.

## The real caveat: joins aren't free on a stream

A join against a small, mostly-static lookup table like `Zones`
(a few hundred rows) is cheap and common. A join between two
**large, fast-moving** streams is a genuinely harder problem — Lesson
33's watermarks exist specifically because joining two streams
requires deciding how long to wait for a late-arriving match before
giving up, a real complication that a join against a static table
never has to face.

## Key terms

| Term | Meaning |
|---|---|
| `join kind=leftouter` | Same left join concept from Databricks & Delta Lake Lesson 55 |
| `$left.` / `$right.` | Disambiguates a column name shared by both sides |
| Stream-to-stream joins | A genuinely harder problem than joining against a static lookup |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
is joining a stream against a small, static lookup table simpler
than joining two large, fast-moving streams together?
