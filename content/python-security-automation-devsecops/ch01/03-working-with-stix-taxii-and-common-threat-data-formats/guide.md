# Lesson 3 — Working with STIX, TAXII, and Common Threat Data Formats

**Chapter 1 · Python for Security Automation Fundamentals · Lesson 3 of 4**

## What you'll learn

- What STIX 2.1 actually is: a standardized JSON object model for describing
  threat intelligence, not a product or a feed itself
- The core STIX object types you'll touch most often — `indicator`,
  `malware`, and `threat-actor` — and how they relate to each other
- What TAXII is and how it differs from STIX: TAXII is the transport protocol,
  STIX is the data it carries
- How to parse a real STIX bundle with plain Python `json`, without needing a
  specialized library to get started

## STIX is a data model, not a feed

**STIX** (Structured Threat Information eXpression) is a standard, maintained
by OASIS, that defines a consistent JSON structure for describing threat
intelligence — indicators, malware families, threat actors, attack patterns,
and how they relate to each other. The current version used across the
industry is STIX 2.1.

The key thing to internalize: STIX is a *format*, not a specific feed or
tool. Commercial threat-intel platforms, government sharing programs, and
open-source feeds all produce data *in* STIX format, the same way many
different applications produce data in CSV format. Learning to read STIX
JSON means you can work with threat intelligence from any STIX-compliant
source without learning a new schema each time.

Every STIX object shares a common shape: a `type`, a unique `id` in the form
`type--uuid`, `created`/`modified` timestamps, and type-specific fields on
top of that. Objects are usually distributed together inside a **bundle**:

```json
{
  "type": "bundle",
  "id": "bundle--7a3f1e3e-...",
  "objects": [
    { "type": "indicator", "id": "indicator--d1e2...", "...": "..." },
    { "type": "malware", "id": "malware--c4f9...", "...": "..." }
  ]
}
```

## The three core object types

**`indicator`** — a pattern that, if observed, suggests malicious activity.
The pattern itself is written in **STIX Patterning**, a small
domain-specific syntax:

```json
{
  "type": "indicator",
  "id": "indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f",
  "created": "2026-09-14T09:12:16.000Z",
  "modified": "2026-09-14T09:12:16.000Z",
  "name": "Malicious IP associated with phishing campaign",
  "pattern": "[ipv4-addr:value = '203.0.113.9']",
  "pattern_type": "stix",
  "valid_from": "2026-09-14T09:12:16Z",
  "labels": ["malicious-activity"]
}
```

`pattern` is the part worth slowing down on — `[ipv4-addr:value =
'203.0.113.9']` is itself a tiny structured language, not free text. More
complex patterns combine conditions with boolean operators, e.g. matching a
file hash AND a specific registry key together.

**`malware`** — describes a malware family or instance:

```json
{
  "type": "malware",
  "id": "malware--c4f9e9b8-3b1a-4f0d-9f0a-2a6b3c1e8d77",
  "created": "2026-08-01T00:00:00.000Z",
  "modified": "2026-08-01T00:00:00.000Z",
  "name": "Example RAT",
  "is_family": true,
  "malware_types": ["remote-access-trojan"]
}
```

**`threat-actor`** — describes a person, group, or organization believed
responsible for malicious activity:

```json
{
  "type": "threat-actor",
  "id": "threat-actor--56f3f0db-989a-410a-99fe-93db89c4ab8f",
  "created": "2026-07-01T00:00:00.000Z",
  "modified": "2026-07-01T00:00:00.000Z",
  "name": "Example Threat Group",
  "threat_actor_types": ["crime-syndicate"],
  "sophistication": "advanced"
}
```

## Relationships tie objects together

STIX objects rarely stand alone — a separate `relationship` object links
them, e.g. "this indicator *indicates* this malware" or "this threat-actor
*uses* this malware":

```json
{
  "type": "relationship",
  "id": "relationship--2b9e...",
  "relationship_type": "indicates",
  "source_ref": "indicator--d81f86b9-975b-4c0b-875e-810c5ad45a4f",
  "target_ref": "malware--c4f9e9b8-3b1a-4f0d-9f0a-2a6b3c1e8d77"
}
```

To make sense of a bundle in Python, build a lookup table by `id`, then
resolve relationships through it:

```python
import json

with open("threat_bundle.json") as f:
    bundle = json.load(f)

objects_by_id = {obj["id"]: obj for obj in bundle["objects"]}

for obj in bundle["objects"]:
    if obj["type"] == "relationship":
        source = objects_by_id.get(obj["source_ref"])
        target = objects_by_id.get(obj["target_ref"])
        if source and target:
            print(f"{source['name']} {obj['relationship_type']} {target['name']}")
```

That pattern — index by ID, then walk relationships — is the core of almost
any STIX-processing script, with or without a dedicated library.

## TAXII: the transport, not the data

**TAXII** (Trusted Automated eXchange of Indicator Information) is a
separate standard that defines *how* STIX data gets shared over HTTP — a
client/server API for requesting and polling collections of STIX objects. The
relationship is simple: **STIX is what you're sharing, TAXII is how you ask
for it.** A TAXII 2.1 server exposes discovery and collection endpoints over
REST; a client authenticates, discovers available collections, and pulls (or
pushes) STIX bundles from them.

You'll build real REST calls against APIs like this in the next lesson —
for now, the important distinction is that a TAXII request's *response body*
is just STIX JSON, parsed exactly the way you parsed the bundle above.

## Key terms

| Term | Meaning |
|---|---|
| STIX | A standardized JSON data model (OASIS, current version 2.1) for describing threat intelligence objects and their relationships |
| STIX bundle | A container object holding a list of STIX objects distributed together |
| Indicator | A STIX object describing a detectable pattern, written in STIX Patterning syntax, that suggests malicious activity |
| TAXII | The transport protocol/API standard for exchanging STIX data between servers and clients over HTTP |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: the
difference between what STIX defines and what TAXII defines, and how you'd
use a Python dictionary keyed by `id` to resolve a `relationship` object
between an `indicator` and a `malware` object in a bundle.
