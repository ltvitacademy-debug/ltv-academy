# Record Types and Business Processes

**Chapter 3 · Objects and Layouts · Lesson 20 of 36**

Picklist values, business processes, and page layouts all set on the same object can still
differ sharply from one kind of record to the next — a "Question" case has nothing to do with a
"Problem" case's root-cause workflow. **Record types** are how Salesforce lets one object offer
genuinely different picklist values, processes, and layouts depending on what kind of record
it is.

## What you'll learn

- What a record type actually controls
- What a business process (support process, sales process, lead process) is, and how it ties to
  record types
- Where record types live in Object Manager
- Who sees which record type, and how that's controlled by profile

## Business processes: the prerequisite

For Case, Lead, and Opportunity specifically, record types have an extra requirement: each needs
an associated **process**. A process is a named, restricted subset of a key picklist's values —
a Support Process restricts Case's Status values, a Sales Process restricts Opportunity's Stage
values, a Lead Process restricts Lead's Status values. You define these processes before you can
assign them to a record type.

![A "Support Processes" setup page listing processes for an org: Other, Problem, Question, Suggestion — each with a description, an Active checkmark, and Modified By details, plus a New button.](/courses/salesforce-administration/ch03/20-record-types-and-business-processes/support-processes-list.png)
*Four support processes here, each restricting Case Status to a different relevant subset of values before any record type is even created.*

## Creating a record type

From Object Manager, select an object, then **Record Types**, then **New**. The wizard asks for
an existing record type to clone picklist values from, a label and name for the new record type,
and — for Case, Lead, and Opportunity — which process it uses.

![Step 1 of the New Record Type wizard for Case: Existing Record Type set to "--Master--," Record Type Label "Problem," Record Type Name "Problem," a Support Process dropdown set to "Problem," and a Description "For Issues/Bugs."](/courses/salesforce-administration/ch03/20-record-types-and-business-processes/new-record-type-wizard.png)
*The Support Process dropdown is exactly where that earlier process definition gets attached to this new record type.*

## Where record types live once created

Like page layouts, every record type created for an object shows up in a single list under
Object Manager, with each entry's active status and who last modified it.

![Object Manager's "Record Types" list for Case, showing 4 Items: Other, Problem, Question, and Suggestion, each with a description, an Active checkmark, and Modified By.](/courses/salesforce-administration/ch03/20-record-types-and-business-processes/record-types-list.png)
*This list, and the Support Processes list above it, are companion screens — a record type here references a process from there.*

## What a record type actually bundles together

Put together, a single record type controls:

- Which values of a picklist are available (full detail in Lesson 21)
- Which page layout a user with a given profile sees for this record type (Lesson 18's
  assignment screen, keyed partly by record type)
- Which business process (for Case/Lead/Opportunity) governs the record's key status field
- Which profiles can even create a record of this type at all

## Key terms

| Term | Meaning |
|---|---|
| Record type | A named subset of picklist values, process, and page layout assignment for one kind of record |
| Business process (support/sales/lead) | A restricted, named subset of a key picklist's values, required for Case/Opportunity/Lead record types |
| Record Types list | The Object Manager screen listing every record type defined for an object |
| Process list | The Object Manager screen (Support Processes, Sales Processes, Lead Processes) listing defined processes |

## Check yourself

Why do Case, Lead, and Opportunity record types each require an associated process, when most
other objects' record types don't need one at all?
