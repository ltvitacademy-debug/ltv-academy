# Lesson 32 — Chapter Capstone: Advanced Specialization Review and What's Next

**Chapter 8 · Capstone: Designing and Defending an Enterprise Cloud Architecture · Lesson 32 of 32**

## What you'll learn

- How Harlow Creek Logistics' landing zone, network, ADRs, and DR plan pulled on every chapter of
  this course, not just the capstone chapter
- How this entire course fits into the four-course Advanced Specialization stage, alongside
  infrastructure as code, containers, and cloud operations
- Why Prairiewind Underwriters' failure in Lesson 31 was really a review-process failure, not a
  technical one — and what that means for how you review your own work
- What comes next: the Expert Specialization stage, and the four courses inside it

## This course, not just this chapter

Lessons 29 and 30 built one real design for Harlow Creek Logistics, and that design used every
chapter that came before it. **Chapter 1**'s Well-Architected Framework vocabulary is why "blast
radius" and "tradeoff" needed no introduction when Lesson 29 chose subscription boundaries —
those concepts were already settled before the capstone started. **Chapter 2** is the entire
reason Lesson 29 exists in the shape it does: management groups, subscription vending, and
choosing boundaries by blast radius rather than org chart are Chapter 2's ideas, applied to a
specific company instead of discussed in the abstract.

## Network, resilience, and governance doing the real work

**Chapter 3** is the backbone of Lesson 29's hub-and-spoke design — the topology choice itself,
the address-space allocation, and the UDR that actually forces spoke traffic through the firewall
rather than just drawing it that way. **Chapter 4** is the entire reason ADR-003 exists: RTO/RPO
set per tier instead of as one organization-wide number, active-passive chosen over active-active
for a documented reason, and a DR test that validates the network layer, not just the application
layer — Lesson 16's "test it for real, not just on paper" is exactly what Lesson 30's three-step
game day does. **Chapter 5** is why Lesson 29's four guardrails were written as Azure Policy
assigned at a management group instead of documented in a wiki nobody reads, and why
`allowed-locations` was deliberately assigned one level higher than the other three, to bind
Platform's own subscriptions as well.

## Documentation and defense, proven on a real failure

**Chapter 6** gave Lesson 30 its ADR format — Context, Options considered, Decision,
Consequences — and the discipline of writing the uncomfortable consequence down (ADR-001's "the
hub becomes a dependency every spoke relies on") instead of only recording the upside. **Chapter
7** is the lens Lesson 31 is told through: Prairiewind's review board asked real, substantive
questions and still missed a category of risk entirely, because their checklist was shaped
by application tiers and had no line item for shared infrastructure. The single question that
would have caught it — *what happens to every spoke if the hub itself goes down?* — is exactly
the kind of question Lesson 26 taught you to anticipate from a review board, turned around and
aimed at your own design instead of waited for.

## What this capstone proved

Across four lessons, this chapter built one real multi-team landing zone with subscription
boundaries set by blast radius; a hub-and-spoke network with address space, peering, and
firewall-forced egress spelled out in real CIDR blocks; three ADRs documenting the decisions
behind that design, including one — ADR-003 — written specifically to close a gap that a
different, fictional organization didn't catch; and a tiered DR plan with a three-step test that
validates the network layer, not just the application layer. That is the actual job of an
architect: not producing a diagram that passes review, but producing a design — and a review
process — that holds up in production.

## The Advanced Specialization stage is complete

This course is the fourth and last course in the **Advanced Specialization** stage of the Cloud
Engineer → Cloud Architect path:

| Course | What it contributed |
|---|---|
| Terraform, Bicep & Infrastructure as Code | Declaring infrastructure in version-controlled code instead of clicking it into existence by hand |
| Docker, Kubernetes & Container Platforms | Packaging and orchestrating the workloads that run on top of the infrastructure IaC provisions |
| Cloud Operations, Observability, FinOps & Reliability | Keeping what's running observable, cost-accountable, and reliable once it's live |
| Enterprise Cloud Architecture & Advanced Capstone | Designing, documenting, and defending the whole system those three pieces live inside |

Each course handled one layer; this capstone is the one that required thinking about all four
layers at once — a landing zone and network that the IaC course's modules deploy, running the
container platforms the second course covered, operated with the observability and cost
discipline the third course taught, and defended with the ADRs and review skills this chapter
just built.

## What's next: Expert Specialization

The Advanced Specialization stage is done. The path's next stage, **Expert Specialization**,
contains four courses that build on everything in Advanced Specialization but not directly on
each other — they can be taken in any order:

- **Advanced Platform Engineering, GitOps & CI/CD**
- **Hybrid & Multi-Cloud Enterprise Architecture**
- **AI Cloud Infrastructure, GPU Computing & MLOps**
- **Advanced Site Reliability Engineering, Disaster Recovery & Resilience**

Notice how directly each one extends a thread this capstone already pulled on: Hybrid & Multi-Cloud
Enterprise Architecture takes the landing zone and hub-and-spoke thinking from this chapter and
extends it across cloud providers and on-premises environments, not just within one Azure tenant.
Advanced SRE, Disaster Recovery & Resilience takes Lesson 30's RTO/RPO and DR-testing discipline
and goes deeper — exactly the kind of review-process rigor that would have caught Prairiewind's
gap before it became an eleven-hour outage.

## Key terms

| Term | Meaning |
|---|---|
| Advanced Specialization | The completed four-course stage: IaC, containers, cloud ops/FinOps, and this enterprise architecture capstone |
| Expert Specialization | The next stage: four courses on platform engineering/GitOps, hybrid/multi-cloud architecture, AI infrastructure, and advanced SRE — any order |
| Review-process failure | A failure caused not by bad technical work but by a review checklist that never asked the right question |
| Architect's job | Producing a design and a review process that hold up in production, not just a diagram that passes a meeting |

## Check yourself

Name one decision from this capstone that only worked because of something taught in an **earlier
chapter** of this course, not Chapter 8 itself. What was the decision, and which chapter made it
possible?

## Course complete

Enterprise Cloud Architecture & Advanced Capstone is done: eight chapters covering the
Well-Architected Framework, landing zones, enterprise network design, resilience and DR,
governance at scale, ADRs and documentation, presenting and defending an architecture, and this
capstone that proved all of it on one real design. The Advanced Specialization stage — Terraform
& Bicep, Docker & Kubernetes, Cloud Operations & FinOps, and this course — is complete. Next up:
the Expert Specialization stage, four courses you can take in any order.
