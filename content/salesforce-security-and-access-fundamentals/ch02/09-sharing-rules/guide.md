# Lesson 9 — Sharing Rules

**Chapter 2 · Record Access · Lesson 9 of 24**

## What you'll learn

- What sharing rules do that the role hierarchy structurally can't
- Owner-based vs. criteria-based sharing rules
- Who a sharing rule can share records with — public groups, roles, or roles and subordinates
- Why sharing rules can only widen access, never restrict it

## What the hierarchy can't do

The role hierarchy (Lesson 8) only opens access **upward**, along reporting
lines. Two problems it structurally can't solve: peers who need to see
each other's records with no management relationship between them, and
a cross-functional team that needs visibility into records owned by people
in a completely different branch of the org chart. **Sharing rules** exist
for exactly this — extending access to groups of users who aren't related
by the hierarchy at all.

## Owner-based vs. criteria-based

- **Owner-based** sharing rules share records based on **who owns them** —
  "everything owned by members of the Recruiters public group, shared
  read/write with the Hiring Managers public group."
- **Criteria-based** sharing rules share records based on **field values**
  on the record itself, regardless of who owns it — "every Case where
  Case Origin equals Email, shared with the Support Escalations group,"
  no ownership check involved at all.

Both types extend access to a **public group, a role, or a role and its
subordinates** as the recipient — never to an individual user directly
(that's what manual sharing, Lesson 10, is for).

![A public group's detail page showing its Owner-Based Sharing Rules and Criteria-Based Sharing Rules tabs — the two sharing-rule types a group can be the target of, visible in one place.](/courses/salesforce-security-and-access-fundamentals/ch02/09-sharing-rules/reviewers-public-group-sharing-tabs.jpg)

## Only ever widening

Like everything above OWD in this chapter's stack, sharing rules can only
**add** access on top of OWD and the role hierarchy — they can never
restrict what those two already grant. An object set to Public Read/Write
at the OWD level can't be narrowed back down by a sharing rule; sharing
rules only make sense as a tool when OWD for that object is **Private** or
**Public Read Only**, since anything more open leaves nothing left to add.

![The same decision tree from Lesson 7: sharing rules only matter once OWD has already drawn a line at Private or Public Read-Only — there's nothing left to "share" on an object that's already Public Read/Write.](/courses/salesforce-security-and-access-fundamentals/ch02/09-sharing-rules/sharing-model-decision-tree.jpg)

## Where this sits in the stack

Sharing rules are the third layer from the bottom: OWD sets the floor,
the role hierarchy opens it upward automatically, and sharing rules open
it sideways and across, to whatever groups an admin explicitly configures.

![The record-access stack, with Sharing Rules as the second-from-top layer — above the automatic role hierarchy, below the manual, one-off layer.](/courses/salesforce-security-and-access-fundamentals/ch02/09-sharing-rules/sharing-layers-diagram.png)

## Key terms

| Term | Meaning |
|---|---|
| Owner-based sharing rule | Shares records based on who owns them |
| Criteria-based sharing rule | Shares records based on field values, regardless of owner |
| Recipient | Always a public group, a role, or a role and its subordinates — never an individual |

## Check yourself

An object's OWD is already Public Read/Write internally. Does adding a
sharing rule to that object accomplish anything? Why does the lesson say
sharing rules only make sense below a certain OWD level?
