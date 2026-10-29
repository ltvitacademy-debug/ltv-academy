# Lesson 20 — Phased Recovery and Monitoring for Reinfection

**Chapter 5 · Eradication & Recovery · Lesson 20 of 32**

## What you'll learn

- Why real recovery brings systems back online in priority-ordered phases, not all at once
- How to structure phases around business criticality and validation confidence, using Meridian's own recovery as the example
- What to actually watch for at each phase before approving the next one
- Why a full-speed "just turn it all back on" approach is a real, common, and expensive risk

## Recovery in phases, not a single switch

Validation (Lesson 19) confirms a system is clean enough to go back online. It doesn't mean
every recovered system should go back online at the same moment. Real incident response
recovery is **phased**: systems return to production in priority order, in small groups, with a
pause between each group to confirm nothing's wrong before moving to the next one. The
alternative — restoring everything simultaneously the moment validation passes — trades a
longer, more cautious recovery for a much larger blast radius if validation missed anything, on
any single system, anywhere in the environment.

## How Meridian structured its phases

Meridian's recovery plan grouped systems into three tiers based on business criticality and how
much confidence the team had in each system's validation. **Tier 1** came back first: the
domain controllers and core network infrastructure the rest of the environment depends on,
systems the team had already run full validation against with no findings. **Tier 2** followed,
roughly 24 hours later, once Tier 1 showed no signs of trouble: the billing database server and
the Remote Desktop Gateway itself, the two systems most directly tied to the original
compromise. **Tier 3** came last: general end-user workstations, brought back in batches over
the following two days rather than all 200 at once, so that any one workstation showing
unexpected behavior wouldn't get lost in the noise of everything else coming online
simultaneously.

## What the team watches for at each phase

Each phase isn't just "wait a day and move on" — Meridian's SOC actively watches specific
signals before approving the next tier. New outbound connections from a just-recovered system
to unfamiliar external IPs, any reappearance of the same indicators of compromise from the
original incident (the same scheduled task name, the same account name, the same registry
key), authentication attempts using any of the credentials known to have been exposed during
the compromise, and unusual volume or timing in the recovered system's own log activity
compared to its pre-incident baseline. A clean Tier 1 phase is the evidence that justifies
moving to Tier 2 — not a calendar date, and not pressure from the business to get billing back
online faster.

## Why "turn it all back on" is the risky version

Bringing every system back online at once feels faster, and under business pressure to restore
revenue-generating operations, it's a genuinely tempting shortcut. The risk is that validation,
however careful, is a confidence level, not a guarantee — and if it missed something on any one
system, a full simultaneous restore means that gap is live across the *entire* environment
immediately, with no smaller, earlier signal to catch it first. A phased approach accepts a
slower recovery timeline in exchange for exactly that early-warning capacity: if Tier 1 shows a
problem, Tiers 2 and 3 simply don't go live yet, and the blast radius of a validation miss stays
contained to a handful of systems instead of the whole network.

## Key terms

| Term | Meaning |
|---|---|
| Phased recovery | Bringing systems back into production in priority-ordered groups, with monitoring between each phase, instead of all at once |
| Recovery tier | A priority group of systems recovered together, based on business criticality and validation confidence |
| Indicator of compromise (IOC) recurrence | The reappearance of a known artifact from the original incident — a scheduled task name, account name, or registry key — as a signal of reinfection |
| Blast radius | The scope of systems exposed if a validation gap turns out to be real; phased recovery limits it compared to restoring everything at once |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why does a clean Tier 1
phase, rather than a fixed calendar date, serve as Meridian's actual justification for moving
on to Tier 2?
