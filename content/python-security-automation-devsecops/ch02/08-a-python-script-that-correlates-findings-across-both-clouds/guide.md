# Lesson 4 — A Python Script That Correlates Findings Across Both Clouds

**Chapter 2 · Automating with Security APIs · Lesson 4 of 4**

## What you'll learn

- How to normalize Sentinel incidents and AWS Security Hub / GuardDuty
  findings into one common Python record shape
- A real correlation technique: matching findings across clouds on shared
  IP addresses, usernames, or resource identifiers
- How to structure the output as a decision-ready report instead of an
  automated action — the "automate the pipeline, gate the action" pattern
  from Chapter 1, applied for real
- Where this kind of script fits in a SOC workflow, and why correlation is
  enrichment, not response

## The problem: two schemas, one question

By now you can pull Sentinel incidents through KQL or the incidents REST
API, and Security Hub / GuardDuty findings through `boto3` — but they come
back in two completely different shapes. A real cross-cloud question —
"is the IP address flagged in this Sentinel incident the same one Security
Hub just flagged in a different AWS account?" — requires getting both into
one common shape *before* you can compare anything.

## Step 1: normalize each source into a common record

The common record only needs the fields correlation actually depends on:
a source tag, an identifier, a severity, a title, and the set of IPs,
usernames, or resource IDs the item touched.

```python
def normalize_sentinel_incident(incident: dict) -> dict:
    props = incident["properties"]
    ips, users = set(), set()
    for entity in props.get("relatedEntities", []):
        kind = entity.get("kind")
        if kind == "Ip":
            ips.add(entity["properties"].get("address"))
        elif kind == "Account":
            users.add(entity["properties"].get("accountName"))
    return {
        "source": "sentinel",
        "id": incident["name"],
        "severity": props["severity"],
        "title": props["title"],
        "ips": ips,
        "users": users,
    }


def normalize_asff_finding(finding: dict) -> dict:
    ips = set()
    for resource in finding.get("Resources", []):
        details = resource.get("Details", {}).get("AwsEc2Instance", {})
        for ip in details.get("IpV4Addresses", []):
            ips.add(ip)
    return {
        "source": "security_hub",
        "id": finding["Id"],
        "severity": finding["Severity"]["Label"],
        "title": finding["Title"],
        "ips": ips,
        "users": set(),  # ASFF EC2 resources don't carry a username field
    }
```

Each function absorbs the messiness of its own schema — nested
`relatedEntities` on the Sentinel side, nested `Resources[].Details` on
the AWS side — and hands back the same flat shape. That's the whole point:
correlation logic never has to know which cloud a record came from.

## Step 2: correlate on shared identifiers

With both sources normalized, correlation is a set intersection — no fuzzy
matching, no ML, just checking whether the same concrete value (an IP, in
this example) shows up on both sides:

```python
def correlate(sentinel_items: list[dict], aws_items: list[dict]) -> list[dict]:
    matches = []
    for s in sentinel_items:
        for a in aws_items:
            shared_ips = s["ips"] & a["ips"]
            if shared_ips:
                matches.append({
                    "sentinel_incident": s["id"],
                    "security_hub_finding": a["id"],
                    "shared_ips": sorted(shared_ips),
                    "sentinel_severity": s["severity"],
                    "aws_severity": a["severity"],
                })
    return matches


sentinel_incidents = [normalize_sentinel_incident(i) for i in raw_incidents]
aws_findings = [normalize_asff_finding(f) for f in raw_findings]
correlated = correlate(sentinel_incidents, aws_findings)

for match in correlated:
    print(
        f"Sentinel {match['sentinel_incident']} <-> "
        f"Security Hub {match['security_hub_finding']} "
        f"via {match['shared_ips']}"
    )
```

Extending this to usernames or resource IDs is the same pattern — intersect
a different set on each side. The structure doesn't change; only which
field you're matching on does.

## Step 3: hand the result to a human, not an action

Notice what this script does *not* do: it doesn't close the incident, it
doesn't isolate the EC2 instance, and it doesn't block the IP anywhere.
It produces a list of correlated pairs with enough context — both
severities, both IDs, the shared indicator — for an analyst to decide
whether this is one attacker visible from two clouds, or a coincidence.
That's the Chapter 1 principle made concrete: Python does the
high-volume, error-prone work of normalizing two schemas and intersecting
sets across potentially thousands of records; a human makes the call on
what the correlation actually means.

## Key terms

| Term | Meaning |
|---|---|
| Common record shape | A normalized dict with the same fields regardless of source, so correlation logic is schema-independent |
| Set intersection correlation | Matching two sources by checking whether a shared concrete value (IP, username, resource ID) appears in both |
| `relatedEntities` | The Sentinel incident field holding linked IPs, accounts, hosts, and other entities |
| Decision-ready output | A report structured for a human to act on, deliberately stopping short of taking the action itself |

## Check yourself

You're ready to move to Chapter 3 when you can write, from memory, a
normalize function for a new source (even a hypothetical one) that returns
the same flat shape as `normalize_sentinel_incident` and
`normalize_asff_finding`, and explain why keeping the correlation function
itself schema-agnostic is what makes it reusable.
