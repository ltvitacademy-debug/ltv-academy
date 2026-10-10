# Lesson 20 — API Management and Versioning

**Chapter 3 · Reliability and Operations · Lesson 20 of 28**

## What you'll learn

- Why API versioning exists, and what breaks when it's absent
- Backward-compatible vs. breaking changes, and why the distinction determines whether a version bump is even needed
- How Salesforce's own REST API versioning works conceptually, and what that means for an org running integrations against an older API version
- Deprecation and sunset policy: why a breaking change needs advance notice, not a surprise

## Why APIs need versions at all

An API is a contract (Lesson 1): it promises callers that specific fields, specific behaviors, and specific response shapes will be available in a specific way. The problem versioning solves is that contracts need to evolve — new fields get added, old ones get restructured, business logic changes — but every existing caller built against the old contract is still out there, still calling, and has no way to know the contract changed unless something explicit tells it. **API versioning** is how a provider lets the contract evolve without breaking every caller still depending on the version they originally built against: multiple versions of an API coexist, each caller specifies which version it's calling, and the provider supports the older versions for some defined period rather than yanking them out from under existing integrations the moment a new version ships.

## Backward-compatible vs. breaking changes

Not every change to an API requires a new version. A **backward-compatible change** — adding a new, optional field to a response, adding a new optional parameter to a request — doesn't break an existing caller, because the caller simply ignores a field it doesn't know about and doesn't need to supply a parameter it was never designed to send. A **breaking change** — removing a field a caller depends on, renaming a field, changing a field's data type, changing required parameters, or altering the fundamental behavior of an existing operation — does break existing callers who haven't been updated, and this is specifically the category of change that justifies, and requires, a new API version rather than silently modifying the version already in use. An architect reviewing a proposed API change should always ask which of these two categories it falls into before deciding whether a version bump is even necessary.

## Salesforce's REST API versioning, conceptually

Salesforce's REST API is versioned numerically (for example, v58.0, v59.0), with a new version released alongside each of Salesforce's three annual major releases. A caller specifies which version it wants in the request URL, and Salesforce maintains multiple versions concurrently so that an integration built against an older version keeps working even as newer versions ship with new capabilities. This matters architecturally in two directions: an integration pinned to an old API version doesn't automatically get new fields or capabilities added in later versions (it has to explicitly update its version string to get them), and conversely, pinning to an older version is a deliberate way to avoid a breaking change in behavior that Salesforce introduced in a newer version, at least until the integration is updated and tested against it. An architect designing a new integration generally targets a recent, well-supported API version rather than an old one with no particular reason to prefer it, but recognizes that an existing integration's pinned version is itself an architectural fact worth knowing, not an arbitrary detail.

## Deprecation and sunset policy

Even versioned APIs can't be supported forever — maintaining every version ever released indefinitely isn't sustainable for any provider. A mature API program publishes a **deprecation policy**: advance notice, typically well ahead of time, that a specific version will stop being supported (its **sunset date**), giving every caller still on that version time to migrate before it's actually turned off. The failure mode this policy exists to prevent is a provider silently removing an old API version with no warning, breaking every caller still on it overnight with no time to react. When an architect is evaluating a third-party or external API dependency — not just Salesforce's own — checking whether that provider publishes a real deprecation policy, with real advance notice, is itself part of due diligence, because an integration built against a provider with no such policy carries meaningfully more long-term risk.

## Key terms

| Term | Meaning |
|---|---|
| API versioning | Supporting multiple versions of an API contract concurrently so existing callers aren't broken when the contract evolves |
| Backward-compatible change | A change (such as an optional new field) that doesn't break existing callers |
| Breaking change | A change that breaks existing callers who haven't been updated, justifying a new API version |
| Deprecation policy | A provider's published advance notice of when an API version will stop being supported |
| Sunset date | The date a specific API version actually stops being supported |

## Lab

An architect is reviewing a proposed change to an internal API that several integrations depend on: renaming a response field from `CustName` to `CustomerName` for clarity. Classify this change as backward-compatible or breaking, explain your reasoning, and describe the two different paths the team could take (one requiring a new API version, one not) depending on how the change is actually implemented.

## Check yourself

Can you explain, in your own words, why API versioning exists and what would happen to existing integrations without it? Can you classify at least three example API changes as backward-compatible or breaking, and explain why a deprecation policy with advance notice matters for evaluating any external API dependency?
