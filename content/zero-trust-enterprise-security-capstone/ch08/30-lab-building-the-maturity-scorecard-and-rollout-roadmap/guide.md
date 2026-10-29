# Lesson 30 — Lab: Building the Maturity Scorecard and Rollout Roadmap

**Chapter 8 · Capstone: Designing and Defending an Enterprise Zero Trust Architecture · Lesson 30 of 32**

## What you'll learn

- How to score a real architecture — the one just designed for Meridian Health Partners — against
  the CISA Zero Trust Maturity Model's five pillars, instead of treating maturity scoring as an
  abstract exercise
- Why a design can be strong in one pillar and still stuck at an early stage in another, and why
  that unevenness is normal, not a design failure
- How to turn an honest scorecard into a phased, multi-year rollout roadmap that sequences work by
  risk reduction per effort, the way Chapter 7 taught
- How to write the roadmap in a form a budget committee can actually act on, not just a slide of
  security jargon

## The scenario, continued

Lesson 29 designed Meridian's zero trust architecture across identity, micro-segmentation,
assume-breach containment, and data/application controls. A design on paper isn't the same thing as
a funded, sequenced program. This lesson does the two things that turn it into one: scoring where
Meridian actually stands today using the CISA Zero Trust Maturity Model, and sequencing what's left
into a roadmap that survives contact with a real budget cycle.

## Step 1: Score each pillar honestly, against today — not the design

The CISA model has five pillars — Identity, Devices, Networks, Applications & Workloads, and Data —
each scored at one of four stages: Traditional, Initial, Advanced, or Optimal. The scoring has to
reflect what's actually deployed *right now*, not what Lesson 29 designed on paper. Mixing the two
is the single most common mistake in a real maturity assessment.

```
Pillar                  Today        After Lesson 29's design (target)
---------------------------------------------------------------------
Identity                 Initial       Advanced   (Entra ID policy engine, CAE)
Devices                  Initial       Advanced   (compliance required for Clinical Systems)
Networks                 Traditional   Advanced   (four segments, SDP broker)
Applications & Workloads Traditional   Advanced   (API gateway, workload identity)
Data                     Initial       Initial    (classification designed, not yet enforced)
```

Networks and Applications & Workloads start at Traditional — a flat network and a legacy EHR with
no gateway in front of it — which is the honest, unflattering starting point most real
organizations actually have. Data stays at Initial even after the design, because Lesson 29
*classified* PHI but hasn't yet built the enforcement that acts on that classification everywhere
it lives. A scorecard that shows every pillar jumping straight to Optimal isn't rigorous — it's
marketing.

## Step 2: Don't average the pillars into one number

A single "zero trust maturity score" of 62% hides the fact that Data is the real risk here, not an
evenly-distributed gap. Report the five pillars separately, every time. A committee that only sees
one blended number will fund whatever's easiest to improve, not whatever actually reduces the most
risk — and for Meridian, that's Data.

## Step 3: Sequence by risk reduction per unit of effort, not by pillar order

Chapter 7 already taught this: sequence a multi-year rollout by what reduces the most real risk for
the least disruption, not by working through the pillars in the order they're listed.

```
Phase 1 (0-6 months)   Identity: migrate Clinical Systems to Entra ID Conditional Access
                       Networks: stand up the four segments, SDP broker for Clinical Systems
Phase 2 (6-14 months)  Applications & Workloads: API gateway in front of MediCore
                       Devices: compliance enforcement extended to BYOD in Guest segment
Phase 3 (14-24 months) Data: classification enforcement -- DLP, encryption-at-rest audits,
                       access reviews tied to classification, not just to role
Phase 4 (ongoing)      Partner/Vendor: recurring least-privilege review of every third-party
                       integration, including ClaimFlow's scopes and token lifetimes
```

Identity and Networks come first because they reduce the most risk for the cost involved — Entra
ID and the segmentation broker are mostly configuration, not new infrastructure. Data enforcement
comes later because it's genuinely harder: it touches every system that holds PHI, not one gateway
in front of one legacy system.

## Step 4: Write the roadmap for a budget committee, not a security conference

```yaml
# Roadmap one-pager (excerpt)
phase: 1
timeframe: "0-6 months"
whatChanges: "Single sign-on policy engine; clinical network split into four zones"
whyItMatters: "Removes the single biggest lateral-movement path into patient records"
costDriver: "Existing Entra ID P2 licensing; no new hardware"
riskIfDelayed: "A single compromised clinic workstation can currently reach every patient record"
```

`whyItMatters` and `riskIfDelayed` are the two lines that actually get budget approved — a
committee doesn't need to understand Conditional Access internals to understand "one compromised
laptop can currently reach every patient record." That's the translation Lesson 24 taught, applied
here for real instead of as an abstract exercise.

## Key terms

| Term | Meaning |
|---|---|
| CISA Zero Trust Maturity Model | Five pillars (Identity, Devices, Networks, Applications & Workloads, Data), each scored Traditional / Initial / Advanced / Optimal |
| Scoring the baseline | Scoring what's deployed today, kept separate from the target state a design aims for |
| Sequencing by risk reduction per effort | Chapter 7's rollout principle: do what cuts the most real risk for the least disruption first |
| Roadmap one-pager | A phase's cost, timeframe, and risk written for a non-technical budget audience |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why did Meridian's Data pillar
stay at Initial even after Lesson 29's design was complete, and why is reporting five separate
pillar scores more useful to a budget committee than one blended maturity percentage?
