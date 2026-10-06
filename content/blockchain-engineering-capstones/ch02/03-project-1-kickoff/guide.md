# Lesson 3 — Project 1 Kickoff

**Chapter 2 · Project 1 — A Full DeFi Protocol · Lesson 3 of 22**

## What you'll learn

- The exact scope of the pool you're building in this project — and what's
  deliberately left out
- The tech stack you'll use across contracts, tests, and frontend
- The full deliverables checklist for Lessons 4 through 7
- How to lay out the project repository before writing any contract code

## What you're building

Across this chapter you'll build **a simplified, teaching-grade automated
market maker (AMM) liquidity pool** — the same core mechanism behind
real-world protocols like Uniswap V2, scoped down to what one person can
design, test, and ship end to end:

- One pool contract holding reserves of two ERC-20 tokens
- Liquidity providers who deposit both tokens and receive a proportional
  claim on the pool
- A constant-product swap function (`x * y = k`, with a small fee) that
  lets anyone trade one token for the other
- A frontend that reads live pool state and lets a connected wallet add
  liquidity, swap, and remove liquidity

**What's explicitly out of scope** — and you should say so plainly in your
README, because naming your own simplifications is itself a skill
interviewers value: a factory contract for deploying many pools, a
router for multi-hop swaps, a separate fee-switch/protocol-fee
mechanism, flash-loan support, and any third-party audit. This is a
single pool, built to be understood completely, not a production
deployment.

## The stack

- **Contracts**: Solidity ^0.8.24, developed and tested with Hardhat 3
  (the same toolchain you'll use for deployment in Lesson 7).
- **Testing**: Hardhat's built-in test runner for unit tests, plus
  Foundry-style fuzz and invariant tests (Lesson 6) — the same fuzz and
  invariant concepts covered in this path's testing and DevOps material,
  applied here to your own contract instead of a worked example.
- **Frontend**: React with `wagmi` and `viem` for wallet connection and
  contract reads/writes (Lesson 5).
- **Network**: Sepolia testnet for deployment (Lesson 7) — never a
  mainnet, and never a wallet that holds real funds.

## Deliverables checklist (Lessons 4-7)

1. **Lesson 4 — Designing the Pool Contracts**: the `SimplePool`
   contract — state, `addLiquidity`, `swapAforB`/`swapBforA`,
   `removeLiquidity`.
2. **Lesson 5 — Building the Frontend**: a React app reading pool
   reserves live and executing swaps/liquidity actions through connected
   wallet hooks.
3. **Lesson 6 — Testing & Security Review**: unit, fuzz, and invariant
   tests, plus a written security-review checklist.
4. **Lesson 7 — Testnet Deployment & Wrap-Up**: a deployed, verified
   Sepolia address and a finished README.

## Setting up the repository

Before any contract code, lay out the project so contracts, tests, and
frontend don't tangle together:

```
simple-pool/
  contracts/        SimplePool.sol, TeachingToken.sol
  ignition/modules/  deployment modules (Lesson 7)
  test/              unit, fuzz, invariant tests (Lesson 6)
  frontend/          React + wagmi/viem app (Lesson 5)
  hardhat.config.ts
```

Initialize the contracts side with `npx hardhat init` (choose the
TypeScript project type) inside `simple-pool/`, and scaffold the
frontend separately inside `frontend/` with your React tool of choice.
Keep them as two clearly separated concerns in one repository — that
separation itself is something a reviewer notices.

## Key terms

| Term | Meaning |
|---|---|
| Liquidity pool | A contract holding reserves of two tokens that other contracts/users can trade against |
| Constant-product formula | `reserveA * reserveB = k`, the pricing rule this pool's swaps preserve (approximately, after fees) |
| LP share | A liquidity provider's proportional claim on a pool's reserves |

## Lab

Create the repository layout shown above, run `npx hardhat init` inside
`contracts/`'s parent folder, and commit the empty skeleton. Add the
out-of-scope list from this lesson to your README now, before you've
written a line of Solidity — it's easier to state your boundaries before
you're tempted to scope-creep past them.

## Check yourself

- Name three things this project's pool deliberately leaves out of
  scope, and why that's worth stating explicitly.
- What four deliverables does Lesson 4 through 7 each produce?
- Why does the frontend live in a separate folder from the contracts in
  this project's layout?
