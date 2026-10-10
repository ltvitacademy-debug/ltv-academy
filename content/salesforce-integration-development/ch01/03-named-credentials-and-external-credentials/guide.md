# Lesson 3 — Named Credentials and External Credentials

**Chapter 1 · Outbound Integration · Lesson 3 of 23**

## What you'll learn

- Why Salesforce split "Named Credential" into two separate objects: External Credential and Named Credential
- What an External Credential, a Principal, and a Named Credential each actually store
- How a Permission Set controls who can use a Named Credential
- The `callout:My_Named_Credential` syntax that keeps secrets out of Apex code entirely
- How to read the pieces of a Named Credential setup even before writing any Apex against it

## The problem Named Credentials solve

Early Apex callout code often hard-coded an endpoint URL and, worse, a username/password or API key directly in a class, or stashed it in a Custom Setting. That's a security and maintenance problem: secrets end up visible in code, in debug logs, and in version control, and a URL or password change means a deploy. Named Credentials exist to separate "where do I send this, and how do I authenticate" from the Apex code itself.

## Two objects, not one

The modern (post-Winter '21) model splits this into two related Setup objects, both found by searching "Named Credentials" in Setup:

- **External Credential** — defines *how* authentication works: an Authentication Protocol (for example, Password Authentication/Custom, OAuth 2.0 Client Credentials, OAuth 2.0 JWT Bearer, or AWS Signature), and one or more **Principals**. A Principal holds the actual authentication parameters — a username and password, a client ID and secret, a certificate — and comes in two flavors: a **Named Principal** (one shared identity used by everyone who has access, the common case for a system-to-system integration) or **Per-User Principals** (each individual Salesforce user supplies their own credentials for the external system).
- **Named Credential** — defines *where*: the callout endpoint URL, plus a reference to the External Credential that supplies the authentication for that endpoint. A Named Credential never stores a password itself; it points at the External Credential that does.

This split matters because one External Credential's authentication setup can be reused by multiple Named Credentials pointing at different endpoints of the same authenticated system, and because it cleanly separates the "how do we authenticate" conversation (often owned by a security or integration architect) from the "which URL are we calling" conversation (often owned by the developer building a specific feature).

## Granting access with a Permission Set

Having a Named Credential configured doesn't automatically let any user or any Apex transaction use it. Access is granted through a **Permission Set** that references the External Credential's Principal. A user (or the running user's Apex context) must have that permission set assigned, or the callout fails with an authentication/access error — even if the Apex code compiles and deploys perfectly. This is the access-control layer that lets an admin revoke an integration's access instantly, without touching code, by removing the permission set assignment.

## Calling out with a Named Credential

Once a Named Credential exists and the calling user has access, Apex code never touches the raw URL or secret at all:

```apex
Http http = new Http();
HttpRequest req = new HttpRequest();
req.setEndpoint('callout:My_Named_Credential/orders');
req.setMethod('GET');
HttpResponse res = http.send(req);
```

The `callout:My_Named_Credential` prefix tells the platform to resolve the real endpoint URL and inject the correct authentication headers at send time — the developer, the debug log, and anyone reading this code never see the actual secret. Because the Named Credential itself is a trusted, admin-approved endpoint, there's no separate Remote Site Setting needed for it either.

## Key terms

| Term | Meaning |
|---|---|
| External Credential | Defines the authentication protocol and holds one or more Principals with the real auth parameters |
| Principal | A specific identity under an External Credential — Named (shared) or Per-User (individual) |
| Named Credential | Defines the callout endpoint URL and references an External Credential for authentication |
| Permission Set (for Named Credentials) | Grants a user or integration access to use a specific Principal/Named Credential |
| `callout:` syntax | The Apex endpoint prefix that resolves to a Named Credential's real URL and auth at send time |

## Lab

In a free Developer Edition org, go to Setup and search "Named Credentials." Open the External Credentials tab and click New. Create an External Credential named `Practice_External_Cred` with Authentication Protocol set to "Custom" (or "No Authentication" if your edition offers it for practice), add a Named Principal, and give it a placeholder parameter (for example a `UserName` parameter with a fake value — never use a real production password for this exercise). Then go to the Named Credentials tab, click New, and create a Named Credential named `Practice_Named_Cred` pointing at `https://example.com/api` and referencing your new External Credential. Finally, create a Permission Set that grants access to your External Credential's Principal, and assign it to yourself. Confirm you can see the full chain: Permission Set → Principal → External Credential → Named Credential → endpoint.

## Check yourself

Explain, without looking back, what an External Credential stores versus what a Named Credential stores, and why they're split into two objects instead of one. Then explain what happens if a user's Apex runs a callout against a Named Credential they don't have permission-set access to.
