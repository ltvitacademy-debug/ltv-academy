# Lesson 27 — Building a Simple Governance Contract

**Chapter 6 · DAOs & Governance · Lesson 27 of 30**

## What you'll learn

- How to structure a minimal propose/vote/execute governance contract
- Where quorum and majority checks actually live in the code
- Why this version is a teaching example, not something to deploy
- What a production DAO adds on top of this skeleton

## A full disclaimer, up front

> **This is a simplified teaching example.** It leaves out access
> control hardening, reentrancy protection, delegation (Lesson 25), and
> the timelock delay (Lesson 26) a real DAO needs. Production DAOs should
> use OpenZeppelin's audited `Governor` + `TimelockController` contracts,
> not a contract like this one. The goal here is to see the mechanics from
> Lessons 24-26 as actual code, not to hand you something deployable.

## Part 1 — the proposal struct and `propose()`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IVotes {
    function getPastVotes(address account, uint256 blockNumber)
        external view returns (uint256);
}

// Simplified teaching example -- NOT production code.
contract SimpleGovernor {
    struct Proposal {
        address target;
        bytes data;
        uint256 snapshotBlock;
        uint256 voteEnd;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }

    IVotes public immutable token;
    uint256 public constant VOTING_PERIOD = 3 days;
    uint256 public constant QUORUM = 400_000e18;
    uint256 public proposalCount;

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    constructor(address _token) {
        token = IVotes(_token);
    }

    function propose(address target, bytes calldata data)
        external returns (uint256 id)
    {
        id = proposalCount++;
        proposals[id] = Proposal({
            target: target,
            data: data,
            snapshotBlock: block.number,
            voteEnd: block.timestamp + VOTING_PERIOD,
            forVotes: 0,
            againstVotes: 0,
            executed: false
        });
    }
}
```

Note the `snapshotBlock` — recorded at proposal creation and never changed
again, exactly the snapshot mechanic from Lesson 25.

## Part 2 — casting a vote

```solidity
function castVote(uint256 id, bool support) external {
    Proposal storage p = proposals[id];
    require(block.timestamp <= p.voteEnd, "voting closed");
    require(!hasVoted[id][msg.sender], "already voted");

    uint256 weight = token.getPastVotes(msg.sender, p.snapshotBlock);
    require(weight > 0, "no voting power");

    hasVoted[id][msg.sender] = true;
    if (support) {
        p.forVotes += weight;
    } else {
        p.againstVotes += weight;
    }
}
```

`getPastVotes` is where the snapshot actually gets enforced — the weight
is read at `p.snapshotBlock`, not the current block, so tokens acquired
after the proposal was created don't count (the same point made in
Lesson 25).

## Part 3 — executing the outcome

```solidity
function execute(uint256 id) external {
    Proposal storage p = proposals[id];
    require(block.timestamp > p.voteEnd, "voting still open");
    require(!p.executed, "already executed");

    uint256 totalVotes = p.forVotes + p.againstVotes;
    require(totalVotes >= QUORUM, "quorum not met");
    require(p.forVotes > p.againstVotes, "proposal defeated");

    p.executed = true;
    (bool ok, ) = p.target.call(p.data);
    require(ok, "execution failed");
}
```

This is Lesson 24's quorum and majority checks, written as `require`
statements. Notice there's no delay here between voting ending and
`execute()` succeeding — a real DAO adds the TimelockController from
Lesson 26 specifically to close that gap.

## What production adds on top

1. **Delegation** (Lesson 25) — `getPastVotes` in a real ERC20Votes token
   already accounts for delegated weight; this teaching version assumes
   that's handled by the token contract.
2. **A timelock** (Lesson 26) — `execute()` here fires immediately once
   quorum/majority pass; OpenZeppelin's Governor instead queues the action
   into a `TimelockController` and requires a separate delay to elapse.
3. **Proposal thresholds** — requiring a minimum token balance just to
   call `propose()`, preventing proposal spam.
4. **An audit** — this contract has never been reviewed for security and
   should never hold real funds or control real protocol parameters.

## Key terms

| Term | Meaning |
|---|---|
| `snapshotBlock` | The block voting weight is measured at, fixed when the proposal is created |
| `getPastVotes` | The ERC20Votes-pattern function that reads historical voting weight |
| Quorum/majority require statements | Where Lesson 24's two checks actually live in the code |

## Check yourself

You've finished Chapter 6 when you can read through `propose()`,
`castVote()`, and `execute()` above and explain, in your own words, what
each `require` statement is actually protecting against.
