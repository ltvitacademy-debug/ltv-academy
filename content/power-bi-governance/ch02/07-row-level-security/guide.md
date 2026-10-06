# Lesson 7 — Row-Level Security

**Chapter 2 · Semantic Models and Security · Lesson 7 of 20**

## What you'll learn

- What row-level security (RLS) actually does, and where the roles that drive it get defined
- How to open a published semantic model's Security pane and assign members to a role
- How to use "Test as role" / "View as" to verify RLS before trusting it in production
- Why RLS is a modeling decision, not a workspace permission

## What row-level security does

**Row-level security (RLS)** restricts which *rows* of data a user sees, based on a DAX filter expression attached to a **role**. Two salespeople can open the exact same report, the exact same visuals, and see entirely different numbers — one sees only Eastern US rows, the other only Western US rows — because the semantic model filters the underlying data differently per role, not because anyone built two reports.

Roles themselves are defined in **Power BI Desktop**, on the Modeling ribbon's "Manage roles" dialog, where a model author writes a DAX filter expression against a table (for example, `[Region] = "Eastern US"`). That role travels with the model when it's published to the service. What happens *after* publishing — assigning actual people or security groups to that role — happens in the Power BI service, not Desktop.

## Assigning members to a role

Once a semantic model with roles is published, open its **Security** pane from the workspace list's "more options" (•••) menu:

![Screenshot of a dataset's more-options menu in a Power BI workspace list, with Security highlighted among options like Analyze in Excel, Create report, Delete, Refresh now, and Manage permissions.](/courses/power-bi-governance/ch02/07-row-level-security/dataset-more-options-menu.png)
*Security sits in the same menu as Manage permissions and Schedule refresh — easy to overlook if you're not specifically looking for it.*

That opens the Row-Level Security pane, listing every role defined in Desktop on the left, with member assignment on the right:

![Screenshot of the Row-Level Security pane, showing a role named Eastern US with zero members, and a field to enter email addresses for people or groups who belong to this role.](/courses/power-bi-governance/ch02/07-row-level-security/row-level-security-add-member.png)
*A role with zero members enforces nothing yet — the DAX filter only applies to people actually assigned to the role.*

Enter an email address (an individual user or, more commonly at scale, a security group) and select **Add**. A role can hold any number of members, and a user can belong to more than one role — RLS then applies the *union* of all matching roles' filters.

## Testing before you trust it

Never ship RLS without testing it as the role would actually experience it. Once a role has at least one member, its "•••" menu exposes a test option:

![Screenshot of the Row-Level Security pane with a role's options menu open, showing 'Test as role' above the member list.](/courses/power-bi-governance/ch02/07-row-level-security/row-level-security-test-role.png)
*Test as role is the fastest way to confirm a DAX filter does what you think it does, without asking an actual salesperson to log in and check.*

"Test as role" opens a **View as** dialog, banner at the top confirming exactly who's being impersonated:

![Screenshot of the View as dialog, banner reading 'Now viewing as: East', with Select role and Select person tabs, a test user's effective permission, assigned roles, and username.](/courses/power-bi-governance/ch02/07-row-level-security/row-level-security-test-role-2.png)
*The dialog can test by role directly, or by a specific person — showing their effective permission and exactly which role(s) apply to them.*

Test every role before publishing broadly, and retest after any change to the underlying DAX filter — a filter that looked right in isolation can behave unexpectedly once combined with relationships elsewhere in the model.

## Why this isn't a workspace permission

RLS is easy to confuse with workspace roles (Admin, Member, Contributor, Viewer) covered in Lesson 3, but they solve different problems entirely:

| | Workspace roles | Row-level security |
|---|---|---|
| Controls | Who can edit/view content in a workspace | Which rows of data a viewer sees within the same report |
| Defined in | Workspace access settings | DAX filter in the semantic model (Desktop), members assigned in the service |
| Granularity | Whole items (reports, dashboards) | Individual rows, based on a filter expression |

A Viewer with no edit rights at all can still see every row of data unless RLS is layered on top. RLS and workspace roles are both necessary, independent controls — one without the other leaves a real gap.

## Key terms

| Term | Meaning |
|---|---|
| Row-level security (RLS) | A DAX filter attached to a role that restricts which rows a member of that role sees |
| Role | A named security boundary, with its own DAX filter, defined in Power BI Desktop |
| Member | A user or security group assigned to a role in the Power BI service, after publishing |
| Test as role / View as | The built-in tool for verifying RLS behavior before trusting it in production |

## Lab

A sales semantic model has two roles defined in Desktop: "Eastern US" (filtered to `[Region] = "Eastern"`) and "Western US" (filtered to `[Region] = "Western"`). A user is accidentally added to both roles. Using what you learned about how RLS combines multiple role memberships, describe what that user will see — and why leaving them in only one role is usually the safer default.

## Check yourself

Can you explain where an RLS role's DAX filter gets written, versus where its members get assigned? Can you describe what "Test as role" actually verifies, and why you should retest after changing a role's filter expression?
