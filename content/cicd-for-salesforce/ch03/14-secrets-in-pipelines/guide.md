# Lesson 14 — Secrets in Pipelines

**Chapter 3 · Operating Pipelines · Lesson 14 of 19**

## What you'll learn

- The three levels at which GitHub stores secrets, and when to use each
- Why automatic log masking isn't a substitute for careful handling
- The least-privilege argument for the dedicated integration user from Lesson 9, generalized
- A rotation discipline for the JWT key pair, so a leaked secret has a short useful life

## Three levels of secrets in GitHub

GitHub Actions secrets can be scoped at three levels:

- **Repository secrets** — available only to workflows in one specific repository. The right default for a single-project pipeline like the one this course builds.
- **Environment secrets** — scoped to a named environment (Lesson 5's approval-gated `production` environment, for instance), and only available to jobs that target that environment. This is how you'd keep a production JWT key pair separate from a lower-sandbox one, even within the same repository.
- **Organization secrets** — shared across every repository in a GitHub organization, with the ability to restrict which repositories can actually use them. Useful when multiple repositories deploy to the same Dev Hub or share a Code Analyzer license key, but a secret available everywhere is also a secret with a wider blast radius if anything goes wrong — scope access to only the repositories that actually need it.

All three are created the same way: repository (or organization) **Settings → Secrets and variables → Actions**, never committed as plaintext in a file in the repo itself. A secret's value is write-only after creation — nobody, including repository admins, can view it again through the UI, only replace it.

## Masking helps, but it isn't a guarantee

GitHub Actions automatically scans step output for any string that exactly matches a configured secret's value and replaces it with `***` in the log. That's a real, useful safety net — but it only catches the *exact* value. If a workflow transforms a secret before printing it (base64-encodes it, writes it into a different format, splits it across multiple lines) the masking can miss the transformed version. This is the practical argument for the discipline in Lesson 9's authentication step: write the secret to a short-lived file only for the single step that needs it, delete that file immediately afterward (`rm -f server.key`), and never deliberately echo a secret's value as a debugging step, even once, even temporarily.

## Least privilege, generalized

Lesson 9 introduced a dedicated integration user specifically so pipeline access wouldn't ride on a real person's credentials. The same principle applies to everything else a pipeline touches: the integration user should hold only the permissions its pipeline actually needs (deploy access, not necessarily full System Administrator), a Dev Hub connection used for scratch orgs (Lesson 17) should be scoped to the Dev Hub account the pipeline actually needs and nothing else, and an environment secret should be visible only to the jobs that target that specific environment — a lower-sandbox job has no legitimate reason to be able to read the production JWT key.

## Rotating the JWT key pair

Because the JWT flow (Lesson 9) separates the private key from the Connected App's certificate, rotation doesn't require touching the integration user's credentials at all: generate a new key pair, upload the new certificate to the Connected App, update the `SF_PRIVATE_KEY` secret with the new private key, and only then deactivate the old certificate once the new one is confirmed working. Doing this on a schedule — not only after a suspected leak — keeps any secret that does leak from having an indefinitely long useful life to whoever obtained it.

## Key terms

| Term | Meaning |
|---|---|
| Repository secret | A secret scoped to workflows in one specific repository |
| Environment secret | A secret scoped to a named environment, available only to jobs targeting it |
| Organization secret | A secret shared across repositories in a GitHub organization, with access restrictable per-repo |
| Secret masking | GitHub's automatic replacement of an exact secret value with `***` in logs |
| Least privilege | Granting an account or secret only the access it actually needs, nothing more |

## Lab

For a pipeline with a `staging` and a `production` GitHub Actions environment, each with its own JWT key pair, decide: would you store each org's four JWT secrets as repository secrets or environment secrets, and why? Then write the rotation sequence, in order, for replacing the production Connected App's certificate without ever leaving the pipeline unable to authenticate at any point in the process.

## Check yourself

Can you explain why secret masking alone isn't sufficient protection, and name one concrete way a secret's value could leak into a log despite masking being enabled? Can you explain why JWT's key-pair design makes rotation safer than it would be with a single bare session credential?
