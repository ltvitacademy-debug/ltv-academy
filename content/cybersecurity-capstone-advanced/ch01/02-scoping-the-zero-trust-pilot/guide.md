# Lesson 2 — Scoping the Zero-Trust Pilot

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 2 of 26**

## What you'll learn

- Why a zero-trust pilot has to be scoped to one boundary, not announced as
  an enterprise-wide rollout
- Why Hartwell's OT/SCADA boundary at the Riverbend site is the pilot
  target, and the specific reasoning that put it ahead of other candidates
- What's explicitly in scope for these 90 days, and what's explicitly
  deferred — and why deferring is a decision, not a gap
- How to write a scope statement Howard Okonjo can defend to the board if
  someone asks "why not everything at once?"

## Why "pilot," not "rollout"

The board mandated a zero-trust *pilot*, and that word is doing real work.
A zero-trust program touches identity, network, device posture, and data
classification across an entire organization — attempting all of that at
once, in 90 days, on a $340,000 budget, would produce something shallow
everywhere instead of something real anywhere. The Zero Trust Implementation
curriculum Mara studied earlier in her Security Engineer path makes the same
point: a credible program sequences a multi-year rollout rather than
pretending it can be deployed uniformly on day one. A pilot's job is to
prove the model works, on hardware and people that actually exist, before
asking for the next round of budget to extend it.

That means the first real decision isn't architecture — it's scope.

## Choosing the boundary: why OT/SCADA at Riverbend

Hartwell runs several network boundaries that could plausibly be a "first"
zero-trust segmentation target. Mara and Okonjo evaluate candidates against
three questions: *What's the blast radius if this boundary fails? How
contained is it today? And can we actually finish it in 90 days?*

- **Corporate end-user network.** High boundary count, low individual
  blast radius (a compromised laptop is bad, but contained), and it's
  already segmented reasonably well from past projects. Deferred.
- **SaaS application access.** Real risk, but it's a different kind of
  zero-trust work — application-layer, not network-layer — and doesn't map
  to a 90-day network segmentation pilot. Deferred.
- **The OT/SCADA boundary at the Riverbend site.** Riverbend hosts both a
  substation's SCADA control network and a water-treatment SCADA system,
  and — this is the finding that decides it — today they sit on the **same
  flat network segment** as general corporate IT traffic at that site, with
  only a single perimeter firewall rule set standing between them. If a
  corporate workstation at Riverbend is compromised, nothing today stops
  lateral movement straight into systems that control physical
  infrastructure. The blast radius is the highest of any boundary at
  Hartwell, and it is currently the least contained.

That combination — highest stakes, least existing containment — is exactly
why OT/SCADA at Riverbend becomes the pilot target, instead of a boundary
that would be easier to finish but prove less.

## What's in scope for these 90 days

The scope statement Mara writes, and Okonjo signs off on, is deliberately
narrow:

1. **Network segmentation** carving the Riverbend OT/SCADA systems out of
   the flat corporate network into their own controlled zone, with explicit
   allow-listed east-west traffic instead of implicit trust.
2. **A consolidated identity view** of exactly who — across both Azure AD
   and AWS IAM — has standing access that reaches into that OT/SCADA
   boundary specifically. Not a full identity audit of every Hartwell
   account; the subset that touches this one boundary.
3. **An automated inventory** of that access, built in Python, that can run
   on a schedule and be queried instead of recreated by hand every time
   someone asks "who can get into SCADA right now?"
4. **A risk-register entry** for every finding this pilot produces, however
   small.

## What's explicitly out of scope — and why that's a decision

Just as important as what's in scope is writing down, in the same document,
what's deliberately deferred:

- **Zero-trust network access (ZTNA) for the general employee population.**
  Real, valuable, and a separate program. Not this pilot.
- **Rolling segmentation out to Hartwell's other sites.** Riverbend proves
  the model once; Lesson 22 of this capstone, "Planning the Next Phase,"
  is explicitly about what a multi-site rollout looks like once the pilot
  succeeds.
- **Full identity governance across every Hartwell account.** The identity
  work here is scoped to the OT/SCADA boundary's access, not an
  enterprise-wide identity cleanup.

Writing the deferred list down matters for a reason that has nothing to do
with technology: it's what lets Okonjo answer, in the board meeting, "why
didn't you fix everything?" with "because fixing one thing well, on a real
system, is what the budget and the timeline actually bought — and here's
the plan for what comes next." A scope document without an explicit
out-of-scope section invites exactly that question to land badly.

## Key terms

| Term | Meaning |
|---|---|
| Pilot | A deliberately scoped first implementation meant to prove a model works before extending it, rather than a full rollout |
| Blast radius | How far damage could spread if a given boundary or system is compromised |
| Flat network | A network with no internal segmentation, where any connected device can reach any other by default |
| East-west traffic | Workload-to-workload traffic inside a network boundary, as opposed to traffic crossing the perimeter |

## Lab

1. Write the three evaluation questions Mara and Okonjo used to choose a
   pilot boundary (blast radius, current containment, feasibility in 90
   days), and apply them to one other boundary candidate besides OT/SCADA.
2. Draft the one-sentence justification for choosing Riverbend's OT/SCADA
   boundary that you'd want Okonjo to be able to repeat to the board without
   notes.
3. List the four in-scope items and the three deferred items from this
   lesson's scope statement, side by side.

## Check yourself

You're ready for Lesson 3 when you can explain, without looking, why
Riverbend's OT/SCADA boundary was chosen over the corporate network or SaaS
access, and why the scope document lists what's deferred just as explicitly
as what's included.
