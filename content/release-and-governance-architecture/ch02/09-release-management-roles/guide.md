# Lesson 9 — Release Management Roles

**Chapter 2 · Enterprise Deployment · Lesson 9 of 16**

## What you'll learn

- The core roles a mature release management function needs, and what each one actually owns
- How these roles relate to the CAB membership from Lesson 5 without being identical to it
- Why "the architect approves everything" is a common anti-pattern as an org scales
- How roles map to a RACI (Responsible, Accountable, Consulted, Informed) view of a release
- Why role clarity matters more as team size grows, not less

## Naming the roles explicitly

A small team can get away with roles being implicit — whoever happens to be available does whatever needs doing. At enterprise scale, that breaks down, which is why mature release management names specific roles with specific ownership:

- **Release Manager.** Owns the release calendar from Lesson 7, coordinates across teams to avoid the collisions described in Lesson 8, and is the single point of accountability for whether a given release actually ships on schedule. The release manager doesn't necessarily approve technical content — that's other roles' job — but owns the process itself.
- **Environment Manager.** Owns the environment path from Lesson 7 operationally: making sure the right sandbox types exist, are refreshed on a schedule that supports the release calendar, and that environment-level issues (a sandbox that's out of storage, a refresh that didn't complete) don't become the thing that blocks a release.
- **Change Owner / Requester.** The person proposing a specific change, responsible for describing it accurately, providing the risk assessment and test evidence the CAB needs, and for the rollback plan from Lesson 6.
- **Technical/Platform Architect.** Assesses whether a proposed change fits the org's architecture and standards — the role most directly tied to the architecture review board covered in Lesson 15 — and brings technical judgment to CAB decisions without necessarily chairing the CAB itself.
- **QA / Release Testing Lead.** Owns whether a change has actually been adequately tested before it's presented for approval, and signs off on test evidence as part of the go/no-go checkpoint.
- **CAB Chair.** Runs the Change Advisory Board meeting itself (Lesson 5), which is a distinct role from the release manager even though the two work closely together — the CAB chair's job is running the decision-making body, not owning the calendar it operates against.

## These roles aren't identical to CAB membership

It's worth being precise here: not every one of these roles sits on the CAB as a voting member, and the CAB (Lesson 5) includes some representatives — business unit stakeholders, security/compliance — who aren't release management roles at all. Release management roles run the ongoing machinery of getting changes through the pipeline; CAB membership is about who's in the room for a specific category of approval decision. A release manager typically does attend CAB meetings to provide calendar context, but the CAB's authority to approve or reject a change doesn't depend on the release manager personally.

## The "architect approves everything" anti-pattern

A common failure mode as a Salesforce program grows is funneling every decision — technical design, deployment timing, risk tolerance, business-process impact — through a single senior architect, because that person is trusted and competent. This feels safe in the short term and becomes a severe bottleneck as volume grows, and it actually weakens governance rather than strengthening it: one person's judgment, however good, isn't a substitute for the deliberately distributed review this chapter has been building toward (CAB membership spanning multiple perspectives, QA owning test sign-off independently, a release manager who isn't also the final technical approver). Distinct, named roles with distinct ownership are what let a growing program scale its decision-making capacity instead of bottlenecking on one person — which is also, not coincidentally, a single point of failure if that person is unavailable during an incident.

## A RACI view of a release

A **RACI** matrix — Responsible, Accountable, Consulted, Informed — is a common way to make role ownership for a release unambiguous: for a given release, who is *Responsible* for doing the work (the change owner, building it), who is *Accountable* for the outcome (often the release manager, for the release as a whole; the CAB, for the approval decision), who must be *Consulted* before a decision is made (the architect, for anything structurally significant), and who simply needs to be *Informed* once a decision is made (affected business units, end users). Writing this out explicitly for a release — rather than assuming everyone already knows who does what — is a small amount of documentation overhead that prevents a surprising amount of confusion and finger-pointing when something goes wrong.

## Key terms

| Term | Meaning |
|---|---|
| Release Manager | Owns the release calendar and overall accountability for whether a release ships on schedule |
| Environment Manager | Owns the operational health of the environment path (sandbox availability, refresh scheduling) |
| RACI | A matrix clarifying who is Responsible, Accountable, Consulted, and Informed for a decision or deliverable |

## Lab

A growing Salesforce program currently routes every decision — technical design, deployment scheduling, risk sign-off — through one senior architect, who is now a visible bottleneck and a single point of failure. Using this lesson's role list, draft a RACI for a typical "new Flow deployment" release: who is Responsible, Accountable, Consulted, and Informed, assuming the roles are properly distributed instead of concentrated in one person.

## Check yourself

Can you name at least four distinct release management roles and what each one owns? Can you explain why CAB membership and release management roles aren't the same thing, even though they overlap? Can you explain why funneling every decision through one senior architect becomes a liability as a program scales, even if that architect is highly competent?
