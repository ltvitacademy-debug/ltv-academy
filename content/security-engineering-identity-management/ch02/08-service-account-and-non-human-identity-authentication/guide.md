# Lesson 8 — Service Account and Non-Human Identity Authentication

**Chapter 2 · Authentication Architecture · Lesson 8 of 32**

## What you'll learn

- Why non-human identities — service accounts, API keys, managed identities, workload identities — can't use the authentication methods built for a person
- How these identity types differ from each other, and from the managed identity concepts already introduced earlier in this course
- The real risk of long-lived service account credentials sitting in config files, scripts, or secret stores for years
- Why short-lived, automatically rotated credentials are the modern answer, and what that looks like in practice

## Why non-human identities can't use human authentication

Everything this chapter has covered so far — passwords, MFA prompts, FIDO2 taps — assumes a person is sitting at a keyboard or holding a phone. A **service account**, a scheduled script, or a backend application has no human behind it in the moment it authenticates: no one to type a password interactively, no thumb to tap Face ID, no phone to receive a push. Non-human identities need an authentication model built around that reality — one based on possession of a cryptographic secret or a trust relationship with a platform, not on a human proving who they are in real time.

## The identity types

A **service account** is a non-human login — the oldest and crudest form, often just a username and a password or key that an application uses to act. An **API key** is a static secret string sent with each request, simple to use but simple to leak, since it's often the same value for the life of the integration. A **managed identity** (the cloud-platform concept introduced earlier in this course) is issued and rotated automatically by the cloud provider itself, so there's no secret value for a developer to store or copy at all — the platform vouches for the application directly. A **workload identity** generalizes that idea further: a short-lived token issued to a workload (a container, a CI job, a function) based on a trust relationship with another system, rather than a long-term credential handed out once and reused forever.

## The real risk of long-lived credentials

A static API key or service account password that's valid for months or years is a standing liability from the moment it's created. It ends up copied into a config file, committed to a repository by accident, pasted into a chat message, or left in an old script nobody remembers is still running — and once it leaks, it typically stays valid and exploitable until someone notices and manually revokes it, which can be a long time after the actual leak. The credential's blast radius is exactly as large as however long it sits unnoticed.

## Why short-lived, rotated credentials are the modern answer

The fix is to minimize how long any single credential is useful if it leaks. A managed or workload identity issues a token valid for a short window — often an hour or less — and automatically issues a fresh one before the old one expires, with no human or script ever handling the raw secret. If a short-lived token does leak, the exposure window closes on its own, often before anyone even notices the leak happened, which is a fundamentally different risk profile from a static key that works indefinitely until someone finds and kills it.

## Example: a CI pipeline authenticating to cloud storage

A CI/CD pipeline needs to upload build artifacts to cloud storage. The old approach: a static access key pasted into the pipeline's configuration, valid indefinitely, and a real risk if that configuration is ever exposed. The modern approach: the pipeline runs with a workload identity federated from the CI platform, requests a token scoped to just that storage task, and the token expires within the hour — no long-lived secret exists anywhere for an attacker to find.

## Key terms

| Term | Meaning |
|---|---|
| Service account | A non-human login used by an application or script instead of a person |
| API key | A static secret string sent with requests to authenticate a non-human caller |
| Managed identity | A cloud-platform-issued identity for an application, with no secret value to store or rotate manually |
| Workload identity | A short-lived, federated token issued to a workload based on a trust relationship, not a long-term credential |

## Check yourself

Why does a leaked short-lived workload identity token represent a fundamentally smaller risk than a leaked long-lived API key, even if both get exposed the same way?
