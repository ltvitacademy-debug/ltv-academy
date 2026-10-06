# Lesson 20 — Environment & Secrets Management

**Chapter 4 · Hosting the Off-Chain Stack · Lesson 20 of 29**

## What you'll learn

- Why `.env.example` is safe to commit and real `.env` values never are
- Why a leaked RPC key and a leaked deployer private key are not the same severity of problem
- How CI secret stores extend the pattern Chapter 2 already introduced for running tests
- Two habits -- rotation and least privilege -- that limit the damage of an eventual leak

## None of it belongs in the code

Lessons 18 and 19 hosted a frontend and containerized an indexer. Both need configuration: an RPC URL to talk to the chain, a database connection string, sometimes a private key for an automated deployer or keeper. None of those values should ever be hardcoded into source files or baked into a container image. They belong in environment variables, injected at runtime from somewhere the code itself never has to store them permanently.

## .env.example is documentation, not a secret

```
RPC_URL=
INDEXER_DB_URL=
ALCHEMY_API_KEY=
DEPLOYER_PRIVATE_KEY=
SENTRY_DSN=
```

A `.env.example` file like this is safe to commit -- it's just a list of names, documenting what a service expects without any real values attached. A teammate clones the repo, copies it to `.env`, and fills in their own values locally. The real `.env` file itself belongs in `.gitignore` and never gets committed, not even to a private repository. "Private" isn't the same guarantee as "never leaves this machine."

## Not every secret is equally dangerous

If a secret leaks, the damage depends entirely on what it can do:

- **RPC or API keys** (Alchemy, Infura, etc.) -- a leak typically means rate-limit abuse or an unexpected bill. Annoying, not catastrophic.
- **A deployer private key** -- a leak means an attacker can deploy new contracts, or call upgrade functions, as you. Chapter 3, Lesson 16 made the case for multisig-controlled deployments precisely because a single leaked key is too much power concentrated in one place.
- **Third-party service tokens** (Slack, Sentry, PagerDuty) -- a leak means impersonation or noise in a monitoring channel, not direct loss of funds, but still worth containing.

Treating all three the same -- storing them identically and reacting identically to a leak -- wastes effort where it doesn't matter and under-reacts where it does.

## CI secrets, not CI commits

```
# GitHub Actions
jobs:
  deploy:
    environment: production
    steps:
      - run: forge script Deploy --broadcast
        env:
          DEPLOYER_PRIVATE_KEY: ${{ secrets.DEPLOYER_PRIVATE_KEY }}
```

Chapter 2, Lesson 8 introduced GitHub Actions running a test suite automatically. The exact same platform has a secret store built for this: a value is set once in the repository or environment's settings, referenced by name in the workflow, and injected as an environment variable only at run time. It never appears in the workflow file itself, never shows up in a diff, and GitHub automatically masks it if it ever accidentally prints to a log.

## Assume a leak happens -- limit the blast radius

Two habits matter more than any single storage choice:

- **Rotate on a schedule.** A key rotated every 90 days has a short useful life if it does leak -- an attacker working from an old copy of a repo, or an old CI log, finds a key that no longer works.
- **Scope to least privilege.** A deployer key that can deploy and upgrade contracts shouldn't also hold authority to move treasury funds. Narrow what each key can actually do to exactly what its job requires.

## Key terms

| Term | Meaning |
|---|---|
| .env.example | A committed file listing expected environment variable names with no real values -- documentation, not a secret |
| CI secret store | A CI platform's built-in, encrypted storage for values injected into workflows at run time, never committed to code |
| Least privilege | Scoping a credential to the minimum access it actually needs, limiting the damage if it leaks |

## Check yourself

You're ready for Lesson 21 when you can explain: why is a leaked RPC API key a different severity of problem than a leaked deployer private key, and what two habits does this lesson recommend to limit the damage of an eventual leak?
