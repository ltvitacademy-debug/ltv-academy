# Lesson 11 — Fabric Item Permissions · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Three turns from governance roles to something more granular — the permissions Fabric grants on a single item, independent of your workspace role.

## S2 · STEPS — Workspace roles vs. item permissions

Every Fabric workspace has four roles — Admin, Member, Contributor, Viewer — and they apply to everything in that workspace. But every item inside it — a report, a semantic model, a lakehouse, a notebook — also has its own separate permission layer, opened from the item itself through its Manage permissions panel.

## S3 · SCREENSHOT — The per-item panel

This is that panel. It lists the links that give access, and below that, People with direct access — users and groups granted permission to this one item directly, completely separate from whatever role they hold in the workspace.

## S4 · SCREENSHOT — Not one label, several

Fabric doesn't grant blanket access. Each grant lists specific permission types — here, Read, reshare, and build. Read lets someone discover and open the item. Reshare lets them grant others that same access. Build, specific to semantic models, lets someone create new reports against it.

## S5 · SCREENSHOT — Direct access tab

The Direct access tab shows both sources side by side. The Role column shows what someone inherited from the workspace, like Workspace Admin. The Permissions column shows what they were granted directly on this one item, independent of that role.

## S6 · SCREENSHOT — Granting access directly

When you grant access, Read is always included by default. The Additional permissions checkboxes — Share and Edit here — layer on more: Edit for write access, Share so the recipient can reshare it themselves.

## S7 · STEPS — When you actually need them

Item permissions matter most when a workspace role would grant too much. Sharing one report externally without exposing the whole workspace? Item sharing. A service account that only needs to read one semantic model? A direct grant, with no workspace role at all.

## S8 · OUTRO

Next lesson: row-level and column-level security — narrowing access from whole items down to the specific rows and columns inside them.
