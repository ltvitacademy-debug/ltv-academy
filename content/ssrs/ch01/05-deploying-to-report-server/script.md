# Script — Deploying to Report Server

## Segment 1 (title)

You've got a project and a report file. Now let's actually get it onto a report server — starting with the one property that has to be right before anything else works.

## Segment 2 (screenshot: project-properties-config)

Right-click your project in Solution Explorer and select Properties. Every deployment setting is scoped to a configuration — SSDT gives you three by default: DebugLocal for local preview only, Debug for a test server, and Release for production, switchable from the Configuration dropdown at the top. But the property that actually gates everything is TargetServerURL, highlighted here — it has to point at a real report server before SSDT will deploy anything at all. And it's genuinely not the web portal's URL: the portal is the human-facing slash-reports address, while TargetServerURL wants the machine-facing slash-reportserver virtual directory. Point it at the wrong one and deployment just fails.

## Segment 3 (steps: deploy workflow)

Once TargetServerURL is set, the workflow is simple: set that property, then go to the Build menu and choose Deploy Solution — or right-click the project itself and pick the same command. That publishes every report and every shared data source in the project together. Then browse to the web portal and confirm your folder and report actually showed up. If a report depends on a shared data source that isn't already on the server, deploy that data source too, or the published report won't have anything to connect to.

## Segment 4 (outro)

That closes out Chapter 1's fundamentals. Chapter 2 is where we actually start building — datasets, data sources, and the report design surface itself.
