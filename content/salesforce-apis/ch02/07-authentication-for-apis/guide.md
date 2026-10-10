# Lesson 7 — Authentication for APIs

**Chapter 2 · Using the APIs · Lesson 7 of 22**

## What you'll learn

- Why OAuth 2.0, not username/password, is the modern standard for Salesforce API auth
- The Web Server (Authorization Code) flow, and when it's the right choice
- The JWT Bearer flow for server-to-server integrations with no user present
- Why the legacy Username-Password flow is being phased out, and what's replacing Connected Apps

## OAuth 2.0 is the standard

Every API this course has introduced requires authentication, and for REST, Bulk, Streaming, Composite, and GraphQL, that authentication is almost always **OAuth 2.0**. Instead of sending a raw username and password with every call, a client obtains a short-lived **access token** once (through one of several "flows," depending on the integration's shape) and sends that token on every subsequent request:

```http
GET /services/data/v61.0/sobjects/Account/001xx000003DGb2AAG
Authorization: Bearer 00D5e000000abCDEAU...
```

## Registering a client: Connected Apps and External Client Apps

Before any OAuth flow can run, Salesforce needs to know about the client application requesting access — historically, this registration was a **Connected App**, which defines a Consumer Key and Consumer Secret, a callback URL, and the OAuth scopes the app is allowed to request.

This is actively changing: as of Winter '26 and Spring '26, Salesforce has disabled creating *new* Connected Apps across all orgs, in favor of a newer object called an **External Client App (ECA)**. Existing Connected Apps keep working — they are not deprecated — but ECAs are now Salesforce's recommended way to register a new OAuth client, with a cleaner separation between the app's identity and its policies (scopes, IP ranges, session behavior). If you're setting up a brand-new integration today, expect to register it as an External Client App rather than a classic Connected App.

## The Web Server (Authorization Code) flow

This is the flow you'll use most often for a server-side application with its own backend (and a place to securely store a client secret):

1. The app redirects the user to `/services/oauth2/authorize` with its client ID and callback URL.
2. The user logs in and approves the requested scopes.
3. Salesforce redirects back to the callback URL with a short-lived authorization code.
4. The app exchanges that code for an access token (and a refresh token) at `/services/oauth2/token`.

```http
POST /services/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=aPr...&client_id=3MVG9...&client_secret=1234567890&redirect_uri=https://myapp.com/callback
```

## The JWT Bearer flow: no user in the loop

Some integrations are purely server-to-server — a nightly batch job, for example, has no human present to click "Approve." The **JWT Bearer flow** handles this: the integration signs a JWT (JSON Web Token) assertion with a private key it holds, and exchanges that signed assertion directly for an access token at the same `/services/oauth2/token` endpoint, with no browser redirect at all.

## Other flows, and one to avoid

A **Refresh Token flow** lets an app exchange a previously issued refresh token for a new access token once the old one expires, without the user logging in again. A **Device Flow** supports devices without a usable browser (like a TV app). The legacy **Username-Password flow** — sending a raw username and a password concatenated with a security token directly to the token endpoint — still technically exists, but Salesforce is actively retiring it (targeted for Winter '27) and discourages it for any new integration. Don't build new integrations on it.

## Key terms

| Term | Meaning |
|---|---|
| OAuth 2.0 | The standard authorization framework Salesforce's APIs use instead of raw credentials |
| Access token | A short-lived credential sent as a Bearer token on every API call |
| Connected App | The classic Salesforce object registering an OAuth client (Consumer Key/Secret, callback URL, scopes) |
| External Client App (ECA) | Salesforce's newer, recommended way to register an OAuth client, replacing new Connected App creation |
| Web Server (Authorization Code) flow | The OAuth flow for a server-side app with a user present and a securely stored client secret |
| JWT Bearer flow | The OAuth flow for server-to-server integrations with no user interaction |
| Refresh token | A long-lived credential exchanged for a new access token once the old one expires |

## Lab

A company is building two integrations: (1) a web app where a human user logs in with their own Salesforce credentials and approves access, and (2) a nightly, fully automated job with no human present that syncs inventory data. For each, name the correct OAuth flow and write out, in plain language, the sequence of steps that flow follows from start to receiving an access token.

## Check yourself

Can you explain why the Web Server flow needs a user in the loop while the JWT Bearer flow doesn't? Can you explain what changed in 2026 regarding Connected Apps vs. External Client Apps, and whether existing Connected Apps stopped working because of it?