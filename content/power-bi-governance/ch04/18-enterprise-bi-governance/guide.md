# Lesson 18 — Enterprise BI Governance

**Chapter 4 · Lifecycle and Enterprise BI · Lesson 18 of 20**

## What you'll learn

- How this course's 17 lessons collapse into one tenant-wide governance surface
- What a governance status dashboard actually measures across an entire estate
- How recommended actions turn governance from an abstract goal into a concrete task list
- What enterprise scale actually looks like, in real numbers

## From one item to the whole estate

Every lesson so far has mostly worked at the scale of one workspace, one dataset, one pipeline. Real enterprise governance means answering the same questions — is this secured, is this trusted, is this current — across every workspace in the tenant at once. Microsoft Fabric's governance surface (the same platform Power BI now runs on) gives exactly that view.

![Screenshot of a governance status dashboard showing domains, workspaces, and item counts, alongside charts for items owned by type, by last refresh date, with description, and by last access date.](/courses/power-bi-governance/ch04/18-enterprise-bi-governance/onelake-catalog-govern-tab-governance-status.png)
*Domains, workspaces, items — and how much of it has a description, and how recently it was touched. One tenant, one view.*

Notice how directly this maps to earlier chapters: "items with description" is a documentation signal, "items by last access date" is this course's usage-metrics idea applied estate-wide instead of to one report.

## Every chapter, one dashboard

This single governance surface is really this entire course, rolled up:

- **Workspaces** (Chapter 1) — who owns what, and where it lives
- **Sensitivity and trust** (Chapters 2-3) — label coverage, endorsement and certification, applied across every item rather than checked one at a time
- **Lifecycle** (Chapter 4) — the same pipeline discipline from Lessons 16-17, now visible as a tenant-wide pattern instead of one pipeline's history

A tenant admin isn't learning a new set of concepts at this scale — they're looking at the same concepts this course already taught, aggregated.

## Governance that tells you what to do next

A dashboard full of numbers is only useful if it leads somewhere. The same screen surfaces concrete, specific recommended actions.

![Screenshot of four recommended action cards: Structure your Fabric data with domains, Increase sensitivity label coverage, Establish sources of truth with endorsements, and Enhance data curation with tags.](/courses/power-bi-governance/ch04/18-enterprise-bi-governance/onelake-catalog-govern-tab-recommended-actions-admins.png)
*Structure data by domains, raise sensitivity label coverage, establish sources of truth with endorsements, curate with tags — concrete, not abstract.*

"Establish sources of truth with endorsements" is Lessons 11 and 12, pointed at the whole tenant instead of one dataset. "Increase sensitivity label coverage" is the labeling work from earlier in this career path, with a completion number attached instead of a one-off checklist.

## What enterprise scale actually looks like

The numbers involved at real enterprise scale are a useful reality check against the single-workspace examples earlier in this course.

![Screenshot of an organization-wide data estate summary showing 7 domains, 12 capacities, 134 workspaces, and 2,545 items, alongside charts for items by type, workspaces by capacity SKU, top operations, and most viewed reports.](/courses/power-bi-governance/ch04/18-enterprise-bi-governance/onelake-catalog-govern-tab-insights-admins.png)
*Thousands of items, over a hundred workspaces — the same governance questions this course asked about one dataset, answered at tenant scale.*

134 workspaces and 2,545 items is not a scale where a governance team can manually check each item's sensitivity label or certification status. That's exactly why every mechanism this course covered — tenant settings, endorsement, lineage, audit logs — is designed to scale down to individual judgment calls but roll up into a single tenant-wide picture like this one.

## Key terms

| Term | Meaning |
|---|---|
| Governance status | A tenant-wide dashboard summarizing domains, workspaces, items, and documentation/sensitivity coverage |
| Recommended actions | Specific, actionable governance tasks surfaced from the current state of the tenant |
| Data estate | The full collection of an organization's domains, workspaces, and items across the tenant |

## Lab

Pick any three of this course's earlier lessons (any chapter). For each one, write one sentence describing what that lesson's topic would look like rolled up to tenant scale — the way Lessons 11-12's endorsement became "sources of truth" and labeling became "sensitivity label coverage" in this lesson.

## Check yourself

Without looking back, can you name at least three earlier lessons in this course that map directly onto something shown on this lesson's governance status dashboard or recommended actions screen?
