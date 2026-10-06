**Chapter 2 · Flow Types · Lesson 7 of 31**

# Record-Triggered Flows: After Save

Lesson 6 covered before-save — fast, but limited to updating the triggering record's own fields.
This lesson covers **after-save**, the more flexible record-triggered option, chosen by selecting
**Actions and Related Records** on the same Configure Start panel.

## What you'll learn

- What "after-save" (Actions and Related Records) unlocks that before-save can't do
- How to create a related record from an after-save flow
- How to debug a record-triggered flow before activating it
- When the extra flexibility of after-save is worth its slower cost

## Actions and Related Records: the after-save option

Back on the same Configure Start panel from Lesson 6, choosing **Actions and Related Records**
instead of Fast Field Updates changes what the flow is allowed to do:

![The Optimize Flow section, with Actions and Related Records selected instead of Fast Field Updates.](/courses/salesforce-flow-automation/ch02/07-record-triggered-flows-after-save/start-element-config-panel.png)

This flow runs **after** the triggering record is already saved to the database, and in exchange
it can update *any* record (not just the one that triggered it), create new records, and run
Actions — send an email, post to Chatter, call Apex, submit an approval. Everything before-save
couldn't do, after-save can.

## Creating a related record

A common after-save pattern: when an Opportunity is marked Closed Won above a certain value,
create a related Contract record. That uses the Create Records data element from Lesson 3,
configured with values pulled from the triggering Opportunity:

![The New Create Records screen, configured to create a new record from manually set field values.](/courses/salesforce-flow-automation/ch02/07-record-triggered-flows-after-save/new-create-records-screen.png)

Because the flow is already running after-save, there's no restriction on which object this new
record belongs to — Contract, Task, Case, anything the org allows.

## Debug before you activate

Before activating any record-triggered flow, Salesforce's own best practice is to **Debug** it
first — run it against a real record you choose, without touching live automation:

![The Debug flow screen, with options for selecting a path, debug options, and whether to run the flow as if the record was created or updated.](/courses/salesforce-flow-automation/ch02/07-record-triggered-flows-after-save/debug-flow-options.png)

![The Debug results screen, showing the flow diagram alongside debugging details and a Completed status.](/courses/salesforce-flow-automation/ch02/07-record-triggered-flows-after-save/debug-flow-result.png)

Debug runs the flow's logic step by step against the record you pick, so you can catch a wrong
condition or a missing field mapping before any real user ever triggers it live.

## Before-save or after-save?

A practical rule: if the flow only touches fields on the record that triggered it, use before-save
for the speed. The moment the flow needs to touch a different record, create something new, or run
an Action, it has to be after-save — there's no way around that restriction.

## Key terms

| Term | Meaning |
|---|---|
| After-save (Actions and Related Records) | Runs after the record saves; can update other records, create records, run Actions |
| Debug | Runs a flow against a chosen record so you can verify behavior before activating |
| Create Records | The data element used to create a new, related record from an after-save flow |

## Check yourself

Why can't a before-save flow create the related Contract record described in this lesson, even if
it has all the field values it needs?
