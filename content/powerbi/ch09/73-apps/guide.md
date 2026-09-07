# Lesson 73 — Power BI Apps

**Chapter 9 · Power BI Service & Fabric · Lesson 7 of 8**

## What you'll learn

- What an app is, and how it differs from sharing individual reports
- The three-step process: Setup, Content, Audience
- How multiple audiences let one app show different things to
  different groups
- What app users can and can't do, compared to workspace collaborators

## Why apps exist

Sharing individual reports (Lesson 72) works for one or two people.
Once a whole department or organization needs access to a *collection*
of dashboards and reports, packaging them into an **app** is the
better tool — one clean, read-only, navigable bundle instead of a pile
of separate share links.

![Screenshot of installed Power BI apps.](/courses/power-bi/ch09/73-apps/power-bi-apps.png)
*Apps appear in their own list — distinct from the workspace they were published from.*

App users find your app through the Apps marketplace, a direct link,
or (if your admin allows it) automatic installation straight into
their account. Unlike a shared report, app users can't modify what
they see — they can filter, sort, and drill into visuals, but the
underlying content stays exactly as you published it.

## Setting up an app

1. From the workspace list view, select **Create app**.

   ![Screenshot of the Create app button in a workspace.](/courses/power-bi/ch09/73-apps/create-app-button.png)
   *Every app starts from a workspace — Lesson 69's container, one level up.*

2. On **Setup**, give the app a name, description, theme color, and
   optional support-site link.

   ![Screenshot of the Setup tab for creating an app, with name, description, and theme fields.](/courses/power-bi/ch09/73-apps/setup-page.png)
   *This information is what app users see before they even open it.*

3. Select **Next: Add content**, then choose which of the workspace's
   reports, dashboards, and semantic models to include.

## Audiences: one app, different views

The **Audience** tab is what makes apps genuinely powerful for a real
organization: create multiple audience groups, and control exactly
what each group can see.

![Screenshot of the Manage audience access pane for an app, showing which users or groups belong to each audience.](/courses/power-bi/ch09/73-apps/audience-tab.png)
*A Sales team audience and a Product team audience can see entirely different content from the same app.*

For each audience, you individually show or hide each piece of content
and specify who's in that group. You can also grant, per audience,
whether they can **share** or **build** on the underlying semantic
models — the same permissions Lesson 72 covered, just applied at the
app-audience level instead of a single link.

One caution worth repeating from the official guidance: if a user has
a *direct link* to any content in the app, they can open it even if
it's hidden from their audience's navigation — hiding is for
navigation clarity, not security, exactly as with reports.

## Publishing and updating

Selecting **Publish app** makes it live and gives you a shareable app
link. Updating later works the same way: edit the workspace's content,
then select **Update app** — nothing changes for existing users until
you do. One important detail: updating an app does **not** automatically
show newly added content to existing audiences; you have to go into
each audience group and unhide it manually.

## Key terms

| Term | Meaning |
|---|---|
| App | A packaged, read-only bundle of dashboards, reports, and semantic models for a broad audience |
| Audience | A defined group within an app, with its own visible content and permissions |
| Setup / Content / Audience | The three tabs of the app-publishing workflow |
| Install automatically | An admin-enabled option to push an app directly into users' accounts, no install step needed |

## Lab

1. In the workspace from Lesson 69's lab, select **Create app** and
   fill in the Setup tab for an "AdventureWorks Sales Insights" app.
2. Add your `AdventureWorksDW2014` report and dashboard as content.
3. Create two audiences — for example, "Leadership" and "Sales Team"
   — and hide at least one piece of content from one audience that
   the other can see. Publish the app and note the shareable link it
   gives you.

## Check yourself

You're ready for Lesson 74 when you can explain why an app with two
different audience groups can show two people completely different
content, even though both opened the exact same app.
