# Lesson 8 — Azure Role-Based Access Control · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson moves from the directory layer to the resource layer: Azure RBAC.

## S2 · STEPS — What Azure RBAC governs

Where Entra ID answers who can manage the directory itself, Azure RBAC answers a narrower question: what is this identity allowed to do to this specific resource. Assignments live on resources, resource groups, subscriptions, or management groups — never on the tenant as a whole. Every built-in role is a role definition, a named bundle of permissions bound to a principal at a chosen scope.

## S3 · SCREENSHOT — Access control (IAM)

Every resource, resource group, and subscription has an Access control, IAM, blade. Check access lets you look up what a principal can already do here. Role assignments lists everyone with access. Roles shows the full built-in catalog.

## S4 · SCREENSHOT — Add role assignment

From the Add menu, Add role assignment opens the three-tab wizard every Azure RBAC assignment goes through.

## S5 · SCREENSHOT — The Role tab

Built-in roles split into two tabs. Job function roles are scoped to a specific task, like Reader or Storage Blob Data Reader. Privileged administrator roles are broad — Owner, Contributor — and next lesson covers the risk of over-assigning those.

## S6 · SCREENSHOT — The Members tab

The Members tab opens a search pane. Type a display name or email to find the user, group, or service principal the role should apply to — nothing is selected until you check a result.

## S7 · OUTRO

Next lesson crosses over to AWS, where one service, IAM, handles what Entra ID and Azure RBAC split into two.
