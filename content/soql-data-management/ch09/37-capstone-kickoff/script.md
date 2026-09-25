# Script — Capstone Kickoff

## Segment 1 (title)

You've learned SOQL, Data Loader, Workbench, and the habits of clean data and safe migration. This capstone puts all of it into one realistic project. This lesson sets up the scenario and the plan.

## Segment 2 (steps: three problems)

Meet Summit Ridge Outfitters, a fictional outdoor gear wholesaler with a six-year-old Salesforce org. You're the new data analyst. Three problems: duplicate Leads from years of trade-show imports, inconsistent Lead Source values, and Contacts with no Account. Nobody trusts the reports, and your instructions are, fix it, and don't break anything.

## Segment 3 (code: baseline counts)

Here's the size of the mess. Forty-one thousand eight hundred sixty Leads, of which nearly three thousand email addresses appear more than once. Fourteen different Lead Source values, six of them spellings of Trade Show. And twelve hundred forty Contacts with no Account, which makes them private contacts that only their owner can see.

## Segment 4 (code: the legacy ID)

The key to reloading safely is a custom External ID field called Legacy Id, on both Account and Contact, populated from the company's old ERP. It lets you match records without knowing Salesforce IDs, which is exactly what an upsert needs. Of the twelve hundred forty orphan Contacts, one thousand fifteen belong to Accounts that already exist, and two hundred twenty-five belong to sixty-one companies that don't exist yet.

## Segment 5 (steps: the plan)

The plan has five steps. Extract with SOQL and back up everything you'll touch. Clean in a working copy. Stage the load files, parents before children. Load with Data Loader, reading every success and error file. Then validate against your baseline. All of it runs in the sandbox first.

## Segment 6 (outro)

The scenario is set. Next up: writing the real queries that extract and clean this dataset.
