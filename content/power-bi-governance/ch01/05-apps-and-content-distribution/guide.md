# Lesson 5 — Apps and Content Distribution

**Chapter 1 · Tenant and Workspace Governance · Lesson 5 of 20**

## What you'll learn

- What a Power BI app actually is, and how it relates to the workspace behind it
- How to walk through the three-step app publishing flow: Setup, Content, Audience
- Why audiences let one app serve different content to different people
- Three governance gotchas that apps don't automatically solve

## What an app is

An **app** packages dashboards, reports, and semantic models from a workspace into a read-only distribution for a broader audience. App users can't edit the content — only the workspace's Admins and Members can do that. Every app traces back to exactly one workspace, which acts as its staging area: you change content in the workspace, then explicitly publish or update the app to push those changes out.

## Step 1: Setup

![Screenshot of the app Setup tab, with fields for App name, Description, App logo, App theme color, and Contact information.](/courses/power-bi-governance/ch01/05-apps-and-content-distribution/setup-page.png)
*The app's own identity — name, description, logo, and theme — is independent of whatever the underlying workspace is called.*

## Step 2: Content

![Screenshot of the app Content tab, showing an empty App Preview panel with an 'Add content' button highlighted.](/courses/power-bi-governance/ch01/05-apps-and-content-distribution/content-tab.png)
*Add content pulls specific items from the workspace into the app. Publishing an app does not automatically expose everything in the workspace — only what's explicitly added here.*

## Step 3: Audience

This is the step with the most governance weight. An app can have **up to 25 audience groups**, and each one can show or hide different content from the same underlying app — so a sales team and an executive team can open the same app and see genuinely different content.

![Screenshot of the Audience tab with a 'Customize your audience' tooltip, showing Audience1 and a second 'Supplier Quality' audience tab.](/courses/power-bi-governance/ch01/05-apps-and-content-distribution/audience-tab.png)
*Each audience gets independent show/hide toggles per item — Supplier Quality sees a different slice of this app than Audience1.*

For each audience, you grant access either to the **entire organization** or to **specific people/groups**, and advanced settings can let that audience share the underlying semantic models or build their own content on top of them.

## Publishing

![Screenshot of the Publish app confirmation dialog with the Publish app button highlighted.](/courses/power-bi-governance/ch01/05-apps-and-content-distribution/publish-app-button.png)
*Publishing (and updating) requires a Power BI Pro or Premium Per User license. Recipients need one too — unless the content sits on Premium capacity or a Fabric F64+ capacity, where free-license Viewers can still consume it.*

## Governance gotchas apps don't fix automatically

- **Hidden isn't secured.** If an audience's "Allow access to hidden content" setting is on, anyone with a direct link to a hidden item can still open it — hiding is a navigation convenience, not an access control.
- **An app inherits, never adds, security.** Row-level security and object-level security on the underlying semantic model still apply exactly as defined. An app doesn't layer any security of its own on top — if the semantic model has no RLS, neither does the app built on it.
- **Updates don't auto-include new content.** When you add something to the workspace and update the app, that new item is hidden by default for every audience — you have to go back into each audience and explicitly unhide it, or it's effectively invisible even though it's technically in the app.

## Key terms

| Term | Meaning |
|---|---|
| App | A read-only, packaged distribution of a workspace's dashboards, reports, and semantic models |
| Audience | A named group within an app that can see a different slice of the app's content |
| Allow access to hidden content | A per-app setting that lets a direct link reach content hidden from an audience's navigation |
| Build permission | Permission that lets an app audience create their own content on top of the app's semantic models |

## Lab

Design the audience structure for a "Regional Sales" app published from a workspace containing five reports: one company-wide summary, and four region-specific reports. Specify what audiences you'd create, which reports each audience sees, and whether you'd grant access to the entire organization or to specific groups for each one.

## Check yourself

Can you explain, step by step, the difference between adding content to an app (Content tab) and making that content visible to an audience (Audience tab)? Can you name two things that remain true about an app's data security even after you've hidden an item from every audience?
