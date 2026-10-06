# Lesson 2 — Tenant Settings · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Tenant settings: the single admin screen that decides what every user in your organization can actually do in Power BI.

## S2 · STEPS — What tenant settings control

Tenant settings turn entire features on or off — across the whole organization or for specific groups. Important caveat: a tenant setting controls what's offered in the interface, not what a user with existing access can still do with their permissions. And changes take up to fifteen minutes to apply tenant-wide, so don't panic if a toggle doesn't take effect instantly.

## S3 · STEPS — Finding tenant settings

To get there, sign in with an admin account at app.fabric.microsoft.com, open the OneLake catalog, select Govern, then Configurations, then Tenant settings. If your region is still rolling out that experience, the legacy path is the Settings gear, Admin portal, Tenant settings.

## S4 · SCREENSHOT — State 1 of 5, disabled for everyone

Most settings can land in one of several states. Here, Certification is fully disabled — no one in the organization, regardless of role, can certify an item as a trusted source.

## S5 · SCREENSHOT — State 2 of 5, enabled for the entire organization

Download reports, switched on and scoped to the entire organization. Every licensed user can download .pbix files and paginated reports. This is the broadest, simplest state — and often the riskiest one for sensitive features.

## S6 · SCREENSHOT — State 3 of 5, enabled for all except specific groups

A more targeted pattern: Export reports as XML documents, enabled organization-wide, but with a security group explicitly denied. This is how you open a feature broadly while still carving out an exception for one group.

## S7 · SCREENSHOT — State 4 of 5, enabled for specific groups only

The mirror image: off by default, turned on only for a named "Allowed" security group. For anything sensitive — exports, external sharing, guest access — this scoped-on pattern is almost always the safer starting point.

## S8 · STEPS — Practical guidance

A few habits that save you later. Prefer security-group scoping over all-or-nothing toggles for anything sensitive. Watch for the "new" badge Microsoft adds when settings change, so you're not caught off guard. And document why a setting was disabled — six months from now, someone will ask, and "we think it was for a reason" isn't an answer.

## S9 · OUTRO

Next lesson: workspaces and workspace roles — where content actually lives, and who can do what inside it.
