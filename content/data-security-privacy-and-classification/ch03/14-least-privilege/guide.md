# Lesson 14 — Least Privilege

**Chapter 3 · Access Control · Lesson 14 of 30**

## What you'll learn

- The principle of least privilege, in one sentence, and why "just in case" access violates it
- How permission creep happens even in organizations that start out disciplined
- Just-in-time (JIT) elevation as least privilege applied to time, not just scope
- How least privilege limits the blast radius of a compromised account

## The principle, in one sentence

**Least privilege means every person and every system account gets the minimum access required to do its job — nothing added for convenience, nothing kept "just in case."** It's the narrowing principle that RBAC (Lesson 13) needs to actually be useful: RBAC tells you *how* to grant access to a role, least privilege tells you *how much* that role's permission list should actually contain.

The test is simple to state and hard to apply consistently: for every single permission on a role or account, can you name the specific task that requires it? If the answer is "no, but it might be useful someday," that permission shouldn't be there.

## Why "just in case" access is the enemy

"Just in case" access feels harmless in the moment — a broader grant saves a future access request, so why not add it now? The problem shows up later, when that account is compromised (phished, its credentials leaked, or the person behind it turns malicious). Every permission that account holds becomes available to whoever controls it. An account with exactly the permissions its job requires limits the damage to that job's scope. An account with years of accumulated "just in case" grants turns one compromised login into access to everything it ever touched.

## Permission creep

**Permission creep** is what happens when least privilege erodes gradually instead of being violated all at once. A person moves between three different teams over four years, and each move adds the new team's access — but nobody removes the old team's access, because that's a separate, easy-to-skip step (this is exactly the "Mover" failure mode from Lesson 12's Joiner-Mover-Leaver lifecycle). After four years, that person holds the union of everything they've ever needed, which is far more than what their current job requires. Access reviews (Lesson 16) exist largely to catch and reverse permission creep before it accumulates for years.

## Just-in-time elevation: least privilege applied to time

Least privilege isn't only about *which* permissions an account holds — it's also about *how long* it holds them. **Just-in-time (JIT) elevation** grants a powerful permission only for the window it's actually needed, then automatically revokes it. A database administrator doesn't hold `sysadmin` rights permanently; they request elevation for a specific maintenance window, use it, and the system pulls the elevated access back down afterward. Lesson 17 covers this in depth for privileged accounts specifically, but the underlying idea is least privilege applied to the time dimension, not just the scope dimension.

## Blast radius

Security teams use **blast radius** to describe the scope of damage a single compromised credential can cause. Least privilege is the primary lever for shrinking it. A compromised account with broad, accumulated permissions can touch every system it was ever granted access to. A compromised account that was kept tightly scoped to its actual job can only touch what that job needed — which is, by design, far less.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting every account the minimum access required for its job, nothing more |
| Permission creep | The gradual accumulation of unnecessary access as a person's role changes over time without old access being removed |
| Just-in-time (JIT) elevation | Granting an elevated permission only for a specific, limited time window, then automatically revoking it |
| Blast radius | The scope of damage a single compromised account can cause, shrunk by narrowing its permissions |

## Lab

Pick an account you personally hold (a work system, a shared tool, even a personal cloud account with shared folders). List every permission or access level it has. For each one, write down the specific task that requires it. Any permission you can't justify with a specific task is a candidate for removal — that's permission creep, found in miniature.

## Check yourself

- Why is "just in case" access a violation of least privilege even if it's never actually misused?
- How does just-in-time elevation apply the least-privilege principle to time instead of scope?
