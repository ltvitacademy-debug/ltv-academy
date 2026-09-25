# Script — Migration Sequencing: Parents Before Children

## Segment 1 (title)

Lesson 35 is about order. Salesforce data is relational, and a record that points to a parent can't be loaded until that parent exists. Get the sequence wrong, and the relationships break, or the rows fail.

## Segment 2 (steps: a child needs its parent's id)

The typical order is users first, because every record has an owner. Then Accounts, since most other records point to them. Then Contacts, each linked to an Account. Then Opportunities linked to Accounts, followed by things that link to those, like contact roles and Cases. Parents before children, always.

## Segment 3 (code: the problem)

Here's the problem. A Contact row needs an Account Id, but the Salesforce Id for a new Account is only created when the Account is loaded. Your source system's keys mean nothing to Salesforce by default.

## Segment 4 (steps: link children without knowing parent ids)

The solution is an External Id. Add a custom field to the parent object and mark it as an External Id, something like Legacy Id. When you load the Accounts, store the source system's key in that field. When you load the Contacts, you can reference the parent by that same source key instead of a Salesforce Id.

## Segment 5 (code: in data loader)

In Data Loader, you upsert the Accounts on the External Id field, and map each Contact's parent through the relationship to that field, shown as Account colon Legacy Id. No lookup of new Salesforce Ids is needed. And because upsert updates a record that already exists, it makes a rerun safe: a repeated load updates records instead of creating duplicates. One exception: a self-referencing lookup, like Parent Account, needs a second pass after the accounts exist.

## Segment 6 (outro)

Next up: Post-Migration Validation, where we prove the data arrived complete and correct.
