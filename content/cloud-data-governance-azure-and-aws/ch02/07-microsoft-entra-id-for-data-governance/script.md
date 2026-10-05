# Lesson 7 — Microsoft Entra ID for Data Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson goes hands-on with Microsoft Entra ID — the directory layer of Azure identity.

## S2 · STEPS — What Entra ID governs

Entra ID governs the tenant itself — users, groups, app registrations — not any individual Azure resource. Directory roles answer questions like who can manage users or app registrations, and critically for this course, who can administer the governance tooling itself. Roles like Purview Administrator live here, not in Azure RBAC. Entra ID controls who can configure the identity system Azure RBAC assignments depend on.

## S3 · SCREENSHOT — Roles and administrators

Every directory role lives on one page: Identity, Roles and admins, Roles and admins. Each row is a built-in role, with a Privileged flag for security-sensitive roles and an assignment count worth auditing periodically — a growing count unrelated to headcount growth is itself a governance signal.

## S4 · SCREENSHOT — Add assignments

Selecting a role name opens its detail page, where Add assignments lets you search the directory. Everything checked on the left accumulates in the Selected panel on the right — nothing is assigned until you choose Add. This pane also supports role-assignable security groups, not just individuals, which is the pattern this course keeps recommending.

## S5 · SCREENSHOT — Roles for an app registration

Directory roles aren't only for people. An application — an app registration — can hold a role too, scoped to exactly what it needs. For an automated classification job or a Purview scan trigger, that's the governance-correct choice over borrowing a broad admin role for convenience.

## S6 · OUTRO

Next lesson moves from the directory layer to the resource layer: Azure RBAC, and the Access control blade on an actual resource.
