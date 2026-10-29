# Lesson 23 — Metrics That Prove Zero Trust Is Working, Not Just Implemented

**Chapter 6 · Measuring Zero Trust Maturity · Lesson 23 of 4**

## What you'll learn

- The difference between an **implementation metric** ("we deployed
  it") and an **outcome metric** ("it's reducing real risk") — and
  why maturity scoring from Lesson 22 still isn't proof of the
  second
- Concrete, measurable outcome metrics for identity, network, and
  data risk that a security engineer can actually instrument
- Why mean-time-to-detect lateral movement is one of the single best
  zero-trust outcome metrics that exists
- How to build a simple before/after metric table that survives
  scrutiny from someone who doesn't trust the project yet

## Implementation metrics vs. outcome metrics

"We rolled out Conditional Access to 100% of users" is a real,
useful fact. It is also not evidence that zero trust is *working* —
it's evidence that a project finished. A rollout can hit 100%
coverage and still leave an attacker's path to lateral movement
essentially unchanged, if the policies that got deployed were loose,
or if privileged accounts were exempted "temporarily" and never
revisited.

**Implementation metrics** answer "did we build it?" — percent of
endpoints enrolled, number of segmentation policies written, whether
MFA is enabled. They matter, but a skeptical CISO, auditor, or board
member has learned to distrust them, because they can be true while
risk stays flat.

**Outcome metrics** answer "did real risk go down?" — and they're
what this lesson is actually about. The discipline is the same one
from Lesson 22: measure the behavior and its effect, not the
checkbox.

## Outcome metrics worth instrumenting

**Standing privileged access.** Count how many accounts hold
always-on administrative rights at any given moment, and track it
over time. A mature PAM/JIT rollout drives this number down hard —
from "200 accounts are domain admins right now" to "3 accounts are
domain admins right now, and the rest request it for 30 minutes when
they need it." This single number correlates directly with blast
radius if any one account is compromised.

**Mean time to detect lateral movement (MTTD).** Run a controlled
exercise — a red team move, a tabletop, or a detection test using a
known technique — and measure how long it takes your monitoring to
flag the movement from one host or identity to the next. Before
micro-segmentation and identity-aware logging, this is often measured
in days. After it, measured in minutes, because the activity itself
now crosses a boundary that generates a signal, instead of moving
invisibly across a flat network. This is arguably the cleanest single
proof point that zero trust changed your actual exposure, because it
measures the thing an attacker needs most — time — directly.

**Percent of traffic actually verified vs. implicitly trusted.**
For a given environment, what share of east-west and north-south
traffic passes through an explicit policy decision point (identity-
and device-aware) versus what share is simply allowed because it
originated inside a trusted zone? Moving this number from, say, 15%
explicitly verified to 85% is a direct measure of how much of the
old "trust the network, not the request" model is actually gone.

**Phishing-resistant MFA coverage, by population, not blended.**
Report admin accounts, standard users, and service/non-human
identities separately. A blended "92% MFA coverage" figure can hide
that every admin account is still on a phishable factor.

**Mean time to revoke access after a role or employment change.**
Measures whether least-privilege is enforced continuously or decays
— a classic zero-trust failure mode is access that was correct on
day one and wrong, unnoticed, a year later.

**Segmentation policy violations caught, not just policies written.**
Count actual denied/flagged cross-segment attempts over time. A
rising count right after rollout is often a *good* sign — it means
the segmentation is actually doing something, not that something is
wrong.

## Building a before/after table

The format that survives scrutiny is simple and unglamorous:

| Metric | Before | After | What changed |
|---|---|---|---|
| Standing domain admin accounts | 200 | 3 | PAM + JIT elevation |
| MTTD for simulated lateral movement | 4 days | 22 minutes | micro-segmentation + identity-aware logging |
| Traffic through an explicit policy decision | 15% | 85% | SDP replacing flat VPN access |

Notice what's absent: no acronyms doing the explaining, no "we're
now zero trust" claim, and no single metric asked to carry the whole
story. Three independent numbers, each with a believable mechanism
attached, is far more convincing than one impressive-sounding
composite score.

## Key terms

| Term | Meaning |
|---|---|
| Implementation metric | Measures whether a control was deployed (coverage %, policy count) — proves effort, not effect |
| Outcome metric | Measures whether real risk changed as a result (MTTD, standing access, verified traffic %) |
| MTTD (mean time to detect) | Average time between an event occurring and your monitoring flagging it — here, specifically for lateral movement |
| Blended metric | A single aggregate figure (e.g. overall MFA coverage) that can hide a weak subgroup — report by population instead |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking:
why is "100% Conditional Access rollout" an implementation metric
rather than an outcome metric, and what outcome metric would you
measure instead to prove that rollout actually reduced risk?
