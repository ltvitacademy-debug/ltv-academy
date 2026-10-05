# Lesson 21 — Multi-Cloud Governance Challenges · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Everything so far in this course was taught one cloud at a time. That's not an oversight — each cloud's governance tooling is genuinely self-contained. A company using both Azure and AWS doesn't get a combined governance surface for free. It gets two separate, fully capable systems that happen to describe the same company.

## S2 · STEPS CARD (shared responsibility, twice)

The shared responsibility model from Lesson 2 exists twice in a multi-cloud estate, drawn in two different places. Azure's division of duties between Microsoft and the customer isn't identical to AWS's division between Amazon and the customer — the line of what's handled automatically shifts between providers.

## S3 · STEPS CARD (four places it breaks)

Multi-cloud governance breaks down in four places. Identity — Entra ID and Azure RBAC versus AWS IAM, two separate planes unless someone deliberately connects them. Policy enforcement — Azure Policy versus AWS Organizations service control policies, different languages and engines. Catalogs — Azure Data Lake Storage and Amazon S3 inventoried separately by default. And audit logs — Activity Log versus CloudTrail, no shared pane of glass.

## S4 · STEPS CARD (policy drift)

The central risk is policy drift — when the same rule is enforced with different strictness on one cloud than the other, because maintaining two parallel rule sets is more work than maintaining one, and the second quietly falls behind. Nobody decides this; two independent backlogs just stop being compared.

## S5 · STEPS CARD (the practical default)

Very few organizations run a true fifty-fifty split. Most have one primary cloud and a smaller secondary footprint for a specific reason — an acquisition, a better-fit service, a legacy system. The realistic strategy is treating the primary cloud's rules as the source of truth and deliberately translating each one into the secondary cloud's native controls, rather than inventing a made-up universal tool that understands neither cloud well.

## S6 · OUTRO CARD

Next lesson tackles the catalog problem specifically: how to get one searchable inventory covering both Azure and AWS, instead of two separate catalogs nobody cross-references.
