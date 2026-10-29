# Lesson 19 — Workload Identity for CI/CD and Automation, Not Just Humans

**Chapter 5 · Zero Trust for Data and Applications · Lesson 3 of 4**

## What you'll learn

- Why a CI/CD pipeline holding a long-lived cloud credential in a
  secrets store is one of the highest-value targets in a modern
  enterprise
- What a managed identity actually is, and why it removes the need to
  handle any credential at all for a resource running inside the cloud
- How OIDC federation lets a pipeline authenticate using a token its
  CI/CD platform already issues, instead of a stored secret
- Why "workload identity" is the same zero-trust principle as human
  identity from Chapter 2, applied to the things that aren't people

## Pipelines are identities too

Chapters 1–4 and the first two lessons of this chapter have been
about verifying people, devices, and services. A CI/CD pipeline is
none of those — it's an automated workload that runs on a schedule or
on a commit, with no human sitting at a keyboard during the run — but
it still needs to authenticate to deploy infrastructure, push a
container image, or write a secret. For years the default answer was
to generate a cloud credential — an access key, a service principal
secret — and drop it into the pipeline platform's secrets store as an
environment variable. That credential then sits there, often for the
life of the pipeline, often with far broader permissions than any
single pipeline run actually needs, and often copyable by anyone with
admin access to the CI/CD platform itself. A leaked pipeline secret is
arguably worse than a leaked human password, because it typically has
standing permission to modify production infrastructure directly,
with no MFA prompt in the way.

Workload identity is the recognition that the automation calling an
API needs exactly the same "never trust, always verify" treatment this
course has given to people — just built around credentials that were
never designed for a human to type in the first place.

## Managed identity: no credential to steal because there isn't one

Course 10 covered pipeline security and automation; the cloud-native
answer it pointed toward is the **managed identity** — an identity
assigned directly to a cloud resource (a virtual machine, a container,
a function) by the cloud platform itself, with no credential a human
or a script ever sees, stores, or rotates. The cloud platform handles
issuing and rotating the underlying token automatically, behind the
scenes. Code running on that resource simply asks the platform's
metadata endpoint for a token when it needs one, and the platform
hands back a short-lived token scoped to whatever role has been
assigned to that identity. There's no secret in a config file, no key
in an environment variable, and nothing for an attacker to find by
reading the pipeline's configuration — because the credential, in the
form a human could copy and misuse, doesn't exist.

## OIDC federation: trusting a token the CI/CD platform already issues

Managed identity works cleanly for a resource running inside the
cloud. A CI/CD pipeline, though, often runs on infrastructure the
CI/CD vendor controls, not yours — so there's no cloud resource to
attach a managed identity to. OIDC federation solves that case: the
CI/CD platform already issues its own short-lived OIDC token to every
pipeline run, asserting facts like "this run is from branch main of
repository X." The cloud platform is configured to trust that specific
issuer and to exchange a token matching specific conditions for its
own short-lived access token — no stored secret changes hands at any
point. The pipeline authenticates with a token that already existed
for a few seconds, gets back a cloud credential that only lives a few
minutes longer, and neither one is sitting in a secrets store waiting
to be stolen six months from now.

## The underlying shift: federated trust instead of shared secrets

Both mechanisms replace a *shared secret* — something both sides
possess and that leaks if either side is compromised — with a
*federated trust relationship*: the cloud platform trusts assertions
from a specific issuer (its own metadata service, or the CI/CD
platform's OIDC issuer) and verifies those assertions cryptographically
on every single authentication, rather than trusting a static value
indefinitely. It's the same continuous-verification philosophy from
Chapter 2's identity work and the previous lesson's short-lived API
tokens, now applied to the workloads that deploy and run everything
else.

## Key terms

| Term | Meaning |
|---|---|
| Workload identity | Applying zero-trust identity verification to automated, non-human actors (pipelines, services, scripts) rather than only to people |
| Managed identity | An identity assigned directly to a cloud resource by the platform itself, with the underlying credential issued and rotated automatically — no secret a human ever handles |
| OIDC federation | A trust relationship where a cloud platform exchanges a short-lived token from a trusted external issuer (like a CI/CD platform) for its own access token, with no stored secret involved |
| Long-lived pipeline secret | A static cloud credential stored in a CI/CD platform's secrets store — a high-value target because it's often broadly scoped and rarely rotated |
| Federated trust | Trust based on verifying cryptographic assertions from a known issuer on every request, replacing a shared secret both sides must keep safe |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: what
problem does a managed identity solve that a stored cloud credential
in a secrets store does not, and how does OIDC federation extend that
same benefit to a pipeline that doesn't run on a resource you control?
