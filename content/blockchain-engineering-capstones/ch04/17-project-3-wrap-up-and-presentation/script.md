# Lesson 17 — Project 3 Wrap-Up & Presentation · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson closes out Project 3 -- testing what you built, naming its real tradeoffs, and preparing to demo it live.

## S2 · STEPS — The testing checklist

Confirm each of these against your own deployment. Delegation actually grants voting power. A proposal moves through every state with nothing stuck. Quorum genuinely gates execution. The timelock delay is real, not just configured. And the deployer's admin role is actually gone.

## S3 · STEPS — Security questions for your own design

Be ready to answer these about your own system. What stops a flash-loan-style voting attack -- checkpointed balances, not live ones. What happens if minDelay is too low -- the timelock stops protecting anyone. Who can call execute -- and why that's safe here. And honestly, what's the one remaining weak spot.

## S4 · STEPS — The demo script

Six steps, practiced in advance. Show the verified contracts on a block explorer. Submit a proposal. Cast a vote and show the live tally. Show the state transition to Succeeded. Queue it and show the eta. Execute it after the delay and show the real state change.

## S5 · STEPS — Talking tradeoffs, not just features

An interviewer already assumes you can describe what it does. What they're listening for is why you built it this way -- why checkpointed voting, why a timelock, why this quorum -- and what you'd reconsider with another week.

## S6 · OUTRO

That's Project 3, complete. Next up: the career-preparation chapter that closes out this entire path.
