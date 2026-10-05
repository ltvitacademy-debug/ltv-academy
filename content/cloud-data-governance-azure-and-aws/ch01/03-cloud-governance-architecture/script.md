# Lesson 3 — Cloud Governance Architecture · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Before you can govern anything in the cloud, you need a container to attach governance to. This lesson covers that hierarchy in both clouds.

## S2 · STEPS — Azure's hierarchy

Azure nests four levels. Management groups sit at the top, grouping subscriptions so policy applies once and inherits downward. Subscriptions are the billing and access boundary, usually split by environment. Resource groups hold resources that share a lifecycle. And at the bottom, the actual resources themselves.

## S3 · STEPS — AWS's hierarchy

AWS does the same job with a different shape. The organization is the root container for every account the company owns. Organizational units group accounts — Security, Production, Sandbox. Accounts are AWS's hard billing and access boundary, and AWS actually encourages one account per workload rather than many resource groups inside one subscription. Resources sit at the bottom, same as Azure.

## S4 · STEPS — Four layers

This course is organized around four layers that work together in any mature governance architecture. Identity — who can authenticate, covered in Chapter 2. Policy — rules enforced automatically, Chapter 4. Data — where it lives and how it's cataloged, Chapter 3. And monitoring — the audit trail that proves the other three are actually working. Strong in one layer and ignored in the others fails in practice.

## S5 · OUTRO

Next lesson: landing zones — how this hierarchy gets baked in with governance guardrails from day one.
