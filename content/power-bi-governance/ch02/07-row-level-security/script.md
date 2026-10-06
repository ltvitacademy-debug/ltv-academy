# Lesson 7 — Row-Level Security · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Row-level security — how two people can open the exact same report and see completely different numbers.

## S2 · STEPS — What row-level security does

Row-level security restricts which rows of data a user sees, based on a DAX filter attached to a role. The role itself — the DAX filter expression — gets defined in Power BI Desktop, on the Manage roles dialog. What happens after publishing, assigning actual people to that role, happens in the Power BI service instead.

## S3 · SCREENSHOT — Finding Security

From a workspace list, the dataset's more-options menu holds Security, right alongside Manage permissions and Schedule refresh. Easy to overlook if you're not specifically looking for it.

## S4 · SCREENSHOT — Adding members to a role

The Row-Level Security pane lists every role defined in Desktop, with member assignment on the right. A role with zero members enforces nothing — the filter only applies to people actually added. A single person can belong to more than one role, and RLS applies the union of whatever roles match.

## S5 · SCREENSHOT — Test as role

Once a role has at least one member, its options menu exposes Test as role — the fastest way to confirm a DAX filter behaves the way you think it does, without asking an actual salesperson to log in and check.

## S6 · SCREENSHOT — View as, confirmed

The View as dialog banners exactly who's being impersonated, and can test by role directly or by a specific person — showing their effective permission and which roles actually apply to them.

## S7 · STEPS — Not the same as workspace roles

Row-level security is easy to confuse with workspace roles from Lesson 3, but they solve different problems. Workspace roles control who can edit or view content at all. Row-level security controls which rows of data a viewer sees within the same report. A Viewer with no edit rights still sees every row unless RLS is layered on top — both controls are necessary, independently.

## S8 · OUTRO

Next lesson: object-level security — hiding entire tables and columns, not just rows.
