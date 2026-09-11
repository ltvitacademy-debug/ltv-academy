# Script — Setting Up a Report Project

## Segment 1 (title)

Time to stop talking about tools and actually open one. Let's create a Report Server Project in SSDT, from the very first menu click to your first report file.

## Segment 2 (screenshot: new-project-dialog)

In Visual Studio, go to File, New, Project, and search for Report Server Project. If you don't see it, you'll need the SSRS extension for Visual Studio installed first — Extensions, Manage Extensions, search for Microsoft Reporting Services Projects. Notice the template just above it: Report Server Project Wizard. That one immediately opens a guided report wizard instead of an empty project — useful for a first look, but we'll use the plain Report Server Project template through this course, since building reports by hand is the skill that actually transfers. Enter a project name, confirm the location, and select Create.

## Segment 3 (screenshot: solution-explorer-add-report)

Once it's created, Solution Explorer organizes your project into three folders — Shared Data Sources, Shared Datasets, and Reports — and every file in all three gets deployed together when you publish the project. To add your first report, right-click Reports, choose Add, New Item, pick the Report template, and name it ending in dot-r-d-l. Report Designer opens it straight into Design view.

## Segment 4 (outro)

Next lesson, we take that project and actually deploy it — setting the properties that tell SSDT which report server to publish to.
