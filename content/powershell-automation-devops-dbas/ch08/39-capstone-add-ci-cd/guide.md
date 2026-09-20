# Capstone: Add CI/CD for a Database Change

Now for the habit that carried the most immediate risk in Lesson 37: schema changes
deployed by email. This lesson takes one real, concrete change to **MeridianCommerce**
and moves it through source control and a CI/CD pipeline instead — applying Chapters 3
and 4's patterns directly.

## What you'll learn

- The actual schema change Meridian's fulfillment team requested, and why
- How that change moves through the `MeridianCommerce.sqlproj` database project and a
  pull request instead of an email
- How the pipeline builds, deploys to test, gates on approval, and deploys to production

## The change request

Meridian's fulfillment team wants a new report showing which orders are running behind
schedule. That needs two new columns on `dbo.Orders` and a supporting index:

```sql
ALTER TABLE dbo.Orders
    ADD EstimatedShipDate   DATETIME2(0)  NULL,
        ShipDelayReasonCode CHAR(3)       NULL;
GO

CREATE NONCLUSTERED INDEX IX_Orders_EstimatedShipDate
    ON dbo.Orders (EstimatedShipDate)
    WHERE EstimatedShipDate IS NOT NULL;
GO
```

Under the old process, this would have arrived as a `.sql` attachment titled "please run
tonight." Instead, a developer edits `Tables/Orders.sql` inside `MeridianCommerce.sqlproj`
(Chapter 3, Lesson 13's database project) and adds a new index script alongside it, on a
branch, then opens a pull request against `meridian-dbaops` — giving Priya an actual
code-review step (Chapter 3, Lesson 16) before anything touches a server.

## From .sqlproj to a deployable package

SSDT builds `MeridianCommerce.sqlproj` into a `.dacpac` — a self-contained package
describing the complete target schema. `SqlPackage.exe`, Microsoft's real deployment
tool for `.dacpac` files, then compares that package against a live database and
generates (and can execute) exactly the `ALTER`/`CREATE` statements needed to bring the
target in line — the same schema-comparison idea from Lesson 13, now automated instead of
run by hand in Azure Data Studio.

## The pipeline: build, test, gate, then production

```yaml
trigger:
  branches:
    include: [main]

stages:
- stage: Build
  jobs:
  - job: BuildDacpac
    steps:
    - task: VSBuild@1
      inputs:
        solution: 'MeridianCommerce.sqlproj'

- stage: DeployTest
  jobs:
  - job: PublishToTest
    steps:
    - script: |
        SqlPackage.exe /Action:Publish `
          /SourceFile:MeridianCommerce.dacpac `
          /TargetServerName:MERSQLDEV01 `
          /TargetDatabaseName:MeridianCommerce

- stage: DeployProd
  dependsOn: DeployTest
  condition: succeeded()
  jobs:
  - deployment: PublishToProd
    environment: 'meridian-prod-approval'
    strategy:
      runOnce:
        deploy:
          steps:
          - script: |
              SqlPackage.exe /Action:Publish `
                /SourceFile:MeridianCommerce.dacpac `
                /TargetServerName:MERSQLPRD01 `
                /TargetDatabaseName:MeridianCommerce
```

Merging the pull request triggers the pipeline: **Build** compiles the `.sqlproj` into a
`.dacpac`; **Deploy to Test** publishes it to `MERSQLDEV01` automatically, with no human
in the loop; **Deploy to Prod** only runs after a person approves the `meridian-prod-approval`
environment — Priya, reviewing exactly what `SqlPackage.exe` intends to change before it
touches `MERSQLPRD01`.

## Rollback, just in case

Chapter 4, Lesson 21 covers rollback strategy in general; here it's concrete. Because
`EstimatedShipDate` and `ShipDelayReasonCode` are both nullable additions with no data
migration, the rollback is a small, reviewed script of its own — `DROP INDEX
IX_Orders_EstimatedShipDate` followed by `ALTER TABLE dbo.Orders DROP COLUMN
EstimatedShipDate, ShipDelayReasonCode` — checked into the repo next to the forward
change, not improvised after the fact if something goes wrong.

## Key terms

| Term | Meaning |
|---|---|
| `.dacpac` | The deployable package SSDT builds from `MeridianCommerce.sqlproj` |
| `SqlPackage.exe` | Microsoft's tool for comparing and deploying `.dacpac` packages against a live database |
| `meridian-prod-approval` | The pipeline's Azure DevOps environment gate — a human must approve before `MERSQLPRD01` is touched |
| Rollback script | The reviewed, checked-in script to undo a schema change, prepared before deployment, not improvised after |

## Check yourself

The pipeline deploys to `MERSQLDEV01` automatically but requires a human approval before
deploying the same `.dacpac` to `MERSQLPRD01`. What does that asymmetry buy Meridian, and
what would be lost if both stages ran fully automatically?
