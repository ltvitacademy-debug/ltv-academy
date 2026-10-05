# Lesson 7 — Federated Governance

**Chapter 2 · Operating Models · Lesson 7 of 30**

## What you'll learn

- What federated governance looks like as a built system, beyond Foundations' org-level treatment
- The four architectural components a federated system needs: shared schema, central index, domain catalogs, and a two-tier policy split
- How the integration layer actually carries the "shared core, local detail" split
- Where federated architecture's real complexity lives, and why it's worth it anyway

## Beyond the org chart, again

Data Governance Foundations Lesson 11 described federated governance organizationally: a central body sets shared standards for what must be consistent, while business units keep authority over their own local data. The architectural question is how that split actually gets built into working systems — because "the central body sets standards" has to turn into something domain catalogs can actually check themselves against.

## The four components federated architecture needs

1. **A shared core schema and taxonomy.** The central body defines a common set of tags, classifications, and metadata fields that every domain catalog has to populate for anything crossing domain lines — this is the concrete artifact that makes "shared standards" checkable rather than aspirational.
2. **A central index — the catalog-of-catalogs from Lesson 3.** Instead of holding every table's full detail, the central system registers which domain catalog owns which data, and exposes the shared-schema fields for cross-domain search.
3. **Domain-owned catalogs.** Each business unit keeps real authority over its own catalog and whatever local metadata it needs beyond the shared schema — this is what actually preserves the local autonomy the operating model promises.
4. **A two-tier policy split.** Global policies (how PII is classified, who can access regulated data) are centrally defined and enforced the same way everywhere. Local policies (how a specific domain organizes its own non-cross-cutting data) stay with the domain.

## The integration layer carries the split

This is where federated architecture's real engineering work lives: connectors or APIs that let the central index pull shared-schema metadata out of each domain catalog automatically, usually through scheduled scans or event-driven pushes, so domain teams don't have to manually re-enter the same tags twice. Microsoft Purview's connector model is a real, documented example of this shape: it scans source systems and registers what it finds centrally, while the underlying data and much of its local management stay exactly where the domain already has them.

## Where the complexity actually lives

Federated architecture isn't harder because any one component is hard — it's harder because the boundary between "this is centrally governed" and "this is locally governed" has to be actively maintained in the shared schema itself. If the shared schema is too thin, cross-cutting consistency quietly fails. If it's too thick, domain teams lose the real autonomy the model promised and the architecture starts behaving like a centralized hub with extra steps. Foundations Lesson 11 called this federated's central weakness at the org level; architecturally, it shows up as a shared-schema design-and-maintenance problem, owned by whoever runs the central index.

## Key terms

| Term | Meaning |
|---|---|
| Shared core schema | The common tags and fields every domain catalog must populate for cross-cutting data |
| Central index (catalog-of-catalogs) | The lightweight central system registering domain catalogs and exposing shared-schema fields |
| Domain-owned catalog | A business unit's own catalog, holding full local detail and authority |
| Two-tier policy | Global policies enforced everywhere, paired with local policies a domain controls itself |

## Lab

For an organization you know (or one running Purview, Collibra, or a similar catalog-of-catalogs setup), identify what's actually in its shared core schema today — which specific tags or fields are required centrally. Is the boundary too thin, too thick, or about right?

## Check yourself

Can you name the four components of a federated governance architecture, and explain in one sentence why the shared schema, specifically, is where the model's real complexity lives?
