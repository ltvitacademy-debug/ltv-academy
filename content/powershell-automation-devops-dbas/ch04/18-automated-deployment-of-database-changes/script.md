# Script — Automated Deployment of Database Changes

## Segment 1 (title)

Lesson 17 described continuous deployment conceptually: a validated change gets applied automatically. This lesson is the actual mechanism — what a pipeline step that deploys a database change really runs, using real Microsoft tooling.

## Segment 2 (code: DACPAC + SqlPackage)

Building a database project produces a DACPAC — a single file snapshotting the intended schema state. SqlPackage.exe takes that DACPAC and a target database, compares them, and generates and runs the exact statements needed to bring the target in line — automatically, as a pipeline step.

## Segment 3 (steps: two real approaches)

The other common approach is a migration runner: the team writes an ordered sequence of small, versioned migration scripts, and a runner tool applies whichever haven't already run against a given target, tracking progress in a table on that target.

## Segment 4 (steps: choosing between them)

DACPAC deployment fits naturally with database projects and needs no hand-written diff. Migration scripts give more explicit control, which matters more for data-transformation changes a schema-diff tool can't safely infer on its own.

## Segment 5 (outro)

Many real pipelines use both — DACPAC for pure schema objects, migration scripts for anything touching data. Next up: database migrations as code, the numbered sequential pattern in depth.
