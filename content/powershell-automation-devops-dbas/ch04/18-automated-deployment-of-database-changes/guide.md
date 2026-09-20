# Automated Deployment of Database Changes

Lesson 17 described CD conceptually: a validated change gets applied to a target
environment automatically. This lesson is about the actual mechanism — what a pipeline step
that deploys a database change really runs, using real Microsoft tooling.

## What you'll learn

- What a DACPAC is, and how it gets built from a database project
- What `SqlPackage.exe` does, and the deployment command that actually applies a DACPAC
- The migration-runner tool category as the alternative approach, and when each fits

## DACPAC-based deployment

When a `.sqlproj` (Lesson 13) is built, the output is a **DACPAC** (Data-tier Application
Package) — a single file that captures the entire intended state of the schema as of that
build. A DACPAC isn't a change script; it's a snapshot of what the schema *should* look
like. The deployment tool, **`SqlPackage.exe`**, takes that DACPAC and a target database,
compares the DACPAC's schema to whatever the target currently contains (conceptually the
same comparison Schema Compare does interactively), and generates and runs the `ALTER`/
`CREATE`/`DROP` statements needed to bring the target in line with the DACPAC — automatically,
as a pipeline step.

```text
# Conceptual pipeline step
msbuild MyDatabase.sqlproj /p:Configuration=Release
  → produces MyDatabase.dacpac

SqlPackage.exe /Action:Publish `
  /SourceFile:MyDatabase.dacpac `
  /TargetServerName:SQLTEST01 `
  /TargetDatabaseName:MyDatabase
```

The advantage of this model is that you never hand-write the change script — `SqlPackage`
figures out the actual diff between "what the DACPAC says" and "what's currently there" and
applies exactly that, every time, based on the real state of the target.

## The migration-runner alternative

The other common approach — which Lesson 19 covers in depth — is a **migration-runner**
tool: rather than comparing a full schema snapshot against a target, the team writes and
commits a sequence of small, individually versioned migration scripts (`0001_create_
orders.sql`, `0002_add_status_column.sql`, and so on), and a migration-runner tool applies
whichever of those scripts haven't already run against a given target, tracking what's
applied in a table on the target itself. Where DACPAC deployment asks "what's the diff
between the intended end state and reality," a migration runner asks "which of these
ordered steps haven't happened here yet."

## Choosing between them

Both are real, legitimate approaches used across the industry, and the choice often comes
down to team preference and existing tooling. DACPAC deployment fits naturally with SSDT
database projects and gives you automatic diffing without hand-writing scripts. The
migration-runner pattern gives more explicit control over exactly what statements run and
in what order, which can matter more for complex data-transformation changes that a
schema-diff tool wouldn't know how to generate safely on its own (moving data between two
differently-shaped columns, for example). Many real-world pipelines lean on the DACPAC model
for pure schema objects and a migration-runner style script for anything that also needs to
touch data.

## Key terms

| Term | Meaning |
|---|---|
| DACPAC | Data-tier Application Package — a single file snapshotting a database project's intended schema state |
| `SqlPackage.exe` | The command-line tool that deploys a DACPAC to a target database, generating and running the diff automatically |
| Migration runner | A tool category that applies an ordered sequence of versioned migration scripts, tracking what's already run |

## Check yourself

With DACPAC-based deployment, why doesn't anyone hand-write the `ALTER TABLE` statement
that actually runs against the target server? What generates it, and what does that tool
actually compare to produce it?
