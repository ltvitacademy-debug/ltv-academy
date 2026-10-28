# Lesson 27 — Secrets in Pipelines: Not Hardcoded, Not in Logs

**Chapter 7 · CI/CD for Infrastructure Scripts · Lesson 27 of 32**

## What you'll learn

- Why a pipeline that provisions cloud resources still needs a credential to authenticate — and why
  that credential can never be written into the pipeline file itself
- How GitHub Actions secrets and Azure DevOps variable groups store a credential and inject it as an
  environment variable at runtime instead
- How Azure DevOps can link a variable group straight to Azure Key Vault, so the secret isn't even
  duplicated into the pipeline platform
- How a secret can still leak into a build log — and the one habit that prevents it

## The same rule applies inside a pipeline

Lesson 13 of this path established that a secret never belongs hardcoded into source code. That
rule doesn't relax just because the code in question is a pipeline definition instead of a script.
A pipeline that logs into Azure or AWS to run a provisioning script needs a real credential to do
it — but that credential still can't be sitting in plain text in a YAML file that's tracked by Git:

```
# BAD — plaintext secret committed straight into the repo
env:
  AZURE_CLIENT_SECRET: "a8f3-REAL-SECRET-9f21"
```

Anyone who can read that file — now or in its Git history later — can read the secret.

## Where the secret actually lives instead

Both major pipeline platforms give you a dedicated, separate store for this:

- **GitHub Actions secrets.** Stored under a repository's Settings → Secrets and variables →
  Actions, never visible again once saved. A workflow references one by name, and GitHub injects
  the real value as an environment variable only while that job is running.
- **Azure DevOps variable groups.** Stored in Pipelines → Library, with each sensitive value marked
  **secret** (shown with a lock icon, and never displayed again in the UI after saving). A pipeline
  references the variable group by name.
- **Key Vault–linked variable groups.** Azure DevOps can link a variable group directly to an Azure
  **Key Vault**, so the pipeline platform doesn't even store a copy of the secret itself — it pulls
  the current value live from Key Vault each run.

Referenced correctly, the same workflow looks like this instead:

```
# GOOD — pulled from the pipeline's own secret store at runtime
env:
  AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
```

Nothing sensitive is written into the file at all — `${{ secrets.AZURE_CLIENT_SECRET }}` is
resolved to the real value only at run time, by the platform, and the YAML itself stays safe to
commit, read, and review.

## The log leak risk

Storing a secret correctly only solves half the problem — it can still leak into a **build log**
if a step prints it. GitHub Actions automatically masks any registered secret value it recognizes
in log output, but that protection isn't foolproof: if a step transforms the value first (encoding
it, concatenating it into a longer string) the platform may not recognize it as the secret anymore,
and the masking doesn't catch it.

```
# Leaks the secret straight into the build log
- run: echo "Connecting with $AZURE_CLIENT_SECRET"
```

The rule that actually holds up: never print, echo, or log a secret value for any reason, including
debugging. If a step needs to confirm a secret is set, check that it's non-empty — never print what
it contains.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline secret store | A dedicated, access-controlled place a CI/CD platform keeps credentials, separate from the pipeline's own code |
| Variable group | Azure DevOps' named collection of pipeline variables, including ones marked secret |
| Key Vault–linked variable group | A variable group that pulls its secret values live from Azure Key Vault instead of storing a copy |
| Secret masking | A pipeline platform's automatic replacement of a known secret value with asterisks in log output |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: where does a real credential live
instead of inside a pipeline YAML file, and why can a secret still leak into a build log even when
it's stored correctly?
