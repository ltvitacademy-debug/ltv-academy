# Lesson 62 — Secrets Management

**Chapter 3 · Production Data Engineering · Lesson 62 of 70**

## What you'll learn

- The direct tension between Lesson 46's Git tracking and secrets
- Azure Key Vault as the place secrets actually belong
- Managed identities — avoiding the need for a secret at all
- Rotation, and why a secret's lifetime should never be "forever"

## The tension Lesson 46 didn't mention

Lesson 46 established that Fabric item definitions — Eventstream
configs, notebook source — get committed to Git as readable text,
which is genuinely good for review and diffing. It's also exactly
why a connection string, an API key, or a password must **never**
appear inside one of those files: anything committed to Git is
effectively permanent and widely readable, even if the file is later
"fixed" — the secret was already exposed in history the moment it
was committed.

## Where secrets actually belong

```
Wrong:  Eventstream source config includes the Event Hub's
        connection string directly, in plain text

Right:  Eventstream source config references a Key Vault secret
        by name; the actual connection string lives only in
        Azure Key Vault, fetched at runtime
```

**Azure Key Vault** stores secrets outside of any Fabric item
definition entirely. The Eventstream, notebook, or pipeline holds
only a *reference* to a named secret — something safe to commit,
review, and diff, exactly like everything else Lesson 46 covered —
while the actual sensitive value never touches Git at all.

## Managed identities — no secret to manage

```
With a secret:      Fabric authenticates to an Azure resource using
                     a stored password or key -- something to leak, rotate, protect
With a managed identity: Fabric authenticates as itself, using Azure AD --
                          nothing stored, nothing to leak, nothing to rotate
```

A **managed identity** is the stronger option where it's available:
Fabric's own identity, trusted directly by Azure AD, with no secret
value existing anywhere to steal in the first place. Key Vault is
the right tool when a genuine secret is unavoidable (a third-party
API key, for instance); a managed identity is the better tool
whenever the target resource is itself Azure-native and supports it.

## Rotation — a secret's lifetime is never "forever"

A secret that's never rotated is a secret that, if ever leaked
once, stays exploitable indefinitely. Rotating Key Vault secrets on
a schedule — and having every Fabric item reference the secret by
name rather than by value — means a rotation is a Key Vault change,
not a hunt through every notebook and Eventstream that might have a
stale copy of the old value.

## Key terms

| Term | Meaning |
|---|---|
| Azure Key Vault | Where secrets actually live, referenced by name, never committed |
| Managed identity | Authenticating as Fabric itself, with no secret to manage at all |
| Rotation | Regularly replacing a secret's value so a leak has limited lifespan |

## Check yourself

You're ready for Lesson 63 when you can explain, without looking: why
is committing a secret to Git dangerous even if the file is
immediately "fixed" afterward?
