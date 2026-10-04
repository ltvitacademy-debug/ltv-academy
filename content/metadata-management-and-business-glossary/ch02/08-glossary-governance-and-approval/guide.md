# Lesson 8 — Glossary Governance and Approval

**Chapter 2 · Business Glossary · Lesson 8 of 25**

## What you'll learn

- Why a glossary needs a formal approval workflow instead of open editing
- The standard term lifecycle states: draft, in review, approved, deprecated
- Who should hold approval authority, and why that usually isn't IT
- How this connects back to the "maintain" stage of the metadata lifecycle (Lesson 4)

## Why open editing doesn't work

A glossary anyone can edit freely sounds democratic, but in practice it degrades fast: two people disagree about what "Active Customer" means, both edit the same entry back and forth, and within weeks the definition that was carefully written using Lesson 7's four-part test has drifted into something vague again, with no record of who changed what or why. A glossary without governance isn't really a glossary — it's a wiki page with extra steps, and it inherits a wiki page's reliability problems.

## The standard term lifecycle

Most mature glossary programs use a four-state lifecycle for every term:

1. **Draft** — proposed, not yet reviewed; visible but flagged as unofficial, so people can see it's coming without treating it as final
2. **In review** — submitted for approval, with the proposing steward's rationale attached
3. **Approved** — the official, current definition — this is the state most of a glossary should be in most of the time
4. **Deprecated** — retired, per the metadata lifecycle's "retire" stage (Lesson 4) — the old definition stays visible (marked clearly as deprecated) rather than disappearing, so historical references still resolve

A term should never jump straight from nothing to "approved" — the review step is what catches the circular definitions and vague qualifiers Lesson 7 covered, before they become the organization's official answer.

## Who holds approval authority

Approval authority for a glossary term should sit with the **business steward** accountable for that domain (Data Governance Foundations, Lesson 14) — not with IT, and not with whoever happens to be the most active glossary editor. IT can maintain the *tool*, but shouldn't be deciding what "Net Revenue" means to the Finance organization; that's a business judgment, not a technical one. This mirrors the RACI pattern from Data Governance Foundations Lesson 17: the steward is Accountable, other stakeholders are Consulted, and the broader organization is Informed once a term is approved.

## Connecting to the metadata lifecycle

This whole approval workflow is simply the **capture** and **maintain** stages of the metadata lifecycle (Lesson 4) made concrete for one specific artifact. Draft and in-review correspond to capture; approved-but-periodically-reconfirmed corresponds to maintain; deprecated corresponds to retire. A glossary with no governance process has, in effect, skipped straight to "approved" for every entry with no capture discipline and no maintain stage at all — exactly the failure mode Lesson 4 warned was the most commonly skipped.

## Key terms

| Term | Meaning |
|---|---|
| Term lifecycle | Draft → in review → approved → deprecated |
| Approval authority | The person or role with the final say on a term's official definition — usually a business steward |
| Deprecated term | A retired definition that stays visible, marked clearly, rather than being deleted |

## Lab

For one term you'd propose adding to a glossary, sketch out who should be "Accountable" for approving it (a specific role, not a department), and who should be "Consulted" before it's approved. If you're not sure, that uncertainty is itself useful information about an ownership gap.

## Check yourself

Can you list the four term lifecycle states in order, explain why approval authority usually sits with a business steward rather than IT, and connect each lifecycle state back to the metadata lifecycle stages from Lesson 4?
