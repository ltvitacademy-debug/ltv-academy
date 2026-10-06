# Lesson 2 — Choosing Your Project Emphasis

**Chapter 1 · Capstone Overview · Lesson 2 of 22**

## What you'll learn

- What skill set each of the three flagship projects actually demonstrates
- A simple framework for deciding which project to polish deepest, based
  on the role you're targeting
- Why building all three in order still makes sense even if you ultimately
  showcase one above the others

## Each project teaches a different thing

The three flagship projects share a lot of groundwork — Solidity, tests,
a frontend, a testnet deployment — but each one leans hardest on a
different skill set, and that's worth being deliberate about:

- **Project 1 — A Full DeFi Protocol** leans on automated-market-maker
  math (the constant-product formula, liquidity-share accounting) and
  economic security — the kind of thinking a protocol or smart-contract
  engineering role probes hardest.
- **Project 2 — An NFT Marketplace** leans on escrow/approval patterns,
  off-chain indexing of on-chain events, and marketplace UX — closer to
  what a full-stack Web3 developer role actually does day to day.
- **Project 3 — A DAO Governance System** leans on governance design —
  voting weight, quorum, timelocks on a treasury — which maps most
  directly to protocol/governance-focused roles and to security reviewers
  who need to reason about incentive structures.

## A framework for choosing

You don't have to guess. Ask yourself one question: **what role am I
actually applying for?**

- Targeting a **smart contract / protocol engineer** role → go deepest on
  Project 1. Interviewers in this lane will probe AMM math, reentrancy,
  and accounting edge cases hardest.
- Targeting a **full-stack Web3 developer** role → go deepest on Project
  2. You'll be expected to talk fluently about indexing, wallet UX, and
  tying a frontend to on-chain events.
- Targeting a **security-leaning or protocol-governance** role → go
  deepest on Project 3, and make sure your security-review habits (from
  Project 1's testing chapter) show up again there.

If you're not sure yet which role you want, that's fine too — build all
three to a working baseline, then come back and push the one that felt
most interesting the furthest.

## You still build all three, in order

This course builds Project 1 first regardless of your target role,
because its pool-contract patterns (checks-effects-interactions ordering,
fuzz and invariant testing, a testnet deployment pipeline) are reused in
Projects 2 and 3. Choosing an emphasis doesn't mean skipping the other
two — it means deciding, going in, which one gets the extra polish pass
before you put it in front of an employer: a sharper README, a longer
test suite, a recorded demo walkthrough.

## Key terms

| Term | Meaning |
|---|---|
| Emphasis | The one flagship project you polish deepest for your portfolio, chosen to match your target role |
| AMM | Automated market maker — a smart contract that prices and executes trades algorithmically instead of using an order book |
| Governance design | Decisions about how voting weight, quorum, and execution delays are structured in an on-chain organization |

## Lab

Write down, in one sentence, which of the three roles above (protocol
engineer, full-stack Web3 developer, security/governance) you're
currently aiming for — or "undecided" if you genuinely aren't sure yet.
Keep that sentence next to the README you started in Lesson 1; you'll
revisit it at the end of Project 1.

## Check yourself

- Which flagship project leans hardest on AMM math and economic security?
- If you're targeting a full-stack Web3 developer role, which project
  should you plan to polish deepest, and why?
- Does choosing an emphasis mean skipping the other two projects? Why or
  why not?
