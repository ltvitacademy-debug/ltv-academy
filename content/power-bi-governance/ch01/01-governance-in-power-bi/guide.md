# Lesson 1 — Governance in Power BI

**Chapter 1 · Tenant and Workspace Governance · Lesson 1 of 20**

## What you'll learn

- Why Power BI governance exists — guardrails for self-service BI, not a committee that blocks it
- The four pillars this course is organized around: administration, structure, security, and trust/lifecycle
- Where tenant-wide governance controls actually live in the product
- Why governance is a distributed responsibility, not one person's job

## Why governance?

Power BI's whole value proposition is self-service: anyone with access to data can connect to it, build a model, and publish a report, without waiting on a central BI team. That's a feature, not a bug — but it has a cost. Without any guardrails, self-service BI at scale tends to produce duplicate and conflicting metrics ("whose revenue number is correct?"), orphaned workspaces nobody remembers creating, and sensitive data moving around with no label or access control on it.

**Governance** is the set of rules, structures, and controls that let self-service BI stay safe as it scales — not a gatekeeper that slows authors down, but the guardrails that let an organization trust what it's looking at.

## The administrative home base

Nearly every governance control in Power BI traces back to one place: the admin experience, reachable from the **Settings** gear in the Power BI service. This is where tenant-wide settings, domains, capacities, and monitoring all live.

![Screenshot of the Users tab in the Fabric admin portal, showing a link to the Microsoft 365 Admin Center for managing users, admins, and groups.](/courses/power-bi-governance/ch01/01-governance-in-power-bi/powerbi-admin-manage-users.png)
*Admin controls for Power BI content live alongside user and license management — tenant settings (next lesson) is the single biggest lever in this admin experience.*

## The four pillars of this course

This course is organized around four areas, covered across its chapters:

1. **Administration** — tenant settings that turn features on or off, organization-wide or for specific groups (Lesson 2)
2. **Structure** — workspaces and domains: where content lives, and who's responsible for it (Lessons 3–4)
3. **Security** — row-level security, object-level security, sharing, and sensitivity labels: who actually sees what data (Chapter 2)
4. **Trust and lifecycle** — endorsement, lineage, auditing, and deployment pipelines, covered in this course's later chapters

## Structure: domains group workspaces

A **domain** groups related workspaces together — by business unit, department, or any other organizing principle your org picks. Once workspaces are assigned to a domain, every item in them inherits that domain's attribute, so people can filter and discover content by domain instead of scrolling a flat list of every workspace in the tenant.

![Screenshot of the OneLake catalog scoped to the Finance domain, showing an Adventure Works semantic model as one of the items that belongs to it.](/courses/power-bi-governance/ch01/01-governance-in-power-bi/domain-image-onelake-catalog.png)
*Domains turn "where does this live" into a filterable, discoverable grouping — Lesson 4 covers how to design this structure.*

## Security: classification travels with the content

Once **sensitivity labels** are turned on for a tenant, every dashboard, report, semantic model, and dataflow can carry one — and the workspace list itself shows a **Sensitivity** column so anyone browsing can see classification at a glance, without opening each item.

![Screenshot of a workspace content list with the Sensitivity column highlighted, showing labels like General, Confidential for Finance, and Highly Confidential.](/courses/power-bi-governance/ch01/01-governance-in-power-bi/sensitivity-labels.png)
*Sensitivity labels are covered in depth in Lesson 10 — they're one of the few governance controls that follow data even after it leaves Power BI.*

## Governance is a distributed responsibility

No single role owns all of governance in Power BI:

- A **tenant or Fabric admin** sets organization-wide tenant settings and assigns other admin roles (capacity admin, domain admin)
- **Domain and workspace admins** own structure and access within their own scope — which workspaces belong to their domain, who's a Member versus a Viewer
- **Every individual author** is responsible for governance decisions on their own content: applying row-level security, picking the right sensitivity label, deciding who a report gets shared with

## Where this course goes

This chapter (Tenant and Workspace Governance) covers tenant settings, workspaces and workspace roles, workspace design patterns, and apps. Chapter 2 (Semantic Models and Security) moves into semantic model governance, row-level security, object-level security, sharing and permissions, and sensitivity labels. Later chapters in this course's full outline cover endorsement, certification, lineage, auditing, and deployment pipelines.

## Key terms

| Term | Meaning |
|---|---|
| Governance | The rules, structures, and controls that keep self-service BI safe and trustworthy as it scales |
| Admin experience | The settings area (reachable from the Settings gear) where tenant-wide controls, domains, and capacities live |
| Domain | A logical grouping of related workspaces, used for structure, ownership, and discoverability |
| Sensitivity label | A classification (e.g., Confidential) applied to a Power BI item, visible in the workspace's Sensitivity column |
| Distributed governance | The model where tenant admins, domain/workspace admins, and individual authors each own a slice of governance responsibility |

## Lab

List the four governance pillars covered in this course (administration, structure, security, trust/lifecycle) and, for each one, name one real-world consequence your organization would face if that pillar were completely missing — for example, what happens with zero sensitivity labels, or zero workspace structure.

## Check yourself

Can you explain, in your own words, why governance in Power BI should be framed as "guardrails" rather than "gatekeeping"? Can you name which of the four pillars a given control belongs to — for example, is a workspace role a structure control or a security control?
