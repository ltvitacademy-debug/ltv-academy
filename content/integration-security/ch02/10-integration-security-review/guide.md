# Lesson 10 — Integration Security Review

**Chapter 2 · Operating Securely · Lesson 10 of 13**

## What you'll learn

- How to run a structured security review across an existing integration, pulling together every control from Chapters 1 and 2
- The specific review points for inbound callouts and webhooks -- the one integration direction this course hasn't covered in depth yet
- Why a review has to check configuration, identity, and monitoring as three separate passes, not one
- How to turn review findings into a prioritized remediation plan rather than an unstructured list

## Why a dedicated review step, beyond building things correctly the first time

Every lesson so far in this course has been about building an integration correctly. A review is different: it's the deliberate, periodic act of checking whether something already built is still correctly configured, since configuration drifts (a permission set gets quietly loosened, a certificate nears expiry, an IP range stops matching the vendor's actual infrastructure) even when nothing was wrong at launch. An integration security review isn't a one-time audit before go-live; it's a recurring discipline, the same way classification review and access recertification are recurring disciplines elsewhere in a mature governance program.

## Inbound callouts and webhooks: the direction this course hasn't covered yet

Everything in Chapter 1 was framed mostly around Salesforce calling *out* to another system. Many integrations run the other direction too: an external system calls *into* Salesforce, through a custom Apex REST endpoint (`@RestResource`) or a webhook listener, often exposed through a Salesforce Site or Experience Cloud so it's reachable without a standard login. This direction deserves specific review attention because it inverts the usual trust model — instead of Salesforce deciding when and who to call, Salesforce has to decide whether to trust whoever just showed up at a public URL:

- **Does the endpoint verify who's really calling, not just that something is calling?** A public Apex REST endpoint with no additional check will execute for literally anyone who finds the URL. The standard pattern is to verify a cryptographic signature the sending system attaches to each request — commonly an HMAC computed over the raw request body using a shared signing key — and reject any request where the signature doesn't match before any business logic runs.
- **Is the signature checked against the raw request body, not a re-serialized version of it?** Computing the HMAC over the parsed-and-reserialized JSON instead of the original bytes is a subtle, common implementation bug, because re-serialization can change whitespace or key order and silently break a signature that was actually valid.
- **Where does the signing key live?** The same secrets-management discipline from Lesson 7 applies here — a webhook signing key is exactly the kind of secret that needs a deliberate, non-hardcoded, rotation-aware home, not a string literal inside the `@RestResource` class.
- **Is there any replay protection?** A valid, correctly-signed request that's simply resent later (captured and replayed by an attacker, or accidentally re-sent by a flaky sender) will pass signature verification every time unless the endpoint also checks something like a timestamp or a nonce and rejects requests that are stale or already seen.
- **If the endpoint sits behind a Salesforce Site or Experience Cloud guest user, what else can that guest user profile reach?** A guest user profile with broader object access than the webhook endpoint strictly needs is a risk independent of the signature check — the same least-privilege discipline from Lesson 6 applies to the guest user profile behind a public endpoint, since a flaw anywhere in that endpoint's logic executes with the guest user's full access, not just the webhook data it was meant to touch.

## Three passes: configuration, identity, monitoring

A structured review walks the same integration through three separate lenses, because a clean result on one doesn't imply a clean result on another:

1. **Configuration pass.** Named Credential and External Credential setup, certificate expiry dates, IP range accuracy against the integration's actual current source IPs, connected app OAuth policy and scope.
2. **Identity pass.** The integration user's (or Run As user's, or per-user principals') actual granted access versus what the integration currently does, API Only status, ownership currency (is the named owner from Lesson 6 still the right person, still at the company).
3. **Monitoring pass.** Whether event monitoring and Setup Audit Trail are actually being watched, not just technically available, and whether the documented baseline from Lesson 9 still matches current activity or needs updating.

## Turning findings into a plan

A review that just lists problems without prioritizing them tends to produce a long document nobody acts on. Rank findings by actual risk: an expired or soon-to-expire certificate that will break the integration outright usually outranks a permission set that's merely broader than ideal but hasn't caused any observed problem; a webhook endpoint with no signature verification at all usually outranks a monitoring baseline that's slightly stale. A usable output names each finding, its risk level, and a specific next action with an owner — the same accountability discipline this course has applied to integration users themselves, now applied to the review's own findings.

## Key terms

| Term | Meaning |
|---|---|
| Integration security review | A structured, recurring check of an existing integration's configuration, identity, and monitoring against this course's controls |
| Inbound callout | A request an external system makes into Salesforce, commonly through a custom Apex REST endpoint or webhook listener |
| HMAC signature verification | Computing a keyed hash over an inbound request's raw body and comparing it to a signature the sender attached, to confirm the request is genuine |
| Replay protection | A check (typically a timestamp or nonce) that rejects an otherwise validly-signed request that has already been processed or has gone stale |
| Guest user profile | The profile governing unauthenticated access through a Salesforce Site or Experience Cloud page, including any public inbound endpoint hosted there |

## Lab

Run a structured review of this integration: an external order-management system calls a public Apex REST endpoint hosted on a Salesforce Site to create Order records, with no signature verification currently implemented, through a guest user profile that also happens to have read access to the Account and Contact objects it doesn't need. Walk through the configuration, identity, and monitoring passes, list every finding you'd raise, rank them by risk, and write one concrete next action for your top two findings.

## Check yourself

Can you list the specific things you'd check for an inbound webhook endpoint that you wouldn't need to check for Salesforce's own outbound callouts? Can you explain why a review needs three separate passes (configuration, identity, monitoring) rather than one combined check?
