# Lesson 16 — Proposal UI & Deployment

**Chapter 4 · Project 3 — A DAO Governance System · Lesson 16 of 22**

## What you'll learn

- The real Governor contract composition, verified against current OpenZeppelin docs
- Why Governor requires six override functions once it's paired with a timelock, and what each one does
- The correct deployment order for all three contracts and their role grants
- Every state a proposal moves through, and what the proposal UI must honestly show at each one

## The Governor contract, verified against current docs

This is the real composition pattern, confirmed against `docs.openzeppelin.com/contracts/governance` rather than guessed from memory:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Governor} from "@openzeppelin/contracts/governance/Governor.sol";
import {GovernorCountingSimple} from "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import {GovernorVotes} from "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import {GovernorVotesQuorumFraction} from "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import {GovernorTimelockControl} from "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";

contract ProjectGovernor is
    Governor,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    constructor(IVotes token, TimelockController timelock)
        Governor("ProjectGovernor")
        GovernorVotes(token)
        GovernorVotesQuorumFraction(4) // 4% of total supply must vote yes
        GovernorTimelockControl(timelock)
    {}

    function votingDelay() public pure override returns (uint256) {
        return 7200; // ~1 day, in blocks on a ~12s block time
    }

    function votingPeriod() public pure override returns (uint256) {
        return 50400; // ~1 week
    }

    function proposalThreshold() public pure override returns (uint256) {
        return 0; // anyone can propose, in this project
    }
}
```

`GovernorCountingSimple` gives for/against/abstain tallying, `GovernorVotes` reads voting power from the `IVotes` token, `GovernorVotesQuorumFraction` sets quorum as a percentage of total supply, and `GovernorTimelockControl` is what routes execution through the timelock instead of the Governor executing directly.

## The six required overrides

Combining `Governor` with `GovernorTimelockControl` means both parent contracts declare the same functions, so Solidity requires explicit overrides resolving each one. All six just delegate to `super`, but each is a real hook you'd customize for non-default behavior:

```solidity
function state(uint256 proposalId)
    public view override(Governor, GovernorTimelockControl)
    returns (ProposalState)
{ return super.state(proposalId); }

function proposalNeedsQueuing(uint256 proposalId)
    public view override(Governor, GovernorTimelockControl)
    returns (bool)
{ return super.proposalNeedsQueuing(proposalId); }

function _queueOperations(uint256 id, address[] memory t, uint256[] memory v, bytes[] memory c, bytes32 d)
    internal override(Governor, GovernorTimelockControl) returns (uint48)
{ return super._queueOperations(id, t, v, c, d); }

function _executeOperations(uint256 id, address[] memory t, uint256[] memory v, bytes[] memory c, bytes32 d)
    internal override(Governor, GovernorTimelockControl)
{ super._executeOperations(id, t, v, c, d); }

function _cancel(address[] memory t, uint256[] memory v, bytes[] memory c, bytes32 d)
    internal override(Governor, GovernorTimelockControl) returns (uint256)
{ return super._cancel(t, v, c, d); }

function _executor()
    internal view override(Governor, GovernorTimelockControl)
    returns (address)
{ return super._executor(); }
```

## Deployment order

The order matters because each contract needs an address that doesn't exist yet until the previous one is deployed:

1. **Deploy the governance token** (Lesson 14). Mint the initial supply, have early holders delegate.
2. **Deploy the timelock** (Lesson 15), with a placeholder admin — typically the deployer, temporarily.
3. **Deploy the Governor**, passing the token and timelock addresses into its constructor.
4. **Grant roles on the timelock**: `PROPOSER_ROLE` to the Governor's address, `EXECUTOR_ROLE` to the zero address (or a chosen set).
5. **Renounce the deployer's `TIMELOCK_ADMIN_ROLE`.** This is the last step, and it's what finishes the handoff to on-chain governance.

## The proposal lifecycle, and what the UI must show

| State | What it means | What the UI should display |
|---|---|---|
| Pending | Proposal submitted; voting delay hasn't elapsed | The exact decoded calls the proposal will execute — targets, values, calldata — not just a free-text description |
| Active | Voting window is open | Live for/against/abstain tallies and current quorum progress |
| Succeeded / Defeated | Voting period ended | The final tally and which threshold was or wasn't met |
| Queued | A succeeded proposal has been queued into the timelock | The exact timestamp execution becomes eligible (`eta`) |
| Executed | The timelock delay elapsed and the calls ran | A link to the executing transaction, for a verifiable audit trail |

The single most important UI principle here: **a proposal's description is just a string — it is not what gets voted on.** What actually executes is the array of target addresses, values, and calldata passed into `propose()`. A trustworthy proposal UI decodes and renders those calls directly, so a voter is never approving a text summary that doesn't match what the contract will actually do.

## Key terms

| Term | Meaning |
|---|---|
| Quorum fraction | The percentage of total token supply that must participate for a vote to count |
| `ProposalState` | The enum tracking a proposal's current lifecycle stage |
| `eta` | The timestamp a queued operation becomes eligible for execution |
| Calldata decoding | Rendering a proposal's actual on-chain calls in human-readable form, not just its description |

## Lab

Deploy all three contracts locally in the order above, submit a test proposal that calls a simple function (even just updating a value on a dummy contract the timelock owns), vote it to success, queue it, wait out the delay, and execute it. Then write down, from the Governor's events, the exact `targets`/`values`/`calldatas` your proposal executed — compare that against the plain-English description you wrote.

## Check yourself

Can you explain why a proposal's free-text description is never what actually gets voted on, and what a proposal UI has to decode and display instead?
