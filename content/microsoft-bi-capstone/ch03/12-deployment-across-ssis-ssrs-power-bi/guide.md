# Lesson 12 — Deployment Across SSIS, SSRS & Power BI

**Chapter 3 · Production Practices · Lesson 12 of 25**

## What you'll learn

- How each of the three tools in this pipeline gets deployed to a real
  environment — SSIS via the **project deployment model**, SSRS via
  publishing to a **Report Server**, and Power BI via **Publish** from
  Desktop to the **Power BI Service**
- What actually moves in each case: an `.ispac` file, a published
  `.rdl`, and a `.pbix`
- Why all three follow the same underlying pattern despite completely
  different mechanics

## SSIS: the project deployment model

`WorkOrderETL.dtsx` doesn't deploy on its own. It's part of a project,
and every project you build uses the **project deployment model** —
the default since SQL Server 2012. Building the project produces a
single **project deployment file**, a `.ispac`, containing every
package and parameter in it. The **Integration Services Deployment
Wizard** — launched from SSDT's Project menu, from SSMS by
right-clicking the Projects folder under a catalog, or from the
command line via `isdeploymentwizard.exe` — takes that `.ispac` and
deploys it into the **SSISDB catalog** as one unit.

![The Integration Services Deployment Wizard's Introduction page, listing the five steps: select deployment model, select the project or packages, select the destination, review selections, and deploy.](/courses/microsoft-bi-capstone/ch03/12-deployment-across-ssis-ssrs-power-bi/deployment-wizard.png)
*Same wizard whether you launch it from SSDT or SSMS — five pages, same five steps every time.*

You don't deploy `WorkOrderETL.dtsx` by itself; you deploy the project
it lives in. That's the same convention this capstone's own Lesson 4
followed when the package was first built.

## SSRS: publish to a Report Server

`WorkOrderProductionSummary.rdl` deploys differently. Before you can
run **Deploy Solution** from Visual Studio's Build menu, the report
project's properties need a **TargetServerURL** pointed at the
destination Report Server — the report server's virtual directory,
not the web portal's URL.

![A configuration dialog for a Reporting Services report project's properties, with the TargetServerURL field highlighted.](/courses/microsoft-bi-capstone/ch03/12-deployment-across-ssis-ssrs-power-bi/project-properties-config.png)
*TargetServerURL is the one property you can't deploy without.*

Once that's set, Deploy Solution publishes the `.rdl` straight into
that server's Report Manager — or the newer web portal, depending on
version. Browse there afterward and confirm the folder and report
actually appear; a successful build in Visual Studio doesn't guarantee
the report landed where you expected.

## Power BI: Publish, from Desktop

Power BI's deployment is the most mechanically simple of the three.
With the work order dashboard's `.pbix` open in Power BI Desktop, the
**Publish** button on the Home ribbon uploads the report and its
semantic model to a workspace you choose in the **Power BI Service**.

![Power BI Desktop's Publish button on the Home ribbon.](/courses/microsoft-bi-capstone/ch03/12-deployment-across-ssis-ssrs-power-bi/pbid_publish_publishbutton.png)
*One button — but re-publishing over an existing report can rename fields or trigger an immediate refresh, so it's worth double-checking what you're overwriting.*

Once published, the dashboard reading `dw.FactWorkOrder` lives in the
Service, where it can be shared, secured, and scheduled — the subject
of the next lesson.

## The pattern underneath all three

| Tool | Local artifact | Deployment mechanism | Lands in |
|---|---|---|---|
| SSIS | `.ispac` (built from the project) | Integration Services Deployment Wizard | SSISDB catalog |
| SSRS | `.rdl` | Deploy Solution (after setting TargetServerURL) | Report Server |
| Power BI | `.pbix` | Publish (Power BI Desktop) | Power BI Service workspace |

Different tools, different wizards, same idea every time: build the
finished artifact locally, then deploy that exact artifact to its
destination. Nobody hand-edits the SSISDB catalog, the Report Server,
or the Power BI Service directly — the deployment step is what moves
tested work into production.

## Key terms

| Term | Meaning |
|---|---|
| Project deployment model | Deploying an entire SSIS project (all packages + parameters) as one `.ispac` unit — the modern default since SQL Server 2012 |
| .ispac file | The project deployment file SSIS builds and the Deployment Wizard deploys |
| TargetServerURL | The SSRS report project property naming the destination Report Server; required before Deploy Solution will run |
| Publish (Power BI) | The Power BI Desktop command that uploads a `.pbix`'s report and semantic model to a chosen workspace in the Power BI Service |

## Lab

1. If you haven't already, build `WorkOrderETL`'s project in SSDT and
   confirm the `.ispac` exists under `bin\Development`. Deploy it to a
   folder in SSISDB using the Deployment Wizard from SSMS, and confirm
   it appears under Projects once deployed.
2. Set `TargetServerURL` on the `WorkOrderProductionSummary` report
   project to point at your Report Server instance, then run Deploy
   Solution. Confirm the report appears in Report Manager or the web
   portal.
3. Open the work order dashboard's `.pbix` in Power BI Desktop and
   click Publish. Choose a workspace, then confirm in the Power BI
   Service that both a report and a semantic model with the same name
   now exist there.

## Check yourself

You're ready for Lesson 13 when you can name, for each of the three
tools, the local artifact that gets built, the mechanism that deploys
it, and exactly where it ends up.
