# Lesson 12 — TLS and Encryption in Transit for Cloud Services

**Chapter 3 · Cloud Encryption: At Rest and In Transit · Lesson 12 of 32**

## What you'll learn

- What TLS actually secures in a cloud context — client-to-service and service-to-service traffic alike
- The real default now: most managed cloud services enforce TLS automatically, rather than leaving it optional
- Two concrete real examples: HTTPS-only storage accounts and enforced minimum TLS versions
- Where the TLS certificate in this picture actually comes from, tying back to Key Vault and KMS

## TLS: the same protocol, now doing double duty in the cloud

The IT Networking & Cybersecurity Fundamentals course already covered how TLS itself works — the
asymmetric handshake that exchanges a symmetric session key, and the certificate that proves identity
behind it. In a cloud environment, that exact same protocol does two jobs at once: it secures traffic
between a **client** (a browser, a script, an application) and a cloud service, and it secures traffic
**between cloud services** talking to each other behind the scenes, like a web app calling a database
or a storage account. Any hop across a network, inside the cloud or outside it, is a hop TLS needs to
cover.

## Enforced by default: HTTPS-only storage

Both Azure and AWS have moved from "TLS is available if you configure it" to "TLS is required unless
you deliberately turn it off." Azure Storage Accounts, for instance, enable **Secure transfer
required** by default on new accounts — any plain HTTP request to that storage account is rejected
outright, not just discouraged. Amazon S3 lets you enforce the same behavior with a bucket policy
that denies any request where `aws:SecureTransport` is `false`, and modern tooling and account
defaults increasingly nudge configurations toward exactly that setting.

## Enforced minimum TLS versions

It's not enough for traffic to just use "TLS" in the abstract — older versions of TLS (1.0 and 1.1)
have known weaknesses and are considered insecure by modern standards. Both Azure and AWS now enforce
a **minimum TLS version** across most managed services — TLS 1.2 at minimum, with TLS 1.3
increasingly supported — and a connection that tries to negotiate an older version is refused rather
than silently downgraded. This is a direct, practical consequence of the TLS fundamentals covered
earlier in the catalog: a weak or outdated TLS version undermines the exact handshake protections
that make TLS worth using in the first place.

## Where the certificate actually comes from

Every TLS connection still needs a certificate binding a public key to an identity, exactly as
covered previously. In the cloud, that certificate doesn't just appear — it's typically issued and
managed through services like **Azure Key Vault** (which stores certificates alongside keys and
secrets, as Lesson 10 covered) or **AWS Certificate Manager (ACM)**, AWS's dedicated service for
provisioning and renewing TLS certificates for services like load balancers and CloudFront.
Centralizing certificate issuance there means renewals happen automatically, instead of a certificate
silently expiring and taking down a production service.

## Key terms

| Term | Meaning |
|---|---|
| Encryption in transit | Encrypting data while it moves across a network, between a client and a service or between two services |
| Secure transfer required | Azure's setting that rejects any plain HTTP request to a storage account, enforcing HTTPS-only access |
| Minimum TLS version | A floor (commonly TLS 1.2) below which a cloud platform refuses to negotiate a connection |
| AWS Certificate Manager (ACM) | AWS's dedicated service for issuing and auto-renewing TLS certificates |

## Check yourself

Why does enforcing a minimum TLS version matter even if a connection is technically still "using
TLS"?
