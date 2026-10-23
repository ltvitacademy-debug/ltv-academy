# Lesson 10 — Mutual Authentication & API Keys

**Chapter 3 · Authentication for Integrations · Lesson 10 of 29**

## What you'll learn

- How mutual TLS (mutual authentication) differs from the HTTPS you already rely on every day
- Why mutual TLS exists, and the real kinds of integrations that actually require it
- How API keys work as a simpler shared-secret alternative, and their honest limitations
- How to reason about choosing between OAuth, mutual TLS, and API keys for a given integration

## Standard HTTPS only proves the server's identity

Every integration in this chapter so far has assumed standard HTTPS: when ServiceNow calls an external API, the external server presents a certificate, and ServiceNow verifies that certificate to confirm it's really talking to the server it thinks it is. That's one-directional trust — the server proves itself to the client. The client (ServiceNow, in this case) proves its identity separately, through whatever Authentication Profile is configured: Basic Auth, OAuth, or something else layered on top of that already-trusted connection.

## What mutual TLS adds

**Mutual TLS** (also called mutual authentication, or mTLS) changes that: both sides present and verify certificates. Not only does the external server prove its identity to ServiceNow, ServiceNow also presents its own client certificate, and the external server verifies *that* certificate before accepting the connection at all. Neither side gets to skip proving who it is — the TLS handshake itself fails if either certificate doesn't check out, before a single line of REST Message script even runs.

This is real overhead: both sides need certificates issued by a trusted authority, and both sides need a process for renewing those certificates before they expire. It's not the default choice for a routine integration. Mutual TLS shows up specifically where certificate-based identity verification on both ends is a hard requirement rather than a nice-to-have — highly sensitive integrations with financial systems or government systems, where regulators or the partner's own security policy demand it, and where the cost of getting identity verification wrong outweighs the setup cost of managing certificates on both sides.

## API keys: the simpler alternative many partners actually offer

Not every external API supports OAuth or mutual TLS. A large number of real-world APIs — especially smaller SaaS vendors and simpler internal tools — authenticate with nothing more than an **API key**: a shared secret string passed in a custom HTTP header, commonly something like:

```
X-API-Key: abc123xyz789
```

An API key is configured on the REST Message's HTTP Headers, not through an OAuth or Basic Auth Authentication Profile, since it's just a static string the external API recognizes. It's simple to set up and simple to reason about, which is exactly why it remains common.

## The honest limitation of API keys

API keys are less standardized and generally less secure than OAuth. There's no universal spec the way there is for OAuth — every vendor decides its own header name, its own key format, and its own revocation process. Most API key implementations have no built-in expiration and no scope model, meaning a single key is often all-or-nothing access rather than a token limited to specific permissions. If a key leaks, it's typically valid until someone manually rotates it, the same practical weakness Basic Auth has. The honest reason API keys are still worth knowing: many external partners simply don't offer anything stronger, and refusing to integrate until they do isn't a realistic option in most real projects.

## Key terms

| Term | Meaning |
|---|---|
| Mutual TLS (mTLS) | Both the client and the server present and verify certificates, rather than only the server proving its identity |
| Certificate-based identity | Proving identity using a certificate issued by a trusted authority, rather than a password or token |
| API key | A shared secret string, passed in a custom header, that an external API recognizes as a credential |
| X-API-Key header | A common (though not universally standardized) header name used to pass an API key |
| Scope model | A system limiting what a given credential is allowed to do, rather than granting all-or-nothing access |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: what does mutual TLS require that standard HTTPS does not, and why is an API key generally considered less secure than an OAuth access token even though both are just strings sent in a header?
