# Lesson 13 — Project 3 Kickoff · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Welcome to Project 3 — a real DAO governance system. Over the next four lessons you'll build a governance token, a voting contract, a timelocked treasury, and a proposal UI, the same four pieces every production DAO is built from.

## S2 · STEPS — The four pieces

A governance system has four moving parts. A governance token with checkpointed voting power. A Governor contract that enforces the rules — voting delay, voting period, quorum, and threshold. A timelock-controlled treasury that actually holds the funds and only moves them after a mandatory delay. And a proposal UI that shows holders exactly what they're voting on.

## S3 · STEPS — The roadmap

Here's how it breaks down. Lesson 14 builds the governance token and its delegation mechanics. Lesson 15 builds the timelock-controlled treasury and explains why that delay matters. Lesson 16 builds the Governor contract itself and walks the full proposal lifecycle in a UI. Lesson 17 reviews, tests, and prepares you to present the finished system.

## S4 · CODE — Project layout

This is the project structure you'll fill in across the next four lessons: contracts for the token, timelock, and governor, a test folder, a deployment script, and a frontend folder for the proposal UI.

## S5 · STEPS — Toolchain

You'll use Solidity and OpenZeppelin Contracts version 5 for the governance primitives themselves — Governor, TimelockController, and ERC20Votes — Hardhat or Foundry for compiling and testing, and a lightweight read-side frontend built on viem or ethers to decode and display proposals.

## S6 · OUTRO

Next lesson, you'll write the governance token itself — real, current OpenZeppelin syntax, not guessed from memory.
