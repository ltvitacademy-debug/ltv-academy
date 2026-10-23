# Lesson 12 — Edge Encryption & Column-Level Encryption: Overview

**Chapter 4 · Data Protection & Encryption · Lesson 12 of 24**

## What you'll learn

- Why ACLs and roles (Chapters 1–2) aren't enough for the most sensitive fields on your instance
- What Edge Encryption actually does, and why *where* encryption happens is the whole point
- How column-level encryption at rest differs from Edge Encryption
- The real tradeoff: encrypted fields lose some platform functionality, so encrypt deliberately
- How this fits alongside the authentication controls from Chapter 3

## The gap ACLs and roles can't close

Everything in Chapters 1 through 3 — roles, ACLs, scripted conditions, SSO, MFA — controls *who*
can reach a piece of data and *how* they prove who they are. None of it changes one basic fact:
once a value is written into a ServiceNow field, ServiceNow itself can read it. For most data
that's fine. For a small set of genuinely sensitive fields — a national ID number, a health
record field, a payment-adjacent value a customer's compliance team won't accept in a vendor's
cloud in plaintext — some organizations need a stronger guarantee: that even the platform vendor
never sees the real value. That's the problem Edge Encryption solves, and it's a fundamentally
different kind of control than anything earlier in this course.

## Edge Encryption: encrypting before data ever leaves the customer's network

Edge Encryption works by placing an encryption proxy inside the *customer's own network* —
conceptually in the same spirit as the MID Server pattern from the Integrations course: a
component that runs on infrastructure the customer controls, not on ServiceNow's cloud
infrastructure. Traffic to and from the ServiceNow instance for selected fields routes through
that proxy. Sensitive values are encrypted on the customer's side of the network boundary, before
the request ever reaches ServiceNow's servers. The ciphertext is what gets stored and processed
in the cloud instance; the plaintext value and the encryption keys never leave the customer's
environment.

```
Without Edge Encryption:              With Edge Encryption:
Browser → ServiceNow cloud            Browser → customer's edge proxy
  (plaintext field value                 (field value encrypted HERE)
   reaches ServiceNow's servers)       → ServiceNow cloud
                                          (only ciphertext ever arrives)
```

The practical consequence: ServiceNow's own platform, support staff, and infrastructure never
have access to the plaintext of an Edge-Encrypted field — only the customer's own environment
does. That's a materially stronger guarantee than "ServiceNow promises not to look at this field,"
because the capability to look is never even present on the vendor's side.

## Column-level encryption: a simpler, narrower control

Column-level encryption is a related but distinct idea, and it's worth not confusing the two.
Column-level encryption encrypts specific fields *at rest* in the database — protecting the value
if someone gained unauthorized access to the underlying storage, a backup, or a database-level
export. It doesn't require a customer-side proxy and doesn't guarantee the platform vendor never
sees plaintext during normal processing, because the application layer still needs to decrypt the
value to render it on a form or evaluate it in a business rule. Column-level encryption is the
right fit when the threat you're defending against is storage-level exposure; Edge Encryption is
the right fit when the threat is the vendor's own cloud infrastructure, or a requirement that no
third party — including the platform provider — ever hold the plaintext.

## The real tradeoff: what you give up when you encrypt a field

Encryption is not a setting to flip on every field "just in case." An encrypted field's value, by
design, isn't readable by the platform in its original form — which means platform features that
depend on reading or indexing that plaintext stop working correctly on that field. Full-text
search won't find matches inside an encrypted field. Reports and dashboards that aggregate or
filter on the real value can't do so meaningfully against ciphertext. Certain list views, imports,
and integrations that expect to read or match against the actual value will behave differently
once that field is encrypted. This is the honest, often-overlooked cost: every field you encrypt
is a field that trades platform functionality for confidentiality. The right approach is targeted
— identify the genuinely sensitive fields that truly need this level of protection, encrypt those
deliberately, and leave the rest of the instance's fields working normally. Blanket-encrypting
fields "to be safe" quietly breaks search, reporting, and automation across the instance for very
little real security benefit on fields that weren't sensitive to begin with.

## Key terms

| Term | Meaning |
|---|---|
| Edge Encryption | Encrypts sensitive field values inside the customer's own network, before they ever reach ServiceNow's cloud, using a customer-side proxy |
| Column-level encryption | Encrypts specific fields at rest in the database, protecting against storage-level exposure |
| Plaintext | The real, unencrypted value of a field |
| Ciphertext | The encrypted form of a value; what's stored or transmitted once a field is protected |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why does Edge Encryption give a
stronger guarantee than column-level encryption about who can ever see a field's plaintext value
— and what specific platform features should you expect to stop working correctly on a field once
you encrypt it?
