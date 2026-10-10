# Lesson 12 — Centralized vs. Decentralized Design

**Chapter 2 · Tradeoffs in Depth · Lesson 12 of 20**

## What you'll learn

- Why centralizing control creates bottlenecks and decentralizing it creates inconsistency
- Concrete Salesforce examples: a single release-management team vs. per-team admins, a Center of Excellence model, org strategy (one org vs. multiple orgs)
- How org size and growth rate change which side of this tradeoff fits
- Why this tradeoff shows up at every level, from release process to org architecture itself

## Who gets to decide, and how fast can they decide it

Centralized design puts decision-making authority and change control in one place — one release-management team that reviews and deploys every change across the org, one architecture team that approves every new object or integration pattern. Decentralized design distributes that authority — individual business-unit admins who can build and deploy changes for their own area without routing through a central gatekeeper. Centralization buys consistency: one team sees everything, catches conflicts between two teams' changes before they collide in production, and enforces one coherent data model and naming convention across the whole org. Decentralization buys speed: a business-unit admin who understands their team's actual process can ship a fix or a new automation the same day, without waiting in a central team's review queue.

The failure modes are symmetric and predictable. A fully centralized model, scaled past what the central team can actually handle, becomes a bottleneck — business units wait weeks for a small change that would take an hour to build, and the frustration eventually produces workarounds (unsanctioned spreadsheets, shadow Flow built by a business user with just enough access to be dangerous) that undermine the consistency centralization was supposed to protect in the first place. A fully decentralized model, scaled past a certain org size, produces exactly the inconsistency centralization exists to prevent: five business units independently build five different naming conventions for custom fields referring to the same underlying business concept, two teams build overlapping automation on the same object that conflicts in ways neither team can see from their own vantage point, and nobody owns the resulting mess because nobody was ever responsible for the whole picture.

## The hybrid that actually works at scale: Center of Excellence

Most Salesforce organizations that outgrow either pure extreme land on some version of a **Center of Excellence (CoE)** model: a central team owns the platform-wide concerns — data model standards, naming conventions, security architecture, integration patterns, release governance — while individual business units retain real authority to build their own team-specific automation, reports, and page layouts within those guardrails. This isn't a compromise that waters down both sides; done well, it's a genuine resolution that gets centralization's consistency on the things that actually need to be consistent platform-wide, and decentralization's speed on the things that only affect one team and don't need central review to ship safely.

## Deciding where your org sits

- **How big is the org, and how fast is it growing?** A small org with one admin team has no real decentralization problem to solve — there's no second team waiting on anyone. A large, multi-business-unit org that's grown past what one central team can review in a reasonable time has a real bottleneck problem that pure centralization will only get worse, not better.
- **What's actually at risk if a change goes wrong?** Changes to shared, foundational elements — the core data model, security settings, integrations that other teams depend on — carry a blast radius that justifies central review even if it's slower. Changes scoped entirely to one team's own process (their page layout, their team-specific Flow) carry a much smaller blast radius and are a reasonable candidate for decentralized authority.
- **Does the org have the governance tooling to make decentralization safe?** A Center of Excellence model only works if the guardrails are real — a defined data model with clear extension points, documented naming conventions, a lightweight review gate for cross-team-impacting changes. Decentralizing without those guardrails isn't flexibility; it's just skipping the governance step entirely.
- **Is this a one-org or multi-org decision?** The same tension shows up at the org-architecture level: one shared Salesforce org gives every team the same core data model and the strongest cross-team reporting, at the cost of needing governance discipline to keep teams from stepping on each other. Multiple separate orgs give each business unit full autonomy over their own configuration, at the cost of duplicated licensing, no easy cross-org reporting, and real integration work just to share data that would have been a single query inside one org.

## Key terms

| Term | Meaning |
|---|---|
| Centralized design | Putting decision-making and change control in one team, trading speed for consistency |
| Decentralized design | Distributing decision-making authority to individual teams, trading consistency for speed |
| Center of Excellence (CoE) | A hybrid governance model where a central team owns platform-wide standards while business units retain authority within those guardrails |
| Blast radius | How much of the org is affected if a given change goes wrong, used to decide how much central review a change needs |

## Lab

A company with six business units, each with its own admin, is debating whether to consolidate all Salesforce changes through one newly formed central platform team, after two business units built conflicting automation on the shared Account object last quarter. Using the criteria above, design a Center of Excellence split: what should the central team own, what should stay with business-unit admins, and what specific guardrail would have caught the Account-object conflict before it happened?

## Check yourself

Can you describe the failure mode of a fully centralized model and the failure mode of a fully decentralized model, and explain why they're symmetric? Can you explain what a Center of Excellence model actually does differently from a simple compromise, and name at least one factor that should decide how much authority a business unit gets under that model?
