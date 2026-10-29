# Lesson 14 — Automating IOC Lookups Against a SIEM

**Chapter 4 · Threat Intelligence Automation · Lesson 2 of 4**

## What you'll learn

- How to take the `NormalizedIOC` list from Lesson 13 and turn it into
  a templated **KQL** query a SIEM can actually run
- Why you template a query instead of looping one-IOC-at-a-time
  lookups against the API
- How to push a batch of IOCs into a Sentinel **watchlist** in one
  bulk call instead of hundreds of single-item requests
- How to read the match results back and tag which of your IOCs
  actually appeared in the environment

## From a Python list to a KQL query

You already built this course's Sentinel-scripting muscle in Chapter
2 — this lesson reuses that same `azure-monitor-query` client, now
pointed at a list of IOCs instead of a fixed query string. The naive
approach is a loop that queries the SIEM once per IOC; against a feed
with a few thousand indicators, that's a few thousand round trips.
Instead, you build one KQL query with the whole IOC list templated in:

```python
def build_ip_lookup_kql(ips: list[str], lookback_days: int = 7) -> str:
    ip_list = ", ".join(f"'{ip}'" for ip in ips)
    return f"""
    let watch_ips = dynamic([{ip_list}]);
    CommonSecurityLog
    | where TimeGenerated > ago({lookback_days}d)
    | where SourceIP in (watch_ips) or DestinationIP in (watch_ips)
    | project TimeGenerated, SourceIP, DestinationIP, DeviceAction
    """
```

A `let` statement with a `dynamic([...])` array is KQL's version of a
parameterized `IN` clause — one query, one round trip, checked against
every IOC at once. Running it is the same client you used in Chapter
2:

```python
from azure.monitor.query import LogsQueryClient
from azure.identity import DefaultAzureCredential

client = LogsQueryClient(DefaultAzureCredential())
kql = build_ip_lookup_kql([ioc.value for ioc in normalized_ips])
response = client.query_workspace(WORKSPACE_ID, kql, timespan=None)
matches = response.tables[0].rows
```

## Watch the query-length limit

KQL queries have a practical length ceiling, and a `dynamic([...])`
array of tens of thousands of IOCs will blow past it. Chunk large
lists before building the query:

```python
def chunked(items: list, size: int = 5000):
    for i in range(0, len(items), size):
        yield items[i:i + size]

all_matches = []
for batch in chunked([ioc.value for ioc in normalized_ips]):
    kql = build_ip_lookup_kql(batch)
    all_matches.extend(client.query_workspace(WORKSPACE_ID, kql, timespan=None).tables[0].rows)
```

## Bulk watchlist updates instead of per-item calls

Sometimes the goal isn't a one-time lookup, it's keeping a standing
**watchlist** current so every analytics rule in the workspace can
reference it going forward. The Sentinel watchlist API accepts items
one at a time or as a bulk create-or-update call — always prefer bulk:

```python
import requests

def bulk_upsert_watchlist(items: list[NormalizedIOC], watchlist_alias: str, token: str):
    url = (
        f"https://management.azure.com/subscriptions/{SUB_ID}/resourceGroups/{RG}"
        f"/providers/Microsoft.OperationalInsights/workspaces/{WORKSPACE}"
        f"/providers/Microsoft.SecurityInsights/watchlists/{watchlist_alias}"
        f"/watchlistItems?api-version=2023-02-01"
    )
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    for item in items:
        body = {
            "properties": {
                "itemsKeyValue": {
                    "ioc_value": item.value,
                    "ioc_type": item.ioc_type,
                    "confidence": item.confidence,
                    "source": item.source,
                }
            }
        }
        requests.put(f"{url}/{item.value}", headers=headers, json=body, timeout=15)
```

Even here, batch your calls with a short delay or a bulk-import
endpoint where the API supports one — hammering the watchlist API with
thousands of synchronous `PUT` calls in a tight loop is exactly the
kind of script DevSecOps reviewers in Chapter 7 will flag for not
respecting the service's throttling limits.

## Tagging what actually matched

The whole point of the lookup is separating "this IOC exists in a
feed" from "this IOC actually touched our environment":

```python
matched_values = {row["SourceIP"] for row in all_matches} | {row["DestinationIP"] for row in all_matches}

for ioc in normalized_ips:
    ioc.tags.append("seen_in_environment" if ioc.value in matched_values else "not_observed")
```

That tag is what Lesson 15's scoring pass leans on heavily — an IOC
that's merely on a feed is informational; an IOC that's on a feed *and*
actually showed up in your logs is the one worth a human's attention.

## Key terms

| Term | Meaning |
|---|---|
| `dynamic([...])` | KQL's array literal, used inside a `let` to build a parameterized `in (...)` lookup against a whole IOC list in one query |
| Chunking | Splitting a large IOC list into batches before building a query, to stay under KQL's practical query-length ceiling |
| Watchlist | A standing, named list in Sentinel that analytics rules can reference by name, kept current via bulk upsert instead of per-item calls |
| Observed vs. feed-only | The distinction between an IOC merely present on a threat feed and one that matched real log data in your environment |

## Check yourself

You're ready for Lesson 15 when you can explain why a single
`dynamic([...])`-templated KQL query beats looping one lookup per IOC,
and why "seen in environment" is a separate signal from an IOC's raw
feed confidence score.
