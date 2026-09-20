# A Real Pipeline Walkthrough

Chapter Four has covered CI/CD concepts, DACPAC and migration-runner deployment, migrations
as code, testing, and rollback, one piece at a time. This lesson ties all of it together as
one concrete, realistic pipeline — described honestly at the level this course can teach it,
without needing actual running infrastructure in front of you.

## What you'll learn

- The full sequence, end to end, from a developer's commit to a change running in production
- What each stage actually checks, and what stops the pipeline from proceeding
- How a GitHub Actions or Azure DevOps YAML pipeline expresses this sequence conceptually

## The sequence, stage by stage

A realistic database CI/CD pipeline, using everything from this chapter, runs in this
order:

1. **Commit.** A developer changes one stored procedure's `.sql` file (Lesson 14) and opens
   a pull request.
2. **Code review.** A reviewer checks locking impact, rollback plan, and downstream query
   effects (Lesson 16) — and approves.
3. **CI: build.** On merge, the pipeline builds the `.sqlproj`, or validates the new
   migration script's syntax (Lesson 17). A failure here stops everything immediately.
4. **CD: deploy to test.** The validated change deploys automatically to a test
   environment via `SqlPackage.exe`, or the migration runner applies the new numbered
   script (Lesson 18/19).
5. **Automated testing.** A throwaway test database gets migrated and smoke-tested
   (Lesson 20). A failed smoke test stops the pipeline here — production is never touched.
6. **Deploy to production.** If everything above passed, the change deploys to production —
   either automatically, or after a deliberate manual approval (Lesson 17's
   deployment/delivery distinction), with a known rollback plan (Lesson 21) ready if
   something still goes wrong.

## What it looks like as YAML

Real pipelines on GitHub Actions or Azure DevOps express exactly this sequence as ordered
stages, each depending on the one before it succeeding:

```yaml
# Conceptual pipeline — not a literal, runnable file
stages:
  - build:
      run: msbuild MyDatabase.sqlproj

  - deploy_test:
      needs: build
      run: SqlPackage.exe /Action:Publish /TargetDatabaseName:TestDb

  - test:
      needs: deploy_test
      run: ./smoke-tests.ps1 -Database TestDb

  - deploy_prod:
      needs: test
      environment: production   # can require manual approval here
      run: SqlPackage.exe /Action:Publish /TargetDatabaseName:ProdDb
```

Each stage only runs if the one before it succeeded — that dependency chain is what makes
"a broken change never reaches production" an enforced property of the pipeline, rather
than something that depends on someone remembering to check.

## Why this is the honest version, not a fantasy

Nothing in this sequence requires infrastructure this course doesn't already cover:
database projects and Git (Chapter Three), the build and deploy mechanics (Lessons 17–19),
a disposable test database (Lesson 20), and a rollback plan decided ahead of time
(Lesson 21). A DBA who understands every stage in this walkthrough understands what a real
database CI/CD pipeline actually does — not a marketing description of one.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline stage | One step in the sequence, gated on the previous stage succeeding |
| `needs:` | The dependency declaration in pipeline YAML that enforces stage ordering |
| Environment gate | A pipeline stage (often production) configured to require manual approval before running |

## Check yourself

In the pipeline this lesson walks through, at what exact stage does a broken migration get
caught before it can reach production — and what happens to the pipeline run when it fails
there?
