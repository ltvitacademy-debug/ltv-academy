# Script — Why Contract CI/CD Is Different

## Segment 1 (title)

A web app's pipeline optimizes for shipping fast and rolling back fast. A deployed smart contract has none of that safety net — once bytecode is on-chain, there's no git revert for a contract that already holds user funds.

## Segment 2 (steps: what the pipeline must catch)

Because there's no fixing forward, the pipeline has to catch everything before the deploy transaction: correctness tests run on every PR automatically, static analysis scanning for known vulnerability patterns, gas regressions, and human review gates before a deploy script can even run.

## Segment 3 (why none of it is optional)

None of this is optional the way it can feel optional on a web app, where a missed edge case ships a bug patched tomorrow. Here, a missed edge case can be the exploit — permanently, immediately, with real funds at stake.

## Segment 4 (compile-time isn't deploy-time)

A contract that compiles cleanly and passes every local test can still behave differently once deployed — real gas price, real block conditions, the real initial state of contracts it immediately interacts with. That gap is why fork testing and deployment scripting are disciplines of their own.

## Segment 5 (outro)

One fact — immutability — reshapes the entire pipeline into a pre-deploy gate instead of a post-deploy safety net. Lesson 8 builds that gate for real, in GitHub Actions.
