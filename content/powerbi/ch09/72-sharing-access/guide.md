# Lesson 72 — Sharing Reports & Managing Access

**Chapter 9 · Power BI Service & Fabric · Lesson 6 of 8**

## What you'll learn

- Why sharing a report also shares its underlying semantic model
- The three link types: People in your organization, Specific people,
  People with existing access
- Reshare vs. Build permissions, and what each actually unlocks
- How row-level and object-level security limit what sharing exposes

## The one rule that matters most

Before any button or dialog: **when you share a report, you also
share access to its underlying semantic model.** By default, a
recipient's access isn't limited to only what's visible in the report
— hiding a column, table, or page is a clutter-reduction choice, not a
security boundary. Someone with reshare access to the semantic model
can see everything in it, hidden or not, unless **row-level security
(RLS)** or **object-level security (OLS)** actually restricts it.
Lesson 71 introduced RLS; this is why it matters in practice.

## Choosing a link type

1. Open a report or dashboard and select **Share**.
2. In the **Send link** dialog, pick one of three:

   - **People in your organization** — anyone internally with the
     link can view; doesn't work for external/guest users.
   - **Specific people** — name or email exact people or groups,
     including Microsoft Entra guest users.
   - **People with existing access** — generates a link that gives no
     new access; use it only to send a link to someone who already
     has access some other way.

![Screenshot of the Send link dialog showing People in your organization, Specific people, and People with existing access options.](/courses/power-bi/ch09/72-sharing-access/power-bi-share-links.png)
*Three link types, three different access outcomes — pick deliberately.*

## Reshare and Build permissions

Every link you create can also carry two optional permissions:

| Permission | Default | What it allows |
|---|---|---|
| **Reshare** | On | The recipient can share the report with others themselves |
| **Build** | Off | The recipient can build their own new reports on top of the underlying semantic model, in other workspaces |

Build permission is the bigger grant — it lets someone go beyond
viewing into creating their own analysis from your data. Leave it off
unless a recipient genuinely needs to build on your semantic model.

## Managing existing permissions

To see and change who already has access, open the sharing dialog's
**More options (...) → Manage permissions**:

![Screenshot of the Manage permissions pane showing direct access, pending requests, and advanced options.](/courses/power-bi/ch09/72-sharing-access/power-bi-share-manage-settings.png)
*Everyone with direct access, in one place — grant more, or remove someone entirely.*

From here you can grant new direct access, review pending access
requests, and — via **Advanced** — see related content and apply
filters when the list gets long. Removing a user's access also gives
you the option to remove their access to related content (the report's
underlying semantic model), which is usually the right call; leaving
it half-removed can leave related content displaying incorrectly.

## Considerations worth remembering

- A single report can't have more than 1,000 sharing links — beyond
  that, switch high-volume "Specific people" links to direct access
  grants instead.
- **Publish to web** is a separate, much more permanent option: it
  makes a report publicly accessible on the internet with no
  authentication at all, including its underlying data. Never use it
  as a substitute for the sharing options in this lesson.
- Free-license users can only view shared content if both the report
  and semantic model sit in a Premium/Fabric capacity workspace
  (Lesson 68).

## Key terms

| Term | Meaning |
|---|---|
| Reshare permission | Lets a recipient share the content onward to others |
| Build permission | Lets a recipient create new reports from the underlying semantic model |
| Row-level security (RLS) | Restricts which data *rows* a user can see in a semantic model |
| Object-level security (OLS) | Restricts which *tables/columns* a user can see in a semantic model |

## Lab

1. Share your `AdventureWorksDW2014` report from Lesson 70's lab with
   **Specific people** — even if it's just a second test account or a
   classmate.
2. Leave Reshare on (default) and Build off. Note exactly what that
   combination allows the recipient to do.
3. Open **Manage permissions** and confirm the person you shared with
   now appears under direct access.

## Check yourself

You're ready for Lesson 73 when you can explain, without re-reading
this page, why hiding a table in a report doesn't stop a report
consumer from seeing that table's data through the semantic model.
