# Lesson 11 — FAIR (Factor Analysis of Information Risk) in Practice

**Chapter 3 · Risk Management Fundamentals · Lesson 3 of 4**

## What you'll learn

- What FAIR actually is: a published, structured quantitative risk
  methodology, not an in-house spreadsheet trick
- The top-level FAIR equation — Loss Event Frequency × Loss
  Magnitude — and how it decomposes into real sub-factors
- What each sub-factor means in practice, with a worked example
- Where FAIR fits against the qualitative-vs-quantitative line drawn
  in Lesson 10, and what it takes to actually run it

## FAIR is a published standard, not a shortcut

FAIR — Factor Analysis of Information Risk — is a formal, published
quantitative risk model, originally developed by Jack Jones and now
maintained as an open standard (the FAIR model is managed by the FAIR
Institute, and VALIT/The Open Group publishes it as "O-RA," the Open
Group Risk Analysis standard). That lineage matters: FAIR isn't a
loose label for "any time we put a dollar figure on a risk." It's a
specific, decomposed model with defined terms, meant to be applied
the same way by different analysts and still produce comparable
results — exactly the property Lesson 10 said ad hoc quantitative
guessing lacks.

## The top-level equation

FAIR's core equation is:

```
Risk = Loss Event Frequency (LEF) × Loss Magnitude (LM)
```

Loss Event Frequency is how often, over a given period, an
organization expects a specific loss event to actually occur. Loss
Magnitude is how much that event costs when it does. This looks like
a more precise cousin of Likelihood × Impact from Lesson 9 — and it
is — but FAIR's real value is that it doesn't stop there. It breaks
each side down into measurable sub-factors instead of asking an
analyst to guess "Likelihood" and "Impact" directly.

## Decomposing Loss Event Frequency

FAIR splits LEF into two sub-factors:

- **Threat Event Frequency (TEF)** — how often a threat actor
  actually attempts the action in question (for example, how often
  attackers attempt credential-stuffing attacks against a given
  login portal in a year).
- **Vulnerability** — the probability that a given attempt actually
  succeeds, given the controls in place (for example, the probability
  a credential-stuffing attempt succeeds given the MFA enforcement
  currently in place).

Multiplying those gives LEF: how often a successful loss event is
expected to happen, not just how often someone tries.

## Decomposing Loss Magnitude

FAIR splits Loss Magnitude into:

- **Primary Loss** — the direct cost of the event itself: incident
  response hours, forensics, system replacement, immediate productivity
  loss.
- **Secondary Loss** — losses that follow from other parties reacting
  to the event, further broken into **Secondary Loss Event Frequency**
  (how often a primary loss event actually triggers secondary
  consequences — not every breach triggers a lawsuit) and
  **Secondary Loss Magnitude** (how large those consequences are when
  they do happen — regulatory fines, customer churn, legal costs,
  reputational damage).

That secondary-loss split is one of FAIR's most useful contributions:
it forces an analyst to separate "what did the event itself cost" from
"what did other people's reactions to the event cost," which are
driven by completely different factors and often estimated by
completely different experts.

## A worked example

Take the scenario from Lesson 10: credential-stuffing against a
customer login portal.

- Threat Event Frequency: attackers attempt this roughly 50 times a
  year against portals like this one (estimated from threat intel
  and past logs).
- Vulnerability: given current MFA coverage, maybe 2% of attempts
  succeed.
- → Loss Event Frequency: roughly 1 successful compromise per year.
- Primary Loss: incident response and account remediation, estimated
  at $15,000–$40,000 per event.
- Secondary Loss Event Frequency: of events like this, maybe 30%
  trigger a regulatory notification requirement.
- Secondary Loss Magnitude, when triggered: $200,000–$900,000 in
  fines, notification costs, and churn.

Each range gets run through a model (FAIR typically uses Monte Carlo
simulation over these ranges rather than single-point multiplication)
to produce a distribution of expected annual loss — directly
addressing the "flattens a distribution into one number" problem from
Lesson 9, because the output is a range with a confidence interval,
not a point score.

## Where FAIR actually fits

FAIR is quantitative risk assessment done properly — it's the
structured version of what Lesson 10 described as "slower but
comparable." It takes real inputs (threat intel, control effectiveness
data, loss history, subject-matter-expert estimates) and real time to
run, which is exactly why organizations reserve it for the handful of
risks that matter enough to justify that effort: a major investment
decision, a cyber-insurance conversation, or a risk a board wants
quantified in dollars rather than colors. It is not a replacement for
the qualitative matrix that triages the other 190 items on the
register — it's the tool you reach for once qualitative scoring has
already told you which ten risks deserve this level of rigor.

## Key terms

| Term | Meaning |
|---|---|
| FAIR | Factor Analysis of Information Risk — a published, structured quantitative risk model maintained by the FAIR Institute (also published as The Open Group's O-RA standard) |
| Loss Event Frequency (LEF) | How often a specific loss event is expected to actually occur, decomposed into Threat Event Frequency × Vulnerability |
| Loss Magnitude (LM) | How much a loss event costs when it occurs, decomposed into Primary Loss and Secondary Loss |
| Threat Event Frequency (TEF) | How often a threat actor attempts the action in question, independent of whether it succeeds |
| Secondary Loss | Losses driven by other parties' reactions to an event (regulators, customers, media), split into frequency and magnitude of those reactions |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: name
the four sub-factors FAIR decomposes Loss Event Frequency and Loss
Magnitude into, and say why splitting Secondary Loss into frequency
and magnitude matters.
