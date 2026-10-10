# Lesson 7 — Secrets Management

**Chapter 2 · Operating Securely · Lesson 7 of 13**

## What you'll learn

- Why "secrets management" is really a question of where a secret lives and who/what can read it, not just how strong the secret is
- Why Protected Custom Metadata only actually protects a secret inside a managed package, and what to use instead in a regular org
- Why Named Credentials remain the preferred home for most integration secrets, and when an external secrets manager is still worth adding
- The discipline of secret rotation, and why a secret that's never rotated is a standing, growing risk even if it's never been exposed

## "Where does the secret live" is the whole question

A secret — an API key, a client secret, a certificate's private key, a webhook signing key — is only as safe as the weakest place it's stored or passed through. Lesson 1's entire attack chain started with exactly one bad storage decision: a credential typed directly into Apex code. Secrets management is the discipline of making sure that decision is made deliberately every time a secret is introduced, rather than defaulting to "wherever was fastest to get the integration working today."

## Why Protected Custom Metadata is not a general-purpose secret store

A specific, easy-to-make mistake is assuming a Protected Custom Metadata Type keeps a secret hidden from everyone except the intended Apex code. That protection is real, but conditional: Salesforce's own Apex documentation is explicit that **protected custom metadata types only behave as protected inside a managed package**. Outside a package — in a regular, unpackaged org, which describes the overwhelming majority of Salesforce orgs — a "protected" custom metadata type behaves exactly like a public one, and public custom metadata records are readable by every profile in the org, including the guest user on a public site. A secret stored this way in an unpackaged org isn't hidden at all; it's effectively published. If your org isn't built and shipped as a managed package, a Protected Custom Metadata Type gives you no real protection over a plain custom setting or field.

## What to use instead

For the overwhelming majority of integration secrets in a typical org, Salesforce's own guidance points to the tool this course has already spent a full chapter on: **Named Credentials**, which manage the authentication for a callout so the secret material is never exposed to Apex code at all, regardless of packaging. For secrets that genuinely need to be readable by Apex logic (not just handed to the platform for a callout — for example, a signing key your own webhook-verification code needs to compute an HMAC), an encrypted custom field is the documented fallback, keeping the value encrypted at rest while still letting authorized Apex read it. The pattern to avoid, in both cases, is a secret sitting in plain custom metadata, a plain custom setting, or — worst of all — a string literal in a class, all of which are either outright readable or depend on a packaging requirement you likely don't meet.

## External secrets managers: when Salesforce-native storage isn't enough

Larger integration landscapes, especially ones spanning several platforms beyond Salesforce, sometimes centralize secrets in a dedicated external secrets manager (a vault product built for exactly this purpose) rather than scattering credential storage decisions across every platform individually. The trade-off is real: a dedicated secrets manager typically adds centralized rotation, consistent access auditing, and policy enforcement across every system that uses it, at the cost of an extra integration hop (Salesforce has to call out to the vault to retrieve what it needs) and another system to operate and secure. For a single Salesforce-centric integration landscape, Named Credentials plus disciplined permission-set scoping is usually sufficient; for an enterprise with dozens of systems sharing secrets across platforms, a centralized vault is a legitimate architectural answer worth evaluating on its own merits — this course doesn't name a specific vendor, since the right choice depends on what else the organization already runs.

## Rotation: a secret's risk grows even if nothing happens to it

A secret that's never rotated accumulates risk for reasons that have nothing to do with whether it's been misused yet: more people and systems touch it over time (a new team member needs it, a backup captures it, a log accidentally records it), and if it's ever been exposed without anyone noticing, an unrotated secret stays usable indefinitely. A credible secrets-management program sets a rotation cadence for every integration secret — calibrated to how sensitive the access behind it is, the same risk-based cadence logic this course's data-governance material uses for classification review — and treats "we'll rotate it if something goes wrong" as already having accepted an open-ended window of exposure before anyone would even know to rotate it.

## Key terms

| Term | Meaning |
|---|---|
| Secrets management | The discipline of deliberately controlling where credentials and keys are stored, who/what can read them, and how often they're rotated |
| Protected Custom Metadata Type | A custom metadata type marked protected; only genuinely hidden from other orgs when used inside a managed package, otherwise behaves as public |
| Encrypted custom field | A field type that keeps its value encrypted at rest while still letting authorized Apex read it -- the documented fallback when Apex itself needs to read a secret |
| Secrets manager (vault) | A dedicated external system for centralized secret storage, rotation, and auditing across multiple platforms |
| Secret rotation | Periodically replacing a secret's value on a defined cadence, independent of whether it's known to have been exposed |

## Lab

A developer on your team stored a third-party API key in a Protected Custom Metadata Type, believing it was safely hidden from end users, in an org that is not and will never be packaged as a managed package. Explain exactly why this doesn't protect the secret the way they think it does, and propose the correct storage location for this specific secret (assuming Apex needs to read it directly to build a request header, rather than Salesforce handling the whole callout). Then propose a rotation cadence for this secret and justify it.

## Check yourself

Can you explain the specific condition under which Protected Custom Metadata actually protects a secret, and what happens when that condition isn't met? Can you name the documented fallback for a secret that Apex code genuinely needs to read directly, and explain why rotation matters even for a secret that's never known to have been exposed?
