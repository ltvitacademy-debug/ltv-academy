# Sharing Rules, Basics

Lesson 27 established the default: visibility flows up the Role Hierarchy, and peers at the
same level don't automatically see each other's records. Real orgs frequently need to extend
visibility beyond that default without restructuring the entire hierarchy — that's what
**Sharing Rules** are for.

## What you'll learn

- What a Sharing Rule is, and the gap it fills beyond ownership and the Role Hierarchy
- The two main ways a Sharing Rule can be triggered: by criteria or by ownership
- A concrete, realistic example of each

## The gap Sharing Rules fill

By default, a user sees records they own, plus records owned by people below them in the Role
Hierarchy. That covers a lot, but not everything real orgs need. What about a cross-functional
Support team that needs to see certain Opportunities even though nobody on that team is above
Sales in the hierarchy? Restructuring the entire Role Hierarchy just to solve one visibility
need would be a heavy, disruptive fix. A **Sharing Rule** solves it directly: it's a
declarative rule that extends record visibility to a specific group of users, without
touching ownership or the hierarchy itself.

## Two ways a Sharing Rule triggers

- **Ownership-based sharing rule** — shares records based on *who owns them*. Example: "share
  every record owned by anyone in the East Region Sales role with the entire Support team."
  It doesn't look at what's inside the record, only who owns it.
- **Criteria-based sharing rule** — shares records based on *field values on the record
  itself*, regardless of who owns it. Example: "share every Opportunity where Stage equals
  'Closed Won' and Amount is greater than $100,000 with the Executive team," so leadership
  automatically sees large closed deals no matter which rep owns them.

Both types work the same way structurally: they name a group of records (by owner or by
criteria) and a group of users to extend visibility to, and Salesforce applies the extension
automatically going forward.

## Why an analyst needs to recognize this

Sharing Rules are exactly why "who owns this record" and "who can see this record" are not
the same question in Salesforce, and why a report can legitimately include records a user
doesn't own and isn't above in the hierarchy. If you're asked why a specific team can see
records that ownership and role hierarchy alone wouldn't explain, a Sharing Rule extending
visibility to that group is the most likely real answer — and knowing this concept exists
means you won't mistake a working sharing rule for a data leak or a misconfigured report.

## Key terms

| Term | Meaning |
|---|---|
| Sharing Rule | A rule extending record visibility beyond ownership and the Role Hierarchy defaults |
| Ownership-based sharing rule | Shares records based on who owns them |
| Criteria-based sharing rule | Shares records based on field values on the record itself |

## Check yourself

A company wants every Opportunity worth over $100,000 automatically visible to the Executive
team, regardless of which sales rep owns it. Which type of Sharing Rule fits, and why not the
other type?
