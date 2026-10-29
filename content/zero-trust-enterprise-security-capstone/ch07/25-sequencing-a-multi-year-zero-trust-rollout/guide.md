# Lesson 25 — Sequencing a Multi-Year Zero Trust Rollout

**Chapter 7 · Building a Zero Trust Roadmap · Lesson 1 of 4**

## What you'll learn

- Why a zero trust program is a multi-year effort, not a single project
  with a single launch date
- The difference between quick wins, foundational work, and long-haul
  initiatives, and why each one earns its place in the sequence
- The real dependencies between phases — which pieces of earlier
  chapters have to exist before later ones can work at all
- How to read, and build, a roadmap that survives contact with a real
  budget cycle and a real org chart

## Why sequencing is the hard part

Everything covered so far in this course — explicit identity
verification, least-privilege segmentation, assume-breach containment,
data/app-layer controls, and a maturity model to measure all of it —
describes the destination. None of it tells you what to build first,
second, or in year three. That's the gap this lesson closes: a zero
trust program spans multiple budget cycles, multiple reorgs, and
usually more than one CISO, so the roadmap has to be ordered on
purpose, not just a backlog of good ideas you get to whenever there's
time.

## Three horizons, not one big phase

A workable rollout sorts work into three horizons:

**Quick wins (roughly the first six months).** Changes that reduce
real risk without a multi-year identity or segmentation project
underneath them: enforcing MFA everywhere it isn't yet, tightening the
riskiest standing admin roles, turning on conditional access policies
the tenant already licenses. These earn credibility and budget for
what comes next — they are not the program itself.

**Foundational work (roughly months six through eighteen).** This is
where identity becomes the real control plane — continuous access
evaluation, device compliance signals, a working PIM/conditional-access
fabric — and where network segmentation starts replacing the flat
network. Foundational work is slow and mostly invisible to anyone
outside the security team, which is exactly why it has to be sequenced
early: everything after it depends on it existing.

**Long-haul initiatives (eighteen months and beyond).** Workload
identity for CI/CD, zero trust for every internal API, SaaS security
posture management across dozens of applications — these only make
sense once the identity and segmentation foundation is load-bearing.
Starting them early just means rebuilding them later.

## The dependency problem

The reason horizon order isn't arbitrary is dependency. Micro-
segmentation (Chapter 3) is close to meaningless without the identity
signals from Chapter 2 feeding its policy decisions — you can't make a
segment-level access decision on "who is this and is their device
compliant" if that signal doesn't exist yet. Data-centric and API-level
controls (Chapter 5) assume a segmentation layer is already in place
to contain what happens if one of those controls fails. And none of
the maturity scoring from Chapter 6 means anything if it's measuring a
program whose foundational layer isn't built yet — you'd be scoring
the quick wins and calling it done.

In practice this means: identity work has to lead, segmentation
follows identity, and data/app/workload-level controls follow
segmentation. A roadmap that puts a flashy SaaS security initiative in
year one while continuous access evaluation is still "backlogged" is
sequenced backwards, even if every individual initiative on it is a
good idea.

## Building the sequence on paper

A real multi-year roadmap names, for each initiative: which horizon it
belongs to, which earlier initiative it depends on, and what
specifically will be different for users and attackers once it ships —
not "implement conditional access" but "standing admin access to
production is gone; elevation requires justification and expires in
four hours." That last part matters because it's what Lesson 28 in
this chapter will ask you to defend against: a roadmap item that ships
without changing what an attacker can actually do.

## Key terms

| Term | Meaning |
|---|---|
| Quick win | A near-term change that reduces real risk without requiring the foundational identity/segmentation work to exist first |
| Foundational work | The identity and segmentation layer that most later zero trust controls depend on to function |
| Long-haul initiative | Workload identity, API-level, and SaaS-posture work that only becomes effective once the foundation is in place |
| Roadmap dependency | A requirement that one initiative be functioning before a later one can produce its intended effect |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
does identity work have to be sequenced before segmentation work, and
what breaks if a long-haul initiative is started before its
foundational dependency exists?
