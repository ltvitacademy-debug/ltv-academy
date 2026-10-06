# Lesson 2 — Tenant Settings

**Chapter 1 · Tenant and Workspace Governance · Lesson 2 of 20**

## What you'll learn

- What tenant settings actually control, and the one critical thing they don't
- How to navigate to tenant settings in both the current and legacy admin experiences
- The five possible states a tenant setting can be in, with real examples of each
- Practical habits for managing tenant settings responsibly over time

## What tenant settings control

**Tenant settings** are the single biggest governance lever in Power BI: one admin screen that turns entire features on or off, either for the whole organization or for specific security groups. Export to XML, external sharing, certification, the ability to download a .pbix file — all of it is a tenant setting.

The critical caveat, straight from Microsoft's own documentation: *tenant settings that control the availability of features in the Power BI interface can help establish governance policies, but they're not a security measure.* Disabling **Export data** on a semantic model doesn't stop a user with read access to that semantic model from querying it and persisting the results some other way. Tenant settings control what the UI *offers*; they don't change what a user's underlying permissions already allow. For actual access control, you still need workspace roles, item permissions, RLS, and OLS — covered in later lessons.

One more operational detail: changes to a tenant setting can take up to **15 minutes** to apply across the organization. Don't assume a toggle failed just because it hasn't taken effect yet.

## Finding tenant settings

1. Sign in to [Fabric](https://app.fabric.microsoft.com) with an admin account
2. Select **OneLake catalog**, then the **Govern** tab
3. Select **Configurations** → **Tenant settings**

If the OneLake catalog / Govern experience hasn't rolled out to your region yet, use the legacy path instead: select the **Settings** (gear) icon → **Admin portal** → **Tenant settings**.

## The five states of a tenant setting

Most tenant settings can be configured into one of several states. Four of them, in order of broadest to narrowest:

![Screenshot of the Certification tenant setting, toggled to Disabled, with the subtitle 'Disabled for the entire organization.'](/courses/power-bi-governance/ch01/02-tenant-settings/fabric-admin-tenant-settings-disabled-all.png)
*Disabled for everyone — no one in the organization, regardless of role, gets this feature.*

![Screenshot of the Download reports tenant setting, Enabled and scoped to 'The entire organization.'](/courses/power-bi-governance/ch01/02-tenant-settings/fabric-admin-tenant-settings-enabled-all.png)
*Enabled for the entire organization — the broadest "on" state, and usually the riskiest for anything sensitive.*

![Screenshot of the Export reports as XML documents setting, Enabled for the entire organization except a 'Denied' security group.](/courses/power-bi-governance/ch01/02-tenant-settings/fabric-admin-tenant-settings-enabled-all-except.png)
*Enabled for all, except specific groups — open by default, with named exceptions carved out.*

![Screenshot of the same setting, Enabled and scoped to a specific 'Allowed' security group only.](/courses/power-bi-governance/ch01/02-tenant-settings/fabric-admin-tenant-settings-enabled-specific.png)
*Enabled for specific security groups only — closed by default, opened only for the people who need it.*

A fifth state exists too: **enabled for specific groups, except for certain groups** — members of an allowed group get the feature, unless they're also in an excluded group, in which case the most restrictive rule wins.

## Practical guidance for managing tenant settings

- **Prefer security-group scoping over all-or-nothing toggles** for anything sensitive — external sharing, data export, guest access. The "enabled for specific groups" pattern (fourth screenshot above) lets you pilot a feature with one team before opening it org-wide.
- **Watch for the "new" indicator.** Microsoft regularly ships new tenant settings or changes existing ones, and the tenant settings page surfaces a message at the top when that happens — an admin who never revisits this page can miss a new setting that needs a decision.
- **Document why a setting is configured the way it is.** A setting disabled today for a specific compliance reason will look unexplained to whoever inherits tenant administration later. Keep a change log outside the product itself.

## Key terms

| Term | Meaning |
|---|---|
| Tenant setting | An admin-level toggle that turns a Power BI/Fabric feature on or off, org-wide or for specific groups |
| Security group scoping | Enabling or restricting a tenant setting for a named security group rather than the whole organization |
| OneLake catalog Govern tab | The current path to tenant settings, domains, and other admin configuration |
| Admin portal (legacy) | The older admin experience, still used in regions where OneLake catalog/Govern hasn't rolled out |

## Lab

Pick three tenant settings you'd expect to exist in a real organization (for example: external sharing, publish to web, data export). For each, decide which of the four states shown in this lesson you'd recommend as a starting configuration, and write one sentence justifying the choice.

## Check yourself

Can you explain the difference between a tenant setting and an actual security control, in your own words? Can you describe all four (or five) possible states a tenant setting can be configured into, and give a real example of when you'd choose each one?
