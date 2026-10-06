# Lesson 9 — Sharing and Permissions

**Chapter 2 · Semantic Models and Security · Lesson 9 of 20**

## What you'll learn

- The difference between sharing a single item and giving someone workspace access
- What a "Send link" actually grants, and the link-type choices that control its reach
- Where to find and audit everyone an item has been shared with
- Why Manage permissions, not just Send link, is the governance-relevant screen

## Two different ways to grant access

Power BI has two distinct mechanisms for letting someone see content, and governance treats them very differently:

- **Workspace access** (Lesson 3) — adding someone as Admin, Member, Contributor, or Viewer gives them that role across *everything* in the workspace.
- **Item-level sharing** — handing one specific report or dashboard to someone who may have no workspace access at all.

Item-level sharing is the more common day-to-day action, and the one most prone to governance drift, because it's easy to share an item once and forget it was ever shared.

## Sending a link

Selecting **Share** on a report or dashboard opens the **Send link** dialog:

![Screenshot of the Send link dialog for 'IT Spend Analysis Sample,' showing a link-type selector reading 'People in your organization with the link can view and share,' a name/email field, an optional message field, a Send button, and Copy link, Mail, Teams, and PowerPoint icons.](/courses/power-bi-governance/ch02/09-sharing-and-permissions/power-bi-share-links.png)
*The link-type selector at the top is the real access control here — it determines who can use the link at all, before any names are even entered.*

That top selector is the setting to actually read before sending anything. The options typically include:

- **People in your organization** — anyone signed in to the tenant can use the link
- **Specific people** — only the named individuals (or security groups) can use it
- **People with existing access** — doesn't grant anything new; just hands a link to someone who already has access some other way

Below the link type, two additional toggles matter for governance: **Allow recipients to share this item** (resharing) and **Allow recipients to build content with the data associated with this item** (build permission, letting them create new reports off the same semantic model). Both default settings are worth checking explicitly rather than assuming.

## Managing — and auditing — who has access

The same dialog's "•••" menu exposes **Manage permissions**, the screen that actually lists who has access and how they got it:

![Screenshot of the Send link dialog with its options menu open, Manage permissions highlighted above Copy link, Outlook, and Teams icons.](/courses/power-bi-governance/ch02/09-sharing-and-permissions/power-bi-share-manage-settings.png)
*Send link only grants access going forward — Manage permissions is where you see and revoke everything already granted.*

This is the screen to use when auditing an item: every link that's been created, every direct share, and the ability to revoke any of them individually — without having to guess who might still have a stale link from months ago.

## Workspace-level access, for contrast

Workspace access is managed separately, from the workspace's own header bar:

![Screenshot of a Power BI workspace header bar, with the Manage access icon highlighted next to Create app and Workspace settings.](/courses/power-bi-governance/ch02/09-sharing-and-permissions/power-bi-workspace-access-icon.png)
*Manage access controls the workspace roles from Lesson 3 — a broader, coarser grant than sharing a single item.*

Giving someone a workspace role is the right call when they need ongoing access to everything being built there. Item-level sharing is the right call when they need one report, once, without a reason to see anything else in the workspace.

## A governance lens on sharing

- **Default to the narrowest link type** that still does the job — "Specific people" over "People in your organization" whenever the content doesn't need tenant-wide reach.
- **Treat resharing and build permission as deliberate choices**, not defaults to leave untouched.
- **Revisit Manage permissions periodically**, especially for anything shared with "People in your organization" — the broadest link type is also the easiest to forget about.

## Key terms

| Term | Meaning |
|---|---|
| Send link | The dialog used to share a single report or dashboard, with a selectable link type |
| Link type | Who can use a shared link: people in the org, specific people, or people with existing access |
| Reshare / Build permission | Optional toggles letting recipients share further or build new content off the same data |
| Manage permissions | The audit screen listing every link and direct share an item currently has, with revoke controls |

## Lab

A report was shared six months ago using "People in your organization with the link can view and share." List the steps you'd take, using only what's covered in this lesson, to find out who currently has access and tighten it to a named list of people.

## Check yourself

Can you explain the difference between what Send link grants and what Manage permissions shows? Can you describe when workspace access is the better choice over item-level sharing, and vice versa?
