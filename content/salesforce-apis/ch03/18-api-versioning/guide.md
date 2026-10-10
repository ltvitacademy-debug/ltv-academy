# Lesson 18 — API Versioning

**Chapter 3 · Limits and Practice · Lesson 18 of 22**

## What you'll learn

- How often Salesforce ships a new API version, and why
- Why pinning a version protects an integration from behavior changes
- How to discover which versions an org currently supports
- How to think about when (and whether) to move an integration to a newer version

## Three releases a year, roughly one version number each

Salesforce ships three major releases a year — Spring, Summer, and Winter — and each one typically introduces a new API version number, in the format `vXX.0`, incrementing by about 1 per release. Verified this session against Salesforce's own documentation: **Spring '26 is API version 66.0**. That means roughly three new version numbers appear every year, and an org's underlying platform keeps upgrading on that same seasonal schedule whether or not any given integration changes its pinned version.

## Why pin a version at all

Every REST, SOAP, and Bulk call in this course specifies a version in its URL (`/services/data/v61.0/...`). That version number isn't just a label — it pins the *behavior* a given endpoint will exhibit. Salesforce supports old API versions for a long deprecation window, specifically so an integration built against, say, `v58.0` keeps behaving exactly as it did when it was built, even after the org itself has been upgraded through several newer seasonal releases. Without this, every org upgrade could silently change how an existing integration behaves — which would make building anything durable on top of Salesforce's API nearly impossible.

## Discovering supported versions

Rather than guessing or hardcoding a version blindly, a client can ask the org directly:

```http
GET /services/data/
```

```json
[
  { "version": "59.0", "label": "Summer '23", "url": "/services/data/v59.0" },
  { "version": "60.0", "label": "Winter '24", "url": "/services/data/v60.0" },
  { "version": "61.0", "label": "Spring '24", "url": "/services/data/v61.0" }
]
```

This unversioned root resource is the one call in this entire course that doesn't need a version in its own URL — by design, since its whole job is telling you what versions exist.

## Deciding whether to move to a newer version

Pinning a version is protective, but it isn't meant to be permanent. New API versions sometimes introduce resources, fields, or capabilities only available from that version forward (a new Composite Graph feature, for instance, might require a minimum version to use). The practical approach: stay on your pinned version as the stable default, and deliberately test and move to a newer one when you specifically need a capability it introduces — not reflexively on every seasonal release, and never by assuming an untested jump to a much newer version behaves identically to your current one.

## Key terms

| Term | Meaning |
|---|---|
| API version | A number (`vXX.0`) specifying which version of behavior a REST/SOAP/Bulk call targets |
| Seasonal release | Salesforce's three-times-a-year release cadence (Spring, Summer, Winter), each typically introducing a new API version |
| Version pinning | Specifying a fixed version in every API call so behavior doesn't silently change as the org's platform upgrades |
| `GET /services/data/` | The unversioned root resource that lists every API version an org currently supports |

## Lab

An integration was built two years ago pinned to `v57.0` and has never been updated. The org it talks to has since been upgraded through several seasonal releases and now supports versions well beyond that. Write a short scenario analysis: why does this integration likely still work exactly as it did two years ago, and what specific step would you take before deciding to move it to a newer version, rather than just changing the number in the URL and hoping nothing breaks.

## Check yourself

Can you explain why Salesforce ships roughly three new API version numbers per year, and tie that to the Spring/Summer/Winter release cadence? Can you explain what "version pinning" protects an integration from, specifically in terms of the org's own platform upgrades happening independently of the integration's code?