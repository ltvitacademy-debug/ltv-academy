# Lesson 29 — Lab: Designing a Security Architecture for a Regulated Enterprise

**Chapter 8 · Capstone: Designing a Security Architecture and GRC Program · Lesson 29 of 32**

## What you'll learn

- How to build a SABSA-style Business Attributes Profile for a real, regulated
  fictional company, instead of starting a design with technology choices
- How to carry those attributes down through SABSA's layers into a concrete
  defense-in-depth architecture, so every layer earns a specific, named reason
  to exist
- How to make the business-alignment case for each layer — what it costs,
  what business attribute it protects, and what happens if it's skipped
- Why this is the actual job difference from Lesson 1: an engineer builds the
  control; an architect decides which controls the business needs and why

## The scenario: Meridian Specialty Lending

Meridian Specialty Lending is a fictional mid-size, non-bank consumer lender.
It takes credit card payments for loan servicing fees (bringing it into PCI
DSS scope), stores and processes applicants' financial and identity data
subject to state financial-privacy statutes, and is being asked by its three
largest institutional investors to produce a clean SOC 2 Type II report before
the next funding round closes. Meridian's CISO has been handed one mandate:
design the security architecture this growing, regulated company actually
needs — not a generic best-practices checklist, and not whatever the last
vendor demo recommended. This lab builds that architecture using the SABSA
discipline from Chapter 2, the layered-defense thinking from Chapter 1, and
the business-alignment reasoning that separates an architect's design from an
engineer's control list.

## Step 1 — Build the Business Attributes Profile first

Before naming a single product, sit with Meridian's actual business drivers
and write down the attributes security has to serve:

| Attribute | Plain-language meaning | Measurable target |
|---|---|---|
| Regulatory standing | Stay eligible to process card payments and hold financial data under state law | Zero PCI DSS or state-privacy findings that block operations |
| Investor confidence | Pass institutional due diligence without a qualified SOC 2 opinion | Clean SOC 2 Type II report, no material exceptions |
| Operational resilience | Loan servicing and payment processing stay up through a routine incident | 99.9% uptime on the payment path |
| Cost discipline | Security spend has to scale with a mid-size lender's revenue, not an enterprise bank's | Security spend held under a board-approved ceiling as a share of revenue |

Every layer built in the rest of this lab has to trace back to one of these
four rows. An attribute a stakeholder never agreed to is a sign the profile
needs revisiting, not a reason to add a control anyway.

## Step 2 — Translate attributes into a conceptual strategy

At SABSA's Conceptual layer, each attribute becomes a strategy statement:

- Regulatory standing → segment and tightly control everything that touches
  cardholder data and applicant PII, so the compliance boundary is small and
  defensible
- Investor confidence → build controls that generate their own evidence
  continuously, not controls a team scrambles to document right before an
  audit
- Operational resilience → no single control failure should take down the
  payment path
- Cost discipline → prioritize controls that satisfy more than one attribute
  at once over point solutions that satisfy only one

## Step 3 — Design the defense-in-depth layers against those attributes

This is where Chapter 1's layered model becomes a real design, not a
diagram. Each layer is written with the attribute it serves named explicitly:

```
Perimeter / network edge
  WAF + rate limiting in front of the loan-servicing payment portal
  Serves: Regulatory standing (PCI DSS network segmentation requirement),
          Operational resilience (absorbs abusive traffic before it reaches
          the payment path)

Network segmentation
  Cardholder-data environment (CDE) on its own VLAN, isolated from
  corporate IT and HR systems
  Serves: Regulatory standing (shrinks PCI DSS audit scope to the CDE only)

Identity and access
  Role-based access to the loan-servicing platform; privileged access to
  the CDE requires hardware-key MFA and is logged continuously
  Serves: Regulatory standing, Investor confidence (continuous evidence,
          not a pre-audit scramble)

Endpoint and application
  EDR on every workstation that can reach the CDE; code review and SAST
  gating on the payment-portal codebase
  Serves: Operational resilience, Regulatory standing

Data
  Cardholder data tokenized at intake; applicant PII encrypted at rest
  with keys held outside the application tier
  Serves: Regulatory standing, Cost discipline (tokenization shrinks what
          the CDE itself has to store, which shrinks everything built
          around it)

Monitoring and response
  SIEM correlation across the CDE and identity layers, feeding the same
  incident response process built in the Job-Ready Foundation stage
  Serves: Operational resilience, Investor confidence
```

## Step 4 — Make the business-alignment case, not just the technical one

For the one layer most likely to get cut in a budget review — tokenization —
write the actual argument a CISO would bring to Meridian's board:

> Tokenizing cardholder data at intake costs real engineering time now, but it
> removes raw card numbers from everything downstream of the intake point.
> That shrinks the PCI DSS cardholder-data environment to a small, auditable
> boundary instead of every system that ever touches a payment — which is
> the single biggest lever Meridian has over both audit cost (Regulatory
> standing) and ongoing security spend (Cost discipline) at the same time.

That's the deliverable this lab is really teaching: a line any business
stakeholder can follow from a dollar amount to a named attribute, without
needing to understand the technology underneath it.

## Step 5 — Write the one-page architecture decision record

Close the lab the way a real architecture review would, with a short record
that could go into Meridian's GRC program as-is:

```
Decision: Segment the CDE on its own VLAN and tokenize cardholder data
          at intake.
Driver:   Regulatory standing, Cost discipline (Business Attributes Profile)
Alternative considered: Leave the CDE flat within the general network and
          rely on application-layer controls alone.
Why rejected: A flat network means a single compromised workstation could
          reach cardholder data directly; PCI DSS scope would cover the
          entire corporate network instead of one isolated segment.
Owner: CISO · Review date: next annual architecture review
```

## Key terms

| Term | Meaning |
|---|---|
| Business Attributes Profile | The stakeholder-agreed list of business needs every architecture decision has to trace back to |
| Cardholder Data Environment (CDE) | The systems, people, and processes that store, process, or transmit card data — the thing PCI DSS actually scopes |
| Tokenization | Replacing sensitive data with a non-sensitive substitute at the earliest point of capture, shrinking compliance scope downstream |
| Architecture decision record | A short, dated written record of a design decision, its driver, the alternative considered, and why it was rejected |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: which
single design decision in this lab satisfies more than one of Meridian's four
business attributes at once, and why that kind of decision should be
prioritized over a point solution that only satisfies one?
