# Lesson 88 — Publishing Workbooks, Data Sources & Dashboards

**Chapter 15 · Tableau Server, Cloud & Public · Lesson 88 of 95**

## What you'll learn

- The actual step-by-step publish workflow from Tableau Desktop
- The difference between publishing a workbook and publishing a
  standalone data source
- Why "Allow refresh access" and "Embed password" are two very
  different decisions
- What actually happens to a workbook's dashboards when you publish

## Publishing a workbook, step by step

Publishing works the same way whether the destination is Tableau
Cloud or Tableau Server (Lesson 87 covered which one you'd be
publishing to). With a workbook open in Tableau Desktop:

1. Click the **Share** button in the toolbar (or **Server > Publish
   Workbook**). If you're not already signed in, Tableau prompts you
   for the server or Cloud pod URL.
2. Choose the **project** to publish into — projects are how content
   gets organized and permissioned on the server, similar to folders.
3. Name the workbook — publishing under an existing name overwrites
   that workbook; a new name creates a new one.
4. For each embedded data source, choose an **Authentication**
   option.
5. Click **Publish**.

Step 4 is the one worth slowing down on:

![The Manage Data Sources step of the publish dialog, showing a data source with Publish Type set to 'Embedded in workbook' and Authentication set to 'Allow refresh access'.](/courses/tableau/ch15/88-publishing-workbooks-data-sources-dashboards/publish-manage-datasources.png)
*The authentication choice you make here determines whether the server can refresh this data on its own.*
Source: [Tableau Help — Publish Workbooks to Tableau Server or Tableau Cloud](https://help.tableau.com/current/pro/desktop/en-us/publish_workbooks_share.htm)

- **Allow refresh access** — the server refreshes the connection using
  credentials the *server administrator* has configured, without those
  credentials ever being stored inside the workbook itself. This is
  the option almost every real production workbook should use.
- **Embed password** — your own credentials get saved directly into
  the published workbook so it can connect without asking again. It's
  convenient, but it means anyone who can open that workbook's
  connection details effectively has your credentials. Treat it as a
  personal/practice-only shortcut, not a production pattern.

## Publishing a workbook vs. publishing a data source

Everything above describes publishing a **workbook** — the sheets,
dashboards, and (usually) a data connection, all bundled together.
Tableau also lets you publish a **data source** by itself, with no
worksheets attached, as its own object on the server. That matters for
one specific reason: once a data source is published on its own, *any
number of separate workbooks* can connect to that one published data
source instead of each workbook embedding its own copy. One
refresh schedule, one set of field renames and calculated fields,
reused everywhere — instead of five workbooks silently drifting out of
sync with five separate embedded copies of "the same" data. This is
exactly the kind of governance a real BI team relies on once more than
one person is building against the same dataset.

## What happens to dashboards when you publish

A dashboard is not published separately from its workbook — it travels
with it. When you publish a workbook, every sheet and dashboard inside
it goes to the server together, and the publish dialog gives you a
**Select Sheets** option to choose which of them should actually be
visible to viewers (you can keep supporting worksheets hidden from the
published view while a dashboard that uses them stays visible). This
is also where you decide whether sheets show as tabs across the top of
the published view, matching how you may have things get organized in
Desktop.

## Key terms

| Term | Meaning |
|---|---|
| Project | A server-side container for organizing and permissioning published content |
| Allow refresh access | An authentication mode where the server refreshes data using admin-configured credentials, without embedding yours |
| Embed password | An authentication mode that stores your own credentials directly in the published workbook |
| Published data source | A data source published on its own, so multiple workbooks can connect to one governed, reusable copy |

## Lab

1. If you have access to Tableau Cloud, Tableau Server, or even
   Tableau Public, publish one workbook from earlier in this course.
   Walk through every step above deliberately, and note which
   authentication option Tableau offered for your specific connection
   type.
2. Write two sentences: one explaining why "Allow refresh access" is
   the safer production choice, and one explaining a real scenario
   where publishing a data source separately (instead of embedding it
   in every workbook) would prevent a real problem.

## Check yourself

You're ready for Lesson 89 when you can explain the difference between
"Allow refresh access" and "Embed password" without looking it up, and
describe in one sentence why a team would choose to publish a data
source on its own rather than embedding it in every workbook that uses
it.
