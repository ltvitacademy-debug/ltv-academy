# Threat Modeling Basics

Shifting security left means asking "what could go wrong?" before a single line of code exists. Threat modeling is the structured way to ask that question. This lesson walks through the core idea using Northbridge Retail's new checkout service as the running example — a system that accepts customer payment details, which makes it exactly the kind of system you'd want to threat model before building.

## What you'll learn

- What a threat model is and why teams build one before, not after, writing code
- How to diagram a system's trust boundaries and data flows
- The STRIDE framework for categorizing threats
- Why "where does data cross a trust boundary" is the single most useful question in threat modeling

## What a threat model actually is

A threat model is a structured answer to four questions, usually asked in this order:

1. What are we building? (a diagram of the system)
2. What can go wrong? (a list of threats against that diagram)
3. What are we going to do about it? (mitigations, prioritized)
4. Did we do a good enough job? (a review, repeated as the system changes)

The first question matters more than it sounds. You cannot threat model a system you haven't diagrammed, because the diagram is what reveals where the actual risk concentrates: at the edges, where data moves between things that trust each other differently.

## Trust boundaries and data flow diagrams

Draw Northbridge Retail's checkout flow as boxes and arrows: a customer's browser, the checkout web service, a payment processing API, an order database, and an inventory service. Now draw a dashed line anywhere the level of trust changes — between the public internet and Northbridge's network, between the checkout service and the payment processor, between an authenticated customer session and an internal admin tool. Those dashed lines are **trust boundaries**, and every arrow that crosses one is a place an attacker would look first.

A data flow diagram (DFD) is just that picture, made precise: every box is a process or data store, every arrow is data in motion, and every boundary-crossing arrow gets scrutinized. Most real threat modeling value comes from this step alone — teams are often surprised by how many trust boundaries their own system quietly crosses once it's drawn out.

## STRIDE: a vocabulary for "what can go wrong"

Once the diagram exists, STRIDE gives you six categories of threat to check against each boundary-crossing element:

- **S**poofing — can someone pretend to be a legitimate user, service, or component?
- **T**ampering — can someone modify data or code in transit or at rest?
- **R**epudiation — can someone deny having taken an action, with no way to prove otherwise?
- **I**nformation disclosure — can someone see data they shouldn't?
- **D**enial of service — can someone make the system unavailable to legitimate users?
- **E**levation of privilege — can someone gain capabilities they shouldn't have?

Applied to the checkout service: could an attacker spoof the payment processor's API responses (Spoofing)? Could checkout request data be tampered with in transit if TLS isn't enforced (Tampering)? Could a customer deny placing a fraudulent order with no audit trail to counter them (Repudiation)? Could a misconfigured database expose order history to the wrong account (Information disclosure)? Could a flood of fake checkout attempts take the service down during a sale (Denial of service)? Could a bug in session handling let a regular customer reach an admin-only order-adjustment endpoint (Elevation of privilege)?

## From threats to mitigations

Each identified threat gets a mitigation, and mitigations get prioritized — not every threat deserves the same urgency. A STRIDE finding against the public checkout API, handling live payment data, outranks the same category of finding against an internal reporting dashboard few people ever use. Threat modeling isn't about eliminating every theoretical risk; it's about making the tradeoffs visible and deliberate instead of accidental.

## Why this happens before code, not after

Threat modeling is cheapest and most useful at design time, before architecture decisions are locked in. Changing "the payment processor call happens over an unauthenticated internal network" into "the payment processor call happens over TLS with mutual authentication" is a design choice if caught on a whiteboard. It's a much larger rework if caught after the service is already deployed — which is exactly the shift-left argument from Lesson 1, applied to one specific practice.

## Key terms

- **Threat model** — a structured analysis answering what you're building, what can go wrong, what you'll do about it, and whether it was enough
- **Trust boundary** — a point in a system where the level of trust changes, such as the edge between the public internet and an internal network
- **Data flow diagram (DFD)** — a diagram of a system's processes, data stores, and the data moving between them, used as the basis for threat modeling
- **STRIDE** — a threat categorization framework: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege
