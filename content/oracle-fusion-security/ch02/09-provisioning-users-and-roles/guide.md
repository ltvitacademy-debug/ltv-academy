# Provisioning Users and Roles

Every lesson so far has referred to "provisioning" a role to a user without fully explaining the mechanics. This lesson covers those mechanics: how a role actually ends up attached to a user's account, the three ways that can happen, and the setup that controls it.

## What you'll learn

- The three provisioning methods: autoprovisioning, manual provisioning, and self-request
- What a role mapping is and what conditions it can be based on
- Why the Manage Role Provisioning Rules task matters to an implementation
- How provisioning connects back to the user account lifecycle from Lesson 2

## Role mappings: the rule behind every grant

A **role mapping** defines a relationship between a role and a set of conditions — for example, "anyone whose job is Accounts Payable Specialist and whose business unit is US Operations." Role mappings are configured in the **Manage Role Provisioning Rules** task in the Setup and Maintenance work area. Every automatic or self-requestable grant in the system traces back to a role mapping someone configured.

## Three ways a role gets provisioned

1. **Autoprovisioning** — if a role mapping has the **Autoprovision** option selected, and at least one of the user's assignments matches all the mapping's conditions, the role is granted automatically the moment that assignment is created or updated. No human has to remember to do it. This is how a new Accounts Payable Specialist hire at Castellan Robotics Inc. gets her job role the same day her worker record is created — assuming her assignment matches the mapping's conditions (job = Accounts Payable Specialist, business unit = US Operations).
2. **Manual provisioning** — an administrator directly adds a role to a user through the Security Console, without relying on a role mapping at all. This is common for roles that don't fit a clean rule, like a one-off project assignment.
3. **Self-request** — if a role mapping has the **Self-requestable** option selected, any user whose assignment matches the mapping's conditions can request that role themselves, typically subject to an approval workflow (which you'll cover in Lesson 16).

## Autoprovisioning requires a worker record

Autoprovisioned roles can only be added to users who have associated worker information — this ties directly back to Lesson 2's point that most user accounts are created from a worker record in the first place. A purely manual account (an external auditor, say) with no worker record can still be provisioned roles, just never through autoprovisioning; it has to be manual or (if applicable) self-request.

## Why this matters to an implementation

Getting role mappings right during implementation is what turns "every new hire needs IT to manually configure their access" into "every new hire gets correct, consistent access automatically, based on their actual job assignment." Done badly, it's the opposite: either over-provisioning (new hires getting access they shouldn't have, a segregation-of-duties risk covered in Lesson 13) or under-provisioning (new hires needing a manual fix-up on day one, every time). A well-designed set of role mappings is one of the clearest signs of a security design that was actually thought through, versus one that was bolted on.

## Key terms

| Term | Meaning |
|---|---|
| Role mapping | A rule linking a role to a set of conditions, configured in Manage Role Provisioning Rules |
| Autoprovisioning | Automatic role grant when a user's assignment matches a mapping's conditions |
| Self-requestable | A role a matching user can request for themselves, usually with approval |

## Recap

Provisioning happens three ways — autoprovisioning and self-request, both driven by role mappings, and manual provisioning for everything else. Autoprovisioning requires a worker record. Getting role mappings right is implementation work that pays off every time someone is hired, transferred, or promoted. Next up, Lesson 10: testing access as another user, so you can verify what all this provisioning actually produced.
