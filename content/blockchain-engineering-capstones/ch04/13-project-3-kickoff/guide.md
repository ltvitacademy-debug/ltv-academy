# Lesson 13 — Project 3 Kickoff

**Chapter 4 · Project 3 — A DAO Governance System · Lesson 13 of 22**

## What you'll learn

- The four pieces that make up a real on-chain governance system
- How this project maps across Lessons 14 through 17
- The toolchain this project uses, and why
- What "done" looks like for this capstone

## The four pieces of a DAO governance system

A production governance system is not one contract — it's four pieces working together, and this project builds all four:

1. **Governance token.** An ERC-20 token extended with checkpointed voting power (OpenZeppelin's `ERC20Votes`), so every holder's balance at any past block can be looked up for voting.
2. **Governor contract.** The rules engine — how long a proposal waits before voting opens (voting delay), how long voting lasts (voting period), how many votes are needed to pass (quorum), and who can even submit a proposal (proposal threshold).
3. **Timelock-controlled treasury.** A `TimelockController` that actually holds the funds and executes the calls a passed proposal specifies, but only after a mandatory delay — so a passed vote never moves money instantly.
4. **Proposal UI.** The interface a holder uses to read proposals, see exactly what on-chain calls they're voting on, cast a vote, and track a proposal through its lifecycle.

Every real governance system you'll encounter in the wild — from a protocol DAO to a DAO-managed grants program — is some variation on these same four pieces.

## The roadmap for this project

| Lesson | Focus |
|---|---|
| 14 | Build the governance token: `ERC20Votes`, delegation, checkpointed voting power |
| 15 | Build the treasury: `TimelockController`, its roles, and why the delay matters |
| 16 | Build the Governor contract itself, wire it to the timelock, and walk the proposal lifecycle in a UI |
| 17 | Review, test, and prepare to present the finished system |

Each lesson leaves you with working, deployable Solidity — not pseudocode — verified against OpenZeppelin's current Contracts documentation rather than guessed from memory, since the Governance API has changed shape across major versions.

## Toolchain for this project

- **Solidity ^0.8.20** and **OpenZeppelin Contracts v5** (`governance/Governor.sol`, `governance/TimelockController.sol`, `token/ERC20/extensions/ERC20Votes.sol`)
- **Hardhat or Foundry** for compiling, testing, and scripting deployment — either works; examples in this project use a generic project layout that fits both
- **viem or ethers**, read-side, for a frontend that decodes proposal calldata and tracks `ProposalState`

## What "done" looks like

By the end of Lesson 17 you'll have: a deployed governance token with working delegation, a timelock-controlled treasury with the deployer's own admin access revoked, a Governor contract wired to both, and a walked-through proposal that goes from `propose()` to `execute()` on a local or test network — plus a clear way to talk through every design decision in an interview.

## Key terms

| Term | Meaning |
|---|---|
| Governor contract | The on-chain rules engine for a DAO's voting process |
| TimelockController | A contract that holds execution rights and enforces a mandatory delay before a passed proposal's calls run |
| Checkpointed voting power | Vote weight recorded at specific past blocks, not just the current balance |
| Proposal lifecycle | The sequence a proposal moves through: Pending → Active → Succeeded/Defeated → Queued → Executed |

## Lab

Sketch (on paper or in a text file) the four contracts this project will produce and one sentence on what each is responsible for, before writing any code. You'll compare this sketch against what you actually build by Lesson 17.

## Check yourself

Can you name the four pieces of a governance system and say, in one sentence each, what role every piece plays?
