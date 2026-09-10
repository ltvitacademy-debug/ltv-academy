# Lesson 2 — Fabric Workspaces · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Before anything else in Fabric happens, you need a
workspace — let's create one.

## S2 · STEPS CARD (creating one)

New workspace, name it, assign it a capacity — a trial, or a paid
F-SKU — and apply. Unlike Databricks, there's no VM size or
runtime version to configure. The capacity assignment is the only
compute decision, and it's made once, at the workspace level.

## S3 · CODE CARD (roles)

Roles are simpler too. Admin can do everything, including
workspace settings. Member can create, edit, and share.
Contributor can create and edit, but not share. Viewer is
read-only. A simpler, coarser cousin of Unity Catalog's grant and
revoke.

## S4 · CODE CARD (why familiar)

And this should feel familiar — a workspace is the same top-level
container idea, capacity is the compute clusters used to provide,
and roles are a coarser grant and revoke. Same shape, different
name.

## S5 · OUTRO CARD

One container, one compute decision, simpler roles. Next lesson:
OneLake, one lake for the whole organization.
