# Lesson 32 — Common Update Set Problems & Fixes

**Chapter 7 · Update Sets & Change Management (Admin View) · Lesson 32 of 36**

## What you'll learn

- What a "collision" is, and the real reason it happens
- What a "missing dependency" is, and why dependency order matters
- What a "skipped" record means, and who causes it
- The real fix pattern for resolving a collision
- Why applying Update Sets in the correct dependency order prevents most of this

## Collisions: two different versions of the same thing

A **collision** happens when the version of a customization inside the Update Set differs from the version currently sitting on the target instance. This is almost always caused by someone editing that same thing — the same Business Rule, the same ACL — directly on the target instance, outside of this Update Set entirely. ServiceNow flags this during Preview (Lesson 31) specifically so you see it *before* committing overwrites either version silently.

Collisions aren't rare edge cases; they're a natural consequence of two people (or two Update Sets) touching the same configuration independently. The more admins actively customizing an instance, the more often Preview will surface one.

## Missing dependencies: referencing something that isn't there yet

A **missing dependency** happens when an Update Set references something — commonly a Script Include a Business Rule calls, or a table a new field depends on — that doesn't exist yet on the target instance, because that referenced piece lives in a *different* Update Set that hasn't been applied yet. If you commit the dependent change first, the target instance ends up with a Business Rule calling a Script Include that, from its point of view, doesn't exist.

## Skipped records: a deliberate choice by the admin

A **skipped** record is different from the first two — it isn't something ServiceNow detects automatically. It means an administrator, during Preview, deliberately chose not to apply one specific flagged change, usually because they judged it unsafe or unnecessary on that particular target. Skipped records are worth tracking carefully: a skip that's forgotten about can leave an instance in a state where later Update Sets assume something was applied that actually wasn't.

## The real fix pattern

For a **collision**, the fix is to review both versions side by side — what's in the Update Set versus what's currently on the target — and deliberately choose which one to keep, rather than letting either side win by default. Sometimes the right answer is the Update Set's version; sometimes it's correct to preserve the target's existing version and skip that one piece. Either way, it has to be a decision, not an accident.

For **missing dependencies**, the fix is almost always prevention rather than cleanup after the fact: apply Update Sets to the target instance in the correct dependency order — whatever defines the Script Include or table has to be committed before the Update Set that references it. When teams track which Update Sets depend on which others, this problem mostly disappears.

For **skipped records**, the fix is documentation and follow-through: note what was skipped and why, and revisit it deliberately rather than letting it quietly fall through the cracks across future promotions.

## Key terms

| Term | Meaning |
|---|---|
| Collision | The target's version of a customization differs from the Update Set's version |
| Missing dependency | An Update Set references something not yet present on the target instance |
| Skipped record | A specific flagged change an admin deliberately chose not to apply during Preview |
| Dependency order | Applying Update Sets in the sequence their references require, so nothing is missing |

## Check yourself

Without looking back: what's the real difference between a collision and a missing dependency — one is a difference in versions, the other is an absence — and what single habit (applying Update Sets in a particular order) prevents most missing-dependency problems before they ever happen?
