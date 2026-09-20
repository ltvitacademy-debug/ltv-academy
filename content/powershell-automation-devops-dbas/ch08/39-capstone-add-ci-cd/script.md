# Script — Capstone: Add CI/CD for a Database Change

## Segment 1 (title)

Now for the habit that carried the most immediate risk: schema changes deployed by email. This lesson moves one real change to MeridianCommerce through source control and a CI/CD pipeline instead.

## Segment 2 (code: the change request, as SQL)

Meridian's fulfillment team wants a delayed-shipment report, which needs two new nullable columns on dbo.Orders and a supporting filtered index. Under the old process this would have arrived as an email attachment titled "please run tonight" — instead it goes into the database project on a branch, behind a pull request.

## Segment 3 (code: azure-pipelines.yml)

SSDT builds the database project into a deployable .dacpac package. SqlPackage.exe, Microsoft's real deployment tool, then publishes that package to MERSQLDEV01 automatically, comparing it against the live schema and generating exactly the changes needed.

## Segment 4 (steps: build, test, gate, prod)

Merging the pull request triggers the pipeline: build the .dacpac, deploy it to test automatically, then stop at an approval gate — Priya reviews exactly what will change before anything touches production, and only then does the same package deploy to MERSQLPRD01.

## Segment 5 (outro)

Next up: automated monitoring and alerting for Meridian Outfitters, tuned so a transient blip doesn't page Priya's phone at 2 AM — Chapter 6's patterns, applied for real.
