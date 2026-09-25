# Script — Deploying CRM Analytics Apps & Templates

## Segment 1 (title)

Building a good dashboard in a sandbox is half the job. The other half is getting it, with its datasets, dataflows, and lenses, into the org where people will actually use it, and doing that repeatably. Develop safely, test, then promote.

## Segment 2 (screenshot: Analytics Studio Browse)

Here is the Browse page in Analytics Studio. Notice the Templates filter next to Apps, Dashboards, Lenses, and Datasets. A template is a reusable blueprint: it describes the dashboards, datasets, and data preparation an app needs, so a new app can be created from it, with correct dataset references.

## Segment 3 (screenshot: Sales Analytics app)

This is the home dashboard of Sales Analytics, one of the prebuilt apps Salesforce provides, with KPIs and links to a leaderboard, stage analysis, and forecast. Organizations can also make their own templates, so many teams get the same solution.

## Segment 4 (steps: change set flow)

To move assets between orgs, a common route is a change set. Create an outbound change set in the source org, add your Analytics components, upload it to the target, then validate and deploy from inbound change sets. Other packaging options exist, so check the current documentation.

## Segment 5 (code: gotchas)

Three gotchas. Adding a dataset does not automatically add the dataflows that populate it, so add them yourself. Assets in a private app can't be included, so move them to a shared app first. And deploying definitions is not the same as loading data, so run your dataflows or recipes in the target org, then compare numbers.

## Segment 6 (outro)

Next up, a new chapter: Data Cloud. First, what problem does it solve?
