# Deleting and Mass Transferring Records

**Chapter 2 · Getting Data Out and Keeping It Safe · Lesson 10 of 20**

Not every bulk operation is about getting data in or out — sometimes the job is cleaning up or reorganizing what's already there. Salesforce has two purpose-built Setup tools for exactly this: **Mass Delete Records** for removing records in bulk, and **Mass Transfer Records** for reassigning ownership in bulk. Both live in Setup, both work entirely through the browser, and both are easy to reach for the wrong reasons if you don't understand what they actually touch.

## What you'll learn

- Where Mass Delete and Mass Transfer live, and the criteria-based flow they share
- What "permanently delete" actually changes about a mass delete
- How Mass Transfer reassigns more than just the record you select
- Why both tools recommend a backup before you run them

## Mass Delete Records

![Setup's Mass Delete Records page for Leads, showing Step 1 (what will happen), Step 2 (a recommendation to export data first), and Step 3 (a criteria builder with AND filters), plus a "Permanently delete" checkbox and a results table.](/courses/salesforce-data-management/ch02/10-deleting-and-mass-transferring-records/mass-delete-records-setup.png)

From Setup, search **Mass Delete Records**, then pick a record type — Accounts, Contacts, Leads, Activities, Products, and several others each have their own link. The page walks you through three steps: a plain-language explanation of what gets deleted (including related data, like all Activities tied to the Leads you're deleting), a strong recommendation to export your data first — the same Lesson 7 export, not a separate tool — and a criteria builder where you filter down to exactly the records you mean to delete.

![The same Mass Delete Records page scrolled to show the criteria results, the "Permanently delete" checkbox checked, and a list of matched Task records ready to delete.](/courses/salesforce-data-management/ch02/10-deleting-and-mass-transferring-records/mass-delete-criteria-and-results.png)

Run your search, review the matched records in the results table, and select the ones you actually want gone — the criteria builder narrows the candidate list, but you still choose which rows to act on. The one checkbox that changes everything here is **Permanently delete the selected records**. Leave it unchecked, and deleted records land in the Recycle Bin like any normal delete (Lesson 11 covers recovering them from there). Check it, and those records skip the Recycle Bin entirely — unrecoverable, immediately. That's exactly why the page recommends an export first: a mass delete you can't undo deserves a backup you can restore from.

## Mass Transfer Records

![Setup's Mass Transfer Records landing page, listing dozens of "Transfer X — Transfer multiple Y from one user to another" links, including Transfer Accounts, Transfer Leads, and many others.](/courses/salesforce-data-management/ch02/10-deleting-and-mass-transferring-records/mass-transfer-records-list.png)

From Setup, search **Mass Transfer Records**. Unlike Mass Delete's shorter object list, Mass Transfer covers a long list of record types — Accounts, Leads, cases, quotes, and plenty more — each its own link that opens a dedicated transfer screen.

![The Mass Transfer Accounts screen: Transfer from / Transfer to user fields, checkboxes for transferring open and closed opportunities and cases, and a criteria builder for finding accounts to transfer.](/courses/salesforce-data-management/ch02/10-deleting-and-mass-transferring-records/mass-transfer-accounts-form.png)

Pick the current owner (**Transfer from**) and the new owner (**Transfer to**), then use the same kind of criteria builder as Mass Delete to find the records to move. The checkboxes above the criteria — like **Transfer open opportunities not owned by the existing account owner** — matter more than they look: transferring an Account doesn't automatically bring every related record with it. You decide, per transfer, whether open opportunities, closed opportunities, open cases, and closed cases tied to that Account go along with it or stay put.

## Why both tools ask you to think before you act

Both screens share a philosophy: narrow with criteria, review the actual matches, then act — never a single click that touches everything at once. Mass Delete's "permanently delete" checkbox and Mass Transfer's per-relationship checkboxes both exist because the default, safer behavior (Recycle Bin for deletes; leave related records alone for transfers) isn't always what you want, but it should never be what you get by accident.

## Try it yourself

In a sandbox, open Mass Transfer Records and choose Transfer Accounts. Set a Transfer from and Transfer to user, search with broad criteria, and review the matched list — without actually clicking the final transfer button, note which relationship checkboxes are available and what each one would move.

## Recap

- Mass Delete Records and Mass Transfer Records are Setup's built-in tools for bulk cleanup and reassignment, both criteria-driven.
- "Permanently delete" skips the Recycle Bin entirely — check it only after confirming you have a backup.
- Mass Transfer doesn't automatically move related records; checkboxes control whether open/closed opportunities and cases go with the transfer.
- Both tools are built around narrowing, reviewing, then acting — not a single irreversible click.

## Check yourself

A manager is leaving the company, and all their open Opportunities need to go to a new rep, but closed Opportunities should stay as historical record. In one sentence, which Mass Transfer checkboxes would you set?
