# Lesson 22 — Rollback Strategies When a Deployment Goes Wrong

**Chapter 6 · Deployment Planning & Rollback · Lesson 22 of 26**

## What you'll learn

- The two real rollback options: reverting to a prior version, or rolling forward with a fix
- How a revert actually restores the exact prior state, using tools from earlier in this course
- Why a fast, targeted roll-forward is sometimes the better call than a full revert
- The real decision criteria teams use: severity, scope, and how clean a revert would actually be
- Why a messy deployment can end up harder to revert than to simply fix

## Two real options, not one default

Lesson 21 covered planning a deployment well enough that it shouldn't go wrong. This lesson covers what happens when, despite that planning, it does. There are exactly two real strategies: **revert**, which restores the exact state the application was in before the deployment, and **roll forward**, which leaves the deployment in place and pushes a quick, targeted corrective fix on top of it. Neither is automatically the right answer — the right call depends on what actually broke.

## Reverting: restoring the exact prior state

A revert is only as clean as the tooling behind it. Chapter 1 covered the Application Repository's version history, which lets you restore a scoped application to a previous, known-good version rather than trying to manually undo whatever just happened. Chapters 2 and 3 covered the same idea at a smaller grain: backing out a specific Update Set, or reverting to a prior Source Control commit, to undo exactly the change that caused the problem. Done cleanly, a revert is powerful precisely because it restores a state the team already knows worked — there's no guesswork about whether the "fixed" version is actually correct, because it's the version that was already running successfully a moment ago.

## Rolling forward: a fix, not an undo

Rolling forward means the deployment stays live, and instead of undoing it, the team identifies the specific broken piece and ships a small, targeted fix for exactly that piece. This is the right call when the root cause is already understood, the fix itself is small and low-risk, and reverting would mean giving up other, unrelated functionality from the same deployment that's working fine. A roll-forward fix can often reach Production faster than a full revert, especially when the broken piece is narrow and well understood.

## The real decision: severity, scope, and how clean a revert would be

Teams don't flip a coin between these two options. Three real questions drive the decision. First, **severity and scope**: is this a cosmetic bug affecting a few users, or a broken critical workflow affecting everyone? The more severe and widespread the issue, the stronger the pull toward the fastest path back to a working state — whichever that actually is. Second, **speed and confidence of a roll-forward fix**: has the root cause actually been identified, and can a fix for it realistically be prepared and tested quickly, or is the team still guessing? Third, and the one new engineers most often miss: **how clean would the revert actually be?** Chapter 2 covered how a messy, overly broad Update Set welds unrelated features together — and that same problem applies here. A deployment with scattered, partially-applied changes across several components can be genuinely harder to cleanly revert than it would be to simply fix forward, because reverting it risks undoing other things that are working correctly, or failing to fully back out everything that changed.

## Putting the decision together

A team facing a broken deployment asks: how bad is this, really — and for how many people? If a fix is already understood and small, how fast can it actually be tested and shipped? And given how this deployment was actually built, would reverting it cleanly undo just the broken piece, or create a second mess on top of the first? The answers, not a fixed rule, determine whether the right move is to revert or to roll forward.

## Key terms

| Term | Meaning |
|---|---|
| Revert | Restoring the exact prior state using a previous Application Repository version, Update Set, or Source Control commit |
| Roll forward | Leaving the deployment in place and shipping a small, targeted corrective fix instead of undoing it |
| Severity and scope | How serious the issue is and how many users or workflows it actually affects |
| Clean revert | A revert that cleanly undoes only the broken change, without undoing other working functionality bundled in the same deployment |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why can a messy, partially-applied deployment actually be harder to cleanly revert than to simply fix forward — and what does that have to do with how the deployment was batched in the first place?
