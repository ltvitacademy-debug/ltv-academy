# Lesson 4 — Fork Testing Against Mainnet State

**Chapter 1 · Testing Smart Contracts Rigorously · Lesson 4 of 29**

## What you'll learn

- Why a contract that only runs against a fresh, empty test deployment hasn't actually been tested against reality
- The real `forge test --fork-url` / `--fork-block-number` syntax
- How `vm.createFork` and `vm.selectFork` test interactions across two different forked chains in one test
- Why fork caching makes repeated fork test runs fast instead of hammering an RPC endpoint every time

## Reality has state your test suite doesn't

Every test so far deployed a brand-new contract into an empty EVM. That's fine for unit logic, but your real contract is going to call into Uniswap pools with billions in liquidity, read Chainlink price feeds with real staleness windows, and interact with tokens that have real, sometimes-weird transfer behavior (fee-on-transfer, rebasing). None of that exists in a fresh deployment. **Fork testing** solves this by running your tests against a local EVM that's an exact copy of real chain state at a given block:

```bash
forge test --fork-url https://ethereum.reth.rs/rpc --fork-block-number 18000000
```

Pinning `--fork-block-number` makes the test reproducible — the exact same real-world state every time you run it, instead of "whatever mainnet looks like right now," which would make a failing test impossible to debug reliably later.

## Testing across two forks at once

Cross-chain contracts (Chapter 3's multi-chain deployments) need to test interactions between different chains in a single test function. `vm.createFork` and `vm.selectFork` let a test hold multiple forks and switch between them:

```solidity
uint256 mainnetFork = vm.createFork("https://ethereum.reth.rs/rpc");
uint256 optimismFork = vm.createFork("https://mainnet.optimism.io");

vm.selectFork(mainnetFork);
uint256 mainnetBalance = IERC20(mainnetUsdc).balanceOf(whale);

vm.selectFork(optimismFork);
uint256 optimismBalance = IERC20(optimismUsdc).balanceOf(whale);
```

Each `vm.selectFork` call switches which chain state subsequent calls in the test actually see — this is how you'd test a bridge contract's behavior on both sides of a transfer in one test function.

## Why forks don't re-fetch every run

If both `--fork-url` and `--fork-block-number` are specified, Forge caches the fetched state for that block locally at `~/.foundry/cache/rpc/<chain>/<block>/`, so the second and subsequent runs read from disk instead of re-querying your RPC provider. If an RPC provider starts rate-limiting fork requests, `--fork-retry-backoff` adds exponential backoff instead of the test suite just failing outright.

## Key terms

| Term | Meaning |
|---|---|
| Fork test | A test run against a local copy of real chain state at a given block |
| `--fork-block-number` | Pins the fork to a specific block for reproducibility |
| `vm.createFork` / `vm.selectFork` | Cheatcodes for holding and switching between multiple forks in one test |
| Fork cache | Local cache of fetched RPC state, keyed by chain and block number |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why does pinning a fork to a specific block number matter for reproducibility?
