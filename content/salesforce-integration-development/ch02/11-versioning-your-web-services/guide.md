# Lesson 11 — Versioning Your Web Services

**Chapter 2 · Inbound Integration · Lesson 11 of 23**

## What you'll learn

- Why Apex REST has no automatic versioning scheme, unlike the standard REST API
- The URL-path versioning pattern, and why one `@HttpGet` per class forces a design choice
- The alternative in-payload versioning approach, and its real trade-off
- Why breaking an external caller's contract is a much bigger deal than breaking internal code
- How to plan a version strategy before the first external caller ever integrates

## Why versioning matters more for inbound services

Chapter 1 noted that outbound integration means Salesforce adapts to someone else's API contract. Inbound integration (this chapter) reverses that: Salesforce's own Apex REST service *is* the contract, and once an external system has built against it, changing that contract without warning breaks their integration — exactly the kind of breakage you'd be annoyed by if a vendor did it to you. Versioning is how you evolve a service without doing that.

## The standard API already has versioning; Apex REST does not, automatically

Salesforce's own standard REST API bakes a version number directly into every URL — `/services/data/v60.0/sobjects/Account` — so a caller on an older version keeps working exactly as it did, even as newer versions add capability. Custom Apex REST services get no equivalent built-in mechanism. Versioning a custom service is a design decision the developer has to make deliberately, not something the platform does automatically.

## Pattern 1: version in the URL mapping

The most common real-world pattern encodes the version directly in `@RestResource`'s `urlMapping`:

```apex
@RestResource(urlMapping='/v1/Accounts/*')
global with sharing class AccountRestServiceV1 {
    @HttpGet
    global static Account getAccount() { /* original shape */ }
}

@RestResource(urlMapping='/v2/Accounts/*')
global with sharing class AccountRestServiceV2 {
    @HttpGet
    global static AccountSummaryWrapper getAccount() { /* new, richer shape */ }
}
```

Existing callers keep hitting `/v1/Accounts/*` and keep getting the original response shape forever, unaffected by whatever `/v2/` does. New callers adopt `/v2/Accounts/*` for the improved behavior. Because each HTTP-verb annotation can only be used once per class (Lesson 8), a genuinely breaking change in shape or behavior usually means a brand-new class with a new mapping, not editing the old class's method body in place.

## Pattern 2: a version field inside the payload

An alternative some teams use: keep a single URL mapping, but include a `version` field in the request payload, and branch inside one class based on its value. This avoids proliferating classes and URLs, but trades that for messier code — all versions stay coupled together in one place, and a bug introduced while adding v2 logic can risk the v1 code path it sits next to. Most real integration teams prefer the URL-path pattern specifically because it keeps old and new logic fully isolated from each other.

## The real cost of breaking a contract silently

Imagine shipping a change to `/v1/Accounts/*`'s response shape — renaming a field, say — with no new version. Every external system that parses that field by name breaks the next time they call it, often without any warning, and often not even inside your own org's test suite (their code lives outside Salesforce entirely, so your own deploy's tests can't catch it). This is why "never change what an existing version returns" is close to an absolute rule for a published inbound service, and why planning a version strategy before the first external caller integrates — not after — is far cheaper than retrofitting one later.

## Key terms

| Term | Meaning |
|---|---|
| URL-path versioning | Encoding the version in the urlMapping, e.g. /v1/Accounts/* vs /v2/Accounts/* |
| In-payload versioning | Keeping one URL, branching logic inside the class based on a version field in the request |
| Breaking change | A change to an existing version's shape or behavior that an already-integrated caller depends on |
| Contract stability | The principle that a published version's existing behavior should never change silently |

## Lab

Take the `AccountRestService` class from Lesson 8's Lab. Design (in writing, then in code) a `v2` of its GET method that returns a richer response — for example, including related Contact count and Open Opportunity count alongside the existing fields — as a new `AccountRestServiceV2` class mapped to `/v2/Accounts/*`, while leaving the original `v1` class and its response shape completely untouched. Deploy both to your scratch org and call each by its own URL to confirm `v1` still returns exactly what it always did.

## Check yourself

Explain why Apex REST doesn't get automatic versioning the way the standard REST API does. Then explain, without looking back, the trade-off between URL-path versioning and in-payload versioning.
