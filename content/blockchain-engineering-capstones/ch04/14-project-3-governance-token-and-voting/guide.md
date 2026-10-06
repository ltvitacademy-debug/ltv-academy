# Lesson 14 — Governance Token & Voting

**Chapter 4 · Project 3 — A DAO Governance System · Lesson 14 of 22**

## What you'll learn

- Why a plain ERC-20 balance can't safely drive on-chain voting
- The real, current OpenZeppelin `ERC20Votes` / `ERC20Permit` pattern for a governance token
- What delegation is, and why holders must explicitly delegate to vote
- The two required override functions and why Solidity forces you to write them

## Why a plain ERC-20 balance isn't enough

A standard ERC-20's `balanceOf` only ever reports the *current* balance. If a Governor used that directly, a holder could buy a large stack of tokens right before a vote, cast it, and sell immediately after — with no real stake in the outcome. Every real on-chain governance token instead tracks **checkpointed** balances: a snapshotted voting weight at a specific past block, so a proposal's vote always uses a balance from *before* the vote could be gamed.

OpenZeppelin's `ERC20Votes` extension adds exactly this on top of a standard ERC-20, using the ERC-5805 `IVotes` interface that Governor contracts read from.

## The governance token, verified against current OpenZeppelin docs

This is the real contract shape, confirmed against `docs.openzeppelin.com/contracts/governance` rather than guessed from memory — the governance module's API has changed shape across major Contracts versions, so it's worth checking live each time:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";

contract GovernanceToken is ERC20, ERC20Permit, ERC20Votes {
    constructor(address initialHolder, uint256 initialSupply)
        ERC20("Project Governance Token", "PGT")
        ERC20Permit("Project Governance Token")
    {
        _mint(initialHolder, initialSupply);
    }

    function _update(address from, address to, uint256 amount)
        internal override(ERC20, ERC20Votes)
    {
        super._update(from, to, amount);
    }

    function nonces(address owner)
        public view override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
```

Two things worth noticing:

- **`_update` is overridden, not `_transfer` or `_mint`/`_burn` separately.** Current OpenZeppelin versions route every balance change — transfers, mints, and burns — through one internal `_update` hook, which is exactly where `ERC20Votes` hooks in its checkpoint bookkeeping.
- **`nonces` must be overridden** because both `ERC20Permit` and the shared `Nonces` utility declare it — Solidity requires you to resolve the collision explicitly, even though the two implementations happen to agree.

`ERC20Permit` isn't optional decoration here: it lets a holder delegate or approve with a signature instead of a separate on-chain transaction, which matters for a frontend that wants gas-free delegation.

## Delegation: why holding tokens isn't enough

`ERC20Votes` tracks voting power per **delegate**, not per holder directly. A freshly minted or transferred balance has zero voting power until its owner calls `delegate(address)` — commonly delegating to themselves. This is deliberate: it lets a holder delegate their voting power to someone else (a trusted community member, for instance) without giving up their tokens, which is a real, common DAO pattern, not an edge case to work around.

```solidity
// a holder activates their own voting power
governanceToken.delegate(myAddress);

// or delegates it to someone else entirely
governanceToken.delegate(trustedDelegate);
```

Forgetting this step is the single most common reason a brand-new governance token "doesn't work" in testing — the Governor will report zero voting power for a holder who never delegated.

## Key terms

| Term | Meaning |
|---|---|
| Checkpoint | A recorded voting-weight snapshot at a specific past block |
| `IVotes` | The ERC-5805 interface a Governor contract reads voting power through |
| Delegation | Explicitly activating (or assigning) voting power separately from holding tokens |
| `_update` hook | The single internal function current OpenZeppelin ERC-20s route all balance changes through |

## Lab

Write the `GovernanceToken` contract above into a fresh Hardhat or Foundry project, deploy it to a local network, mint yourself a balance, and call `delegate()` on your own address. Then read `getVotes(yourAddress)` and confirm it returns your balance — not zero.

## Check yourself

Can you explain, out loud, why `ERC20Votes` checkpoints balances instead of reading the live balance, and why a holder must explicitly delegate before their tokens carry any voting weight?
