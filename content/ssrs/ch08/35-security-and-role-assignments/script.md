# Script — Security & Role Assignments

## Segment 1 (title)

Last lesson we saw the two admin surfaces. Now let's go deeper on the one that trips people up the most: security. A role assignment sounds simple, but it's got three moving parts, and there's a distinction — item-level versus system-level — that's easy to get backwards.

## Segment 2 (steps: role assignment parts)

A role assignment maps a user or group account to a role definition — a named bundle of permitted tasks — for a specific securable item, like a folder or a report. In practice you'll live in three predefined roles: Browser, for most users, who just view and run reports; Publisher, a smaller group who add reports and create folders; and Content Manager, full control including security itself, reserved for only a few people.

## Segment 3 (screenshot: item-security-role-grid)

Here's the part people get backwards: item-level and system-level role assignments are mutually exclusive. Item-level controls access to things in the folder hierarchy — reports, folders, shared data sources — inherited down from Home unless you override it. System-level authorizes operations scoped to the server as a whole, like using Report Builder or shared schedules, and it doesn't touch the folder hierarchy at all. That's why granting a new user access is genuinely a two-part job. This is the Security page at the Home folder itself — one row, BUILTIN\Administrators holding Content Manager, and that's what every report and subfolder inherits until something overrides it. New Role Assignment, right there in the toolbar, is how you add another row.

## Segment 4 (screenshot: new-role-assignment-item)

Click New Role Assignment here and you get the full list — five roles, not the two we saw at the system level last lesson. Browser, Content Manager, My Reports, Publisher, Report Builder — the same predefined roles, laid out with their full descriptions right on the page. This is where the real day-to-day granularity lives: deciding exactly who gets to just view reports versus who gets to publish or manage content.

## Segment 5 (screenshot: item-level-security-override)

Folder-level security covers most cases, but sometimes one specific report needs different access than everything around it. That's Edit Item Security — breaking inheritance for a single item. Here it's set on one report, ReportDesignerExample, inside its own Properties, Security page. Everything else in that same folder keeps inheriting from Home, untouched; only this one report now has its own, independent role assignment.

## Segment 6 (outro)

Next lesson: report caching and snapshots — how to keep a report from re-querying the data source on every single request.
