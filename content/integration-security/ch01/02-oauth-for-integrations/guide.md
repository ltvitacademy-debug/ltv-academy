# Lesson 2 — OAuth for Integrations

**Chapter 1 · Securing Integrations · Lesson 2 of 13**

## What you'll learn

- Why OAuth 2.0, not a stored username and password, is the recommended foundation for machine-to-machine Salesforce integrations
- The three OAuth flows that matter for integrations: JWT Bearer, Client Credentials, and Authorization Code (with a note on why Username-Password is no longer the right default)
- What a connected app's "Run As" user or pre-authorized principal actually controls
- How to pick the right flow for a given integration shape

## Why not just a username and password

The oldest way to authenticate an integration against Salesforce is the Username-Password OAuth flow: the integration sends a username, password, and security token, and gets back an access token. It works, but it has two problems that matter for this course. First, the integration has to hold the user's actual password, which means that credential now exists in at least two places (Salesforce's own store and wherever the integration keeps it) and has to be rotated everywhere if the password ever changes. Second, it ties the integration's authentication directly to one human-shaped login, including whatever password-complexity and expiration rules apply to that login — rules designed for a person, not a service. Current Salesforce guidance steers new integrations away from this flow in favor of approaches where the integration authenticates with something purpose-built for machine use: a signed token or a dedicated client credential, never a password a person could also type into a login screen.

## Three flows built for integrations

**JWT Bearer flow.** The integration signs a JSON Web Token with a private key and presents it to Salesforce; Salesforce validates the signature against a certificate uploaded to the connected app and, if it's valid, returns an access token — no browser, no login screen, no human in the loop at request time. This is the standard fit for a server-to-server integration like a nightly ETL job or a middleware platform: it's fully unattended, and because it authenticates with a certificate's private key rather than a password, there's no shared secret sitting in a config file that also unlocks a human's account. The admin controls who the token can represent by either pre-authorizing specific users for the connected app or requiring each user to approve it once.

**Client Credentials flow.** The integration authenticates with its own client ID and client secret — no particular user's credential is involved at all. Instead, the connected app (an External Client App, in current Salesforce terminology) is configured with a specific "Run As" user, and every call the integration makes runs with that user's permissions. This is a clean fit when the integration genuinely represents a service, not a person, and there's no certificate infrastructure already in place. The trade-off is that the single Run As user's permissions define everything the integration can ever do, so that user has to be scoped as deliberately as any other integration user (Lesson 6 covers this).

**Authorization Code flow (with PKCE for public clients).** A real person logs in through a browser and explicitly approves the connected app, after which the app receives an authorization code it exchanges for an access token and, typically, a refresh token it can use to get new access tokens without asking the person to log in again. This is the right flow when an integration genuinely acts **as** a specific, consenting individual — a mobile app the user installed, or a multi-tenant SaaS product where each customer connects their own Salesforce org and has to explicitly consent before the app can touch their data. It's a poor fit for a scheduled, no-human-present batch job, precisely because it assumes a person is available to click "Allow."

## Picking the right flow

The decision mostly comes down to one question: is a specific human supposed to be represented, or is this really a service acting as itself? A nightly job moving orders between systems, or middleware syncing case data, has no natural "person" behind it — Client Credentials or JWT Bearer fits, with the choice between those two usually coming down to whether certificate infrastructure is already in place (JWT Bearer) or a client secret is simpler to manage in the given middleware tool (Client Credentials). A connected mobile app or a multi-tenant product that needs each individual customer to explicitly grant access is a genuinely different shape of problem, and Authorization Code is what that consent model is built for.

## What the "Run As" / pre-authorized user actually controls

In every one of these flows, the integration ends up acting as *some* Salesforce user — either a specific one chosen at setup time (Client Credentials' Run As user, or a JWT Bearer flow's pre-authorized subject) or whichever individual completed the browser consent (Authorization Code). That user's profile and permission sets are the real security boundary: the OAuth flow only decides *how* the integration proves who it is, not *what* it's allowed to do once it has a token. A perfectly configured JWT Bearer setup pointed at a System Administrator user is still a dangerously over-privileged integration. Choosing the flow and scoping the identity behind it are two separate decisions, and this course comes back to scoping that identity specifically in Lesson 6.

## Key terms

| Term | Meaning |
|---|---|
| OAuth 2.0 | The industry-standard authorization framework Salesforce integrations use to obtain an access token without sharing a raw password with every calling system |
| JWT Bearer flow | A certificate-based, no-browser OAuth flow where a signed JSON Web Token is exchanged directly for an access token |
| Client Credentials flow | An OAuth flow where a connected app authenticates with its own client ID/secret and runs as a pre-configured "Run As" user, with no individual human login involved |
| Authorization Code flow | An OAuth flow where a human explicitly logs in and consents through a browser, typically yielding a refresh token for long-lived access |
| Run As user | The specific Salesforce user whose permissions govern everything a Client Credentials-flow connected app is allowed to do |
| Refresh token | A long-lived token issued in flows with user consent, used to obtain new access tokens without repeating the full login/consent step |

## Lab

A client needs three integrations built: (1) a nightly batch job syncing inventory counts from a warehouse system, with no UI and no human present when it runs; (2) a mobile field-service app that technicians log into individually with their own Salesforce credentials; (3) a multi-tenant subscription-renewal SaaS product where each of the client's own customers will connect their own separate Salesforce org. For each of the three, name the OAuth flow you'd recommend and justify it using the "is a specific human represented, or is this a service acting as itself" question from this lesson.

## Check yourself

Can you explain why the Username-Password OAuth flow is discouraged for new integrations? Can you describe, without looking back, what distinguishes JWT Bearer, Client Credentials, and Authorization Code, and match each to the kind of integration it fits best?
