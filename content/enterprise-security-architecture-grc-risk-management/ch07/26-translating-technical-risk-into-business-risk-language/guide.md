# Lesson 26 — Translating Technical Risk into Business Risk Language

**Chapter 7 · Security Metrics and Board Reporting · Lesson 2 of 4**

## What you'll learn

- Why a CVSS score, on its own, tells an executive almost nothing about
  whether they should care
- A real translation chain for turning a technical finding into a
  business consequence: finding → threat scenario → business impact →
  dollar range
- How to use FAIR's two primary drivers — Loss Event Frequency and Loss
  Magnitude — to turn that dollar range into something defensible, not
  guessed
- Why risk heat maps alone can mislead, and why a quantitative range
  from Chapter 3 is a stronger foundation for this translation

## Why CVSS doesn't survive the trip to the boardroom

CVSS (the Common Vulnerability Scoring System) is a genuinely useful
tool for prioritizing patching work — it tells an engineer how severe
a vulnerability is in technical terms: exploitability, attack
complexity, what privileges it requires. But a "CVSS 9.8 critical
remote code execution vulnerability" means nothing to someone whose job
is allocating capital and overseeing enterprise risk, because it
doesn't answer the only question that audience actually has: what
happens to this business if this goes wrong? CVSS was never designed
to answer that question, and treating it as if it does is one of the
most common failures in security reporting.

## The translation chain

The fix is a deliberate, repeatable chain that moves a finding through
four stages:

1. **Technical finding** — what was actually found. "Unpatched critical
   RCE vulnerability (CVSS 9.8) on the public-facing checkout service."
2. **Threat scenario** — what a realistic attacker does with it. "An
   attacker exploits this to deploy ransomware against the checkout
   environment during a seasonal peak period."
3. **Business consequence** — what that scenario actually costs the
   business, in categories executives already track: lost revenue from
   downtime, regulatory exposure, contractual penalties, reputational
   damage, and incident response and recovery cost.
4. **Dollar range** — a quantified exposure estimate, produced with
   FAIR, not a guess or a single point figure.

Worked through: "Ransomware taking checkout offline for three days
during peak season costs an estimated $X–$Y in lost revenue, and
because cardholder data may be affected, likely triggers mandatory
breach notification and contractual penalties from the payment
processor under PCI DSS." That sentence is understandable to a CFO, a
general counsel, and a board member — none of whom need to know what
CVSS is to grasp why this finding matters.

## FAIR: turning the scenario into a defensible number

Chapter 3, Lesson 11 introduced FAIR (Factor Analysis of Information
Risk) as the leading quantitative risk model. It's the tool that makes
step 4 of the translation chain rigorous rather than invented. FAIR
breaks risk into two primary drivers, each estimated as a probable
range rather than a single guess:

- **Loss Event Frequency (LEF)** — how often this kind of loss event is
  likely to happen in a given period, based on threat capability and
  the organization's actual resistance strength (patch status,
  compensating controls, exposure).
- **Loss Magnitude (LM)** — how much a single event costs if it
  happens, split into **primary loss** (direct costs: incident
  response, system replacement, lost productivity) and **secondary
  loss** (knock-on costs: regulatory fines, legal settlements,
  reputational damage, customer attrition).

Running estimated ranges for both through a Monte Carlo-style
simulation produces a probable annualized loss exposure range — for
example, "$400,000–$2.1M in annual expected loss from this vulnerability
class" — a number a board can directly weigh against the cost of
remediation or against other enterprise risks competing for the same
budget.

## Why heat maps alone aren't enough

Many organizations communicate risk with a red/yellow/green 5x5 heat
map plotting likelihood against impact. Heat maps are easy to produce
and easy to glance at, which is exactly why they're common — but risk
analysts (notably Tony Cox's widely cited critique of risk matrices)
have pointed out a real weakness: they create a false sense of
precision, compress very different risks into the same colored cell,
and give no sense of the actual range of financial exposure involved.
A heat map can still be a useful at-a-glance summary layer, but the
substance underneath it — the number that actually drives a budget or
risk-acceptance decision — should come from a quantitative method like
FAIR, not from where a dot lands on a grid.

## Key terms

| Term | Meaning |
|---|---|
| CVSS | Common Vulnerability Scoring System — a technical severity score; useful for engineering prioritization, not business communication |
| Threat scenario | The realistic story of how a threat actor would actually exploit a finding — the bridge between a technical finding and its business consequence |
| Loss Event Frequency (LEF) | FAIR's estimate of how often a loss event of a given type is likely to occur, as a range |
| Loss Magnitude (LM) | FAIR's estimate of a single event's cost, split into primary loss (direct) and secondary loss (knock-on, e.g. fines and reputational damage) |
| Risk heat map | A likelihood-by-impact grid used for at-a-glance communication; prone to false precision when used as the sole basis for a decision |

## Check yourself

You're ready for Lesson 27 when you can take one real vulnerability
from your own environment and walk it through all four stages of the
translation chain out loud, ending in an estimated dollar range —
without using the word "CVSS" anywhere in the business-consequence
sentence.
