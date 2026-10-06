# Lesson 7 — Testnet Deployment & Wrap-Up

**Chapter 2 · Project 1 — A Full DeFi Protocol · Lesson 7 of 22**

## What you'll learn

- Pre-deployment checklist before touching a real network, even a testnet
- Current, verified Hardhat 3 syntax for network config, secret storage,
  Ignition deployment, and contract verification
- What belongs in the README that closes out Project 1
- How this wrap-up connects back to Lesson 1's portfolio strategy

## Pre-deploy checklist

Before deploying anywhere other than your local Hardhat node:

- All tests green — unit, fuzz, and invariant (Lesson 6).
- A **dedicated testnet-only wallet** funded with Sepolia ETH from a
  public faucet. Never reuse a wallet that has ever held real funds, and
  never put a real private key in a config file or commit history.
- Your two `TeachingToken` contracts and the `SimplePool` constructor
  arguments ready (which token addresses the pool will hold).

## Network configuration

Hardhat 3 configures networks directly in `hardhat.config.ts`, reading
secrets through `configVariable` rather than a plain `.env` file:

```ts
sepolia: {
  type: "http",
  chainType: "l1",
  url: configVariable("SEPOLIA_RPC_URL"),
  accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
}
```

`configVariable` pulls each value from Hardhat's encrypted keystore
(below) instead of an environment file that's all too easy to
accidentally commit.

## Storing secrets and deploying

```bash
hardhat keystore set SEPOLIA_RPC_URL
hardhat keystore set SEPOLIA_PRIVATE_KEY
hardhat ignition deploy ignition/modules/SimplePoolDeployment.ts --network sepolia
npx hardhat verify --network sepolia <POOL_ADDRESS> <TOKEN_A> <TOKEN_B>
```

`hardhat keystore set` prompts for each secret and stores it encrypted,
never in a plaintext file your `.gitignore` has to remember to exclude.
The deploy command runs your Ignition module (below) against Sepolia;
the verify command publishes your source code so the block explorer can
match it to the deployed bytecode — this is what makes the address
actually useful to show someone else, since they can read the real
source instead of trusting a bytecode blob.

## The Ignition deployment module

```ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("SimplePoolDeployment", (m) => {
  const tokenA = m.contract("TeachingToken", ["TokenA", "TKA"]);
  const tokenB = m.contract("TeachingToken", ["TokenB", "TKB"]);
  const pool = m.contract("SimplePool", [tokenA, tokenB]);
  return { tokenA, tokenB, pool };
});
```

`m.contract` deploys each contract in dependency order — both tokens
first, then the pool, which needs their addresses. Ignition records
every deployment under `ignition/deployments/chain-<id>/`, so a failed
or interrupted deploy can resume rather than starting over, and the
addresses it produced are there for your README and your frontend's
config to reference.

## What belongs in the finished README

This is the document an interviewer actually reads before they read your
code. Include:

- **What it is, in two or three sentences** — a constant-product AMM
  pool for two ERC-20 tokens, built end to end as a teaching project.
- **Architecture summary** — one contract, LP shares tracked via
  mapping, the constant-product-with-fee swap formula.
- **What's explicitly simplified and why** (Lessons 3 and 4's
  out-of-scope list, restated here).
- **Test coverage** — what unit, fuzz, and invariant tests exist, and
  what each actually checks.
- **The security-review checklist from Lesson 6**, with your own
  findings filled in.
- **Deployed, verified contract addresses** on Sepolia, linked to the
  block explorer.
- **A link to the running frontend**, if you've hosted it, or clear
  local-run instructions if not.

## Closing the loop on portfolio strategy

Lesson 1 argued that one complete, well-documented project beats many
shallow ones. This README is where that argument becomes concrete: a
reviewer who opens it should be able to understand what you built, why
you made the choices you made, and what you'd do differently with more
time — without ever having to ask you in person. That's what "complete"
actually looks like.

Project 1 is done. Project 2 — an NFT marketplace — picks up next,
reusing this same arc: kickoff, contract design, frontend, testing, and
deployment.

## Key terms

| Term | Meaning |
|---|---|
| `hardhat keystore` | Hardhat 3's encrypted local secret store, replacing plaintext `.env` files for RPC URLs and private keys |
| Hardhat Ignition | Hardhat's declarative deployment system (`buildModule`/`m.contract`) that tracks and can resume deployments |
| Contract verification | Publishing a deployed contract's source code so a block explorer can match it to the on-chain bytecode |

## Lab

Deploy `SimplePoolDeployment` to Sepolia using the commands above, verify
both tokens and the pool, and write the complete README described in
this lesson into your repository. Link the verified addresses directly
in it.

## Check yourself

- Why does Hardhat 3 use `hardhat keystore` instead of a `.env` file for
  RPC URLs and private keys?
- What does `hardhat ignition deploy` do differently from manually
  writing a deployment script, in terms of handling a failed deploy?
- Name three things this lesson says belong in Project 1's finished
  README.
