# Lesson 17 — Project 3 Wrap-Up & Presentation

**Chapter 4 · Project 3 — A DAO Governance System · Lesson 17 of 22**

## What you'll learn

- A testing checklist for every piece of the governance system before you call it done
- The security questions you should be able to answer about your own design
- How to demo the proposal lifecycle live, in under three minutes
- How to talk about this project's tradeoffs in an interview, not just its features

## The testing checklist

Before you consider this project finished, confirm each of these against your own deployment, not just against the lesson code:

- **Delegation works.** A freshly minted holder who calls `delegate()` on themselves shows nonzero voting power from `getVotes()`.
- **A proposal moves through every state correctly.** Pending → Active → Succeeded (or Defeated) → Queued → Executed, with no step skipped or stuck.
- **Quorum actually gates execution.** A proposal with too few votes resolves as Defeated, not Succeeded, even if every vote cast was in favor.
- **The timelock delay is real.** Attempting to execute a queued proposal before its `eta` reverts; attempting it after succeeds.
- **The deployer's admin role is gone.** `hasRole(TIMELOCK_ADMIN_ROLE, deployerAddress)` returns `false` after setup — confirm this explicitly, don't just assume the renounce call worked.

## Security questions you should be able to answer about your own design

- **What stops a flash-loan-style attack on voting power?** Checkpointed balances at a snapshot block — not the live balance — are what make borrowing tokens right before a vote pointless; the borrowed tokens' voting weight didn't exist at the snapshot.
- **What happens if `minDelay` is set too low?** The timelock stops providing real protection — the community has no meaningful window to react to a bad proposal before it executes.
- **Who can call `execute()`?** In this project's design, the zero address was granted `EXECUTOR_ROLE`, meaning anyone can trigger an already-queued, already-delay-elapsed call — which is safe specifically *because* the delay and the vote already happened.
- **What's the actual single point of failure, if any remains?** Be honest here: if quorum is set too low, a small, coordinated group could still pass a proposal with low overall turnout. Naming this limitation, and what you'd change to mitigate it, is a stronger interview answer than claiming the design has no weaknesses.

## Demoing the proposal lifecycle in under three minutes

A tight demo script: (1) show the deployed, verified token and Governor contracts on a block explorer — ten seconds of real credibility; (2) submit a proposal and show its Pending state; (3) cast a vote and show the live tally updating; (4) once the voting period ends, show the state transition to Succeeded; (5) queue it and show the `eta`; (6) execute it after the delay and show the resulting state change actually happened on-chain. Practice this sequence against your own deployment before presenting it live — a demo that stalls mid-walkthrough because a step was never actually tested is worse than no live demo at all.

## Talking about tradeoffs, not just features

An interviewer already assumes you can describe what the system does — what they're actually listening for is whether you understand *why* you built it this way, and what you'd reconsider. Practice answering, specifically: why checkpointed voting instead of live balance, why a timelock instead of instant execution, why this quorum percentage and not a different one, and what you'd add first if you had another week (common honest answers: a vote-delegation UI improvement, a proposal-cancellation path for the proposer, or tests for a griefing scenario you didn't fully cover).

## Key terms

| Term | Meaning |
|---|---|
| Flash-loan-style voting attack | Borrowing tokens solely to vote, defeated here by checkpointed (not live) voting power |
| Single point of failure | The one remaining weak spot in an otherwise sound design, worth naming honestly |
| Tradeoff | A deliberate design choice made at the cost of an alternative, worth being able to defend |

## Lab

Run through the full testing checklist above against your own deployment, writing down the actual result of each check (not just "should work"). Then write two to three sentences answering "what's the single point of failure in your design, and what would you change to mitigate it?"

## Check yourself

Can you demo the full proposal lifecycle live, from a cold deployment, in under three minutes, and then answer "what would you change if you had another week" without pausing to think?
