# Lesson 4 — A Zero Trust Glossary for People Who Already Know the Pieces

**Chapter 1 · Zero Trust Principles · Lesson 4 of 4**

## What you'll learn

- A consolidated glossary of the Zero Trust vocabulary this chapter
  has introduced, plus the handful of related terms you'll run into
  constantly in the rest of this capstone
- Exactly which thing you already configured each term is describing
  — not a new concept, a new name for something you've already built
- How to read ZTNA, SASE, and micro-segmentation as implementations of
  the PE/PA/PEP model, not separate ideas from it
- A single reference you can come back to for the rest of this course

## Why this lesson is a glossary, not new material

By the end of Lesson 3 you had the full model: seven tenets, and three
components — PE, PA, PEP — that carry them out. Everything else you'll
encounter in this capstone is either a synonym for one of those
pieces, a specific product category that implements one of those
roles, or one of the trust algorithm's inputs named individually. This
lesson exists to stop that vocabulary from feeling like new content —
it's the same model, said in the words you'll actually see in vendor
docs, job postings, and NIST's companion publications.

## The core components, restated

| Term | What it is | What you already know it as |
|---|---|---|
| Subject | The user, service, or device requesting access | The principal in any IAM request you've already modeled |
| Policy Decision Point (PDP) | NIST's grouping of the PE and PA as the architecture's "brain" | The combined evaluation + token-issuance step in Conditional Access |
| Policy Engine (PE) | Runs the trust algorithm; decides grant/deny/revoke | The Conditional Access policy evaluation logic itself |
| Policy Administrator (PA) | Establishes/ends the session; issues the credential | Token issuance after a Conditional Access decision passes |
| Policy Enforcement Point (PEP) | Sits on the data path; enforces the PDP's decision | A ZTNA gateway, SASE edge, or AWS Verified Access endpoint |

## The trust algorithm's inputs, named individually

| Term | What it is | What you already know it as |
|---|---|---|
| CDM (Continuous Diagnostics and Mitigation) | Ongoing visibility into asset/device state | Intune device compliance or AWS Systems Manager inventory |
| PKI | The certificate infrastructure feeding identity trust into the PE | The certificate authority issuing device/service certs |
| ICAM (Identity, Credential, and Access Management) | The identity management input to the trust algorithm | The identity provider and lifecycle processes from course 8 |
| Threat intelligence feed | External indicators of known-bad activity, fed into the PE | A threat intel integration into your SIEM/XDR |
| SIEM / activity logs | Network and system behavior history, fed into the PE | The same SIEM pipeline you built detections on as a SOC analyst |

## Implementation categories, not separate ideas

| Term | What it is | How it maps to PE/PA/PEP |
|---|---|---|
| ZTNA (Zero Trust Network Access) | A product category that replaces broad VPN access with per-application, policy-checked connections | Implements the PEP (and often leans on an existing PDP) for remote/app access |
| SASE (Secure Access Service Edge) | A converged networking + security edge delivering ZTNA, SWG, and CASB from one cloud platform | A packaged set of PEPs, delivered at the network edge instead of per-app |
| Micro-segmentation | Dividing a network into small, individually access-controlled zones instead of one flat "inside" | Pushes PEP enforcement down to the segment level — tenet 2 and 6, applied internally |
| East-west traffic | Traffic between systems inside the environment, as opposed to north-south traffic to/from outside | What micro-segmentation and service-mesh PEPs are built to inspect and gate |
| Implicit trust zone | Any remaining area where traffic moves without a PEP checking it | What Zero Trust is explicitly trying to shrink to nothing |

## How to use this glossary going forward

Every later lesson in this capstone — identity-centric segmentation,
cloud workload identity, SASE rollouts, continuous verification
pipelines — is a deeper dive into one row of these tables, not a new
framework. When a new term shows up, the useful question is always
the same one this lesson just answered five times over: is this a
component (PE/PA/PEP), an input to the trust algorithm, or a product
category implementing one of the roles? Answer that, and the term
stops being unfamiliar.

## Key terms

| Term | Meaning |
|---|---|
| Subject | The user, service, or device whose access request the PE evaluates |
| ZTNA | A product category implementing PEP-style enforcement for remote/app access |
| SASE | A converged edge platform delivering ZTNA and related controls from the cloud |
| Micro-segmentation | Internal network division that pushes PEP enforcement down to small zones |
| Implicit trust zone | Any area still reachable without a PEP evaluating it — Zero Trust's target to eliminate |

## Check yourself

You're ready for Chapter 2 when you can take any Zero Trust term you
haven't seen before, and correctly sort it into one of three buckets:
a component, a trust-algorithm input, or an implementation category —
using nothing but the model from Lessons 1 through 3.
