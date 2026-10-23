# Lesson 6 — Resolving Update Set Collisions

**Chapter 2 · Update Sets at Scale · Lesson 6 of 26**

## What you'll learn

- A one-line recap of what a collision is, from course 3
- The real workflow for reviewing a collision: remote update vs. local update
- The three real decisions available once you're looking at a collision
- Why blindly accepting the remote version is the dangerous default
- When a manual reconciliation is the right call instead of picking one side

## A quick recap, then the real workflow

Course 3 introduced the basic idea: a collision happens when the version of a record on the target instance differs from the version captured in the Update Set you're promoting. That's the what. This lesson covers the what-next — the actual review workflow experienced admins use to resolve a collision correctly, instead of clicking through it.

## Remote update vs. local update

When ServiceNow flags a collision, it's really presenting you with two competing versions of the same record. The **remote update** is the incoming change — what's captured in the Update Set you're promoting, the version that came from Dev (or wherever the set originated). The **local update** is what's already sitting on the target instance right now — the version someone or something else put there directly.

The review screen lets you open both side by side: the field-level differences between what's about to arrive and what's already there. This comparison is the entire point of the collision review. Skipping past it defeats the purpose of flagging the collision in the first place.

## Three real decisions, not one default

Once you can see both versions, there are three legitimate outcomes:

1. **Keep the remote version.** The incoming change is correct and should overwrite what's on the target. This is the right call when the local version was accidental, outdated, or simply lower-priority than the change you're promoting.
2. **Keep the local version.** The change already on the target instance is the one that should survive, and the incoming Update Set should NOT overwrite it. This is the right call when someone made a legitimate, intentional fix directly on the target for a reason the Update Set doesn't know about.
3. **Reconcile manually.** Sometimes neither version alone is correct — the remote update fixes one thing and the local update fixes something else on the same record, and the real answer is a corrected version that incorporates both sets of changes before you commit.

## The risk of blindly accepting remote

The dangerous default is clicking "accept remote" on every collision without reading what's being compared, on the assumption that whatever's in the Update Set must be right because it came from the development pipeline. In reality, a collision exists precisely because something changed on the target instance after the Update Set was created. That local change might be a legitimate hotfix, a configuration correction made by another admin, or a deliberate adjustment for that specific environment. Accepting the remote version without review silently throws that work away — and because the overwrite happens quietly during commit, nobody necessarily notices until the thing that was fixed breaks again.

## When to reconcile instead of pick a side

Reconciliation is the right call whenever the two versions touch genuinely different aspects of the same record — for example, the remote update changes a script's logic while the local update changes an unrelated field like a description or an active flag. Picking either side alone would lose real, intentional work from the other. The fix is to manually combine both sets of changes into one corrected version of the record before the commit finishes, rather than treating it as an either-or choice.

## Key terms

| Term | Meaning |
|---|---|
| Collision | When the target instance's version of a record differs from the version captured in the Update Set |
| Remote update | The incoming change contained in the Update Set being promoted |
| Local update | The version of the record already present on the target instance |
| Reconciliation | Manually combining both the remote and local changes into one corrected version instead of picking only one |

## Check yourself

Explain, in your own words, why "always accept the remote version" is a dangerous habit, even though the Update Set usually represents the officially reviewed change.
