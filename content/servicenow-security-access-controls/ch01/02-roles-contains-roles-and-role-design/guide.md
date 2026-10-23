# Lesson 2 — Roles, Contains Roles & Role Design

**Chapter 1 · The Platform Security Model · Lesson 2 of 24**

## What you'll learn

- A one-paragraph recap of role inheritance and Contains Roles, assumed as known
- Least privilege as a real design discipline, not a slogan — direct callback to Delegated Administration
- Why narrow, deliberately-built custom roles beat defaulting to broad out-of-box roles like `admin` or `itil_admin`
- What "role sprawl" actually is, why it happens, and why it's a genuine security risk, not just an annoyance
- The real tradeoff every admin faces: a new narrow role feels safer today; an unreviewed pile of them is dangerous later

## Quick recap: role inheritance and Contains Roles

ServiceNow System Administration's "Roles & Role Inheritance" already covered the mechanics: every role lives as a record in `sys_user_role`, and a role can list other roles in its **Contains Roles** field. When a role contains another, anyone granted the containing role automatically inherits everything the contained role grants — `itil_admin` contains `itil`, so an ITIL admin can do everything an ITIL agent can do, plus more. That lesson was about how inheritance works. This lesson is about something that lesson didn't cover: how to *design* a role hierarchy on purpose, instead of just understanding the one you're handed.

## Least privilege is a discipline, not a slogan

Delegated Administration — covered earlier in System Administration — already introduced the real version of this idea: grant a user the minimum role actually needed to do their job, nothing more, so a help-desk delegate who only resets passwords never ends up holding a role that also lets them reassign incidents or edit ACLs. "Least privilege" is the general principle Delegated Administration was a specific application of. In role design, it means a concrete habit: before assigning any role, ask what this person actually needs to do today, not what role would be convenient to hand them so you never have to think about it again.

## Build narrow roles on purpose — don't default to broad ones

Out-of-box roles like `admin` and `itil_admin` exist because they're convenient, not because they're correctly scoped for most real jobs. `admin` grants essentially unrestricted access to the entire instance. `itil_admin` grants broad ITSM configuration rights most fulfillers never need. The disciplined alternative is building your own narrow custom role — say, `incident_reassign` — that contains only the specific OOB role or ACL access actually required, and nothing else. It takes more thought up front than reaching for `admin`. That extra thought is the entire point: a narrow role is one you can describe in a sentence ("this role lets someone reassign incidents, full stop"), and a sentence like that is something you can actually audit.

## Role sprawl: the real, practical risk

Here's the problem that creeps in over time, even when every individual decision above was correct: an org builds a narrow role for a need, then another narrow role for a slightly different need, then another for a need that overlaps 80% with the second one — and three years later, nobody can say with confidence who can actually do what, because there are forty custom roles with tangled, overlapping Contains Roles chains and no single person who designed all of them. That's role sprawl, and it's a genuine security risk, not just clutter: you cannot secure what you cannot audit, and an un-auditable role hierarchy is exactly as dangerous as a wide-open one, just harder to notice.

The tradeoff that causes sprawl is real and worth naming honestly: granting a brand-new, narrow role feels safer *in the moment* than reusing an existing broader role that technically covers the need but grants a bit more than necessary. That instinct isn't wrong on any single decision. But without periodic review of the whole role hierarchy — looking at what's accumulated, consolidating roles that have drifted into near-duplicates, retiring ones nobody uses — the accumulated complexity itself becomes the risk, independent of whether any one role, by itself, was ever misconfigured.

## Key terms

| Term | Meaning |
|---|---|
| Contains Roles | The field on a role record that lists other roles it inherits from |
| Least privilege | Granting the minimum access actually needed for a job, nothing more |
| Role sprawl | An accumulation of overlapping custom roles over time, making it hard to audit who can actually do what |
| Role hierarchy review | Periodically auditing accumulated roles to consolidate overlap and retire unused ones |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why building a new narrow custom role feels like the safer choice in the moment, and why that same habit, repeated for years without review, becomes a security risk in itself.
