# Lesson 4 — Named Credentials

**Chapter 1 · Securing Integrations · Lesson 4 of 13**

## What you'll learn

- Why Named Credentials exist: to get authentication details out of Apex code and off the "hardcoded in a class" path entirely
- The split between an External Credential (holds the authentication configuration and principals) and a Named Credential (holds the endpoint and points at an External Credential)
- The difference between a Named Principal (one shared identity for the whole org) and a Per-User principal (each user's own credential)
- How permission sets control who can actually use a given principal in a callout

## The problem Named Credentials solve

Lesson 1's attack chain started with a hardcoded username and password sitting in an Apex class. That's not a hypothetical mistake — it's the default outcome if a developer just wants a callout to work, because Apex code can call `Http` and `HttpRequest` directly with any endpoint URL and any header values typed straight into the class. Every hardcoded credential inherits every risk from that lesson: it's visible to anyone who can read the code (including in a sandbox, a backup, or an accidentally-public repository), it has to be hunted down and changed by hand in every class that uses it if it's ever rotated, and nothing enforces that the endpoint URL itself hasn't been quietly changed by a bug or a bad merge. **Named Credentials** exist specifically to remove this failure mode: Apex code references a named credential by name as its callout endpoint, and Salesforce handles authentication for that callout entirely on the platform side. The credential's actual value is never visible to the Apex code at all.

## Two pieces: External Credential and Named Credential

The current Named Credentials model (legacy named credentials, which bundled everything into one object, are being phased out) splits the configuration into two cooperating pieces:

- **External Credential** holds the authentication protocol and the actual secret material or OAuth configuration — the piece that answers "how do we prove who we are to this external system." One External Credential can be reused across several Named Credentials that all authenticate to the same service but call different endpoints on it.
- **Named Credential** holds the callout endpoint URL and points at an External Credential for authentication. This is the piece Apex code actually references by name in a callout.

Splitting the two means the same authentication setup doesn't have to be duplicated every time a new endpoint on the same external system needs to be called, and it cleanly separates "what we're calling" from "how we prove who we are when we call it."

## Named Principal vs. Per-User: who the credential represents

An External Credential defines one or more **principals** — the identity that actually authenticates for the callout. Salesforce supports two identity models here, and picking the right one matters:

- **Named Principal.** A single, shared identity is used for every user whose code triggers this callout, regardless of which Salesforce user is running the Apex. This is the right model for a true service-to-service integration — a scheduled job or a backend sync where the external system doesn't need, and shouldn't need, to know which individual Salesforce user happened to trigger it.
- **Per-User.** Each Salesforce user authenticates to the external system with their own individual credential, stored per-user (in the User External Credential object). This is the right model when the external system needs to know and enforce access by the actual human behind the request — for example, an integration where each user should only see their own data in the external system, mirrored by their own login to that system.

Choosing Per-User when a service identity would do adds real operational overhead, since every individual user now needs their own credential provisioned and kept current on the external side. Choosing Named Principal when the integration genuinely needs to distinguish between users removes an authorization boundary the business actually needs. This is a design decision worth making deliberately, not defaulting into.

## Who can use a principal: permission sets as the gate

A principal isn't automatically available to every user in the org just because it exists. Each principal is associated with specific permission sets (or permission set groups, or in the legacy model, profiles), under that permission set's External Credential Principal Access. Only users holding one of those permission sets can have their callouts authenticate through that principal. This means scoping who can use an integration's credential is a normal permission-set assignment decision — the same tool used to control object and field access controls who can actually invoke the credential at all, which keeps the "who can use this integration" question inside the same governance process as every other access decision, rather than being a side door around it.

## What Named Credentials don't fix by themselves

Named Credentials solve the "credential hardcoded in code" problem and the "which identity authenticates" problem. They don't automatically mean the identity behind the principal is well-scoped — a Named Principal pointed at an over-privileged integration user is still over-privileged; Named Credentials just stopped the credential itself from living in Apex. Lessons 5 through 7 build on top of this: once the credential is safely out of code, the next questions are what that identity can do (Lesson 5-6) and how the secret material behind the credential is managed and rotated (Lesson 7).

## Key terms

| Term | Meaning |
|---|---|
| Named Credential | The Salesforce metadata object holding a callout's endpoint URL, referenced by name from Apex, pointing at an External Credential for authentication |
| External Credential | The object holding the authentication protocol, secret material, and principals for a given external system; reusable across multiple Named Credentials |
| Principal | The specific identity (named or per-user) that actually authenticates when a callout through a given External Credential is made |
| Named Principal | A single, shared identity used for every user whose code triggers a given callout |
| Per-User principal | An identity model where each individual Salesforce user authenticates to the external system with their own credential |
| External Credential Principal Access | The permission-set setting that determines which users are allowed to have their callouts authenticate through a given principal |

## Lab

A client has an Apex integration today that calls an invoicing API, with the API key typed directly into the Apex class as a string literal. Design the Named Credential replacement: decide whether this invoicing integration should use a Named Principal or a Per-User principal (justify your choice using this lesson's framework), describe what the External Credential and Named Credential would each hold, and name which permission set you'd create to control who's allowed to use that principal.

## Check yourself

Can you explain the difference between an External Credential and a Named Credential without looking back? Can you describe a realistic integration that should use a Named Principal, and a different one that should use Per-User, and explain why swapping them would be a mistake in each case?
