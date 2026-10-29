# Lesson 12 — Risk Registers and Treatment: Accept, Mitigate, Transfer, Avoid

**Chapter 3 · Risk Management Fundamentals · Lesson 4 of 4**

## What you'll learn

- The four real risk treatment options defined by ISO 31000 — accept,
  mitigate, transfer, avoid — and what each one actually commits an
  organization to
- Why "transfer" usually means insurance or a contract clause, not
  magically making risk disappear
- What a risk register actually is, as the tracking artifact that
  makes a treatment decision real instead of a conversation nobody
  remembers
- How this lesson closes the loop on Chapter 3: score the risk
  (Lessons 9–11), then decide what to do about it, then track that
  decision

## Scoring a risk is only half the job

Every method covered so far in this chapter — Likelihood × Impact,
qualitative High/Medium/Low, FAIR's quantitative loss exposure — ends
with a number or a label attached to a risk. None of that actually
changes anything on its own. A scored risk still has to go through a
**treatment decision**: what, specifically, is the organization going
to do about it? ISO 31000 names four options, and nearly every real
risk management program uses this same vocabulary.

## Accept

Accepting a risk means the organization formally decides to take no
further action, because the cost of treating it exceeds the benefit,
or because the risk already sits within the organization's defined
risk appetite. Acceptance isn't the same as ignoring a risk — a real
risk acceptance is a documented decision, usually requiring sign-off
from someone with the authority to own that outcome (a business
owner, a CISO, sometimes a board for the largest exposures). "We know
about this, we've decided the fix isn't worth it right now, and here's
who approved that" is acceptance done correctly. A risk nobody
decided to accept, that just sat unaddressed because no one got to
it, is not acceptance — it's an unmanaged gap, and the distinction
matters enormously in an audit.

## Mitigate

Mitigation means reducing either the likelihood of a risk occurring,
its impact if it does, or both — by implementing a control. Rolling
out hardware-key MFA to reduce the likelihood of successful credential
theft, or improving backup immutability to reduce the impact of a
ransomware event, are both mitigation. Mitigation is the default
instinct for most security teams, and it's usually the right one, but
it's not free: every control has an implementation cost, an ongoing
operational cost, and often a usability cost, which is exactly why
Lesson 10's quantitative question — is this risk worth spending this
much to reduce — exists in the first place.

## Transfer

Transferring a risk means shifting the financial consequence of it to
another party — it does not make the underlying risk disappear. The
two most common mechanisms are cyber-insurance policies, which pay
out (subject to policy terms, exclusions, and often a prerequisite
level of security controls) if a covered event occurs, and contractual
risk allocation, such as requiring a vendor to carry liability for a
breach of data the vendor holds on your behalf, or negotiating an
indemnification clause. Transfer is a genuinely useful tool for risks
that are expensive but survivable, but it has real limits: insurers
exclude plenty of scenarios, payouts have caps, and a vendor's
indemnification clause is only worth as much as that vendor can
actually pay.

## Avoid

Avoiding a risk means eliminating the activity or exposure that
creates it entirely — not reducing it, removing it. Deciding not to
launch a product feature that would require storing a new category of
regulated data, decommissioning a legacy system that can't be
adequately secured instead of trying to patch around it forever, or
declining to operate in a jurisdiction with regulatory requirements
the organization can't meet, are all avoidance. It's the most complete
treatment and often the cheapest in the long run, but it's also the
one most likely to conflict with a business goal, which is why it
usually requires a business decision-maker, not just a security one.

## The risk register: where the decision actually lives

A **risk register** is the artifact — in practice usually a
spreadsheet or a dedicated GRC tool (Lesson 15 covers tooling) — that
tracks every identified risk alongside its score, its owner, its
chosen treatment, the status of that treatment, and a review date.
A minimally complete risk register row includes: a description of the
risk, its likelihood/impact or quantified loss exposure, the business
or system owner, the treatment decision (accept/mitigate/transfer/
avoid), specific actions and deadlines if mitigating, and a scheduled
review date because risk scores and business context both change over
time. Without a register, a treatment decision is a conversation that
happened once in a meeting — easily forgotten, impossible to audit,
and invisible to the next person who inherits the risk. With one, the
decision is a tracked, ownable, revisitable fact, which is exactly
what turns risk management from a one-time exercise into an ongoing
program — the subject Chapter 4 picks up directly.

## Key terms

| Term | Meaning |
|---|---|
| Risk treatment | The decision of what to do about a scored risk: accept, mitigate, transfer, or avoid (ISO 31000's four options) |
| Risk acceptance | A documented, authorized decision to take no further action on a risk, distinct from an unmanaged gap no one decided about |
| Risk transfer | Shifting the financial consequence of a risk to another party via insurance or contract, without eliminating the underlying risk |
| Risk avoidance | Eliminating the activity or exposure that creates a risk entirely, rather than reducing it |
| Risk register | The tracking artifact listing every identified risk with its score, owner, treatment decision, action status, and review date |

## Check yourself

You're ready for Chapter 4 when you can explain, without looking: the
difference between a real risk acceptance and an unmanaged gap, and
why risk transfer doesn't eliminate the underlying risk even though it
changes who pays for it.
