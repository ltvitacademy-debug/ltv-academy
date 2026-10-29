# Lesson 13 — Pulling and Normalizing IOC Feeds in Python

**Chapter 4 · Threat Intelligence Automation · Lesson 1 of 4**

## What you'll learn

- Why the same indicator of compromise (IOC) looks different depending
  on which feed you pulled it from
- How to pull a feed over **STIX/TAXII 2.1**, the standard most
  commercial and open-source threat intel platforms expose
- How to pull a simpler CSV or JSON feed with `requests`
- How to normalize everything — regardless of source — into one
  common Python schema your downstream automation can actually trust

## Why feeds don't agree with each other

Every threat intel source you'll touch describes the same idea — "this
IP is bad" — in its own shape. A STIX/TAXII feed wraps an IP inside an
`indicator` object with a STIX pattern string like
`[ipv4-addr:value = '203.0.113.5']`. A CSV export might just have a
column literally named `ip`. A JSON feed from another vendor might
nest it three levels deep under `observables[0].value`. If you write
separate lookup and scoring logic for each shape, every new feed means
new code and a growing pile of edge cases. The fix is a **normalization
layer**: one function per feed format whose only job is converting that
format's raw object into one shared Python schema, after which every
other piece of this chapter's automation — SIEM lookups, scoring,
pushing back into detection — only ever has to understand one shape.

## Pulling a STIX/TAXII 2.1 feed

TAXII 2.1 is the transport protocol; STIX 2.1 is the data format riding
on top of it. The `taxii2-client` and `stix2` Python libraries handle
both:

```python
from taxii2client.v21 import Server
from stix2 import TAXIICollectionSource, Filter

server = Server(
    "https://intel.example-vendor.com/taxii2/",
    user=TAXII_USER,
    password=TAXII_PASSWORD,
)
api_root = server.api_roots[0]
collection = next(c for c in api_root.collections if c.title == "Indicators")

source = TAXIICollectionSource(collection)
indicators = source.query([Filter("type", "=", "indicator")])

print(f"Pulled {len(indicators)} indicator objects")
```

Each item in `indicators` is a STIX `Indicator` object with a
`.pattern` string (the actual observable, wrapped in STIX pattern
syntax) and fields like `.confidence`, `.valid_from`, and
`.labels`/`.indicator_types`. You never hand-parse TAXII's paging or
authentication — the client library does that — your job starts at
the point where you have a list of STIX objects to normalize.

## Pulling a plain CSV or JSON feed

Plenty of feeds, especially internal or open-source ones, skip STIX
entirely and just publish CSV or JSON over HTTP:

```python
import csv
import requests

resp = requests.get(FEED_URL, timeout=30)
resp.raise_for_status()

reader = csv.DictReader(resp.text.splitlines())
raw_rows = list(reader)  # [{"ip": "203.0.113.5", "confidence": "80", ...}, ...]
```

`requests.get(..., timeout=30)` matters more than it looks — a feed
endpoint that hangs without a timeout will hang your whole scheduled
job with it. `raise_for_status()` turns a silent HTTP 500 into an
exception you'll actually see, instead of quietly parsing an error
page as if it were threat data.

## Normalizing into one common schema

Whatever came in, it becomes this before anything else touches it:

```python
from dataclasses import dataclass, field
from datetime import datetime, timezone

@dataclass
class NormalizedIOC:
    ioc_type: str          # "ip", "domain", "url", "file_hash_sha256"
    value: str
    source: str            # which feed this came from
    confidence: int        # 0-100, feed's own scale rescaled to this
    first_seen: datetime
    tags: list = field(default_factory=list)


def normalize_stix_indicator(indicator, source_name: str) -> NormalizedIOC | None:
    # a real pattern looks like "[ipv4-addr:value = '203.0.113.5']"
    pattern = indicator.pattern
    if "ipv4-addr:value" in pattern:
        value = pattern.split("'")[1]
        ioc_type = "ip"
    elif "domain-name:value" in pattern:
        value = pattern.split("'")[1]
        ioc_type = "domain"
    else:
        return None  # pattern shape this lesson doesn't handle yet

    return NormalizedIOC(
        ioc_type=ioc_type,
        value=value,
        source=source_name,
        confidence=getattr(indicator, "confidence", 50),
        first_seen=indicator.valid_from.replace(tzinfo=timezone.utc),
        tags=list(getattr(indicator, "indicator_types", [])),
    )


def normalize_csv_row(row: dict, source_name: str) -> NormalizedIOC:
    return NormalizedIOC(
        ioc_type="ip",
        value=row["ip"].strip(),
        source=source_name,
        confidence=int(row.get("confidence", 50)),
        first_seen=datetime.now(timezone.utc),
        tags=[t.strip() for t in row.get("tags", "").split(",") if t.strip()],
    )
```

Two different inputs, one output type. Everything after this point in
the chapter — SIEM lookups, scoring, writing back into detection
rules — only ever imports `NormalizedIOC`.

## Deduplicating across feeds

The same IP shows up in multiple feeds constantly. Pulling three feeds
nightly without deduping means triple the lookups and triple the noise
in whatever you build next:

```python
def dedupe(iocs: list[NormalizedIOC]) -> list[NormalizedIOC]:
    best: dict[tuple[str, str], NormalizedIOC] = {}
    for ioc in iocs:
        key = (ioc.ioc_type, ioc.value.lower())
        existing = best.get(key)
        if existing is None or ioc.confidence > existing.confidence:
            best[key] = ioc
    return list(best.values())
```

Keying on `(ioc_type, value)` and keeping whichever copy has the higher
confidence means an IOC that three feeds agree on survives with its
strongest score — exactly the signal you want feeding into the scoring
pass in Lesson 15.

## Key terms

| Term | Meaning |
|---|---|
| STIX | The data format describing a threat object (indicator, pattern, confidence) |
| TAXII | The transport protocol feeds use to serve STIX content over HTTP |
| Normalization layer | Per-feed-format code whose only job is converting raw feed objects into one shared schema |
| Dedupe key | `(ioc_type, value)` — the pair used to collapse the same indicator seen across multiple feeds into one record |

## Check yourself

You're ready for Lesson 14 when you can explain why every feed gets
its own `normalize_*` function instead of one `if/elif` chain spread
across your lookup and scoring code — and what breaks if you skip the
dedupe step before scoring.
