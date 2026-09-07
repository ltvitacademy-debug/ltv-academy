# Lesson 70 — Publishing Reports

**Chapter 9 · Power BI Service & Fabric · Lesson 4 of 8**

## What you'll learn

- The exact steps to publish a Desktop file to a workspace
- What republishing does — and the risks it carries
- Why two semantic models with the same name can break a republish
- What happens to sensitivity labels and refresh schedules on republish

## Publishing for the first time

1. In Power BI Desktop, choose **File → Publish → Publish to Power
   BI**, or select **Publish** on the Home ribbon.

   ![Screenshot of the Power BI Desktop Home ribbon with Publish highlighted.](/courses/power-bi/ch09/70-publishing/pbid_publish_publishbutton.png)
   *One button — but it's worth understanding everything it triggers.*

2. Sign in if prompted.
3. Search for and select the destination workspace, then click
   **Select**.

   ![Screenshot of the Publish to Power BI dialog with a workspace search box.](/courses/power-bi/ch09/70-publishing/pbid_publish_select_destination.png)
   *Any workspace you already have Contributor access or above to appears here.*

4. When it finishes, you get a direct link to the new report.

   ![Screenshot of the successful publishing dialog with a "Got it" confirmation and report link.](/courses/power-bi/ch09/70-publishing/pbid_publish_success.png)
   *Publishing creates a new semantic model and report with the same name as your file.*

Publishing has the exact same effect as using **Get data** in the
service to upload the same file directly — the button in Desktop is a
convenience, not a different mechanism.

## What gets published, and what doesn't

Only the semantic model (tables, relationships, measures) and any
report pages you built in Report view come along. Two things that
never transfer:

- Changes made *in the service* to a published report never write
  back to your original `.pbix` file (Lesson 67 already flagged this).
- If your Desktop file carries a sensitivity label, the published
  semantic model and report inherit it — but that inheritance behaves
  differently depending on whether the label was applied automatically
  or manually.

## Republishing

When you republish, the semantic model in the service is *replaced*
with the updated version from your file. A few things to know before
doing this on a real project:

- **Duplicate names break it.** If two semantic models in the same
  workspace already share your file's name, publishing can fail — keep
  names unique, or rename before republishing.
- **Renamed or deleted fields break visuals.** If you rename or remove
  a column or measure that a visual in the service already uses, that
  visual breaks.
- **A refresh starts immediately.** If you have a refresh schedule
  configured, republishing kicks off a semantic model refresh right
  away, on top of the schedule.
- **Storage mode changes aren't allowed mid-republish.** You can't
  overwrite an Import-mode report with a DirectQuery-based one (or the
  reverse) just by republishing — that requires deleting and recreating.
- **Impact analysis warns you first.** Power BI tells you how many
  workspaces, reports, and dashboards your change could affect, with a
  link to the full impact analysis, before you confirm the overwrite.

## Key terms

| Term | Meaning |
|---|---|
| Publish | Send a Desktop file's semantic model and reports to a service workspace for the first time |
| Republish | Replace an already-published semantic model with an updated version from the same file |
| Sensitivity label | A classification (e.g. Confidential) that travels with a file and downstream to its semantic model and report |
| Impact analysis | A report showing how many workspaces/reports/dashboards a semantic model change could affect |

## Lab

1. Take a report built against `AdventureWorks2012` or
   `AdventureWorksDW2014` from an earlier chapter and publish it into
   the workspace you created in Lesson 69's lab.
2. Back in Desktop, add one new measure to that same report, then
   republish. Read the impact-analysis message Power BI shows before
   confirming — note how many items it says could be affected.
3. Confirm the overwrite, then open the report in the service and
   verify your new measure is available in the Fields pane.

## Check yourself

You're ready for Lesson 71 when you can explain what happens if you
rename a column that a report visual in the service is already using,
the next time you republish.
