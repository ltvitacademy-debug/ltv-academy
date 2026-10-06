# Script — Naming Conventions and Documentation

## Segment 1 (title)

Flow Builder will happily save a flow called "New Flow" with a Decision element called "Decision." Nothing breaks. But six months later, someone — maybe you — pays for that in time spent figuring out what it does instead of just reading it.

## Segment 2 (code: a naming pattern that scales)

A convention that actually works: Object, dash, Trigger Context, dash, Purpose. Case - Before Save - Priority and Routing. Opportunity - After Save - Account Rollup Update. Lead - Autolaunched - Convert and Assign. Anyone scanning the Flows list can tell what a flow touches and when it fires, without opening a single one.

## Segment 3 (code: element labels, vague vs clear)

That same discipline has to apply inside the flow, not just to its name. Decision versus Check Case Severity. Get Records versus Get Related Account. Update Records versus Update SLA Fields. The clear version costs nothing extra to type, and it turns the canvas itself into documentation — readable top to bottom without opening a single element.

## Segment 4 (steps: what belongs in the Description field)

And every flow needs a Description, not as an afterthought. Three things, minimum: what business problem it solves, who asked for it or why it exists, and anything non-obvious — an edge case, a dependency on another flow or an Apex class. That field is the one thing that survives even after the person who built it has left the org.

## Segment 5 (outro)

Object plus Trigger Context plus Purpose for the flow name, specific labels on every element, and a real Description — none of it changes what the flow does, all of it changes how expensive it is to maintain. Next up: Migrating From Process Builder and Workflow Rules, for moving the automation Salesforce has officially retired.
