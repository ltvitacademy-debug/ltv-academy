# Training, Documentation and Knowledge Transfer

This final lesson closes the loop on two things referenced throughout the course but never fully explained: how business users actually learn the new system before go-live, and how the internal support team from Lesson 24 became capable of handling Tier 2 issues on their own. Both are forms of the same discipline — making sure knowledge doesn't live only inside the implementation team's heads.

## What you'll learn

- The difference between train-the-trainer and direct end-user training
- Why training is role-based rather than one-size-fits-all
- What knowledge transfer specifically hands off, and to whom
- How Brightfield structured training and knowledge transfer before stepping away

## Training strategy: train-the-trainer versus direct

**Direct training** has the implementation team (or a dedicated trainer) teach every end user personally — practical for a small user population, expensive and slow to scale for a larger one. **Train-the-trainer** instead trains a smaller group of super users (Lesson 2) deeply, who then train their own departments — faster to scale, and it has the side benefit of giving super users exactly the depth they'll need to be an effective Tier 1 support resource after go-live. Most mid-size-and-larger implementations use some blend: train-the-trainer for the bulk of end users, with direct, hands-on training reserved for roles needing the deepest system knowledge.

## Role-based training

Training is scoped to **what a specific role actually needs to do in the system**, not a general tour of every screen. An AP clerk needs deep training on invoice entry and matching; they don't need to understand Cash Management's reconciliation rules. This mirrors the security model from the Oracle Fusion Security course — job roles define what a user can access, and training should follow that same shape rather than teaching everyone everything.

## Documentation: what gets left behind

Training events end, but documentation persists. A complete set typically includes **user guides** (step-by-step, role-specific instructions for routine tasks), **quick reference guides** or **job aids** (one-page cheat sheets for a specific frequent task), and the project's own **configuration workbook and solution design documents** (Chapters 2 and 3) kept as a permanent record of why the system is configured the way it is — invaluable the next time someone needs to understand a setting two years from now.

## Knowledge transfer: handing off the system itself

**Knowledge transfer** is distinct from end-user training — it's the deliberate process of making the client's own internal technical/functional staff capable of supporting and maintaining the system without the implementation partner, covering exactly the kind of Tier 2 work described in Lesson 24: how to troubleshoot a configuration issue, how to read a defect log, how a Service Request actually gets filed. This typically happens through shadowing (internal staff watching the implementation team work), then reverse shadowing (the implementation team watching and coaching internal staff), before the implementation team steps back.

## Brightfield Industrial Group: closing out the implementation

Brightfield trains its super users directly and deeply, then has them train their own departments using role-based materials: AP clerks get an invoice-entry quick reference, Treasury gets a reconciliation job aid. In parallel, the two internal staff who will own Tier 2 support (Lesson 24) shadow the implementation's functional consultants for two weeks, then reverse-shadow for one more week with the consultants coaching rather than doing — by the end of hypercare, they're handling configuration-level issues unassisted, and the implementation partner formally steps back.

## Key terms

| Term | Meaning |
|---|---|
| Train-the-trainer | Training super users deeply so they train their own departments |
| Role-based training | Training scoped to what a specific job role needs, not a general tour |
| Knowledge transfer | The process of making internal staff capable of supporting the system independently |
| Shadowing / reverse shadowing | Internal staff observing, then being observed and coached, before full handoff |

## Recap

Training gets end users ready to work in the new system, scoped to their actual role and often delivered through trained super users rather than the implementation team directly; knowledge transfer, through shadowing and reverse shadowing, makes internal staff capable of supporting the system on their own. Brightfield's structured approach to both closed out its implementation cleanly.

This completes Oracle Fusion Implementation Lifecycle — all five chapters, from methodology through go-live and support. The next course in the Oracle Fusion Financials Consultant path, **Troubleshooting Oracle Financials**, picks up exactly where Lesson 24's production support left off: diagnosing and resolving real issues in a live Oracle Fusion Financials environment.
