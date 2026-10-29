# Lesson 32 — Chapter Capstone: Hybrid and Multi-Cloud Architecture Review

**Chapter 8 · Capstone: Designing a Hybrid/Multi-Cloud Architecture · Lesson 32 of 32**

## What you'll learn

- How Alderney Health Systems' regulated-workload design (Lessons 29–30) and Brennick Retail's
  cautionary case study (Lesson 31) each pulled on specific earlier chapters of this course, not
  just the capstone's own material
- What each of the seven earlier chapters actually contributed, as a decision you watched play
  out, not a list of chapter titles
- Why this course's two labs land on opposite lessons from each other — reach for hybrid/multi-cloud
  deliberately, and don't reach for it by default — and why both are the same underlying discipline
- What this course's place is in the Cloud Engineer → Cloud Architect path, and which three
  courses can follow it, in any order

## The whole course, not just this chapter

**Chapter 1** is why Lesson 29 didn't need to argue that hybrid architecture is normal — Alderney
Health Systems' regulated claims workload is exactly the kind of permanent, structural hybrid
estate Chapter 1 described, driven by a data-residency requirement rather than an unfinished
migration. **Chapter 2** is the entire subject of Lesson 31: Brennick Retail Holdings is a direct,
illustrative consequence of ignoring Chapter 2's warning that multi-cloud applied as a blanket
policy, without a per-workload cost model, tends to cost more than it saves.

## Portability, identity, and networking doing the real work

**Chapter 3** is the backbone of Lesson 30 end to end: the Kubernetes portability boundary from
Lesson 9 (the Deployment/Service core that travels unchanged, the StorageClass and ingress seams
that don't) and the multi-cloud Terraform module pattern from Lesson 11 (one module source, called
twice, with only the genuinely different inputs varying) are the exact tools the lab used to
deploy the same workload identically to AKS and EKS. **Chapter 4** is why Lesson 29's identity
design was a single conditional access policy spanning on-prem and cloud, rather than two separate
access models — unifying identity across environments was never optional once Alderney's claims
data had a foot in both. **Chapter 5** is the reason Lesson 29's network design used a private
ExpressRoute circuit with a private-endpoint-only storage account instead of a public internet
path — the same connectivity patterns Chapter 5 built for ordinary multi-cloud traffic turned out
to be exactly what a regulated workload's compliance boundary needed too.

## Data architecture and governance, closing the loop

**Chapter 6** is why Lesson 29's data classification step came first, before any infrastructure
was designed: data gravity and residency requirements, from Lessons 21–23, are what decided that
raw PHI stays on-prem permanently while only a de-identified extract crosses to the cloud side.
**Chapter 7** is the layer underneath Lesson 31's entire case study — Brennick's missing cost model
is precisely the unified cross-cloud cost view and governance discipline Chapter 7 built, and its
absence is what let duplicated tooling, duplicated skills, and unmodeled egress fees accumulate for
three years before anyone could even see the total.

## What this capstone proved

Two labs and one case study, read together, teach the same discipline from both directions.
Lesson 29 and 30 show hybrid and multi-cloud architecture done *deliberately*: a specific
regulatory requirement decides exactly what stays on-prem and what bursts to the cloud, and a
specific portability requirement justifies maintaining one workload across two clouds with real,
verified infrastructure. Lesson 31 shows what happens when the same tools get reached for *by
default*, with no requirement driving the decision and no cost model checking it. Multi-cloud and
hybrid architecture aren't good or bad in themselves — they're expensive, powerful tools that earn
their cost only when a real requirement, not a slogan, is driving the design.

## What's next

This course — Hybrid & Multi-Cloud Enterprise Architecture — is complete, and it's one of four
Expert Specialization courses in the Cloud Engineer → Cloud Architect path. These four build on the
Advanced Specialization stage but not on each other, so they can be taken in any order from here:
**Advanced Platform Engineering, GitOps & CI/CD**; **AI Cloud Infrastructure, GPU Computing &
MLOps**; and **Advanced Site Reliability Engineering, Disaster Recovery & Resilience**. Each one
takes the enterprise-architecture judgment built across this course's eight chapters into a
different specialized discipline — none of them require finishing this course's siblings first,
and none of them require this specific course before the others either.

## Key terms

| Term | Meaning |
|---|---|
| Deliberate hybrid/multi-cloud design | Architecture decisions driven by a specific, named requirement — regulatory, portability, resilience — rather than adopted as a default policy |
| Workload-by-workload decision | Evaluating the need for hybrid or multi-cloud architecture per workload instead of applying one rule across an entire estate |
| Expert Specialization | This path's current stage; its four courses build on Advanced Specialization but not on each other, and can be taken in any order |
| Enterprise architecture judgment | The combined identity, network, data, cost, and portability reasoning this course built across eight chapters, reused in every specialized course that follows |

## Check yourself

Name one decision from Lesson 29 or 30 that only worked because of something taught in an
**earlier chapter** of this course, not Chapter 8 itself. What was the decision, and which chapter
made it possible?

## Course complete

Hybrid & Multi-Cloud Enterprise Architecture is done: eight chapters covering hybrid fundamentals,
multi-cloud strategy, workload portability, hybrid identity, multi-cloud networking, data
architecture, cost and governance, and a two-lab, one-case-study capstone proving all of it on one
regulated workload and one cautionary tale. From here, the Expert Specialization stage continues
with any of **Advanced Platform Engineering, GitOps & CI/CD**, **AI Cloud Infrastructure, GPU
Computing & MLOps**, or **Advanced Site Reliability Engineering, Disaster Recovery & Resilience** —
in whichever order makes sense next.
