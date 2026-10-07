# Script — Application Lifecycle Management: Dev/Test/Prod

## Segment 1 (title)

A flow that works perfectly when you build it can still break the moment it's moved somewhere else: a connection that was never set up, a site ID that doesn't exist there. Application Lifecycle Management is the discipline of moving a flow from "it works on my machine" to "it works safely in production," on purpose, every time.

## Segment 2 (steps)

A flow built on its own is stuck in the environment where it was created, there's no supported way to move it. A solution packages that flow, along with its connections and environment variables, into one deployable unit that actually can move between environments. Castlebridge builds its flows inside a solution from day one, specifically so they never need to be rebuilt by hand later.

## Segment 3 (steps)

Castlebridge Logistics uses the standard three-environment pattern. Development is where a maker builds and iterates, and breaking things there is cheap. Test, sometimes called QA, is where the solution gets deployed and validated against realistic data before anyone outside the automation team touches it. Production is where dispatchers run it for real, against real shipments, only after Test has passed.

## Segment 4 (screenshot)

Moving a solution by hand means exporting it, downloading the file, re-creating connections, and importing it again at every single stage. A pipeline in the admin center automates that entire sequence: a maker in Development clicks Deploy, and the pipeline exports, validates against the target environment, and imports the solution automatically, with connections already configured for that stage.

## Segment 5 (code)

A solution in active development is unmanaged, meaning every piece inside it is still editable. Once Castlebridge's team is confident it's ready, the pipeline deploys it to Test and Production as a managed solution, which is locked against direct editing, so nobody in production can quietly edit the live flow and drift it out of sync with development.

## Segment 6 (outro)

That's how a flow moves safely from Dev to Prod without anyone rebuilding it by hand at each stage. Next up, lesson thirty: what to do when a flow that passed Test still fails once it's running for real.
