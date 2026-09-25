# Capstone: Connect Data Cloud

Cobalt Ridge's fifth business question is one Salesforce CRM data alone cannot answer: which upcoming renewals show weak product adoption? Opportunity records show what was sold. They don't show whether customers actually use it. That evidence lives in product usage data outside Salesforce. In this lesson you'll bring it in through Data Cloud, compute seat activation, and surface renewal risk beside the pipeline in the app you built. This applies Chapter 4. All figures are illustrative, and Data Cloud is now branded Data 360, so labels in your org may differ from those used here.

## What you'll learn

- How to plan a usage data stream and map it to your data model
- Why a shared key makes identity resolution unnecessary in this case
- How to define a calculated insight for seat activation
- How to bring the result into CRM Analytics and schedule everything in the right order

## Step 1: define the usage stream

Cobalt Ridge's platform records product usage internally. A nightly job produces a summary file with **one row per customer account per day**, covering 3,200 accounts:

- **account_id**: the Salesforce Account ID, carried in the product's records
- **snapshot_date**: the day the numbers were taken
- **licensed_seats**: seats the customer has paid for
- **users_active_90d**: distinct users who used the product in the last 90 days

Send it to Data Cloud with a connector that fits where the file lives, such as cloud storage or the Ingestion API. Pre-summarizing to one row per account per day keeps volume small. Data Cloud is generally consumption-priced, so check your org's credit usage before you turn on frequent refreshes or raw event-level ingestion.

## Step 2: map to the data model

An ingested stream lands in a data lake object, which you map to your data model. Relate the usage records to the **Account** object using account ID. Because both sides carry the same Salesforce ID, the join is exact. Identity resolution, the fuzzy matching of Chapter 4, is designed for cases where sources share no reliable key, such as matching web visitors to customers by name and email. It isn't needed here, and adding it would only add complexity. Applying a concept means knowing when not to use it.

Check the stream's detail page after the first load: the last run status, the last refreshed time, total records, and how many fields are mapped. Any failed or partial refresh should be investigated before you build anything on top of the data.

## Step 3: the calculated insight

Define one calculated insight, **Seat Activation (90 days)**, at account grain:

- Numerator: users active in the last 90 days
- Denominator: licensed seats
- Use the latest snapshot per account, not a sum across days

That last line matters. Adding daily snapshots together would multiply the numerator and denominator by the number of days and produce nonsense. Test with one account you can verify by hand. This should match the definition you wrote in Lesson 48.

## Step 4: bring it into CRM Analytics

Connect Data Cloud to CRM Analytics through a Data Cloud connection in Data Manager, then use the insight as an input to your recipe and join it to Opportunity and Account on account ID. Available connection types and menu names depend on your release and licensing, so confirm the current path in Salesforce documentation. Add a **renewal risk flag**: renewing within 90 days and seat activation under 40%.

Order matters. Schedule it as a chain: stream refresh, then calculated insight refresh, then the recipe run. If the recipe runs first, the dashboard shows yesterday's usage and nobody sees an error. Put a "usage as of" date on the dashboard.

## Step 5: the result

The new component answers question five. In our example, 96 accounts renew in the next 90 days, holding $12.4M of ARR. Seventeen of them are under 40% seat activation and hold $2.3M, about 19% of the renewing ARR. That list, with account owners, is something a Customer Success manager can act on this week.

## Recap

A small usage stream, joined on a shared key, one calculated insight at account grain, a careful schedule, and a dashboard component that turns adoption into renewal risk. Next lesson: secure it properly.

## Check yourself

Why is a latest-snapshot calculation safer than summing seat activation across daily rows, and why is identity resolution unnecessary when both sources carry the Salesforce Account ID?
