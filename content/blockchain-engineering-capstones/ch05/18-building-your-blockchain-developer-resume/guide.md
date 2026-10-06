# Lesson 18 — Building Your Blockchain Developer Resume

**Chapter 5 · Career Preparation · Lesson 18 of 22**

## What you'll learn

- Why a blockchain resume needs verifiable proof, not just a tool list
- The action + artifact + proof pattern for a strong blockchain bullet
- How to structure a one-page resume around your three capstone projects
- The mistakes that most commonly weaken a blockchain developer resume

## Why "verifiable" is the whole game here

Blockchain hiring has one advantage almost no other engineering discipline offers: your work can be checked by a stranger in thirty seconds, for free. A deployed, verified contract on a block explorer is public, permanent, and tamper-evident. A resume that doesn't point at that evidence is leaving its single strongest asset on the table.

## The action + artifact + proof pattern

Every strong bullet on a blockchain resume names three things: what you did, what you built, and where a reviewer can go verify it actually exists and works.

**Before:** "Worked on a DeFi lending protocol."

**After:** "Built and deployed a lending pool protocol (Solidity, Foundry) with fuzz-tested accounting logic; contract verified on Sepolia Etherscan, 94% test coverage."

**Before:** "Made an NFT marketplace."

**After:** "Designed and shipped an escrow-based NFT marketplace with subgraph-indexed listings; live demo and verified contract linked in repo README."

**Before:** "Built a DAO."

**After:** "Implemented a timelock-governed DAO (OpenZeppelin Governor + TimelockController) with checkpointed ERC20Votes voting; full proposal lifecycle demoed on testnet."

Notice the pattern: a real technique named (fuzz-tested, timelock-governed, subgraph-indexed), a real number where honest (94% coverage), and a place to verify it (Etherscan, a repo, a live demo link).

## Structure of a one-page blockchain resume

1. **Header.** Name, location, email, GitHub URL, and — this is unusual to most resumes but standard here — a portfolio link if you have one.
2. **Summary (optional).** Two lines naming your target role and strongest on-chain skills.
3. **Capstone projects.** Your three flagship builds from this course (DeFi protocol, NFT marketplace, DAO governance), each with two to three action + artifact + proof bullets and a contract-verification or repo link.
4. **Skills, grouped.** Smart contract (Solidity, OpenZeppelin, Foundry/Hardhat), security & testing (fuzz/invariant testing, static analysis), frontend/backend (viem/ethers, subgraphs, RPC providers).
5. **Experience.** Earlier roles, with bullets reframed toward engineering rigor where honestly possible.
6. **Education and any relevant coursework.**

## Tailoring to the posting

Read the job description and note which chain, framework, and specialty it names — an EVM L2 shop cares about different tradeoffs than a protocol team building on a non-EVM chain. Lead with whichever of your three capstones is closest to that posting's emphasis, and only use a term from the posting if you can speak to it for five minutes unprompted.

## Common mistakes

- **A long buzzword list with no linked proof.** "Solidity, Rust, Web3.js, Hardhat, Foundry, The Graph" with nothing to click is weaker than three well-proven bullets.
- **Burying the verified contract link.** If a reviewer has to dig for it, most won't.
- **Describing a project as finished when it only runs locally.** Be precise about whether something is testnet-deployed and verified, or still local-only.
- **Inconsistent claims across documents.** If your resume says "94% coverage" and your README says "87%," fix the mismatch before either goes out.

## Key terms

| Term | Meaning |
|---|---|
| Action + artifact + proof | A resume-bullet pattern naming what you did, what you built, and where it can be verified |
| Contract verification | Publishing a contract's source code on a block explorer so anyone can confirm the deployed bytecode matches it |
| Tailoring | Matching a resume's emphasis and wording to a specific job posting's actual language, truthfully |

## Lab

Take one deliverable from each of your three capstone projects (Chapters 2, 3, and 4 of this course) and write one action + artifact + proof bullet for each, including a real link (Etherscan, GitHub, or a demo URL) for every single one.

## Check yourself

Can you write an action + artifact + proof bullet from memory, for a project you haven't looked at in a week, and include a real place a stranger could go verify it?
