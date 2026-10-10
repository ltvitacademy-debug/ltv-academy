# Lesson 1 — What an Architecture Review Board Is

**Chapter 1 · The Review Board · Lesson 1 of 14**

## What you'll learn

- What an architecture review board (ARB) is and the governance problem it exists to solve
- Where an ARB sits in a project's lifecycle and what decisions it actually gates
- The categories a typical enterprise ARB evaluates a design against
- How Salesforce's own Certified Technical Architect (CTA) review board is one specific, high-stakes instance of this general pattern
- The difference between an ARB and an informal peer design review

## Why organizations convene a review board

Any sufficiently large organization eventually has more architects, more projects, and more irreversible technical decisions than any single person can personally track. A data model change on one project can quietly conflict with an integration pattern another team already committed to. A security control skipped on a "small" project becomes the organization's weakest link. An **architecture review board (ARB)** is the standing (or scenario-convened) group that exists specifically to catch these problems before they're built, not after — a governance checkpoint where a proposed design gets examined by people other than the person who designed it, before significant money and engineering time are committed to it.

This is not bureaucracy for its own sake, even though it can calcify into that if run badly. The actual problem an ARB solves is real: a single architect, however good, has blind spots, incentives to defend their own design, and no visibility into every other initiative the design might collide with. A board distributes that judgment across several experienced people, on the record, before the decision becomes expensive to reverse.

## What an ARB actually evaluates

A well-run ARB doesn't ask "is this a good idea" in the abstract. It works through a consistent set of evaluation domains so that no category gets skipped just because the presenter didn't bring it up:

- **Requirements traceability** — does every major design decision map back to a stated business or technical requirement, or is some of it just the architect's preference?
- **Scalability and performance** — will this hold up at the data volumes and transaction rates the organization actually expects, not just today's pilot volume?
- **Security** — who can see and change what, how is data protected in transit and at rest, and does the design match the organization's actual risk tolerance for this kind of data?
- **Integration** — how does this system talk to everything around it, and what happens when one of those systems is slow, down, or sends malformed data?
- **Data model and data quality** — is the data structured in a way that will still make sense after two years of real-world usage and edge cases?
- **Governance and maintainability** — can someone other than the original architect operate, extend, and eventually replace this system?
- **Risk and tradeoffs** — what did the design choose *not* to do, and was that an informed tradeoff or an oversight?

## Where the gate sits

An ARB typically sits at one or more defined checkpoints in a project: before a design is approved for build (the highest-leverage point, since changes are cheapest here), sometimes again before a major release, and occasionally as a standing body that any architect can bring a significant decision to outside a formal project cycle. The exact cadence varies by organization, but the principle doesn't: the earlier the review happens relative to when code gets written, the cheaper it is to act on what the board finds.

## The CTA review board: a concrete example

Salesforce's own **Certified Technical Architect (CTA)** credential uses a review board as its final, and hardest, evaluation step — a real-world instance of exactly this pattern, just compressed into a single high-stakes session instead of an ongoing program. Multiple Salesforce-ecosystem training sources (SalesforceBen's CTA guide, Salesforce's own CTA resources blog, and ApexHours' CTA preparation materials) describe a format along these lines: a panel of experienced CTAs acts as the board, the candidate is given a complex hypothetical scenario and a preparation window to produce a solution design, then presents that design to the panel and defends it under direct questioning across several architecture domains (system architecture, security, data, integration, and others, including communication itself as a scored category). Exact phase lengths and panel size have been reported differently across sources and change over time as Salesforce evolves the program, so this course won't commit you to a specific number of minutes or judges — treat the CTA candidate's own current official guide as the source of truth for those specifics. What won't change is the underlying structure: present a design, then defend it live against informed, skeptical questioning. That structure is this entire course's subject.

## ARB vs. informal design review

A hallway conversation with a senior colleague about your design is valuable, but it isn't an ARB. The differences that matter: an ARB is **convened deliberately** (not ad hoc), it has **defined evaluators** who aren't personally invested in your specific design, it produces a **documented outcome** (approved, approved with conditions, or sent back), and it carries **actual authority** — a real ARB can block a design from moving forward. Treating an ARB like a casual review, or treating a casual review like it needs ARB-level formality, both create friction. Part of operating well in this environment is recognizing which situation you're in.

## Key terms

| Term | Meaning |
|---|---|
| Architecture Review Board (ARB) | A convened group with the authority to approve, condition, or reject a proposed architecture before significant build investment |
| Governance gate | A defined checkpoint in a project where a decision must be reviewed before work proceeds |
| Evaluation domain | A specific category (security, scalability, integration, etc.) a board systematically checks a design against |
| Design authority | The accountability a board holds for actually blocking or conditioning a design, as opposed to merely offering opinions |
| CTA review board | Salesforce's scenario-based, present-and-defend final evaluation for the Certified Technical Architect credential |

## Lab

A mid-size retailer is planning to replace its homegrown order-management system with a new platform integrating to five existing systems (ERP, warehouse management, a customer-facing app, a legacy EDI feed, and a BI warehouse), budgeted at $2.5M over 14 months. Write a short memo (200–300 words) answering: (1) does a project at this scale and irreversibility warrant a formal ARB gate before build begins, and why; (2) which three evaluation domains from this lesson are the highest-risk for this specific scenario, and why; (3) one way a casual hallway review of this design would likely fail to catch something a formal board would catch.

## Check yourself

Can you explain, in your own words, the actual governance problem an ARB exists to solve — not just define the term? Can you list at least five evaluation domains a well-run board checks, and give one concrete failure mode each domain is meant to catch? Can you explain why the CTA review board is a specific instance of the general ARB pattern, and why this course won't commit to exact current timings or panel size for it?
