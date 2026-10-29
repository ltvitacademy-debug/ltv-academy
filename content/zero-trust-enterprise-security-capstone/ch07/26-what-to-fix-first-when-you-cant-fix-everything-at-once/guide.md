# Lesson 26 — What to Fix First When You Can't Fix Everything at Once

**Chapter 7 · Building a Zero Trust Roadmap · Lesson 2 of 4**

## What you'll learn

- A two-axis framework — risk and feasibility — for deciding what to
  fix first when you cannot fund or staff every gap at once
- How to score "risk" for a zero trust gap honestly, instead of
  defaulting to whichever control is loudest in the news
- How to score "feasibility" so a prioritization exercise doesn't just
  reward whatever is politically easiest
- Why "highest risk, highest feasibility" beats both "highest risk
  only" and "easiest only" as a starting rule

## The real constraint

Lesson 25's three horizons assume you can eventually fund all of it.
Most real security programs can't — not this quarter, maybe not this
year. Budget gets cut, a reorg eats half the team, a compliance
deadline forces an unplanned detour. When that happens, "do everything
in the roadmap, in order" stops being an option, and you need a way to
pick the next thing to actually fix that isn't just whoever asked
loudest in the last incident review.

## Two axes: risk and feasibility

**Risk** is the honest answer to: if this gap stays open, how much
does it actually increase the chance or impact of a bad outcome? That
means scoring the gap on both likelihood (how exposed is this, how
many ways can it be reached) and impact (what's actually behind it —
a test environment, or production customer data). A gap that sounds
alarming in a vendor's marketing but sits behind three other controls
scores lower than it sounds. A gap that sounds boring — a shared
service account with no expiration — but sits directly in front of
production data, scores higher than it sounds.

**Feasibility** is the honest answer to: can this actually ship soon,
given the budget, staffing, and dependencies you have right now, not
the ones you wish you had? A fix that's technically simple but
requires three other teams to migrate their apps first is low
feasibility this quarter, even if the ticket itself is one line. A fix
that's technically involved but entirely within the security team's
own control is higher feasibility than its complexity would suggest.

## The quadrant, and why both axes matter

Plot every open gap on those two axes and four groups fall out:

- **High risk, high feasibility** — fix these first. They are the
  actual priority list, not the biggest or the loudest items, the
  ones that are both dangerous and shippable right now.
- **High risk, low feasibility** — don't ignore these; unblock them.
  The action here is removing the dependency or getting the budget,
  not quietly letting the gap sit because it's hard.
- **Low risk, high feasibility** — batch these as the quick wins from
  Lesson 25. Worth doing, but never at the expense of a high-risk item
  that's also shippable.
- **Low risk, low feasibility** — park these explicitly, in writing,
  with the reason. "We're not fixing this now because X" is a
  defensible answer; silently never getting to it is not.

Scoring only on risk produces a roadmap full of correct-but-unshippable
ideas. Scoring only on feasibility produces a roadmap that fixes
everything easy and leaves the dangerous, hard stuff exactly where it
was. The combination is what makes the list defensible to the people
funding it.

## A note on illustrative use

Treat any specific example here — a shared service account, an
unpatched edge device — as illustrative only, a stand-in for the
category of gap, not a record of a real incident at any real
organization.

## Key terms

| Term | Meaning |
|---|---|
| Risk score | A gap's estimated likelihood and impact if left unaddressed, independent of how hard it is to fix |
| Feasibility score | How realistically a fix can ship now, given current budget, staffing, and dependencies |
| Quadrant prioritization | Ranking by risk and feasibility together, not either one alone |
| Parked gap | A known, documented, low-priority gap that is explicitly deferred rather than silently ignored |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why
does scoring risk alone, or feasibility alone, produce a worse roadmap
than scoring both together, and what's the right response to a
high-risk, low-feasibility gap?
