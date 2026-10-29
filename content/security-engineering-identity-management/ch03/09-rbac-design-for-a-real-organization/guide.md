# Lesson 9 — RBAC Design for a Real Organization

**Chapter 3 · Authorization Models at Scale · Lesson 9 of 32**

## What you'll learn

- Why real RBAC design starts from job functions, not from copying whatever permissions already exist
- What role mining (role discovery) actually is, and how it surfaces the roles an org already has informally
- Role explosion — the specific failure mode where RBAC quietly stops working — and how to recognize it
- How to design a role from least privilege outward instead of starting from a broad role and trimming it later

## Designing roles from job functions, not from precedent

A prior Azure RBAC lesson covered the mechanics of a role assignment — principal, role definition, scope. This lesson is about something that applies the same way on any platform running role-based access control: how do you decide what the roles themselves should *be*? The wrong starting point, and the most common one in practice, is copying an existing user's access for a new hire doing "basically the same job." That approach never actually examines what the job requires — it just propagates whatever permissions accumulated on the original account, including anything that was over-granted or left over from a role the person no longer has.

The right starting point is the job function itself: what does a billing support rep actually need to do, independent of who currently holds that title? A real RBAC design process defines roles by asking that question directly, then building the permission set the answer requires — not by inspecting an existing account and cloning it.

## Role mining: finding the roles that already exist informally

**Role mining** (also called role discovery) is the practice of analyzing actual permission usage and job responsibilities across an organization to identify the natural role groupings that already exist, even if no one has ever named them. In practice this means pulling a report of what permissions people in a given department actually use, grouping users whose real usage patterns cluster together, and proposing that cluster as a formal role. Role mining is how a security engineer avoids designing roles from a whiteboard in isolation — the roles should reflect how the organization genuinely operates, discovered from evidence, not invented from an org chart.

## Role explosion: when RBAC design goes wrong

**Role explosion** is what happens when every small variation in access gets its own dedicated role instead of being handled as an exception layered on a shared base role. A support team of twelve people ends up with twelve nearly-identical roles — "Support-Tier1-EastRegion," "Support-Tier1-WestRegion," "Support-Tier1-Escalation" — each differing by one or two permissions, because each time someone needed slightly different access, a new role was created rather than reusing an existing one. Role explosion defeats the entire point of RBAC: a system meant to make access reviewable and manageable through a small number of well-understood roles instead produces hundreds of roles that nobody can audit, each used by only a handful of people, many of them abandoned the moment the person who needed the variation changed teams. The fix is architectural discipline, not a cleanup project after the fact: keep the number of roles small and well-defined, and handle genuine one-off needs as a scoped, time-limited exception rather than a permanent new role.

## Starting from least privilege and adding access as justified

The sequencing of RBAC design matters as much as the roles themselves. The safe direction is to start every role with the minimum access its job function provably requires, and add specific additional access only when a real, documented need shows up — never the reverse of starting broad and planning to narrow later, because that narrowing step reliably doesn't happen on schedule. A new "Accounts Payable Clerk" role should start with exactly the permissions that job needs to process routine invoices, and a request for anything beyond that — say, the ability to approve payments over a threshold — becomes its own explicit, justified addition, reviewed on its own merits, rather than being folded into the baseline "just in case" someone eventually needs it.

## Example: designing one role instead of cloning an account

A support team lead asks for a new hire to be given "the same access as Priya." Instead of cloning Priya's account, the security engineer pulls what the Tier-1 Support role actually requires: read access to the ticketing system, read-only customer account lookup, and the ability to issue refunds under $50. It turns out Priya's account also has write access to the billing database — a leftover from a project six months ago that was never revoked. The new hire gets the clean Tier-1 Support role without that leftover permission, and the discovery becomes a follow-up to clean up Priya's own access — exactly the kind of accumulated access creep this course returns to in Chapter 6.

## Key terms

| Term | Meaning |
|---|---|
| Role mining (role discovery) | Analyzing real permission usage and job responsibilities to identify natural role groupings |
| Role explosion | The failure mode where near-duplicate roles are created for every small access variation instead of reusing a shared base role |
| Job-function-based design | Defining a role by what the job requires, not by copying an existing account's access |
| Least-privilege baseline | Starting a role with the minimum access its function provably needs, adding more only as justified |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why does cloning an existing user's access for a new hire quietly undermine RBAC, and what specific symptom tells you a role structure has suffered role explosion?
