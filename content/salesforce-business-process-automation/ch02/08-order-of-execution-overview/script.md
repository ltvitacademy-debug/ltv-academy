# Script — Order of Execution Overview

## Segment 1 (title)

Every tool from Chapter 1 participates in one shared sequence every time a record saves. When a validation rule and a flow seem to disagree about what a record should look like, this order is almost always the real explanation. Let's walk it, straight from Salesforce's own Apex Developer Guide.

## Segment 2 (steps: before the save)

Phase one, before anything is actually saved. A before-save flow runs first, then all before-triggers, then system validation runs again along with your custom validation rules, then duplicate rules. Notice validation rules run after before-triggers, not before, so a before-trigger can clean up a value and the validation rule sees the cleaned-up version. That's deliberate.

## Segment 3 (steps: the save itself)

Phase two: the record is saved to the database, but not committed yet. Then all after-triggers run. Then assignment rules and auto-response rules fire, routing the record to an owner or sending an acknowledgment, all before the transaction is final.

## Segment 4 (steps: workflow, flow, and escalation)

Phase three is where most confusion lives. Workflow rules run, and if one does a field update, Salesforce re-saves the record, re-running validation once more, and before and after triggers one more time, but not validation rules or duplicate rules again. Then escalation rules, then Process Builder and workflow-launched flows, in no guaranteed order relative to each other, then after-save flows.

## Segment 5 (steps: rollups, sharing, and commit)

Phase four closes it out. Roll-up summary fields update on the parent, and the parent goes through its own save procedure. Criteria-based sharing gets evaluated. Then, finally, everything commits to the database. Only after that does post-commit logic run: sending email, queueable jobs, future methods.

## Segment 6 (outro)

Twenty steps, one sequence, every save. Next: what happens when two or more of these automations collide, or a save triggers itself, and how recursion actually gets handled inside this order.
