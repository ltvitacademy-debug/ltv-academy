# Lesson 3 — Solidity Dev Tools: Remix, Foundry & Hardhat

**Chapter 5 · Solidity Programming · Lesson 3 of 4**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, referencing the real Foundry Book and ethereum.org documentation on screen.

## What you'll learn

- The real development platforms professionals actually use to write Solidity
- Why this course starts with Remix before moving to Foundry
- The real split between how often companies use Foundry vs. Hardhat
- What an IDE actually is, in plain terms

## The real tools of the trade

There isn't just one way to write and deploy a smart contract. This
course will actually use more than one of these tools, in this order:

### Remix IDE — where this course starts

**Remix** is a browser-based **IDE** (Integrated Development Environment
— an application for writing code, with extensions that help you write
it) built specifically for Solidity. It's the easiest on-ramp into
writing your first real contract, which is why this course starts here
before moving to more advanced tools.

### Foundry — the primary tool for this course

![The real Foundry Book documentation homepage, shown live in class: "Foundry is a smart contract development toolchain."](/courses/blockchain/ch05/03-solidity-dev-tools-remix/shot_foundry_docs.png)
*The actual Foundry Book: "Foundry manages your dependencies, compiles your project, runs tests, deploys, and lets you interact with the chain from the command-line and via Solidity scripts."*

Per the instructor's real, first-hand estimate: **Foundry is used by
roughly 70% of companies and developers**, versus about 30% for Hardhat.
Foundry is what this course will primarily use going forward — with some
Hardhat mixed in, since the two can be combined and you may encounter
Hardhat at a future employer.

### Hardhat — the other 30%

**Hardhat** is the other major development platform: you can use it to
start an Ethereum node, compile code, and deploy smart contracts, just
like Foundry. Roughly 30% of companies and developers use it instead of
Foundry.

## The EVM, one more time

![The real ethereum.org documentation page for the Ethereum Virtual Machine (EVM), referenced again here as the runtime every one of these tools ultimately compiles and deploys to.](/courses/blockchain/ch05/03-solidity-dev-tools-remix/shot_evm_docs.png)
*ethereum.org's own EVM page — the real target every one of these dev tools compiles your Solidity down to.*

No matter which tool you use — Remix, Foundry, or Hardhat — the
destination is the same: your Solidity gets compiled to bytecode and
executed by the EVM. The tools differ in workflow and convenience, not
in what they ultimately produce.

## Key terms

| Term | Meaning |
|---|---|
| IDE | Integrated Development Environment — an application for writing and managing code |
| Remix | A browser-based Solidity IDE, ideal for beginners |
| Foundry | A command-line smart contract toolchain — this course's primary tool, ~70% industry usage |
| Hardhat | An alternative smart contract development platform — ~30% industry usage |

## Check yourself

Before moving to the next lesson, make sure you can explain why a course
would deliberately start with an easier tool like Remix before moving to
a more powerful one like Foundry.
