# Lesson 3 — Role Hierarchy

**Chapter 1 · Sharing Building Blocks · Lesson 3 of 24**

## What you'll learn

- Why the role hierarchy is a data-access tree, not an org chart, and when those two things should diverge
- How upward visibility actually propagates, and the one setting (from Lesson 2) that can switch it off per object
- Why role hierarchy depth is a real architectural cost, not a free way to model structure
- How to design a role hierarchy that's wide and shallow instead of deep and narrow, and why that choice matters at scale

## It's a data-access tree, not an org chart

The single most common mistake junior admins make with the role hierarchy is building it to mirror the literal management reporting structure, title for title. The role hierarchy's only job is to answer one question: who automatically inherits visibility into whose records? Those two things — "who reports to whom" and "who needs to see whose records" — often look similar, but they are not the same question, and an architect should design for the second one even when it means the role hierarchy looks nothing like the org chart on the wall.

![A simplified role hierarchy diagram showing a CEO role at the top with separate branches beneath for different departments.](/courses/sharing-and-visibility-architecture/ch01/03-role-hierarchy/role-hierarchy-diagram.jpg)
*A role hierarchy branches by data-visibility need, not necessarily by department or title — the CEO role sits above every branch because visibility, not org-chart position, is what the hierarchy encodes.*

A common real pattern: a regional VP of Sales needs to see every Opportunity their reps own, but does not need to see every HR case their HR Business Partner manages, even though both report to the same COO two levels up in the real org chart. Mirroring the literal chart would put both under one shared ancestor role, and because Grant Access Using Hierarchies defaults to on for standard objects, that VP would suddenly have visibility into HR data they have no business reason to see. The fix is structural: give Sales and HR genuinely separate branches in the role hierarchy, meeting only at a role far enough up that the shared ancestor's own visibility is deliberately scoped or restricted.

## How upward visibility actually propagates

![The Create Role Hierarchy page in Salesforce Setup, showing the role tree with a role selected.](/courses/sharing-and-visibility-architecture/ch01/03-role-hierarchy/create-role-hierarchy-page.png)
*Setup > Users > Roles — the tree view of the role hierarchy, built and edited one role at a time.*

A role doesn't grant visibility by itself; it only matters once users are assigned to it and the *Grant Access Using Hierarchies* flag (Lesson 2) is enabled for a given object. When both conditions hold, any user in Role A can see every record owned by, or shared with, any user in a role beneath Role A — recursively, all the way down. This happens regardless of OWD: even if OWD for Opportunity is Private, a Sales Director role sees every Opportunity owned by every Account Executive role beneath it, because the role hierarchy is a standing, structural grant on top of the private default, exactly like a sharing rule or team would be.

![A role's detail page in Salesforce Setup, showing the Assign Users to Role action.](/courses/sharing-and-visibility-architecture/ch01/03-role-hierarchy/role-detail-assign-users.png)
*A role's detail page — assigning users to a role is what actually activates upward visibility for them, not the role's mere existence in the tree.*

A role with zero users assigned to it still occupies a position in the tree and can still be a parent for other roles, but it grants nobody anything until people are placed in it. This is useful for architecture: you can build structural placeholder roles — a regional umbrella role, say — purely to control how visibility aggregates upward, without ever assigning a person to log in as that role.

## Depth is a real cost, not a free structural choice

Every level you add to the role hierarchy adds real computational and administrative cost. Each time a user's role changes, or a role moves to a different parent, Salesforce has to recalculate every sharing-table entry that depended on the old position — and the deeper the hierarchy, the more records that recalculation can touch (Lesson 16 covers this recalculation mechanism directly). Beyond performance, very deep hierarchies are also an administrative liability: large organizations that mirror every layer of middle management into roles can accumulate a genuinely unwieldy number of roles, to the point where Salesforce's own guidance pushes architects toward deliberately flatter designs — fewer, broader roles that capture the visibility need without a role for every job title. The architectural guidance that has held up in practice is: design the hierarchy as wide and shallow as the actual visibility requirements allow, and resist the temptation to recreate every rung of the real management ladder just because it exists.

## Key terms

| Term | Meaning |
|---|---|
| Role hierarchy | A tree of roles that grants upward visibility — anyone in a parent role sees records owned by anyone in a child role, when enabled for that object |
| Grant Access Using Hierarchies | The per-object switch (Lesson 2) that determines whether role hierarchy visibility applies to a given object at all |
| Structural (placeholder) role | A role in the tree with no users assigned, used purely to control how visibility aggregates upward |
| Wide and shallow hierarchy | A role-hierarchy design pattern favoring fewer, broader roles over one role per management layer, to limit recalculation cost and administrative overhead |

## Lab

In a Developer Edition org, go to **Setup > Users > Roles** and sketch two competing role hierarchies for a company with Sales, Support, and HR departments: one that mirrors the literal management chart exactly, and one designed purely around data-visibility needs. Build the second one for real in your org, with at least four roles, and assign one test user to each of two roles with a parent/child relationship. Confirm the parent role's user can see a record owned by the child role's user, then disable Grant Access Using Hierarchies for a custom object and confirm that visibility disappears for that object specifically while still holding for standard objects.

## Check yourself

1. Why might a correct role hierarchy design deliberately NOT match a company's real management reporting structure?
2. Does assigning zero users to a role make it useless in the hierarchy? Why or why not?
3. Why does hierarchy depth create a real performance cost, not just an administrative one?
