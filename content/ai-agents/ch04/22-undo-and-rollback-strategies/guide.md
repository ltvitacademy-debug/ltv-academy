# Lesson 22 — Undo & Rollback Strategies

**Chapter 4 · Human-in-the-Loop & Approval · Lesson 22 of 32**

## What you'll learn

- Why approval alone doesn't guarantee an action was actually right
- Three undo strategies, from true reversal to compensating action to "can't undo, only contain"
- How to classify a tool by its undo strategy before you ever wire it up
- Why the audit log from Lesson 21 is what makes rollback possible at all

## Approval catches bad decisions, not bad outcomes

Lesson 18 through 21 built a pipeline to stop a wrong action before it
happens. But a human approving a request doesn't make the request correct —
the reviewer can misread the situation too, new information can surface
five minutes later, or the action can have a side effect nobody anticipated.
Undo and rollback are the safety net for the case the checkpoint didn't
catch: the action already ran, and now it needs to be reversed.

Not every action reverses the same way. Sorting tools into one of three
categories, before they're ever wired into the agent, determines what
"fixing it" even looks like.

## Category 1: True reversal

Some actions have an exact inverse that restores the prior state completely.
Updating a database field has a true reversal if you capture the *previous*
value before writing the new one:

```
// Before the update, capture what it's replacing
undo_record = {
  "tool": "update_ticket_priority",
  "before": {"priority": "normal"},
  "after": {"priority": "urgent"}
}
// Undo = apply "before" as a new update
```

True reversal is the gold standard, but it only works when the system you're
writing to actually lets you read the prior state back, and fast enough that
nothing else changed it in between.

## Category 2: Compensating action

Some actions can't be un-done, only offset by a second, different action
that cancels out the effect. You can't un-send a wire transfer — but you can
initiate a reversal transfer, if the receiving side allows it. Refunding a
charge doesn't erase the original charge; it's a second transaction that
nets to the same balance. The audit trail has to show both the original
action and the compensating one as linked, or the history looks like two
unrelated events instead of one corrected mistake.

## Category 3: Can't undo — only contain

Some actions are genuinely permanent: a sent email, a published post, a
message delivered to another system you don't control. For these, there is
no undo strategy — there's only damage control: notify affected people
immediately, document exactly what happened (the audit log earns its keep
here), and treat prevention (a stronger approval checkpoint on this exact
tool) as the real fix going forward, not a rollback feature that doesn't
exist.

## Classify before you wire up the tool

The practical takeaway: when you add a new tool an agent can call, decide
its undo category *before* deployment, not after the first incident.

```
send_email         -> cannot undo, only contain
update_db_field     -> true reversal (capture before-state)
issue_wire_transfer -> compensating action (reversal transfer)
```

A tool in category 3 is also the strongest argument for the approval
checkpoints from Lesson 19 — the less undoable an action is, the more the
system should lean on stopping it before it runs, not fixing it after.

## Key terms

| Term | Meaning |
|---|---|
| True reversal | Restoring the exact prior state, usually by capturing it before the change |
| Compensating action | A second action that offsets an irreversible one without erasing the original |
| Contain | The response when an action truly can't be undone: notify, document, prevent recurrence |
| Undo category | A tool's classification (reversal / compensating / contain), decided before deployment |

## Check yourself

A `post_to_company_slack` tool and a `update_inventory_count` tool are both
being added to an agent. Classify each into one of the three undo
categories, and explain what "fixing a mistake" looks like for each.
