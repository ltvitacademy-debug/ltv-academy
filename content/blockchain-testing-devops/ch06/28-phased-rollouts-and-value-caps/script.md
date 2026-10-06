# Script — Phased Rollouts & Value Caps

## Segment 1 (title)

Lesson 27's audit and bounty both reduce risk, but neither reduces it to zero. An audit tests the code against what reviewers thought to check. Mainnet, with real users and real money, tests assumptions nobody thought to question.

## Segment 2 (steps: limiting the blast radius)

A deposit cap bounds the worst case on day one. If a critical bug somehow slipped past the audit and the bounty, it can only drain what's actually been deposited -- not an unlimited amount, because the contract itself won't accept more than the cap allows.

## Segment 3 (code: deposit cap enforcement)

The cap lives in the contract itself, not in a dashboard setting -- totalDeposits plus the incoming amount has to stay under depositCap, or the transaction reverts. And raising that cap goes through the same multisig as everything else from Chapter 3.

## Segment 4 (steps: common phasing techniques)

Not every launch needs every technique. A hard deposit or TVL ceiling is the most common. Allowlisting a smaller, known set of early users before opening to the public is another. And feature-flagging -- shipping deposits first, enabling withdrawals only once deposits have run cleanly -- narrows what's actually exposed at any one time.

## Segment 5 (steps: raising the cap)

Raising the cap is still a real decision, not a countdown. It should happen because real usage has run with no incidents -- evidence -- not just because two weeks have passed on a calendar. And it goes through the same multisig approval path as the original deployment, not one person's judgment call.

## Segment 6 (outro)

Every checklist item, every safeguard from this entire course, converges on one day. Lesson 29 puts all of it together as an actual hour-by-hour runbook for launch day itself.
