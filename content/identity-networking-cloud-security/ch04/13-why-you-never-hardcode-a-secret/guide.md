# Lesson 13 — Why You Never Hardcode a Secret

**Chapter 4 · Secrets Management in the Cloud · Lesson 13 of 32**

## What you'll learn

- Why typing a database password or API key directly into application code or a config file is one of the most common — and most damaging — mistakes in cloud computing
- How a secret committed to source control stays recoverable forever, even after you "delete" it in a later commit
- Where else a hardcoded secret leaks beyond the repo itself — CI/CD logs and container images
- Why public secret scanners mean a leaked cloud credential gets found by someone else, often within minutes

## The mistake: a secret baked into the code

A **hardcoded secret** is any credential — a database password, an API
key, a storage account connection string — written directly into
source code or a plain-text config file instead of being retrieved
from a dedicated secret store at runtime. It's an easy mistake to
make: you're debugging a connection issue, you paste the real
connection string straight into `appsettings.json` or a Python script
to get something working, and you mean to replace it with a proper
reference "later." Later often doesn't come before that file gets
committed.

```
# Hardcoded — the credential is now part of the file, in plain text
connection_string = "Server=prod-sql.database.windows.net;Database=Orders;User Id=svc_app;Password=Pr0dP@ss2024!;"
```

Once that line exists in a file tracked by Git, the secret isn't
just "in the code" — it's in every place that code travels.

## Git history keeps it forever

The specific danger with source control is permanence. If you commit
a secret and then, in a later commit, delete the line or even delete
the whole file, the secret is **still sitting in the repository's
history**. Anyone with read access to the repo — or to its history on
a forked or cloned copy — can run `git log` and `git show` against
old commits and pull the plain-text value straight out, no special
tools required. "Removing" the secret in a new commit doesn't undo
the exposure; it only hides it from someone who isn't looking at
history. The only real fix is rotating the credential (Lesson 16)
and rewriting history to purge it, which is disruptive and easy to
get wrong.

## It leaks beyond the repo too

Source control isn't the only place a hardcoded secret escapes to.
If that code runs in a CI/CD pipeline, the secret can show up in
**build logs** — a step that echoes an environment variable for
debugging, or a stack trace that happens to print a connection
string, puts it in a log file that's often retained and far more
widely readable than the repo itself. If the code gets packaged into
a **container image**, the secret is baked into one of the image's
layers and ships with every copy of that image pulled from the
registry — including copies nobody remembers exist.

## Someone else is actively looking

Public source-control platforms are scanned continuously by
automated tools — some run by the platform itself, some by
independent researchers and attackers — that search public (and
sometimes leaked private) repositories for patterns that look like
cloud credentials: AWS access key prefixes, Azure connection string
formats, API key shapes. This isn't a hypothetical risk. A secret
pushed to a public repo is routinely found, flagged, and in the
worst cases used within minutes of the push, long before a human
reviewer would ever have noticed the diff.

## Key terms

| Term | Meaning |
|---|---|
| Hardcoded secret | A credential written directly into source code or a plain-text config file instead of retrieved at runtime from a secret store |
| Git history | The full record of every past commit in a repository; a value removed in a new commit still exists in earlier commits |
| CI/CD pipeline logs | Build and deployment output that can accidentally capture and retain secrets printed during a run |
| Secret scanner | An automated tool that searches repositories (public or private) for credential-shaped strings |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
doesn't deleting a hardcoded secret in a new commit actually remove
the exposure, and what three places (beyond the current file) can a
hardcoded secret end up living?
