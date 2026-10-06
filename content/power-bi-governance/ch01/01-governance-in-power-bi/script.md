# Lesson 1 — Governance in Power BI · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Welcome to Power BI Governance. This course is about keeping self-service BI safe and trustworthy at scale — starting with tenant and workspace governance.

## S2 · STEPS — Why governance?

Power BI lets anyone connect data and publish a report — that's the whole point of self-service BI. But without guardrails, that freedom turns into duplicate metrics, orphaned workspaces, and sensitive data with no label on it. Governance is the set of rules that keeps self-service safe. It's not a committee that blocks you from working.

## S3 · SCREENSHOT — The administrative home base

Tenant-wide governance controls live in the Fabric and Power BI admin experience, reachable from the Settings gear in the service. Nearly everything in this course traces back to a setting configured here.

## S4 · STEPS — The governance stack

This course covers four pillars. Administration: tenant settings that decide who can use which features, organization-wide. Structure: workspaces and domains, where content lives and who owns it. Security: row-level security, object-level security, sharing, and sensitivity labels — who actually sees what. And trust and lifecycle: endorsement, lineage, and deployment pipelines, covered later in this course.

## S5 · SCREENSHOT — Structure: domains group workspaces

Domains are how structure becomes something you can filter and discover, not just a flat list of workspaces. Here, the OneLake catalog is scoped to the Finance domain — every item shown belongs to it.

## S6 · SCREENSHOT — Security: classification travels with the content

Once sensitivity labels are enabled for a tenant, every workspace gets a Sensitivity column. At a glance, you can see what's classified, and at what level, without opening a single item.

## S7 · STEPS — Governance is distributed

Governance isn't one person's job. A tenant or Fabric admin sets org-wide tenant settings and assigns other admin roles. Domain and workspace admins own structure and access within their own scope. And every individual author is responsible for applying RLS, sensitivity labels, and sharing settings correctly on their own content.

## S8 · STEPS — Where this course goes

This chapter covers tenant settings, workspaces, workspace roles, design patterns, and apps. Chapter two moves into semantic model governance, row-level and object-level security, sharing, and sensitivity labels. Later chapters in this course cover endorsement, lineage, auditing, and deployment pipelines.

## S9 · OUTRO

Next lesson: tenant settings — the single admin screen that controls what every user in your organization can actually do.
