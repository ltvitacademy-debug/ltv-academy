# Script — Capstone Kickoff

## Segment 1 (title)

Three lessons, one project: a support agent that can look up an order and issue a refund. Small enough to finish, real enough that every safety pattern from Chapters 4 and 5 has an actual job to do.

## Segment 2 (code: what done looks like)

Here's the full checklist across all three build lessons. Two real tools with proper schemas. An approval checkpoint on the refund tool. Rejections handled as a real tool_result with is_error. An audit log entry for every call. Stopping conditions, a cost budget, an action-scope limit, and scoped credentials.

## Segment 3 (steps: why small beats sprawling)

Resist the urge to add more tools to look impressive. The point is proving every control is real and wired up — a checkpoint that actually blocks, a log that actually has entries, a budget that actually stops the loop. A five-tool agent with none of that working teaches less than a two-tool agent where it all does.

## Segment 4 (code: mapping chapters to build steps)

Nothing here is new. Chapter 2's tool schemas become the two tool definitions. Chapter 4's approval becomes the checkpoint and rejection handling. Chapter 5 becomes the stopping conditions, budget, sandboxing, and audit log. Lesson 27's monitoring becomes what you'd watch once this actually ran.

## Segment 5 (outro)

The work now is building it, not learning it. Next up: the tools and the approval checkpoint, wired up for real.
