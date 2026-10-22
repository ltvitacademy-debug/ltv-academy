# Lesson 31 — Moving Update Sets Between Instances

**Chapter 7 · Update Sets & Change Management (Admin View) · Lesson 31 of 36**

## What you'll learn

- The real four-step promotion path: export, retrieve, preview, commit
- What Preview actually checks before anything changes on the target instance
- Why Preview exists as a safety gate, not a formality
- Why the direction is always Dev → Test → Production, never skipping Test
- The modern alternative — Update Set batches and Source Control/DevOps integration — at a glance

## From Completed to committed: the four real steps

Once an Update Set is marked Complete on its source instance, moving it to another instance follows a real, consistent path:

1. **Export** the Completed Update Set as an XML file from the source instance.
2. **Retrieve** (or upload) that XML file on the target instance, which creates a new, not-yet-applied Update Set record there.
3. **Preview** it — ServiceNow compares every change inside the Update Set against the target instance's current state and reports what will happen, before anything is actually applied.
4. **Commit** it — once Preview looks clean (or any flagged issues are resolved), committing actually applies every captured change to the target instance.

## What Preview is actually checking

Preview is not a formality to click past. For every captured change, ServiceNow compares the version in the Update Set against whatever currently exists on the target instance and flags anything it needs you to look at before committing — most importantly, potential **collisions**, where the target's own version of something (a Business Rule, an ACL) differs from the version in the Update Set, usually because someone changed it directly on the target outside this Update Set entirely. Lesson 32 covers collisions and the other problems Preview can surface in depth; the point here is that Preview is the gate that catches these issues *before* they overwrite anything, not after.

## Why the direction never changes

The promotion path is always **Development → Test/QA → Production**, in that order, and Test is never skipped — even when a change feels small or urgent. Test exists specifically to catch exactly the kind of problem Preview flags (a collision, a missing dependency) in an environment where a mistake costs nothing, before that same Update Set ever reaches Production. Editing directly in Production, or pushing a Dev Update Set straight to Production, defeats the entire point of having a tracked, reviewable promotion path in the first place — it's precisely the "silent copy" risk the Instances & Environments lesson in course 2 warned against.

## The modern alternative, briefly

Export/retrieve/preview/commit by hand is the long-standing, traditional mechanism, and it's still common. More recently, many organizations use **Update Set batches** (grouping several related Update Sets for one coordinated promotion) or, increasingly, **Source Control/DevOps integration** — storing configuration as code in a Git repository and promoting it through automated pipelines, closer to how software engineering teams manage code changes. This course does not go deep into either — DevOps-driven promotion is covered properly in the DevOps, Testing & Deployment course later in this path. For now, know that the manual XML export/retrieve/preview/commit cycle you're learning here is the foundation those modern tools are automating, not replacing conceptually.

## Key terms

| Term | Meaning |
|---|---|
| Export | Saving a Completed Update Set as an XML file on the source instance |
| Retrieve | Uploading/loading that XML file onto the target instance as a new Update Set record |
| Preview | Comparing the Update Set's changes against the target's current state before applying anything |
| Commit | Actually applying the Update Set's changes to the target instance |

## Check yourself

Without looking back: what does Preview compare against what, and why is committing an Update Set straight from Dev to Production — skipping Test — considered a mistake even if Preview shows no flagged issues?
