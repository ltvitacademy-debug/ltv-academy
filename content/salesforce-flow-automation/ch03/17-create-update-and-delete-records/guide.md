# Lesson 17 — Create, Update and Delete Records

**Chapter 3 · Flow Logic · Lesson 17 of 31**

## What you'll learn

- The Create Records element, and the two ways to set field values
- The Update Records element's four "How to Find Records" methods — and why a before-save flow only gets one of them
- The Delete Records element, and why it deserves more caution than the other two
- How all three fit the same shape: find or build a record, then write it

## Create Records: building something new

The **Create Records** element writes a brand-new record for any object you can see in Object Manager — standard, custom, even most API-only objects. Here's one creating a follow-up task on a new Account:

![The Create Records configuration panel: Label "Create Follow-Up", Description "Create a task named Follow-Up Discovery Call, assigned to the account's owner", How to set record field values set to Manually, Object set to Task.](/courses/salesforce-flow-automation/ch03/17-create-update-and-delete-records/create-records-panel.png)

**How to set record field values** has two options: **Manually**, where you set each field one at a time from any source (shown above), or using a record variable that already holds the values you want — useful when you've already assembled the data elsewhere in the flow, such as from a Transform element.

## Update Records: four ways to find what to change

The **Update Records** element offers four methods under **How to Find Records to Update and Set Their Values**:

- Use the record that triggered the flow
- Update records related to the triggering record
- Use the IDs and all field values from a record or record collection
- Specify conditions to identify records, and set fields individually

Here's a real one, on a **before-save** record-triggered flow — notice only the first option is actually selectable:

![The Update Records configuration panel: Label "Set Contact Phone", How to Find Records to Update and Set Their Values showing "Use the contact record that triggered the flow" selected (the other three options visible but effectively unavailable), a note explaining this flow runs before save, and Set Field Values mapping Business Phone to Triggering Contact > Account ID > Account Phone.](/courses/salesforce-flow-automation/ch03/17-create-update-and-delete-records/update-records-panel.png)

The panel explains why: *"Because this flow runs before a record is saved, you can only update the record that triggered the flow to run. To update other records, configure the trigger to run the flow after the record is saved."* A before-save flow is still mid-transaction — there's no saved record yet to look up elsewhere, only the one already in memory. Switch the flow to run after the record is saved, and the other three methods — including updating *related* records, or records matched by filter conditions — open up.

## Delete Records: the one that deserves extra caution

The **Delete Records** element works like Create and Update — specify conditions, pick the object, apply filters to identify exactly which records go:

![The Delete Records configuration panel: How to Find Records to Delete showing "Specify conditions" selected, Object set to Account, and Filter Account Records with Condition Requirements All Conditions Are Met (AND), Field Account ID Equals accountID.](/courses/salesforce-flow-automation/ch03/17-create-update-and-delete-records/delete-records-panel.png)

Of the three, Delete Records is the one that deserves the most caution before you activate a flow built on it: test thoroughly in a sandbox first, and reserve it for records that genuinely should never have existed — not as a routine cleanup mechanism.

## The shared shape

All three elements follow the same underlying pattern: **find or build the record(s)**, then **set the field values** (Create, Update) or **confirm which ones to remove** (Delete). The differences are in how each one locates its target — Create always makes something new, Update needs to find an existing record first, and Delete needs the most certainty of all three before it runs.

## Key terms

| Term | Meaning |
|---|---|
| How to set record field values | Create Records' choice: Manually, or from an existing record variable |
| How to Find Records to Update | Update Records' four lookup methods — fewer are available on before-save flows |
| Specify conditions | A filter-based way to identify records for Update or Delete, instead of using a specific variable |

## Check yourself

A record-triggered flow runs **before save** on the Opportunity object. Which Update Records "How to Find Records" option(s) are actually usable, and what would you need to change about the flow's trigger to unlock the others?
