# Standard vs. Custom Fields

**Chapter 2 · Fields · Lesson 15 of 23**

Every field this chapter has shown so far — picklists, formulas, roll-up summaries — could be
either standard (Salesforce built it in) or custom (an admin built it). This lesson closes out the
Fields chapter by naming the actual, structural differences, since day-to-day they behave almost
identically.

## What you'll learn

- Where standard and custom fields sit side by side, and how to tell them apart in that list
- What you actually can and can't change about a standard field
- Why a brand-new custom field offers the full Data Type menu, and a standard field never does

## Side by side, same list

Every object's Fields & Relationships list mixes standard and custom fields together, sorted
however you choose — there's no separate tab for "custom only." Account Name and Account Number
below are standard; scroll further down the same list and custom fields appear with no visual
separation at all.

![The Account object's Fields & Relationships list — Account Name and Account Number, both standard fields, sitting in the same table custom fields will later join.](/courses/salesforce-data-model-fundamentals/ch02/15-standard-vs-custom-fields/object-manager-fields-list.png)

## What you actually can't change about a standard field

A standard field's **data type is fixed** — you can't turn the Lead object's standard Email field
into a Picklist. What you *can* change is more limited than it looks at first: the field's
**label** (the text users see) is editable through Rename Tabs and Labels, even though its
underlying **API name** never changes.

![Rename Tabs and Labels, with the standard Rating field's label changed to "Prospect Rating" while the field itself stays exactly the same underneath.](/courses/salesforce-data-model-fundamentals/ch02/15-standard-vs-custom-fields/rename-standard-field-label.png)

That's the whole story for most standard fields: relabel freely, but the type, the API name, and
the field's core behavior are Salesforce's to define, not yours.

## A brand-new custom field starts with a blank slate

Compare that to creating a custom field: Step 1 of the New Custom Field wizard offers the *entire*
Data Type menu — every family covered across this chapter — because nothing about a not-yet-created
field is locked in yet.

![Step 1 of the New Custom Field wizard, offering the full Data Type menu — Auto Number through Date/Time — for a field that doesn't exist yet.](/courses/salesforce-data-model-fundamentals/ch02/15-standard-vs-custom-fields/new-field-data-types.png)

## The structural differences that do exist

| | Standard field | Custom field |
|---|---|---|
| Data type | Fixed by Salesforce | Chosen once at creation |
| Label | Editable (Rename Tabs and Labels) | Editable |
| API name | Fixed, no `__c` suffix | Always ends in `__c` |
| Deletable | Almost never | Yes |

## Key terms

| Term | Meaning |
|---|---|
| Standard field | A field Salesforce ships built into an object, with a fixed data type |
| Custom field | A field an admin creates, with a data type chosen at creation and an API name ending in `__c` |
| API name | The underlying, code-facing name of a field — distinct from its user-facing label |
| Rename Tabs and Labels | The Setup tool for changing a standard field or tab's displayed label |

## Check yourself

Looking only at an object's Fields & Relationships list, with no indicator column shown, what's one
reliable way to tell a custom field apart from a standard one just by its API name?
