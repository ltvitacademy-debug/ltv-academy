# Lesson 7 — Why Contract CI/CD Is Different

**Chapter 2 · CI/CD for Smart Contracts · Lesson 7 of 29**

## What you'll learn

- The one fact that makes smart contract CI/CD fundamentally different from web app CI/CD: deployed code is (usually) immutable
- Why "ship fast, fix forward" doesn't work once a contract is live
- What a contract pipeline has to check that a web app pipeline never needs to
- Why Chapter 1's entire test suite exists to run automatically, not manually before a deploy

## You can't hotfix a deployed contract

A web app's CI/CD pipeline optimizes for shipping fast and rolling back fast — if a bug reaches production, you deploy a fix in minutes, or revert to the last known-good build. A deployed smart contract (without a proxy — Lesson 15 covers when that changes) has none of that safety net. Once `CREATE` or `CREATE2` puts bytecode on-chain, it is permanent. There is no `git revert` for a contract that already has user funds in it. That one fact reshapes what "the pipeline" even has to do.

## What the pipeline has to catch before, not after

Because there's no fixing forward, a contract CI/CD pipeline has to catch everything **before** the deploy transaction, not after:

- **Correctness** — Chapter 1's fuzz, invariant, and fork tests, run automatically on every PR, not "when someone remembers to"
- **Static analysis** — Slither and Mythril (Lesson 10) scanning for known vulnerability patterns the test suite might not think to probe
- **Gas regressions** — Lesson 5's gas snapshot check, since a contract's gas cost is itself a cost users pay forever once live
- **Human review gates** — requiring the test suite *and* a security scan *and* a second reviewer to pass before a deploy script can even run (Lesson 11)

None of this is optional the way it can feel optional on a web app, where a missed edge case ships a bug that gets patched tomorrow. Here, a missed edge case can be the exploit.

## Compile-time guarantees still aren't deploy-time guarantees

A contract that compiles cleanly and passes every local test can still behave differently once deployed, because deployment introduces variables local testing doesn't have: the actual gas price and block conditions at deploy time, the actual constructor arguments passed on the real network, and the actual initial state of any external contracts it immediately interacts with. That gap is exactly why Chapter 1 built fork testing (Lesson 4) and why Chapter 3 treats testnets (Lesson 12) and deployment scripts (Lesson 13) as disciplines of their own, not an afterthought once development is "done."

## Key terms

| Term | Meaning |
|---|---|
| Immutability | Deployed bytecode can't be patched in place without a proxy pattern |
| Pre-deploy gate | A check (tests, static analysis, review) that must pass before a deploy script runs |
| Ship fast, fix forward | The web-app assumption that doesn't hold once a contract is live |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why does contract immutability mean the entire CI pipeline has to be a gate *before* deployment, rather than a safety net after it?
