# Lesson 3 — Roles & Role Inheritance

**Chapter 1 · Users, Groups & Roles · Lesson 3 of 36**

## What you'll learn

- Where roles live: the `sys_user_role` table, and where assignments are tracked: `sys_user_has_role`
- What a role actually controls versus what a group controls
- How roles "contain" other roles — the real inheritance mechanism
- Why the out-of-box `admin` role implicitly grants nearly everything, and why `itil_admin` contains `itil`
- Why reviewing contained roles matters for least-privilege security

## Where roles live: sys_user_role

A role is a record on the `sys_user_role` table. On its own, a role record is almost nothing more than a name and a description — the real power of a role comes from everything in the platform that's configured to check for it: Access Control Lists (full topic of Chapter 2), UI actions, menu visibility, and script conditions all ask "does this user have role X?" before deciding what to show or allow. This is the fundamental difference between a group and a role: a group is about **who's on a team** (for routing and visibility), while a role is about **what a user is permitted to do**. A user can be a member of the Network Operations group with zero roles, in which case they'd see nothing useful despite being "on the team" — group membership and permission are genuinely separate systems that happen to both involve users.

## Assigning roles: sys_user_has_role

Just like group membership has its own join table, role assignment has one too: `sys_user_has_role`, tracking which `sys_user` holds which `sys_user_role`. In the UI, you assign a role the same two ways you'd expect by now — from the user's own form (the **Roles** related list), or from the Role record itself (a related list of users holding that role). Either path writes a row to `sys_user_has_role`. The common out-of-box roles you'll use constantly as an administrator include `itil` (baseline agent access — the ability to work tickets), `itil_admin` (administrative control over ITIL-process configuration), and `admin` (essentially everything).

## Role inheritance: roles can contain roles

Here's the mechanism that makes role assignment more powerful — and more dangerous — than it first appears. A role record has a related list called **Contains Roles**. If Role A contains Role B, then anyone assigned Role A automatically, implicitly also has every permission Role B grants — without ever being directly assigned Role B in `sys_user_has_role`. This is real inheritance, not a convenience label: ACLs and conditions checking for Role B will pass for a user who only has Role A on their record, because the platform resolves the full "effective roles" set by walking the Contains Roles chain.

Two real, out-of-box examples to know cold:

- The `admin` role contains nearly every other role in the system. Grant someone `admin` and you are not granting "one role" — you're implicitly granting the functional equivalent of dozens of roles at once, because `admin` sits at the top of the containment chain.
- `itil_admin` contains `itil`. Anyone with `itil_admin` automatically has the base `itil` permissions too, without a separate assignment — which makes sense functionally (an ITIL admin should certainly be able to do what a regular ITIL agent can) but is exactly the kind of implicit grant you need to be aware of when you're reasoning about what a user can actually do.

## Why this matters for security: review before you grant

Because of role inheritance, "what can this user do?" is never fully answered by looking at the handful of roles on their user record — you have to also ask "what does each of those roles contain?" Granting a single role casually, without checking its Contains Roles related list, can hand someone far more access than you intended. This is the practical, everyday face of the **least-privilege principle**: before assigning any role, especially one you haven't used before, open the role record and check what it contains. A narrow-sounding custom role might turn out to contain `admin` because someone built it carelessly months ago. This habit — checking containment before granting — is the single biggest thing separating a careful ServiceNow administrator from one who causes an access incident.

## Key terms

| Term | Meaning |
|---|---|
| `sys_user_role` | The table that stores every role record |
| `sys_user_has_role` | The join table tracking which users hold which roles |
| Contains Roles | The related list on a role defining which other roles it implicitly grants |
| Role inheritance | The mechanism by which holding one role grants every role it contains, without separate assignment |
| Least privilege | Granting only the access actually needed, verified by checking what a role contains before assigning it |

## Check yourself

A colleague asks you to grant a user `itil_admin` "just to be safe." What does that single assignment actually grant them, and what should you check on the role record before agreeing to it?
