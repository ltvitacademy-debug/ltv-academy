# Script — Capstone: A Change Management Scenario

## Segment 1 (title)

The blocking incident exposed something else — nobody can tell you what DispatchDB's schema looked like six months ago. The next real request is your chance to apply Chapter 9 and change that for good.

## Segment 2 (code: the migration script)

Compliance needs every hazmat load flagged, which means a new column and a supporting index. Six months ago this would have been typed straight into production. Instead it becomes a numbered migration script in a real repository.

## Segment 3 (code: the rollback, written first)

Before the forward script ever touches production, you write and review the rollback alongside it — reversing the column, the constraint, and the index, ready to go if it's ever needed.

## Segment 4 (steps: from request to production)

The change goes through a pull request review, gets tested against a restored copy of DispatchDB on staging, and finally deploys in a low-traffic window wrapped in a transaction, verified afterward, and logged.

## Segment 5 (outro)

Next up: turning six weeks of fixes, one incident, and one clean deployment into a story you can tell your manager.
