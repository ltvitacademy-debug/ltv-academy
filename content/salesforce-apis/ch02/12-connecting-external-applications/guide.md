# Lesson 12 — Connecting External Applications

**Chapter 2 · Using the APIs · Lesson 12 of 22**

## What you'll learn

- Registering a client application: Connected Apps and the newer External Client Apps
- OAuth scopes: limiting what a connected client is actually allowed to do
- Named Credentials: letting Salesforce call out to an external system declaratively
- Putting authentication (Lesson 7) and payloads (Lesson 8) together into one real connection

## Registering the client side

Lesson 7 introduced OAuth flows; before any of them can run, Salesforce needs a record of the client application itself. Historically that was a **Connected App**, defining:

- A **Consumer Key** and **Consumer Secret** (the OAuth client ID/secret pair)
- One or more **callback URLs** the OAuth flow is allowed to redirect to
- The **OAuth scopes** the app may request (see below)

As covered in Lesson 7, Salesforce has shifted new client registrations toward **External Client Apps (ECAs)** as of 2026 — existing Connected Apps keep working, but a new integration today is registered as an ECA, which separates the app's identity from its policies (scopes, IP restrictions, session behavior) more cleanly than a classic Connected App did.

## OAuth scopes

A **scope** limits what an obtained access token is actually allowed to do, independent of what the underlying user account could do if logged in directly. Common scopes include `api` (access the REST/SOAP/Bulk/etc. APIs), `refresh_token` (allow obtaining a refresh token for long-lived access), and `full` (broad access, rarely the right default). The principle here is the same one Lesson 21 covers in depth for security generally: request only the scopes an integration actually needs. A reporting integration that only ever reads data has no business requesting write-capable or administrative scopes just because they're available.

## Named Credentials: the declarative alternative

Everything so far assumes Salesforce is the *target* of an incoming call. The reverse direction — Salesforce (via Apex or Flow) calling *out* to an external system — has its own answer: a **Named Credential**. Instead of hardcoding an external endpoint's URL, authentication type, and secrets inside Apex code, an admin configures a Named Credential declaratively in Setup, and Apex callouts simply reference it by name:

```apex
HttpRequest req = new HttpRequest();
req.setEndpoint('callout:My_Named_Credential/orders');
req.setMethod('GET');
```

Salesforce handles attaching the right authentication (and resolving the actual base URL) behind the scenes. This keeps secrets out of code, and means rotating a credential doesn't require a deployment.

## Putting it together

A complete external-application connection combines several pieces this course has introduced separately: a registered client (Connected App or ECA) with the right scopes, an OAuth flow appropriate to whether a user is present (Lesson 7), and — for Salesforce calling outward instead of inward — a Named Credential. Getting any one piece wrong (too-broad scopes, the wrong OAuth flow for the integration's shape, secrets hardcoded instead of stored in a Named Credential) is a common source of avoidable integration risk, which is exactly why Lesson 21 returns to this territory from a security-first angle.

## Key terms

| Term | Meaning |
|---|---|
| Connected App | The classic object registering an external client app's OAuth identity |
| External Client App (ECA) | Salesforce's newer, recommended replacement for registering a new OAuth client as of 2026 |
| OAuth scope | A permission boundary limiting what an access token is allowed to do |
| Named Credential | A declarative Setup object storing an external endpoint's URL and auth, referenced by name from Apex/Flow callouts |

## Lab

A company needs Salesforce to call out to a shipping-rate API whenever an Order is created, and separately needs an external inventory system to call into Salesforce to check stock levels. For each direction, name which concept from this lesson applies (Connected App/ECA with scopes, vs. Named Credential) and explain why the other concept wouldn't fit that direction.

## Check yourself

Can you explain the difference between an incoming integration calling into Salesforce and an outgoing Apex/Flow callout calling out from Salesforce, and which concept (Connected App/ECA vs. Named Credential) applies to each? Can you explain what an OAuth scope limits, independent of the underlying user's own permissions?