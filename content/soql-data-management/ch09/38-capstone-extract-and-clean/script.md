# Script — Capstone: Extract & Clean a Dataset

## Segment 1 (title)

This lesson is steps one and two of the plan: extract Summit Ridge's data with real SOQL, and clean it in a working copy. Nothing here changes a single record in Salesforce.

## Segment 2 (code: baseline)

Start with the baseline. Count all the Leads. Group Leads by Lead Source and count each group. Count Contacts where AccountId is null. Run these in Workbench, save the results, and they become the numbers you compare against later.

## Segment 3 (code: duplicate groups)

To find duplicates, group Leads by Email and keep only the groups having a count greater than one. That returns two thousand seven hundred sixty duplicated addresses. But an aggregate query returns groups, not records, so it can't tell you which Lead to keep.

## Segment 4 (code: record extract)

For that, extract the records themselves with Data Loader. Id, Email, Company, Lead Source, Is Converted, Created Date, Last Modified Date, ordered by Email and Created Date. Save it as a backup, don't touch it, and clean a copy.

## Segment 5 (steps: survivor rule)

Every duplicate group needs one survivor. A converted Lead always survives. Otherwise the most recently modified one wins. On a tie, the oldest wins. And any group with two converted Leads goes to manual review. That leaves three thousand seven hundred seventy surplus Leads to delete.

## Segment 6 (code: Lead Source mapping)

Now standardize Lead Source. Six spellings of Trade Show all map to Trade Show. Fifteen thousand three hundred forty Leads carry a variant, and five thousand four hundred seventy are wrong. Nineteen hundred thirty of those are duplicates you're deleting anyway, so thirty-five hundred forty need an update. The four thousand two hundred ten blanks stay blank, because you have no evidence for a value.

## Segment 7 (code: orphan Contacts)

Last, the orphan Contacts. Extract those with a null AccountId, extract the Accounts that have a Legacy Id, and join them in your working copy through the ERP export. One thousand fifteen match an existing Account. Two hundred twenty-five don't, and they belong to sixty-one new companies.

## Segment 8 (steps: predictions)

Before you leave this lesson, write down what you expect. Delete three thousand seven hundred seventy Leads. Update thirty-five hundred forty Lead Sources. Create sixty-one Accounts. Relink twelve hundred forty Contacts. Predictions first, so validation later has something to prove.

## Segment 9 (outro)

The cleaning is done and the load files are staged. Next up: loading it all back safely.
