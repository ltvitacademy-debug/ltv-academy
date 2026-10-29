# Lesson 10 — Attribute-Based Access Control (ABAC)

**Chapter 3 · Authorization Models at Scale · Lesson 10 of 32**

## What you'll learn

- How ABAC decides access from attributes evaluated at request time, instead of a fixed role assigned in advance
- The kinds of attributes a real ABAC policy actually evaluates: user, resource, and environment
- The real tradeoff between ABAC and RBAC — more flexibility and granularity against more design and audit complexity
- A concrete scenario RBAC genuinely can't express well, and how ABAC expresses it in one policy

## Static roles vs. dynamic attributes

RBAC (Lesson 9) grants access by assigning a user to a role, and that role's permissions apply the same way every time, regardless of context — a Tier-1 Support role works identically at 2 PM on a managed laptop and at 2 AM on an unknown device. **Attribute-based access control (ABAC)** makes the access decision differently: instead of checking "does this user hold this role," it evaluates a policy against a set of **attributes** at the moment of the request, and only grants access if the attributes satisfy the policy's conditions. The role, if one even still exists underneath, is just one input among several — ABAC doesn't require abandoning roles, it layers conditional logic on top of (or instead of) them.

## The attributes an ABAC policy actually evaluates

A real ABAC policy draws on several categories of attribute, combined with Boolean logic:

- **User attributes** — department, job title, clearance level, employment status
- **Resource attributes** — a sensitivity label on a document ("Confidential," "Public"), the classification of a database table, the owner of a record
- **Environment attributes** — time of day, day of week, the requester's network location, whether the connecting device is reporting as compliant with the org's device management policy
- **Action attributes** — what operation is being attempted: read, write, delete, export

A policy combines these: "Finance department users may read records tagged Confidential-Finance, during business hours, from a compliant managed device." Change any one condition — the time, the device compliance state, the sensitivity label — and the access decision changes too, evaluated fresh on every request rather than fixed at the moment a role was assigned.

## The real tradeoff: flexibility against complexity

ABAC's advantage is precision: it can express conditions that would require an unmanageable number of separate roles to approximate under RBAC. But that precision has a real cost. A role assignment is simple to audit — list the users holding a role, and you know exactly who has that access, today, full stop. An ABAC policy is harder to audit in the same way, because the answer to "who can access this resource right now" depends on evaluating every relevant attribute at the moment you ask, including ones that change minute to minute, like device compliance state or network location. Reviewing ABAC access for a certification campaign (Lesson 12) means reasoning through policy logic, not just reading a membership list — genuinely more work, and a real source of design and audit complexity that doesn't exist with a static role.

## A scenario RBAC can't express well

A hospital needs doctors to access patient records, but only for patients currently assigned to their care, and only while they're on an active shift. RBAC can grant "Doctor" the permission to read patient records, full stop — it has no native way to narrow that down to "only this doctor's current patients, only during their shift" without creating a separate role per doctor per shift, which is role explosion by another name. ABAC expresses the same requirement as one policy: a doctor may read a patient record if the doctor is listed as that patient's assigned care provider and the doctor's current shift status is active. The condition is evaluated per request, follows the real-world fact pattern instead of approximating it, and needs no per-doctor role to exist.

## Key terms

| Term | Meaning |
|---|---|
| ABAC (attribute-based access control) | Access decisions made by evaluating attributes against a policy at request time, rather than a fixed role assignment |
| User attribute | A property of the requester — department, clearance level, employment status |
| Resource attribute | A property of what's being accessed — sensitivity label, classification, owner |
| Environment attribute | Contextual conditions at request time — time of day, network location, device compliance |
| Policy | The Boolean logic combining attributes into an access decision |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why is an ABAC policy harder to audit than an RBAC role assignment, and what's a real scenario where RBAC would need an unreasonable number of roles to express what one ABAC policy can express directly?
