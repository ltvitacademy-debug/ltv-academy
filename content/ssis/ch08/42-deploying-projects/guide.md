# Lesson 42 — Deploying Projects

**Chapter 8 · Deployment & Administration · Lesson 42 of 49**

## What you'll learn

- The **project deployment model** — why a project, not a package, is
  the unit you deploy
- The three ways to launch the **Integration Services Deployment
  Wizard**: from SSDT, from SSMS, and from the command line
- What each page of the wizard actually does — Select Source, Select
  Destination, Review, and Results
- What a `.ispac` file is, and why it's the thing that actually moves

## The project is the unit of deployment

Every project you've built since Lesson 4 uses the **project deployment
model** — the modern default since SQL Server 2012. Under this model,
an entire project (every package inside it, plus its parameters) is
built into a single **project deployment file** — a `.ispac` file — and
that whole file deploys to the SSISDB catalog as one unit. You don't
deploy packages individually; you deploy the project they live in. (SQL
Server 2016 added *incremental* package deployment on top of this for
updating one package without redeploying the whole project, but the
project is still what the catalog is organized around.)

## Launching the Deployment Wizard

You can start the same wizard three different ways:

- **From SSDT** — with the project open in Visual Studio, open the
  **Project** menu and select **Deploy**.
- **From SSMS** — expand **Integration Services Catalogs → SSISDB**
  in Object Explorer, locate the **Projects** folder, right-click it,
  and select **Deploy Project**.
- **From the command line** — run `isdeploymentwizard.exe` directly,
  found under `%ProgramFiles%\Microsoft SQL Server\<version>\DTS\Binn`.

![The right-click context menu on a Projects folder inside SSISDB in Object Explorer, with Deploy Project highlighted just below Import Packages.](/courses/ssis/ch08/42-deploying-projects/deploy-project-menu.png)
*Deploying straight from SSMS — no need to reopen the project in SSDT.*

## Walking through the wizard

Whichever way you launch it, the wizard walks the same five steps:

![The Integration Services Deployment Wizard's Introduction page, listing the five steps: select deployment model, select the project or packages, select the destination, review selections, and deploy.](/courses/ssis/ch08/42-deploying-projects/deployment-wizard.png)
*The Introduction page lays out exactly what the next four pages will ask for.*

1. **Introduction** — a summary of the five steps ahead. Check
   **Do not show this page again** once you've seen it a few times.
2. **Select Source** — choose **Project deployment file** and point to
   the `.ispac` you built, or choose **Integration Services catalog**
   to redeploy a project that's already sitting in SSISDB somewhere
   else.
3. **Select Destination** — enter the target SQL Server instance name,
   then **Browse** to pick (or create) the destination folder and
   project path inside SSISDB.
4. **Review** — a summary of every selection you made. Click any step
   in the left-hand pane to jump back and change it, or click
   **Deploy** to proceed.
5. **Results** — success or failure for each individual action taken
   during deployment. If anything failed, click **Failed** in the
   **Result** column to see exactly why, and optionally **Save
   Report...** to keep an XML copy.

Redeploying a project with the same name to the same folder doesn't
overwrite history — by default SSISDB keeps the previous version too,
governed by the **Maximum Number of Versions per Project** catalog
property from Lesson 41.

## Key terms

| Term | Meaning |
|---|---|
| Project deployment model | Deploying an entire project (all packages + parameters) as one unit, the modern default since SQL Server 2012 |
| .ispac file | The project deployment file — a self-contained build output of an Integration Services project |
| Integration Services Deployment Wizard | The tool (launched from SSDT, SSMS, or the command line) that deploys a project to the SSISDB catalog |
| Select Source / Select Destination | The wizard pages where you pick what to deploy and where it lands in the catalog |
| Review / Results | The wizard's final pages — confirm selections, then see the success/failure of each deployment action |

## Lab

1. In the folder you created at the end of Lesson 41, deploy any project
   from an earlier chapter using the wizard from SSMS: right-click
   **Projects** under your folder and select **Deploy Project**.
2. Walk through Select Source (choose the `.ispac` from your project's
   `bin\Development` folder), Select Destination (browse to your
   folder), and Review, then click **Deploy**.
3. On the **Results** page, confirm every action succeeded. Then expand
   **Projects** in Object Explorer and confirm your project now appears
   there, deployed.

## Check yourself

You're ready for Lesson 43 when you can explain, without looking: why a
project — not an individual package — is the unit you deploy, and what
the five pages of the Deployment Wizard each do.
