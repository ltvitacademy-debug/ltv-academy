# Lesson 21 — Why a Deployment Isn't Done Until It's Documented

**Chapter 6 · Documentation & Handoff · Lesson 21 of 32**

## What you'll learn

- Why undocumented infrastructure is a real, measurable liability — not just an untidy habit
- What actually happens when the person who built an environment leaves, goes on vacation, or
  simply forgets the details six months later
- Why "it works" and "it's deployed" are not the same thing as "it's done"
- How to recognize documentation debt before it costs you a multi-hour outage

## The deployment that only one person understands

Every chapter before this one in this course has been about getting an environment running:
network, compute, storage, monitoring, backup. All of that work is real and necessary — but a
deployment that only runs correctly because one specific person remembers how it's wired together
is not actually finished. It's fragile in a way that doesn't show up until that person is
unavailable.

Picture a small team's cloud environment, built over a few weeks by one engineer. The NSG rules,
the subnet layout, the backup schedule, the alert thresholds — all of it lives in that engineer's
head, decided in the moment and never written down anywhere. The environment runs fine for months.
Then that engineer takes a two-week vacation, and a security rule breaks a vendor integration on
day three. Nobody else on the team knows which NSG rule to touch, why it was configured that way in
the first place, or what else might break if they change it. The fix that should have taken twenty
minutes takes two days of cautious trial and error, because the knowledge needed to do it safely
only existed in one person's memory.

## "Done" has to include documentation

It's tempting to treat documentation as a nice-to-have that happens "later, if there's time." In
practice, later rarely comes, and the gap it leaves isn't cosmetic — it's operational risk. A
resource group with no diagram, no notes on why a subnet is sized the way it is, and no record of
who to call when something breaks is a liability sitting quietly in production, waiting for the
one person who understands it to be unreachable at the wrong moment.

This is why professional teams treat documentation as part of the **definition of done** for a
deployment, not a separate task that comes after. An environment isn't done when it's running —
it's done when someone *other than the person who built it* could understand it, operate it, and
safely change it. That's a higher bar than "it works," and it's the bar this chapter is built
around.

## The six-month test

A useful gut check: imagine the engineer who built this environment is unreachable, and six months
have passed. Would anyone else on the team be able to answer basic questions — why this subnet is
sized this way, why this VM has this specific role, where the backup job's logs land — without
guessing or reverse-engineering the whole thing from scratch? If the honest answer is no, the
deployment has documentation debt, and that debt gets collected at the worst possible time: during
an incident, under time pressure, with the one person who could have answered quickly unavailable.

## Key terms

| Term | Meaning |
|---|---|
| Documentation debt | The gap between what an environment actually does and what's written down about it — like technical debt, it compounds until something forces you to pay it off |
| Bus factor | The number of people who could leave or become unavailable before a team loses the ability to operate something — a bus factor of 1 is a real risk |
| Tribal knowledge | Operational knowledge that exists only in people's heads, never written down, and so can't be transferred reliably |
| Definition of done | The agreed bar a piece of work must meet before it's considered complete — for a deployment, that includes being documented, not just running |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why does an environment with a
bus factor of 1 represent real operational risk, even while it's running perfectly well day to
day?
