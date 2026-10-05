# Lesson 26 — Governance Architecture Review Boards

**Chapter 5 · Governance Strategy · Lesson 26 of 30**

## What you'll learn

- What a governance architecture review board actually does, and what it shouldn't do
- Who typically needs a seat, and why too many seats kills a board's usefulness
- What belongs on a review board's agenda — and what should never reach it
- The decision rights and escalation path that make a board's decisions actually stick

## What a review board is for

Chapter 5 so far has covered writing a strategy, sequencing a roadmap, documenting the architecture, and recording individual decisions as ADRs. A review board is the standing group that keeps making and revisiting those decisions as the architecture evolves — not a one-time committee that approved the original design and then disbanded.

Its job is narrow on purpose: review and decide on changes that are significant enough to affect the governance architecture as a whole — not rubber-stamp routine work, and not re-litigate the whole architecture at every meeting.

## Who needs a seat

A board that tries to represent every stakeholder becomes too large to decide anything. A workable governance architecture review board is usually small and specific:

- **A governance architecture lead or chief data officer** — chairs the board and owns the overall architecture.
- **A representative from security/IT architecture** — because access control and platform decisions (Chapter 4) cross directly into security's territory.
- **One or two rotating business-domain representatives** — so decisions aren't made purely by central staff with no stake in how a domain actually operates.

Anyone else attends to present a specific item, not as a standing voting member. A board with fifteen permanent seats doesn't deliberate — it performs.

## What belongs on the agenda

A review board should see:

- New ADRs for significant, hard-to-reverse decisions (Lesson 25) — reviewed and formally accepted, not just filed.
- Proposed changes to the governance operating model (Chapter 2) or platform architecture (Chapter 4).
- Policy exceptions that a steward or domain wants but that fall outside standard policy (Chapter 4's policy lessons).
- Roadmap changes that affect more than one domain or shift a major funding commitment.

It should **not** see routine data-quality fixes, individual access requests, or day-to-day steward decisions — those belong to the stewardship roles the operating model already assigns (Chapter 2), and sending them to the board just creates a bottleneck that makes people route around governance entirely.

## Decision rights and escalation

A board's authority only means something if it's written down before the first disputed decision, not negotiated in the room. At minimum, a board's charter should state:

- **Quorum** — the minimum attendance needed for a decision to count, so a three-person meeting can't bind the whole program.
- **Decision rights** — what the board can approve outright, what it can only recommend upward, and what requires the executive sponsor from Lesson 22.
- **Escalation path** — exactly where a disagreement goes if the board itself can't reach consensus, so stalemates don't just sit unresolved.

## Key terms

| Term | Meaning |
|---|---|
| Review board | The standing group that reviews and decides on significant governance architecture changes on an ongoing basis |
| Charter | The written document defining a board's membership, scope, quorum, and decision rights |
| Quorum | The minimum attendance required for a board's decision to be valid |
| Escalation path | The defined next step when a board cannot reach a decision on its own |

## Lab

Draft a short charter for a governance architecture review board at your organization or a fictional one: who holds the permanent seats (and why no more than that), three example items that belong on its agenda, one example that should never reach it, and the quorum and escalation path.

## Check yourself

Can you explain why a review board with too many permanent seats tends to become less effective, not more representative, and name one thing that should never be sent to the board at all?
