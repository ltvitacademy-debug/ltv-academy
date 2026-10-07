# Capstone: Build It

Lesson 29 set the requirements: six controls, one pipeline, order-service. This lesson walks through building it — stage by stage, in the order the pipeline actually runs, with a concrete decision to make at each step.

## What you'll learn

- The correct stage order for all six controls, and why that order matters
- A realistic pipeline-stage structure you can adapt directly for your own capstone
- How to write a policy gate rule precise enough to actually implement
- How to define the least-privilege identity for order-service's deploy step

## Stage order, and why it matters

The six controls don't run in an arbitrary order — each one should run as early as it can, catching its category of problem before a slower or more expensive stage runs on a build that was already going to fail:

1. **Secrets scan** — runs first, on every commit, because a leaked credential is the cheapest possible catch and the most urgent to block immediately.
2. **SAST** — runs next against the source, since it doesn't need a built artifact yet.
3. **Dependency scan** — runs once dependencies are resolved, checking every third-party package pulled in.
4. **Build** — only now does order-service actually compile and its container image get built, after the cheaper source-level checks already passed.
5. **Image scan** — scans the freshly built container for vulnerable packages baked into the image layers.
6. **Policy gate** — the single checkpoint evaluating all prior results together before anything is allowed to deploy.
7. **Deploy with least-privilege identity** — the gated build deploys using an identity scoped to exactly what order-service needs.

## A pipeline stage list

```yaml
stages:
  - secrets-scan     # block on any detected credential
  - sast              # block on critical/high finding
  - dependency-scan   # block on critical CVE, no fix available excluded
  - build             # compile + build container image
  - image-scan        # block on critical CVE in image layers
  - policy-gate        # evaluate all prior stage results together
  - deploy             # least-privilege workload identity only
```

This is intentionally simplified pseudocode, not a specific vendor's exact syntax — the point for your capstone is the stage order and the gate logic, which transfers to any real CI/CD tool you choose to implement it in.

## Writing a policy gate rule precisely

A vague gate ("fail if anything looks bad") isn't implementable. A precise one is: *block the deploy stage if the secrets scan finds any match, OR if SAST or the dependency scan reports a finding with CVSS 9.0 or higher, OR if the image scan reports a critical finding with no available fix excluded.* Notice this mirrors the vulnerability management prioritization from Lesson 27 — severity alone triggers the block, but a known-unfixable low-exploitability finding can be explicitly excluded rather than blocking shipping forever.

## Defining the least-privilege deploy identity

order-service needs exactly three things to run: read access to its own Key Vault secrets (its database connection string and payment SDK key), write access to its own application logs, and permission to be deployed to its own container environment — nothing else. A least-privilege identity definition names each permission explicitly:

```yaml
identity: order-service-deploy
permissions:
  - keyvault.read: ["order-service-db-conn", "order-service-sdk-key"]
  - logs.write: ["order-service-app-logs"]
  - deploy: ["order-service-container-env"]
```

Compare this to the broad, never-revisited identity from Lesson 29's starting scenario — that identity likely held far more than three permissions, accumulated over time with nobody ever removing what was no longer needed. Writing the permission list explicitly, as above, is itself the fix: anything not named isn't granted.

## Key terms

- **Stage order** — the sequence controls run in, designed so cheaper checks catch problems before slower, more expensive stages run
- **Policy gate rule** — a precise, implementable condition (not a vague "fail if bad") for blocking deployment
- **Least-privilege identity definition** — an explicit list of exactly the permissions a service needs, with nothing implied or left over
