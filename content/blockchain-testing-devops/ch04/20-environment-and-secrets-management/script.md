# Script — Environment & Secrets Management

## Segment 1 (title)

Every service in the off-chain stack -- the frontend, the indexer, the deploy pipeline -- needs some combination of RPC URLs, API keys, and sometimes a private key. None of those values belong in the code that uses them.

## Segment 2 (code: .env.example)

A .env.example file documents which variables a service expects, with every value left blank. It's safe to commit because it's just names. The actual values -- the real RPC URL, the real key -- never go in git, even in a private repository.

## Segment 3 (steps: three tiers of secrets)

Not every secret is equally dangerous if it leaks. An RPC API key leaking means rate-limit abuse or a surprise bill. A deployer private key leaking means an attacker can deploy or upgrade contracts as you -- Chapter 3, Lesson 16's whole case for multisig deployments exists because of exactly this risk.

## Segment 4 (code: CI secrets)

Chapter 2, Lesson 8 showed GitHub Actions running tests in CI. The same pattern handles secrets: a value lives in the CI platform's own secret store, gets injected as an environment variable at run time, and is never checked into a commit or visible in a log.

## Segment 5 (steps: rotation and least privilege)

Assume a leak will eventually happen, and limit the damage two ways: rotate keys on a schedule, so a leaked key has a short useful life, and scope each key to the minimum it needs -- a deployer key that can deploy contracts shouldn't also be able to move treasury funds.

## Segment 6 (outro)

Those RPC URLs and API keys all point somewhere -- a specific infrastructure provider. Lesson 21 covers how to actually choose one for production, not just how to store its key safely.
