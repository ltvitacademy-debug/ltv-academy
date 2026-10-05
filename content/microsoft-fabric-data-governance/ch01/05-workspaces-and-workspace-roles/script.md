# Lesson 5 — Workspaces and Workspace Roles · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter One's third corner: the workspace itself, and the four roles that control who can do what inside one.

## S2 · STEPS — The workspace is Fabric's fundamental container

Every Lakehouse, Warehouse, report, pipeline, or notebook lives inside exactly one workspace. It's not a folder you organize things into later — it's the container you actually deploy into, the boundary for who can see and edit an item, and the thing one capacity bills for.

## S3 · STEPS — The four workspace roles

Four roles, each narrower than the last. Admin: full control, including managing access and deleting the workspace. Member: add and edit content, plus manage some access. Contributor: create and edit content, but can't touch who has access. Viewer: read-only.

## S4 · SCREENSHOT — The workspace page

Here's a real workspace page. Manage access and Workspace settings sit top-right; every item in the workspace shows up in the list below, with columns we'll come back to in a minute.

## S5 · SCREENSHOT — Manage access panel

Selecting Manage access opens this panel: everyone who currently has access, and an Add people or groups button to bring in more.

## S6 · SCREENSHOT — The role dropdown

That button opens Add people, where you type a name or email and pick one of the four roles from this dropdown. This is the moment the roles stop being a list in a guide and become a real decision for a real person.

## S7 · SCREENSHOT — The item list's governance columns

Scroll into a populated workspace and a few columns are worth noticing now: Owner, Endorsement, and Sensitivity. None of them are configured here — the list just surfaces them. Endorsement and Sensitivity each get their own lesson later in the course.

## S8 · STEPS — Ties to capacity and domain

A workspace is assigned to exactly one capacity, from Lesson 2, which decides where and on what it runs. It can be assigned to one domain, from Lesson 4, which decides how it's categorized for discovery. Workspace roles are the third corner: who can actually touch what's inside.

## S9 · OUTRO

Chapter One is done. Chapter Two moves into OneLake itself — the one lake every workspace in Fabric shares.
