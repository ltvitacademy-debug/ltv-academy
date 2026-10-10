# Lesson 10 — Authenticating Inbound Callers

**Chapter 2 · Inbound Integration · Lesson 10 of 23**

## What you'll learn

- Why a Connected App is the foundation for any OAuth-based inbound integration
- The difference between the OAuth 2.0 Client Credentials Flow and the JWT Bearer Flow
- Why authentication and authorization are two separate questions, both of which matter
- How IP restrictions add a second layer of control beyond OAuth itself
- How to reason about which authentication flow fits a given inbound integration

## Authentication starts with a Connected App

Any external system calling into Salesforce's REST API, SOAP API, or a custom Apex REST/SOAP service needs to authenticate first. The foundation for OAuth-based authentication is a **Connected App** — a Setup object that defines which OAuth scopes are permitted, the callback URL (for interactive flows), and, for certificate-based flows, the certificate used to verify a signed request. Every server-to-server inbound integration you build should start by provisioning a dedicated Connected App for that integration, rather than reusing credentials meant for something else.

## Two flows built for server-to-server integration

Interactive OAuth flows (where a human logs in through a browser) aren't appropriate for an unattended server-to-server integration — there's no person present to click "Allow." Two flows are built specifically for that case:

- **OAuth 2.0 Client Credentials Flow** — the external application authenticates as itself, using a client ID and client secret tied to a dedicated "integration user" in Salesforce, with no interactive login step. This is the simplest option when the integration genuinely represents "the system itself," not any particular human user.
- **OAuth 2.0 JWT Bearer Flow** — a pre-authorized, certificate-based flow: the external system signs a JSON Web Token with a private key, and Salesforce verifies it against the public certificate uploaded to the Connected App. No client secret is exchanged over the wire at request time, which many security teams prefer for unattended, scheduled, or high-volume integrations.

Both flows result in Salesforce issuing an access token the external system then uses on every subsequent API call, rather than re-authenticating on every single request.

## Authentication is not the same question as authorization

A call succeeding at authentication (Salesforce has verified who is calling) doesn't mean that caller can do anything it wants. Every inbound call still runs as some underlying Salesforce user — often a dedicated integration user — and that user's **profile and permission sets** determine what records and fields the call can actually read or write. A well-designed integration user gets exactly the object and field permissions the integration needs, nothing more; granting a System Administrator profile to an integration user "to avoid access problems" is a common and serious security mistake, since it means any compromise of that one credential compromises the entire org.

## A second layer: IP restrictions

Beyond OAuth, Salesforce lets an admin restrict where API calls are allowed to originate from at all, through **Trusted IP Ranges** (org-wide) or a profile's **Login IP Ranges** (per profile). For a server-to-server integration calling from a known, fixed set of servers, restricting the integration user's profile to those specific IP ranges adds a real second layer of defense — a stolen access token is far less useful to an attacker calling from an unexpected network.

## Choosing a flow

A rough decision guide: need the integration to represent itself, not a person, with the simplest setup? Client Credentials Flow. Need certificate-based trust with no secret transmitted per request, for a higher-security or highly automated integration? JWT Bearer Flow. Either way, pair the chosen flow with a least-privilege integration user and, where the calling infrastructure is fixed and known, IP restrictions.

## Key terms

| Term | Meaning |
|---|---|
| Connected App | The Setup object defining OAuth scopes, callback URL, and certificate for an integration |
| OAuth 2.0 Client Credentials Flow | Server-to-server authentication where the app authenticates as itself, no interactive login |
| OAuth 2.0 JWT Bearer Flow | Certificate-based, pre-authorized flow using a signed JSON Web Token instead of a transmitted secret |
| Integration user | The dedicated Salesforce user an inbound call actually runs as, whose permissions bound what the call can do |
| Trusted IP Ranges / Login IP Ranges | Org-wide or per-profile restrictions on where API calls may originate from |

## Lab

Scenario-analysis exercise: a logistics partner needs an unattended, scheduled nightly job to push shipment updates into Salesforce from their own servers, with no human present. Decide which OAuth flow fits better and justify it in writing. Then design the integration user for this scenario: list the specific object permissions (Create/Read/Edit on which objects) it actually needs, explicitly contrasting that list with what a System Administrator profile would grant, to make the least-privilege argument concrete.

## Check yourself

Explain the difference between the Client Credentials Flow and the JWT Bearer Flow. Then explain, without looking back, why authentication succeeding doesn't automatically mean a call is authorized to do everything it asks.
