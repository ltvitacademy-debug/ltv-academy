# Lesson 32 — Chapter Capstone: Security Engineering Review

**Chapter 8 · Capstone: Engineering an Identity & Hardening Program · Lesson 32 of 32**

## What you'll learn

- How this course's seven chapters each showed up as a real decision in the Castellan-Thornbury
  merger across Lessons 29 through 31
- Why identity architecture, authentication, authorization, hardening, and governance only
  function as one connected system, not seven separate topics
- Specifically what a graduate of this course is now equipped to do as a security engineer
- What comes next in the Advanced Specialization stage

## Seven chapters, proven on one merger

- **Chapter 1 — Identity Architecture at Enterprise Scale.** Entra ID named as the surviving
  identity plane, with Okta federated in rather than ripped out, and PolicyTrack's SAML versus
  ClaimLine's OIDC driving two different migration paths for the same federation decision.
- **Chapter 2 — Authentication Architecture.** The three-phase MFA rollout that met Thornbury's
  SMS-based users where they actually started, instead of assuming everyone could jump straight
  to the FIDO2 bar Castellan's admins already cleared.
- **Chapter 3 — Authorization Models at Scale.** The RBAC role catalog gap that let Claims
  Adjuster and Payment Approver coexist on one account with no mutual-exclusion rule to stop it —
  the root cause Lesson 31's case study traced back to this chapter's own territory.
- **Chapter 4 — Windows System Hardening Engineering.** The CIS-based GPO baseline built from a
  real benchmark, with Credential Guard and Attack Surface Reduction rules closing the exact gaps
  Thornbury's unmanaged Windows fleet had.
- **Chapter 5 — Linux System Hardening Engineering.** The CIS Benchmark pass and sysctl hardening
  for Thornbury's forty actuarial servers, shipped as an Ansible playbook instead of a manual,
  one-time pass.
- **Chapter 6 — Identity Governance.** The access certification campaign that caught the toxic
  combination — by a human noticing one report line — fourteen months after it was created.
- **Chapter 7 — Engineering Security Controls, Not Just Operating Them.** The audit-mode testing
  before every hardening rule went live, and the separation-of-duties check written as code so
  the next toxic combination gets caught automatically, not by chance.

## Why these five domains are one system, not seven topics

Lessons 29 through 31 only worked because none of these chapters stood alone. The MFA rollout in
Chapter 2 depended on the identity plane Chapter 1 established. The toxic combination Chapter 6
caught existed because of a gap in the authorization design from Chapter 3. The hardening
baseline in Chapters 4 and 5 only rolled out safely because of the testing discipline Chapter 7
teaches — the same discipline that, applied to identity governance, is what prevents the next
toxic combination from taking fourteen months to find. A security engineer who only knows one of
these domains can describe a problem; a security engineer who can move between all five is the
one who actually closes it, the way this whole case study just did.

## What you're equipped for

A graduate who can do what Lessons 29 through 31 just did — decide between federating and
migrating two identity providers, design a phased MFA and SSO rollout around two different
starting points, build and safely roll out a CIS-based hardening baseline across mixed Windows
and Linux fleets, and find, size, and remediate a real toxic combination with both an immediate
fix and a structural prevention — has the working skill set of an **Identity & Access Management
(IAM) Engineer** or a **Security Engineer**. That is the specific, demonstrated toolkit this
course was built to produce, not a certificate claim.

## Key terms

| Term | Meaning |
|---|---|
| Identity & Access Management (IAM) Engineer | A role focused on identity architecture, authentication, authorization, and governance — this course's core target role |
| Security Engineer | The broader role this course's full scope — identity plus system hardening plus controls engineering — targets |
| Advanced Specialization | This path's current stage: security engineering, cloud security, and zero-trust architecture, building on the Job-Ready Foundation |

## Check yourself

Of this course's seven chapters, which one do you think the Castellan-Thornbury case would have
gone worst without — and what specifically would have broken in Lessons 29 through 31 if that
chapter's discipline had been missing?

## Course complete

That closes **Security Engineering, IAM & System Hardening** — seven chapters of identity,
authentication, authorization, hardening, and governance, proven end to end on one real merger.
Course complete — next up: **Azure & AWS Cloud Security Engineering**, the next course in the
Advanced Specialization stage of the Cybersecurity Analyst → Security Engineer path.
