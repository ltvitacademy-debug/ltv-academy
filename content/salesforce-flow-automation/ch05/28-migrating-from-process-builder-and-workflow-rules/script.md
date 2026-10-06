# Script — Migrating From Process Builder and Workflow Rules

## Segment 1 (title)

As of the end of 2025, Salesforce no longer supports Workflow Rules or Process Builder. Not shut off — unsupported. This lesson is about moving off them deliberately, using the tool built for exactly that.

## Segment 2 (steps: what end of support actually means)

No more bug fixes, no new features, no guaranteed troubleshooting help — but existing active workflow rules and processes keep running and executing automation exactly as before. The message is move off these on your own timeline, not this breaks on a specific date.

## Segment 3 (code: how Migrate to Flow converts)

In Setup, under Process Automation, Migrate to Flow converts one rule at a time — one Workflow Rule in, one new Flow out. And it's specific about which kind: a rule that only updates fields becomes a before-save flow, meaningfully faster. A rule with a send email, outbound message, or time-dependent action becomes an after-save flow instead, since before-save doesn't support those.

## Segment 4 (steps: why migrated flows start inactive)

The original workflow rule stays active, and the new flow is created inactive — nothing about live automation changes the moment you run the migration. That gives you room to open it in Flow Builder, debug it with sample data, confirm it matches the old behavior. Then one click — switch activations — deactivates the old rule and activates the new flow together, so there's never a gap where both or neither are running.

## Segment 5 (code: the trap — eight rules become eight flows)

Here's the catch. Eight old workflow rules on one object, run through Migrate to Flow, become eight new separate flows — technically modern, but structurally the exact sprawl problem from two lessons back. The tool converts syntax. It doesn't consolidate architecture. That's still your job, after each piece is verified individually.

## Segment 6 (outro)

Migrate, verify each one, switch activations — and then go back to the one-flow-per-object-per-context pattern and fold those newly migrated flows together. Next up: the practice labs — starting with Lead Assignment, a complete flow built from the ground up.
