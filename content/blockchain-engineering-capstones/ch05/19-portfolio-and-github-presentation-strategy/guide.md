# Lesson 19 — Portfolio & GitHub Presentation Strategy

**Chapter 5 · Career Preparation · Lesson 19 of 22**

## What you'll learn

- Why pinning fewer, deeper repos beats a long list of shallow ones
- The README structure that lets a reviewer evaluate a contract project in two minutes
- How to use Etherscan verification links as portfolio proof, not just a deployment artifact
- What to put in a short demo video, and why it matters for a product most reviewers can't click through themselves

## Pin three, not thirty

GitHub's six pinned-repo slots are your portfolio's front page. Pin your three capstone projects from this course — the DeFi protocol, the NFT marketplace, and the DAO governance system — not a scattering of tutorial follow-alongs and half-finished experiments. A reviewer skimming your profile forms an opinion in the time it takes to glance at six repo cards; three complete, well-documented projects beat fifteen abandoned ones every time.

## The README a reviewer can actually evaluate in two minutes

A strong contract-project README front-loads exactly what a technical reviewer needs, in this order:

1. **One-sentence description** of what the project does.
2. **Architecture summary** — the two or three contracts involved and how they relate (a short diagram or bullet list is enough; it doesn't need to be elaborate).
3. **Deployed + verified contract address(es)**, linked directly to the block explorer page, not just pasted as plain text.
4. **How to run the tests**, with the actual command (`forge test` or `npx hardhat test`) and the real coverage number if you have one.
5. **Key design decisions**, in two or three bullets — why a timelock, why this voting mechanism, why this escrow pattern. This is the section that actually gets you hired; a reviewer can run `forge test` themselves, but they can't read your reasoning anywhere else.

## Etherscan verification as portfolio proof

A verified contract on a block explorer (Etherscan for Ethereum and its testnets, or the equivalent explorer for another EVM chain) is more than a deployment record — it's a live, public artifact anyone can inspect: the exact source code, the compiler version, every transaction the contract has processed. Link it directly from your README and your resume both. It's the single highest-value link in a blockchain portfolio, because it's the one piece of evidence a reviewer can check without trusting you at all.

## A short demo video earns its place

Most reviewers will never clone your repo, install dependencies, and click through a local frontend themselves — there simply isn't time. A two-to-three-minute screen recording (Loom or similar) walking through your deployed project's actual UI — submitting a proposal, watching a vote, showing the verified contract — gets you most of the benefit of a live demo without asking anyone to set up your environment. Link it at the top of your README, not buried at the bottom.

## Common mistakes

- **Pinning tutorial clones.** A repo that's clearly a copy of a popular tutorial, with no changes and no README of your own, signals the opposite of what you want.
- **A README that's just a license and a boilerplate "getting started."** If it doesn't explain what the project is and why you built it the way you did, it isn't doing its job.
- **A dead or unverified contract link.** Test every link in your README before you consider a project "portfolio-ready" — a 404 where a contract address should be is worse than no link at all.

## Key terms

| Term | Meaning |
|---|---|
| Pinned repository | One of up to six repos GitHub lets you feature at the top of your profile |
| Contract verification | Publishing source code on a block explorer so it's checkable against the deployed bytecode |
| Demo video | A short screen recording walking a reviewer through a project's real, working UI |

## Lab

Write (or rewrite) the README for your strongest capstone project using the five-part structure above, including a real, tested link to its verified contract. If you don't have a short demo recording yet, outline the three things it would show in under three minutes.

## Check yourself

Can you name the five sections a strong contract-project README should lead with, and explain why the "key design decisions" section is the one that most influences a hiring decision?
