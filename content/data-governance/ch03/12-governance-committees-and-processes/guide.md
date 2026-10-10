# Lesson 12 — Governance Committees and Processes

**Chapter 3 · Building Governance · Lesson 12 of 14**

## What you'll learn

- The role a governance committee (or Change Control Board) plays, distinct from the day-to-day data owners and stewards from Chapter 1
- How a tiered change process (urgent / routine / major release) keeps governance from becoming a bottleneck
- Where data-governance review fits concretely inside that tiered process
- Why a committee needs representation from multiple business functions, not just IT
- How disputes actually get resolved in practice, using the escalation path this committee provides

## What the committee is for

Chapter 1 named individual roles — data owner, business steward, technical steward, custodian — each accountable for a specific slice of the work. A **governance committee** (sometimes called a Change Control Board, or housed inside the Center of Excellence from Lesson 11) sits above all of them. It doesn't do the day-to-day work of applying a classification label or configuring a Duplicate Rule; it exists for the questions those individual roles can't settle on their own: resolving disputes between departments that each believe they own the same object's data (Lesson 2), deciding whether the org-wide classification scheme itself needs to change, and approving changes that are big or risky enough to need more than one person's sign-off.

## A tiered process, not one-size-fits-all

A committee that has to personally review every single change — down to a typo fix in a picklist label — becomes exactly the bottleneck governance is supposed to prevent. The practical answer is a **tiered change process**, commonly structured around three levels: small, low-risk changes owned and executed by an individual sub-team without committee involvement; routine changes affecting two or more groups, batched into a recurring (often monthly) release reviewed by the committee as a group; and major changes — a new integration, a new object touching regulated data, a Data Cloud rollout — that get their own dedicated review, often with a longer lead time and more stakeholders at the table. Calibrating which tier a given change falls into is itself a committee responsibility, and getting it wrong in either direction causes a real problem: too strict, and routine work grinds to a halt waiting for a monthly meeting; too loose, and risky changes slip through with no governance review at all.

## Where data governance fits inside this tiered process

Lesson 11 argued that data-governance checkpoints need to live inside the existing release process rather than as a separate parallel approval nobody follows. Concretely, that means: a small change that only touches a field already classified and governed (adjusting a report filter, say) stays in the no-committee tier; a routine change that introduces a new field on an already-governed object (does it need a Data Sensitivity Level? does it change the object's retention profile?) gets a lightweight data-governance checklist item in the monthly batch review; and a major change — a new integration pulling customer data into a new system, or a Data Cloud rollout unifying data across orgs — triggers a full data-governance review covering classification, retention, consent, and audit implications before it's approved, not after it's already live.

## Why the committee needs more than IT in the room

A governance committee staffed only by the Salesforce admin team will systematically under-weight business risk it doesn't have visibility into — a classification decision needs someone who understands the regulatory exposure, a retention decision needs someone who understands the legal obligation, and an ownership dispute needs someone with the standing to actually bind both departments to a resolution. A well-formed committee draws a few representatives from different functional groups (not every function, which becomes unwieldy) — commonly including IT/the platform team, a business-operations representative, and someone representing legal/compliance or security — so that the decisions made actually carry authority across the organization, not just within IT.

## The escalation path in practice

Everything from earlier lessons that described "escalate to the governance body" (Lesson 2's ownership disputes, Lesson 3's role-handoff standards questions, Lesson 6's retention-vs.-erasure conflicts) is describing this same committee as the landing point. In practice, that escalation path needs to be as concretely defined as any other part of the framework: who can bring an issue to the committee, how often it meets for routine business versus how quickly it can convene for something urgent, and how a decision, once made, gets communicated back out and recorded — so the same dispute doesn't quietly resurface eighteen months later because nobody wrote down how it was resolved the first time.

## Key terms

| Term | Meaning |
|---|---|
| Governance committee | The cross-functional body resolving disputes, approving major changes, and owning the governance framework itself |
| Change Control Board | A common alternate name for the governance committee, especially framed around release/change approval |
| Tiered change process | Classifying changes by risk/scope (individual, routine batch, major release) so review effort matches actual risk |
| Escalation path | The defined route by which a dispute or decision that individual roles can't resolve reaches the committee |

## Lab

A proposed Data Cloud rollout will unify customer data across three previously separate Salesforce orgs, each with its own Account/Contact definitions and its own (inconsistent) classification labels. Using this lesson's tiered model, explain why this change belongs in the "major" tier rather than the routine monthly batch, name at least three functional perspectives that should be represented in the committee's review of this specific change, and identify one earlier lesson's unresolved issue (pick ownership, classification, or retention) that this rollout would force the committee to finally settle.

## Check yourself

Can you explain why a governance committee reviewing every single change, regardless of size, defeats the purpose of having tiers at all? Can you name at least three functional perspectives a well-formed governance committee should include, and why IT alone isn't sufficient?
