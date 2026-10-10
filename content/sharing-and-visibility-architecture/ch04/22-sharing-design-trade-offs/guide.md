# Lesson 22 — Sharing Design Trade-Offs

**Chapter 4 · Review and Practice · Lesson 22 of 24**

## What you'll learn

- The five dimensions an architect weighs when two or more sharing designs both technically satisfy a requirement
- Why "which one is correct" is usually the wrong question in sharing-model design
- A worked trade-off comparison across three realistic design options for the same requirement
- How to write a recommendation that defends a trade-off rather than just naming a winner

## There is rarely one correct sharing design

Chapters 1 through 3 built up a full toolkit — OWD, role hierarchy, sharing rules, teams, manual sharing, public groups, Apex managed sharing, territory management, restriction rules — and for almost any real requirement, more than one combination of those tools can technically deliver the required access. That's the uncomfortable truth behind sharing-model design: the hard part usually isn't finding *an* answer that works, it's choosing among several that all work, each with a different cost profile. An architect who can only produce one design, and can't articulate why it beats the alternatives, hasn't actually finished the job — which is exactly what Lesson 23's review board format tests directly.

## The five dimensions worth weighing

- **Build cost.** How much configuration, Apex, or data-model change does the option require before it's live?
- **Maintenance cost.** Who updates this when the business changes — a declarative admin, or a developer re-deploying Apex? How often will it need touching?
- **Performance and recalculation impact.** Does this option trigger frequent, expensive sharing recalculation (role re-parenting, territory reassignment, criteria-rule changes), and how does that scale as data volume grows?
- **Auditability and transparency.** Can a reviewer open Setup and see *why* a user has access, the way Lesson 21 covered — or does the logic live inside Apex code that only a developer can trace?
- **Flexibility for future change.** When the requirement shifts next year, does this design bend, or does it need to be rebuilt?

No option wins on all five at once — that tension is the entire point of the exercise.

## A worked scenario

**Requirement:** A field-service company's technicians should see only work orders assigned to their current service region. Regions are reassigned every quarter as the company's territory map shifts, and there are roughly 400 technicians across 30 regions.

**Option A — Role hierarchy, one role per region.** Create 30 regional roles under a dispatch-manager role; assign each technician the role matching their region; rely on "my role sees my role's records" (OWD Private) for visibility.
*Trade-offs:* cheap to build initially, fully declarative, highly auditable (role assignment is visible on every user record). But maintenance is expensive and fragile — each quarterly reassignment means re-parenting or reassigning roles for a large share of 400 users, each change triggers sharing recalculation, and role hierarchy was never designed to double as a region map that changes every quarter.

**Option B — Public groups plus a criteria-based sharing rule keyed to a Region field.** Keep OWD Private, add a Region picklist to the work order, and write a criteria-based sharing rule per region granting access to each region's public group; manage membership by updating group membership each quarter.
*Trade-offs:* decouples the "who's in which region" question from the org's role hierarchy entirely — the hierarchy stays about management reporting, not geography. Membership changes are lighter-weight than role reassignment and don't force a full hierarchy recalculation. But it caps out at the platform's criteria-based sharing rule limits per object, and 30 regions is a lot of rules to keep straight if regions themselves ever get added or merged.

**Option C — Enterprise Territory Management.** Model the 30 regions as territories in a Territory Model, assign technicians to territories and work orders (via their related Account) to the matching territory.
*Trade-offs:* built for exactly this problem — a second access axis, independent of role hierarchy, with its own Planning state so a quarterly remap can be validated before activation (Lesson 11, Chapter 2). Highest build cost up front, and activation is the expensive, all-at-once recalculation event Chapter 3 covered — but for a genuinely territory-shaped, frequently-changing requirement at this scale, it is the tool purpose-built for the job, not a role hierarchy or sharing-rule workaround bent into shape.

## Recommending, not just picking

For this scenario, Territory Management is the strongest fit *because* the requirement is explicitly territory-shaped and changes on a predictable cadence — the Planning-state safety net is worth the higher build cost precisely because the reassignment the company dreads every quarter is the exact failure mode it protects against. A good recommendation names that reasoning explicitly, not just the winning option — because the same recommendation would be wrong for a company that reorganizes regions once a year instead of quarterly, where Option A's lower build cost might outweigh its maintenance pain.

## Key terms

| Term | Meaning |
|---|---|
| Build cost | The up-front effort — configuration, data model, Apex — to stand up a sharing design |
| Maintenance cost | The ongoing effort to keep a design correct as the business changes |
| Recalculation impact | How much, and how often, a design triggers asynchronous sharing recalculation |
| Auditability | How visible and traceable a design's access decisions are to a reviewer, without reading code |

## Lab

A new requirement: a healthcare SaaS company wants account executives to see only the Accounts in their assigned vertical (Hospitals, Clinics, Payers — three verticals, 60 reps, reassigned rarely, maybe once a year). Produce a trade-off table like the one above for three options of your choosing (at minimum, consider a role-hierarchy approach and a public-group-plus-sharing-rule approach), score each against the five dimensions, and write a three-sentence recommendation that explains *why* your pick fits this specific cadence and scale — not just that it works.

## Check yourself

Why is "which design is correct" usually the wrong framing for a sharing-model decision? In the field-service scenario above, what single fact about the requirement (not about Salesforce) is doing the most work in justifying Territory Management over the cheaper role-hierarchy option?
