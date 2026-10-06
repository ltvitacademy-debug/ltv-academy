# Script — Flow Versioning and Deployment

## Segment 1 (title)

Saving a flow doesn't overwrite what was there before. Flow Builder versions everything — which is what makes deploying a change, and recovering from a bad one, something you can do deliberately instead of by accident.

## Segment 2 (screenshot: save as new version)

Every time you save changes to an existing flow, you get this choice: Save As, set to A New Version. Pick it, and Flow Builder creates a new, separately numbered version — the one you started from stays exactly as it was, untouched, still sitting in the flow's history.

## Segment 3 (screenshot: flows list)

Only one version of a flow can be active at a time, though. From the Flows list in Setup, every flow definition has a dropdown — right here — that opens straight to activating or deactivating a specific version, without opening Flow Builder at all.

## Segment 4 (screenshot: versions menu)

Inside Flow Builder itself, the Versions menu off the flow's name shows the complete list for that flow. Version 2, marked Active with a checkmark. Version 1, marked Deactivated, still one click away from being opened again. Activate a different version, and whichever one was active before gets deactivated automatically — never two running at once.

## Segment 5 (outro)

That's really what "deployment" means in practice: build and test a new version, confirm it with Debug and a saved Flow Test, then activate that specific version. And because old versions never disappear, recovering from a bad deployment is just reactivating the last version you know was good — not rebuilding anything from memory. Next up: Flow Orchestration Overview, for coordinating multiple flows and people across a multi-stage process.
