# Lesson 3 — Certificates and Mutual TLS

**Chapter 1 · Securing Integrations · Lesson 3 of 13**

## What you'll learn

- The difference between standard TLS (the server proves its identity) and mutual TLS, or mTLS (both sides prove their identity)
- How a certificate's private key, rather than a shared secret, is what makes the JWT Bearer flow from Lesson 2 work
- How Salesforce handles certificates for outbound callouts versus inbound mutual authentication
- Why self-signed certificates are a recurring source of integration failures, and when they're acceptable

## TLS proves the server; mTLS proves both sides

Every HTTPS connection already uses TLS to do two things: encrypt the traffic, and let the client confirm the server's identity by checking its certificate against a trusted certificate authority (CA). That's one-way trust — the server proves who it is, but the server has no cryptographic way to know who's calling it beyond whatever application-layer authentication (a password, an OAuth token) rides along with the request. **Mutual TLS (mTLS)** adds the missing half: the client also presents a certificate, and the server validates it before the connection is considered authenticated at all. For an integration, that means the network connection itself won't even complete unless both sides can prove who they are — a meaningfully stronger guarantee than relying on an application-layer credential alone, because it stops a connection attempt before any request content is even exchanged.

## Certificates, not passwords, as the shared trust anchor

A certificate pairs a public key, which can be shared freely, with a private key, which must never leave the system that holds it. Two Salesforce integration features lean on exactly this pairing instead of a shared secret like a password:

- **JWT Bearer flow (from Lesson 2).** The integration signs its JWT with a private key it holds. Salesforce validates the signature using the matching certificate that was uploaded to the connected app ahead of time. Salesforce never needs to see or store the private key — it only needs the public certificate to check the signature. If the integration's private key is ever compromised, rotating it means generating a new key pair and uploading the new certificate; it does not involve resetting anyone's password.
- **Inbound mutual authentication.** Salesforce can require that inbound connections — for example, through a Salesforce Site or an API endpoint — present a client certificate that Salesforce validates against a certificate it has imported. This is configured through an inbound certificate feature that requires both sides to prove their identity with a mutual authentication certificate, going beyond simple impersonation checks that rely on a password or token alone.

## Outbound callouts: Salesforce as the client

When Salesforce calls out to an external system (the more common integration direction), Salesforce is the client proving its identity, typically by presenting a client certificate the org has uploaded, while also validating the external server's certificate as any TLS client would. This is the direction most "two-way SSL" integration setups describe: both the external system and Salesforce present certificates, and each side validates the other's before the callout is treated as authenticated.

## Why self-signed certificates keep causing integration outages

A self-signed certificate is one an organization generates and vouches for itself, rather than one issued by a recognized certificate authority. They're common in development and testing because they're free and immediate — but they are a frequent cause of integration failures when organizations try to move a self-signed cert into a production path, because the receiving system has no trusted authority to validate it against and may reject the connection outright. Different platforms and connectors vary in exactly how strict they are about this (some accept self-signed certificates for specific legacy outbound-message configurations; others reject them outright), which is precisely why this is worth verifying against the specific feature's current documentation rather than assuming a self-signed certificate that worked in one place will work in another. The safe default for any production, revenue-affecting, or customer-facing integration is a CA-signed certificate from a certificate authority the receiving system already trusts.

## What this buys you, and what it doesn't

Certificates and mTLS solve the identity and encryption problem — proving who's on each end of the connection and keeping the traffic unreadable in transit. They don't, by themselves, solve authorization: a validly certificate-authenticated caller can still be over-privileged if the identity behind that certificate (an integration user, a Run As user) has more access than the integration needs. Certificates answer "is this really who it claims to be," not "should this caller be allowed to do what it's asking to do" — that's the job of the identity scoping covered in Lessons 5 and 6.

## Key terms

| Term | Meaning |
|---|---|
| TLS | The transport encryption protocol that also lets a client verify a server's identity via its certificate |
| Mutual TLS (mTLS) | TLS extended so the client also presents a certificate, which the server validates before completing the connection |
| Certificate authority (CA) | A trusted third party that issues and vouches for certificates, letting a receiving system validate an unfamiliar certificate without prior direct knowledge of it |
| Self-signed certificate | A certificate an organization generates and vouches for itself, without a CA backing it -- commonly rejected in production integration paths |
| Private key | The half of a certificate's key pair that must never be shared; it's what actually produces a signature or decrypts traffic |

## Lab

A partner integration team asks to use a self-signed certificate for a new production webhook listener that will receive customer order data from your org, saying it's "faster to set up than waiting on a CA." Write a short response explaining the risk of accepting this for a production, customer-data-carrying integration, and propose what you'd ask them to use instead and why mTLS (rather than one-way TLS plus just a shared API key) is worth the extra setup for this specific integration.

## Check yourself

Can you explain the difference between standard TLS and mutual TLS in one sentence each? Can you explain why the JWT Bearer flow needs a certificate rather than a shared secret, and what has to happen to rotate it if the private key is compromised?
