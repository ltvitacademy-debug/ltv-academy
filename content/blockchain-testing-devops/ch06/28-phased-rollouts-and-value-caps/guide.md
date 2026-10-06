# Lesson 28 — Phased Rollouts & Value Caps

**Chapter 6 · Mainnet Launch · Lesson 28 of 29**

## What you'll learn

- Why an audited, bountied contract still shouldn't launch with unlimited exposure on day one
- How an on-chain deposit cap actually bounds the worst case if something was missed
- Three common phasing techniques, and why not every launch needs all three
- Why raising a cap should be an evidence-based decision, not a calendar-based one

## Audited and bountied isn't the same as proven

Lesson 27 covered two real risk-reduction tools: an audit and a bug bounty. Neither reduces risk to zero. An audit tests the code against what a fixed team of reviewers thought to check, in a fixed window. A bug bounty incentivizes disclosure, but depends on someone finding the bug first. Mainnet, with real users and real money, is the first environment that tests assumptions nobody thought to question at all. Phasing the rollout is how a team limits what that gap can actually cost.

## A deposit cap bounds the worst case

```
function deposit(uint256 amount) external {
    require(
        totalDeposits + amount <= depositCap,
        "Deposit cap reached"
    );
    totalDeposits += amount;
    // ...
}
```

This isn't a dashboard setting or an off-chain policy -- it's enforced directly in the contract. If a critical bug somehow made it past both the audit and the bounty program, the actual damage is bounded by what's been deposited, not unlimited. A `depositCap` that starts deliberately low means day-one risk is a known, small number instead of an open question.

## Common phasing techniques

Not every launch needs every technique below -- the right combination depends on the protocol's risk profile:

- **Deposit / TVL cap.** A hard ceiling on the total value the contract will accept, raised deliberately over time.
- **Allowlisted early users.** Opening to a smaller, known set of wallets before the general public, so early usage comes from people more likely to report issues constructively.
- **Feature flags.** Shipping a narrower surface first -- deposits before withdrawals are enabled, for example -- so each piece gets proven independently rather than all exposure landing at once.

## Raising the cap is still a decision

The cap shouldn't move just because a calendar date arrived. It should move because real usage has actually run cleanly -- deposits and withdrawals working as expected, no incidents, nothing Lesson 23's alerting flagged as anomalous. That's evidence, not a schedule.

And raising it goes through the same approval path as everything else that matters in this course: the multisig from Chapter 3, Lesson 16, not a single person's judgment call made under pressure to grow faster.

## Key terms

| Term | Meaning |
|---|---|
| Deposit / TVL cap | A hard, contract-enforced ceiling on total value a protocol will accept, bounding worst-case loss |
| Allowlist | A known, smaller set of addresses permitted to use a contract before general public access opens |
| Feature flag | A mechanism that enables or restricts specific contract functionality independently, without a new deployment |

## Check yourself

You're ready for Lesson 29 when you can explain: why does a deposit cap still matter even after a contract has passed an audit and has an active bug bounty, and what should actually trigger raising that cap?
