# Lesson 5 — Change Advisory Boards

**Chapter 1 · Release and Governance · Lesson 5 of 16**

## What you'll learn

- What a Change Advisory Board (CAB) is and the specific question it exists to answer
- Who typically sits on a Salesforce CAB and why that membership matters
- How a CAB evaluates a normal change versus how it handles an emergency change
- The difference between a CAB and an architecture review board (previewed here, covered fully in Lesson 15)
- Common failure modes that turn a CAB into a bottleneck instead of a safeguard

## What a CAB is actually for

A **Change Advisory Board (CAB)** is the group of people who review and approve (or reject) proposed changes before they're scheduled into a release, applying the change-control process from Lesson 4 as a real, working decision body rather than a document. The specific question a CAB answers is narrower than it might sound: not "is this a good idea" or "is this well-architected" (that's closer to an architecture review board's job, previewed below), but **"is it safe to make this specific change, at this specific time, in this specific way"** — considering what else is happening in the release, what the rollback plan is (Lesson 6), and whether the risk assessment (Lesson 16) behind it is sound.

## Who sits on a Salesforce CAB

A CAB works best with a small, standing group that represents the different perspectives a change can affect, rather than an ad-hoc gathering assembled fresh each time. A typical Salesforce CAB includes:

- **A release or change manager**, who runs the meeting and owns the overall release calendar.
- **A platform/technical architect or lead admin**, who can assess technical risk and interactions between changes.
- **Representatives from major affected business units**, who understand the operational impact of a change on actual day-to-day users (a sales operations lead, a service operations lead).
- **A security or compliance representative**, for organizations with regulatory exposure, to flag changes that touch sensitive data or regulated processes.
- **QA or testing leadership**, who can speak to whether a change has actually been tested adequately before it's approved.

The point of this mix isn't bureaucracy for its own sake — it's making sure a change doesn't get approved by people who only see one slice of its impact. A change that looks perfectly safe from a pure technical standpoint can still have a business-process consequence nobody in the room would catch without the right representative present.

## Normal changes vs. emergency changes at the CAB

For a **normal change**, the CAB reviews the request on its normal cadence (often weekly), looking at the change's description, its risk assessment, its test evidence, its rollback plan, and how it interacts with everything else scheduled for the same release window. The CAB can approve, reject, or send it back for more information or testing.

For an **emergency change**, waiting for the next scheduled CAB meeting isn't realistic — an active incident needs a decision now. Most mature practices define a smaller **emergency CAB (ECAB)** — often just two or three people with the authority to approve on short notice, reachable outside the normal meeting cadence — specifically so that "emergency" doesn't become an excuse to skip review altogether. As covered in Lesson 4, every emergency change still gets a full after-the-fact review at the next regular CAB meeting, even though it bypassed the normal advance-approval timeline.

## CAB vs. architecture review board

It's easy to conflate a CAB with an **architecture review board (ARB)**, but they answer different questions at different points in a change's life. A CAB asks whether a specific, already-designed change is safe to deploy now. An ARB — covered fully in Lesson 15 — asks a design-time question earlier in a change's life: does this proposed approach actually fit the org's architecture, data model, and long-term standards, before anyone builds it. A large or structurally significant change typically passes through an ARB first (at design time) and a CAB later (at deployment time); a small, well-understood change might only ever see the CAB.

## When a CAB becomes a bottleneck

A CAB that reviews every change with the same depth, regardless of risk, quickly becomes exactly the kind of bottleneck that makes a release process feel unbearably slow — which is precisely why Lesson 4's standard/normal/emergency distinction and the risk-tiering from Lesson 1 matter so much. A CAB that only ever sees high- and medium-risk normal changes, because low-risk standard changes are handled through a pre-approved fast path, stays focused on the decisions that actually need a room full of people — and keeps the organization from quietly deciding the CAB isn't worth the time it costs.

## Key terms

| Term | Meaning |
|---|---|
| Change Advisory Board (CAB) | The standing group that reviews and approves whether a specific change is safe to deploy, at a specific time, in a specific way |
| ECAB (Emergency CAB) | A smaller, faster-acting subset of the CAB empowered to approve emergency changes outside the normal cadence |
| Architecture review board (ARB) | A design-time review body that evaluates whether a proposed approach fits the org's architecture, distinct from the CAB's deployment-time safety review |

## Lab

A mid-size Salesforce org currently sends every single change — from a new picklist value to a new integration with an external payment system — through the same weekly CAB meeting, which now runs three hours and is widely resented. Propose a revised model: which categories of change should bypass the full CAB (and through what alternative path), and which should still require it. Justify your split using this lesson's and Lesson 4's concepts.

## Check yourself

Can you state, in one sentence, the specific question a CAB exists to answer? Can you name at least three roles that should typically sit on a Salesforce CAB and explain why each one matters? Can you explain the difference between what a CAB reviews and what an architecture review board reviews?
