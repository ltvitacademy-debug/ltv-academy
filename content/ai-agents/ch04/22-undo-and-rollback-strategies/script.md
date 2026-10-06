# Script — Undo & Rollback Strategies

## Segment 1 (title)

Approval doesn't guarantee an action was right — the reviewer can misread it too, or new information shows up five minutes later. Undo and rollback are the safety net for the case the checkpoint didn't catch.

## Segment 2 (code: true reversal)

Three categories, and the first is true reversal — a genuine inverse that restores the prior state. It only works if you captured the before-state before writing the new one. Undo a priority update by writing the captured "before" value back as a new update.

## Segment 3 (steps: compensating action and contain)

The other two. Compensating action — you can't un-send a wire transfer, but you can initiate a reversal transfer; the audit trail has to link the two as one corrected mistake, not two unrelated events. And contain — a sent email or a published post is genuinely permanent. No undo exists, only notify, document, and prevent it next time.

## Segment 4 (code: classify before you wire it up)

The practical move: decide a tool's undo category before it's ever deployed, not after the first incident. Send-email can't undo, only contain. Update a database field, true reversal. Issue a wire transfer, compensating action.

## Segment 5 (outro)

A category-3 tool is the strongest argument for the approval checkpoints from Lesson 19 — the less undoable it is, the harder the system should lean on stopping it before it runs. That's the chapter. Next up: Chapter 5, keeping the agent itself from running away in the first place.
