# Lesson 7 — Testnet Deployment & Wrap-Up · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Last lesson for Project 1: deploying to a real network, verifying the
contract, and writing the README that actually closes this project out.

## S2 · STEPS CARD (pre-deploy checklist)

Before deploying anywhere but your local node: all tests green, a
dedicated testnet-only wallet funded from a Sepolia faucet — never a
wallet that's ever held real funds — and your constructor arguments
ready.

## S3 · CODE CARD (network config)

Hardhat 3 configures networks directly in the config file, but pulls
secrets through configVariable from an encrypted keystore, not a plain
.env file that's easy to accidentally commit.

## S4 · CODE CARD (Ignition module)

The Ignition module declares what to deploy and in what order — both
tokens first, then the pool, which needs their addresses. Ignition
tracks the deployment so a failed run can resume instead of starting
over.

## S5 · CODE CARD (keystore, deploy, verify)

Set your secrets in the encrypted keystore, deploy the Ignition module
to Sepolia, then verify — publishing your source code so the block
explorer matches it to the deployed bytecode.

## S6 · STEPS CARD (the README)

The finished README is what an interviewer reads before your code: what
it is, the architecture, what's deliberately simplified and why, your
test coverage, the security checklist with your findings, and the
verified, linkable contract addresses.

## S7 · OUTRO CARD

Project 1 is complete. Project 2 — an NFT marketplace — picks up next,
reusing this same arc: kickoff, contract design, frontend, testing, and
deployment.
