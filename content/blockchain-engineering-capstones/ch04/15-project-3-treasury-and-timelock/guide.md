# Lesson 15 — Treasury & Timelock

**Chapter 4 · Project 3 — A DAO Governance System · Lesson 15 of 22**

## What you'll learn

- Why a DAO's treasury should never be owned directly by the Governor contract
- The real `TimelockController` constructor and its four roles
- How to wire the Governor and the timelock together safely
- Why revoking your own deployer admin access is the step that actually makes the DAO decentralized

## Why the treasury isn't just "owned by the Governor"

It's tempting to have the Governor contract hold the treasury funds directly and execute proposals the moment a vote succeeds. Don't. A `TimelockController` sits between a passed vote and the funds actually moving, for one concrete reason: it guarantees a mandatory delay, giving the community a window to notice and react to a proposal that passed but turns out to be malicious or simply a mistake — before it can touch a single token.

The Governor doesn't hold funds at all in this design. It only has permission to **queue** calls into the timelock; the timelock is what actually executes them, and only after its delay has passed.

## The real TimelockController, verified against current docs

Confirmed against `docs.openzeppelin.com/contracts/governance` rather than guessed from memory:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";

contract TreasuryTimelock is TimelockController {
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
```

The constructor takes four arguments:

- **`minDelay`** — the minimum delay, in seconds, before a queued operation can execute. This is the number that actually protects the community; a DAO with a one-second delay has no real protection at all.
- **`proposers`** — addresses granted the `PROPOSER_ROLE` (and, in current versions, the `CANCELLER_ROLE` alongside it). In this project, the Governor contract itself is the proposer — not any individual person.
- **`executors`** — addresses granted the `EXECUTOR_ROLE`. Setting this to the zero address grants execution to anyone, which is a common, deliberate choice: once the delay has passed, there's no reason to restrict who can trigger an already-approved call.
- **`admin`** — an optional account granted `TIMELOCK_ADMIN_ROLE`. Pass `address(0)` to disable a standing admin entirely once setup is finished — this is the step that matters most.

## Wiring it together, and the step most tutorials skip

```solidity
// after both contracts are deployed:
bytes32 proposerRole = timelock.PROPOSER_ROLE();
bytes32 executorRole = timelock.EXECUTOR_ROLE();
bytes32 adminRole = timelock.DEFAULT_ADMIN_ROLE();

timelock.grantRole(proposerRole, address(governor));
timelock.grantRole(executorRole, address(0)); // anyone can execute once ready

// the deployer renounces its own admin role -- no standing backdoor
timelock.renounceRole(adminRole, deployerAddress);
```

That last line is the one step that actually makes this a DAO instead of a contract with a decorative vote attached to it. If the deployer (or anyone) keeps `TIMELOCK_ADMIN_ROLE`, they can grant themselves the proposer or executor role at any time and bypass the vote entirely. A governance system you can't walk away from isn't decentralized — it's a demo.

## Key terms

| Term | Meaning |
|---|---|
| `minDelay` | The mandatory wait, in seconds, between a queued operation and its execution |
| `PROPOSER_ROLE` | The role allowed to queue an operation into the timelock -- held by the Governor, not a person |
| `EXECUTOR_ROLE` | The role allowed to trigger execution once the delay has passed -- often opened to anyone |
| `TIMELOCK_ADMIN_ROLE` | The role that can grant/revoke the other roles -- renounced after setup in a real DAO |

## Lab

Deploy `TreasuryTimelock` locally with a short `minDelay` (say, 60 seconds, for testing only — never for a real deployment). Grant the proposer role to a placeholder address standing in for your Governor, grant the executor role to the zero address, and then renounce the admin role from your deployer account. Confirm with `hasRole()` that your deployer no longer holds admin access.

## Check yourself

Can you explain why granting `EXECUTOR_ROLE` to the zero address is often a deliberate, safe choice, while leaving `TIMELOCK_ADMIN_ROLE` with the deployer never is?
