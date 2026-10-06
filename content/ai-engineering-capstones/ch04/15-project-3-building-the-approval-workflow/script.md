# Script — Building the Approval Workflow

## Segment 1 (title)

The checkpoint has to sit before the tool runs, not after. Once issue_refund executes, approval is theater. When Claude's response contains a tool_use for a tool flagged requires_approval, your code's job is to stop, record the pending request, and not call the real function until a human responds.

## Segment 2 (code: the dispatcher)

A real dispatcher checks the risk table from Lesson 14. If the tool requires approval, it creates a pending record, notifies a reviewer, and returns -- nothing executes yet. Only a tool with no approval requirement runs immediately.

## Segment 3 (code: a rejection is still a real result)

This is the detail that's easy to miss: you can't just drop a rejected call. The Messages API expects a tool_result for every tool_use it sent before the conversation continues. A rejection is a valid result, sent with is_error true and an instructive message -- not a bare "denied," but what was wrong and what to try next, so Claude can actually act on it instead of stalling.

## Segment 4 (steps: the full flow)

The full flow: Claude returns a tool_use for the sensitive tool. Your dispatcher creates a pending record instead of executing. A reviewer approves or rejects it. Approved runs the real tool and sends its real result; rejected sends an is_error result explaining why. Either way, Claude's next response reflects what actually happened.

## Segment 5 (outro)

With a real pause-before-execute checkpoint working for both outcomes, Lesson 16 adds the two things production needs around it: input validation and an audit log of every decision.
