# Lesson 6 — Field-Level Security Design Patterns

**Chapter 2 · Advanced ACL Design · Lesson 6 of 24**

## What you'll learn

- A one-sentence recap of how field-level ACLs stack on top of table-level ones
- The real pattern for denying read access to one sensitive field while allowing a
  narrow, explicit set of roles to see it
- How field-level ACLs and Data Anonymization combine for defense in depth
- The honest, real tradeoff between over-restricting and under-restricting a field
- Why "lock everything down" and "leave everything open" are both design failures

## Quick recap

From Course 3 you already know that a field-level ACL is checked **in addition to**
the table-level ACL for the same operation, never instead of it — passing the
table-level read check gets a user into the record; the field-level check still
decides whether any one specific field is visible to them.

## The real pattern: deny by default, allow by exception

The standard design pattern for a sensitive field — a salary figure, a national ID
field, anything similarly regulated — is to deny read access by default and grant it
only to a narrow, explicitly listed set of roles or group members, rather than trying
to enumerate every role that *shouldn't* see it.

```javascript
// Field ACL: employee.salary_band, operation: read
// Deny by default; allow only a narrow, explicit exception
answer = gs.getUser().isMemberOf('b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7') ||
         gs.hasRole('hr_compensation_admin');
```

A user can hold `hr_admin`, `itil`, even `admin`-adjacent roles for other parts of the
platform and still fail this check — field-level security doesn't care what else a
user can do elsewhere; it only cares whether they're in the specific group or role
this one field was scoped to.

## Defense in depth: ACL plus anonymization

A field-level ACL is a binary gate — pass or fail, visible or not visible at all.
Chapter 4 covers ServiceNow's Data Anonymization capability in depth, but it's worth
previewing the idea here because it's the natural second layer on the same sensitive
field: anonymization can mask a value for users who technically pass the ACL but
still shouldn't see the real number — showing something like `•••-••-1234` instead of
a full field value. Where the ACL answers "can this user see this field at all,"
anonymization answers "if they can, how much of it should actually be revealed."
Together they're defense in depth on the same field: two independent layers, so a
misconfiguration in one doesn't automatically expose the data through the other.

## The honest tradeoff

Field-level security design is genuinely a balancing act, not a one-sided "more
security is always better" exercise:

- **Over-restrict**, and you break real workflows — an HR business partner who
  legitimately needs to see compensation data to do their job can't, and they'll
  either escalate constantly or find a workaround that's worse for security than the
  ACL you were trying to enforce.
- **Under-restrict**, and the field is exposed to people who have no legitimate need
  for it, which is exactly the regulatory and reputational risk field-level ACLs exist
  to prevent.

A well-designed instance isn't the one with the most ACLs or the most locked fields —
it's the one where someone sat down and worked out the real, specific minimum access
each role genuinely needs, field by field, instead of defaulting to either extreme.

## Key terms

| Term | Meaning |
|---|---|
| Field-level ACL | An access rule scoped to one specific field, checked in addition to the table-level ACL |
| Deny by default, allow by exception | List only who *should* see the field, rather than enumerating everyone who shouldn't |
| Defense in depth | Combining a field-level ACL with Data Anonymization so one layer's gap isn't the only protection |
| Minimum necessary access | Granting each role exactly the access it genuinely needs for its job, no more and no less |

## Check yourself

Why is "deny by default, allow by exception" generally a safer pattern for a
sensitive field than trying to list every role that should be denied? What happens
to each approach when a brand-new role is created six months later?
