# Script — Deployment Across SSIS, SSRS & Power BI

## Segment 1 (title)

Every piece of this pipeline works on your machine. None of it does anyone any good until it's deployed somewhere else. Three tools, three different deployment mechanics, one finished pipeline.

## Segment 2 (screenshot: SSIS deployment wizard)

SSIS deploys with the project deployment model. WorkOrderETL.dtsx's whole project builds into a single .ispac file, and the Integration Services Deployment Wizard pushes that .ispac into the SSISDB catalog as one unit — not package by package.

## Segment 3 (screenshot: SSRS project properties)

SSRS deploys differently. Set TargetServerURL in the report project's properties to point at your Report Server, then Deploy Solution. WorkOrderProductionSummary.rdl publishes straight into that server's Report Manager, or the web portal on newer versions.

## Segment 4 (screenshot: Power BI publish button)

Power BI is the simplest of the three, mechanically. Open the .pbix in Power BI Desktop, click Publish, and choose a workspace. The dashboard reading dw.FactWorkOrder pushes straight into the Power BI Service.

## Segment 5 (steps: three deploy targets)

Three different targets, three different tools — the SSISDB catalog, a Report Server, and a Power BI Service workspace — but the same idea every time: build once, deploy the finished artifact, don't hand-edit anything on the destination.

## Segment 6 (outro)

Deployed isn't the same as running on its own. Next lesson, you'll schedule this pipeline so it runs without you touching it.
