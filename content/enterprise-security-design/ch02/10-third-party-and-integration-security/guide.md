# Lesson 10 — Third-Party and Integration Security

**Chapter 2 · Applying Security Architecture · Lesson 10 of 15**

## What you'll learn

- Why every integration is a security boundary (Lesson 1) that deserves its own deliberate design, not a convenience afterthought
- How Connected Apps and OAuth scopes control what an external system is actually allowed to do once authenticated
- The Named Credential / External Credential model for outbound callouts, and the Named Principal vs. Per-User authentication choice
- A short checklist for evaluating a new integration request before approving it

## Every integration crosses the org boundary — on purpose

Lesson 1 named the org boundary as the edge between the public internet and an authenticated session inside Salesforce. An integration is, almost by definition, something that's deliberately allowed to cross that boundary on a recurring, automated basis — which makes it worth exactly the same deliberate design attention as a human user's access, and arguably more, because an integration's credentials often don't expire the way a human's session does, and a compromised integration credential can act at machine speed and machine volume.

## Inbound: Connected Apps and OAuth scopes

When an external system needs to call into Salesforce (create records, query data, trigger processes via the API), it authenticates through a **Connected App** — a Salesforce configuration object that represents the external application and controls what it's allowed to request. Two layers of control matter here:

- **OAuth scopes** configured on the Connected App cap what any client authenticating through it can ever request — a client can ask for a subset of what the Connected App allows, never more. Common scopes include `api` (REST/Bulk API access to the logged-in user's own data), `refresh_token` (lets the integration keep working without the user present by exchanging a refresh token for a new access token), and `full` (broad access matching whatever the authenticated user can do, though notably without a refresh token on its own). An architect reviewing a new integration request should ask specifically which scopes it's requesting and why — a request for `full` when `api` would suffice is a least-privilege violation at the integration layer, same as Lesson 2's reasoning applied to a human profile.
- **The integration user's own profile and permission sets.** A Connected App controls what an external system can *ask for*; the integration user it authenticates as still goes through every boundary from Lesson 1 — CRUD, sharing, field-level security — exactly like a human user. Scoping the Connected App correctly and then authenticating it as an over-permissioned "API User" profile with broad object access undoes most of the benefit.

## Outbound: Named Credentials and External Credentials

When Salesforce needs to call *out* to an external system (a REST API, an external database), the modern pattern separates two concerns: an **External Credential** holds the actual authentication details (OAuth settings, scopes requested from the external system, or other auth parameters), and a **Named Credential** references that External Credential along with the callout endpoint URL, so Apex and Flow can make the callout without the endpoint or secret being hardcoded into business logic. This separation matters for an architect because it means rotating a credential or changing an endpoint doesn't require touching or redeploying the code that uses it.

Named Credentials support two authentication identity models:

- **Named Principal** — one shared identity is used for every Salesforce user's callouts through that credential. A permission set controls who's allowed to use the Named Credential at all, but once authorized, everyone shares the same identity on the external system's side. This fits service-account-style integrations: scheduled jobs, batch processes, trigger-driven callouts, where there's no individual human session to attribute the call to.
- **Per-User** — each individual user authenticates with their own credentials against the external system, so the external system can enforce and audit access at the individual level rather than through one shared identity. This fits integrations where the external system needs to know specifically *which* person is acting, not just that "Salesforce" is acting on someone's behalf.

Choosing between them is a real design decision, not a default to accept: Named Principal is simpler to set up and sufficient for backend automation, but it collapses individual accountability (Lesson 5's repudiation concern) into one shared identity — which matters if the external system's own audit trail is ever needed to answer "which specific person triggered this."

## A checklist before approving a new integration

- What OAuth scopes does this integration actually need, versus what it's requesting?
- What profile/permission sets does the integration user hold, and is that the minimum needed for this integration's actual job (Lesson 2)?
- For outbound calls, does Named Principal or Per-User fit this integration's accountability needs?
- Is the credential itself (API key, OAuth secret, certificate) stored in a Named Credential/External Credential rather than hardcoded in Apex, a custom setting, or a Flow variable?
- What's the blast radius if this specific credential is compromised — which Lesson 5 STRIDE question does this map to?

## Key terms

| Term | Meaning |
|---|---|
| Connected App | Salesforce configuration object representing an external application and controlling what it may request via OAuth |
| OAuth scope | A capped permission (e.g., `api`, `refresh_token`, `full`) that limits what an authenticated client can ask to do |
| External Credential | Holds the actual authentication details for an outbound callout |
| Named Credential | References an External Credential plus a callout endpoint, so Apex/Flow can call out without hardcoding secrets |
| Named Principal / Per-User | Shared single identity for all users' callouts, versus each user authenticating individually |

## Lab

A logistics partner wants to integrate with your org to pull Shipment records nightly via a batch job, and also wants individual warehouse employees to be able to look up a Shipment's status from the partner's own portal using their own Salesforce login. Design the integration: what Connected App scopes would you request for the batch job, and would you use Named Principal or Per-User for the batch integration versus the employee lookup feature? Justify each choice.

## Check yourself

Can you explain why scoping a Connected App narrowly doesn't fully solve least privilege if the integration user's profile is still over-permissioned? Can you explain, in your own words, the difference between Named Principal and Per-User authentication, and name one scenario where each is the right choice?
