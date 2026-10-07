# Why Secrets Leak

Workload identity closed one gap: a pod no longer needs a stored credential to reach another Azure or AWS resource. But Northbridge Retail still has real secrets that can't be replaced by a federated token — the payment processor's API key, a third-party shipping API credential, a database password for a system that doesn't support federation. This lesson opens Chapter 3 by looking at how those secrets actually end up leaking, before the rest of the chapter covers the tools that prevent it.

## What you'll learn

- What counts as a "secret" in a DevSecOps context, beyond just passwords
- The most common ways secrets leak, with real patterns seen across the industry
- Why "just don't commit it" isn't a sufficient policy on its own
- How Northbridge Retail got burned by one of these patterns, and what changed afterward

## What counts as a secret

A secret is any value that grants access and would cause harm if an unauthorized party obtained it: database connection strings, API keys, OAuth client secrets, TLS private keys, SSH keys, signing keys, and webhook secrets all qualify — not just "passwords" in the narrow sense. If a value's disclosure would let someone impersonate a service, read data they shouldn't, or move money, it's a secret, and it needs to be handled like one.

## The four most common leak patterns

- **Committed to source control** — a developer hardcodes a connection string "just to get it working locally" and forgets to remove it before committing. Once it's in git history, deleting the line in a later commit doesn't remove it — the secret is still recoverable from history unless the repository is rewritten and the credential is rotated.
- **Logged in plaintext** — an application logs its full configuration at startup for debugging, including the database password, and that log ships to a centralized logging system with broader read access than the secret itself ever had.
- **Baked into a container image** — a `Dockerfile` copies a `.env` file into the image, or an argument containing a credential gets stored in an image layer. Anyone who can pull the image — including from a registry with looser access controls than the secret deserves — can extract it.
- **Shared out of band** — a credential gets pasted into a Slack message, an email, or a shared document "just this once," and now it lives in a system with no rotation policy, no audit log tied to the secret's actual use, and an access list nobody is tracking.

## Why "just don't commit it" isn't enough

Telling developers "don't commit secrets" treats the problem as a discipline failure, but the actual causes are structural: local development needs *some* way to supply a database password, logging frameworks default to verbose output, base images get built once and reused without an audit of what's inside them, and incident response under time pressure favors "paste it in Slack so the team can see it" over "do this properly." A policy that depends on everyone remembering correctly, every time, under pressure, will eventually fail — which is exactly why Chapter 3's remaining lessons are about tools that make the *secure* path the *easy* path: a vault that's faster to call than hardcoding, and automated scanning (Chapter 4) that catches the ones that slip through anyway.

## What happened at Northbridge Retail

Early in its cloud migration, a Northbridge Retail engineer committed a `.env.local` file to a feature branch while debugging a payment integration issue — a real sandbox API key, intended to be temporary, in a file that was supposed to be gitignored but wasn't, on a new repository where the `.gitignore` hadn't been copied over yet. The key sat in that branch's history for three weeks before a routine secrets-detection scan (the subject of Chapter 4, Lesson 17) flagged it. The key turned out to be a sandbox credential with no production access, so the actual impact was limited — but it was the incident that got Northbridge Retail's platform team to adopt a vault-first policy for every environment, not just production, which is where this chapter goes next.

## Key terms

- **Secret** — any value whose disclosure would let someone impersonate a service, access protected data, or cause financial harm
- **Secret sprawl** — the tendency for secrets to accumulate in multiple, loosely-tracked locations (repos, logs, chat tools, images) over time
- **Secrets detection** — automated scanning that flags credential-shaped patterns before they merge or ship (covered in Chapter 4)

## Recap

Secrets leak through a small, repeatable set of patterns — committed to source control, logged in plaintext, baked into images, or shared out of band — and all four happen because the insecure path is often the fastest one under pressure. Next up: Azure Key Vault, the first tool this chapter covers for making the secure path the fast one.
