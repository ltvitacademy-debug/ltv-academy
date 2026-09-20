# Script — Managing Schema Drift

## Segment 1 (title)

Source control, deployment tooling, and documentation all assume source control actually describes what's running in production. That assumption breaks — it's called schema drift.

## Segment 2 (code: What drift is)

Schema drift is the gap between what source control says the schema should be and what's actually live. It happens mundanely — an index added directly in production during an incident, a hotfix applied by hand that never gets backported to the project.

## Segment 3 (steps: Detecting and preventing it)

Drift is quiet until a deployment surfaces it and fails, or worse, silently undoes a production fix. The fix is a recurring schema-compare step against a live snapshot — and closing the process gap that let an out-of-process change happen in the first place.

## Segment 4 (outro)

Even with drift under control, a bad deployment will eventually still happen. Next up: rolling back a bad deployment.
