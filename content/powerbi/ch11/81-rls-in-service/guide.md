# Lesson 81 — RLS in Power BI Service

**Chapter 11 · Security · Lesson 3 of 5**

## What you'll learn

- How to reach the Security screen for a semantic model with roles
- Who can see and use that Security option
- Adding and removing members from a role
- Which group types are supported — and which aren't

## Finding the Security option

Roles defined in Desktop (Lesson 80) travel with the semantic model
when you publish. To assign members to one:

1. Hover over the semantic model in its workspace to reveal **More
   options**.

   ![Screenshot showing the More options menu next to a semantic model.](/courses/power-bi/ch11/81-rls-in-service/dataset-canvas-more-options.png)
   *This menu only appears on hover — easy to miss the first time.*

2. Select **Security**.

   ![Screenshot showing the More options menu with Security selected.](/courses/power-bi/ch11/81-rls-in-service/dataset-more-options-menu.png)
   *"Security" is only visible if the semantic model already has at least one RLS role defined in Desktop.*

If your semantic model has no roles defined yet, you won't see this
option at all — go back to Lesson 80 first.

## Who can do this

Users with the workspace **Contributor** role or higher see the
**Security** option and can assign members to roles. Semantic model
ownership or **Build** permission may also be required depending on
the exact scenario.

## Adding members to a role

On the Row-Level Security page, type an email address or name into a
role's member box:

![Screenshot showing how to add a member to a role.](/courses/power-bi/ch11/81-rls-in-service/row-level-security-add-member.png)
*Add anyone by email — including external guests — but not a group created inside Power BI itself.*

Supported group types: **distribution groups**, **mail-enabled
groups**, and **Microsoft Entra security groups**. Not supported:
**Microsoft 365 groups** — they can't be added to any RLS role at all.

## Checking membership at a glance

Each role shows a member count in parentheses:

![Screenshot showing the member count next to a role name.](/courses/power-bi/ch11/81-rls-in-service/row-level-security-member-count.png)
*A quick sanity check — "West Sales (3)" tells you three people are assigned without opening anything further.*

## Removing members

Select the **X** next to a member's name to remove them from a role —
no confirmation dialog, effective immediately.

## Key terms

| Term | Meaning |
|---|---|
| Security (option) | The per-semantic-model screen for assigning members to RLS roles |
| Distribution / mail-enabled / Entra security group | Supported group types for RLS role membership |
| Microsoft 365 group | An unsupported group type — can never be added to an RLS role |

## Lab

1. Publish the `West Sales` role you built in Lesson 80's lab (if you
   haven't already).
2. In the service, hover the semantic model, select **More options →
   Security**.
3. Add your own account (or a test account) as a member of the `West
   Sales` role, and confirm the member count updates from `(0)` to
   `(1)`.

## Check yourself

You're ready for Lesson 82 when you can explain why a Microsoft 365
group can't be used for RLS role membership, and which two group
types work instead.
