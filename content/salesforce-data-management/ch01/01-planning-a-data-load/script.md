# Script — Planning a Data Load

## Segment 1 (title)

Every data load that goes wrong went wrong before anyone opened a CSV file. Planning is what happens before you touch a tool, and it's the part that actually prevents the bad outcomes.

## Segment 2 (screenshot: Setup search, Data Import Wizard)

Salesforce gives you two built-in ways to get data in, and picking the right one is itself a planning decision. The Data Import Wizard is the friendlier option: a guided, click-through flow for Accounts, Contacts, Leads, Solutions, Campaign Members, and custom objects, capped at 50,000 records per job.

## Segment 3 (screenshot: Setup search, Data Loader)

Data Loader is the desktop application. It handles any object, including ones the wizard doesn't support, scales to 150 million records with Bulk API, and supports complex field mappings and scheduled jobs — at the cost of an install and a steeper learning curve.

## Segment 4 (steps: object, source, duplicates)

Before opening anything, answer three questions. Which object are you loading into, and how many records? Where is the data coming from, and has anyone actually looked at it? And does that object already have data your new records might collide with?

## Segment 5 (screenshot: System Overview, data storage)

A load plan isn't complete until you've checked what the org can actually absorb. System Overview shows data storage against the limit and API requests used in the last day. This org is already over its storage limit — a load that looks fine on paper can still stall partway through.

## Segment 6 (steps: required fields, tool choice, backup)

Round out the checklist with required fields and validation rules — will every row satisfy them, or will rows bounce? Pick your tool based on the job's size and complexity. And always ask whether you can back up what's there now, so a bad load can be undone.

## Segment 7 (outro)

With a plan in hand, it's time to use it. Next, we walk through the Data Import Wizard end to end.
