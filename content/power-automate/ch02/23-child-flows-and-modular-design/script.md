# Script — Child Flows and Modular Flow Design

## Segment 1 (title)

Castlebridge Logistics has one routine — create or update a shipment record — that both the warehouse team's flow and the finance team's flow need to run. Instead of building that logic twice, Castlebridge builds it once, as a child flow.

## Segment 2 (steps)

A child flow always starts with the Manually trigger a flow trigger, then you add the inputs it needs — here, a contact name and email. That trigger is what makes the flow eligible to be called by another flow in the first place. After the child flow's own logic runs, it ends with a Respond to a Power App or flow action that sends results back out. Build it once, and any parent flow can call it.

## Segment 3 (screenshot)

Inside the parent flow, Castlebridge adds the Run a Child Flow action from the built-in Flows connector and picks the child flow it just built. Only flows that use the manual trigger and live in the same solution show up in this list.

## Segment 4 (screenshot)

Once the child flow is selected, Power Automate shows the exact inputs that flow expects. Castlebridge fills them in here, the same way it would fill in fields for any built-in action.

## Segment 5 (screenshot)

When the child flow finishes, its response comes back to the parent flow as structured output — in this case, the ID of the record it just created. The parent flow can reference that output in every step after it.

## Segment 6 (outro)

One child flow, reused by warehouse and finance alike, with nothing copied and pasted twice — and if the logic ever needs to change, it only needs to change in one place. Next, you'll see how Castlebridge packages flows like these into a solution before moving them toward production.
