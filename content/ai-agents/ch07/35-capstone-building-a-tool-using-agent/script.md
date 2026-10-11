# Script — Capstone: Building a Tool-Using Agent With Human Approval

## Segment 1 (title)

Two real tool schemas, following Lesson 6's guidance. get_order, read-only, no approval needed. issue_refund, which refunds to the original payment method and requires human approval before executing — the description itself says so.

## Segment 2 (code: the checkpoint wired onto one tool)

The loop checks the tool name on every tool_use block. Only issue_refund triggers the hold-for-approval path. get_order never touches it at all — Lesson 18's rule of thumb, in code: gate what's consequential, let the read-only lookup move at full speed.

## Segment 3 (steps: the full round trip)

User asks for a refund. Claude calls get_order, runs immediately. Claude calls issue_refund, and that's where the loop stops — your code persists the pending request. A human reviews the order, the amount, the stated reason, and approves. Your code executes the real refund, builds the tool_result, and resumes the loop so Claude can confirm it back to the user.

## Segment 4 (steps: what's not here yet)

On purpose, nothing else yet. No audit logging, no stopping conditions, no cost budget, no scoped credentials. This lesson proves the approval mechanism itself works end to end. Lesson 30 adds every remaining safety layer on top of this same foundation.

## Segment 5 (outro)

The approval mechanism works, start to finish, for both an approval and a rejection. Next: making it safe to actually run unattended — logging, limits, and a sandbox around it.
