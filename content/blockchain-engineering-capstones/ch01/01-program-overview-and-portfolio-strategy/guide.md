# Lesson 1 — Program Overview & Portfolio Strategy

**Chapter 1 · Capstone Overview · Lesson 1 of 22**

## What you'll learn

- What this capstone course covers and why it closes out the Blockchain
  Engineer path
- The three flagship projects you'll build, start to finish, and the one
  career-prep chapter that follows them
- Why hiring teams respond better to 2-3 deep, complete projects than to
  a long list of shallow ones
- What "complete" actually means for a project you'll put in front of an
  interviewer

## Why this course exists

Every course before this one in the Blockchain Engineer path taught you a
piece: blockchain fundamentals, Solidity, DApp architecture, DeFi and
token mechanics, testing and DevOps for smart contracts, backend APIs and
indexing, and JS/TS tooling for the chain. This course doesn't teach a new
piece. It's where you take everything you already know and ship it — three
real, working systems, built end to end, that you can put your name on.

There is no fictional company running through this course. You are the
one building the project, under your own name, in your own repository.
That's intentional: a capstone is supposed to produce something that's
actually yours.

## The three flagship projects

- **Project 1 — A Full DeFi Protocol** (this chapter and the next): a
  simplified, teaching-grade automated market maker (AMM) liquidity pool —
  pool contracts, a frontend, tests and a security review, and a testnet
  deployment.
- **Project 2 — An NFT Marketplace**: listing, escrow/approval, indexing
  sales, and a wallet-connected frontend.
- **Project 3 — A DAO Governance System**: a governance token, on-chain
  voting, a timelocked treasury, and a proposal UI.

Each project follows the same arc: kickoff and scope → contract design →
frontend → testing and security review → testnet deployment and wrap-up.
A final **Career Preparation** chapter closes the course: resume,
portfolio presentation, interview questions, whiteboard exercises, and
negotiation.

## Portfolio strategy: depth over breadth

A GitHub profile with fifteen half-finished scripts tells an interviewer
nothing except that you start things. A profile with two or three projects
that are actually finished — contracts with tests, a working frontend, a
deployed and verified testnet address, and a README that explains your
design decisions — tells them you can take something from an idea to a
working system. That second profile is what gets you hired.

This course is built around that principle. You will walk away with up to
three complete projects. Even if you only finish one fully (Project 1, in
this chapter range), a single complete, well-documented project beats
three abandoned ones.

## What "complete" means for each project

- **Contracts** that compile, are commented, and clearly separate what's a
  deliberate teaching simplification from what a production system would
  need.
- **Tests** that go beyond the happy path — unit tests, plus at least one
  fuzz test and one invariant test.
- **A frontend** that reads live on-chain state (never a hardcoded or
  disconnected copy of it) and can execute the contract's core actions.
- **A testnet deployment** with a verified contract address you can link
  to.
- **A README** that states the architecture, the tradeoffs you made, and
  what's intentionally out of scope.

## Key terms

| Term | Meaning |
|---|---|
| Flagship project | One of this course's three complete, portfolio-grade builds (DeFi protocol, NFT marketplace, DAO) |
| Testnet | A separate blockchain network (e.g. Sepolia) used to test deployments with worthless test ETH before any real funds are involved |
| Verified contract | A deployed contract whose source code has been published and matched to its on-chain bytecode on a block explorer |

## Lab

Open a blank repository (public, under your own account) for Project 1
now. Write a one-paragraph project brief in the README: what the pool
will do, what stack you'll use, and what "done" will look like for you.
You'll keep refining this README through Lesson 7.

## Check yourself

- Why does this course avoid building around one fictional company, unlike
  some other capstones in this catalog?
- What are the three flagship projects, in order?
- Name the five things a "complete" project needs, per this lesson.
