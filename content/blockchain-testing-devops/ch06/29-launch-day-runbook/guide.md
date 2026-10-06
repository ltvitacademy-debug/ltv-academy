# Lesson 29 — Launch-Day Runbook

**Chapter 6 · Mainnet Launch · Lesson 29 of 29**

## What you'll learn

- How to sequence launch day itself: before deployment, the deployment, and the hours after
- Why the pre-launch checklist gets re-run live on the morning of, not trusted from memory
- Why resisting the urge to raise caps or declare victory early is itself part of the plan
- That an incident response runbook, when it's needed, is just executing lessons already covered

## Everything converges on one day

This course has built toward a single moment: a contract, tested and verified, with its off-chain stack hosted, monitored, audited, and bountied, actually going live with real funds. This lesson is that day, laid out as an actual runbook rather than a review -- the sequence a team follows, not just a list of things that should be true.

## Before anyone broadcasts anything

- **Re-run Lesson 26's checklist live, that morning.** Not from memory of how things looked last week -- confirm it's still true right now.
- **Open monitoring dashboards somewhere the whole team can see.** Lesson 22's live numbers need eyes on them from the first transaction, not after someone notices something's off.
- **Confirm every multisig signer is online and reachable.** Chapter 3, Lesson 16's shared deployment authority only works as a safeguard if the people holding it are actually available, not just technically capable of signing.

## The deployment itself

- **Deploy with Lesson 28's cap set deliberately low.** This is day one -- the cap exists specifically so day one's worst case is small.
- **Verify on the block explorer immediately**, confirming the deployed bytecode matches the published source (Chapter 3, Lesson 14), before anyone announces the launch publicly.
- **Announce only after verification is confirmed.** A live, unverified contract draws exactly the wrong kind of attention -- it looks unfinished and unaccountable at the worst possible moment.

## The first hours

- **Watch whether alerts fire, or don't.** Lesson 23's calibration gets tested against real activity for the first time -- this is also the moment to notice if a threshold was set wrong.
- **Resist raising the cap early.** Nothing going wrong in the first hour isn't evidence yet -- Lesson 28 was explicit that raising the cap needs real evidence, which takes longer to gather than the excitement of a clean launch does.
- **Keep the communications channel warm.** Ready to post an update, even if the update is genuinely "nothing to report" -- silence in the first hours reads the same whether or not there's actually a problem.

## If something does go wrong

```
1. Confirm it's real (Ch.5 L24)
2. Pause via multisig (Ch.3 L16)
3. Acknowledge publicly within the hour (Ch.5 L25)
4. Investigate using the alert history (Ch.5 L24)
5. Postmortem before reopening (Ch.5 L25)
```

Every single step here is a lesson this course already covered in depth. Launch day doesn't require inventing a new process under pressure -- it requires executing the process the team already built and, ideally, already rehearsed.

## Key terms

| Term | Meaning |
|---|---|
| Runbook | A specific, sequenced set of actions for a known scenario -- here, launch day itself |
| T-zero | The moment of actual deployment, as distinct from the preparation before it and the monitoring after |
| Warm comms channel | A communications channel kept ready to post an update immediately, rather than set up reactively during an incident |

## Course complete

That closes Blockchain Testing, DevOps & Deployment -- rigorous testing, real CI/CD, disciplined deployment, a properly hosted off-chain stack, live monitoring, and now an actual launch. The next and final course in the Blockchain Engineer path is **Blockchain Engineering Capstones**, where everything from this course and the ones before it comes together in real, end-to-end projects.
