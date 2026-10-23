# Lesson 9 — OAuth 2.0 for ServiceNow Integrations

**Chapter 3 · Authentication for Integrations · Lesson 9 of 29**

## What you'll learn

- Why OAuth 2.0 is ServiceNow's standard modern answer to the weaknesses Lesson 8 exposed in Basic Auth
- What an OAuth Entity Profile and its underlying OAuth Entity record actually configure
- The two grant types ServiceNow supports for outbound integrations, and when each one applies
- The real practical payoff: ServiceNow requests, caches, and refreshes the access token for you

## What OAuth fixes

Lesson 8 left Basic Auth with three real problems: the credential travels on every request, it never expires, and revoking it means changing a password shared across integrations. OAuth 2.0 was designed around exactly that gap. Instead of sending a reusable username and password on every call, an OAuth-secured integration exchanges a client ID and client secret for a short-lived **access token** — and sends that token, not the underlying secret, on each request. The token expires on its own, usually within an hour, and a leaked token does far less damage than a leaked password because it stops working on its own schedule.

## OAuth Entity Profiles and OAuth Entity records

In ServiceNow, OAuth configuration lives in two related pieces. The **OAuth Entity record** (sometimes still called an Application Registry entry) holds the actual connection details: the client ID, the client secret, and the token endpoint URL the external system expects token requests to hit. The **OAuth Entity Profile** is the layer you actually attach to a REST Message's Authentication Profile — it points at an OAuth Entity record and tells ServiceNow which grant type to use when requesting a token. Configuring this once, correctly, is what lets every REST Message that uses this profile authenticate the same way without repeating the setup.

## Two grant types, two real situations

ServiceNow supports two grant types for outbound integrations, and picking the right one depends entirely on whether a human is involved:

- **Client Credentials grant.** The integration authenticates as itself, using only its client ID and client secret — no human user is involved at all. This is the common choice for server-to-server integrations: a nightly job pulling data from a partner API, or a scheduled sync that runs unattended. ServiceNow presents its own identity, gets a token back, and calls the API.
- **Authorization Code grant.** Used when the integration needs to act *on behalf of a specific human user* who has explicitly authorized that access — for example, a ServiceNow workflow that needs to read a particular employee's own calendar or file storage. The user goes through a one-time consent step with the external provider, and the resulting token represents that user's authorization, not the integration's own identity.

Most backend-to-backend integrations built in this course use Client Credentials; Authorization Code only enters the picture when a real person's own permissions need to carry through to the external call.

## The real practical win: token lifecycle is no longer your problem

Once an OAuth Entity Profile is configured and attached to a REST Message's Authentication Profile, the developer's script doesn't manage tokens at all. ServiceNow automatically requests a token the first time it's needed, caches it for reuse across subsequent calls, and silently requests a fresh one when the cached token expires or is rejected. Compare that to a hand-rolled integration that has to track token expiry, catch 401 responses, and re-authenticate manually — OAuth in ServiceNow removes that entire class of bugs from your integration code.

## Key terms

| Term | Meaning |
|---|---|
| OAuth 2.0 | A token-based authentication standard that replaces sending a reusable password with a short-lived access token |
| OAuth Entity record | Holds the client ID, client secret, and token endpoint URL for a given OAuth-secured external system |
| OAuth Entity Profile | Attached to a REST Message's Authentication Profile; points at an OAuth Entity record and selects the grant type |
| Client Credentials grant | The integration authenticates as itself, with no human user involved — the common server-to-server choice |
| Authorization Code grant | Used when the integration must act on behalf of a specific human user who has explicitly authorized access |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why would a nightly, unattended sync job use the Client Credentials grant instead of Authorization Code, and what does ServiceNow handle automatically once an OAuth Entity Profile is attached to a REST Message's Authentication Profile?
