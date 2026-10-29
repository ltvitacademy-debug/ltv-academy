# Lesson 16 — Feeding Enriched Intel Back into Detection Rules

**Chapter 4 · Threat Intelligence Automation · Lesson 4 of 4**

## What you'll learn

- Why only `auto_promote`-tier IOCs from Lesson 15 should ever reach a
  live detection rule or watchlist
- How to push validated IOCs into a Sentinel watchlist that an
  analytics rule already references
- How to extend an analytics rule's own KQL to join against that
  watchlist, so new intel takes effect without editing the rule
- Why every automated push needs an expiration path, not just an
  entry path

## The validation gate, restated as code

Everything in this chapter has been building toward one moment: an
IOC earns its way into a live detection surface, or it doesn't. The
gate is simple to state and easy to skip if you're not careful —
*only IOCs tagged `auto_promote` by Lesson 15's scoring pass are
eligible*, full stop:

```python
def promotable(iocs: list[NormalizedIOC]) -> list[NormalizedIOC]:
    return [ioc for ioc in iocs if "auto_promote" in ioc.tags]
```

Every other IOC — `analyst_review`, `archive` — stops here. Writing
that filter as its own named function, instead of inlining the
condition at the call site, means nobody can accidentally wire a raw,
unscored feed pull straight into production later without that intent
being obvious in a code review.

## Pushing validated IOCs into the watchlist

This reuses the bulk watchlist upsert pattern from Lesson 14, now
scoped to only the promotable set, and tagging each entry with where
it came from and when it should expire:

```python
from datetime import datetime, timedelta, timezone

def push_to_detection_watchlist(iocs: list[NormalizedIOC], watchlist_alias: str, token: str):
    expires = (datetime.now(timezone.utc) + timedelta(days=30)).isoformat()
    for ioc in promotable(iocs):
        body = {
            "properties": {
                "itemsKeyValue": {
                    "ioc_value": ioc.value,
                    "ioc_type": ioc.ioc_type,
                    "confidence": ioc.confidence,
                    "source": ioc.source,
                    "promoted_at": datetime.now(timezone.utc).isoformat(),
                    "expires_at": expires,
                }
            }
        }
        bulk_upsert_item(watchlist_alias, ioc.value, body, token)
```

That `expires_at` field isn't decoration — it's what keeps this from
becoming a watchlist that only ever grows. A detection rule referencing
a watchlist of thousands of IOCs from eighteen months ago, most of
which are long dead infrastructure, is its own kind of noise problem.

## Wiring the watchlist into a live analytics rule

The watchlist only matters if a rule actually joins against it. A
Sentinel scheduled analytics rule's query can reference a watchlist by
name directly in KQL:

```kql
let promoted_iocs = (_GetWatchlist('detection-promoted-iocs') | project ioc_value, confidence);
CommonSecurityLog
| where TimeGenerated > ago(1h)
| join kind=inner promoted_iocs on $left.DestinationIP == $right.ioc_value
| project TimeGenerated, SourceIP, DestinationIP, confidence
```

Because the rule queries the watchlist by name rather than embedding a
static IOC list, updating the watchlist through your Python pipeline
is enough to change what the rule fires on — you never have to touch
or redeploy the analytics rule itself to pick up newly promoted intel.

## Cleaning up what's expired

Pushing entries in isn't the whole job; an automation that only ever
adds and never removes is how a "threat intel" watchlist quietly turns
into an unmaintained graveyard:

```python
def prune_expired(watchlist_alias: str, token: str):
    items = list_watchlist_items(watchlist_alias, token)
    now = datetime.now(timezone.utc)
    for item in items:
        expires_at = datetime.fromisoformat(item["properties"]["itemsKeyValue"]["expires_at"])
        if expires_at < now:
            delete_watchlist_item(watchlist_alias, item["name"], token)
```

Running `prune_expired` on the same schedule as the ingestion pipeline
means an IOC that stops being relevant ages back out automatically,
instead of sitting in the detection path forever just because nothing
ever removed it.

## Putting the whole chapter's pipeline together

```python
raw = pull_all_feeds()                 # Lesson 13
normalized = [normalize(r) for r in raw]
deduped = dedupe(normalized)           # Lesson 13
tag_environment_matches(deduped)       # Lesson 14
score_and_tier(deduped)                # Lesson 15
push_to_detection_watchlist(deduped, "detection-promoted-iocs", TOKEN)  # Lesson 16
prune_expired("detection-promoted-iocs", TOKEN)                        # Lesson 16
```

Every function in this chapter composes into one scheduled job: pull,
normalize, dedupe, check against your own logs, score, promote the
ones that earned it, and age out the ones that didn't stay relevant.

## Key terms

| Term | Meaning |
|---|---|
| Validation gate | The `auto_promote`-only filter that decides which scored IOCs are even eligible to reach a live detection surface |
| `_GetWatchlist()` | The KQL function an analytics rule uses to join its query against a named Sentinel watchlist |
| `expires_at` | A timestamp written alongside each promoted IOC so a pruning job can remove it once it's no longer current |
| Pipeline composition | Chaining each chapter lesson's function (pull → normalize → dedupe → tag → score → promote → prune) into one scheduled job |

## Check yourself

You've closed the loop on this chapter when you can explain why the
analytics rule queries the watchlist by name instead of embedding a
static IOC list, and why `prune_expired` is just as important to this
pipeline as the push function that adds entries in the first place.
