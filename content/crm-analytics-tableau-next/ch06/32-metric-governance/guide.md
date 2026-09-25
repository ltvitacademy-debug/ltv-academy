# Metric Governance

Defining a metric centrally solves half the problem. The other half is keeping it correct as the business changes: someone has to own it, someone has to approve changes, and everyone has to know where the official version lives. That is **metric governance**. It is less about tools than about clear ownership, a lightweight change process, and using the platform's sharing controls to enforce it.

## What you'll learn

- What metric governance covers, and why a definition alone is not enough
- Who should own, edit, and consume a metric
- How Tableau Next workspaces, roles, and referenced assets support governance
- A simple change process that stops silent redefinitions

## Why governance matters

Businesses change. A sales process gains a new stage, finance changes its revenue recognition rule, or a fiscal calendar shifts. If the metric definition changes silently, last quarter's numbers stop matching this quarter's, and trust erodes fast. Governance makes change deliberate, visible, and reversible.

## Roles: owner, editors, consumers

Decide these explicitly for every important metric:

- **Owner**: the named person or team accountable for the definition, typically a business function such as Revenue Operations, not whoever built it.
- **Editors**: a small group allowed to change the semantic model and its metrics.
- **Consumers**: everyone else, who should be able to use the metric but not alter it.

Tableau Next's sharing model maps onto this. Workspaces can be shared with a Viewer or Editor role, and other assets such as semantic models and dashboards are shared with the Viewer role. Keeping the Editor role rare is how you protect the definitions. Access to the underlying data objects is controlled separately in Data 360, which lets data governance and metric governance work as two distinct layers.

## Reference, do not copy

Governance falls apart when every team keeps its own copy of a definition. Tableau Next lets an asset live in one workspace and be **referenced** from other workspaces without duplicating it. Salesforce's Trailhead guidance on workspace strategy describes a pattern where a central team creates and shares a core semantic model while other teams reference that model to build their own dashboards. Referenced assets are marked in the workspace list, so users can see the asset comes from another workspace. The official version stays in one place, and consumers build on it.

## The consumer view

For consumers, a governed metric shows up as a simple page: the current value, its change compared with the prior period, a time range, and filters, with a Follow option so people can get updates. Consumers see one trusted number and never need to know how it is calculated. That trust is what the governance work protects.

## A lightweight change process

1. **Propose**: anyone can request a change or a new metric, with the business reason.
2. **Review**: the owner and one technical reviewer confirm the definition and its impact on existing dashboards.
3. **Publish**: an editor changes the model, and updates the description.
4. **Announce**: tell consumers what changed and from what date, so period comparisons are understood.
5. **Retire**: when a metric is replaced, mark or remove the old one rather than leaving two competing versions.

## Keep it proportionate

Not every calculation needs a committee. Govern the metrics that appear in executive reporting, compensation, or external commitments. Leave exploratory work to analysts, and promote a calculation to a governed metric when it becomes widely used.

## Key terms

| Term | Meaning |
|---|---|
| Metric governance | Ownership, change control, and access rules for metric definitions |
| Owner | The accountable business person or team for a definition |
| Referenced asset | An asset used in another workspace without being copied |
| Change process | The steps that make redefinition deliberate and visible |

## Check yourself

Your CFO changes the rule for recognizing revenue on multi-year deals. Walk through the five steps of the change process for the Closed Won Revenue metric.
