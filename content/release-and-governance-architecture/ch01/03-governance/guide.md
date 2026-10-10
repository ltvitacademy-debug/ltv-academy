# Lesson 3 — Governance

**Chapter 1 · Release and Governance · Lesson 3 of 16**

## What you'll learn

- What "governance" means in an enterprise IT context, distinct from day-to-day administration
- The three layers governance usually operates at: strategic, tactical, and operational
- The Center of Excellence (CoE) model and the problem it's designed to solve
- Centralized vs. federated governance, and why most mature Salesforce orgs land somewhere in between
- Why governance is a continuous program, not a one-time policy document

## Governance is not the same thing as administration

**Governance** is the set of decision rights, policies, and oversight mechanisms that determine *how decisions about the platform get made* — who can approve what, what standards a change has to meet, and how conflicting priorities between teams get resolved. **Administration** is the day-to-day work of actually running the platform: creating users, building a Flow, configuring a report. A single person can do both jobs in a small organization, but as a Salesforce footprint grows — more users, more teams, more integrated systems, more regulatory exposure — the two have to separate, because a growing number of administrators making independent decisions without a shared framework is exactly how an org accumulates the kind of inconsistency and risk this whole course exists to prevent.

## Three layers of governance

Enterprise governance frameworks typically describe decision-making at three distinct altitudes, and a Salesforce governance program is no exception:

- **Strategic governance** — the highest level, setting overall direction: what business capabilities the platform should serve, what the multi-year roadmap looks like, and what risk the organization is willing to accept. This is usually owned by an executive steering committee or a platform owner reporting to leadership.
- **Tactical governance** — the middle layer, translating strategy into standards and policy: data model standards, naming conventions, integration patterns, the change-control policy covered starting in Lesson 4. This is where a Center of Excellence typically operates.
- **Operational governance** — the day-to-day layer, applying the tactical standards to real work: reviewing an individual change request against the standards, running the change advisory board (Lesson 5), approving a specific deployment.

A healthy governance program keeps these layers distinct and connected: operational decisions should be traceable back to a tactical standard, and tactical standards should serve the strategic direction — not the other way around, where operational convenience quietly becomes the de facto strategy because nobody above is paying attention.

## The Center of Excellence model

A **Center of Excellence (CoE)** is a common structure organizations use to run the tactical layer of Salesforce governance: a small, cross-functional group — architects, lead admins, business stakeholders, sometimes security and compliance representatives — that owns the platform's standards, reviews significant changes for consistency, and acts as the escalation point when teams disagree about how something should be built. The CoE doesn't necessarily build everything itself; its job is to make sure everyone else building on the platform is pulling in the same direction.

## Centralized vs. federated

Governance structures generally sit somewhere between two extremes:

- **Centralized governance** puts platform decisions in one team's hands — a single IT-owned Salesforce team controls all configuration and development. This maximizes consistency but can become a bottleneck as demand grows, since every business unit's request funnels through the same small team.
- **Federated governance** distributes day-to-day admin and build work out to admins embedded in individual business units or departments, while a central body (often the CoE) retains ownership of shared standards, the data model, and cross-cutting policy. This scales better for a large, multi-department org, but only works if the central standards are actually enforced — otherwise federation just becomes decentralization with no oversight at all, and the organization is back to the inconsistency problem governance exists to solve.

Most mature, larger Salesforce programs land on a federated model with real central enforcement, precisely because a single central team can't keep up with demand across a large enterprise, but fully decentralized admin work with no shared standard reliably produces the kind of org-wide inconsistency and technical debt covered in Lesson 13.

## Governance is a program, not a document

Writing a governance charter once and filing it away accomplishes nothing on its own. Governance only works as a continuously running program: standards get enforced through the change-control process (Lesson 4), decisions get reviewed by a CAB (Lesson 5) and, for larger changes, an architecture review board (Lesson 15), and the documentation itself gets kept current (Lesson 14) rather than becoming a stale artifact nobody consults.

## Key terms

| Term | Meaning |
|---|---|
| Governance | The decision rights, policies, and oversight that determine how platform decisions get made |
| Strategic governance | The top layer: overall direction, roadmap, and risk appetite, usually set by executive leadership |
| Tactical governance | The middle layer: standards and policy that translate strategy into enforceable rules |
| Operational governance | The day-to-day layer: applying standards to specific change requests and deployments |
| Center of Excellence (CoE) | A cross-functional group that owns platform standards and reviews significant changes for consistency |
| Federated governance | A model where build work is distributed to business-unit admins while a central body retains shared standards |

## Lab

A company has grown from one central Salesforce team to five separate departments, each with its own admin making independent decisions about fields, automations, and reports, with no shared standards. Write a short proposal (half a page) recommending whether this org should move toward centralized or federated governance, and sketch what a CoE's first three responsibilities should be in your recommended model.

## Check yourself

Can you explain the difference between governance and administration in your own words? Can you describe the three governance layers and give one concrete example of a decision that belongs at each layer? Can you explain the trade-off between centralized and federated governance, and why most large orgs end up federated with central enforcement rather than fully centralized or fully decentralized?
