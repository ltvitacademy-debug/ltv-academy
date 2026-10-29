# Lesson 2 — Parsing Logs and Security Data with Python

**Chapter 1 · Python for Security Automation Fundamentals · Lesson 2 of 4**

## What you'll learn

- How to parse real syslog-formatted lines with Python, pulling out timestamp,
  host, and message fields
- How to read and write structured JSON logs with the `json` module — the
  format most modern EDR, cloud, and SIEM export tools actually use
- How to work through CSV security exports (threat-intel feeds, asset
  inventories, user lists) with the `csv` module without losing data to
  encoding or delimiter surprises
- Why normalizing timestamps and field names across sources matters more than
  almost anything else in a security-automation pipeline

## Syslog: still everywhere

Syslog is decades old and still the transport format for an enormous amount of
infrastructure — firewalls, network devices, Linux hosts, and plenty of
on-prem appliances that predate anything cloud-native. A typical RFC 3164-style
line looks like this:

```
<34>Oct 27 02:14:12 fw-edge-01 sshd[1234]: Failed password for root from 203.0.113.9 port 51823 ssh2
```

Breaking that down: `<34>` is the priority value (facility and severity
packed into one number), then a timestamp, the hostname (`fw-edge-01`), the
process and PID (`sshd[1234]`), and finally the free-text message. Python's
standard library doesn't ship a one-call syslog parser because the "message"
portion is vendor-specific free text, but the structured prefix is
regular enough to pull apart with a regular expression:

```python
import re

SYSLOG_RE = re.compile(
    r"<(?P<pri>\d+)>(?P<timestamp>\w{3}\s+\d{1,2}\s\d{2}:\d{2}:\d{2})\s"
    r"(?P<host>\S+)\s(?P<process>\w+)(\[(?P<pid>\d+)\])?:\s(?P<message>.*)"
)

line = "<34>Oct 27 02:14:12 fw-edge-01 sshd[1234]: Failed password for root from 203.0.113.9 port 51823 ssh2"
match = SYSLOG_RE.match(line)
if match:
    event = match.groupdict()
    print(event["host"], event["process"], event["message"])
```

Named groups (`(?P<name>...)`) matter here — they turn a wall of regex into a
dictionary you can hand downstream, instead of numbered groups nobody can
read six months later.

## JSON logs: the modern default

Most cloud platforms, EDR agents, and SIEMs now export events as JSON — either
one JSON object per line (JSON Lines / NDJSON) or a single JSON array. Python's
built-in `json` module handles both:

```python
import json

# one JSON object per line is the common export shape
with open("edr_events.jsonl") as f:
    for line in f:
        event = json.loads(line)
        if event.get("severity") == "high":
            print(event["timestamp"], event["process_name"], event["sha256"])
```

For a single large JSON array:

```python
with open("alerts.json") as f:
    alerts = json.load(f)  # returns a list of dicts

high_sev = [a for a in alerts if a.get("severity") == "high"]
```

The practical trap with JSON security logs isn't syntax — it's **inconsistent
field names across sources**. One vendor's alert has `"severity": "high"`,
another has `"Severity": 3`, another nests it under `"properties": {"level":
"High"}`. Before you can correlate anything, you normalize: map every source's
fields into one consistent internal shape.

```python
def normalize_severity(raw_event: dict, source: str) -> str:
    if source == "vendor_a":
        return raw_event.get("severity", "unknown")
    if source == "vendor_b":
        level_map = {1: "low", 2: "medium", 3: "high"}
        return level_map.get(raw_event.get("Severity"), "unknown")
    if source == "vendor_c":
        return raw_event.get("properties", {}).get("level", "unknown").lower()
    return "unknown"
```

## CSV exports: the quiet traps

CSV shows up constantly in security work — threat-intel feed exports, asset
inventories pulled from a CMDB, user lists exported from an IdP. Python's
`csv` module handles the format correctly, including quoted fields with
embedded commas, which manual `.split(",")` code gets wrong:

```python
import csv

with open("ioc_feed.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["type"] == "ipv4-addr" and row["confidence"] == "high":
            print(row["indicator"], row["first_seen"])
```

Three things bite people in practice. First, `newline=""` in the `open()` call
— without it, Windows-style line endings can produce blank rows on some
platforms. Second, encoding: a feed exported from a Windows tool may be
`cp1252` or carry a UTF-8 byte-order mark, not clean UTF-8; if rows silently
fail to match expected values, check `encoding="utf-8-sig"` before assuming
the data itself is bad. Third, `csv.DictReader` reads everything as strings —
a `"confidence": "85"` column is the string `"85"`, not an integer, until you
explicitly `int()` it.

## Normalize timestamps before you correlate anything

Every format above tends to represent time differently — syslog's
no-year, local-time string; a JSON log's ISO 8601 with a timezone offset; a
CSV export's `MM/DD/YYYY`. Before correlating events across sources, convert
everything to a single, timezone-aware standard — UTC, as a `datetime` object:

```python
from datetime import datetime, timezone

iso_ts = datetime.fromisoformat("2026-10-27T02:14:12+00:00")
csv_ts = datetime.strptime("10/27/2026 02:14 AM", "%m/%d/%Y %I:%M %p")
csv_ts_utc = csv_ts.replace(tzinfo=timezone.utc)  # only valid if you KNOW the source's zone
```

Skipping this step is one of the most common reasons a "correlation" script
quietly produces wrong results: two events that actually happened eight hours
apart look simultaneous, or vice versa, because nobody normalized the clock.

## Key terms

| Term | Meaning |
|---|---|
| Named regex group | `(?P<name>...)` syntax that lets you pull a matched substring out by name instead of a numeric index |
| JSON Lines (NDJSON) | A log file format with one JSON object per line, common in EDR and cloud exports |
| Field normalization | Mapping each data source's own field names/values into one consistent internal schema before correlating |
| Timezone-aware datetime | A Python `datetime` that carries explicit timezone info, required before comparing timestamps across sources |

## Check yourself

You're ready for Lesson 3 when you can take a raw syslog line, a JSON log
line, and a CSV row from three different fictional vendors, and describe —
without running code — what Python approach you'd use to parse each one, and
why you can't directly compare their timestamps without a normalization step
first.
