# Creating a Report

**Chapter 1 · Reports · Lesson 2 of 22**

With the report type idea in hand, it's time to actually build one. This lesson walks through the Report Builder itself: starting a new report, naming it, and reading the four panels you'll live in for the rest of this chapter.

## What you'll learn

- The steps to start a new report and pick its type
- The four panels of the Lightning Report Builder
- Why the live preview only shows some of your data
- How to save and run a report once it looks right

## Starting a new report

From the **Reports** tab, click **New Report**. Salesforce immediately asks you to choose a report type — the decision from Lesson 1 — either by browsing categories or searching by name. Once you pick one and click **Start Report** (or **Continue**), the Report Builder opens with that type's chip shown next to the report name, and you can rename the report right away by clicking the pencil icon.

## The four panels of the Report Builder

Once inside, the builder is split into consistent regions:

| Panel | What it does |
|---|---|
| Fields pane | Every field the report type exposes, organized by object, with a search box |
| Outline tab | Where you drag fields into Groups and Columns |
| Filters tab | Where you narrow down which records show up |
| Preview pane | A live, partial preview of your results as you build |

The Outline and Filters tabs share the same left-hand panel — you switch between them with the tab control at the top. The Fields pane slides out from the far-left arrow and stays open while you drag fields across.

## The preview is not the full report

The preview pane only shows a **limited number of records** so the builder stays fast and responsive while you work — it is not the complete result set. The banner above the preview says so directly: "Previewing a limited number of records." You can toggle **Update Preview Automatically** on or off if large reports make the live preview sluggish while you edit.

## Saving and running

Two buttons matter once the report looks right:

- **Save** stores your changes without leaving the builder.
- **Save & Run** (or **Run**) saves and then executes the report against your full data, replacing the limited preview with real results — including the footer options (row counts, grand totals) covered in Lesson 4.

Give every report a clear, specific name and a folder before saving — Lesson 10 covers folders and sharing in depth, but a report sitting loose without a folder is hard for anyone else on the team to find later.

## Key terms

| Term | Meaning |
|---|---|
| Report Builder | The drag-and-drop editor for assembling a report |
| Fields pane | Lists every field the chosen report type exposes |
| Outline tab | Where groups and columns are assembled |
| Preview pane | A partial, live preview of the report while editing |
| Run | Executes the report against the full data set |
