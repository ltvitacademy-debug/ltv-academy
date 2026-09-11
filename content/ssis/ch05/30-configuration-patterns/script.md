# Script — Configuration Patterns

## Segment 1 (title)

A package you build on your machine has one specific server name, one specific connection string, baked in. This lesson is about how that same package runs correctly in dev, test, and production, without you hand-editing it every time you promote it.

## Segment 2 (steps: legacy pattern)

Before the Project Deployment Model existed, SSIS solved this with package configurations — an XML file, a SQL Server table, or an OS environment variable, each mapping a value onto a package property the moment it starts running. If you ever inherit an older package still using the Package Deployment Model, use configurations there, not parameters — parameters simply aren't invoked under that model.

## Segment 3 (steps: current pattern)

Every package in this course targets the Project Deployment Model instead, and that means parameters plus SSISDB environments. Deploy the project, create environments like DEV, TEST, and PROD in the catalog, add the real values as environment variables inside each one, and map your parameters to them through an environment reference. Promoting from TEST to PROD becomes a server-side change — re-point the reference, and nothing about the deployed project itself changes.

## Segment 4 (outro)

That closes out Chapter 5. Next, we move into error handling and logging — event handlers, error outputs, and making sure a failure is something you find out about, not something that just silently happens.
