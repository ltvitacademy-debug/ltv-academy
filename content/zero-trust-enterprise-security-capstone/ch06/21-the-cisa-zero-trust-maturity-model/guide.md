# Lesson 21 — The CISA Zero Trust Maturity Model

**Chapter 6 · Measuring Zero Trust Maturity · Lesson 21 of 4**

## What you'll learn

- What the CISA Zero Trust Maturity Model (ZTMM) actually is, and why
  it exists as the de facto common language for zero trust progress
- The five pillars the model scores separately — Identity, Devices,
  Networks, Applications & Workloads, and Data
- The three cross-cutting capabilities that span every pillar —
  Visibility & Analytics, Automation & Orchestration, and Governance
- The four maturity stages — Traditional, Initial, Advanced, Optimal
  — and what meaningfully changes between them
- Why "we bought the tool" and "we're mature" are different claims,
  and the model is built specifically to keep you from confusing them

## Why a maturity model, and why this one

Every course so far in this path has taught you to *build* zero
trust controls — conditional access policies, micro-segmentation,
workload identity, data classification. This chapter asks a
different question: once you've built some of it, how do you know
how far along you actually are, in a way someone outside your team
can trust?

The Cybersecurity and Infrastructure Security Agency (CISA) published
the Zero Trust Maturity Model specifically to answer that question
for U.S. federal agencies working toward the zero trust mandate in
Executive Order 14028, and it has since become the most widely
adopted reference point for zero trust maturity assessment outside
government too — because it gives every organization the same five
categories and the same four stages to describe progress in, instead
of forty vendors each inventing their own scorecard. You will use
this exact model, or a close variant of it, in almost any security
engineering role that touches zero trust strategy.

## The five pillars

CISA's ZTMM scores maturity **separately** across five pillars,
rather than giving you one overall "zero trust score." That's
deliberate — a real environment is never uniformly mature, and
averaging the pillars together would hide exactly the gap an attacker
would exploit.

| Pillar | What it covers |
|---|---|
| **Identity** | How users and non-human identities are verified, how strong that verification is, and how continuously it's re-evaluated |
| **Devices** | Asset inventory, device compliance, vulnerability/patch posture, and whether device risk feeds into access decisions |
| **Networks** | Segmentation, encryption of traffic, and whether the network is organized around static zones or around what's actually being protected |
| **Applications & Workloads** | How access to an application is authorized, how workloads are tested and secured through their lifecycle, and whether that authorization is continuous |
| **Data** | Whether data is inventoried and categorized, how it's protected at rest and in transit, and whether access to it is controlled by its sensitivity rather than just its location |

## The three cross-cutting capabilities

Layered across all five pillars are three capabilities that don't
belong to any single one of them, because they're what make the
pillars work *together* instead of as five disconnected programs:

- **Visibility and Analytics** — can you actually see what's
  happening across identity, device, network, app, and data signals,
  and correlate them, or is each pillar a blind spot to the others?
- **Automation and Orchestration** — are access decisions and
  responses to risk signals automated, or does every unusual event
  require a human to notice it and act manually?
- **Governance** — do you have the policies, risk management
  processes, and accountability structures that make the technical
  controls durable, rather than dependent on one engineer's tribal
  knowledge?

A pillar can look technically advanced and still fail here. An
organization with excellent micro-segmentation but no governance
process for *who approves new segmentation rules* is not actually
mature in the way the model means.

## The four maturity stages

Each pillar — and each cross-cutting capability — is scored against
the same four stages, which describe a consistent arc from manual and
static to automated and dynamic:

1. **Traditional** — manually configured, manual lifecycle
   management, policies enforced with static, broad rules (think:
   password-only login, flat networks, one-time access grants that
   are never revisited).
2. **Initial** — automation of some attributes begins, initial
   cross-pillar coordination starts, and policy enforcement starts
   to incorporate least-privilege thinking, but still mostly in
   discrete, siloed steps.
3. **Advanced** — policy decisions are centrally controlled and
   automated across most pillars, cross-pillar coordination is
   routine, and controls respond to risk signals rather than
   running on fixed schedules.
4. **Optimal** — fully automated, just-in-time, continuously
   validated access decisions, driven by dynamic risk signals and
   coordinated seamlessly across identity, device, network,
   application, and data — the "assume breach, verify explicitly,
   least privilege" posture actually operating in real time, not
   just described in a policy document.

The jump that matters most, in practice, is Traditional → Initial →
Advanced: that's where most of an organization's actual risk
reduction happens. Advanced → Optimal buys you speed and scale more
than it buys you a fundamentally different risk posture — which is
worth knowing before you promise a CISO "optimal everywhere" as the
near-term goal.

## Key terms

| Term | Meaning |
|---|---|
| CISA ZTMM | The CISA Zero Trust Maturity Model: five pillars × four stages, plus three cross-cutting capabilities, used to assess zero trust progress |
| Pillar | One of the five independently-scored domains: Identity, Devices, Networks, Applications & Workloads, Data |
| Cross-cutting capability | Visibility & Analytics, Automation & Orchestration, or Governance — spans all five pillars rather than belonging to one |
| Maturity stage | Traditional, Initial, Advanced, or Optimal — the same four-stage scale applied to every pillar and capability |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking:
why does the model score five pillars separately instead of giving
one combined score, and what's the practical difference between an
organization that is "Advanced" on Identity but "Traditional" on
Data versus one that is "Initial" across all five pillars evenly?
