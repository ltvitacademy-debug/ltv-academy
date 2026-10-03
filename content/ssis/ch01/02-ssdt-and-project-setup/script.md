# Script — SSDT & Project Setup

## Segment 1 (title)

Before you can build a single package, you need two things installed
correctly: SQL Server Data Tools, and the Integration Services
extension on top of it. Let's get both set up, and then create your
very first Integration Services project.

## Segment 2 (screenshot: data-workload-2022.png)

Here's the first thing that trips people up: SSDT isn't a separate app
you download anymore. It's a workload you add inside Visual Studio
itself, through the Visual Studio Installer. Open the installer, choose
Modify on your Visual Studio version, and under Workloads you'll find
SQL Server Data Tools tucked under Data storage and processing — that's
the checkbox highlighted here. Check it, and Visual Studio installs the
core database tooling.

## Segment 3 (screenshot: ssis-ssdt-new-project.png)

But that workload alone won't get you Integration Services projects.
Analysis Services, Integration Services, and Reporting Services each
ship as their own separate Visual Studio extension — install the
Integration Services one from Extensions, Manage Extensions, or the
Marketplace. Once that's in place, go to File, New, Project, and you'll
see the Integration Services Project template appear right here under
Business Intelligence.

## Segment 4 (screenshot: target-server-version.png)

Name your project, pick a location, hit OK — and here's what's waiting
for you the instant it's created. Solution Explorer, on the right,
already has your project with a Project.params node, a Connection
Managers folder, and an SSIS Packages folder holding one empty package
— Package.dtsx by default. And on the left, the Project Property Pages
— worth a look now, not later — show TargetServerVersion, the SQL
Server version this project deploys to. Get that wrong and a deployment
can fail for a version mismatch that has nothing to do with your
package logic.

## Segment 5 (outro)

Two installs, one template, one empty package — that's project setup.
Next lesson, we zoom out and look at what's actually running under the
hood every time you open that package: the runtime engine, the data
flow engine, the SSIS service, and the SSISDB catalog.
