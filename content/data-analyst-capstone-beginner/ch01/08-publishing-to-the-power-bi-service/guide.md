# Lesson 8 — Publishing to the Power BI Service

**Chapter 1 · Beginner Capstone: Product Category Performance Snapshot · Lesson 8 of 10**

## What you'll learn

- Publishing a report from Power BI Desktop to the Power BI Service
- Where the report lands, and the difference between the report and its dataset
- Sharing the report with a single stakeholder, the right way for this project's scope

## Desktop is a workbench, not a delivery mechanism

Everything through Lesson 7 happened in Power BI Desktop, which is the right tool for building
— but the Merchandising Manager doesn't have Power BI Desktop open, and shouldn't need it. The
**Power BI Service** (the web-based app at app.powerbi.com) is where a finished report actually
gets handed to a stakeholder. Publishing moves the `.pbix` file's report and data from your
machine into a workspace in the cloud, where it can be opened in a browser — or pulled up on a
laptop in the pricing review itself.

## Publishing the report

From Power BI Desktop:

1. **Home ribbon → Publish**.
2. Choose a destination workspace — for a single stakeholder, a Workspace already shared with
   (or created for) Thornbury's BI team is appropriate; **My Workspace** works for personal
   testing, but isn't shareable with anyone else, so it's the wrong choice for the final
   deliverable.
3. Power BI uploads both the **report** (the visuals and page layout you built in Lessons 5–7)
   and the **dataset** (the model containing `CategoryPerformanceSnapshot` and the three DAX
   measures from Lesson 6) as two related but separate objects in the Service.
4. A confirmation link appears once the upload finishes — click it to open the report directly
   in the browser.

## Report vs. dataset: why the distinction matters

In the Power BI Service, the **dataset** and the **report** are listed separately in the
workspace, even though they came from one `.pbix` file:

- The **dataset** holds the data model — the table, and the measures. It can be refreshed on a
  schedule, and other reports could, in principle, be built on top of it later.
- The **report** holds the pages and visuals a viewer actually sees and interacts with.

For this project, that distinction mostly matters for one practical reason: if the underlying
AdventureWorks2012 data needs a refresh later (say, next quarter, for a new version of this
report), it's the **dataset's** refresh settings that matter, not the report's.

## Sharing with the stakeholder

Once published, there are a few ways to get the report in front of the Merchandising Manager;
for a single named stakeholder with no existing company-wide dashboard, direct sharing is the
right scope — not a public link, and not a full app:

1. Open the report in the Service.
2. **Share** button → enter the stakeholder's work email.
3. Confirm they have at least **Viewer** access to the workspace (or grant access through the
   share dialog directly), so the link actually opens the report rather than an access request
   screen.

A full **Power BI App** (a packaged, published collection of reports) or a company-wide
**workspace** would be over-engineering for a one-stakeholder request — that kind of structure
makes sense once multiple reports and multiple audiences exist, not for a single report headed
into one pricing review.

## Key terms

| Term | Meaning |
|---|---|
| Power BI Service | The web-based app where published reports are opened and shared |
| Dataset (Service) | The data model — the table and the measures — published separately from the report pages |
| Workspace | A shared space in the Service holding related reports and datasets |

## Lab

Publish your report to a workspace (not **My Workspace**), open it in the browser to confirm the
slicer and visuals behave the same as in Desktop, and share it with one test email address using
the **Share** dialog.

## Check yourself

You're ready for Lesson 9 when you can explain the difference between the report and the
dataset in the Power BI Service, and why a direct share — not a full App — fits this project's
scope.
