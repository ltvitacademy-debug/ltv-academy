# Script — App Builder Case Study

## Segment 1 (title)

This lesson follows a fictional company — Harborline Logistics — through one complete application build. No real company or data, just a worked exercise applying every decision point from this course to one coherent scenario.

## Segment 2 (steps: the request and the data model)

Their request: track truck maintenance, who's doing the repair, and make sure nothing expensive gets approved unchecked. That's three chapters tangled together. Chapter one first: a Vehicle object and a Maintenance Request object, master-detail, because a vehicle has many maintenance events over its life and Harborline wants roll-up totals later. A Technician object relates by lookup instead, since a technician doesn't depend on any one repair.

## Segment 3 (code: UI and logic decisions)

Chapter two: a Dynamic Form hides Cost and Approval fields until status reaches Awaiting Approval, and a compact layout shows current status in the highlights panel. Chapter three: a roll-up summary sums yearly maintenance cost per vehicle. A validation rule blocks marking a request Completed with no cost recorded. And an approval process — entry criteria cost over two thousand — routes to the Fleet Director, because "someone checking it" is literally what an approval process is for: a named human, a visible decision, an audit trail.

## Segment 4 (steps: delivering it)

Chapter four: org-wide default Private, with a sharing rule reaching the Fleet Director role, since plain role hierarchy wouldn't cover dispatchers in a separate branch. A dedicated permission set, assigned to a pilot team first. Built in a developer sandbox, validated against realistic data in a partial copy, promoted with a change set. And an in-app prompt plus a weekly usage report to check whether the new app is actually replacing the old spreadsheet.

## Segment 5 (code: the traceable decisions)

Every single decision here traces back to a specific lesson: master-detail from chapter one, Dynamic Forms from chapter two, roll-up and approval process from chapter three, private OWD and permission sets from chapter four. That traceability — not the specific scenario — is the actual skill this case study is testing.

## Segment 6 (outro)

One ordinary request, four chapters of decisions, fully traced. Next: the capstone — building one complete app from scratch, start to finish.
