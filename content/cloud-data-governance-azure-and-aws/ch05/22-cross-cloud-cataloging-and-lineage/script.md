# Lesson 22 — Cross-Cloud Cataloging and Lineage · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 21 named four places multi-cloud governance breaks down: identity, policy, catalogs, and audit logs. Catalogs are different from the other three — they're the one layer that genuinely can give you a single pane of glass across both clouds.

## S2 · STEPS CARD (why catalogs unify)

Identity and policy are hard to unify because Entra ID and AWS IAM, or Azure Policy and AWS Organizations, are separate control planes with no shared data model. A catalog's job is just describing metadata — names, schemas, classifications — and metadata doesn't care which cloud physically stores the data.

## S3 · SCREENSHOT (register AWS source)

Microsoft Purview's Data Map treats Amazon S3 as a first-class source type, listed right alongside Azure's own storage services. Registering an AWS account adds its buckets to the same Data Map as every Azure Data Lake container already registered — AWS sits as a peer, not a bolted-on afterthought.

## S4 · STEPS CARD (how the trust works)

The harder part is how Purview is allowed to read an AWS bucket at all. It doesn't use a stored AWS access key — it uses a federated IAM role trust. You create an AWS role that trusts Purview's Microsoft account ID, and require an External ID, a shared secret, so only Purview's actual scanner can assume that role.

## S5 · SCREENSHOT (search results across clouds)

Once a scan completes, AWS S3 objects appear in Purview's Unified Catalog search exactly like any Azure asset — filterable by asset type, with the same classification facets. A steward searching for sensitive data gets Azure and AWS results in the same list, without needing to know which cloud it lives on.

## S6 · OUTRO CARD

Cataloging both clouds solves discovery, but not lineage automatically — tracing data as it moves between clouds still requires the pipeline tool itself to report that hop to Purview. Next lesson: a full case study applying everything from this course, across both Azure and AWS, to one fictional company.
