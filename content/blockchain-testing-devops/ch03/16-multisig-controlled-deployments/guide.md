# Lesson 16 — Multisig-Controlled Deployments

**Chapter 3 · Deployment Strategy · Lesson 16 of 29**

## What you'll learn

- Why Lesson 15's `_authorizeUpgrade`, and deploy/admin keys generally, shouldn't live behind a single private key
- What Safe (formerly Gnosis Safe) actually is, and how a Safe account's threshold works
- What a real multisig transaction queue looks like, with signatures collected one at a time
- How to add a new signer key to a Safe, and what that flow actually looks like

## One key is one point of failure

A single EOA (externally owned account) controlling a contract's `onlyOwner` functions, deploy scripts, or `_authorizeUpgrade` is one leaked private key, one phished signer, or one compromised laptop away from a total loss of control. **Safe** (the product formerly known as Gnosis Safe) is the standard way teams avoid that: a Safe is a smart contract account requiring **M-of-N** signatures — for example 4 of 7 — before any transaction it holds actually executes.

## What the transaction queue actually shows

Every pending Safe transaction sits in a queue until enough owners have signed it. This is a real Safe{Wallet} account's queue, showing its own threshold badge and how many confirmations each pending transaction still needs:

![Safe{Wallet}'s Transactions > Queue view, showing a Safe with a 4/7 signer threshold badge, pending transactions each needing more confirmations, and a Confirm button per transaction](/courses/blockchain-testing-devops/ch03/16-multisig-controlled-deployments/safe-transaction-queue.png)

The **4/7** badge near the top is the Safe's threshold: 7 total owners, 4 signatures required. Each pending transaction shows its own progress — "1 out of 4" confirmations here — and a **Confirm** button each remaining owner uses to add their signature. Nothing executes until the threshold is met; this is the mechanism that makes "no single key" a real property instead of a slogan.

## Adding a signer

Growing or rotating a Safe's owner set is itself a multisig-gated action — it has to go through the same confirmation flow as any other transaction. The owner-key side of this (the individual key each signer holds, as distinct from the Safe account itself) gets set up through a flow like this:

![A real owner-key management flow: a list of existing owner keys, adding a new one by generating or importing it, naming it, and the resulting key detail with a QR code for exporting its address](/courses/blockchain-testing-devops/ch03/16-multisig-controlled-deployments/safe-owner-key-management.png)

Each signer manages their own key independently — a Safe never holds or has access to any individual owner's private key, only the multisig contract logic requiring enough of their signatures.

## Where this fits a deployment pipeline

For a deploy script (Lesson 13) or an upgrade (Lesson 15), the pattern is: the deploy/upgrade transaction gets **proposed** to the Safe (often by a CI job or a single team member) rather than broadcast directly, then the required number of owners **confirm** it through Safe{Wallet} before it actually executes on-chain. A Safe account itself starts from a simple creation flow, choosing owners and a threshold at setup:

![Safe{Wallet}'s account creation landing screen, where a user starts creating a new Safe Account or connects a wallet to an existing one](/courses/blockchain-testing-devops/ch03/16-multisig-controlled-deployments/safe-create-account.png)

## Key terms

| Term | Meaning |
|---|---|
| Safe | The standard smart-contract multisig wallet (formerly Gnosis Safe) |
| M-of-N threshold | The number of owner signatures (M) required out of total owners (N) |
| Queue | Pending Safe transactions awaiting enough confirmations to execute |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why does putting `_authorizeUpgrade` behind a Safe change what a single compromised signer can actually do?
