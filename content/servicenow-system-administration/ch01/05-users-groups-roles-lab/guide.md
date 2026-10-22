# Lesson 5 — Users, Groups & Roles Lab

**Chapter 1 · Users, Groups & Roles · Lesson 5 of 36**

## What you'll learn

- How to work through a realistic access-setup request end to end, using the exact tables and fields from Lessons 1-4
- How to decide what a new user actually needs versus what's tempting to over-grant
- How to reason about role containment before finalizing an access decision
- How to write up an access decision the way a real administrator would document it

## The scenario

Your organization is standing up a new Facilities team. You, the ServiceNow administrator, get this request from the Facilities director:

> "We have a new hire, Maria Chen, starting Monday. She'll be the first member of our new Facilities team, handling building-maintenance tickets. She'll need to work incidents assigned to her team, and eventually she'll help us build a few Facilities-specific catalog items — can you set all that up?"

Walk through this the way you'd actually handle it as the administrator on duty.

## Step 1 — Create the user record

Maria doesn't exist in the system yet, so the first stop is `sys_user`: User Administration > Users > New. You set `user_name` to a value matching your organization's convention (say, `mchen`), fill in her `email` for notifications, and leave `active` checked true since she starts Monday. You also check `password_needs_reset` so her temporary password gets replaced the first time she logs in. At this point, per Lesson 1, Maria exists as a user but can do almost nothing yet — no roles, no group.

## Step 2 — Create the Facilities group

There's no Facilities team yet in `sys_user_group`, so you create one: name it "Facilities," give it a sensible description, and set the **Group Email** to the shared Facilities mailbox so notifications routed to the group reach the whole team as it grows, not just Maria. You leave **Manager** pointing to the Facilities director, since that's who approval and reporting logic should resolve to. Creating the group doesn't give Maria any permissions by itself — remember, from Lesson 2, group membership is about routing and visibility, not access.

## Step 3 — Add Maria as a member

From the new Facilities group record's **Group Members** related list, you add Maria — or equivalently, from her user form's **Groups** related list, you add Facilities. Either way, this writes one row to `sys_user_grmember`. Now, once incidents start getting an **Assignment group** of "Facilities," Maria (and anyone else later added to the group) will see them in the team's queue.

## Step 4 — Decide on the role: itil

Maria needs to "work incidents assigned to her team" — that's baseline agent work, which maps directly to the `itil` role. You assign it via her user form's **Roles** related list (or the `itil` role record's list of users), which writes a row to `sys_user_has_role`. Per Lesson 3, it's worth pausing to check what `itil` contains before moving on — in a default instance, `itil` sits fairly low in the containment chain and doesn't implicitly grant anything surprising, which is exactly what you want to confirm rather than assume.

## Step 5 — The catalog question: not yet

The director also mentioned Maria will "eventually help build Facilities catalog items." That's a `catalog_admin`-shaped need (Lesson 4) — but notice the word "eventually." She isn't doing that work on day one, and granting `catalog_admin` now, before she needs it, would violate least privilege for no real benefit. The right call is to document the future need (so you or the director remembers to revisit it) and grant `catalog_admin` only when Maria is actually about to start that catalog work — not preemptively, and critically, not `admin`, which would hand her far more than either her ticket work or her future catalog work actually requires.

## Step 6 — Write up the decision

A careful administrator leaves a trail. Your access-setup note for this request would read something like: "Created user mchen (active, password reset required). Created Facilities group (manager: [director], group email set). Added mchen to Facilities group. Granted itil role (verified: does not contain anything beyond baseline agent access). catalog_admin deferred until Facilities catalog work actually begins — do not grant admin for this request." That single paragraph demonstrates every decision from Lessons 1 through 4: deactivation-over-deletion awareness (not needed yet, but you'd know it), correct use of group routing, a correctly scoped role with containment verified, and a deliberate least-privilege call on the catalog request instead of a reflexive over-grant.

## Check yourself

Suppose two weeks later the director says Maria is now ready to start building Facilities catalog items. What exactly do you grant her at that point, and what do you still deliberately withhold, per the least-privilege reasoning from this lab?
