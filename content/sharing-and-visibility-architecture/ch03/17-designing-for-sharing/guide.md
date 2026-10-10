# Lesson 17 — Designing for Sharing

**Chapter 3 · Sharing Architecture · Lesson 17 of 24**

## What you'll learn

- Why a sharing design has to start from business requirements, not from a list of available mechanisms
- How to build a requirements matrix that makes a sharing design reviewable before a single click in Setup
- The ordered set of design decisions an architect works through, and why the order matters
- How to avoid the two most common design failure modes: over-permissive sprawl and over-restrictive rule pileup
- Why a sharing design needs a governance plan, not just a launch-day configuration

## Start from requirements, not from mechanisms

The single most common root cause of a bad sharing design is starting in Setup — picking an OWD, then reacting to each access complaint with a new sharing rule — instead of starting from a written statement of who should and shouldn't see what, and why. A sharing design built reactively accretes exceptions one support ticket at a time and rarely gets simpler; a sharing design built from requirements can be checked for internal consistency before it's ever implemented. The first artifact an architect produces isn't a sharing rule — it's a **requirements matrix**: one row per object, columns for each role/team/group that needs access, and cells stating the required access level and the specific business reason. Writing "Sales Ops needs Read on all Opportunities to build the forecast dashboard" forces a justification that "give Sales Ops more access because someone asked" never does.

## The ordered design decisions

Once requirements are captured, the design proceeds in a deliberate order, because each decision constrains the ones after it:

1. **OWD, per object.** Default to the most restrictive setting that doesn't force an unreasonable number of exceptions. Private is the right starting assumption for anything containing sensitive or competitively important data; Public Read Only is reasonable for genuinely broad internal collaboration; Public Read/Write is reserved for objects where record-level restriction adds cost without adding real protection (and, per the previous lesson, is sometimes the right call purely for large-data-volume performance).
2. **Role hierarchy and territory hierarchy.** Shape these to match real lines of accountability, not the org chart as drawn in a slide deck — and keep them as shallow as the business will tolerate, since hierarchy depth is also a sharing-recalculation cost.
3. **Sharing rules, teams, and public groups for genuine exceptions.** Only after the baseline is set should exceptions be layered on, and each one should trace back to a specific row in the requirements matrix, not to a one-off complaint.
4. **Manual sharing and Apex managed sharing**, reserved for the cases the declarative layers genuinely can't express.
5. **Restriction rules**, only if a narrow slice of records needs to be hidden from people the layers above would otherwise expose it to.

Working in this order prevents the common failure of picking a convenient OWD first and then discovering, three sharing rules later, that the role hierarchy should have been doing most of the work.

## Two failure modes to design against

**Over-permissive sprawl** happens when OWD is set broad "to avoid sharing rule complexity" and record-level control is quietly abandoned — it looks simple on day one and becomes an audit finding eighteen months later when nobody can explain why a junior rep can see every account in the company. **Over-restrictive rule pileup** happens when OWD is set to Private by default everywhere and every single access need becomes a bespoke sharing rule, producing dozens of rules per object that nobody can hold in their head, each one a future maintenance liability and a performance cost at scale (Lesson 15). Good design sits deliberately between these: restrictive enough that every grant has a reason, permissive enough that the number of exceptions stays small and explainable.

## Plan for change, not just for launch

A sharing design is a living system, not a one-time deliverable — new teams form, territories get redrawn, acquisitions bring in new roles that don't map cleanly onto the existing hierarchy. A design that only works for the org as it exists on launch day will start accumulating undocumented exceptions within months. The practical answer, mirroring the periodic-review discipline used for data classification, is to assign ownership of the sharing design itself — someone accountable for reviewing the requirements matrix on a cadence, confirming sharing rules still map to real business reasons, and retiring exceptions whose original justification no longer applies. A sharing design without an owner degrades exactly the way an unowned classification scheme does: quietly, and in ways nobody notices until an access review turns up something nobody can explain.

## Key terms

| Term | Meaning |
|---|---|
| Requirements matrix | A document mapping each object × role/group combination to a required access level and business reason |
| Over-permissive sprawl | A design failure where OWD is set too broad to avoid sharing-rule complexity, eroding real record-level control |
| Over-restrictive rule pileup | A design failure where every access need becomes its own bespoke sharing rule, producing an unmaintainable number of rules |
| Design ownership | Ongoing accountability for keeping a sharing design's rules mapped to current, valid business reasons |

## Lab

For a hypothetical Property Management object (OWD currently Private, no sharing rules yet) at a commercial real estate firm, build a requirements matrix with at least five rows covering distinct roles (e.g., Property Manager, Regional Director, Leasing Agent, Finance, External Auditor) and the access level and justification each one needs. Then walk the ordered design decisions: propose the OWD, describe the role hierarchy shape, and list only the sharing rules/teams that remain necessary after the hierarchy does its share of the work. Flag any row in your matrix you can't justify in one sentence — that row isn't ready to implement.

## Check yourself

Why does starting a sharing design from a requirements matrix produce a more maintainable result than starting from Setup and reacting to access complaints? Describe over-permissive sprawl and over-restrictive rule pileup, and explain why both are failure modes rather than opposite "safe" extremes.
