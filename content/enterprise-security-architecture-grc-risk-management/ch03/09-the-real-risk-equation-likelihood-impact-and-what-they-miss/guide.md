# Lesson 9 — The Real Risk Equation: Likelihood, Impact, and What They Miss

**Chapter 3 · Risk Management Fundamentals · Lesson 1 of 4**

## What you'll learn

- Where "Risk = Likelihood × Impact" actually comes from, and why ISO
  31000 phrases risk more carefully than that shorthand suggests
- What a 5×5 risk matrix is doing mathematically, and why security
  teams still reach for it despite its flaws
- Three specific, well-documented ways the equation misleads you:
  collapsing a distribution into one number, ignoring correlation
  between risks, and hiding how shaky the inputs usually are
- Why none of this means "throw the equation away" — it means knowing
  exactly what it's for

## Where the equation comes from

ISO 31000, the international standard for risk management, defines
risk as "the effect of uncertainty on objectives." That definition is
deliberately abstract — it has to cover financial risk, safety risk,
and project risk, not just cybersecurity. The practical shorthand
nearly every security team actually uses to operationalize that
definition is:

```
Risk = Likelihood × Impact
```

Likelihood is the probability (or frequency) that a given threat
event occurs. Impact is the magnitude of harm if it does. Multiply
them and you get a single number — or, more often in practice, a
single color on a heat map — that lets you rank a pile of risks
against each other and decide what to work on first. That ranking
function is the entire reason the equation exists: a CISO with 200
open findings needs a defensible way to say "these 15 go first,"
and Likelihood × Impact gives them one in about thirty seconds per
row.

## The 5×5 matrix in practice

Most organizations don't multiply raw numbers — they plot Likelihood
(1–5) against Impact (1–5) on a grid, and the cell a risk lands in
determines its color: green, yellow, orange, red. A risk scored
Likelihood 2 / Impact 5 (rare, catastrophic) often lands in the same
color band as Likelihood 4 / Impact 3 (frequent, moderate), even
though those are completely different risk *shapes* that call for
different treatments. The matrix is popular precisely because it's
fast and requires no statistics background — a risk committee can
work through dozens of findings in an hour. That speed is also its
biggest liability, which is the subject of the rest of this lesson.

## What the equation misses #1: it flattens a distribution into one number

Real-world loss isn't a single outcome — it's a range. A ransomware
event might cost an organization $50,000 if caught early, or $8
million if it hits backups and triggers a multi-week outage. "Impact
= 4" erases that entire range and replaces it with a point estimate,
which means two risks that happen to average out to the same score
can have wildly different *tail* risk. A risk with a tight, predictable
range around a medium impact is not the same business problem as a
risk with a long tail of catastrophic-but-rare outcomes, even if a
5×5 matrix scores them identically. This is the single biggest reason
mature risk programs eventually move toward quantitative methods like
FAIR (Lesson 11) that model a *range* of loss instead of a point
score.

## What the equation misses #2: it ignores correlation between risks

Likelihood × Impact is calculated independently, risk by risk. But
real risks aren't independent events. A single vulnerable identity
provider might be the root cause behind a dozen separate "risks" on
a register — a phishing-susceptible admin account, weak MFA
enforcement, and excessive standing privilege can all fire together
in one incident. Scored one at a time, each might look like a
medium risk. In reality, they're the same risk wearing different
hats, and a single control (hardware-key MFA for admins, for
example) might retire three or four register entries at once. A risk
register that never asks "which of these fire together" will
systematically overstate how much risk reduction a long list of small
fixes actually buys, and understate how much one well-placed control
is worth.

## What the equation misses #3: the inputs are genuinely hard to estimate

Likelihood for a security event isn't a measured frequency like an
actuarial table for car accidents — it's usually an informed guess,
often from whoever is in the room during the risk workshop. Ask five
different security engineers to score "likelihood of a successful
phishing-based account compromise this year" and you'll reasonably
get five different numbers, none of which is obviously wrong. Impact
has the same problem: estimating the dollar cost of a breach requires
assumptions about regulatory fines, customer churn, and incident
response costs that nobody has precise numbers for until it actually
happens. The equation doesn't fail because the math is wrong — 2 × 3
genuinely equals 6 — it fails when the organization treats a
soft, consensus-driven guess as if it were a hard measurement.

## So why keep using it at all

None of this makes Likelihood × Impact useless — it makes it a
**triage tool**, not a decision-grade financial model. It's fast,
everyone on a risk committee already speaks its language, and for the
job of sorting 200 findings into "fix this quarter" versus "revisit
next year," a rough ranking is good enough. The mistake isn't using
the simple equation — it's using it for decisions that deserve
better inputs, like a six-figure security investment or a risk
acceptance that a board will be asked to sign. Lesson 10 covers
exactly where that line sits: when qualitative scoring is the right
tool, and when the stakes justify quantitative rigor instead.

## Key terms

| Term | Meaning |
|---|---|
| ISO 31000 | International standard defining risk as "the effect of uncertainty on objectives" — the formal basis for the Likelihood × Impact shorthand |
| Likelihood | The estimated probability or frequency that a specific threat event occurs |
| Impact | The estimated magnitude of harm if a threat event occurs |
| 5×5 risk matrix | A grid plotting Likelihood against Impact (each scored 1–5) into color-coded bands used to triage and rank risks |
| Risk correlation | The degree to which separate "risks" on a register actually share a root cause and would fire, or be fixed, together |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: name
the three specific limitations of Likelihood × Impact covered in this
lesson, and say in one sentence why the equation is still worth using
despite them.
