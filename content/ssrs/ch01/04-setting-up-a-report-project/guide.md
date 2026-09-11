# Lesson 4 — Setting Up a Report Project

**Chapter 1 · SSRS Fundamentals · Lesson 4 of 40**

## What you'll learn

- How to start a Report Server Project in SSDT, step by step
- The difference between the two report project templates
- What a new project's Solution Explorer structure actually contains
- How to add your first report (.rdl) file to that project

## Before you start: the SSRS extension

SSDT itself doesn't include Reporting Services project templates out
of the box — you need the SSRS extension for Visual Studio installed
first. If **Report Server Project** doesn't show up in your template
list, go to **Extensions > Manage Extensions**, search for "Microsoft
Reporting Services Projects," and install it (in some Visual Studio
versions, you'll instead add the **SQL Server Data Tools** workload
from **Tools > Get Tools and Features**).

## Starting the project

In Visual Studio, go to **File > New > Project**. In the **Create a
new project** dialog, search for or select **Report Server Project**.

![The Create a new project dialog in Visual Studio, with the Report Server Project template highlighted.](/courses/ssrs/ch01/04-setting-up-a-report-project/new-project-dialog.png)
*Report Server Project — an empty project, ready for reports and shared data sources.*

Notice the template right above it: **Report Server Project Wizard**.
That's a different starting point — instead of an empty project, it
automatically creates the project *and* immediately opens a
step-by-step Report Wizard that walks you through building your first
report (connection string, query, table or matrix layout, style,
publish). For this course, you'll mostly use the plain **Report
Server Project** template and build reports by hand, since that's the
skill that actually transfers to real work.

Enter a **Project name**, confirm the **Location**, and select
**Create**. SSDT creates a folder for the project (and, if this is
your first project, a solution file too) and opens Solution Explorer.

## What Solution Explorer actually gives you

A fresh Report Server Project isn't just an empty folder — Solution
Explorer organizes it into purpose-built folders:

- **Shared Data Sources** — connection definitions you can reuse
  across multiple reports in this project
- **Shared Datasets** — reusable queries built on those data sources
- **Reports** — where your individual .rdl report files live

Every file inside this project gets published to the report server
together when you deploy the project — which is exactly the point of
working project-first instead of file-first.

## Adding your first report

Right-click the **Reports** folder, then choose **Add > New Item**.

![Solution Explorer with the Reports folder's shortcut menu open, showing Add New Report and Add highlighted.](/courses/ssrs/ch01/04-setting-up-a-report-project/solution-explorer-add-report.png)
*Right-click Reports > Add > New Item — this is how every report in this course starts.*

In the **Add New Item** dialog, select the **Report** template, give
it a name ending in `.rdl` (for example, `Sales Orders.rdl`), and
select **Add**. Report Designer opens the new file directly in
**Design** view, ready for you to drag in data sources, datasets, and
report items — which is exactly where Chapter 2 picks up.

## Key terms

| Term | Meaning |
|---|---|
| Report Server Project | An empty SSDT project template for reports, shared data sources, and datasets |
| Report Server Project Wizard | A template that creates the project and immediately opens a guided report wizard |
| Solution Explorer | The Visual Studio pane listing every file in your project, grouped by folder |
| .sln | The Visual Studio solution file that can contain one or more projects |
| .rdl | The report definition file created when you add a new Report item |

## Lab

1. In SSDT, create a new **Report Server Project** and name it
   something you'll recognize later, like `SSRSCourse`.
2. Confirm Solution Explorer shows the three folders: **Shared Data
   Sources**, **Shared Datasets**, **Reports**.
3. Right-click **Reports**, add a new Report item, and name it
   `Lesson4Practice.rdl`. Confirm it opens in Design view.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what
are the two Report Server project templates and how are they
different, and what three folders does a fresh project's Solution
Explorer organize your files into?
