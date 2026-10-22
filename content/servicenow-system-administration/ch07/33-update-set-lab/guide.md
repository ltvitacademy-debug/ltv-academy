# Lesson 33 — Update Set Lab

**Chapter 7 · Update Sets & Change Management (Admin View) · Lesson 33 of 36**

## What you'll learn

- How to walk a real Update Set through its full lifecycle, end to end
- How to apply the Current → changes → review → Complete workflow from Lesson 30
- How to apply the export → retrieve → preview → commit workflow from Lesson 31
- How to recognize and resolve an actual collision using the fix pattern from Lesson 32
- How all four Chapter 7 lessons connect into one coherent real-world task

## The scenario

You're the administrator on a Dev instance. Incident routing has been misbehaving — tickets for a specific category aren't reaching the right assignment group — and you've been asked to fix it. The fix requires two changes: a modified **Business Rule** that corrects the routing logic, and an updated **ACL** so the newly-involved assignment group has the access it needs to work those tickets. Your job is to build this safely, move it correctly, and handle a real problem that comes up along the way.

## Step 1 — Set the Current Update Set first

Before touching anything, you create a new Update Set named **"Q3 Incident Routing Fix"** and switch to it in the picker at the top of the screen. This matters precisely because of the mistake Lesson 30 covered: if you edited the Business Rule first and created the Update Set after, that edit would already be sitting in Default, not in this one. You do it in the right order on purpose.

## Step 2 — Make the changes

With "Q3 Incident Routing Fix" active, you edit the Business Rule's condition and script to correct the routing logic, then update the ACL to grant the assignment group the access it needs. Both changes are captured automatically into the active Update Set as `sys_update_xml` records — no manual step required.

## Step 3 — Review, then Complete

You open "Q3 Incident Routing Fix" and check its related list: exactly two captured changes, the Business Rule and the ACL, nothing else from earlier work bleeding in. Satisfied it's clean and scoped to exactly this fix, you mark it **Complete**.

## Step 4 — Export and retrieve into Test

You export "Q3 Incident Routing Fix" as an XML file from Dev. Following the required direction from Lesson 31 — Dev → Test → Production, Test never skipped — you retrieve that file on the **Test** instance, creating a new, not-yet-applied Update Set record there.

## Step 5 — Preview on Test surfaces a real collision

You run Preview on Test. It comes back clean on the Business Rule — no conflicts — but it flags a **collision** on the ACL: someone else on the team made an unrelated fix directly on Test, editing that exact same ACL's role requirement, outside of any Update Set. Test's current version of the ACL and your Update Set's version disagree.

This is precisely the scenario Lesson 32 described: two people touching the same piece of configuration independently, and Preview catching it before either version silently overwrites the other.

## Step 6 — Resolving the collision before committing

Following the fix pattern from Lesson 32, you don't let either side win by default. You open both versions side by side: your Update Set's ACL change (adds the new assignment group's role) and Test's current ACL (the teammate's unrelated role tweak). You determine the two changes aren't actually in conflict in substance — your teammate adjusted a different role requirement than the one you added — so the correct resolution is to merge the intent manually: you edit the ACL on Test directly to include *both* the teammate's existing requirement and your new assignment group's access, then mark your Update Set's version of that change as resolved so it won't attempt to overwrite the merged result.

## Step 7 — Commit

With the Business Rule clean and the ACL collision deliberately resolved rather than left to chance, you commit "Q3 Incident Routing Fix" on Test. Incident routing is retested on Test with realistic data before this same Update Set ever gets a chance to move toward Production — exactly the point of never skipping Test.

## Key terms

| Term | Meaning |
|---|---|
| Collision | Two different versions of the same customization — here, an ACL edited both in the Update Set and directly on Test |
| Scoped Update Set | An Update Set containing only the changes relevant to one piece of work, confirmed by review before Complete |
| Resolve (a collision) | Deliberately choosing, or merging, which version of a conflicting change actually gets applied |
| Dev → Test → Production | The required promotion direction; Test is never skipped regardless of urgency |

## Check yourself

Walk through it yourself, out loud, without looking back: why did setting the Update Set Current *before* editing the Business Rule matter, what exactly did Preview flag on Test and why, and what made the resolution here a merge rather than simply picking one version over the other?
