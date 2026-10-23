# Lesson 13 — Capstone: Requirements Gathering

**Chapter 4 · Capstone Kickoff · Lesson 13 of 26**

## What you'll learn

- How to run a real stakeholder interview that surfaces specific, not generic, requirements
- What each of Meridian's three help-desk leads actually asks for — and where their asks conflict
- Why a category-mapping conflict like this one is a requirements problem, not a configuration problem
- How to turn three interviews' worth of raw, sometimes-contradictory input into one written
  requirements document
- Why documenting a conflict honestly is more valuable than quietly picking a side before anyone
  asks

## Three interviews, three very different starting points

A real ServiceNow implementation doesn't start with a data dictionary — it starts with people who
have been doing the job a certain way for years and have strong, specific, well-earned opinions
about what has to keep working. For this workstream, that means structured interviews with each
hospital system's current help-desk lead: St. Catherine's, Lakeshore, and Prairie View. The goal of
each interview is the same: what does your team actually need to do its job on day one of the new
platform, and what happens today that a generic "best practice" ITSM rollout might accidentally
break?

## St. Catherine's: "Don't flatten what already works"

St. Catherine's help-desk lead runs the most mature process of the three and is the least worried
about losing capability — their worry is losing precision. Their current system uses a detailed,
multi-tier category scheme (hardware, by device type and location; software, by application and
vendor; access, by system and approval chain) that feeds their existing reporting and staffing
decisions. Their explicit requirement: whatever categorization the new platform uses, it has to
preserve that level of detail, or their management reporting breaks on day one. They're also the
most comfortable with formal change control and expect the new platform to support it, not loosen
it.

## Lakeshore: "Don't make this feel like losing control"

Lakeshore's help-desk lead is less worried about losing report precision and more worried about
losing autonomy. Their current categories are flatter and simpler than St. Catherine's — built over
years to match how their own two-hospital team actually triages work, not a formal taxonomy. Their
explicit requirement is less about the fields themselves and more about governance: who gets to
change their categories once the platform launches, and whether a "corporate" decision at Meridian
level can silently override something Lakeshore configured for its own use. They want local
flexibility protected, not just local data protected.

## Prairie View: "Prove this isn't last time"

Prairie View's help-desk lead has the fewest formal requirements about data structure — their
current process is informal enough that almost any structured categorization would be an
improvement — and the strongest requirement about process. After the forced consolidation eight
years ago, their explicit ask is for a visible say in the rollout timeline and training plan, and a
commitment that their team's input shapes what gets built, not just that it gets announced to them
afterward. Treat this requirement with the same weight as a technical one: for Prairie View, trust
in the process is a project risk exactly as real as a broken integration.

## Where these requirements actually conflict

Lay all three side by side and one real conflict jumps out immediately: St. Catherine's detailed
multi-tier categories, Lakeshore's flatter locally-tuned list, and Prairie View's informal, almost
nonexistent categorization do not map cleanly onto each other. A ticket that St. Catherine's would
file three levels deep under "Hardware > Laptop > Docking Station" has no equivalent bucket in
Prairie View's current process at all. This is not a problem you can solve by interviewing more
carefully — it's a real structural conflict between three legitimate ways of working, and it has to
be written down as a conflict, not silently resolved in whoever's favor seems easiest, before
anyone starts configuring category fields.

## Writing it up: the requirements document

A real requirements document for this workstream organizes what you heard into sections a reviewer
can actually act on: **functional requirements** (what the Service Desk must let each system's
agents do), **non-functional requirements** (domain-scoped visibility, reporting access, the
performance and availability each system expects), **stakeholder sign-off** (who from each system
reviewed and confirmed their section is accurate), and a clearly labeled **open conflicts** section
that states the category-mapping problem plainly, names the systems affected, and flags it for a
scoping decision rather than resolving it here. That last section is the most important one in the
whole document — it's the honest record that Lesson 14's scoping work has to resolve deliberately,
not the thing a rushed requirements pass quietly papers over.

## Key terms

| Term | Meaning |
|---|---|
| Stakeholder interview | A structured conversation surfacing a specific group's real operational needs, not assumptions about them |
| Functional requirement | What the system must let a specific group of users actually do |
| Non-functional requirement | A quality the system must have — domain visibility, performance, reporting access — rather than a feature |
| Open conflict | A documented, unresolved disagreement between stakeholders' requirements, flagged for a deliberate scoping decision |

## Check yourself

St. Catherine's wants to preserve its detailed category scheme; Lakeshore wants local control
over its own categories; Prairie View wants a visible say in the rollout more than any specific
data structure. Without deciding the answer yet, explain why writing all three requirements down
as an honest, unresolved conflict is a better outcome from this lesson than quietly picking one
system's scheme as the default.
