# Lesson 26 — Timelocks & Multisig Treasuries

**Chapter 6 · DAOs & Governance · Lesson 26 of 30**

## What you'll learn

- Why a timelock delay exists between a vote passing and execution
- How a production system can run two different delay tiers at once
- What a multisig actually enforces, and how it differs from a single key
- Why DAO treasuries typically combine both safeguards, not just one

## Why a delay sits between "passed" and "executed"

A timelock's entire purpose is giving token holders a window to react
*after* a proposal passes but *before* it actually takes effect. If a
malicious or mistaken proposal somehow passes a vote — a bug in the
voting contract, a flash-loan-assisted attack that slipped past quorum
checks, or just a genuinely bad idea with unexpected majority support —
the timelock delay is the last line of defense: holders can see exactly
what's queued to execute and exit their position, or organize a response,
before it happens.

## Two delay tiers in production — Aave's execution network

Real systems often don't use a single flat delay for everything. Aave's
own **Execution Network** diagram shows a **Payloads Controller** routing
queued changes through two separate executor levels, each with its own
delay:

- **Executor lvl1** — a shorter delay, used for lower-risk changes to
  Aave's own governance configuration.
- **Executor lvl2** — a longer delay, used for changes to the Aave
  Protocol itself (the lending markets users' funds are actually in).

The logic: the riskier the blast radius of a change, the longer the
window token holders get to notice and react before it executes.

![Aave's own Execution Network architecture diagram, showing the Payloads Controller routing queued changes through two executor delay tiers before reaching Aave Governance v3 or the Aave Protocol.](/courses/defi-token-engineering/ch06/26-timelocks-and-multisig-treasuries/aave_execution_network.jpg)
*Aave governance v3's Execution Network — two delay tiers highlighted, from its official GitHub documentation.*

## What "queued" looks like in a real interface

The second screenshot below is Tally, showing a real on-chain proposal
tagged **QUEUED** and **ON-CHAIN** — this is the state a proposal sits in
*during* the timelock delay, after voting has ended but before the
**Execute** button can actually be pressed. Anyone can call execute once
the delay has elapsed; it isn't restricted to the original proposer.

![Tally's real interface showing a QUEUED, ON-CHAIN proposal with an Execute button -- the state a proposal sits in during its timelock delay.](/courses/defi-token-engineering/ch06/26-timelocks-and-multisig-treasuries/tally_execute_ui.png)
*A real queued on-chain proposal in Tally, from OpenZeppelin's own governance documentation.*

## TimelockController roles

OpenZeppelin's TimelockController pattern (the contract most Governor-based
DAOs pair with their voting system) separates three roles by access
control, rather than trusting one address with everything:

```solidity
// Simplified illustration of TimelockController's role separation
bytes32 public constant PROPOSER_ROLE = keccak256("PROPOSER_ROLE");
bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");
bytes32 public constant CANCELLER_ROLE = keccak256("CANCELLER_ROLE");

// Typical DAO setup:
//   PROPOSER_ROLE  -> granted only to the Governor contract
//   EXECUTOR_ROLE  -> granted to address(0), meaning "anyone" can execute
//                     once the delay has passed
//   CANCELLER_ROLE -> granted to the Governor and/or a security council,
//                     able to cancel a queued action before it executes
```

## Multisig treasuries — M-of-N, not one key

A **multisig** (multi-signature wallet) requires a minimum number of
authorized signers (M) out of a larger authorized set (N) to approve a
transaction before it executes — commonly used for a DAO's treasury, since
it removes any single point of failure:

![Safe's own comparison graphic contrasting a multisig wallet (multiple keys, distributed risk) against a single-signature wallet (one key, single point of failure).](/courses/defi-token-engineering/ch06/26-timelocks-and-multisig-treasuries/safe_multisig_table.png)
*Multisig vs. single-signature wallets, from Safe's own official blog.*

```
3-of-5 multisig treasury:
  5 authorized signers total
  Any 3 of them must sign before a treasury transaction executes

If 1 signer's key is compromised: attacker still needs 2 more
  signatures -> transaction cannot execute alone
If 2 signers are unavailable: the remaining 3 can still act
  -> treasury isn't frozen by one person's absence
```

Combining a timelock (which delays *what* a governance vote decided) with
a multisig (which requires *multiple humans* to approve sensitive
treasury actions directly) gives a DAO two independent safeguards instead
of relying on either alone.

## Key terms

| Term | Meaning |
|---|---|
| Timelock | An enforced delay between a decision passing and it taking effect |
| Executor tier | A distinct delay level applied based on a change's risk/blast radius |
| TimelockController | OpenZeppelin's role-separated timelock contract (proposer/executor/canceller) |
| M-of-N multisig | A wallet requiring at least M signatures from N authorized signers to execute |

## Check yourself

Before Lesson 27, make sure you can explain why a protocol might use two
different timelock delay tiers instead of one, and what problem an M-of-N
multisig solves that a single-key wallet doesn't.
