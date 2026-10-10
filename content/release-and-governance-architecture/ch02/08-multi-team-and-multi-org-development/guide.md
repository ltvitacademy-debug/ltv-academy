# Lesson 8 — Multi-Team and Multi-Org Development

**Chapter 2 · Enterprise Deployment · Lesson 8 of 16**

## What you'll learn

- Why multiple teams building on one shared org creates a different class of risk than one team alone
- Metadata conflicts: what they are and the main strategies for avoiding them
- The difference between a single shared org, an org split by business unit, and a hub-and-spoke multi-org model
- How packaging (unlocked packages) helps isolate team-level work inside a shared org
- How this connects back to the governance model from Lesson 3

## One org, many teams: where the risk comes from

A single Salesforce org with one small admin team is easy to reason about. The moment a second team starts building in the same org — a different department's admin adding fields to Account, a separate development team shipping Apex that touches the same objects — new risk appears that has nothing to do with either team's work being individually bad. Two teams can each make a perfectly reasonable, well-tested change to the same object in the same release window and still conflict with each other: a new required validation rule from one team breaks an automated process the other team just built, or two teams each add a field with a similar purpose because neither knew the other's was coming.

## Metadata conflicts

A **metadata conflict** happens when two changes, developed independently, interact badly once they land in the same org — not because either change is wrong on its own, but because nobody coordinated them. Metadata conflicts show up in a few recurring shapes: two teams editing the same Flow or page layout in parallel sandboxes and one person's changes overwriting the other's on deployment; a new automation from one team firing unexpectedly on records a different team's process already modified in the same transaction; or simply duplicate, overlapping fields and automations built by teams unaware of each other's work. The release calendar and shared visibility from Lesson 7 is the first defense — teams can't avoid colliding with work they don't know is happening. Architecture review (Lesson 15) and a shared data dictionary (Lesson 14) are the deeper defenses, catching overlap before it's even built, not just before it's deployed.

## Single org vs. multi-org strategies

As an enterprise grows, it faces a real strategic choice about org topology:

- **A single shared org** keeps everyone on one platform instance, which maximizes data visibility and cross-team reporting, but concentrates all of the coordination problems above into one place and one shared release calendar.
- **Business-unit-specific orgs** give each major business unit its own separate Salesforce org, eliminating a lot of cross-team metadata conflict by eliminating the shared environment — at the cost of fragmented reporting and duplicated administrative overhead, since now each org needs its own governance, its own admins, its own release process.
- **A hub-and-spoke model** keeps a central org (the hub) for shared, cross-cutting capabilities and data, with separate orgs (spokes) for business-unit-specific needs, integrated back to the hub. This is a genuine middle ground, but it adds real integration architecture complexity — the hub and spokes have to stay in sync, which is its own governance and technical problem.

None of these is a universally correct answer; the right choice depends on how much the business units genuinely need to share data and process versus how much independence they need, and it's exactly the kind of decision that belongs at the strategic governance layer from Lesson 3, not left to whichever team happens to ask for a new org first.

## Packaging as a team-isolation tool within a shared org

Within a single shared org, **unlocked packages** (a Salesforce DX packaging format) give teams a way to build and version their own metadata as a distinct, trackable unit, deployed and upgraded somewhat independently of other teams' packages, rather than every team's metadata living in one undifferentiated pool. This doesn't eliminate the possibility of conflict — two packages can still both touch the same standard object — but it gives teams clearer ownership boundaries, a defined dependency relationship between packages, and a much easier way to see exactly what a given team's release actually changes, which materially reduces how often conflicts happen and how hard they are to diagnose when they do.

## The governance connection

None of these structural choices — org topology, packaging strategy, how teams coordinate on a shared calendar — are purely technical decisions. They're governance decisions, which is why Lesson 3's distinction between centralized and federated governance matters here directly: a federated governance model with real central standards (a shared data dictionary, enforced naming conventions, a central architecture review for anything crossing team boundaries) is what makes multi-team development on a shared org actually survivable at scale.

## Key terms

| Term | Meaning |
|---|---|
| Metadata conflict | Two independently developed changes that interact badly once deployed together, despite neither being wrong alone |
| Hub-and-spoke model | A multi-org topology with a central shared org (hub) and business-unit-specific orgs (spokes) integrated back to it |
| Unlocked package | A Salesforce DX packaging format letting a team version and deploy its metadata as a distinct, trackable unit |

## Lab

Two teams share one Salesforce org: a sales operations team and a customer service team. Sales operations is about to deploy a new validation rule on Account requiring a region field to be populated before saving. Customer service has an existing automated process that creates new Account records from a support intake form, without populating region. Using this lesson's concepts, explain how this would surface as a metadata conflict, what in this lesson could have caught it before deployment, and what org-topology or packaging choice (if any) would reduce the chance of this kind of conflict recurring.

## Check yourself

Can you explain why two individually well-tested changes can still conflict once deployed to the same org? Can you describe the trade-off between a single shared org, business-unit-specific orgs, and a hub-and-spoke model? Can you explain how unlocked packages help teams coordinate inside a shared org without eliminating conflict entirely?
